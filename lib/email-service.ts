import nodemailer from "nodemailer"

type EmailOptions = {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // Check if email credentials are available
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD

  if (!emailUser || !emailPassword) {
    console.warn("Email credentials not available. Email would have been sent with the following details:")
    console.log({ to, subject, html: html.substring(0, 100) + "..." })
    return { success: true, message: "Email sending skipped - credentials not available" }
  }

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })

  try {
    // Send the email
    const info = await transporter.sendMail({
      from: `"KazMotors" <${emailUser}>`,
      to,
      subject,
      html,
    })

    console.log("Email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
}

export function generateInquiryEmailHtml({ name, email, phone, message, car }: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width:
    600px; margin: 0 auto;">
      <h1 style="color: #1e40af; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">New Vehicle Inquiry</h1>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h2 style="font-size: 18px; margin-top: 0;">Vehicle Information</h2>
        <p><strong>Vehicle:</strong> ${car.title}</p>
        <p><strong>Price:</strong> $${car.price ? car.price.toLocaleString() : "N/A"}</p>
        <p><strong>VIN:</strong> ${car.vin || "N/A"}</p>
      </div>
      
      <h2 style="font-size: 18px;">Customer Information</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      
      <h2 style="font-size: 18px;">Message</h2>
      <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 5px;">
        <p>${message}</p>
      </div>
      
      <div style="margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
        <p>This is an automated message from the KazMotors website.</p>
      </div>
    </div>
  `
}
