import './ChangeProfile.css'

import eye from '../../../../assets/eye.png'
import hidden from '../../../../assets/hidden.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'

export default function ChangeProfile(props) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (props.password !== password) {
            toast.error("Wrong password, please try again");
            setPassword('');
            return;
        } else if (newPassword !== '' && newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        } else {
            let userSent = (name === '') ? props.name : name;
            let passSent = (newPassword === '') ? props.password : newPassword;
            fetch("http://localhost:8080/api/users/ChangeSettings", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: props.username, name: userSent, password: passSent }),
            })
            .then((response) => {
                if (response.status === 406) {
                  toast.error("There is something wrong with our server, please try again");
                } else if (response.status === 400) {
                  toast.error("Could not connect to server, please try again later");
                } else if (response.status === 200) {
                    props.setName(userSent);
                    props.setChangeProfile(false);
                } else {
                  throw new Error("Unexpected error");
                }
            })
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='changeprofile-container'>
                <div className='changeprofile-header'>
                    <h2>Change Profile</h2>
                    <button onClick={() => {props.setChangeProfile(false)}}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={`changeprofile-input-group ${isPasswordFocused || password ? 'focused' : ''}`}>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setIsPasswordFocused(true)}
                          onBlur={() => setIsPasswordFocused(false)}
                          required
                        />
                        <label htmlFor='password'>Current Password</label>
                        <img
                          src={showPassword? hidden : eye}
                          alt="Toggle Password Visibility"
                          className="changeprofile-eye-icon-Password"
                          onClick={() => setShowPassword(!showPassword)}
                          title={showPassword? "Hide Password" : "Show Password"}
                        />
                    </div>
                    <div className={`changeprofile-input-group ${isNameFocused || name ? 'focused' : ''}`}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setIsNameFocused(true)}
                            onBlur={() => setIsNameFocused(false)}
                        />
                        <label htmlFor='name'>New Name</label>
                    </div>
                    <div className={`changeprofile-input-group ${isNewPasswordFocused || newPassword ? 'focused' : ''}`}>
                        <input
                            type="password"
                            id="newpassword"
                            name="newpassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            onFocus={() => setIsNewPasswordFocused(true)}
                            onBlur={() => setIsNewPasswordFocused(false)}
                        />
                        <label htmlFor='username'>New Password</label>
                    </div>
                    <button type='submit'>Change Settings</button>
                </form>
            </div>
        </div>
    )

}