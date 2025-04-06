"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import { useAuth } from "@/context/AuthContext" // Import useAuth to access user role

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
  // We can keep userRole as optional, but we'll use the authenticated user's role by default
  userRole?: "patient" | "doctor" | "admin" | "guest"
}

export default function PageLayout({ 
  children, 
  title, 
  description,
  userRole: propUserRole
}: PageLayoutProps) {
  // Get user from auth context
  const { user } = useAuth();
  
  // Use the role from props if provided, otherwise use the authenticated user's role
  const userRole = propUserRole || user?.role || "guest";

  return (
    <div className="flex min-h-screen flex-col">
      {/* Note: Header is now removed from here since it's already in the main layout.tsx */}
      <main className="flex-1">
        <section className="bg-gradient-to-b from-secondary/30 to-white dark:from-gray-900 dark:to-gray-950 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">{title}</h1>
              {description && <p className="mt-4 text-gray-500 dark:text-gray-400 md:text-xl">{description}</p>}
            </motion.div>
          </div>
        </section>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="container px-4 md:px-6 py-8 md:py-12"
        >
          {children}
        </motion.div>
      </main>
      {/* Footer is also removed since it's already in the main layout.tsx */}
    </div>
  )
}