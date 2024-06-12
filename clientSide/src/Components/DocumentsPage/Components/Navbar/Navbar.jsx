import './Navbar.css'

import Icon from '../../../../assets/NavbarIcon.png'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import AddDocument from '../AddDocument/AddDocument'
import ProfileCard from '../ProfileCard/ProfileCard'
import ChangeProfile from '../ChangeProfile/ChangeProfile';
import DeleteAccount from '../DeleteAccount/DeleteAccount'

export default function Navbar(props) {

  const navigate = useNavigate();

  const [showAdd, setShowAdd] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  function handleLogout() {
    props.setUser({});
    navigate("/Login");
  }

  return (
    <div>
      <div className='Navbar-Container'>
        <img className='Navbar-Icon'src={Icon}/>
        <h1>Collaborative Text Editor</h1>
        <ul>
          <li onClick={() => {setShowAdd(!showAdd)}}>Add Document</li>
          <li onClick={() => {setShowProfile(!showProfile)}}>Profile</li>
          <li>
            Settings
            <ul>
              <li onClick={() => {setShowChange(!showChange)}}>Change Profile</li>
              <li onClick={() => {setShowDelete(!showDelete)}}>Delete my Account</li>
            </ul>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
        <h2>Welcome, {props.name}</h2>
        {showAdd &&
          <AddDocument
            setShowAdd={setShowAdd}
          />
        }
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
            setChangeProfile={setShowChange}
          />
        }
        {showDelete &&
          <DeleteAccount
            username={props.username}
            password={props.password}
            setUser={props.setUser}
            setShowDelete={setShowDelete}
          />
        }
      </div>
    </div>
  )
}