import { NextResponse } from "next/server"
import { createInquiry, getInquiries } from "@/lib/db/inquiries"
import { sendEmail, generateInquiryEmailHtml } from "@/lib/email-service"

export async function GET() {
  try {
    const inquiries = await getInquiries()
    return NextResponse.json({ success: true, inquiries })
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, message, carDetails } = data

    // Save inquiry to database
    const inquiryData = {
      name,
      email,
      phone,
      message,
      carId: carDetails.id || carDetails._id,
      carTitle: carDetails.title,
      read: false,
    }

    await createInquiry(inquiryData)

    // Send email notification
    const adminEmail = process.env.ADMIN_EMAIL || "admin@kazmotors.com"

    try {
      await sendEmail({
        to: adminEmail,
        subject: `KazMotors Inquiry: ${carDetails.title}`,
        html: generateInquiryEmailHtml({
          name,
          email,
          phone,
          message,
          car: carDetails,
        }),
      })
    } catch (emailError) {
      console.error("Error sending email notification:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true, message: "Inquiry sent successfully" })
  } catch (error) {
    console.error("Error sending inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to send inquiry" }, { status: 500 })
  }
}
