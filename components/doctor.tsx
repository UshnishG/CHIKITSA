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
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Lock, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample doctor data
const doctorData = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  specialty: "Cardiology",
  licenseNumber: "MD12345678",
  npiNumber: "1234567890",
  education: [
    "MD, Harvard Medical School",
    "Residency, Massachusetts General Hospital",
    "Fellowship, Cleveland Clinic",
  ],
  certifications: ["American Board of Internal Medicine", "American College of Cardiology"],
  languages: ["English", "Spanish"],
  bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
  address: "123 Medical Center Drive, Suite 300",
  city: "Boston",
  state: "MA",
  zipCode: "02115",
  hospitalAffiliations: ["Boston Medical Center", "Massachusetts General Hospital"],
  availability: {
    monday: ["9:00 AM - 5:00 PM"],
    wednesday: ["9:00 AM - 5:00 PM"],
    friday: ["9:00 AM - 3:00 PM"],
  },
  avatar: "/placeholder.svg?height=300&width=300",
}

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(doctorData)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(doctorData)
  const [isSaved, setIsSaved] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setDoctor(formData)
    setIsEditing(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
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
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        variants={fadeIn}
      >
        <div>
          <h1 className="text-3xl font-bold text-[#00A651]">Doctor Profile</h1>
          <p className="text-gray-500 mt-2">Manage your professional information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={
            isEditing
              ? "bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full"
              : "bg-[#00A651] hover:bg-[#008f45] text-white rounded-full"
          }
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </motion.div>

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6"
        >
          <Alert className="bg-[#e6f7ef] text-[#00A651] border-[#00A651] rounded-xl">
            <CheckCircle className="h-4 w-4 text-[#00A651]" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your profile has been updated successfully.</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div variants={fadeIn}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="bg-white border-b w-full justify-start rounded-none mb-8 p-0 h-auto">
            <TabsTrigger
              value="personal"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Personal Info
            </TabsTrigger>
            <TabsTrigger
              value="professional"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Professional Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32 border-2 border-[#00A651]">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full text-[#00A651] border-[#00A651] hover:bg-[#e6f7ef]"
                    >
                      Change Photo
                    </Button>
                  )}
                </div>

                <div className="flex-1 grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.name}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.email}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.phone}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      {isEditing ? (
                        <Input
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.specialty}</div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows={4}
                        className="rounded-xl resize-none"
                      />
                    ) : (
                      <div className="p-2 border rounded-xl bg-[#f9fafb] min-h-[100px]">{doctor.bio}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Office Address</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.address}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.city}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.state}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      {isEditing ? (
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.zipCode}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="professional">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Professional Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Medical License Number</Label>
                  {isEditing ? (
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.licenseNumber}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="npiNumber">NPI Number</Label>
                  {isEditing ? (
                    <Input
                      id="npiNumber"
                      name="npiNumber"
                      value={formData.npiNumber}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="p-2 border rounded-xl bg-[#f9fafb]">{doctor.npiNumber}</div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4 my-6">
                <h3 className="text-lg font-medium">Education & Training</h3>

                <div className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="p-2 border rounded-xl bg-[#f9fafb] flex justify-between items-center">
                      <span>{edu}</span>
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {isEditing && (
                    <div className="flex gap-2 mt-2">
                      <Input placeholder="Add education or training" className="flex-1 rounded-xl" />
                      <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full">Add</Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4 my-6">
                <h3 className="text-lg font-medium">Certifications</h3>

                <div className="space-y-2">
                  {doctor.certifications.map((cert, index) => (
                    <div key={index} className="p-2 border rounded-xl bg-[#f9fafb] flex justify-between items-center">
                      <span>{cert}</span>
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {isEditing && (
                    <div className="flex gap-2 mt-2">
                      <Input placeholder="Add certification" className="flex-1 rounded-xl" />
                      <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full">Add</Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4 my-6">
                <h3 className="text-lg font-medium">Hospital Affiliations</h3>

                <div className="space-y-2">
                  {doctor.hospitalAffiliations.map((hospital, index) => (
                    <div key={index} className="p-2 border rounded-xl bg-[#f9fafb] flex justify-between items-center">
                      <span>{hospital}</span>
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-500 hover:text-red-500">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {isEditing && (
                    <div className="flex gap-2 mt-2">
                      <Input placeholder="Add hospital affiliation" className="flex-1 rounded-xl" />
                      <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full">Add</Button>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4 my-6">
                <h3 className="text-lg font-medium">Languages</h3>

                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1 rounded-full">
                      {lang}
                      {isEditing && (
                        <Button variant="ghost" size="sm" className="h-4 w-4 ml-1 p-0 text-gray-500 hover:text-red-500">
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  ))}

                  {isEditing && (
                    <div className="flex gap-2 mt-2 w-full">
                      <Input placeholder="Add language" className="flex-1 rounded-xl" />
                      <Button className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full">Add</Button>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#00A651] hover:bg-[#008f45] text-white rounded-full"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

