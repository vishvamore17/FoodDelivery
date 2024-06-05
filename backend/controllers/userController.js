import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from 'nodemailer'
import crypto from 'crypto'
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
            return res.json({success:false,message:"Please enter strong password"})
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

const forgot = async(req,res)=>{
    const {email} = req.body;
    try {
      //  const generateOtp = Math.floor(Math.random()*10000);
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "meghapatil1142@gmail.com",
              pass: "megha123"
            }
          });

          const info = await transporter.sendMail({
            from: "vishvamore17@gmail.com", // sender address
            to: email, // list of receivers
            subject: "New OTP Generated", // Subject line
            html: `<b>OTP is:<i>${generateOtp}</i></b>`, // html body
          });
          
          if(info.messageId){
                       let user= await userModel.findOneAndUpdate({email},{otp:generateOtp},{new:true});
            if(!user){
                return  res.status(400).json({message:"User does not exist"})
            }
          }
          return res.status(200).json({message:"Otp sent successfully"})
    } catch (error) {
        return res.status(500).json({message:"error"});
    }
}

// const forgotPassword = (async(req,res)=>{
//     //1. GEt USER BASED ON POSTED EMAIL
//     const user = await userModel.findOne({email:req.body.email})

//      if(!user){
//           const error = new CustomError ('We could not find the user with given email',404);
//           return error;
//      }


//      const createResetPasswordToken = async(req,res) =>{
//       const resetToken = crypto.randomBytes(32);// Generate random bytes and convert to hex string
//       this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); // Hash the reset token and convert to hex string
//       this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // Set expiration time
    
//       console.log(resetToken, this.passwordResetToken);
//       return resetToken; // Return the reset token (optional)
//     }
    
  
     //2. GENERATE A RANDOM TOKEN

//      const resetToken = user.crearteResetPasswordToken();
//      await user.save();


//      //3.SEND THE TOKEN BACK TO THE USER EMAIL

// const resetPassword = async(req,res)=>{

// }

// // Route to handle password reset request
// const forgotPassword=async  (req, res) => {
//   const { email } = req.body;

//   // Check if the email exists in the database
//   const user = user.find(user => user.email === email);

//   if (!user) {
//     return res.status(404).json({ success: false, message: 'User not found.' });
//   }

//   // Generate a temporary password
//   const temporaryPassword = Math.random().toString(36).slice(-8);

//   // Update user's password in the database (this is just a mock, in real scenario you would update it securely)
//   user.password = temporaryPassword;

//   // Send password reset instructions to the user's email
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your_email@gmail.com', // Your Gmail email address
//       pass: 'your_password' // Your Gmail password
//     }
//   });

//   const mailOptions = {
//     from: 'your_email@gmail.com', // Your Gmail email address
//     to: email,
//     subject: 'Password Reset Instructions',
//     text: `Your temporary password is: ${temporaryPassword}. Please use this to log in and reset your password.`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       return res.status(500).json({ success: false, message: 'Failed to send password reset instructions.' });
//     } else {
//       console.log('Email sent: ' + info.response);
//       return res.status(200).json({ success: true, message: 'Password reset instructions sent to your email.' });
//     }
//   });
// };


// const forgotPassword = async(req,res)=>{
//     const {email} = req.body;
//     try {
//         // Check if the user with the provided email exists
//         const user = await user.findOne({ email });
    
//         if (!user) {
//           return res.status(404).json({ success: false, message: "User not found." });
//         }
    
//         // Generate and save a password reset token for the user
//         const resetToken = await generateResetToken() // You'll need to implement this function
//         user.resetPasswordToken = resetToken;
//         user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//         await user.save();  
    
//         // Send an email with the reset password link
//         await sendResetPasswordEmail(user.email, resetToken); // You'll need to implement this function
    
//         // Respond with success message
//         return res.status(200).json({ success: true, message: "Password reset instructions sent to your email." });
//       } catch (error) {
//         console.error("Error resetting password:", error);
//         return res.status(500).json({ success: false, message: "Internal server error." });
//       }
//     };
    
//     // Function to generate a random token for password reset
//     function generateResetToken() {
//       // Implement your token generation logic here, e.g., using crypto library
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(20, (err, buf) => {
//           if (err) {
//             reject(err);
//           } else {
//             const token = buf.toString('hex');
//             resolve(token);
//           }
//         });
//       });
//     }
    

    
//     // Function to send reset password email (you can use a library like nodemailer)
//     async function sendResetPasswordEmail (email, token) {
//       // Implement your email sending logic here, including a link with the token
//       try {
//         // Create a nodemailer transporter using SMTP transport
//         const transporter = nodemailer.createTransport({
//           service: 'YourEmailServiceProvider', // e.g., 'gmail', 'yahoo', etc.
//           auth: {
//             user: 'your_email@example.com', // Your email address
//             pass: 'your_email_password' // Your email password
//           }
//         });
    
//         // Send mail with defined transport object
//         await transporter.sendMail({
//           from: 'your_email@example.com', // Sender address
//           to: email, // List of recipients
//           subject: 'Password Reset', // Subject line
//           text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
//             + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//             + `http://example.com/reset-password/${token}\n\n`
//             + `If you did not request this, please ignore this email and your password will remain unchanged.\n` // Plain text body
//         });
    
//         console.log('Reset password email sent successfully.');
//       } catch (error) {
//         console.error('Error sending reset password email:', error);
//       }
//     }
    
    

export {loginUser,registerUser,forgot}