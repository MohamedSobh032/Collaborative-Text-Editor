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
                toast.error("There is something wrong with our server, please try again");
            } else if (response.status === 200) {
                props.setShowAdd(false);
            } else {
                throw new Error("Unexpected error");
            }
        })
    }

    return (
        <div className='adddocument-container'>
            <div className='adddocument-header'>
                <h2>Add Document</h2>
                <button onClick={() => {props.setShowAdd(false)}}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`adddocument-input-group ${isTitleFocused || title ? 'focused' : ''}`}>
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
                <button type='submit'>Create Document</button>
            </form>
        </div>
    )
}