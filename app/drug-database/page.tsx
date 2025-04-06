"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Pill, AlertCircle, Info, Clock, ChevronRight, Filter, ArrowUpDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { FadeIn, SlideIn } from "@/components/animations"
import { useInView } from 'react-intersection-observer'

// Define the Drug interface to match your JSON structure with optional fields
interface Drug {
  id: number;
  name?: string;
  category?: string;
  description?: string;
  dosageForm?: string;
  standardDosage?: string;
  interactions?: string[];
  sideEffects?: string[];
  precautions?: string[];
  aiOptimized?: boolean;
}

export default function DrugDatabasePage() {
  // State management with proper typing
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [displayedDrugs, setDisplayedDrugs] = useState<Drug[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const ITEMS_PER_PAGE = 20;

  // Virtualized scrolling with Intersection Observer
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // Load the drug data from JSON file
  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/drugs.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch drugs: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setDrugs(data as Drug[]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading drug data:", error);
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  // Memoized filtered drugs based on search term and active tab
  const filteredDrugs = useMemo(() => {
    if (!drugs.length) return [];
    
    // Create a simpler, case-insensitive search function
    const searchTermLower = searchTerm.toLowerCase().trim();
    
    return drugs.filter(drug => {
      // First filter based on tab selection
      const tabMatch = activeTab === "all" || (activeTab === "ai-optimized" && drug.aiOptimized);
      
      // If no search term or tab doesn't match, just return tab filter result
      if (!searchTermLower || !tabMatch) return tabMatch;
      
      // Only search necessary fields and use includes for performance
      // Add null/undefined checks for each field before accessing toLowerCase()
      return (
        (drug.name?.toLowerCase()?.includes(searchTermLower) || false) ||
        (drug.category?.toLowerCase()?.includes(searchTermLower) || false) ||
        (drug.description?.toLowerCase()?.includes(searchTermLower) || false)
      );
    });
  }, [drugs, searchTerm, activeTab]);

  // Apply pagination to the filtered drugs
  useEffect(() => {
    if (filteredDrugs.length === 0) {
      setDisplayedDrugs([]);
      setHasMore(false);
      return;
    }

    const slicedDrugs = filteredDrugs.slice(0, page * ITEMS_PER_PAGE);
    setDisplayedDrugs(slicedDrugs);
    setHasMore(slicedDrugs.length < filteredDrugs.length);
  }, [filteredDrugs, page]);

  // Handle search with debounce to prevent excessive filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set a new timeout to update search after typing stops
    const timeout = setTimeout(() => {
      setSearchTerm(value);
      setPage(1); // Reset to first page on new search
    }, 300); // 300ms debounce
    
    setSearchTimeout(timeout);
  };

  // Load more when scrolled to the bottom
  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1); // Reset to first page on tab change
    setSelectedDrug(null); // Clear selected drug when changing tabs
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-8 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">Drug Database</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Comprehensive information on medications and AI-optimized dosage recommendations
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
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search medications..."
                    className="pl-8 rounded-full"
                    onChange={handleSearch}
                  />
                </div>

                <Tabs defaultValue="all" onValueChange={handleTabChange}>
                  <TabsList className="grid w-full grid-cols-2 rounded-full p-1 bg-secondary/50">
                    <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-white">
                      All Medications
                    </TabsTrigger>
                    <TabsTrigger value="ai-optimized" className="rounded-full data-[state=active]:bg-white">
                      Favorites
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {loading ? "Loading..." : `${filteredDrugs.length} medications found`}
                  </p>
                  <Button variant="ghost" size="sm" className="gap-1 rounded-full">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <Card className="ios-card border-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="max-h-[600px] overflow-y-auto">
                    {loading ? (
                      <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        <span className="ml-2">Loading medications...</span>
                      </div>
                    ) : displayedDrugs.length > 0 ? (
                      <ul className="divide-y">
                        {displayedDrugs.map((drug) => (
                          <motion.li
                            key={drug.id}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            className="p-3 cursor-pointer"
                            onClick={() => setSelectedDrug(drug)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                  <Pill className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{drug.name}</h4>
                                  <p className="text-sm text-muted-foreground">{drug.category}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {drug.aiOptimized && (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                    AI Optimized
                                  </Badge>
                                )}
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </motion.li>
                        ))}
                        {/* Infinite scroll loader reference */}
                        {hasMore && (
                          <div ref={ref} className="p-4 flex justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          </div>
                        )}
                      </ul>
                    ) : (
                      <div className="p-8 text-center">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <h3 className="font-medium">No medications found</h3>
                        <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-8">
              {selectedDrug ? (
                <SlideIn>
                  <Card className="ios-card border-none">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Pill className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{selectedDrug.name}</CardTitle>
                            <CardDescription>{selectedDrug.category}</CardDescription>
                          </div>
                        </div>
                        {selectedDrug.aiOptimized && (
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            AI Optimized
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Overview</h3>
                        <p className="text-muted-foreground">{selectedDrug.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Dosage Information</h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Form:</span>
                              <span className="text-sm font-medium">{selectedDrug.dosageForm}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Standard Dosage:</span>
                              <span className="text-sm font-medium">{selectedDrug.standardDosage}</span>
                            </div>
                            {selectedDrug.aiOptimized && (
                              <div className="mt-4 p-2 rounded-md bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-2">
                                  <ArrowUpDown className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-medium text-primary">
                                    AI Dosage Optimization Available
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Our AI system can suggest personalized dosage adjustments based on your specific
                                  health data and response patterns.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <h4 className="font-medium">Precautions</h4>
                          </div>
                          <ul className="space-y-1 list-disc pl-5">
                            {selectedDrug.precautions?.map((precaution: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {precaution}
                              </li>
                            )) || <li className="text-sm text-muted-foreground">No precautions listed</li>}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Side Effects</h4>
                          </div>
                          <ul className="space-y-1 list-disc pl-5">
                            {selectedDrug.sideEffects?.map((effect: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {effect}
                              </li>
                            )) || <li className="text-sm text-muted-foreground">No side effects listed</li>}
                          </ul>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">Interactions</h4>
                          </div>
                          <ul className="space-y-1 list-disc pl-5">
                            {selectedDrug.interactions?.map((interaction: string, index: number) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {interaction}
                              </li>
                            )) || <li className="text-sm text-muted-foreground">No interactions listed</li>}
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" className="rounded-full">
                          Add to Favorites
                        </Button>
                        <Button className="rounded-full">Request Dosage Optimization</Button>
                      </div>
                    </CardContent>
                  </Card>
                </SlideIn>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mx-auto mb-4">
                      <Pill className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Select a Medication</h3>
                    <p className="text-muted-foreground mt-2 max-w-md">
                      Choose a medication from the list to view detailed information and AI-optimized dosage
                      recommendations.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}