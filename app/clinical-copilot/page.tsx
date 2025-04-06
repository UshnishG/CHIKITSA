"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Brain,
  Stethoscope,
  CheckCircle,
  ChevronDown,
  Search,
  Pill,
  FileText,
  MessageCircle,
  ClipboardList,
  Calendar,
  BarChart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data
const diagnoses = [
  {
    id: 1,
    name: "Type 2 Diabetes Mellitus",
    confidence: 92,
    description:
      "A chronic condition that affects the way the body processes blood sugar (glucose).",
    evidence: [
      "Fasting blood glucose: 142 mg/dL (elevated)",
      "HbA1c: 7.2% (elevated)",
      "Patient reports increased thirst and frequent urination",
      "Family history of diabetes",
      "BMI: 31.2 (obese range)",
    ],
    recommendations: [
      "Start Metformin 500mg twice daily",
      "Lifestyle modifications including diet and exercise",
      "Blood glucose monitoring",
      "Follow-up in 3 months with repeat HbA1c",
    ],
  },
  {
    id: 2,
    name: "Hypertension",
    confidence: 87,
    description:
      "High blood pressure is a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.",
    evidence: [
      "Blood pressure: 148/92 mmHg (elevated)",
      "Patient reports occasional headaches",
      "Family history of cardiovascular disease",
      "Sedentary lifestyle",
    ],
    recommendations: [
      "Consider starting Lisinopril 10mg daily",
      "Sodium-restricted diet",
      "Regular physical activity",
      "Blood pressure monitoring",
    ],
  },
];

const similarCases = [
  {
    id: 1,
    gender: "Male",
    age: 47,
    matchPercentage: 93,
    description:
      "Patient presented with similar symptoms and test results. Diagnosed with Type 2 Diabetes and Hypertension. Responded well to Metformin 500mg BID and lifestyle modifications.",
    icon: <FileText className="h-5 w-5 text-blue-600" />,
    title: "Similar Symptoms",
  },
  {
    id: 2,
    gender: "Female",
    age: 42,
    matchPercentage: 87,
    description:
      "Patient had similar lab results but different presenting symptoms. Diagnosed with Type 2 Diabetes. Required insulin therapy after oral medications proved insufficient.",
    icon: <FileText className="h-5 w-5 text-blue-600" />,
    title: "Similar Lab Results",
  },
  {
    id: 3,
    gender: "Male",
    age: 51,
    matchPercentage: 82,
    description:
      "Patient with comparable medical history and family history of diabetes. Responded well to combined therapy of Metformin and weight management program.",
    icon: <FileText className="h-5 w-5 text-blue-600" />,
    title: "Similar Medical History",
  },
];

export default function ClinicalCopilotPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [openDiagnosis, setOpenDiagnosis] = useState<number | null>(null);
  const [patientNotes, setPatientNotes] = useState("");
  const [activeTab, setActiveTab] = useState("diagnoses");

  const toggleDiagnosis = (id: number) => {
    setOpenDiagnosis(openDiagnosis === id ? null : id);
  };

  const handleAnalyze = () => {
    if (!patientNotes.trim()) return;

    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-green-600">
          Clinical Copilot
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-assisted clinical decision support for diagnosis and treatment
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Patient information section - Left sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/placeholder.svg?height=64&width=64"
                    alt="John Doe"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>Patient ID: #12345</CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      Type 2 Diabetes
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      Hypertension
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-center mt-4">
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Age</p>
                  <p className="font-medium">45</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Weight</p>
                  <p className="font-medium">78 kg</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Height</p>
                  <p className="font-medium">175 cm</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs text-muted-foreground">Blood Type</p>
                  <p className="font-medium">A+</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full justify-start"
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    View Medical History
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full justify-start"
                  >
                    <Pill className="h-4 w-4 mr-2" />
                    Current Medications
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full justify-start"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Lab Results
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full justify-start"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Appointment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full justify-start"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message Patient
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Patient Notes</CardTitle>
              <CardDescription>
                Enter symptoms, test results, and observations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter patient symptoms, test results, and observations..."
                className="min-h-[200px] resize-none"
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !patientNotes.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main content area - Right side */}
        <div className="lg:col-span-8">
          {isAnalyzing ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <motion.div
                  className="flex space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-3 h-3 bg-primary rounded-full"
                      animate={{
                        y: ["0%", "-50%", "0%"],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: dot * 0.1,
                      }}
                    />
                  ))}
                  <span className="ml-2 text-primary font-medium">
                    AI analyzing patient data...
                  </span>
                </motion.div>
                <p className="text-sm text-muted-foreground mt-4 max-w-md text-center">
                  Analyzing symptoms, medical history, lab results, and
                  comparing with similar cases to generate potential diagnoses
                  and treatment recommendations.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="diagnoses" className="flex items-center">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Potential Diagnoses
                </TabsTrigger>
                <TabsTrigger
                  value="similar-cases"
                  className="flex items-center"
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  Similar Cases
                </TabsTrigger>
              </TabsList>

              <TabsContent value="diagnoses" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Potential Diagnoses</CardTitle>
                    <CardDescription>
                      AI-generated diagnostic suggestions based on patient data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-4">
                        {diagnoses.map((diagnosis) => (
                          <motion.div
                            key={diagnosis.id}
                            layout
                            initial={{ borderRadius: 16 }}
                            className="border rounded-xl p-4 bg-card shadow-sm"
                          >
                            <motion.div
                              layout
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => toggleDiagnosis(diagnosis.id)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-primary/10 p-2 rounded-full">
                                  <Stethoscope className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-medium">
                                    {diagnosis.name}
                                    <Badge variant="secondary" className="ml-2">
                                      {diagnosis.confidence}% confidence
                                    </Badge>
                                  </h3>
                                </div>
                              </div>
                              <motion.div
                                animate={{
                                  rotate:
                                    openDiagnosis === diagnosis.id ? 180 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <ChevronDown className="h-5 w-5" />
                              </motion.div>
                            </motion.div>

                            <AnimatePresence>
                              {openDiagnosis === diagnosis.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 pt-4 border-t"
                                >
                                  <p className="text-muted-foreground mb-4">
                                    {diagnosis.description}
                                  </p>

                                  <div className="space-y-3 mb-4">
                                    <h4 className="text-sm font-semibold">
                                      Supporting Evidence:
                                    </h4>
                                    <ul className="space-y-2">
                                      {diagnosis.evidence.map((item, i) => (
                                        <motion.li
                                          key={i}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.1 }}
                                          className="flex items-start gap-2 text-sm"
                                        >
                                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span>{item}</span>
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold">
                                      Treatment Recommendations:
                                    </h4>
                                    <ul className="space-y-2">
                                      {diagnosis.recommendations.map(
                                        (item, i) => (
                                          <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                              delay: i * 0.1 + 0.5,
                                            }}
                                            className="flex items-start gap-2 text-sm"
                                          >
                                            <Pill className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                          </motion.li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="similar-cases" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Similar Cases</CardTitle>
                    <CardDescription>
                      Anonymized similar patient cases for reference
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="grid gap-4">
                        {similarCases.map((caseData) => (
                          <motion.div
                            key={caseData.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg border p-4 hover:border-primary/50 hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  {caseData.icon}
                                </div>
                                <h4 className="font-medium">
                                  {caseData.gender}, {caseData.age},{" "}
                                  {caseData.title}
                                </h4>
                              </div>
                              <Badge variant="secondary">
                                {caseData.matchPercentage}% Match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {caseData.description}
                            </p>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm">
                                View Case Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}
