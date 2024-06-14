
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from 'nodemailer'


//login user
const loginUser = async(req,res)=>{

    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success: false,message:"Invalid credential"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
            res.json({success:false,message:"Error"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register new user
const registerUser = async(req,res)=>{
  
    const{name,number,password,email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already Exits"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter strong password    "})
        }

        //hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

       const user = await newUser.save()
       const token = createToken(user._id)
       res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})  
        
    }
}


const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = createToken(user._id, { expiresIn: '1h' });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY
      }
    });

    const resetURL = `http://localhost:5173/resetPassword/${token}`;
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password',
      text: `You requested a password reset. Click the link to reset your password: ${resetURL}`
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
};

// Reset password
const resetpassword = async (req, res) => {
  const token = req.params.token;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ status: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    console.error('Error in reset-password endpoint:', err);
    return res.status(400).json({ status: false, message: "Invalid token or server error" });
  }
};

export { loginUser, registerUser, forgotpassword, resetpassword };
