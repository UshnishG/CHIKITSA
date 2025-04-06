"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  Users,
  Calendar,
  Activity,
  FileText,
  Brain,
  BarChart,
  MessageCircle,
  Settings,
  Bell,
  User,
  Heart,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationDropdown } from "@/components/notification-dropdown"

type UserRole = "patient" | "doctor" | "admin" | "guest"

interface RoleBasedNavbarProps {
  userRole: UserRole
}

export default function RoleBasedNavbar({ userRole = "patient" }: RoleBasedNavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Navigation items based on user role
  const getNavigationItems = (role: UserRole) => {
    switch (role) {
      case "doctor":
        return [
          { name: "Doctor Portal", href: "/doctors-portal", icon: Home },
          { name: "Patients", href: "/doctor/patients", icon: Users },
          { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
          { name: "Analytics", href: "/doctor/analytics", icon: Activity },
          { name: "Resources", href: "/doctor/resources", icon: FileText },
          { name: "Clinical Copilot", href: "/doctor/clinical-copilot", icon: Brain },
        ]
      case "admin":
        return [
          { name: "Admin Dashboard", href: "/admin-dashboard", icon: Home },
          { name: "Users", href: "/admin/users", icon: Users },
          { name: "Analytics", href: "/admin/analytics", icon: BarChart },
          { name: "Feedback", href: "/admin/feedback", icon: MessageCircle },
          { name: "Feature Toggle", href: "/admin/feature-toggle", icon: Settings },
          { name: "Broadcast", href: "/admin/broadcast", icon: Bell },
        ]
      case "patient":
      default:
        return [
          { name: "Dashboard", href: "/dashboard", icon: Home },
          { name: "Dosage AI", href: "/dosage-ai", icon: Brain },
          { name: "Health Log", href: "/health-log", icon: Activity },
          { name: "My Doctor", href: "/my-doctor", icon: UserPlus },
          { name: "Appointments", href: "/appointments", icon: Calendar },
          { name: "Wellness Tools", href: "/wellness-tools", icon: Heart },
          { name: "Family View", href: "/family-view", icon: Users },
        ]
    }
  }

  // Common navigation items for all roles
  const commonNavItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ]

  const navigationItems = getNavigationItems(userRole)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-primary"
            >
              DevHouse
            </motion.span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary relative ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <NotificationDropdown />
          <Link href="/profile">
            <Avatar className="h-8 w-8 transition-transform hover:scale-110">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
          <Button variant="outline" size="sm" className="rounded-full gap-1.5">
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
        <button
          className="flex items-center justify-center rounded-full p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden border-t"
        >
          <div className="container py-4 space-y-4">
            <nav className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

