"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Bell, Pill, Calendar, MessageSquare, Clock, CheckCircle2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "medication" | "appointment" | "message" | "system"
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Medication Reminder",
      message: "Time to take your Metformin (500mg)",
      time: "Just now",
      read: false,
      type: "medication",
    },
    {
      id: "2",
      title: "Dosage Adjustment",
      message: "Your doctor has approved a new Lisinopril dosage (20mg)",
      time: "30 minutes ago",
      read: false,
      type: "medication",
    },
    {
      id: "3",
      title: "Upcoming Appointment",
      message: "Reminder: Dr. Johnson tomorrow at 10:00 AM",
      time: "2 hours ago",
      read: false,
      type: "appointment",
    },
    {
      id: "4",
      title: "New Message",
      message: "Dr. Smith: How are you feeling with the new medication?",
      time: "Yesterday",
      read: true,
      type: "message",
    },
    {
      id: "5",
      title: "AI Recommendation",
      message: "Based on your recent data, we suggest adjusting your insulin timing",
      time: "2 days ago",
      read: true,
      type: "system",
    },
  ])

  const [open, setOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="h-4 w-4 text-primary" />
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      case "system":
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeBackground = (type: string) => {
    switch (type) {
      case "medication":
        return "bg-primary/10"
      case "appointment":
        return "bg-blue-100"
      case "message":
        return "bg-purple-100"
      case "system":
        return "bg-amber-100"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs font-medium">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium text-base">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs text-primary" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-[350px]">
          <AnimatePresence>
            {notifications.length > 0 ? (
              <div className="py-2">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`relative px-4 py-3 hover:bg-secondary/50 ${!notification.read ? "bg-secondary/30" : ""} group`}
                  >
                    <div className="flex gap-3">
                      <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${getTypeBackground(notification.type)}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 space-y-1 pr-10">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>

                    <div className="absolute right-3 top-3 flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>

                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-primary hover:text-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Mark as read</span>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <Bell className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                <p className="text-sm text-muted-foreground">No notifications</p>
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
        <Separator />
        <div className="p-3">
          <Button variant="ghost" size="sm" className="w-full justify-center rounded-full text-primary">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}