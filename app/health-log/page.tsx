"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Activity, Calendar, Plus, Heart, Thermometer, Droplets, Scale, Sun, Edit, Trash2 } from "lucide-react"
import PageLayout from "@/components/page-layout"
import AnimatedCard from "@/components/animated-card"

// Sample data
const healthEntries = [
  {
    id: 1,
    date: "May 10, 2023",
    time: "08:30 AM",
    type: "Blood Glucose",
    value: "120 mg/dL",
    notes: "Fasting, before breakfast",
    mood: "Good",
    energy: "Medium",
  },
  {
    id: 2,
    date: "May 10, 2023",
    time: "12:30 PM",
    type: "Blood Pressure",
    value: "128/82 mmHg",
    notes: "After lunch, feeling relaxed",
    mood: "Good",
    energy: "High",
  },
  {
    id: 3,
    date: "May 9, 2023",
    time: "09:00 PM",
    type: "Weight",
    value: "78 kg",
    notes: "After dinner",
    mood: "Neutral",
    energy: "Low",
  },
]

const symptoms = [
  {
    id: 1,
    date: "May 10, 2023",
    time: "10:30 AM",
    symptom: "Headache",
    severity: "Mild",
    duration: "2 hours",
    notes: "Frontal headache, relieved with water",
  },
  {
    id: 2,
    date: "May 9, 2023",
    time: "03:15 PM",
    symptom: "Fatigue",
    severity: "Moderate",
    duration: "All day",
    notes: "Feeling tired despite adequate sleep",
  },
]

export default function HealthLogPage() {
  const [activeTab, setActiveTab] = useState("metrics")
  const [showAddForm, setShowAddForm] = useState(false)
  const [formType, setFormType] = useState<"metric" | "symptom">("metric")

  const handleAddEntry = (type: "metric" | "symptom") => {
    setFormType(type)
    setShowAddForm(true)
  }

  return (
    <PageLayout
      title="Health Log"
      description="Track your health metrics, symptoms, and daily wellness"
      userRole="patient"
    >
      <Tabs defaultValue="metrics" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
          <TabsList className="grid w-full md:w-auto grid-cols-3 rounded-full p-1 bg-secondary/50">
            <TabsTrigger value="metrics" className="rounded-full data-[state=active]:bg-white">
              Health Metrics
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="rounded-full data-[state=active]:bg-white">
              Symptoms
            </TabsTrigger>
            <TabsTrigger value="journal" className="rounded-full data-[state=active]:bg-white">
              Wellness Journal
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleAddEntry("symptom")}>
              <Plus className="h-4 w-4 mr-1" />
              Add Symptom
            </Button>
            <Button size="sm" className="rounded-full" onClick={() => handleAddEntry("metric")}>
              <Plus className="h-4 w-4 mr-1" />
              Add Metric
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedCard title={formType === "metric" ? "Add Health Metric" : "Add Symptom"} animation="fade">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">
                        Date
                      </label>
                      <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium">
                        Time
                      </label>
                      <Input id="time" type="time" defaultValue={new Date().toTimeString().slice(0, 5)} />
                    </div>
                  </div>

                  {formType === "metric" ? (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="metric-type" className="text-sm font-medium">
                          Metric Type
                        </label>
                        <select
                          id="metric-type"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="blood-glucose">Blood Glucose</option>
                          <option value="blood-pressure">Blood Pressure</option>
                          <option value="weight">Weight</option>
                          <option value="temperature">Temperature</option>
                          <option value="heart-rate">Heart Rate</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="value" className="text-sm font-medium">
                          Value
                        </label>
                        <Input id="value" placeholder="e.g., 120 mg/dL" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="symptom" className="text-sm font-medium">
                          Symptom
                        </label>
                        <Input id="symptom" placeholder="e.g., Headache" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="severity" className="text-sm font-medium">
                          Severity
                        </label>
                        <select id="severity" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="mild">Mild</option>
                          <option value="moderate">Moderate</option>
                          <option value="severe">Severe</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium">
                          Duration
                        </label>
                        <Input id="duration" placeholder="e.g., 2 hours" />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes
                    </label>
                    <Textarea id="notes" placeholder="Additional details..." />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button>Save Entry</Button>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          )}
        </AnimatePresence>

        <TabsContent value="metrics" className="space-y-6">
          <AnimatedCard
            title="Recent Health Metrics"
            description="Track your vital signs and health measurements"
            animation="fade"
          >
            <div className="space-y-4">
              {healthEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start border rounded-lg p-4"
                >
                  <div className="mr-4">
                    <div
                      className={`p-2 rounded-full ${
                        entry.type === "Blood Glucose"
                          ? "bg-amber-100"
                          : entry.type === "Blood Pressure"
                            ? "bg-blue-100"
                            : entry.type === "Weight"
                              ? "bg-green-100"
                              : "bg-gray-100"
                      }`}
                    >
                      {entry.type === "Blood Glucose" && <Droplets className="h-5 w-5 text-amber-600" />}
                      {entry.type === "Blood Pressure" && <Activity className="h-5 w-5 text-blue-600" />}
                      {entry.type === "Weight" && <Scale className="h-5 w-5 text-green-600" />}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{entry.type}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{entry.value}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {entry.date}, {entry.time}
                      </span>
                    </div>

                    {entry.notes && <p className="text-sm mt-2">{entry.notes}</p>}

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Heart className="h-3 w-3 text-rose-500" />
                        <span>Mood: {entry.mood}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Sun className="h-3 w-3 text-amber-500" />
                        <span>Energy: {entry.energy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-6">
          <AnimatedCard title="Symptom Tracker" description="Record and monitor your symptoms" animation="fade">
            <div className="space-y-4">
              {symptoms.map((symptom, index) => (
                <motion.div
                  key={symptom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start border rounded-lg p-4"
                >
                  <div className="mr-4">
                    <div
                      className={`p-2 rounded-full ${
                        symptom.severity === "Mild"
                          ? "bg-green-100"
                          : symptom.severity === "Moderate"
                            ? "bg-amber-100"
                            : "bg-red-100"
                      }`}
                    >
                      <Thermometer
                        className={`h-5 w-5 ${
                          symptom.severity === "Mild"
                            ? "text-green-600"
                            : symptom.severity === "Moderate"
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{symptom.symptom}</h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            symptom.severity === "Mild"
                              ? "outline"
                              : symptom.severity === "Moderate"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {symptom.severity}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {symptom.date}, {symptom.time}
                      </span>
                      <span>•</span>
                      <span>Duration: {symptom.duration}</span>
                    </div>

                    {symptom.notes && <p className="text-sm mt-2">{symptom.notes}</p>}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedCard>
        </TabsContent>

        <TabsContent value="journal" className="space-y-6">
          <AnimatedCard
            title="Wellness Journal"
            description="Track your daily wellness and reflections"
            animation="fade"
          >
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" className="rounded-full">
                  <Plus className="h-4 w-4 mr-1" />
                  New Journal Entry
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Today's Reflection</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>May 10, 2023</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      Mood: Good
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                      Energy: High
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  Today was a productive day. I managed to take all my medications on time and followed my diet plan. I
                  went for a 30-minute walk in the morning which helped me feel energized throughout the day. My blood
                  glucose levels were stable, and I didn't experience any unusual symptoms.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">What Went Well</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Took all medications on time</li>
                      <li>• 30-minute morning walk</li>
                      <li>• Stable blood glucose readings</li>
                      <li>• Drank plenty of water</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Could have eaten more vegetables</li>
                      <li>• Went to bed a bit late</li>
                      <li>• Missed afternoon meditation</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}

