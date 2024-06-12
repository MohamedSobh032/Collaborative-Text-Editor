import './AddDocument.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'

export default function AddDocument(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        
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
                    />
                    <label htmlFor='description'>Document Description</label>
                </div>
                <button type='submit'>Create Document</button>
            </form>
        </div>
    )
}