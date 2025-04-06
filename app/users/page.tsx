"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  MoreHorizontal,
  User,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react"
import PageLayout from "@/components/page-layout"
import AnimatedCard from "@/components/animated-card"

// Sample data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "patient",
    status: "active",
    joinDate: "May 2, 2023",
    lastActive: "Today",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    role: "doctor",
    status: "active",
    joinDate: "April 15, 2023",
    lastActive: "Yesterday",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "patient",
    status: "inactive",
    joinDate: "March 10, 2023",
    lastActive: "2 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Dr. Emily Davis",
    email: "emily.davis@example.com",
    role: "doctor",
    status: "pending",
    joinDate: "May 8, 2023",
    lastActive: "Never",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "admin",
    status: "active",
    joinDate: "January 5, 2023",
    lastActive: "Today",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole ? user.role === selectedRole : true
    const matchesStatus = selectedStatus ? user.status === selectedStatus : true

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleRoleFilter = (role: string) => {
    setSelectedRole(selectedRole === role ? null : role)
  }

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status)
  }

  const handleUserSelect = (userId: number) => {
    setSelectedUser(selectedUser === userId ? null : userId)
  }

  return (
    <PageLayout
      title="User Management"
      description="Manage users, roles, and permissions across the platform"
      userRole="admin"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedRole === "patient" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleRoleFilter("patient")}
            >
              <User className="h-4 w-4 mr-1" />
              Patients
            </Button>
            <Button
              variant={selectedRole === "doctor" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleRoleFilter("doctor")}
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Doctors
            </Button>
            <Button
              variant={selectedRole === "admin" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleRoleFilter("admin")}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Admins
            </Button>
            <Button variant="outline" size="sm" className="rounded-full ml-auto">
              <Plus className="h-4 w-4 mr-1" />
              Add User
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedStatus === "active" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleStatusFilter("active")}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Active
          </Button>
          <Button
            variant={selectedStatus === "inactive" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleStatusFilter("inactive")}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Inactive
          </Button>
          <Button
            variant={selectedStatus === "pending" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleStatusFilter("pending")}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Pending
          </Button>
        </div>

        <AnimatedCard animation="fade">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`cursor-pointer hover:bg-secondary/30 transition-colors ${
                      selectedUser === user.id ? "bg-secondary/50" : ""
                    }`}
                    onClick={() => handleUserSelect(user.id)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.role === "doctor"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : user.role === "admin"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : "bg-green-100 text-green-700 border-green-200"
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "default" : user.status === "inactive" ? "destructive" : "outline"
                        }
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <UserX className="h-4 w-4" />
                          <span className="sr-only">Deactivate</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-muted-foreground mb-2 opacity-20" />
                        <p className="text-muted-foreground">No users found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </AnimatedCard>

        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedCard title="User Details" animation="fade" delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={users.find((u) => u.id === selectedUser)?.avatar}
                        alt={users.find((u) => u.id === selectedUser)?.name}
                      />
                      <AvatarFallback>{users.find((u) => u.id === selectedUser)?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{users.find((u) => u.id === selectedUser)?.name}</h3>
                      <p className="text-muted-foreground">{users.find((u) => u.id === selectedUser)?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium capitalize">{users.find((u) => u.id === selectedUser)?.role}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">{users.find((u) => u.id === selectedUser)?.status}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Join Date</p>
                        <p className="font-medium">{users.find((u) => u.id === selectedUser)?.joinDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Last Active</p>
                        <p className="font-medium">{users.find((u) => u.id === selectedUser)?.lastActive}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start rounded-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="justify-start rounded-full">
                      <UserCheck className="h-4 w-4 mr-2" />
                      Edit Permissions
                    </Button>
                    <Button variant="outline" className="justify-start rounded-full">
                      <UserX className="h-4 w-4 mr-2" />
                      Deactivate Account
                    </Button>
                    <Button variant="destructive" className="justify-start rounded-full">
                      <XCircle className="h-4 w-4 mr-2" />
                      Delete Account
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

