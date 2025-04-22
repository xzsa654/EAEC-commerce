import { Request,Response } from "express";
import Coupon from "../models/coupon.js";

export const getCoupon = async (req: Request, res: Response) => {
  try {
    const coupon =await Coupon.findOne({userId:req.user._id,isActive:true})
    res.json(coupon||null)
  } catch (error) {
    console.log("Error in getCoupon controller",error.message);
    res.status(500).json({message:"Server Error",error:error.message})
  }
}

export const validateCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await Coupon.findOne({code:req.body.code,userId:req.user._id,isActive:true})
    if (!coupon) {
      res.status(404).json({message:"優惠券不存在"})
      return
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false
      await coupon.save()
      res.status(400).json({message:"優惠券已過期"})
      return
    }
    res.json({message:"優惠券驗證成功",code:coupon.code,discountPercentage:coupon.discountPercentage})
  } catch (error) {
    console.log("Error in validateCoupon controller",error.message);    
    res.status(500).json({message:"Server Error",error:error.message})
  }
}