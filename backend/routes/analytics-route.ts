import e, { Request, Response } from "express";
import { dailySalesData, getAnalyticsData } from "../controllers/analytics.control.js";
import { adminRoute, protectRoute } from "../middlewares/auth-middlewares.js";

const router =e.Router()

router.get("/",protectRoute,adminRoute,async(req:Request, res:Response) => {
  try {
    const analyticsData =await getAnalyticsData()
    const endDate = new Date()
    const startDate = new Date(endDate.getTime()-7*24*60*60*1000)
    const dailySales = await dailySalesData(startDate,endDate)
    res.json({analyticsData,dailySales})
  } catch (error) {
    console.log("Error in analytics route",error.message);
    res.status(500).json({message:"Server Error",error:error.message})
  }
})

export default router