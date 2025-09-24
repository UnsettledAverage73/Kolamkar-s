import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kolamkar - Kolam Pattern Analyzer",
  description: "Analyze and explore the mathematical beauty of traditional Kolam patterns",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
        <div className="grid-background fixed inset-0 -z-10" />
        <div className="flowing-lines fixed inset-0 -z-10" />
        <div className="neon-particles fixed inset-0 -z-10" />
        <div className="enhanced-particles fixed inset-0 -z-10" />
        <div className="twinkling-stars fixed inset-0 -z-10" />
        <div className="drifting-dots fixed inset-0 -z-10">
          <div className="drift-dot"></div>
          <div className="drift-dot"></div>
          <div className="drift-dot"></div>
          <div className="drift-dot"></div>
        </div>
        <div className="neon-orbs fixed inset-0 -z-10">
          <div className="neon-orb"></div>
          <div className="neon-orb"></div>
          <div className="neon-orb"></div>
        </div>
        <div className="scan-line fixed inset-0 -z-10" />
        <div className="circuit-lines fixed inset-0 -z-10">
          <svg>
            <path className="circuit-path" d="M0,50 Q200,50 400,100 T800,150 L1200,200" />
            <path className="circuit-path" d="M0,200 Q300,200 600,250 T1200,300" style={{ animationDelay: "-3s" }} />
            <path
              className="circuit-path"
              d="M0,350 Q150,350 300,400 T600,450 L1200,500"
              style={{ animationDelay: "-6s" }}
            />
          </svg>
        </div>
        {children}
      </body>
    </html>
  )
}
