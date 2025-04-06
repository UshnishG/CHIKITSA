"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import {
  Database,
  Brain,
  LineChart,
  Flame,
  ArrowRight,
  Microscope,
  Stethoscope,
  BarChart4,
  ChevronRight,
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const floatAnimation = {
  hidden: { y: 0 },
  visible: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const pulseAnimation = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const drawLine = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export default function HowItWorksPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [overviewRef, overviewInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [step1Ref, step1InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [step2Ref, step2InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [step3Ref, step3InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [step4Ref, step4InView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [techRef, techInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-teal-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section with Particle Effects */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="relative w-full pt-32 pb-24 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          {/* Animated grid background */}
          <div className="absolute inset-0 bg-emerald-600/5 dark:bg-teal-900/20"></div>

          {/* Floating particles */}
          <motion.div
            variants={floatAnimation}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-300 dark:bg-teal-600 rounded-full opacity-10 blur-3xl"
          ></motion.div>
          <motion.div
            variants={floatAnimation}
            initial={{ y: 0 }}
            animate={{
              y: [0, -20, 0],
              transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              },
            }}
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-300 dark:bg-emerald-600 rounded-full opacity-10 blur-3xl"
          ></motion.div>
          <motion.div
            variants={floatAnimation}
            initial={{ y: 0 }}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-indigo-500 dark:bg-indigo-700 rounded-full opacity-10 blur-3xl"
          ></motion.div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-8">
            <motion.div
              variants={fadeIn}
              className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-900/50 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2"
            >
              Our Methodology
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-400 dark:from-emerald-400 dark:to-teal-300"
            >
              How It Works
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
            >
              Discover the revolutionary AI approach that powers our
              personalized medication dosing system
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Overview - Circular Flow Diagram */}
      <motion.section
        ref={overviewRef}
        initial="hidden"
        animate={overviewInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full py-16 md:py-24 bg-white dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Process at a Glance</h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
              Our innovative system uses a continuous feedback loop to optimize
              medication dosages in real-time
            </p>
          </motion.div>

          <div className="relative flex justify-center items-center">
            {/* Center circle */}
            <motion.div
              variants={pulseAnimation}
              className="absolute z-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-teal-400 to-emerald-600 dark:from-teal-400 dark:to-emerald-600 rounded-full flex items-center justify-center"
            >
              <div className="text-white text-center p-2">
                <Brain className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-1" />
                <p className="text-sm md:text-base font-medium">AI Core</p>
              </div>
            </motion.div>

            {/* Circular SVG path */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <motion.circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="rgba(45, 212, 191, 0.2)"
                  strokeWidth="4"
                  strokeDasharray="8 8"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: 360,
                    transition: {
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />
              </svg>

              {/* Process nodes */}
              <motion.div
                variants={fadeIn}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-5 shadow-lg"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <Database className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium text-sm">
                  Data Collection
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-5 shadow-lg"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-teal-100 dark:bg-teal-900/30 rounded-full">
                  <Microscope className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                </div>
                <p className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium text-sm">
                  Initial Recommendation
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-5 shadow-lg"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-teal-100 dark:bg-teal-900/30 rounded-full">
                  <LineChart className="w-7 h-7 text-teal-600 dark:text-teal-400" />
                </div>
                <p className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium text-sm">
                  Patient Monitoring
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-5 shadow-lg"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <Flame className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-medium text-sm">
                  RL Optimization
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Steps Section with 3D Cards */}
      <motion.section className="w-full py-16 bg-gradient-to-b from-teal-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Process in Detail</h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
              Each step of our system is carefully designed to provide the most
              personalized dosage optimization
            </p>
          </div>

          {/* Step 1 */}
          <motion.div
            ref={step1Ref}
            initial="hidden"
            animate={step1InView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <motion.div variants={fadeIn} className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
                    <div className="p-1 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-4">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                            1
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold">
                          Data Collection & Integration
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Our system securely collects and integrates
                        comprehensive patient data to build a complete profile
                        for dosage optimization.
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 dark:bg-gray-700/50 p-4 rounded-lg">
                          <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                          <h4 className="font-medium mb-1">EHR Data</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Medical history and existing conditions
                          </p>
                        </div>
                        <div className="bg-teal-50 dark:bg-gray-700/50 p-4 rounded-lg">
                          <Stethoscope className="h-6 w-6 text-teal-600 dark:text-teal-400 mb-2" />
                          <h4 className="font-medium mb-1">Vitals</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Continuous monitoring of key health metrics
                          </p>
                        </div>
                        <div className="bg-teal-50 dark:bg-gray-700/50 p-4 rounded-lg">
                          <BarChart4 className="h-6 w-6 text-teal-600 dark:text-teal-400 mb-2" />
                          <h4 className="font-medium mb-1">Lab Results</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Biomarkers and blood work
                          </p>
                        </div>
                        <div className="bg-emerald-50 dark:bg-gray-700/50 p-4 rounded-lg">
                          <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                          <h4 className="font-medium mb-1">Genetic Data</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Personalized metabolic factors
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="lg:w-1/2 relative">
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 z-10"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=800"
                    alt="Data collection and integration"
                    width={800}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white text-lg font-medium">
                      Secure & Comprehensive
                    </h4>
                    <p className="text-white/90 text-sm">
                      HIPAA-compliant data handling with multi-source
                      integration
                    </p>
                  </div>
                </div>

                {/* Animated dots overlay */}
                <motion.div className="absolute -top-4 -right-4 w-24 h-24 opacity-70">
                  <svg viewBox="0 0 100 100">
                    <pattern
                      id="dot-pattern"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="5"
                        cy="5"
                        r="2"
                        fill="currentColor"
                        className="text-emerald-500 dark:text-emerald-400"
                      />
                    </pattern>
                    <rect
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      fill="url(#dot-pattern)"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            ref={step2Ref}
            initial="hidden"
            animate={step2InView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center">
              <motion.div variants={fadeIn} className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
                    <div className="p-1 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-emerald-300/50 dark:bg-emerald-600/30 rounded-full mr-4">
                          <span className="text-emerald-600 dark:text-emerald-300 font-bold text-xl">
                            2
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold">
                          Initial Dosage Recommendation
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Based on comprehensive analysis, our AI generates a
                        precise initial dosage recommendation tailored to the
                        individual.
                      </p>

                      <div className="bg-emerald-300/20 dark:bg-emerald-600/10 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">
                          Key Factors Considered:
                        </h4>
                        <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>
                              Patient demographics and body composition
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>
                              Genetic factors affecting drug metabolism
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>Current medication interactions</span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>Medical history and treatment responses</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="lg:w-1/2 relative">
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 z-10"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=800"
                    alt="Initial dosage recommendation"
                    width={800}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white text-lg font-medium">
                      Precise & Personalized
                    </h4>
                    <p className="text-white/90 text-sm">
                      AI-driven dosage calculation based on individual patient
                      profiles
                    </p>
                  </div>
                </div>

                {/* Animated wave overlay */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-24 h-24 opacity-70"
                  initial={{ rotate: 0 }}
                  animate={{
                    rotate: 10,
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                >
                  <svg viewBox="0 0 100 100">
                    <path
                      d="M0,50 Q25,60 50,50 Q75,40 100,50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-teal-400 dark:text-emerald-300"
                    />
                    <path
                      d="M0,70 Q25,80 50,70 Q75,60 100,70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-teal-400 dark:text-emerald-300"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            ref={step3Ref}
            initial="hidden"
            animate={step3InView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              <motion.div variants={fadeIn} className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
                    <div className="p-1 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-emerald-300/50 dark:bg-emerald-600/30 rounded-full mr-4">
                          <span className="text-emerald-600 dark:text-emerald-300 font-bold text-xl">
                            3
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold">
                          Continuous Monitoring & Feedback
                        </h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Our system constantly monitors patient responses and
                        collects multi-dimensional feedback to inform dosage
                        adjustments.
                      </p>

                      <div className="bg-emerald-300/20 dark:bg-emerald-600/10 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">
                          Real-time Data Sources:
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-emerald-300 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Vitals monitoring
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-teal-400 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Blood biomarkers
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Patient reporting
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-emerald-600 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Side effect tracking
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-teal-300 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Symptom changes
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                            <span className="text-gray-600 dark:text-gray-400">
                              Clinician notes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="lg:w-1/2 relative">
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 to-teal-400/20 z-10"></div>
                  <Image
                    src="/placeholder.svg?height=500&width=800"
                    alt="Continuous monitoring and feedback"
                    width={800}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-white text-lg font-medium">
                      Dynamic & Responsive
                    </h4>
                    <p className="text-white/90 text-sm">
                      Continuous data collection for real-time response
                      monitoring
                    </p>
                  </div>
                </div>

                {/* Animated pulse overlay */}
                <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32 opacity-70"
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.5, 0.8, 0.5],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <svg viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal-400 dark:text-emerald-300"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal-400 dark:text-emerald-300"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-teal-400 dark:text-emerald-300"
                    />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            ref={step4Ref}
            initial="hidden"
            animate={step4InView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="mb-24"
          >
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-center">
              <motion.div variants={fadeIn} className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-lg blur opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-all hover:scale-[1.01]">
                    <div className="p-1 bg-gradient-to-r from-emerald-600 to-teal-400"></div>
                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-emerald-300/50 dark:bg-emerald-600/30 rounded-full mr-4">
                          <span className="text-emerald-600 dark:text-emerald-300 font-bold text-xl">
                            4
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold">
                          Reinforcement Learning Optimization
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Our AI agent uses reinforcement learning to adapt and
                        improve dosage accuracy over time through trial-based
                        feedback.
                      </p>
                      <div className="bg-emerald-300/20 dark:bg-emerald-600/10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">
                          Learning from Results:
                        </h4>
                        <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>
                              Analyzes efficacy and patient recovery patterns
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>
                              Adjusts recommendations for faster convergence
                            </span>
                          </li>
                          <li className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-teal-400 dark:text-teal-300 mr-1 flex-shrink-0 mt-0.5" />
                            <span>
                              Minimizes side effects through dynamic tuning
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="lg:w-1/2">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Reinforcement learning optimization"
                  width={800}
                  height={500}
                  className="rounded-lg shadow-xl object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-24 px-6 text-center bg-gradient-to-br from-emerald-600 to-teal-400 text-white"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to experience AI-powered care?
          </h2>
          <p className="text-lg mb-8">
            Start your journey with our intelligent health platform and
            personalized medication engine.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center px-6 py-3 text-base font-medium bg-white text-emerald-600 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}