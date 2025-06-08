import { HeroSection } from "@/components/hero-section"
import { CarouselFeaturedCars } from "@/components/carousel-featured-cars"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Car, Shield, CreditCard, Award, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="bg-hom-dark py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Featured <span className="text-hom-red">Vehicles</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our handpicked selection of premium vehicles, each one representing exceptional value and quality.
            </p>
          </div>
          <CarouselFeaturedCars />
          <div className="text-center mt-12">
            <Link href="/inventory">
              <Button className="bg-hom-red hover:bg-red-700 text-white">
                View All Inventory
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-hom-red">KazMotors</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're committed to providing exceptional service and value to our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-hom-gray p-6 rounded-lg text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Premium Selection</h3>
              <p className="text-gray-400">
                Carefully curated inventory of quality vehicles to suit every need and budget.
              </p>
            </div>

            <div className="bg-hom-gray p-6 rounded-lg text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Quality Guaranteed</h3>
              <p className="text-gray-400">
                Every vehicle undergoes a comprehensive inspection before joining our inventory.
              </p>
            </div>

            <div className="bg-hom-gray p-6 rounded-lg text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Flexible Financing</h3>
              <p className="text-gray-400">Competitive financing options tailored to your needs and budget.</p>
            </div>

            <div className="bg-hom-gray p-6 rounded-lg text-center">
              <div className="bg-hom-red h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Exceptional Service</h3>
              <p className="text-gray-400">Dedicated team committed to providing outstanding customer service.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-hom-red py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Find Your Perfect Vehicle?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Browse our extensive inventory or contact our team to discuss your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <Button size="lg" className="bg-white text-hom-red hover:bg-gray-100">
                Browse Inventory
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hom-red">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
