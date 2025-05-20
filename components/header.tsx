"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Car, User, Search } from "lucide-react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="px-2 py-6">
                  <Link href="/" className="flex items-center mb-6">
                    <Car className="h-6 w-6 text-primary mr-2" />
                    <span className="text-xl font-bold">KazMotors</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    <Link href="/" className="text-lg hover:text-primary">
                      Home
                    </Link>
                    <Link href="/inventory" className="text-lg hover:text-primary">
                      Inventory
                    </Link>
                    <Link href="/about" className="text-lg hover:text-primary">
                      About Us
                    </Link>
                    <Link href="/contact" className="text-lg hover:text-primary">
                      Contact
                    </Link>
                    <Link href="/admin" className="text-lg hover:text-primary">
                      Admin
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center ml-4 md:ml-0">
              <Car className="h-6 w-6 text-primary mr-2" />
              <span className="text-xl font-bold">KazMotors</span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-6">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <Link href="/inventory" className="hover:text-primary">
                Inventory
              </Link>
              <Link href="/about" className="hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Button>
            </Link>
            <Link href="/inventory">
              <Button className="hidden md:inline-flex">View Inventory</Button>
            </Link>
          </div>
        </div>
        {isSearchOpen && (
          <div className="py-4 border-t">
            <div className="relative">
              <input type="text" placeholder="Search for vehicles..." className="w-full p-2 pl-10 border rounded-md" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
