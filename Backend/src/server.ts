import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './Connect_MongoDB/connect_DB';
import aiRoutes from './Routes/aiRoutes';
import authRoutes from './Routes/authRoutes';
import { dailyJobs } from './node-corn/Dailyquestion';
const cookieParser = require('cookie-parser');

dotenv.config();


const app=express();
const port: number = Number(process.env.PORT) || 5050;
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello server");
});
app.use('/api/auth', authRoutes);
app.use('/api/sending',aiRoutes);
dailyJobs();
  
app.listen(port,()=>{
    connectDB();
    console.log('App is listing in port',port)
});