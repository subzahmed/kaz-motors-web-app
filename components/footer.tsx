import Link from "next/link"
import { Car, Facebook, Instagram, Twitter, Youtube, Phone, Mail, Clock, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Car className="h-8 w-8 text-hom-red mr-2" />
              <span className="text-2xl font-bold">KazMotors</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Your premier destination for quality vehicles. We offer a wide selection of cars to meet your needs and
              budget.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-hom-red transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-hom-red transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-hom-red transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-hom-red transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-hom-red">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="text-gray-400 hover:text-white transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-hom-red">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Financing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Trade-In
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Vehicle Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Car Detailing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Extended Warranty
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-hom-red">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-hom-red mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Showroom Street
                  <br />
                  Cityville, State 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-hom-red mr-2" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-hom-red mr-2" />
                <span className="text-gray-400">info@kazmotors.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-hom-red mr-2" />
                <span className="text-gray-400">Mon-Fri 9am-7pm, Sat 10am-5pm</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-hom-gray mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} KazMotors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
