"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Pill, Brain, Activity, TrendingUp, ArrowUpDown, AlertCircle, CheckCircle, Clock, Calendar } from "lucide-react"
import { FadeIn } from "@/components/animations"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Separator } from "@/components/ui/separator"

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

const medications = [
  {
    id: 1,
    name: "Metformin",
    currentDosage: "500mg",
    recommendedDosage: "750mg",
    confidence: 92,
    reason: "Blood glucose levels consistently above target range in the morning",
    status: "pending",
  },
  {
    id: 2,
    name: "Lisinopril",
    currentDosage: "10mg",
    recommendedDosage: "20mg",
    confidence: 87,
    reason: "Blood pressure readings show elevated systolic pressure",
    status: "approved",
  },
  {
    id: 3,
    name: "Atorvastatin",
    currentDosage: "20mg",
    recommendedDosage: "10mg",
    confidence: 78,
    reason: "Cholesterol levels have improved significantly",
    status: "pending",
  },
]

export default function DosageAIPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Dosage AI Profile</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Your personalized medication dosage recommendations powered by AI
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-6 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-4">
              <Card className="ios-card border-none overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>John Doe</CardTitle>
                      <CardDescription>Patient ID: #12345</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">AI Profile Completeness</span>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Age</p>
                        <p className="font-medium">45</p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="font-medium">78 kg</p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Height</p>
                        <p className="font-medium">175 cm</p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-2">
                        <p className="text-xs text-muted-foreground">Blood Type</p>
                        <p className="font-medium">A+</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Type 2 Diabetes
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Hypertension
                    </Badge>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      High Cholesterol
                    </Badge>
                  </div>
                </CardContent>
                <Separator />
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">AI Learning Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" />
                        <span className="text-sm">Learning Progress</span>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span className="text-sm">Data Points</span>
                      </div>
                      <span className="text-sm font-medium">1,245</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm">Learning Since</span>
                      </div>
                      <span className="text-sm font-medium">Jan 15, 2023</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-full">
                    View Full Health Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <Tabs defaultValue="recommendations" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3 rounded-full p-1 bg-secondary/50">
                  <TabsTrigger value="recommendations" className="rounded-full data-[state=active]:bg-white">
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-full data-[state=active]:bg-white">
                    Dosage History
                  </TabsTrigger>
                  <TabsTrigger value="insights" className="rounded-full data-[state=active]:bg-white">
                    AI Insights
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card className="ios-card border-none">
                    <CardHeader>
                      <CardTitle>AI Dosage Recommendations</CardTitle>
                      <CardDescription>
                        Personalized medication dosage suggestions based on your health data
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {medications.map((med) => (
                        <div key={med.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                <Pill className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{med.name}</h4>
                                <div className="flex items-center gap-1">
                                  <Badge variant="outline" className="text-xs">
                                    {med.status === "approved" ? "Approved" : "Pending"}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">Confidence: {med.confidence}%</span>
                                </div>
                              </div>
                            </div>
                            <ArrowUpDown className="h-5 w-5 text-primary" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Current Dosage</p>
                              <p className="font-medium">{med.currentDosage}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-muted-foreground">Recommended Dosage</p>
                              <p className="font-medium text-primary">{med.recommendedDosage}</p>
                            </div>
                          </div>

                          <div className="space-y-1 mb-4">
                            <p className="text-sm text-muted-foreground">Reason for Recommendation</p>
                            <p className="text-sm">{med.reason}</p>
                          </div>

                          <div className="flex justify-end gap-2">
                            {med.status === "pending" ? (
                              <>
                                <Button variant="outline" size="sm" className="rounded-full">
                                  View Details
                                </Button>
                                <Button size="sm" className="rounded-full">
                                  Accept Recommendation
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline" size="sm" className="rounded-full">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card className="ios-card border-none">
                    <CardHeader>
                      <CardTitle>Dosage History & Response</CardTitle>
                      <CardDescription>Track how your medication dosages have changed over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] mb-6">
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

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Recent Dosage Changes</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="font-medium">Lisinopril increased to 20mg</p>
                                <p className="text-xs text-muted-foreground">May 5, 2023</p>
                              </div>
                            </div>
                            <Badge variant="outline">Effective</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-amber-600" />
                              <div>
                                <p className="font-medium">Metformin adjusted to 500mg</p>
                                <p className="text-xs text-muted-foreground">April 22, 2023</p>
                              </div>
                            </div>
                            <Badge variant="outline">Monitoring</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="font-medium">Atorvastatin reduced to 10mg</p>
                                <p className="text-xs text-muted-foreground">April 10, 2023</p>
                              </div>
                            </div>
                            <Badge variant="outline">Effective</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <Card className="ios-card border-none">
                    <CardHeader>
                      <CardTitle>AI Insights & Observations</CardTitle>
                      <CardDescription>
                        Personalized insights based on your health data and medication response
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg border p-4 bg-primary/5">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Medication Effectiveness</h3>
                        </div>
                        <p className="text-sm mb-2">
                          Your response to Lisinopril has been positive, with blood pressure readings showing consistent
                          improvement over the past 30 days. The increased dosage appears to be effective.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated 2 days ago</span>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-amber-50">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-amber-600" />
                          <h3 className="font-medium">Potential Interaction</h3>
                        </div>
                        <p className="text-sm mb-2">
                          Our AI has detected a potential interaction between your current Metformin dosage and your
                          recent vitamin B12 supplement. Consider spacing these medications at least 2 hours apart.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated 5 days ago</span>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-blue-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          <h3 className="font-medium">Pattern Recognition</h3>
                        </div>
                        <p className="text-sm mb-2">
                          Our AI has observed that your blood glucose levels tend to spike on weekends. This may be
                          related to changes in your diet or activity levels during these days.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated 1 week ago</span>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4 bg-green-50">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium">Positive Trend</h3>
                        </div>
                        <p className="text-sm mb-2">
                          Your cholesterol levels have shown significant improvement since reducing your Atorvastatin
                          dosage. This suggests your lifestyle changes are having a positive impact.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated 2 weeks ago</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full rounded-full">Generate New Insights</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>AI Learning Preferences</CardTitle>
                  <CardDescription>
                    Customize how the AI learns from your data to improve dosage recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Learning Mode</h3>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Controls how aggressively the AI adjusts dosage recommendations based on new data.
                      </p>
                      <Button variant="outline" size="sm" className="rounded-full w-full">
                        Adjust Settings
                      </Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Data Sources</h3>
                        </div>
                        <Badge>3 Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Manage which health data sources the AI can use for dosage optimization.
                      </p>
                      <Button variant="outline" size="sm" className="rounded-full w-full">
                        Manage Sources
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Optimization Goals</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Set your priorities for medication optimization to guide the AI's recommendations.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Effectiveness</span>
                        <span className="text-sm font-medium">High</span>
                      </div>
                      <Progress value={80} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Side Effect Minimization</span>
                        <span className="text-sm font-medium">Medium</span>
                      </div>
                      <Progress value={60} className="h-2" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Convenience</span>
                        <span className="text-sm font-medium">Low</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="rounded-full w-full">
                        Adjust Priorities
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

