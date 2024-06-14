import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import './reset.css'; // Ensure this is the correct path to your CSS file
import { assets } from '../../assets/assets';

const Reset = () => {
  const { token } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const response = await axios.post(`http://localhost:4000/api/user/resetpassword/${token}`, { password });
      if (response.data.status) {
        toast.success("Password updated successfully");
        setShow(false); // Hide the reset password popup after successful password reset
        navigate('/'); // Redirect to the login page or any other page
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className='reset'>
      {show && (
        <div className='reset-popup-container'>
          <ToastContainer />
          <form onSubmit={onSubmit}>
            <div className='reset-popup-title'>
              <h2>Reset Password</h2>
              <img className="cross" onClick={() => setShow(false)} src={assets.cross_icon} alt="Close" />
            </div>
            <div className='reset-popup-inputs'>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reset;
