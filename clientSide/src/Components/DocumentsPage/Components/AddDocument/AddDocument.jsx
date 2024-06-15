import '../../../../index.css'
import './AddDocument.css'

import { useState } from 'react'

export default function AddDocument(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/mixed/AddDocument", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: props.username, title: title, description: description}),
        })
        .then((response) => {
            if (response.status === 406) {
                props.toast.error("There is something wrong with our server, please try again");
            } else if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("Unexpected error");
            }
        })
        .then(data => {
            props.toast.success("Document Added Successfully");
            console.log(data.documentId);
            props.setDocuments(prevDocs => [...prevDocs,
                    {title: title, description: description, accessType: 'OWNER', documentId: data.documentId}]);
            props.setShowAdd(false);
        })
        .catch(error => {
            console.error("Error adding document:", error);
            props.toast.error("Failed to add document. Please try again.");
        });
    }

    return (
        <div className='floatingcards'>
            <div className='floatingcards-header'>
                <h2>Add Document</h2>
                <button onClick={() => {props.setShowAdd(false)}}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`input-group ${isTitleFocused || title ? 'focused' : ''}`}>
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
                    <label htmlFor='title'>Document Name</label>
                </div>
                <div className={`adddocument-textarea ${isDescriptionFocused || description ? 'focused' : ''}`}>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onFocus={() => setIsDescriptionFocused(true)}
                      onBlur={() => setIsDescriptionFocused(false)}
                      required
                    />
                    <label htmlFor='description'>Document Description</label>
                </div>
                <button className="input-buttons" type='submit'>Create Document</button>
            </form>
        </div>
    )
}