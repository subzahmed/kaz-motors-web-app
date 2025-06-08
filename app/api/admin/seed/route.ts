import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed-data"

export async function POST(request: Request) {
  try {
    // Only allow in development mode to prevent accidental data creation in production
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json(
        {
          success: false,
          message: "Seeding is only allowed in development mode",
        },
        { status: 403 },
      )
    }

    const { count, inquiryCount } = await request.json()

    const result = await seedDatabase(count || 20, inquiryCount || 10)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed database",
      },
      { status: 500 },
    )
  }
}
