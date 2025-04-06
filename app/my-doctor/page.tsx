"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Phone, Mail, Star, MessageSquare } from "lucide-react"
import Link from "next/link"

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 124,
    experience: "15 years",
    image: "/placeholder.svg?height=300&width=300",
    availability: "Mon, Wed, Fri",
    location: "Medical Center, Floor 3",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
    education: [
      "MD, Harvard Medical School",
      "Residency, Massachusetts General Hospital",
      "Fellowship, Cleveland Clinic",
    ],
    appointments: [
      { date: "Mon, Jun 10", slots: ["9:00 AM", "11:30 AM", "2:00 PM"] },
      { date: "Wed, Jun 12", slots: ["10:00 AM", "1:30 PM", "4:00 PM"] },
      { date: "Fri, Jun 14", slots: ["9:30 AM", "12:00 PM", "3:30 PM"] },
    ],
  },
]

export default function MyDoctorPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0])
  const [selectedDate, setSelectedDate] = useState(doctors[0].appointments[0].date)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="container mx-auto py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
    >
      <motion.div variants={fadeIn} className="mb-8">
        <h1 className="text-3xl font-bold text-[#00A651]">My Doctor</h1>
        <p className="text-gray-500 mt-2">View and manage your doctor information</p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none mb-8 p-0 h-auto">
            <TabsTrigger
              value="info"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Information
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Visit History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                <Avatar className="w-24 h-24 border-2 border-[#00A651]">
                  <AvatarImage src={selectedDoctor.image} alt={selectedDoctor.name} />
                  <AvatarFallback>
                    {selectedDoctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                    <Badge className="w-fit bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">
                      {selectedDoctor.specialty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                    <span className="text-sm text-gray-500">({selectedDoctor.reviews} reviews)</span>
                  </div>
                  <p className="text-gray-500">{selectedDoctor.experience} experience</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#00A651] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Availability</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.availability}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#00A651] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#00A651] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#00A651] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.email}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">About</h3>
                <p className="text-gray-600">{selectedDoctor.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Education</h3>
                <ul className="space-y-2 text-gray-600">
                  {selectedDoctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#00A651] mt-2"></div>
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
                <Button
                  variant="outline"
                  className="border-[#00A651] text-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651] rounded-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full" asChild>
                  <Link href="/patient/appointments">Book Appointment</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Upcoming Appointments</h2>

              <div className="space-y-4">
                {selectedDoctor.appointments.map((appointment, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border rounded-xl bg-[#f9fafb] hover:border-[#00A651] transition-all"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#00A651]" />
                        <span className="font-medium">{appointment.date}</span>
                      </div>
                      <Badge className="bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">Upcoming</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {appointment.slots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-full border"
                        >
                          <Clock className="h-3 w-3 text-[#00A651]" />
                          {slot}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button className="w-full bg-[#00A651] hover:bg-[#008f45] text-white rounded-full" asChild>
                  <Link href="/patient/appointments">Book New Appointment</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Visit History</h2>

              <div className="space-y-4">
                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#00A651]" />
                      <span className="font-medium">May 15, 2023</span>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Regular checkup - Blood pressure monitoring</p>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651] rounded-full"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-[#00A651] hover:bg-[#e6f7ef] rounded-full"
                    >
                      Download Report
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#00A651]" />
                      <span className="font-medium">March 3, 2023</span>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Annual physical examination</p>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651] rounded-full"
                    >
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-[#00A651] hover:bg-[#e6f7ef] rounded-full"
                    >
                      Download Report
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

