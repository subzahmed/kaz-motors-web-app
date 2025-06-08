import { NextResponse } from "next/server"
import { getCarById, updateCar, deleteCar } from "@/lib/db/cars"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const car = await getCarById(id)

    if (!car) {
      return NextResponse.json({ success: false, message: "Car not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, car })
  } catch (error) {
    console.error("Error fetching car:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch car" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Update car in database
    const success = await updateCar(id, data)

    if (!success) {
      return NextResponse.json({ success: false, message: "Car not found or not updated" }, { status: 404 })
    }

    // Get the updated car
    const updatedCar = await getCarById(id)

    return NextResponse.json({ success: true, car: updatedCar })
  } catch (error) {
    console.error("Error updating car:", error)
    return NextResponse.json({ success: false, message: "Failed to update car" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Delete car from database
    const success = await deleteCar(id)

    if (!success) {
      return NextResponse.json({ success: false, message: "Car not found or not deleted" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Car deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting car:", error)
    return NextResponse.json({ success: false, message: "Failed to delete car" }, { status: 500 })
  }
}
