import './RenameDocument.css'

import { useState } from 'react';

export default function RenameDocument(props) {

    const [title, setTitle] = useState('');
    const [isTitleFocused, setIsTitleFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/documents/RenameDocument", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({documentId: props.documentId, documentTitle: title})
        })
        .then((response) => {
            if (response.status === 406) {
                props.toast.error("There is something wrong with our server, please try again");
            } else if (response.status === 400) {
                props.toast.error("Could not connect to server, please try again later");
            } else if (response.status === 200) {
                props.setDocuments(docs => docs.map(doc => {
                    if (doc.documentId === props.documentId) {
                        return {...doc, documentTitle: title };
                    }
                    return doc;
                }));
                props.toast.success("Document Renamed Successfully");
                props.setTitle(title);
                props.setShowRename(false);
            } else {
                throw new Error("Unexpected error");
            }
        })
    }

    return (
        <div className='renamedocument-container'>
            <div className='renamedocument-header'>
                <h2>Rename Document</h2>
                <button onClick={() => {props.setShowRename(false)}}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`renamedocument-input-group ${isTitleFocused || title ? 'focused' : ''}`}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsTitleFocused(true)}
                        onBlur={() => setIsTitleFocused(false)}
                        required
                    />
                    <label htmlFor='title'>New Title</label>
                </div>
                <button>Rename</button>
            </form>
        </div>
    )
}