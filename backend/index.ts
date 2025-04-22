import express, { json } from "express";
import { Express } from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/auth-route.js"
import cartRoutes from "./routes/cart-route.js"
import couponRoutes from "./routes/coupon.js"
import path from "path"
import productRoutes from "./routes/product-route.js"
import paymentRoutes from "./routes/payment-route.js"
import analyticsRoutes from "./routes/analytics-route.js"
import cors from "cors"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
dotenv.config()
const app: Express = express()
app.use(json(

))
app.use(cookieParser())
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

const __dirname = path.resolve()

app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupon", couponRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/analytics", analyticsRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Server is running on port", port);
  connectDB()

})
