import { Request, Response } from "express";
import User from "../models/Users.js";
import jwt, { JwtPayload } from "jsonwebtoken"
import { Types } from "mongoose";
import client from "../lib/redis.js";
import { createNewCouple } from "./payment.control.js";
// 產生AccessToken : 15m 和 RefreshToken : 7d 
const generateToken = (userId: Types.ObjectId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  })
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  })
  return { accessToken, refreshToken }
}
// 將 Refresh Token 存到 Redis
const storeRefreshToken = async (userId: Types.ObjectId, refreshToken: string) => {
  await client.set(`refreshToken:${userId}`, refreshToken, { EX: 7 * 24 * 60 * 60 })
}
// 設定 Cookie
const setCookie = (res: Response, refreshToken: string, accessToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // ‼️xss
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // ‼️csrf
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
  )
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000 // 15 minutes
  })
}
export const signup = async (req: Request, res: Response) => {

  const { email, name, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({ message: "用戶已存在" })
      return
    }

    const user = await User.create({
      email,
      name,
      password
    })
    await createNewCouple(user._id)
    const { refreshToken, accessToken } = generateToken(user._id)
    await storeRefreshToken(user._id, refreshToken)
    setCookie(res, refreshToken, accessToken)

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, message: "用戶註冊成功"
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "註冊失敗", error: error.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.comparePassword(password))) {
      const { refreshToken, accessToken } = generateToken(user._id)
      storeRefreshToken(user._id, refreshToken)
      setCookie(res, refreshToken, accessToken)
      res.status(200).json({
        message: "登入成功", user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      })
      return
    } else {
      res.status(400).json({ message: "帳號或密碼錯誤" })
      return
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "登入失敗", error: error })
  }
}
export const logout = async (req: Request, res: Response) => {
  try {

    const refreshToken = req.cookies.refreshToken
    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload
      await client.del(`refreshToken:${decoded.userId}`)
      res.clearCookie("refreshToken")
      res.clearCookie("accessToken")
      res.json({ message: "成功登出" })
    }
  } catch (error) {
    res.status(500).json({ message: "登出失敗", error: error },)
  }

}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      res.status(401).json({ message: "請重新登入" })
      return
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as JwtPayload
    const { userId } = decoded
    const storedToken = await client.get(`refreshToken:${userId}`)
    if (storedToken !== refreshToken) {
      res.status(403).json({ message: "請重新登入" })
      return
    }
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000 // 15 minutes
    })
    res.json({ message: "成功更新Token" })
  } catch (error) {
    res.status(500).json({ message: "更新Token失敗", error: error.message })
  }
}

export const getProfile = async (req: Request, res: Response) => {
  try {

    res.json(req.user)
  } catch (error) {
    console.log("Error in getProfile controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}
