"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InquiryButton } from "@/components/inquiry-button"
import { Info } from "lucide-react"

type Car = {
  _id: string
  title: string
  price: number
  year: number
  make: string
  model: string
  mileage: number
  images: string[]
  featured: boolean
}

export function CarGrid() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch("/api/cars")
        const data = await response.json()

        if (data.success) {
          setCars(data.cars)
        } else {
          console.error("Error fetching cars:", data.message)
        }
      } catch (error) {
        console.error("Error fetching cars:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="animate-pulse bg-hom-gray border-0">
            <div className="h-48 bg-hom-dark rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-6 bg-hom-dark rounded mb-2" />
              <div className="h-4 bg-hom-dark rounded w-3/4 mb-4" />
              <div className="h-8 bg-hom-dark rounded mb-4" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-4 bg-hom-dark rounded" />
                <div className="h-4 bg-hom-dark rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <Card key={car._id} className="overflow-hidden bg-hom-gray border-0 car-card-hover">
          <div className="relative">
            <Link href={`/inventory/${car._id}`}>
              <Image
                src={car.images[0] || "/placeholder.svg?height=600&width=800"}
                alt={car.title}
                width={800}
                height={600}
                className="h-56 w-full object-cover transition-transform hover:scale-105"
              />
            </Link>
            {car.featured && <Badge className="absolute top-2 right-2 bg-hom-red text-white border-0">Featured</Badge>}
          </div>
          <CardContent className="p-6">
            <Link href={`/inventory/${car._id}`}>
              <h3 className="text-xl font-bold hover:text-hom-red transition-colors text-white">{car.title}</h3>
            </Link>
            <p className="text-gray-400 mb-2">
              {car.year} • {car.mileage.toLocaleString()} miles
            </p>
            <p className="text-2xl font-bold text-hom-red mb-4">${car.price.toLocaleString()}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-hom-dark p-2 rounded-md text-center text-gray-300">
                <span className="font-semibold">{car.make}</span>
              </div>
              <div className="bg-hom-dark p-2 rounded-md text-center text-gray-300">
                <span className="font-semibold">{car.model}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex gap-2">
            <Link href={`/inventory/${car._id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-hom-dark hover:text-white"
              >
                <Info className="mr-2 h-4 w-4" />
                Details
              </Button>
            </Link>
            <InquiryButton car={car} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
