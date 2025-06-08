import { NextResponse } from "next/server"
import { getInquiryById, markInquiryAsRead, deleteInquiry } from "@/lib/db/inquiries"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const inquiry = await getInquiryById(id)

    if (!inquiry) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    console.error("Error fetching inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch inquiry" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Mark inquiry as read/unread
    const success = await markInquiryAsRead(id, data.read)

    if (!success) {
      return NextResponse.json({ success: false, message: "Inquiry not found or not updated" }, { status: 404 })
    }

    // Get the updated inquiry
    const updatedInquiry = await getInquiryById(id)

    return NextResponse.json({ success: true, inquiry: updatedInquiry })
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to update inquiry" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Delete inquiry from database
    const success = await deleteInquiry(id)

    if (!success) {
      return NextResponse.json({ success: false, message: "Inquiry not found or not deleted" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to delete inquiry" }, { status: 500 })
  }
}
