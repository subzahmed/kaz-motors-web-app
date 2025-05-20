"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InquiryButton } from "@/components/inquiry-button"

type Car = {
  id: string
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
        // In a real app, this would fetch from your API
        // const response = await fetch('/api/cars')
        // const data = await response.json()
        // setCars(data.cars)

        // Mock data for demonstration
        setCars([
          {
            id: "1",
            title: "2023 Mercedes-Benz S-Class",
            price: 110000,
            year: 2023,
            make: "Mercedes-Benz",
            model: "S-Class",
            mileage: 5000,
            images: ["/placeholder.svg?height=600&width=800"],
            featured: true,
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
            featured: true,
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
            featured: false,
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
            featured: false,
          },
          {
            id: "5",
            title: "2023 Porsche Panamera",
            price: 105000,
            year: 2023,
            make: "Porsche",
            model: "Panamera",
            mileage: 4000,
            images: ["/placeholder.svg?height=600&width=800"],
            featured: false,
          },
          {
            id: "6",
            title: "2022 Jaguar XJ",
            price: 78000,
            year: 2022,
            make: "Jaguar",
            model: "XJ",
            mileage: 9000,
            images: ["/placeholder.svg?height=600&width=800"],
            featured: false,
          },
        ])
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-8 bg-gray-200 rounded mb-4" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <Card key={car.id} className="overflow-hidden">
          <div className="relative">
            <Link href={`/inventory/${car.id}`}>
              <Image
                src={car.images[0] || "/placeholder.svg"}
                alt={car.title}
                width={800}
                height={600}
                className="h-48 w-full object-cover transition-transform hover:scale-105"
              />
            </Link>
            {car.featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
          </div>
          <CardContent className="p-4">
            <Link href={`/inventory/${car.id}`}>
              <h3 className="text-lg font-bold hover:text-primary transition-colors">{car.title}</h3>
            </Link>
            <p className="text-gray-500 mb-2">
              {car.year} • {car.mileage.toLocaleString()} miles
            </p>
            <p className="text-2xl font-bold text-primary mb-4">${car.price.toLocaleString()}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-100 p-2 rounded-md text-center">
                <span className="font-semibold">{car.make}</span>
              </div>
              <div className="bg-gray-100 p-2 rounded-md text-center">
                <span className="font-semibold">{car.model}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Link href={`/inventory/${car.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
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
