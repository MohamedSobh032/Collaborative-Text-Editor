import './Navbar.css'

import Icon from '../../../../assets/NavbarIcon.png'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import ProfileCard from '../ProfileCard/ProfileCard'
import ChangeProfile from '../ChangeProfile/ChangeProfile';

export default function Navbar(props) {

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showChange, setShowChange] = useState(false);

  function handleLogout() {
    props.setUser({});
    navigate("/Login");
  }

  return (
    <div className='Navbar-Container'>
      <img src={Icon}/>
      <h1>Collaborative Text Editor</h1>
      <ul>
        <li onClick={() => {setShowProfile(!showProfile)}}>Profile</li>
        <li>
          Settings
          <ul>
            <li onClick={() => {setShowChange(!showChange)}}>Change Profile</li>
            <li>Delete my Account</li>
          </ul>
        </li>
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
      {showChange &&
        <ChangeProfile
          name={props.name}
          username={props.username}
          password={props.password}
          setName={props.setName}
          setUsername={props.setUsername}
          setPassword={props.setPassword}
        />
      }
    </div>
  )
}