"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Car, User, Search, Phone, Mail, Clock, MapPin } from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="border-b border-hom-gray">
      <div className="bg-hom-dark text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@kazmotors.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>Mon-Fri 9am-7pm, Sat 10am-5pm</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Showroom Street, Cityville</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden text-white">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black text-white">
                  <div className="px-2 py-6">
                    <Link href="/" className="flex items-center mb-6">
                      <Car className="h-6 w-6 text-hom-red mr-2" />
                      <span className="text-xl font-bold">KazMotors</span>
                    </Link>
                    <nav className="flex flex-col space-y-4">
                      <Link href="/" className="text-lg hover:text-hom-red transition-colors">
                        Home
                      </Link>
                      <Link href="/inventory" className="text-lg hover:text-hom-red transition-colors">
                        Inventory
                      </Link>
                      <Link href="/about" className="text-lg hover:text-hom-red transition-colors">
                        About Us
                      </Link>
                      <Link href="/contact" className="text-lg hover:text-hom-red transition-colors">
                        Contact
                      </Link>
                      <Link href="/admin" className="text-lg hover:text-hom-red transition-colors">
                        Admin
                      </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center ml-4 md:ml-0">
                <Car className="h-8 w-8 text-hom-red mr-2" />
                <span className="text-2xl font-bold text-white">KazMotors</span>
              </Link>
            </div>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/" className="text-white hover:text-hom-red transition-colors font-medium">
                Home
              </Link>
              <Link href="/inventory" className="text-white hover:text-hom-red transition-colors font-medium">
                Inventory
              </Link>
              <Link href="/about" className="text-white hover:text-hom-red transition-colors font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-white hover:text-hom-red transition-colors font-medium">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="text-white">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Admin</span>
                </Button>
              </Link>
              <Link href="/inventory">
                <Button className="hidden md:inline-flex bg-hom-red hover:bg-red-700 text-white">View Inventory</Button>
              </Link>
            </div>
          </div>
        </div>
        {isSearchOpen && (
          <div className="py-4 border-t border-hom-gray mt-4">
            <div className="container mx-auto px-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for vehicles..."
                  className="w-full p-2 pl-10 border rounded-md bg-hom-gray text-white border-hom-gray"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
