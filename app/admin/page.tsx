"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminCarList } from "@/components/admin-car-list"
import { AdminAddCar } from "@/components/admin-add-car"
import { AdminInquiries } from "@/components/admin-inquiries"
import { AdminDashboardStats } from "@/components/admin-dashboard-stats"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()

  // Mock login function - in a real app, this would validate credentials against a database
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    setIsAuthenticated(true)
    toast({
      title: "Logged in successfully",
      description: "Welcome to the admin dashboard",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input type="email" id="email" className="w-full p-2 border rounded-md" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input type="password" id="password" className="w-full p-2 border rounded-md" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <AdminDashboardStats />

      <Tabs defaultValue="inventory" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory Management</TabsTrigger>
          <TabsTrigger value="add">Add New Vehicle</TabsTrigger>
          <TabsTrigger value="inquiries">Customer Inquiries</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory" className="p-6 bg-gray-50 rounded-lg mt-4">
          <AdminCarList />
        </TabsContent>
        <TabsContent value="add" className="p-6 bg-gray-50 rounded-lg mt-4">
          <AdminAddCar />
        </TabsContent>
        <TabsContent value="inquiries" className="p-6 bg-gray-50 rounded-lg mt-4">
          <AdminInquiries />
        </TabsContent>
      </Tabs>
    </div>
  )
}
