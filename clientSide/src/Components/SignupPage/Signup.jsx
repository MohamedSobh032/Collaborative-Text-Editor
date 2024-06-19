import "./Signup.css";
import "../../index.css";

import logo from "../../assets/react.svg";
import eye from "../../assets/eye.png";
import hidden from "../../assets/hidden.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfimPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    fetch("http://localhost:8080/api/users/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 406) {
        // NOT ACCEPTABLE
        setUsername("");
        toast.error("Username already exists");
      } else if (response.status === 201) {
        // CREATED
        navigate("/login", { state: { accountCreated: true } });
      } else if (response.status === 400) {
        // BAD REQUEST
        toast.error("Could not connect to server, please try again later");
      }
    });
  };

  return (
    <div className="login-signup">
      <ToastContainer />
      <img src={logo} alt="Company Logo" className="RotatorLogo" />
      <div className="login-signup-container">
        <h1>Sign up</h1>
        <p>Hope you Enjoy Our Application!</p>
        <form onSubmit={handleSubmit}>
          <div className={`input-group ${isNameFocused || name ? "focused" : ""}`}>
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
            <label htmlFor="name">Name</label>
          </div>
          <div className={`input-group ${isUsernameFocused || username ? "focused" : ""}`}>
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
            <label htmlFor="username">Username</label>
          </div>
          <div className={`input-group ${isPasswordFocused || password ? "focused" : ""}`}>
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
            <label htmlFor="password">Password</label>
            <img
              src={showPassword ? hidden : eye}
              alt="Toggle Password Visibility"
              className="eye-icon-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
            />
          </div>
          <div className={`input-group ${isConfimPasswordFocused || confirmPassword ? "focused" : ""}`}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => SetConfirmPassword(e.target.value)}
              onFocus={() => setIsConfirmPasswordFocused(true)}
              onBlur={() => setIsConfirmPasswordFocused(false)}
              required
            />
            <label htmlFor="password">Confirm Password</label>
            <img
              src={showConfirmPassword ? hidden : eye}
              alt="Toggle Password Visibility"
              className="eye-icon-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Hide Password" : "Show Password"}
            />
          </div>
          <button className="input-buttons" type="submit">Sign up</button>
        </form>
        <p>Already Have an Account? <Link to="/Login">Click Here to Login</Link></p>
      </div>
    </div>
  );
}
