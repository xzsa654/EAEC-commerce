import { Request, Response,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import User, { IUser } from "../models/Users.js";

declare global {
  namespace Express {
    interface Request {
      user?:IUser
    }
  }
}

export const protectRoute = async (req:Request, res: Response, next: NextFunction) =>{
  try {
    const accessToken = req.cookies.accessToken
    
    if (!accessToken) {
      res.status(401).json({message:"Unauthorized - no access token"})
      return
    } 
    try {
      const {userId} =jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET) as JwtPayload
      const user = await User.findById(userId).select("-password")
      if (!user) {
        res.status(401).json({message:"用戶不存在"})
        return
      }
      req.user = user as unknown as IUser
      next()
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({message:"Unauthorized - access 逾期"})
      }
      throw error
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"sever error"})
    return
  }
}


export const adminRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    return next()
  } else {
    res.status(401).json({message:"Unauthorized Admin Only"})
  }
}