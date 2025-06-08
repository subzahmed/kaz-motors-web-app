"use client"

import { Button } from "@/components/ui/button"
import { useInquiryForm } from "@/components/inquiry-form-provider"
import { MessageSquare } from "lucide-react"

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
    <Button onClick={() => openForm(car)} className="flex-1 bg-hom-red hover:bg-red-700 text-white">
      <MessageSquare className="mr-2 h-4 w-4" />
      Inquire
    </Button>
  )
}
