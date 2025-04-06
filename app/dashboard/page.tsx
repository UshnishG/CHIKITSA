"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Activity, Calendar, Clock, TrendingUp, Pill, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data for charts
const dosageData = [
  { day: "Mon", dosage: 10, response: 85 },
  { day: "Tue", dosage: 15, response: 90 },
  { day: "Wed", dosage: 12, response: 88 },
  { day: "Thu", dosage: 18, response: 95 },
  { day: "Fri", dosage: 15, response: 92 },
  { day: "Sat", dosage: 12, response: 89 },
  { day: "Sun", dosage: 10, response: 86 },
]

const upcomingMedications = [
  { id: 1, name: "Metformin", dosage: "500mg", time: "8:00 AM", status: "upcoming" },
  { id: 2, name: "Lisinopril", dosage: "10mg", time: "12:00 PM", status: "upcoming" },
  { id: 3, name: "Atorvastatin", dosage: "20mg", time: "8:00 PM", status: "upcoming" },
]

const recentActivities = [
  { id: 1, action: "Dosage adjusted", medication: "Metformin", time: "2 hours ago" },
  { id: 2, action: "Blood pressure recorded", value: "120/80", time: "5 hours ago" },
  { id: 3, action: "Doctor's note added", doctor: "Dr. Smith", time: "Yesterday" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Patient Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor your medication, track your progress, and manage your health
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-6 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex rounded-full p-1 bg-secondary/50">
              <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="medications" className="rounded-full data-[state=active]:bg-white">
                Medications
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-full data-[state=active]:bg-white">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <StaggerChildren className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current Medications</CardTitle>
                        <Pill className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">+1 from last month</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Doses</CardTitle>
                        <Clock className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Next dose in 2 hours</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Adherence Rate</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                        <Calendar className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">May 15</div>
                        <p className="text-xs text-muted-foreground">Dr. Johnson at 10:00 AM</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              </StaggerChildren>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="ios-card border-none col-span-4">
                  <CardHeader>
                    <CardTitle>Dosage & Response</CardTitle>
                    <CardDescription>Your medication dosage and response over the past week</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={dosageData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="dosage"
                            stroke="#10b981"
                            activeDot={{ r: 8 }}
                            name="Dosage (mg)"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="response"
                            stroke="#3b82f6"
                            name="Response (%)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Medications</CardTitle>
                    <CardDescription>Your scheduled medications for today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingMedications.map((med) => (
                        <div key={med.id} className="flex items-center">
                          <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Pill className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {med.name} ({med.dosage})
                            </p>
                            <p className="text-sm text-muted-foreground">{med.time}</p>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full">
                            Take
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="ios-card border-none col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent health-related activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center">
                          <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Activity className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {activity.action}
                              {activity.medication && `: ${activity.medication}`}
                              {activity.value && `: ${activity.value}`}
                              {activity.doctor && ` by ${activity.doctor}`}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none col-span-4">
                  <CardHeader>
                    <CardTitle>AI Recommendations</CardTitle>
                    <CardDescription>Personalized suggestions based on your health data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border p-3 bg-secondary/50">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <p className="text-sm font-medium">Dosage Adjustment</p>
                        </div>
                        <p className="mt-2 text-sm">
                          Based on your recent blood pressure readings, we recommend increasing your Lisinopril dosage
                          to 20mg. Please consult with your doctor.
                        </p>
                      </div>
                      <div className="rounded-lg border p-3 bg-secondary/50">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <p className="text-sm font-medium">Potential Interaction</p>
                        </div>
                        <p className="mt-2 text-sm">
                          Your new supplement may interact with Metformin. Consider taking them at different times of
                          the day.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                  <CardDescription>Your active prescriptions and dosage information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Pill className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Metformin</h4>
                            <p className="text-sm text-muted-foreground">Diabetes</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">500mg</p>
                          <p className="text-sm text-muted-foreground">Twice daily</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">Morning</p>
                          <p className="text-muted-foreground">8:00 AM</p>
                        </div>
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">Evening</p>
                          <p className="text-muted-foreground">8:00 PM</p>
                        </div>
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">With Food</p>
                          <p className="text-muted-foreground">Yes</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Pill className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Lisinopril</h4>
                            <p className="text-sm text-muted-foreground">Hypertension</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">10mg</p>
                          <p className="text-sm text-muted-foreground">Once daily</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">Morning</p>
                          <p className="text-muted-foreground">12:00 PM</p>
                        </div>
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">With Food</p>
                          <p className="text-muted-foreground">No</p>
                        </div>
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">AI Optimized</p>
                          <p className="text-muted-foreground">Yes</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Pill className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Atorvastatin</h4>
                            <p className="text-sm text-muted-foreground">Cholesterol</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">20mg</p>
                          <p className="text-sm text-muted-foreground">Once daily</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">Evening</p>
                          <p className="text-muted-foreground">8:00 PM</p>
                        </div>
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">With Food</p>
                          <p className="text-muted-foreground">Yes</p>
                        </div>
                        <div className="rounded-md bg-secondary p-2 text-center">
                          <p className="font-medium">AI Optimized</p>
                          <p className="text-muted-foreground">Yes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                  <CardDescription>Your health records and past treatments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Conditions</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span>Type 2 Diabetes</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Diagnosed 2018</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span>Hypertension</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Diagnosed 2019</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span>High Cholesterol</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Diagnosed 2020</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Past Medications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <span>Glipizide</span>
                          </div>
                          <span className="text-sm text-muted-foreground">2018-2020</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4 text-primary" />
                            <span>Amlodipine</span>
                          </div>
                          <span className="text-sm text-muted-foreground">2019-2021</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Recent Lab Results</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span>HbA1c</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">6.8%</span>
                            <p className="text-xs text-muted-foreground">April 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span>Blood Pressure</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">128/82</span>
                            <p className="text-xs text-muted-foreground">April 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            <span>Cholesterol</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">185 mg/dL</span>
                            <p className="text-xs text-muted-foreground">April 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
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

