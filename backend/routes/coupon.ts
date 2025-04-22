import e from "express";
import { protectRoute } from "../middlewares/auth-middlewares.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.control.js";

const router = e.Router()

router.get("/", protectRoute, getCoupon)

router.post("/validate", protectRoute, validateCoupon)

export default router