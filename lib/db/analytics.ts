import clientPromise from "../mongodb"
import { isMongoAvailable } from "./cars"

// Mock data for when MongoDB isn't available
const mockStats = {
  totalVehicles: 63,
  vehiclesChange: 2,
  activeInquiries: 12,
  inquiriesChange: 3,
  totalCustomers: 245,
  customersChange: 18,
  totalRevenue: 452500,
  revenueChange: 20.1,
}

export async function getDashboardStats() {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock dashboard stats (MongoDB not available)")
    return mockStats
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    // Get current month and previous month date ranges
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Get total vehicles and monthly change
    const totalVehicles = await db.collection("cars").countDocuments()
    const previousMonthVehicles = await db.collection("cars").countDocuments({
      createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
    })

    // Get active inquiries and daily change
    const yesterday = new Date(now)
    yesterday.setDate(now.getDate() - 1)

    const activeInquiries = await db.collection("inquiries").countDocuments({ read: false })
    const yesterdayInquiries = await db.collection("inquiries").countDocuments({
      createdAt: { $gte: yesterday },
    })

    // Get unique customers (based on email) and monthly change
    const uniqueEmails = await db.collection("inquiries").distinct("email")
    const totalCustomers = uniqueEmails.length

    const previousMonthEmails = await db.collection("inquiries").distinct("email", {
      createdAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
    })
    const customersChange = totalCustomers - previousMonthEmails.length

    // Calculate total revenue (sum of all car prices)
    const cars = await db.collection("cars").find({}).toArray()
    const totalRevenue = cars.reduce((sum, car) => sum + (car.price || 0), 0)

    // For revenue change, we'd typically compare with previous month sales
    // For this demo, we'll use a random percentage between 5-25%
    const revenueChange = Number.parseFloat((Math.random() * 20 + 5).toFixed(1))

    return {
      totalVehicles,
      vehiclesChange: totalVehicles - previousMonthVehicles,
      activeInquiries,
      inquiriesChange: yesterdayInquiries,
      totalCustomers,
      customersChange,
      totalRevenue,
      revenueChange,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats from MongoDB:", error)
    return mockStats
  }
}
