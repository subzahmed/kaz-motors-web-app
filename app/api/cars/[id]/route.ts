import { NextResponse } from "next/server"

// This would connect to your database in a real application
let cars = [
  {
    id: "1",
    title: "2023 Mercedes-Benz S-Class",
    price: 110000,
    year: 2023,
    make: "Mercedes-Benz",
    model: "S-Class",
    mileage: 5000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    exteriorColor: "Obsidian Black",
    interiorColor: "Black/Nappa Leather",
    engine: "4.0L V8 Biturbo",
    vin: "WDDUG8FB7MA456789",
    features: [
      "Premium Package",
      "Driver Assistance Package",
      "Burmester 3D Surround Sound",
      "Heated and Ventilated Seats",
      "Panoramic Sunroof",
    ],
    description: "Experience luxury and performance with this stunning 2023 Mercedes-Benz S-Class.",
    images: ["/placeholder.svg?height=600&width=800"],
    featured: true,
    status: "available",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const car = cars.find((car) => car.id === id)

  if (!car) {
    return NextResponse.json({ success: false, message: "Car not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, car })
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Find the car index
    const carIndex = cars.findIndex((car) => car.id === id)

    if (carIndex === -1) {
      return NextResponse.json({ success: false, message: "Car not found" }, { status: 404 })
    }

    // Update car
    cars[carIndex] = {
      ...cars[carIndex],
      ...data,
    }

    return NextResponse.json({ success: true, car: cars[carIndex] })
  } catch (error) {
    console.error("Error updating car:", error)
    return NextResponse.json({ success: false, message: "Failed to update car" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Find the car index
    const carIndex = cars.findIndex((car) => car.id === id)

    if (carIndex === -1) {
      return NextResponse.json({ success: false, message: "Car not found" }, { status: 404 })
    }

    // Remove car
    cars = cars.filter((car) => car.id !== id)

    return NextResponse.json({ success: true, message: "Car deleted successfully" })
  } catch (error) {
    console.error("Error deleting car:", error)
    return NextResponse.json({ success: false, message: "Failed to delete car" }, { status: 500 })
  }
}
