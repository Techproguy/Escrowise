import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import "./animations.css"

// Initialize DM Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Escrowise - Secure Escrow Services",
  description: "Secure escrow services for online transactions",
  metadataBase: new URL("https://escrowise.com"),
    generator: 'v0.dev'
}

// Add performance optimizations
export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

// Add dynamic imports for better performance
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-dm-sans">
        <div className="page-transition-wrapper">{children}</div>
      </body>
    </html>
  )
}

