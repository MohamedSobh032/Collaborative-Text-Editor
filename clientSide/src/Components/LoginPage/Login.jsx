import './Login.css'
import logo from '../../assets/react.svg'
import eye from '../../assets/eye.png'
import hidden from '../../assets/hidden.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Login() {

  const location = useLocation();

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
    console.log('Hello World');
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