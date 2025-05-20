"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Car = {
  id: string
  title: string
  price: number
  year: number
  make: string
  model: string
  mileage: number
  images: string[]
}

export function SimilarCars() {
  const [similarCars, setSimilarCars] = useState<Car[]>([])

  useEffect(() => {
    // In a real app, this would fetch similar cars based on the current car
    setSimilarCars([
      {
        id: "2",
        title: "2022 BMW 7 Series",
        price: 95000,
        year: 2022,
        make: "BMW",
        model: "7 Series",
        mileage: 8000,
        images: ["/placeholder.svg?height=600&width=800"],
      },
      {
        id: "3",
        title: "2023 Audi A8",
        price: 88000,
        year: 2023,
        make: "Audi",
        model: "A8",
        mileage: 3000,
        images: ["/placeholder.svg?height=600&width=800"],
      },
      {
        id: "4",
        title: "2022 Lexus LS",
        price: 82000,
        year: 2022,
        make: "Lexus",
        model: "LS",
        mileage: 7000,
        images: ["/placeholder.svg?height=600&width=800"],
      },
    ])
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {similarCars.map((car) => (
        <Card key={car.id}>
          <div className="relative">
            <Link href={`/inventory/${car.id}`}>
              <Image
                src={car.images[0] || "/placeholder.svg"}
                alt={car.title}
                width={800}
                height={600}
                className="h-40 w-full object-cover"
              />
            </Link>
          </div>
          <CardContent className="p-4">
            <Link href={`/inventory/${car.id}`}>
              <h3 className="text-lg font-bold hover:text-primary transition-colors">{car.title}</h3>
            </Link>
            <p className="text-gray-500 mb-2">
              {car.year} • {car.mileage.toLocaleString()} miles
            </p>
            <p className="text-xl font-bold text-primary">${car.price.toLocaleString()}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href={`/inventory/${car.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
