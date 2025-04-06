"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { auth, db } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("doctor")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const license = formData.get("license") as string | null
    const patientId = formData.get("patientId") as string | null

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const userData: Record<string, any> = {
        firstName,
        lastName,
        email,
        role: userType,
      }

      if (userType === "doctor") {
        userData.licenseNumber = license
      } else if (userType === "patient") {
        userData.patientId = patientId
      }

      try {
        await setDoc(doc(db, "users", user.uid), userData)
      } catch (dbError) {
        console.error("Firestore write failed:", dbError)
        // Optional: handle partial signup cleanup
      }

      router.push("/login") // ✅ Redirect after full success
    } catch (error: any) {
      console.error("Signup error:", error)
      if (error.code === "auth/email-already-in-use") {
        router.push("/login") // Redirect if email exists
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign up to start optimizing medication dosages
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup value={userType} onValueChange={setUserType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="doctor" id="doctor" />
                  <Label htmlFor="doctor">Healthcare Provider</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Administrator</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
            {userType === "doctor" && (
              <div className="space-y-2">
                <Label htmlFor="license">Medical License Number</Label>
                <Input id="license" name="license" required placeholder="License number" />
              </div>
            )}
            {userType === "patient" && (
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID (if available)</Label>
                <Input id="patientId" name="patientId" placeholder="Patient ID" />
              </div>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
          <div className="text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
