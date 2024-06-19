import { v1 as uuidv1 } from 'uuid';

export default class Node {
    constructor(index, char, siteID, attributes, id = uuidv1()) {
        this.index = index;
        this.char = char;
        this.siteID = siteID
        this.tombstone = false;
        this.bold = attributes !== undefined && "bold" in attributes? attributes["bold"] : false;
        this.italic = attributes !== undefined && "italic" in attributes? attributes["italic"] : false;
        this.underline = attributes !== undefined && "underline" in attributes? attributes["underline"] : false;
        this.id = id;
    }

    update(attributes) {
        this.bold = attributes !== undefined && "bold" in attributes? attributes["bold"] : this.bold;
        this.italic = attributes !== undefined && "italic" in attributes? attributes["italic"] : this.italic;
        this.underline = attributes !== undefined && "underline" in attributes? attributes["underline"] : this.underline;
    }
}