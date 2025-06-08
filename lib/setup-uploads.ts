import fs from "fs"
import path from "path"

// Ensure the uploads directory exists
export function setupUploadsDirectory() {
  const uploadsDir = path.join(process.cwd(), "public/uploads")

  if (!fs.existsSync(uploadsDir)) {
    console.log("Creating uploads directory at:", uploadsDir)
    fs.mkdirSync(uploadsDir, { recursive: true })
  }
}
