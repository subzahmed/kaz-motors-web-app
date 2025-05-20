import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          opacity: 0.4,
        }}
      />
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Find Your Perfect Drive at KazMotors</h1>
          <p className="text-xl mb-8">
            Discover our premium selection of quality vehicles. Your dream car is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/inventory">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Inventory
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
