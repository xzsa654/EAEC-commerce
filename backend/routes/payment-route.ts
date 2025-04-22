import e from "express";
import { checkout } from "../controllers/payment.control.js";
import { protectRoute } from "../middlewares/auth-middlewares.js";
const router = e.Router()

router.post("/checkout", protectRoute, checkout)

export default router