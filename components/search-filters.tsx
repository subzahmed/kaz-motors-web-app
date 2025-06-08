"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal, X } from "lucide-react"

export function SearchFilters() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200000])

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i)

  const makes = [
    "All Makes",
    "Acura",
    "Audi",
    "BMW",
    "Cadillac",
    "Chevrolet",
    "Ford",
    "Honda",
    "Hyundai",
    "Jaguar",
    "Lexus",
    "Mercedes-Benz",
    "Nissan",
    "Porsche",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ]

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by make, model, or keyword..."
            className="pl-10 bg-hom-gray border-hom-gray text-white"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 border-hom-gray text-white hover:bg-hom-dark"
        >
          {isExpanded ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
          <span className="sr-only">{isExpanded ? "Close filters" : "Open filters"}</span>
        </Button>
        <Button className="flex-shrink-0 bg-hom-red hover:bg-red-700 text-white">Search</Button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <Label htmlFor="make" className="text-white">
              Make
            </Label>
            <Select defaultValue="All Makes">
              <SelectTrigger id="make" className="bg-hom-gray border-hom-gray text-white">
                <SelectValue placeholder="Select make" />
              </SelectTrigger>
              <SelectContent className="bg-hom-gray text-white">
                {makes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="model" className="text-white">
              Model
            </Label>
            <Select defaultValue="All Models">
              <SelectTrigger id="model" className="bg-hom-gray border-hom-gray text-white">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-hom-gray text-white">
                <SelectItem value="All Models">All Models</SelectItem>
                {/* Models would be populated based on selected make */}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="year-min" className="text-white">
              Year (Min)
            </Label>
            <Select defaultValue={`${currentYear - 5}`}>
              <SelectTrigger id="year-min" className="bg-hom-gray border-hom-gray text-white">
                <SelectValue placeholder="Min year" />
              </SelectTrigger>
              <SelectContent className="bg-hom-gray text-white">
                {years.map((year) => (
                  <SelectItem key={`min-${year}`} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="year-max" className="text-white">
              Year (Max)
            </Label>
            <Select defaultValue={currentYear.toString()}>
              <SelectTrigger id="year-max" className="bg-hom-gray border-hom-gray text-white">
                <SelectValue placeholder="Max year" />
              </SelectTrigger>
              <SelectContent className="bg-hom-gray text-white">
                {years.map((year) => (
                  <SelectItem key={`max-${year}`} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label className="text-white">
              Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </Label>
            <Slider
              defaultValue={[0, 200000]}
              max={200000}
              step={5000}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="body-type" className="text-white">
              Body Type
            </Label>
            <Select defaultValue="All Types">
              <SelectTrigger id="body-type" className="bg-hom-gray border-hom-gray text-white">
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent className="bg-hom-gray text-white">
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Sedan">Sedan</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Truck">Truck</SelectItem>
                <SelectItem value="Coupe">Coupe</SelectItem>
                <SelectItem value="Convertible">Convertible</SelectItem>
                <SelectItem value="Wagon">Wagon</SelectItem>
                <SelectItem value="Van">Van</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="transmission" className="text-white">
              Transmission
            </Label>
            <Select defaultValue="All">
              <SelectTrigger id="transmission" className="bg-hom-gray border-hom-gray text-white">
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent className="bg-hom-gray text-white">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="CVT">CVT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
