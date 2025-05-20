"use client"

import { Button } from "@/components/ui/button"
import { useInquiryForm } from "@/components/inquiry-form-provider"

type Car = {
  id: string
  title: string
  price?: number
  vin?: string
  [key: string]: any
}

export function InquiryButton({ car }: { car: Car }) {
  const { openForm } = useInquiryForm()

  return (
    <Button onClick={() => openForm(car)} className="flex-1">
      Inquire
    </Button>
  )
}
