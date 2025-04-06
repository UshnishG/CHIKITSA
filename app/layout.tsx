import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/context/AuthContext"
import ChatbotVisibilityWrapper from "@/components/ChatbotVisibilityWrapper" // ✅ NEW
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DevHouse - Personalized Drug Dosage Optimization",
  description: "AI-powered platform for personalized medication dosage using reinforcement learning",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
          {/* ✅ Chatbot only appears on non-login/signup routes */}
          <ChatbotVisibilityWrapper />
        </ThemeProvider>
      </body>
    </html>
  )
}
