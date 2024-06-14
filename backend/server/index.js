import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//env file config
dotenv.config();

//add express
const app = express();

app.use(express.json());

//cors
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

//cookie
app.use(cookieParser());

//create route
app.use('/auth', UserRouter);

//mongoose connect
mongoose.connect(process.env.URL)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error('Database connection error:', error);
});
