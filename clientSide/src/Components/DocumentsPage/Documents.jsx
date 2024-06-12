import './Documents.css'
import Navbar from './Components/Navbar/Navbar'

import { useState } from 'react'

export default function Documents(props) {

    const [name, setName] = useState(props.user.name);
    const [username, setUsername] = useState(props.user.username);
    const [password, setPassword] = useState(props.user.password);

    return (
        <div>
            <Navbar
                name={name}
                username={username}
                password={password}
                setName={setName}
                setUsername={setUsername}
                setPassword={setPassword}
                setUser={props.setUser}
            />
        </div>
    )
}