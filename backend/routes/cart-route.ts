import e from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.control.js";
import { protectRoute } from "../middlewares/auth-middlewares.js";

const router = e.Router()
router.get("/", protectRoute, getCartProducts)
router.post("/", protectRoute, addToCart)
router.delete("/", protectRoute, removeAllFromCart)
router.put("/:id", protectRoute, updateQuantity)

export default router