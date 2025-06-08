"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Mail, MailOpen, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

type Inquiry = {
  _id: string
  name: string
  email: string
  phone: string
  message: string
  carTitle: string
  createdAt: string
  read: boolean
}

export function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchInquiries()
  }, [])

  async function fetchInquiries() {
    try {
      const response = await fetch("/api/inquiries")
      const data = await response.json()

      if (data.success) {
        setInquiries(data.inquiries)
      } else {
        console.error("Error fetching inquiries:", data.message)
        toast({
          title: "Error",
          description: "Failed to load inquiries. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error)
      toast({
        title: "Error",
        description: "Failed to load inquiries. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, isRead = true) => {
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: isRead }),
      })

      const data = await response.json()

      if (data.success) {
        // Update local state
        setInquiries(inquiries.map((inquiry) => (inquiry._id === id ? { ...inquiry, read: isRead } : inquiry)))

        // If this is the selected inquiry, update it
        if (selectedInquiry && selectedInquiry._id === id) {
          setSelectedInquiry({ ...selectedInquiry, read: isRead })
        }
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to update inquiry.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating inquiry:", error)
      toast({
        title: "Error",
        description: "There was a problem updating the inquiry.",
        variant: "destructive",
      })
    }
  }

  const deleteInquiry = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const response = await fetch(`/api/inquiries/${id}`, {
          method: "DELETE",
        })

        const data = await response.json()

        if (data.success) {
          // Update local state
          setInquiries(inquiries.filter((inquiry) => inquiry._id !== id))

          if (selectedInquiry && selectedInquiry._id === id) {
            setSelectedInquiry(null)
          }

          toast({
            title: "Inquiry deleted",
            description: "The inquiry has been permanently deleted.",
          })
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to delete inquiry.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error)
        toast({
          title: "Error",
          description: "There was a problem deleting the inquiry.",
          variant: "destructive",
        })
      }
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
                  key={inquiry._id}
                  className={`p-4 cursor-pointer ${
                    selectedInquiry?._id === inquiry._id ? "bg-gray-100" : ""
                  } ${!inquiry.read ? "font-semibold" : ""}`}
                  onClick={() => {
                    setSelectedInquiry(inquiry)
                    if (!inquiry.read) {
                      markAsRead(inquiry._id)
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
                    <span className="text-xs text-gray-500">{formatDate(inquiry.createdAt).split(",")[0]}</span>
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
                <Button variant="ghost" size="icon" onClick={() => deleteInquiry(selectedInquiry._id)}>
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

            <div className="text-sm text-gray-500 mb-6">Received on {formatDate(selectedInquiry.createdAt)}</div>

            <div className="flex space-x-4">
              <Button>Reply via Email</Button>
              <Button variant="outline" onClick={() => markAsRead(selectedInquiry._id, !selectedInquiry.read)}>
                Mark as {selectedInquiry.read ? "Unread" : "Read"}
              </Button>
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
