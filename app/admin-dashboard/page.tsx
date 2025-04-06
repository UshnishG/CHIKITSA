"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Server,
  Database,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  LucideBarChart,
  PieChart,
  LineChartIcon,
  Pill,
} from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data
const systemMetrics = {
  cpuUsage: 42,
  memoryUsage: 68,
  diskUsage: 37,
  apiLatency: 124, // ms
  activeUsers: 287,
  totalPatients: 1245,
  totalDoctors: 68,
}

const userActivityData = [
  { day: "Mon", patients: 120, doctors: 45 },
  { day: "Tue", patients: 132, doctors: 52 },
  { day: "Wed", patients: 145, doctors: 49 },
  { day: "Thu", patients: 155, doctors: 55 },
  { day: "Fri", patients: 165, doctors: 58 },
  { day: "Sat", patients: 110, doctors: 32 },
  { day: "Sun", patients: 90, doctors: 28 },
]

const aiPerformanceData = [
  { month: "Jan", accuracy: 82, adoption: 45 },
  { month: "Feb", accuracy: 85, adoption: 52 },
  { month: "Mar", accuracy: 87, adoption: 58 },
  { month: "Apr", accuracy: 89, adoption: 63 },
  { month: "May", accuracy: 92, adoption: 70 },
]

const medicationDistributionData = [
  { name: "Diabetes", value: 35 },
  { name: "Hypertension", value: 25 },
  { name: "Cholesterol", value: 20 },
  { name: "Asthma", value: 10 },
  { name: "Other", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

const alerts = [
  {
    id: 1,
    type: "system",
    message: "Database backup completed successfully",
    time: "2 hours ago",
    severity: "info",
  },
  {
    id: 2,
    type: "security",
    message: "Multiple failed login attempts detected",
    time: "5 hours ago",
    severity: "warning",
  },
  {
    id: 3,
    type: "ai",
    message: "AI model retraining completed with 92% accuracy",
    time: "Yesterday",
    severity: "success",
  },
  {
    id: 4,
    type: "system",
    message: "API endpoint /dosage/recommend experiencing high latency",
    time: "Today",
    severity: "error",
  },
]

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Admin Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor system health, AI performance, and user analytics
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full py-6 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-3 rounded-full p-1 bg-secondary/50">
              <TabsTrigger value="overview" className="rounded-full data-[state=active]:bg-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="ai-performance" className="rounded-full data-[state=active]:bg-white">
                AI Performance
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-full data-[state=active]:bg-white">
                Users & Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <StaggerChildren className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                        <Server className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{systemMetrics.cpuUsage}%</div>
                        <Progress value={systemMetrics.cpuUsage} className="mt-2" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                        <Server className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{systemMetrics.memoryUsage}%</div>
                        <Progress value={systemMetrics.memoryUsage} className="mt-2" />
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">API Latency</CardTitle>
                        <Activity className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{systemMetrics.apiLatency} ms</div>
                        <p className="text-xs text-muted-foreground">Healthy range: &lt;200ms</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
                <StaggerItem>
                  <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card className="ios-card border-none">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{systemMetrics.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">+12% from last hour</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              </StaggerChildren>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="ios-card border-none col-span-4">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Patient and doctor activity over the past week</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={userActivityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="patients" fill="#10b981" name="Patients" />
                          <Bar dataKey="doctors" fill="#3b82f6" name="Doctors" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none col-span-3">
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Recent system notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="flex items-center">
                          <div
                            className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full ${
                              alert.severity === "info"
                                ? "bg-blue-100 text-blue-600"
                                : alert.severity === "warning"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : alert.severity === "success"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                            }`}
                          >
                            {alert.severity === "info" && <Database className="h-4 w-4" />}
                            {alert.severity === "warning" && <AlertCircle className="h-4 w-4" />}
                            {alert.severity === "success" && <CheckCircle className="h-4 w-4" />}
                            {alert.severity === "error" && <AlertCircle className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">AI Model Accuracy</CardTitle>
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-sm text-muted-foreground">+3% from last month</p>
                    <Progress value={92} className="mt-4" />
                  </CardContent>
                </Card>
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">Dosage Recommendations</CardTitle>
                    <Pill className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,245</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-xs">
                        Approved: <span className="font-medium">78%</span>
                      </div>
                      <div className="text-xs">
                        Rejected: <span className="font-medium">22%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">AI Adoption Rate</CardTitle>
                    <Users className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">70%</div>
                    <p className="text-sm text-muted-foreground">+5% from last month</p>
                    <Progress value={70} className="mt-4" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="ios-card border-none">
                  <CardHeader>
                    <CardTitle>AI Performance Trends</CardTitle>
                    <CardDescription>Model accuracy and adoption rate over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={aiPerformanceData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="accuracy"
                            stroke="#10b981"
                            activeDot={{ r: 8 }}
                            name="Accuracy (%)"
                          />
                          <Line type="monotone" dataKey="adoption" stroke="#3b82f6" name="Adoption Rate (%)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none">
                  <CardHeader>
                    <CardTitle>Medication Distribution</CardTitle>
                    <CardDescription>Types of medications optimized by AI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={medicationDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {medicationDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemMetrics.totalPatients}</div>
                    <p className="text-xs text-muted-foreground">+85 this month</p>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemMetrics.totalDoctors}</div>
                    <p className="text-xs text-muted-foreground">+12 this month</p>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                    <Activity className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemMetrics.activeUsers}</div>
                    <p className="text-xs text-muted-foreground">Last 24 hours</p>
                  </CardContent>
                </Card>
                <Card className="ios-card border-none">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
                    <Users className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="ios-card border-none">
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>Detailed user statistics and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">User Engagement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <LucideBarChart className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">Average Session</h4>
                            </div>
                            <span className="text-xl font-bold">8.5 min</span>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <PieChart className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">Retention Rate</h4>
                            </div>
                            <span className="text-xl font-bold">78%</span>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <LineChartIcon className="h-5 w-5 text-primary" />
                              <h4 className="font-medium">Daily Active</h4>
                            </div>
                            <span className="text-xl font-bold">452</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">User Distribution</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">By Role</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Patients</span>
                              <span className="font-medium">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span>Doctors</span>
                              <span className="font-medium">15%</span>
                            </div>
                            <Progress value={15} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span>Admins</span>
                              <span className="font-medium">7%</span>
                            </div>
                            <Progress value={7} className="h-2" />
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">By Platform</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Web</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span>iOS</span>
                              <span className="font-medium">35%</span>
                            </div>
                            <Progress value={35} className="h-2" />
                            <div className="flex items-center justify-between">
                              <span>Android</span>
                              <span className="font-medium">20%</span>
                            </div>
                            <Progress value={20} className="h-2" />
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

