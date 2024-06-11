import './Navbar.css'

import Icon from '../../../../assets/NavbarIcon.png'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProfileCard from '../ProfileCard/ProfileCard'

export default function Navbar(props) {

    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const options = ['Change Settings' , 'Delete Account'];

    function handleLogout() {
        props.setUser({});
        navigate("/Login");
    }

    function handleProfileClick() {
        setShowProfile(!showProfile);
    }

    function handleSettingsClick() {
        setIsOpen(!isOpen);
    }

    return (
        <div className='Navbar-Container'>
            <img src={Icon}/>
            <h1>Collaborative Text Editor</h1>
            <ul>
                <li onClick={handleProfileClick}>Profile</li>
                <li onClick={handleSettingsClick}>Settings</li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
            <h2>Welcome, {props.name}</h2>
            {showProfile &&
                <ProfileCard
                    name={props.name}
                    username={props.username}
                    password={props.password}
                    setShowProfile={setShowProfile}
                />
            }
            {isOpen &&
                <ul className='Navbar-Settings-Dropdown'>
                    {options.map((option, index) => {
                        <li key={index} onClick={() => {console.log('helloWorld')}}>{option}</li>
                    })}
                </ul>
            }
        </div>
    )
}