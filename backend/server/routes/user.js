import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();



router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ username: user.username }, process.env.KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '1h' });

    // Implement logic to send reset password email here...
    // Example code to send email using nodemailer:
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY
      }
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password',
      text:`http://localhost:5173/resetPassword/${token}` 
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ status: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error('Error in forgot-password endpoint:', error);
    return res.status(500).json({ message: "Server error" });
  }
});


router.post('/reset-password/:token', async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword });

    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    // Respond with success message
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    // If token is invalid or any other error occurs
    console.error('Error in reset-password endpoint:', err);
    return res.status(400).json({ status: false, message: "Invalid token or server error" });
  }
});




export { router as UserRouter };
