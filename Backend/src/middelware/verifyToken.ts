import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

const jwt = require("jsonwebtoken");


export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction):any => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
     return res.status(500).json({ success: false, message: "Server error" });
  }
};
