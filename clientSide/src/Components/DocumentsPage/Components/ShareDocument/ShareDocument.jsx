import '../../../../index.css'
import './ShareDocument.css'

import { useState } from 'react'

export default function ShareDocument(props) {

    const [username, setUsername] = useState('');
    const [selectedOption, setSelectedOption] = useState('None');

    const [isUsernameFocused, setIsUsernameFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.username === username) {
            props.toast.error("Cannot change your own access")
        } else {
            fetch("http://localhost:8080/api/mixed/ShareDocument", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({documentId: props.documentId, username: username, accessType: selectedOption})
            })
            .then((response) => {
                if (response.status === 400) {
                    props.toast.error("Could not connect to server, please try again later");
                } else if (response.status === 406) {
                    props.toast.error("User does not exist");
                    setUsername('');
                } else if (response.status === 200) {
                    props.toast.success("Document Shared Successfully");
                    props.setShowShare(false);
                }
            })
        }
    }

    return (
        <div className='floatingcards'>
            <div className='sharedocument-header'>
                <h2>Share Document</h2>
                <button onClick={() => {props.setShowShare(false)}}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={`input-group ${isUsernameFocused || username ? 'focused' : ''}`}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setIsUsernameFocused(true)}
                        onBlur={() => setIsUsernameFocused(false)}
                        required
                    />
                    <label htmlFor='username'>Username</label>
                </div>
                <div className='sharedocument-select-group'>
                    <label htmlFor="options">Options:</label>
                    <select
                        id="options"
                        name="options"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="None">None</option>
                        <option value="Viewer">Viewer</option>
                        <option value="Editor">Editor</option>
                    </select>
                </div>
                <button className='input-buttons'>Share</button>
            </form>
        </div>
    )
}