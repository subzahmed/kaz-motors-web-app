import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"
import { setupUploadsDirectory } from "@/lib/setup-uploads"

export async function POST(request: Request) {
  try {
    // Ensure uploads directory exists
    setupUploadsDirectory()

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate a unique filename
    const fileName = `${uuidv4()}-${file.name}`
    const path = join(process.cwd(), "public/uploads", fileName)

    // Save the file
    await writeFile(path, buffer)

    // Return the file path that can be used to access the image
    const fileUrl = `/uploads/${fileName}`

    return NextResponse.json({
      success: true,
      fileUrl,
      message: "File uploaded successfully",
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ success: false, message: "Failed to upload file" }, { status: 500 })
  }
}
