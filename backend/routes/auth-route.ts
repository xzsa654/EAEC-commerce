import e from "express";
import { getProfile, login, logout, refreshToken, signup } from "../controllers/auth.control.js";
import upload from "../lib/multer.js"
import { protectRoute } from "../middlewares/auth-middlewares.js";

const router = e.Router()

router.post("/signup", upload.none(), signup)

router.post("/login", upload.none(), login)

router.post("/logout", logout)

router.post("/refresh-token", refreshToken)

router.get("/profile", protectRoute, getProfile)

export default router