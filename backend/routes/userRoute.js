import express from "express"
import {  loginUser,registerUser,forgot} from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/forgot",forgot)
// userRouter.post("/forgotPassword",forgotPassword)
// userRouter.post("/reset-password",resetPassword)

export default userRouter;  