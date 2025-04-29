import cloudinary from "../lib/cloudinary.js"
import client from "../lib/redis.js"
import Product, { IProduct } from "../models/Products.js"
import { Response, Request } from "express"
export const getAllProducts = async (req, res: Response) => {
  try {
    const products = await Product.find({}) // 取得所有商品
    res.status(200).json({ products })
  } catch (error) {
    res.status(500).json({ message: "sever Error", error: error.message })
    return
  }
}

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    let featuredProducts: string | IProduct[] = await client.get("featured_products")
    if (featuredProducts) {
      res.json(JSON.parse(featuredProducts))
      return
    }
    featuredProducts = await Product.find({ isFeatured: true }).lean()
    await client.set("featured_products", JSON.stringify(featuredProducts))

    res.json(featuredProducts)
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category } = req.body
    if (req.files.length) {
      const images = (req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => file.path)
      let imagesUrl: string[] = []
      for (const image of images) {
        const result = await cloudinary.uploader.upload(image)
        imagesUrl.push(result.secure_url)
      }
      const product: unknown | IProduct = await Product.create(
        { name, description, price, images: imagesUrl, category }
      )
      res.status(201).json(product)
    } else {
      res.status(400).json({ message: "缺少商品圖片" })
      return
    }
  } catch (error) {
    console.log("create product error", error);
    res.status(500).json({ message: "Server Error", error: error.message })
  }

}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product: IProduct = await Product.findById(req.params.id)
    if (!product) {
      res.status(404).json({ message: "商品不存在" })
      return
    }
    await Promise.all(product.images?.map(async (image: string) => {
      try {
        const publicId = image.split("/").pop().split(".")[0]
        await cloudinary.uploader.destroy(publicId)
      } catch (error) {
        console.log(error);
      }
    }))
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "商品刪除成功" })
  } catch (error) {
    res.status(500).json({ message: "Server Error - deleteProduct", error: error.message })
  }
}

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          images: 1,
          price: 1
        }
      }
    ])

    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category } = req.params
  try {
    const products = await Product.find({ category })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const toggleFeaturedProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    product.isFeatured = !product.isFeatured
    await product.save()
    await updateFeaturedProductsCache()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: "Server Error in toggleFeatured", error: error.message })
  }
}

const updateFeaturedProductsCache = async () => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean()
    await client.set("featured_products", JSON.stringify(featuredProducts))
  } catch (error) {
    console.log("error in updateCache function ");

  }
}