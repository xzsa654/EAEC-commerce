import mongoose, { Document } from "mongoose";

export interface IProduct extends Document{
  _id:string|any
  name:string
  description:string
  price: number
  images:string[]
  category: string
  isFeatured: boolean
  createdAt:Date
  updatedAt:Date
}


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    min: 0,
    required:true
  },
  images: {
    type: [String],
    required: [true, "圖片是必要的"],
    validate: [
      function(val:string[]) {
        return val.length <= 8; // 这里限制最多5张图片
      },
      '圖片數量不能超過8張'
    ]
  },
  category: {
    type:String,
    required:true
  },
  isFeatured: {
    type: Boolean,
    default:false
  },
},{timestamps:true})

const Product = mongoose.model<IProduct>("Product",productSchema)

export default Product