"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export function CarouselFeaturedCars() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from your API
    // Fetch only featured cars
    setFeaturedCars([
      {
        id: "1",
        title: "2023 Mercedes-Benz S-Class",
        price: 110000,
        year: 2023,
        make: "Mercedes-Benz",
        model: "S-Class",
        mileage: 5000,
        images: ["/placeholder.svg?height=600&width=800"],
      },
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
    ])
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === featuredCars.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? featuredCars.length - 1 : prevIndex - 1))
  }

  if (featuredCars.length === 0) {
    return null
  }

  // Calculate visible cars based on screen size
  const visibleCars = featuredCars.slice(currentIndex, currentIndex + 3)
  if (visibleCars.length < 3 && featuredCars.length > 3) {
    // Add cars from the beginning if we're near the end
    visibleCars.push(...featuredCars.slice(0, 3 - visibleCars.length))
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto md:overflow-hidden gap-6 pb-4 md:pb-0">
        {visibleCars.map((car) => (
          <Card key={car.id} className="min-w-[300px] md:w-full flex-1">
            <div className="relative">
              <Link href={`/inventory/${car.id}`}>
                <Image
                  src={car.images[0] || "/placeholder.svg"}
                  alt={car.title}
                  width={800}
                  height={600}
                  className="h-48 w-full object-cover"
                />
              </Link>
              <Badge className="absolute top-2 right-2">Featured</Badge>
            </div>
            <CardContent className="p-4">
              <Link href={`/inventory/${car.id}`}>
                <h3 className="text-lg font-bold hover:text-primary transition-colors">{car.title}</h3>
              </Link>
              <p className="text-gray-500 mb-2">
                {car.year} • {car.mileage.toLocaleString()} miles
              </p>
              <p className="text-2xl font-bold text-primary">${car.price.toLocaleString()}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link href={`/inventory/${car.id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {featuredCars.length > 3 && (
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      )}
    </div>
  )
}
