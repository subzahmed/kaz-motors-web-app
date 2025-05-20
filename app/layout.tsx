import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { InquiryFormProvider } from "@/components/inquiry-form-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KazMotors | Premium Car Showroom",
  description: "Discover your dream car at KazMotors. Browse our premium selection of vehicles.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <InquiryFormProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </InquiryFormProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
