"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, Plus, Search, UserPlus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample user data
const users = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Doctor",
    specialty: "Cardiology",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    role: "Doctor",
    specialty: "Dermatology",
    status: "active",
    lastActive: "1 day ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Patient",
    status: "active",
    lastActive: "3 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Bob Williams",
    email: "bob.williams@example.com",
    role: "Patient",
    status: "inactive",
    lastActive: "2 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "Admin",
    status: "active",
    lastActive: "Just now",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Sample feature flags
const featureFlags = [
  {
    id: 1,
    name: "Online Appointments",
    description: "Allow patients to book appointments online",
    enabled: true,
    environment: "production",
  },
  {
    id: 2,
    name: "Video Consultations",
    description: "Enable video consultations between doctors and patients",
    enabled: true,
    environment: "production",
  },
  {
    id: 3,
    name: "Patient Portal",
    description: "Patient portal for accessing medical records",
    enabled: true,
    environment: "production",
  },
  {
    id: 4,
    name: "AI Diagnosis Assistant",
    description: "AI-powered tool to assist doctors with diagnoses",
    enabled: false,
    environment: "development",
  },
  {
    id: 5,
    name: "Mobile App Integration",
    description: "Integration with mobile applications",
    enabled: false,
    environment: "staging",
  },
]

// Sample statistics
const statistics = {
  totalUsers: 1245,
  activeUsers: 876,
  totalDoctors: 48,
  totalPatients: 1192,
  appointmentsToday: 87,
  appointmentsThisWeek: 412,
  userGrowth: 12.5,
  appointmentGrowth: 8.3,
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [flags, setFlags] = useState(featureFlags)

  const handleToggleFeature = (id) => {
    setFlags(flags.map((flag) => (flag.id === id ? { ...flag, enabled: !flag.enabled } : flag)))
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
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
        <h1 className="text-3xl font-bold text-[#00A651]">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Manage users, features, and system settings</p>
      </motion.div>

      <motion.div variants={fadeIn} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <p className="text-sm font-medium text-gray-500 mb-2">Total Users</p>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statistics.totalUsers}</div>
              <Badge className="bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0 rounded-full">
                +{statistics.userGrowth}%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">{statistics.activeUsers} active users</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <p className="text-sm font-medium text-gray-500 mb-2">Doctors</p>
            <div className="text-2xl font-bold">{statistics.totalDoctors}</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={75} className="h-2 bg-gray-200" />
              <span className="text-xs text-gray-500">75% active</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <p className="text-sm font-medium text-gray-500 mb-2">Patients</p>
            <div className="text-2xl font-bold">{statistics.totalPatients}</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={68} className="h-2 bg-gray-200" />
              <span className="text-xs text-gray-500">68% active</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <p className="text-sm font-medium text-gray-500 mb-2">Appointments</p>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{statistics.appointmentsToday}</div>
              <Badge className="bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0 rounded-full">
                +{statistics.appointmentGrowth}%
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mt-1">{statistics.appointmentsThisWeek} this week</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none mb-8 p-0 h-auto">
            <TabsTrigger
              value="users"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Feature Toggles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold">User Management</h2>
                  <p className="text-gray-500">Manage users, roles, and permissions</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-10 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[150px] rounded-full">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="doctor">Doctors</SelectItem>
                      <SelectItem value="patient">Patients</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px] rounded-full">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="w-[300px]">
                        <div className="flex items-center gap-1">
                          User
                          <ArrowUpDown className="h-3 w-3 text-gray-400" />
                        </div>
                      </TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border border-gray-200">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full">
                            {user.role}
                            {user.specialty && ` - ${user.specialty}`}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.status === "active" ? "default" : "secondary"}
                            className={
                              user.status === "active"
                                ? "bg-[#e6f7ef] text-[#00A651] hover:bg-[#d1f0e2] border-0 rounded-full"
                                : "rounded-full"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit User</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">Deactivate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold">Feature Toggles</h2>
                  <p className="text-gray-500">Manage feature flags and toggles</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Feature Flag
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {flags.map((feature) => (
                  <motion.div
                    key={feature.id}
                    className="p-4 border rounded-xl bg-[#f9fafb]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.id * 0.05 }}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{feature.name}</h3>
                          <Badge variant="outline" className="rounded-full">
                            {feature.environment}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`feature-${feature.id}`}
                            checked={feature.enabled}
                            onCheckedChange={() => handleToggleFeature(feature.id)}
                            className="data-[state=checked]:bg-[#00A651]"
                          />
                          <Label htmlFor={`feature-${feature.id}`}>{feature.enabled ? "Enabled" : "Disabled"}</Label>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View History</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

