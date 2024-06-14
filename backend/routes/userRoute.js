
import express from "express"
import {  loginUser,registerUser,forgotpassword,resetpassword} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/forgotpassword",forgotpassword)
userRouter.post("/resetpassword/:token",resetpassword)
  
  
  

export default userRouter;  
