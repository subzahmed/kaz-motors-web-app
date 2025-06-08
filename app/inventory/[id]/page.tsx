import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CarImageGallery } from "@/components/car-image-gallery"
import { CarSpecifications } from "@/components/car-specifications"
import { SimilarCars } from "@/components/similar-cars"
import { InquiryButton } from "@/components/inquiry-button"
import { getCarById } from "@/lib/db/cars"
import { notFound } from "next/navigation"

export default async function CarDetailPage({ params }: { params: { id: string } }) {
  try {
    // Fetch the car details based on the ID
    const car = await getCarById(params.id)

    if (!car) {
      notFound()
    }

    return (
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <CarImageGallery images={car.images} />
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{car.title}</h1>
                <p className="text-gray-500">VIN: {car.vin}</p>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-1">
                New Arrival
              </Badge>
            </div>
            <div className="mb-6">
              <p className="text-4xl font-bold text-primary">${car.price.toLocaleString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Year</p>
                <p className="font-semibold">{car.year}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Make</p>
                <p className="font-semibold">{car.make}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Model</p>
                <p className="font-semibold">{car.model}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Mileage</p>
                <p className="font-semibold">{car.mileage.toLocaleString()} mi</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Fuel Type</p>
                <p className="font-semibold">{car.fuelType}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="font-semibold">{car.transmission}</p>
              </div>
            </div>
            <div className="flex gap-4 mb-8">
              <InquiryButton car={car} />
              <Button variant="outline" className="flex-1">
                Schedule Test Drive
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Quick Overview</h3>
              <p className="text-gray-700">{car.description.substring(0, 200)}...</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="financing">Financing</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 bg-gray-50 rounded-lg mt-4">
            <h3 className="text-xl font-bold mb-4">Vehicle Description</h3>
            <p className="mb-4">{car.description}</p>
            <p>
              This vehicle comes with a comprehensive warranty package and has been thoroughly inspected by our
              certified technicians to ensure it meets our high standards of quality and performance.
            </p>
          </TabsContent>
          <TabsContent value="features" className="p-6 bg-gray-50 rounded-lg mt-4">
            <h3 className="text-xl font-bold mb-4">Key Features</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              {car.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="p-6 bg-gray-50 rounded-lg mt-4">
            <CarSpecifications car={car} />
          </TabsContent>
          <TabsContent value="financing" className="p-6 bg-gray-50 rounded-lg mt-4">
            <h3 className="text-xl font-bold mb-4">Financing Options</h3>
            <p className="mb-4">
              We offer competitive financing options to help you drive home in your dream car today. Our finance team
              works with multiple lenders to find the best rates and terms for your situation.
            </p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Estimated Monthly Payment</h4>
              <p className="text-3xl font-bold text-primary mb-2">$1,450/mo*</p>
              <p className="text-sm text-gray-500">
                *Based on 20% down payment, 3.9% APR, 60-month term. Subject to credit approval.
              </p>
            </div>
            <Button>Apply for Financing</Button>
          </TabsContent>
        </Tabs>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
          <SimilarCars currentCarId={params.id} make={car.make} />
        </section>
      </div>
    )
  } catch (error) {
    console.error("Error in CarDetailPage:", error)
    notFound()
  }
}
