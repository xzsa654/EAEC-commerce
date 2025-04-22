import mongoose, { Schema,Document } from "mongoose";
import { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser extends Document{
  _id: string | any;
  name:string
  email:string
  password: string
  cartItems: {
    id:string
    quantity: number
    product:string|any
  }[]
  role: "customer" | "admin"
  comparePassword(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema:Schema= new mongoose.Schema({
  name: {
    type: String,
    required:[true, "Name is required"],
  },
  email:{
    type: String,
    required:[true,"Email is required"],
    unique: true,
    lowercase: true,
    trim:true
  },
  password: {
    type: String,
    required:[true,"Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  cartItems: [
    {
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
      }
    }
  ],
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  // 創建時間 , 更新時間
}, {
  timestamps:true
})
// 帶儲存資料前先進行密碼格式化
userSchema.pre("save",async function (next) {
  if (!this.isModified("password")) {
    return next()
  } 
  else {
    this.password =await bcrypt.hash(this.password as string, 10)
    return next()
  }
})
// 比對密碼方法
userSchema.methods.comparePassword =
  async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password,this.password)
}

const User =mongoose.model<IUser>("User",userSchema)




export default User