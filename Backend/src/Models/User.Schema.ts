import mongoose from "mongoose";

const user=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index: true
    },
    password:{
        type:String,
        required:true,
    },
    isSubscribed: {
        type: Boolean,
        index: true 
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
},{timestamps:true});

export  const User =mongoose.model("User",user);