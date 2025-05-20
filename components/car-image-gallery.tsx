"use client"

import { useState } from "react"
import Image from "next/image"

export function CarImageGallery() {
  // Mock images for demonstration
  const images = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]

  const [mainImage, setMainImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image src={mainImage || "/placeholder.svg"} alt="Car" fill className="object-cover" />
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
              mainImage === image ? "ring-2 ring-primary" : "opacity-70"
            }`}
            onClick={() => setMainImage(image)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Car thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
