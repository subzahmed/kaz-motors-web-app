import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, phone, message, carDetails } = data

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, 
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "subahmed67@gmail.com", // The recipient's email
      subject: `KazMotors Inquiry: ${carDetails.title}`,
      html: `
        <h1>New Vehicle Inquiry</h1>
        <h2>Customer Information:</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        
        <h2>Vehicle Information:</h2>
        <p><strong>Vehicle:</strong> ${carDetails.title}</p>
        <p><strong>Price:</strong> $${carDetails.price?.toLocaleString()}</p>
        <p><strong>VIN:</strong> ${carDetails.vin}</p>
        
        <h2>Message:</h2>
        <p>${message}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Inquiry sent successfully" })
  } catch (error) {
    console.error("Error sending inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to send inquiry" }, { status: 500 })
  }
}
