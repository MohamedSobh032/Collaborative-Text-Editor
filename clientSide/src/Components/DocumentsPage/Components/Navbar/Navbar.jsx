import './Navbar.css'

import Icon from '../../../../assets/NavbarIcon.png'

export default function Navbar(props) {

    return (
        <div className='Navbar-Container'>
            <img src={Icon}/>
            <h1>Collaborative Text Editor</h1>
            <ul>
                <li>See Profile</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
            <h2>Welcome, {props.name}</h2>
        </div>
    )
}