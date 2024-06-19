const Node = require('./Node')

export default class CRDT {
    constructor() {
        this.Nodes = [new Node(0, "bof", this.siteID, {}), new Node(10000, "eof", this.siteID, {})];
        this.siteID = uuidv1();
        this.count = 100;
    }

    generateIndex(indexStart, indexEnd) {
        let diff = indexEnd - indexStart;
        let index;
        if (diff <= 10) {
            index = indexStart + diff/100;
        } else if (diff <= 1000) {
            index = Math.round(indexStart + diff/10);
        } else if (diff <= 5000) {
            index = Math.round(indexStart + diff/100);
        } else {
            index = Math.round(indexStart + diff/1000);
        }
        return index;
    }

    compareIdentifier(c1, c2) {
        if      (c1.index < c2.index) { return -1; }
        else if (c1.index > c2.index) { return 1;  }
        else {
            if      (c1.siteID < c2.siteID) { return -1; }
            else if (c1.siteID > c2.siteID) { return 1;  }
            else                            { return 0;  }
        }
    }

    insert(indexStart, indexEnd, char, attributes, id) {
        let index = this.generateIndex(indexStart, indexEnd);
        let charObj = (id !== undefined) ?
            new Node(index, char, this.siteID, attributes, id)
            :
            new Node(index, char, this.siteID, attributes);
        this.Nodes.splice(index, 0, charObj);
        this.Nodes.sort(function(a,b) {
            return a.index - b.index;
        });
        return charObj;
    }

    remoteInsert(node) {
        const charCopy = new Node(node.index,
                                  node.char,
                                  char.siteID,
                                  {
                                    bold: node.bold,
                                    italic: node.italic,
                                    underline: node.italic
                                   },
                                   char.id);
        this.Nodes.push(charCopy);
        this.Nodes.sort(function(a,b) {
            if (a.index == b.index) {
                return a.siteID - b.siteID;
            } else {
                return a.index - b.index;
            }
        });
    }

    delete(id) {
        let node = this.Nodes.find(e => e.id === id);
        if (node !== undefined) {
            node.tombstone = true;
        }
    }

    remoteRetain(nodeCopy) {
        let node = this.Nodes.find(c => c.id === nodeCopy.id);
        if (node !== undefined) {
            node.update({
                bold: nodeCopy.bold,
                italic: nodeCopy.italic,
                underline: nodeCopy.underline
            });
        }
    }

    getRelativeIndex(index) {
        let i = 0;
        let aliveIndex = 0;
        let itemsFound = false;
        let nodeStart, nodeEnd, node;
        while (!itemsFound && (i < this.Nodes.length)) {
            node = this.Nodes[i];
            if(!node.tombstone) {
                if (aliveIndex > index) {
                    nodeEnd = node;
                    itemsFound = true;
                } else {
                    nodeStart = node;
                }
                aliveIndex++;
            }
            i++;
        }
        if (aliveIndex >= index) {
            nodeEnd = node;
            itemsFound = true;
        } else {
            nodeStart = node;
        }
        if (nodeStart && nodeEnd) {
            return [nodeStart, nodeEnd];
        } else {
            throw new Error("failed to find relative index");
        }
    }

    getNodeRelativeIndex(node) {
        let i = 0;
        let aliveIndex = 0;
        let nodeFound = false;
        let n;
        while (!nodeFound && (i < this.Nodes.length)) {
            n = this.Nodes[i];
            if (!n.tombstone && n.char !== "bof" && n.char !== "eof") {
                aliveIndex++;
            }
            if (n.id === node.id) {
                nodeFound = true;
                if (n.tombstone) {
                    aliveIndex++;
                }
            }
            i++;
        }
        if (nodeFound) {
            return aliveIndex - 1;
        } else {
            throw new Error("failed to find relative index");
        }
    }

    getSequence() {
        let seq = "";
        for (let node of this.Nodes) {
            if (!node.tombstone && node.char !== "bof" && node.char !== "eof") {
                seq += node.char;
            }
        }
        return seq;
    }

    printNodes() {
        for (let node of this.Nodes) {
            console.log(node.index, node.char, node.siteID, node.tombstone);
        }
    }
}