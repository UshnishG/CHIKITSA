"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MessageCircle, Pill, Activity, Filter, Plus, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import PageLayout from "@/components/page-layout"
import AnimatedCard from "@/components/animated-card"

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
  {
    id: 5,
    name: "Michael Wilson",
    age: 52,
    condition: "Arthritis",
    lastVisit: "May 7, 2023",
    status: "Stable",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Sarah Brown",
    age: 41,
    condition: "Migraine",
    lastVisit: "May 1, 2023",
    status: "Improving",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageLayout
      title="Patient Management"
      description="View and manage your patients' health information and treatment plans"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients..."
              className="pl-8 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        <AnimatedCard>
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
                  <TableRow
                    key={patient.id}
                    className="cursor-pointer hover:bg-secondary/30 transition-colors"
                    onClick={() => setSelectedPatient(patient.id === selectedPatient ? null : patient.id)}
                  >
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
                        <Button variant="outline" size="sm" className="rounded-full h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPatients.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground mb-2 opacity-20" />
                        <p className="text-muted-foreground">No patients found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AnimatedCard>

        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCard delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Patient Details</h3>
                  <div className="space-y-4">
                    {/* Patient details would go here */}
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={patients.find((p) => p.id === selectedPatient)?.avatar}
                          alt={patients.find((p) => p.id === selectedPatient)?.name}
                        />
                        <AvatarFallback>
                          {patients.find((p) => p.id === selectedPatient)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-xl font-bold">{patients.find((p) => p.id === selectedPatient)?.name}</h4>
                        <p className="text-muted-foreground">
                          {patients.find((p) => p.id === selectedPatient)?.age} years old
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Primary Condition</p>
                        <p className="font-medium">{patients.find((p) => p.id === selectedPatient)?.condition}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Last Visit</p>
                        <p className="font-medium">{patients.find((p) => p.id === selectedPatient)?.lastVisit}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-full justify-start">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="rounded-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      View History
                    </Button>
                    <Button variant="outline" className="rounded-full justify-start">
                      <Pill className="h-4 w-4 mr-2" />
                      Manage Medications
                    </Button>
                    <Button className="rounded-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}

