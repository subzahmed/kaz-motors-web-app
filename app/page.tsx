import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarouselFeaturedCars } from "@/components/carousel-featured-cars"
import { SearchFilters } from "@/components/search-filters"
import { CarGrid } from "@/components/car-grid"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Vehicles</h2>
        <CarouselFeaturedCars />
      </section>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Browse Our Inventory</h2>
            <SearchFilters />
          </div>
          <CarGrid />
          <div className="mt-8 text-center">
            <Link href="/inventory">
              <Button size="lg">View All Vehicles</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose KazMotors?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Premium Selection</h3>
                  <p className="text-gray-600">Curated collection of quality vehicles to choose from</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Expert Guidance</h3>
                  <p className="text-gray-600">Professional team to help you find your perfect vehicle</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Transparent Pricing</h3>
                  <p className="text-gray-600">Clear and competitive pricing with no hidden fees</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Visit Our Showroom</h3>
            <p className="mb-4">Experience our premium collection in person. Our team is ready to assist you.</p>
            <div className="bg-white p-4 rounded-lg mb-4">
              <p className="font-semibold">Opening Hours:</p>
              <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
              <p>Saturday: 10:00 AM - 5:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <Button variant="outline" className="w-full">
              Get Directions
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
