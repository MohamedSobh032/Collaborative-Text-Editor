import "./Signup.css";
import logo from "../../assets/react.svg";
import eye from "../../assets/eye.png";
import hidden from "../../assets/hidden.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfimPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hello World");
  };

  return (
    <div className="signup-allcontainer">
      <img src={logo} alt="Company Logo" className="signup-RotatorLogo" />
      <div className="signup-container">
        <h1>Sign up</h1>
        <p>Hope you Enjoy Our Application!</p>
        <form onSubmit={handleSubmit}>
          <div className={`signup-input-group ${isNameFocused || name ? 'focused' : ''}`}>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
              required
            />
            <label htmlFor='name'>Name</label>
          </div>
          <div className={`signup-input-group ${isUsernameFocused || username ? 'focused' : ''}`}>
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
          <div className={`signup-input-group ${isPasswordFocused || password ? 'focused' : ''}`}>
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
              className="signup-eye-icon-Password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword? "Hide Password" : "Show Password"}
            />
          </div>
          <div className={`signup-input-group ${isConfimPasswordFocused || confirmPassword ? 'focused' : ''}`}>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              required
            />
            <label htmlFor='password'>Confirm Password</label>
          </div>
          <button type='submit'>Sign up</button>
        </form>
        <p>Already Have an Account? <Link to="/Login">Click Here to Login</Link></p>
      </div>
    </div>
  );
}
