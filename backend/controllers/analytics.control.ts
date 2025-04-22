import User from "../models/Users.js"
import Product from "../models/Products.js"
import Order from "../models/order.model.js"

// 全部都是 help function 
// 獲取總金額 / 總用戶數 / 總商品數
export const getAnalyticsData = async () => {
  const totalUsers = await User.countDocuments()
  const totalProducts = await Product.countDocuments()
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" }
      }
    }
  ])

  const { totalSales, totalRevenue } = salesData[0] || { totalSales: 0, totalRevenue: 0 }
  return { totalUsers, totalProducts, totalSales, totalRevenue }
}

// 獲取以今天算起過去 7 天的銷售資料
export const dailySalesData = async (startDate: Date, endDate: Date) => {
  try {
    interface IdailySales {
      _id: string
      totalSales: number | null
      totalRevenue: number | null
    }

    const dailySales = await Order.aggregate<IdailySales>([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" }
        }
      }, {
        $sort: {
          _id: 1
        }
      }
    ])

    const dateArray: string[] = getDatesInRange(startDate, endDate)

    return dateArray.map((date) => {
      const foundData = dailySales.find(d => d._id === date)
      return {
        foundData,
        sales: foundData?.totalSales || 0,
        revenue: foundData?.totalRevenue || 0
      }
    })
  } catch (e) {
    throw e
  }
}
// 取得時間軸
const getDatesInRange = (startDate: Date, endDate: Date) => {
  let currentDate: Date = new Date(startDate)
  const dates = []
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0])
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}