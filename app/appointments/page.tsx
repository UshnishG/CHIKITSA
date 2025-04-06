"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Search, Star, CalendarIcon, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

// Sample doctor data
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
    availability: ["9:00 AM", "10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM"],
    location: "Medical Center, Floor 3",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.7,
    reviews: 98,
    image: "/placeholder.svg?height=300&width=300",
    availability: ["8:30 AM", "10:30 AM", "1:00 PM", "4:00 PM"],
    location: "Health Pavilion, Suite 205",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    availability: ["9:00 AM", "11:00 AM", "2:30 PM", "4:30 PM"],
    location: "Children's Medical Building, Floor 1",
  },
]

// Sample specialties
const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
  "Gynecology",
  "Ophthalmology",
  "Psychiatry",
]

export default function PatientAppointmentsPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [date, setDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("consultation")
  const [searchQuery, setSearchQuery] = useState("")
  const [specialty, setSpecialty] = useState("All Specialties")
  const [step, setStep] = useState(1)
  const [isBooked, setIsBooked] = useState(false)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = specialty === "All Specialties" || doctor.specialty === specialty
    return matchesSearch && matchesSpecialty
  })

  const handleBookAppointment = () => {
    // In a real app, this would send data to the server
    setIsBooked(true)
    setTimeout(() => {
      setIsBooked(false)
      setStep(1)
      setSelectedDoctor(null)
      setDate(new Date())
      setSelectedTime("")
    }, 3000)
  }

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
        <h1 className="text-3xl font-bold text-[#00A651]">Book an Appointment</h1>
        <p className="text-gray-500 mt-2">Schedule a visit with your healthcare provider</p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none mb-8 p-0 h-auto">
            <TabsTrigger
              value="new"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              New Appointment
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Upcoming Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            {isBooked ? (
              <motion.div
                className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl shadow-sm border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-[#e6f7ef] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-[#00A651]" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  Your appointment has been successfully scheduled. You will receive a confirmation email shortly.
                </p>
                <Button
                  onClick={() => setIsBooked(false)}
                  className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full"
                >
                  Return to Appointments
                </Button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-6 border">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Book a New Appointment</h2>
                  <p className="text-gray-500">
                    {step === 1 && "Select a doctor for your appointment"}
                    {step === 2 && "Choose a date and time for your appointment"}
                    {step === 3 && "Provide additional details for your appointment"}
                  </p>
                </div>

                {step === 1 && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          type="search"
                          placeholder="Search doctors..."
                          className="pl-10 rounded-full border-gray-300"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={specialty} onValueChange={setSpecialty}>
                        <SelectTrigger className="w-full md:w-[200px] rounded-full border-gray-300">
                          <SelectValue placeholder="Specialty" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {specialties.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredDoctors.map((doctor, index) => (
                        <motion.div
                          key={doctor.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div
                            className={cn(
                              "p-4 rounded-xl border cursor-pointer transition-all hover:border-[#00A651]",
                              selectedDoctor?.id === doctor.id ? "border-[#00A651] bg-[#f9fefb]" : "bg-white",
                            )}
                            onClick={() => setSelectedDoctor(doctor)}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <Avatar className="h-12 w-12 border border-gray-200">
                                <AvatarImage src={doctor.image} alt={doctor.name} />
                                <AvatarFallback>
                                  {doctor.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{doctor.name}</h3>
                                <p className="text-sm text-gray-500">{doctor.specialty}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium">{doctor.rating}</span>
                                  <span className="text-xs text-gray-500">({doctor.reviews} reviews)</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 text-sm mb-3">
                              <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                              <span className="text-gray-600">{doctor.location}</span>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {doctor.availability.slice(0, 3).map((time, timeIndex) => (
                                <div
                                  key={timeIndex}
                                  className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1"
                                >
                                  <Clock className="h-3 w-3 text-gray-500" />
                                  {time}
                                </div>
                              ))}
                              {doctor.availability.length > 3 && (
                                <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                  +{doctor.availability.length - 3} more
                                </div>
                              )}
                            </div>

                            <Button
                              variant={selectedDoctor?.id === doctor.id ? "default" : "outline"}
                              className={cn(
                                "w-full rounded-full",
                                selectedDoctor?.id === doctor.id
                                  ? "bg-[#00A651] hover:bg-[#008f45] text-white"
                                  : "text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651]",
                              )}
                              onClick={() => setSelectedDoctor(doctor)}
                            >
                              {selectedDoctor?.id === doctor.id ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && selectedDoctor && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-4">Select Date</h3>
                        <div className="bg-[#f9fafb] p-4 rounded-xl border">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-xl border-0"
                            classNames={{
                              day_selected: "bg-[#00A651] text-white hover:bg-[#008f45] focus:bg-[#008f45]",
                              day_today: "bg-[#e6f7ef] text-[#00A651]",
                            }}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date > new Date(new Date().setDate(new Date().getDate() + 30))
                            }
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-4">Select Time</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {selectedDoctor.availability.map((time, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className={cn(
                                "rounded-full border-gray-300",
                                selectedTime === time
                                  ? "bg-[#00A651] text-white border-[#00A651] hover:bg-[#008f45]"
                                  : "hover:border-[#00A651] hover:text-[#00A651]",
                              )}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Appointment Type</h3>
                      <RadioGroup
                        defaultValue="consultation"
                        value={appointmentType}
                        onValueChange={setAppointmentType}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-xl border p-4 cursor-pointer transition-all",
                            appointmentType === "consultation" ? "border-[#00A651] bg-[#f9fefb]" : "border-gray-200",
                          )}
                        >
                          <RadioGroupItem value="consultation" id="consultation" className="text-[#00A651]" />
                          <Label htmlFor="consultation">Consultation</Label>
                        </div>
                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-xl border p-4 cursor-pointer transition-all",
                            appointmentType === "followup" ? "border-[#00A651] bg-[#f9fefb]" : "border-gray-200",
                          )}
                        >
                          <RadioGroupItem value="followup" id="followup" className="text-[#00A651]" />
                          <Label htmlFor="followup">Follow-up</Label>
                        </div>
                        <div
                          className={cn(
                            "flex items-center space-x-2 rounded-xl border p-4 cursor-pointer transition-all",
                            appointmentType === "emergency" ? "border-[#00A651] bg-[#f9fefb]" : "border-gray-200",
                          )}
                        >
                          <RadioGroupItem value="emergency" id="emergency" className="text-[#00A651]" />
                          <Label htmlFor="emergency">Emergency</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </motion.div>
                )}

                {step === 3 && selectedDoctor && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="p-4 border rounded-xl bg-[#f9fafb]">
                      <h3 className="font-medium mb-4">Appointment Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-gray-500">Doctor</p>
                          <p className="font-medium">{selectedDoctor.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Specialty</p>
                          <p className="font-medium">{selectedDoctor.specialty}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium">{format(date, "PPP")}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Time</p>
                          <p className="font-medium">{selectedTime}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Type</p>
                          <p className="font-medium capitalize">{appointmentType}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-gray-500">Location</p>
                          <p className="font-medium">{selectedDoctor.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Visit</Label>
                        <Textarea
                          id="reason"
                          placeholder="Please describe your symptoms or reason for the appointment..."
                          rows={4}
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any additional information you'd like to share with the doctor..."
                          rows={2}
                          className="rounded-xl resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="insurance">Insurance Information</Label>
                        <Input
                          id="insurance"
                          placeholder="Insurance provider and policy number"
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="rounded-full border-gray-300"
                    >
                      Back
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      onClick={() => setStep(step + 1)}
                      disabled={(step === 1 && !selectedDoctor) || (step === 2 && (!date || !selectedTime))}
                      className="rounded-full bg-[#00A651] hover:bg-[#008f45] text-white"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBookAppointment}
                      className="rounded-full bg-[#00A651] hover:bg-[#008f45] text-white"
                    >
                      Confirm Appointment
                    </Button>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Upcoming Appointments</h2>

              <div className="space-y-4">
                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Sarah Johnson" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Dr. Sarah Johnson</h3>
                        <p className="text-sm text-gray-500">Cardiologist</p>
                      </div>
                    </div>
                    <Badge className="bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">Tomorrow</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                      <span>June 10, 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#00A651]" />
                      <span>10:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#00A651]" />
                      <span>Medical Center, Floor 3</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651]"
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  className="p-4 border rounded-xl bg-[#f9fafb]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Dr. Michael Chen" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Dr. Michael Chen</h3>
                        <p className="text-sm text-gray-500">Dermatologist</p>
                      </div>
                    </div>
                    <Badge className="bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0">Next Week</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-[#00A651]" />
                      <span>June 15, 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#00A651]" />
                      <span>2:30 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#00A651]" />
                      <span>Health Pavilion, Suite 205</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef] hover:text-[#00A651]"
                    >
                      Reschedule
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                      Cancel
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

