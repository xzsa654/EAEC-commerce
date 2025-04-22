import { Request, Response } from "express"
import Coupon from "../models/coupon.js"
import axios from "axios"
import Order from "../models/order.model.js"
export const checkout = async (req: Request, res: Response) => {
  try {
    const { products, couponCode, prime } = req.body
    const user = req.user
    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: "查無任何商品" })
      return
    }
    let amount: number = 0
    let details: string = ""
    for (let product of products) {
      amount += product.price * product.quantity
      details = details + product.name
    }
    const coupon = await Coupon.findOne({ code: couponCode, userId: user._id, isActive: true })

    if (coupon) {
      amount = amount - (coupon.discountPercentage / 100) * amount
    }
    if (amount >= 3000) {
      await createNewCouple(user._id)
    }
    const cardholder = {
      name: user.name,
      phoneNumber: '0912345678',
      email: user.email
    }
    const postData = {
      prime,
      partner_key: process.env.TAPPAY_PARTNER_KEY,
      amount,
      details,
      cardholder
    }
    const result = await axios.post("https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime",
      postData,
      {
        headers: {
          "x-api-key": process.env.TAPPAY_PARTNER_KEY,
          "Content-Type": "application/json"
        }
      }
    )
    const order = new Order({
      user: req.user._id,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
        price: product.price
      })),
      totalAmount: amount,
    })

    await order.save()
    res.status(200).json({ success: true, message: "結帳成功", orderId: order._id })
  } catch (error) {
    console.log("error in checkout", error.message);
    res.status(500).json(error.message)
  }
}

export async function createNewCouple(userId: string) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    userId: userId
  })
  await newCoupon.save()
  return newCoupon
}