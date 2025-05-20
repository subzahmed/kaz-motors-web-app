import { NextResponse } from "next/server"

// Mock database - in a real application, this would be a database connection
const cars = [
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
  {
    id: "2",
    title: "2022 BMW 7 Series",
    price: 95000,
    year: 2022,
    make: "BMW",
    model: "7 Series",
    mileage: 8000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    exteriorColor: "Alpine White",
    interiorColor: "Cognac Nappa Leather",
    engine: "3.0L Inline-6 Turbo",
    vin: "WBA7E2C55JG123456",
    features: [
      "Executive Package",
      "Driving Assistance Professional",
      "Bowers & Wilkins Diamond Surround Sound",
      "Panoramic Sky Lounge LED Roof",
    ],
    description: "Luxury meets performance in this elegant 2022 BMW 7 Series sedan.",
    images: ["/placeholder.svg?height=600&width=800"],
    featured: true,
    status: "available",
  },
  {
    id: "3",
    title: "2023 Audi A8",
    price: 88000,
    year: 2023,
    make: "Audi",
    model: "A8",
    mileage: 3000,
    fuelType: "Hybrid",
    transmission: "Automatic",
    exteriorColor: "Mythos Black",
    interiorColor: "Valcona Leather",
    engine: "3.0L V6 TFSI",
    vin: "WAU8DAF85JN123789",
    features: [
      "Executive Package",
      "Bang & Olufsen 3D Advanced Sound System",
      "Head-up Display",
      "Night Vision Assistant",
    ],
    description: "Experience the pinnacle of Audi luxury with this 2023 A8 sedan.",
    images: ["/placeholder.svg?height=600&width=800"],
    featured: false,
    status: "available",
  },
]

export async function GET() {
  return NextResponse.json({ cars })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Generate a unique ID
    const id = (cars.length + 1).toString()

    // Create new car object
    const newCar = {
      id,
      ...data,
      images: data.images || ["/placeholder.svg?height=600&width=800"],
      featured: data.featured || false,
      status: "available",
    }

    // Add to "database"
    cars.push(newCar)

    return NextResponse.json({ success: true, car: newCar })
  } catch (error) {
    console.error("Error adding car:", error)
    return NextResponse.json({ success: false, message: "Failed to add car" }, { status: 500 })
  }
}
