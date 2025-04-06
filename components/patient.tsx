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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Lock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Sample patient data
const patientData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+1 (555) 123-4567",
  dob: "1985-06-15",
  gender: "Male",
  address: "123 Main Street, Apt 4B",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  emergencyContact: "Jane Smith",
  emergencyPhone: "+1 (555) 987-6543",
  bloodType: "O+",
  allergies: "Penicillin, Peanuts",
  medications: "Lisinopril 10mg daily",
  medicalConditions: "Hypertension, Asthma",
  insuranceProvider: "Blue Cross Blue Shield",
  insurancePolicyNumber: "XYZ123456789",
  insuranceGroupNumber: "G-987654",
  avatar: "/placeholder.svg?height=300&width=300",
}

export default function PatientProfile() {
  const [patient, setPatient] = useState(patientData)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(patientData)
  const [isSaved, setIsSaved] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setPatient(formData)
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
          <h1 className="text-3xl font-bold text-[#00A651]">My Profile</h1>
          <p className="text-gray-500 mt-2">Manage your personal information</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          className={
            isEditing ? "bg-gray-200 hover:bg-gray-300 text-gray-800" : "bg-[#00A651] hover:bg-[#008f45] text-white"
          }
          rounded="full"
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
              value="medical"
              className="rounded-t-lg data-[state=active]:bg-[#00A651] data-[state=active]:text-white py-2 px-6"
            >
              Medical Info
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="personal">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Personal Information</h2>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32 border-2 border-[#00A651]">
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name
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
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.name}</div>
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
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.email}</div>
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
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.phone}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      {isEditing ? (
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.dob}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      {isEditing ? (
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                        >
                          <SelectTrigger id="gender" className="rounded-xl">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.gender}</div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.address}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.city}</div>
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
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.state}</div>
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
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.zipCode}</div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      {isEditing ? (
                        <Input
                          id="emergencyContact"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.emergencyContact}</div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                      {isEditing ? (
                        <Input
                          id="emergencyPhone"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleInputChange}
                          className="rounded-xl"
                        />
                      ) : (
                        <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.emergencyPhone}</div>
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

          <TabsContent value="medical">
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-xl font-bold mb-6">Medical Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  {isEditing ? (
                    <Select
                      value={formData.bloodType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, bloodType: value }))}
                    >
                      <SelectTrigger id="bloodType" className="rounded-xl">
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                        <SelectItem value="Unknown">Unknown</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.bloodType}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  {isEditing ? (
                    <Input
                      id="allergies"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleInputChange}
                      placeholder="List allergies separated by commas"
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.allergies || "None"}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="medications">Current Medications</Label>
                {isEditing ? (
                  <Textarea
                    id="medications"
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    placeholder="List current medications and dosages"
                    rows={3}
                    className="rounded-xl resize-none"
                  />
                ) : (
                  <div className="p-2 border rounded-xl bg-[#f9fafb] min-h-[80px]">{patient.medications || "None"}</div>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="medicalConditions">Medical Conditions</Label>
                {isEditing ? (
                  <Textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    placeholder="List any chronic conditions or past surgeries"
                    rows={3}
                    className="rounded-xl resize-none"
                  />
                ) : (
                  <div className="p-2 border rounded-xl bg-[#f9fafb] min-h-[80px]">
                    {patient.medicalConditions || "None"}
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-medium">Insurance Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    {isEditing ? (
                      <Input
                        id="insuranceProvider"
                        name="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.insuranceProvider}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
                    {isEditing ? (
                      <Input
                        id="insurancePolicyNumber"
                        name="insurancePolicyNumber"
                        value={formData.insurancePolicyNumber}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.insurancePolicyNumber}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceGroupNumber">Group Number</Label>
                    {isEditing ? (
                      <Input
                        id="insuranceGroupNumber"
                        name="insuranceGroupNumber"
                        value={formData.insuranceGroupNumber}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="p-2 border rounded-xl bg-[#f9fafb]">{patient.insuranceGroupNumber}</div>
                    )}
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
        </Tabs>
      </motion.div>
    </motion.div>
  )
}

