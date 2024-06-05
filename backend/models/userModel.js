import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, require:true},
    number:{type:Number, require:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
    otp:{type:Number,default:0}
    // passwordResetToken:{type:String,required:true},
    // passwordResetExpires:{type:Date,required:true},
},{minimize:false})



const userModel= mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;