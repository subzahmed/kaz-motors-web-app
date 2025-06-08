import { ObjectId } from "mongodb"
import clientPromise from "../mongodb"

// Mock data for when MongoDB isn't available
const mockInquiries = [
  {
    _id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    message:
      "I'm interested in the 2023 Mercedes-Benz S-Class. Is it still available? I'd like to schedule a test drive this weekend if possible.",
    carId: "1",
    carTitle: "2023 Mercedes-Benz S-Class",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    message: "Hello, I'd like more information about the 2022 BMW 7 Series. What financing options do you offer?",
    carId: "2",
    carTitle: "2022 BMW 7 Series",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    _id: "3",
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "(555) 456-7890",
    message:
      "I'm looking to trade in my current vehicle for the 2023 Audi A8. Can you provide an estimate for my 2019 Lexus ES?",
    carId: "3",
    carTitle: "2023 Audi A8",
    read: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
]

export type Inquiry = {
  _id?: string | ObjectId
  name: string
  email: string
  phone: string
  message: string
  carId: string
  carTitle: string
  read: boolean
  createdAt?: Date | string
}

// Check if MongoDB is available
const isMongoAvailable = async () => {
  try {
    if (!process.env.MONGODB_URI) return false
    const client = await clientPromise
    return !!client
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return false
  }
}

export async function getInquiries() {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock inquiry data (MongoDB not available)")
    return mockInquiries
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    const inquiries = await db.collection("inquiries").find({}).sort({ createdAt: -1 }).toArray()

    return JSON.parse(JSON.stringify(inquiries))
  } catch (error) {
    console.error("Error fetching inquiries from MongoDB:", error)
    return mockInquiries
  }
}

export async function getInquiryById(id: string) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log(`Using mock inquiry data for ID ${id} (MongoDB not available)`)
    return mockInquiries.find((inquiry) => inquiry._id === id) || null
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let inquiry
    try {
      // Try to find by ObjectId first
      inquiry = await db.collection("inquiries").findOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If that fails, try to find by string ID
      inquiry = await db.collection("inquiries").findOne({ _id: id })
    }

    return inquiry ? JSON.parse(JSON.stringify(inquiry)) : null
  } catch (error) {
    console.error(`Error fetching inquiry with ID ${id} from MongoDB:`, error)
    return mockInquiries.find((inquiry) => inquiry._id === id) || null
  }
}

export async function createInquiry(inquiryData: Inquiry) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log("Using mock data for creating inquiry (MongoDB not available)")
    const newId = (mockInquiries.length + 1).toString()
    const newInquiry = {
      ...inquiryData,
      _id: newId,
      read: false,
      createdAt: new Date().toISOString(),
    }
    mockInquiries.push(newInquiry as any)
    return newInquiry
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    const inquiry = {
      ...inquiryData,
      read: false,
      createdAt: new Date(),
    }

    const result = await db.collection("inquiries").insertOne(inquiry)

    return {
      ...inquiry,
      _id: result.insertedId,
    }
  } catch (error) {
    console.error("Error creating inquiry in MongoDB:", error)
    // Fallback to mock data
    const newId = (mockInquiries.length + 1).toString()
    const newInquiry = {
      ...inquiryData,
      _id: newId,
      read: false,
      createdAt: new Date().toISOString(),
    }
    mockInquiries.push(newInquiry as any)
    return newInquiry
  }
}

export async function markInquiryAsRead(id: string, isRead = true) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log(`Using mock data for marking inquiry ${id} as ${isRead ? "read" : "unread"} (MongoDB not available)`)
    const inquiryIndex = mockInquiries.findIndex((inquiry) => inquiry._id === id)
    if (inquiryIndex === -1) return false

    mockInquiries[inquiryIndex].read = isRead
    return true
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let result
    try {
      // Try to update by ObjectId first
      result = await db.collection("inquiries").updateOne({ _id: new ObjectId(id) }, { $set: { read: isRead } })
    } catch (error) {
      // If that fails, try to update by string ID
      result = await db.collection("inquiries").updateOne({ _id: id }, { $set: { read: isRead } })
    }

    return result.modifiedCount > 0
  } catch (error) {
    console.error(`Error marking inquiry ${id} as ${isRead ? "read" : "unread"} in MongoDB:`, error)
    // Fallback to mock data
    const inquiryIndex = mockInquiries.findIndex((inquiry) => inquiry._id === id)
    if (inquiryIndex === -1) return false

    mockInquiries[inquiryIndex].read = isRead
    return true
  }
}

export async function deleteInquiry(id: string) {
  // Check if MongoDB is available
  const mongoAvailable = await isMongoAvailable()

  if (!mongoAvailable) {
    console.log(`Using mock data for deleting inquiry ${id} (MongoDB not available)`)
    const initialLength = mockInquiries.length
    const filteredInquiries = mockInquiries.filter((inquiry) => inquiry._id !== id)
    mockInquiries.length = 0
    mockInquiries.push(...filteredInquiries)
    return mockInquiries.length < initialLength
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "kazmotors")

    let result
    try {
      // Try to delete by ObjectId first
      result = await db.collection("inquiries").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If that fails, try to delete by string ID
      result = await db.collection("inquiries").deleteOne({ _id: id })
    }

    return result.deletedCount > 0
  } catch (error) {
    console.error(`Error deleting inquiry with ID ${id} from MongoDB:`, error)
    // Fallback to mock data
    const initialLength = mockInquiries.length
    const filteredInquiries = mockInquiries.filter((inquiry) => inquiry._id !== id)
    mockInquiries.length = 0
    mockInquiries.push(...filteredInquiries)
    return mockInquiries.length < initialLength
  }
}
