"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Search, Plus, Settings, Users, Calendar, Clock, Info, AlertCircle } from "lucide-react"
import PageLayout from "@/components/page-layout"
import AnimatedCard from "@/components/animated-card"

// Sample data
const features = [
  {
    id: 1,
    name: "AI Dosage Recommendations",
    description: "Enable AI-powered medication dosage recommendations",
    status: "enabled",
    userSegments: ["All Users"],
    lastUpdated: "May 5, 2023",
    updatedBy: "Michael Wilson",
  },
  {
    id: 2,
    name: "Telemedicine Video Calls",
    description: "Allow video consultations between doctors and patients",
    status: "enabled",
    userSegments: ["Doctors", "Premium Patients"],
    lastUpdated: "April 28, 2023",
    updatedBy: "Michael Wilson",
  },
  {
    id: 3,
    name: "Health Journal",
    description: "Enable patients to keep a daily health journal",
    status: "disabled",
    userSegments: [],
    lastUpdated: "May 1, 2023",
    updatedBy: "Michael Wilson",
  },
  {
    id: 4,
    name: "Family View",
    description: "Allow patients to manage family members' health",
    status: "beta",
    userSegments: ["Beta Testers"],
    lastUpdated: "May 8, 2023",
    updatedBy: "Michael Wilson",
  },
  {
    id: 5,
    name: "Clinical Copilot",
    description: "AI-assisted clinical decision support for doctors",
    status: "beta",
    userSegments: ["Senior Doctors"],
    lastUpdated: "May 7, 2023",
    updatedBy: "Michael Wilson",
  },
]

export default function AdminFeatureTogglePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [featureStates, setFeatureStates] = useState<Record<number, boolean>>(
    features.reduce(
      (acc, feature) => {
        acc[feature.id] = feature.status === "enabled" || feature.status === "beta"
        return acc
      },
      {} as Record<number, boolean>,
    ),
  )

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus ? feature.status === selectedStatus : true

    return matchesSearch && matchesStatus
  })

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(selectedStatus === status ? null : status)
  }

  const handleToggleFeature = (id: number) => {
    setFeatureStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <PageLayout
      title="Feature Toggle Dashboard"
      description="Control feature availability and rollout across the platform"
      userRole="admin"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search features..."
              className="pl-8 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === "enabled" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleStatusFilter("enabled")}
            >
              Enabled
            </Button>
            <Button
              variant={selectedStatus === "disabled" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleStatusFilter("disabled")}
            >
              Disabled
            </Button>
            <Button
              variant={selectedStatus === "beta" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleStatusFilter("beta")}
            >
              Beta
            </Button>
            <Button variant="outline" size="sm" className="rounded-full ml-auto">
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <AnimatedCard animation="none">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{feature.name}</h3>
                      <Badge
                        variant={
                          feature.status === "enabled" ? "default" : feature.status === "beta" ? "secondary" : "outline"
                        }
                      >
                        {feature.status.charAt(0).toUpperCase() + feature.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>

                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      {feature.userSegments.length > 0 ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{feature.userSegments.join(", ")}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>No user segments</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>Updated: {feature.lastUpdated}</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>By: {feature.updatedBy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={featureStates[feature.id]}
                        onCheckedChange={() => handleToggleFeature(feature.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                      <span className="text-sm font-medium">{featureStates[feature.id] ? "On" : "Off"}</span>
                    </div>

                    <Button variant="ghost" size="sm" className="rounded-full">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </div>
                </div>

                {feature.status === "beta" && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
                    <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Beta Feature</p>
                      <p className="text-sm text-amber-700">
                        This feature is currently in beta testing with limited user segments. Monitor performance
                        closely before full rollout.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatedCard>
            </motion.div>
          ))}

          {filteredFeatures.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <h3 className="text-lg font-medium">No features found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        <AnimatedCard
          title="Feature Rollout Strategy"
          description="Best practices for safely rolling out new features"
          animation="fade"
          delay={0.3}
        >
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <h3 className="font-medium">Phased Rollout Approach</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                For major features, we recommend a phased rollout approach:
              </p>
              <ol className="list-decimal list-inside text-sm space-y-1 mt-2">
                <li>Internal testing with admin users</li>
                <li>Beta testing with 5-10% of users</li>
                <li>Expanded testing with 25-50% of users</li>
                <li>Full rollout to all users</li>
              </ol>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                <h3 className="font-medium">Monitoring Recommendations</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                When enabling new features, closely monitor these metrics:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                <li>Error rates and system performance</li>
                <li>User engagement and adoption</li>
                <li>Support ticket volume related to the feature</li>
                <li>A/B test results comparing with control group</li>
              </ul>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </PageLayout>
  )
}

