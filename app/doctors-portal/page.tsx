"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Activity, Calendar, Clock, TrendingUp, Pill, CheckCircle, XCircle, MessageCircle, Search } from "lucide-react"
import { FadeIn } from "@/components/animations"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample data
const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 45,
    condition: "Type 2 Diabetes",
    lastVisit: "May 2, 2023",
    status: "Stable",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 62,
    condition: "Hypertension",
    lastVisit: "April 28, 2023",
    status: "Needs Review",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Robert Johnson",
    age: 58,
    condition: "Cholesterol",
    lastVisit: "May 5, 2023",
    status: "Improving",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 35,
    condition: "Asthma",
    lastVisit: "April 15, 2023",
    status: "Needs Attention",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const dosageRecommendations = [
  {
    id: 1,
    patient: "Jane Smith",
    medication: "Lisinopril",
    currentDosage: "10mg daily",
    recommendedDosage: "20mg daily",
    reason: "Blood pressure consistently above target range",
    status: "pending",
  },
  {
    id: 2,
    patient: "Robert Johnson",
    medication: "Atorvastatin",
    currentDosage: "20mg daily",
    recommendedDosage: "10mg daily",
    reason: "Cholesterol levels have improved significantly",
    status: "pending",
  },
  {
    id: 3,
    patient: "Emily Davis",
    medication: "Albuterol",
    currentDosage: "2 puffs as needed",
    recommendedDosage: "2 puffs twice daily",
    reason: "Increased frequency of asthma symptoms",
    status: "pending",
  },
]

const appointments = [
  {
    id: 1,
    patient: "John Doe",
    date: "May 15, 2023",
    time: "10:00 AM",
    type: "Follow-up",
    status: "confirmed",
  },
  {
    id: 2,
    patient: "Jane Smith",
    date: "May 16, 2023",
    time: "2:30 PM",
    type: "Medication Review",
    status: "confirmed",
  },
  {
    id: 3,
    patient: "Emily Davis",
    date: "May 18, 2023",
    time: "11:15 AM",
    type: "Urgent",
    status: "confirmed",
  },
]

export default function DoctorsPortalPage() {
  const [activeTab, setActiveTab] = useState("patients")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Doctor's Portal</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Manage patients, review AI recommendations, and optimize treatment plans
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-6 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="patients" className="space-y-4" onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
              <TabsList className="grid w-full md:w-auto grid-cols-3 rounded-full p-1 bg-secondary/50">
                <TabsTrigger value="patients" className="rounded-full data-[state=active]:bg-white">
                  Patients
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="rounded-full data-[state=active]:bg-white">
                  AI Recommendations
                </TabsTrigger>
                <TabsTrigger value="appointments" className="rounded-full data-[state=active]:bg-white">
                  Appointments
                </TabsTrigger>
              </TabsList>

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patients..."
                  className="pl-8 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="patients" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Patient List</CardTitle>
                  <CardDescription>Manage your patients and their treatment plans</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Condition</TableHead>
                          <TableHead>Last Visit</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={patient.avatar} alt={patient.name} />
                                  <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                {patient.name}
                              </div>
                            </TableCell>
                            <TableCell>{patient.age}</TableCell>
                            <TableCell>{patient.condition}</TableCell>
                            <TableCell>{patient.lastVisit}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  patient.status === "Stable"
                                    ? "outline"
                                    : patient.status === "Improving"
                                      ? "secondary"
                                      : patient.status === "Needs Review"
                                        ? "default"
                                        : "destructive"
                                }
                              >
                                {patient.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                                  <MessageCircle className="h-4 w-4" />
                                  <span className="sr-only">Message</span>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                                  <Pill className="h-4 w-4" />
                                  <span className="sr-only">Medications</span>
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                                  <Activity className="h-4 w-4" />
                                  <span className="sr-only">History</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>AI Dosage Recommendations</CardTitle>
                  <CardDescription>Review and approve AI-suggested medication adjustments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dosageRecommendations.map((rec) => (
                      <div key={rec.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            <h4 className="font-semibold">{rec.patient}</h4>
                          </div>
                          <Badge>AI Recommendation</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Medication</p>
                            <p className="font-medium">{rec.medication}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Current Dosage</p>
                            <p className="font-medium">{rec.currentDosage}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Recommended Dosage</p>
                            <p className="font-medium text-primary">{rec.recommendedDosage}</p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Reason</p>
                            <p className="font-medium">{rec.reason}</p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="rounded-full">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" className="rounded-full">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled patient appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{appointment.patient}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>
                                {appointment.date}, {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              appointment.type === "Urgent"
                                ? "destructive"
                                : appointment.type === "Medication Review"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {appointment.type}
                          </Badge>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

