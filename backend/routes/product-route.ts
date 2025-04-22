import e from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendations, toggleFeaturedProduct } from "../controllers/product.control.js";
import { adminRoute, protectRoute } from "../middlewares/auth-middlewares.js";
import upload from "../lib/multer.js"
const router = e.Router()

router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/getFeaturedProducts", getFeaturedProducts)
router.get("/recommendations", getRecommendations)
router.post("/createProduct", protectRoute, adminRoute, upload.array("images[]"), createProduct)
router.get("/category/:category", getProductsByCategory)
router.delete("/:id", protectRoute, adminRoute, deleteProduct)
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct)

export default router 