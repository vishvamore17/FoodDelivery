import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin,setUsername }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  }

  const onForgotPassword = async (event) => {
    event.preventDefault();
    // Send request to initiate password reset
    const newUrl = url;
    const response = await axios.post `http://localhost:4000/api/user/forgot` //{ email: forgotPasswordEmail };

    // if (response.data.success) {
    //   alert("Password reset instructions sent to your email.");
    //   // Optionally, you can close the login popup or show a message to the user
    // } else {
    //   alert(response.data.message);
    // }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={forgotPassword ? onForgotPassword : onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{forgotPassword ? "Forgot Password" : currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs'>
          {forgotPassword ?
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
            :
            <>
              {currState === "Login" ? null : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
              {currState === "Login" ? null : <input type="text" placeholder="Your Number" required />}
            </>
          }
          {!forgotPassword &&
            <>
              <input name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
              <input name="password" onChange={onChangeHandler} value={data.password} id='password' type='password' placeholder='Password' required />
            </>
          }
        </div>
        <button type='submit'>{forgotPassword ? "Reset Password" : (currState === "Sign Up" ? "Create Account" : "Login")}</button>
        {!forgotPassword &&
          <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        }
        {forgotPassword ?
          <p>Remembered your password? <span onClick={() => setForgotPassword(false)}>Login here</span></p>
          :
          <>
            {currState === "Login" ? <p>Forgot your password? <span onClick={() => setForgotPassword(true)}>Click here</span></p> : null}
            {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>}
          </>
        }
      </form>
    </div>
  );
}

export default LoginPopup;