import './Documents.css'
import Navbar from './Components/Navbar/Navbar'

import { useState } from 'react'

export default function Documents(props) {

    const [name, setName] = useState(props.user.name);

    return (
        <div>
            <Navbar
                name={name}
                username={props.user.username}
                password={props.user.password}
                setName={setName}
                setUser={props.setUser}
            />
        </div>
    )
}