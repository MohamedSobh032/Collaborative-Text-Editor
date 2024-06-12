import './Documents.css'
import Navbar from './Components/Navbar/Navbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'

export default function Documents(props) {

    const [name, setName] = useState(props.user.name);

    return (
        <div>
            <ToastContainer />
            <Navbar
                name={name}
                username={props.user.username}
                password={props.user.password}
                setName={setName}
                setUser={props.setUser}
            />
            <button onClick={() => {toast.success("hello")}}>hello</button>
        </div>
    )
}