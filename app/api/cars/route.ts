import { NextResponse } from "next/server"
import { getCars, createCar, searchCars } from "@/lib/db/cars"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Check if we have search parameters
    if (searchParams.toString()) {
      const query = Object.fromEntries(searchParams.entries())
      const cars = await searchCars(query)
      return NextResponse.json({ success: true, cars })
    }

    // Otherwise, get all cars
    const cars = await getCars()
    return NextResponse.json({ success: true, cars })
  } catch (error) {
    console.error("Error fetching cars:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch cars" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Create new car in database
    const newCar = await createCar(data)

    return NextResponse.json({ success: true, car: newCar })
  } catch (error) {
    console.error("Error adding car:", error)
    return NextResponse.json({ success: false, message: "Failed to add car" }, { status: 500 })
  }
}
