import React, { useState } from 'react'
import './LoginPopup.css'
import { assets} from '../../assets/assets'

function LoginPopup({setShowLogin}) {
    const [currState, setCurrState] =useState("Sign up")
  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
        <div className='login-popup-title'>
        <h2>{currState}</h2>
        <img onClick={() =>setShowLogin(false)} src={assets.cross_icon} alt=""></img>
        </div>
        <div className='login-popup-inputs'>
        
            {currState==="Login"?<></>:<input type="text" placeholder="your name" required />}
            {currState==="Login"?<></>:<input type="text" placeholder="your Number" required />}
        <input type="email" placeholder='your email' required/>
        <input id='password' type='password' placeholder='password' required/>
        </div>
        <button>{currState==="sign up" ? "create account":"Login"}</button>
        <div className='login-popup-condition'>
            <input type="checkbox" required/>
            <p>By continueing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login" ?<p>Create a ne account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account?<span onClick={()=>setCurrState("Login")}>login here</span></p>
        }
        
       
        </form>

    </div>
  )
}

export default LoginPopup