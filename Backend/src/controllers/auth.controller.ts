import bcryptjs from "bcryptjs";
import crypto from "crypto";
import dotevn from 'dotenv';
import { Request, Response } from "express";
import { QuestionBank } from "../Models/QuestionBank";
import { User } from "../Models/User.Schema";
import { sendResetEmail, subscribedtoEmail, welcomeEmail } from "../nodemailer/sendEmails";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { generateTokenAndSetCookie } from "./utils/generateTokenAndSetCookie";

dotevn.config();

export const signUpDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, password, email } = req.body;
  try {
    if (!name || !password || !email) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPass = await bcryptjs.hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashPass,
      isSubscribed:false,
    });

    await user.save();
    generateTokenAndSetCookie(res, user.id);
    await welcomeEmail(email);
    return res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const loginDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
    generateTokenAndSetCookie(res, user.id);
    return res.status(201).json({
      success: true,
      message: "User verified ",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logged out succesfully" });
};

export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, messsage: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    await sendResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    return res.status(201).json({
      success: true,
      message: "Re-Set Email Sent succesfully",
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in forgetPassword", error);
    return res.status(400).json({ success: false, message: error });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body; 

  try {
   
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: "Passwords do not match" 
      });
    }

   
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: new Date() }, 
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }

   
    const hashedPassword = await bcryptjs.hash(password, 10);

   
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    
   
    const savedUser = await user.save();
    
    if (!savedUser) {
      throw new Error("Failed to save user");
    }

    return res.status(200).json({ 
      success: true, 
      message: "Password reset successfully" 
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const checkAuth=async(req:AuthenticatedRequest,res:Response):Promise<any>=>{
  try {
    const user  =await User.findById(req.userId).select("-password");
    if(!user){
      return res.status(400).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error });
  }
}

export const subscribe=async(req:AuthenticatedRequest,res:Response):Promise<any>=>{
    try {
      const user =await User.findById(req.userId);
       if(!user){
        return res
        .status(400)
        .json({ success: false, message: "User not found" });
       }
       user.isSubscribed=true;
       await user.save();
       await subscribedtoEmail(user.email);
       res.status(200).json({success:true,message:"subscibed successfully"})
    } catch (error) {
      res.status(202).json({success:false,message:"something went wrong in subscribing"})
    }
}

export const allQuestions = async (req: Request, res: Response): Promise<any> => {
  try {
    const list = await QuestionBank.find().select('question date -_id'); // Only get question and date fields
    res.status(200).json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ 
      success: false,
      message: "Something went wrong in the questions section" 
    });
  }
}