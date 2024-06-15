import '../../../../index.css'
import './DeleteAccount.css'

import eye from '../../../../assets/eye.png'
import hidden from '../../../../assets/hidden.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function DeleteAccount(props) {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== props.password) {
            toast.error("Wrong password, please try again");
            setPassword('');
        } else {
            fetch("http://localhost:8080/api/mixed/DeleteAccount", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({username: props.username}),
            })
            .then((response) => {
                if (response.status === 406) {
                  toast.error("There is something wrong with our server, please try again");
                } else if (response.status === 400) {
                  toast.error("Could not connect to server, please try again later");
                } else if (response.status === 200) {
                    props.setUser({});
                    navigate("/Login", { state: { accountDeleted: true } });
                } else {
                  throw new Error("Unexpected error");
                }
            })
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className='floatingcards'>
                <div className='floatingcards-header'>
                    <h2>Delete Account</h2>
                    <button onClick={() => {props.setShowDelete(false)}}>X</button>
                </div>
                <p className='deleteaccount-parag'>Sure you want to delete your account?</p>
                <form onSubmit={handleSubmit}>
                    <div className={`input-group ${isPasswordFocused || password ? 'focused' : ''}`}>
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
                        <label htmlFor='password'>Password</label>
                        <img
                          src={showPassword? hidden : eye}
                          alt="Toggle Password Visibility"
                          className="eye-icon-password"
                          onClick={() => setShowPassword(!showPassword)}
                          title={showPassword? "Hide Password" : "Show Password"}
                        />
                    </div>
                    <button className='input-buttons' type='submit'>Delete Account</button>
                </form>
            </div>
        </div>
    )
}