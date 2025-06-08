"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import { InquiryForm } from "@/components/inquiry-form"

type Car = {
  id: string
  title: string
  price?: number
  vin?: string
  [key: string]: any
}

type InquiryFormContextType = {
  isOpen: boolean
  selectedCar: Car | null
  openForm: (car: Car) => void
  closeForm: () => void
}

const InquiryFormContext = createContext<InquiryFormContextType>({
  isOpen: false,
  selectedCar: null,
  openForm: () => {},
  closeForm: () => {},
})

export const useInquiryForm = () => useContext(InquiryFormContext)

export function InquiryFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  const openForm = (car: Car) => {
    setSelectedCar(car)
    setIsOpen(true)
  }

  const closeForm = () => {
    setIsOpen(false)
  }

  return (
    <InquiryFormContext.Provider value={{ isOpen, selectedCar, openForm, closeForm }}>
      {children}
      {isOpen && selectedCar && <InquiryForm car={selectedCar} />}
    </InquiryFormContext.Provider>
  )
}
