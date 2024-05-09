import mongoose from "mongoose";

export const connectDB =async () =>{
    await mongoose.connect('mongodb+srv://vishvamore17:vishva2003@cluster0.r6pf4ck.mongodb.net/food-del').then (()=>console.log("DB Connected"));

}