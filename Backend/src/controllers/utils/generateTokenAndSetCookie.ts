import dotenv from 'dotenv';
import { Response } from "express";
const jwt = require("jsonwebtoken");
dotenv.config();

export const generateTokenAndSetCookie = (res:Response, userId:string) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};