"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Mail, MailOpen, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Inquiry = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  carTitle: string
  date: string
  read: boolean
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchInquiries() {
      try {
        // In a real app, this would fetch from your API
        // const response = await fetch('/api/inquiries')
        // const data = await response.json()
        // setInquiries(data.inquiries)

        // Mock data for demonstration
        setInquiries([
          {
            id: "1",
            name: "John Smith",
            email: "john.smith@example.com",
            phone: "(555) 123-4567",
            message:
              "I'm interested in the 2023 Mercedes-Benz S-Class. Is it still available? I'd like to schedule a test drive this weekend if possible.",
            carTitle: "2023 Mercedes-Benz S-Class",
            date: "2023-05-15T14:30:00Z",
            read: false,
          },
          {
            id: "2",
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            phone: "(555) 987-6543",
            message:
              "Hello, I'd like more information about the 2022 BMW 7 Series. What financing options do you offer?",
            carTitle: "2022 BMW 7 Series",
            date: "2023-05-14T10:15:00Z",
            read: true,
          },
          {
            id: "3",
            name: "Michael Brown",
            email: "mbrown@example.com",
            phone: "(555) 456-7890",
            message:
              "I'm looking to trade in my current vehicle for the 2023 Audi A8. Can you provide an estimate for my 2019 Lexus ES?",
            carTitle: "2023 Audi A8",
            date: "2023-05-13T16:45:00Z",
            read: false,
          },
          {
            id: "4",
            name: "Emily Davis",
            email: "emily.d@example.com",
            phone: "(555) 234-5678",
            message: "Is the 2022 Lexus LS still available? What's the lowest price you can offer?",
            carTitle: "2022 Lexus LS",
            date: "2023-05-12T09:20:00Z",
            read: true,
          },
          {
            id: "5",
            name: "David Wilson",
            email: "dwilson@example.com",
            phone: "(555) 876-5432",
            message:
              "I'm interested in the 2023 Porsche Panamera. Do you have any in black with the executive package?",
            carTitle: "2023 Porsche Panamera",
            date: "2023-05-11T13:10:00Z",
            read: false,
          },
        ])
      } catch (error) {
        console.error("Error fetching inquiries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [])

  const markAsRead = (id: string) => {
    setInquiries(inquiries.map((inquiry) => (inquiry.id === id ? { ...inquiry, read: true } : inquiry)))

    // If this is the selected inquiry, update it
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, read: true })
    }
  }

  const deleteInquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      setInquiries(inquiries.filter((inquiry) => inquiry.id !== id))

      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null)
      }

      toast({
        title: "Inquiry deleted",
        description: "The inquiry has been permanently deleted.",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.carTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="text-center py-8">Loading inquiries...</div>
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search inquiries..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-md overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No inquiries found.</div>
          ) : (
            <div className="divide-y">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-4 cursor-pointer ${
                    selectedInquiry?.id === inquiry.id ? "bg-gray-100" : ""
                  } ${!inquiry.read ? "font-semibold" : ""}`}
                  onClick={() => {
                    setSelectedInquiry(inquiry)
                    if (!inquiry.read) {
                      markAsRead(inquiry.id)
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        {!inquiry.read ? (
                          <Mail className="h-4 w-4 text-primary mr-2" />
                        ) : (
                          <MailOpen className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <span>{inquiry.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1 truncate">{inquiry.carTitle}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(inquiry.date).split(",")[0]}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 truncate">{inquiry.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        {selectedInquiry ? (
          <div className="border rounded-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold">{selectedInquiry.name}</h3>
                <p className="text-gray-500">
                  {selectedInquiry.email} • {selectedInquiry.phone}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={selectedInquiry.read ? "outline" : "default"}>
                  {selectedInquiry.read ? "Read" : "Unread"}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => deleteInquiry(selectedInquiry.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-sm text-gray-500 mb-1">Inquiry about:</p>
              <p className="font-medium">{selectedInquiry.carTitle}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Message:</p>
              <div className="bg-white border p-4 rounded-md">
                <p>{selectedInquiry.message}</p>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-6">Received on {formatDate(selectedInquiry.date)}</div>

            <div className="flex space-x-4">
              <Button>Reply via Email</Button>
              <Button variant="outline">Mark as {selectedInquiry.read ? "Unread" : "Read"}</Button>
            </div>
          </div>
        ) : (
          <div className="border rounded-md p-8 text-center">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No inquiry selected</h3>
            <p className="text-gray-500">Select an inquiry from the list to view its details.</p>
          </div>
        )}
      </div>
    </div>
  )
}
