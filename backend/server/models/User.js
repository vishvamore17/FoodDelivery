import mongoose, { Schema } from 'mongoose'


const UserSchema =Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        }
})
const UserModel =mongoose.model("User",UserSchema)
export {UserModel as User}