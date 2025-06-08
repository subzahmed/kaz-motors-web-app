import { NextResponse } from "next/server"
import { getDashboardStats } from "@/lib/db/analytics"

export async function GET() {
  try {
    const stats = await getDashboardStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard statistics",
      },
      { status: 500 },
    )
  }
}
