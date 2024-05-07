import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
        <div className="footer-content-left">
        <h1>Delicious Food Services</h1>
        <p>Our Restorant provide the best services with good discount.It provide services like home delivery,Cashon delivery,upi,etc. the restorant </p>
        <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-conten-center">
             <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy </li>
            </ul>
        </div>
        <div className="foter-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@delicious.com</li>
            </ul>
        </div>
    </div>   
    <hr/>
    <p className='footer-copyright'>Copyright 2024 @ Delicious.com - All Right Reserved. </p>
      
    </div>
  )
}

export default Footer
