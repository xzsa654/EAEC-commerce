import { Request, Response } from "express"
import Product from "../models/Products.js"
export const getCartProducts = async (req: Request, res: Response) => {
  try {
    // 取得特定的商品
    const products = await Product.find({ _id: { $in: req.user.cartItems } })
    // 過濾所需的內容 - 因為cartItems 本身沒有 product 的細節
    const cartItems = products?.map((product) => {
      // 挑選對應id的商品細節
      const item = req.user.cartItems.find((cartItem) => cartItem.id === product.id)

      return { ...product.toJSON(), quantity: item.quantity }
    })
    res.json(cartItems)
  } catch (error) {
    console.log("Error in getCartProducts controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}
export const addToCart = async (req: Request, res: Response) => {
  try {
    const user = req.user
    const { productId } = req.body
    const existingItem = user.cartItems.find(item => item.id === productId)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      user.cartItems.push(productId)
    }
    await user.save()
    res.json(user.cartItems)
  } catch (error) {
    console.log("Error in addToCart controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}
export const removeAllFromCart = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body

    const user = req.user

    // 沒有給Id則全部清除
    if (!productId) {
      user.cartItems = []
      // 有id則過濾掉此item
    } else {
      user.cartItems = user.cartItems.filter(item => item.id !== productId)
    }
    await user.save()

    res.json(user.cartItems)
  } catch (error) {
    if (error.name === 'VersionError') {
      res.status(200).json({ message: '資料成功刪除' });
    } else {
      res.status(500).json({ message: "Server Error", error: error.message })
    }
  }
}

export const updateQuantity = async (req: Request, res: Response) => {
  try {
    const { id: productId } = req.params
    const user = req.user
    const { quantity } = req.body
    const existingItem = user.cartItems.find(item => item.id === productId)
    if (existingItem) {
      // 如果沒有數量了則從購物車清除
      if (!existingItem.quantity) {
        user.cartItems.filter(item => item.id !== productId)
        await user.save()
      } else {
        // 修改價格為前台的價格
        existingItem.quantity = quantity
        await user.save()
      }
      res.json(user.cartItems)
    } else {
      res.status(404).json({ message: "商品不存在" })
    }
  } catch (error) {
    console.log("Error in updateQuantity controller", error.message);
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}


