import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'

const app=express()
const port=4000

app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoint 
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.get('/',(req,res)=>{
    res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})



//mongodb+srv://vishvamore17:vishva2003@cluster0.r6pf4ck.mongodb.net/?