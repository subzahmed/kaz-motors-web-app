"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useInquiryForm } from "@/components/inquiry-form-provider"
import { useToast } from "@/components/ui/use-toast"

type Car = {
  id: string
  title: string
  price?: number
  vin?: string
  [key: string]: any
}

export function InquiryForm({ car }: { car: Car }) {
  const { closeForm } = useInquiryForm()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in the ${car.title}. Please contact me with more information.`,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would send the data to your API
      // const response = await fetch('/api/inquiries', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     carDetails: car
      //   }),
      // })

      // const data = await response.json()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Inquiry Sent!",
        description: "We've received your inquiry and will contact you soon.",
      })

      closeForm()
    } catch (error) {
      console.error("Error sending inquiry:", error)
      toast({
        title: "Error",
        description: "There was a problem sending your inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-hom-gray rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center p-4 border-b border-hom-dark">
          <h2 className="text-xl font-bold">Inquire About This Vehicle</h2>
          <Button variant="ghost" size="icon" onClick={closeForm} className="text-white hover:text-hom-red">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="p-4">
          <div className="mb-4 p-3 bg-hom-dark rounded-md">
            <h3 className="font-semibold">{car.title}</h3>
            {car.price && <p className="text-hom-red font-bold">${car.price.toLocaleString()}</p>}
            {car.vin && <p className="text-sm text-gray-400">VIN: {car.vin}</p>}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-hom-dark border-hom-dark text-white"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-hom-dark border-hom-dark text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-white">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                className="bg-hom-dark border-hom-dark text-white"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-white">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="bg-hom-dark border-hom-dark text-white"
              />
            </div>
            <div className="text-sm text-gray-400">
              By submitting this form, you agree to be contacted by our team regarding this vehicle.
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={closeForm}
                className="flex-1 border-gray-600 text-white hover:bg-hom-dark"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-hom-red hover:bg-red-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
