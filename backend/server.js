import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


const app=express()
const port=4000

app.use(express.json())
app.use(cors())

// db connection
connectDB();

//api endpoint 
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter)
app.use(express.static('public'))
app.use('/image',express.static('uploads'));
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


app.get('/',(req,res)=>{
    res.send("Api Working")
})


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})


