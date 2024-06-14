




import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, require:true},
    number:{type:Number, require:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
},{minimize:false})



const userModel= mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;

