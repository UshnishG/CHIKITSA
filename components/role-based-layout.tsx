// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { usePathname } from "next/navigation"
// import { motion, AnimatePresence } from "framer-motion"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarProvider,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
// } from "@/components/ui/sidebar"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import {
//   Home,
//   User,
//   Settings,
//   MessageSquare,
//   Bell,
//   Calendar,
//   Users,
//   Activity,
//   FileText,
//   Brain,
//   Heart,
//   UserPlus,
//   BarChart,
//   MessageCircle,
//   LogOut,
// } from "lucide-react"

// type UserRole = "patient" | "doctor" | "admin" | "guest"

// interface RoleBasedLayoutProps {
//   children: React.ReactNode
//   userRole?: UserRole
// }

// export default function RoleBasedLayout({ children, userRole = "patient" }: RoleBasedLayoutProps) {
//   const pathname = usePathname()
//   const [mounted, setMounted] = useState(false)

//   // Prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) return null

//   // Navigation items based on user role
//   const getNavigationItems = (role: UserRole) => {
//     switch (role) {
//       case "doctor":
//         return [
//           { name: "Doctor Portal", href: "/doctors-portal", icon: Home },
//           { name: "Patients", href: "/doctor/patients", icon: Users },
//           { name: "Appointments", href: "/doctor/appointments", icon: Calendar },
//           { name: "Analytics", href: "/doctor/analytics", icon: Activity },
//           { name: "Resources", href: "/doctor/resources", icon: FileText },
//           { name: "Clinical Copilot", href: "/doctor/clinical-copilot", icon: Brain },
//         ]
//       case "admin":
//         return [
//           { name: "Admin Dashboard", href: "/admin-dashboard", icon: Home },
//           { name: "User Management", href: "/admin/users", icon: Users },
//           { name: "Analytics", href: "/admin/analytics", icon: BarChart },
//           { name: "Feedback", href: "/admin/feedback", icon: MessageCircle },
//           { name: "Feature Toggle", href: "/admin/feature-toggle", icon: Settings },
//           { name: "Broadcast", href: "/admin/broadcast", icon: Bell },
//         ]
//       case "patient":
//       default:
//         return [
//           { name: "Dashboard", href: "/dashboard", icon: Home },
//           { name: "Dosage AI", href: "/dosage-ai", icon: Brain },
//           { name: "Health Log", href: "/health-log", icon: Activity },
//           { name: "My Doctor", href: "/my-doctor", icon: UserPlus },
//           { name: "Appointments", href: "/appointments", icon: Calendar },
//           { name: "Wellness Tools", href: "/wellness-tools", icon: Heart },
//           { name: "Family View", href: "/family-view", icon: Users },
//         ]
//     }
//   }

//   // Common navigation items for all roles
//   const commonNavItems = [
//     { name: "Profile", href: "/profile", icon: User },
//     { name: "Settings", href: "/settings", icon: Settings },
//     { name: "Chatbot", href: "/chatbot", icon: MessageSquare },
//     { name: "Notifications", href: "/notifications", icon: Bell },
//   ]

//   const navigationItems = getNavigationItems(userRole)

//   // Skip sidebar on authentication pages
//   const isAuthPage = pathname === "/login" || pathname === "/signup"

//   if (isAuthPage) {
//     return <div className="flex flex-col min-h-screen">{children}</div>
//   }

//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen">
//         <Sidebar variant="inset" collapsible="icon">
//           <SidebarHeader className="pb-0">
//             <div className="flex items-center gap-2 px-4 py-2">
//               <motion.span
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="text-xl font-bold text-primary"
//               >
//                 DevHouse
//               </motion.span>
//             </div>
//           </SidebarHeader>
//           <SidebarContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem key={item.name}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
//                     <a href={item.href}>
//                       <item.icon className="h-5 w-5" />
//                       <span>{item.name}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>

//             <div className="mt-4 px-4">
//               <div className="h-px bg-border" />
//             </div>

//             <SidebarMenu className="mt-4">
//               {commonNavItems.map((item) => (
//                 <SidebarMenuItem key={item.name}>
//                   <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
//                     <a href={item.href}>
//                       <item.icon className="h-5 w-5" />
//                       <span>{item.name}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarContent>
//           <SidebarFooter className="border-t p-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//                 <div className="flex flex-col">
//                   <span className="text-sm font-medium">John Doe</span>
//                   <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
//                 </div>
//               </div>
//               <Button variant="ghost" size="icon" className="rounded-full">
//                 <LogOut className="h-4 w-4" />
//               </Button>
//             </div>
//           </SidebarFooter>
//         </Sidebar>

//         <div className="flex flex-col flex-1">
//           <Header />
//           <main className="flex-1">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={pathname}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="h-full"
//               >
//                 {children}
//               </motion.div>
//             </AnimatePresence>
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </SidebarProvider>
//   )
// }

