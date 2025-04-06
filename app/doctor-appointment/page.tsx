"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, Clock, FileText, Filter, MoreHorizontal, Phone, Search, X } from "lucide-react"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample appointment data
const appointments = [
  {
    id: 1,
    patientName: "Alice Johnson",
    patientAge: 42,
    patientGender: "Female",
    date: new Date(2023, 5, 10, 9, 0),
    type: "Consultation",
    status: "confirmed",
    reason: "Chest pain and shortness of breath",
    notes: "Patient has a history of hypertension",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    patientName: "Bob Williams",
    patientAge: 35,
    patientGender: "Male",
    date: new Date(2023, 5, 10, 10, 30),
    type: "Follow-up",
    status: "confirmed",
    reason: "Follow-up on medication adjustment",
    notes: "Patient reports improved symptoms",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    patientName: "Carol Martinez",
    patientAge: 28,
    patientGender: "Female",
    date: new Date(2023, 5, 10, 13, 0),
    type: "New Patient",
    status: "confirmed",
    reason: "Persistent headaches",
    notes: "",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    patientName: "David Lee",
    patientAge: 65,
    patientGender: "Male",
    date: new Date(2023, 5, 10, 15, 30),
    type: "Consultation",
    status: "confirmed",
    reason: "Joint pain in knees",
    notes: "Patient has a history of osteoarthritis",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    patientName: "Emma Wilson",
    patientAge: 52,
    patientGender: "Female",
    date: new Date(2023, 5, 11, 9, 0),
    type: "Follow-up",
    status: "pending",
    reason: "Review of lab results",
    notes: "Patient recently completed blood work",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function DoctorAppointmentsPage() {
  const [date, setDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter
    const matchesType = typeFilter === "all" || appointment.type === typeFilter
    const matchesDate = appointment.date.toDateString() === date.toDateString()
    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

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
        <h1 className="text-3xl font-bold text-[#00A651]">Appointments</h1>
        <p className="text-gray-500 mt-2">Manage your patient appointments and schedule</p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none mb-8 p-0 h-auto">
            <TabsTrigger
              value="schedule"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Appointment Requests
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm p-6 border">
                  <h2 className="text-xl font-bold mb-4">Calendar</h2>
                  <p className="text-gray-500 mb-4">Select a date to view appointments</p>

                  <div className="bg-[#f9fafb] p-4 rounded-xl border mb-6">
                    <div className="rounded-xl">
                      {/* Calendar component would go here */}
                      <div className="text-center p-4 text-gray-500">Interactive calendar</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Upcoming Days</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left rounded-xl"
                        onClick={() => setDate(new Date(2023, 5, 10))}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                          <span>Today (June 10)</span>
                          <Badge className="ml-auto bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">5</Badge>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left rounded-xl"
                        onClick={() => setDate(new Date(2023, 5, 11))}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                          <span>Tomorrow (June 11)</span>
                          <Badge className="ml-auto bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">3</Badge>
                        </div>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left rounded-xl"
                        onClick={() => setDate(new Date(2023, 5, 12))}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                          <span>Monday (June 12)</span>
                          <Badge className="ml-auto bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">7</Badge>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm p-6 border">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold">Appointments for {format(date, "MMMM d, yyyy")}</h2>
                      <p className="text-gray-500">Manage your patient appointments</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 rounded-xl p-4">
                          <div className="space-y-4">
                            <h4 className="font-medium">Filter Appointments</h4>
                            <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger id="status" className="rounded-xl">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="all">All Statuses</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="type">Type</Label>
                              <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger id="type" className="rounded-xl">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                  <SelectItem value="all">All Types</SelectItem>
                                  <SelectItem value="Consultation">Consultation</SelectItem>
                                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                                  <SelectItem value="New Patient">New Patient</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setStatusFilter("all")
                                  setTypeFilter("all")
                                }}
                                className="text-[#00A651] hover:text-[#008f45] hover:bg-[#e6f7ef]"
                              >
                                Reset Filters
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search patients..."
                          className="pl-10 rounded-full w-[200px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment, index) => (
                        <motion.div
                          key={appointment.id}
                          className="p-4 border rounded-xl hover:border-[#00A651] cursor-pointer transition-all"
                          onClick={() => setSelectedAppointment(appointment)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border border-gray-200">
                                <AvatarImage src={appointment.avatar} alt={appointment.patientName} />
                                <AvatarFallback>
                                  {appointment.patientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appointment.patientName}</h3>
                                <p className="text-sm text-gray-500">
                                  {appointment.patientAge} years, {appointment.patientGender}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={appointment.status === "confirmed" ? "default" : "secondary"}
                                className={
                                  appointment.status === "confirmed"
                                    ? "bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0"
                                    : ""
                                }
                              >
                                {appointment.status}
                              </Badge>
                              <Badge variant="outline">{appointment.type}</Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="rounded-xl">
                                  <DropdownMenuItem onClick={() => setSelectedAppointment(appointment)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">Cancel</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-[#00A651]" />
                              <span>{format(appointment.date, "h:mm a")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-[#00A651]" />
                              <span className="truncate">{appointment.reason}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No appointments found for this date.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {selectedAppointment && (
              <Dialog open={!!selectedAppointment} onOpenChange={(open) => !open && setSelectedAppointment(null)}>
                <DialogContent className="sm:max-w-[600px] rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Appointment Details</DialogTitle>
                    <DialogDescription>View and manage appointment information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border border-gray-200">
                        <AvatarImage src={selectedAppointment.avatar} alt={selectedAppointment.patientName} />
                        <AvatarFallback>
                          {selectedAppointment.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-medium">{selectedAppointment.patientName}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedAppointment.patientAge} years, {selectedAppointment.patientGender}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={selectedAppointment.status === "confirmed" ? "default" : "secondary"}
                            className={
                              selectedAppointment.status === "confirmed"
                                ? "bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0"
                                : ""
                            }
                          >
                            {selectedAppointment.status}
                          </Badge>
                          <Badge variant="outline">{selectedAppointment.type}</Badge>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-gray-500">Date</Label>
                        <p className="font-medium">{format(selectedAppointment.date, "MMMM d, yyyy")}</p>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-gray-500">Time</Label>
                        <p className="font-medium">{format(selectedAppointment.date, "h:mm a")}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-500">Reason for Visit</Label>
                      <p className="p-2 border rounded-xl bg-[#f9fafb]">{selectedAppointment.reason}</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-500">Notes</Label>
                      <Textarea
                        defaultValue={selectedAppointment.notes}
                        placeholder="Add notes about this appointment..."
                        rows={3}
                        className="rounded-xl resize-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        className="flex-1 rounded-full text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651]"
                        variant="outline"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call Patient
                      </Button>
                      <Button className="flex-1 rounded-full bg-[#00A651] hover:bg-[#008f45] text-white">
                        <FileText className="mr-2 h-4 w-4" />
                        Add Medical Record
                      </Button>
                    </div>
                  </div>
                  <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                    <Button variant="outline" onClick={() => setSelectedAppointment(null)} className="rounded-full">
                      Close
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      Cancel Appointment
                    </Button>
                    <Button className="rounded-full bg-[#00A651] hover:bg-[#008f45] text-white">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          <TabsContent value="requests">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Appointment Requests</h2>
              <p className="text-gray-500 mb-6">Review and manage new appointment requests</p>

              <div className="space-y-4">
                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Frank Thomas" />
                        <AvatarFallback>FT</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Frank Thomas</h3>
                        <p className="text-sm text-gray-500">58 years, Male</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                      <span>Requested for June 12, 2023</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#00A651]" />
                      <span>Morning (9:00 AM - 12:00 PM)</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Reason:</span> Persistent lower back pain for 2 weeks
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm" className="rounded-full bg-[#00A651] hover:bg-[#008f45] text-white">
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Grace Kim" />
                        <AvatarFallback>GK</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Grace Kim</h3>
                        <p className="text-sm text-gray-500">32 years, Female</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                      <span>Requested for June 14, 2023</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#00A651]" />
                      <span>Afternoon (1:00 PM - 5:00 PM)</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Reason:</span> Annual physical examination
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                    <Button size="sm" className="rounded-full bg-[#00A651] hover:bg-[#008f45] text-white">
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Appointment History</h2>
              <p className="text-gray-500 mb-6">View past appointments and patient visits</p>

              <div className="space-y-4">
                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="James Wilson" />
                        <AvatarFallback>JW</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">James Wilson</h3>
                        <p className="text-sm text-gray-500">45 years, Male</p>
                      </div>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                      <span>June 3, 2023</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#00A651]" />
                      <span>10:30 AM</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Diagnosis:</span> Hypertension, prescribed Lisinopril 10mg
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651]"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Medical Record
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sophia Garcia" />
                        <AvatarFallback>SG</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Sophia Garcia</h3>
                        <p className="text-sm text-gray-500">29 years, Female</p>
                      </div>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                      <span>May 28, 2023</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-[#00A651]" />
                      <span>2:00 PM</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Diagnosis:</span> Seasonal allergies, prescribed Cetirizine
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651]"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Medical Record
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

