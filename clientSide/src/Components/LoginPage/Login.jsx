import './Login.css'

import logo from '../../assets/react.svg'
import eye from '../../assets/eye.png'
import hidden from '../../assets/hidden.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Login({setUser}) {

  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state && location.state.accountCreated) {
      toast.success("Account created successfully");
    }
  }, [location.state])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Wrong password, please try again")
      return;
    }
    fetch("http://localhost:8080/api/users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    .then((response) => {
      if (response.status === 406) {
        toast.error("Wrong username or password, please try again");
      } else if (response.status === 400) {
        toast.error("Could not connect to server, please try again later");
      } else if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Unexpected error");
      }
    })
    .then((user) => {
      if (user) {
        setUser({
          "username": user.username,
          "name": user.name,
          "password": user.password
        });
        navigate("/Documents");
      }
    })
  }

  return (
    <div className='login-allcontainer'>
      <ToastContainer />
      <img src={logo} alt="Company Logo" className='login-RotatorLogo'/>
      <div className='login-container'>
        <h1>Sign in</h1>
        <p>Keep it Professional with Collaborative Editing</p>
        <form onSubmit={handleSubmit}>
          <div className={`login-input-group ${isUsernameFocused || username ? 'focused' : ''}`}>
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
          <div className={`login-input-group ${isPasswordFocused || password ? 'focused' : ''}`}>
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
              className="login-eye-icon-Password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword? "Hide Password" : "Show Password"}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <p>New to Our Editor? <Link to="/Signup">Click Here to Sign up</Link></p>
      </div>
    </div>
  );

}