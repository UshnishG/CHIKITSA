"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Activity,
  Shield,
  Database,
  ChevronRight,
  Zap,
  BarChart2,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const MotionButton = motion(Button);

export default function ProductPage() {
  // For animated counter
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 95) {
        setCount((prev) => prev + 1);
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [count]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
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

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-b from-white to-emerald-50 dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section with Animated Background */}
      <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-100 opacity-30 dark:opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-emerald-100 opacity-30 dark:opacity-10 blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-40 h-40 rounded-full bg-emerald-100 opacity-20 dark:opacity-10 blur-2xl"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center space-y-6 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <motion.div
              className="inline-block p-2 px-4 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-medium">
                AI-Powered Healthcare Solution
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-300"
              variants={fadeInUp}
            >
              Personalized Drug Dosage
              <br />
              <span className="text-slate-800 dark:text-white">
                Optimization System
              </span>
            </motion.h1>

            <motion.p
              className="max-w-[800px] text-lg md:text-xl text-slate-600 dark:text-slate-300"
              variants={fadeInUp}
            >
              Revolutionizing patient care with reinforcement learning that
              dynamically adjusts medication dosages based on individual
              responses.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-6"
              variants={fadeInUp}
            >
              <Link href="/how-it-works">
              <MotionButton
                  whileHover={{ scale: 1.05 }}
                  className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-8 py-6 rounded-lg text-lg shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30 transition-all duration-300"
                >
                  Explore Solution
                  <ChevronRight className="ml-2 h-5 w-5" />
                </MotionButton>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  className="border-emerald-300 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-600 text-emerald-600 dark:text-emerald-300 px-8 py-6 rounded-lg text-lg transition-all duration-300"
                >
                  Request Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Background Image/Illustration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent dark:from-gray-950 dark:to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        ></motion.div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-white dark:bg-gray-900 relative z-10">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-50 dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-emerald-500 dark:text-emerald-400">
                {count}%
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-center mt-2">
                Dosage Accuracy
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-50 dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-emerald-500 dark:text-emerald-400">
                60%
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-center mt-2">
                Reduced Side Effects
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-50 dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-emerald-500 dark:text-emerald-400">
                3x
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-center mt-2">
                Faster Adjustments
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-emerald-50 dark:bg-gray-800"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-emerald-500 dark:text-emerald-400">
                24/7
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-center mt-2">
                Continuous Monitoring
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Overview With 3D Model */}
      <section className="w-full py-20 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-sm font-medium">
                Advanced AI Technology
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Adaptive Dosage Optimization{" "}
                <span className="text-emerald-500 dark:text-emerald-400">System</span>
              </h2>

              <p className="text-lg text-slate-600 dark:text-slate-300">
                Our platform revolutionizes medication management by
                continuously learning from patient responses and adjusting
                dosages in real-time for optimal therapeutic outcomes.
              </p>

              <motion.ul className="space-y-4 pt-4" variants={staggerContainer}>
                <motion.li
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                >
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Zap className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Personalized Learning
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Adapts to each patient's unique biological responses
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                >
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <BarChart2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Data-Driven Decisions
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Leverages EHRs, vitals, and genomics for precise dosing
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                >
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Clock className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Real-time Adaptation
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Continuously monitors and adjusts to changing conditions
                    </p>
                  </div>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                >
                  <div className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <Users className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Physician Partnership
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Empowers doctors with AI-assisted clinical decision
                      support
                    </p>
                  </div>
                </motion.li>
              </motion.ul>

              <motion.div className="pt-6" variants={fadeInUp}>
                <Link href="/how-it-works">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300">
                    Learn How It Works
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex items-center justify-center mx-auto lg:justify-end"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="relative w-full max-w-[500px] ">
                <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-900/20 blur-3xl opacity-70"></div>
                <motion.div
                  className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  animate={pulseAnimation}
                >
                  <Image
                    src="/4.jpg"
                    alt="AI Dosage System Dashboard"
                    width={600}
                    height={600}
                    className="object-cover rounded-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full py-20 bg-emerald-50 dark:bg-gray-900/50 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Transforming{" "}
              <span className="text-emerald-500 dark:text-emerald-400">
                Patient Care
              </span>{" "}
              Across Conditions
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform is designed to optimize medication dosages across
              various medical conditions, providing personalized care for every
              patient
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-1"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                  <Activity className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Diabetes Management
                </h3>
                <p className="text-slate-500 dark:text-gray-300">
                  Optimizes insulin dosages based on continuous glucose
                  monitoring, dietary intake, and physical activity patterns to
                  maintain ideal blood sugar levels.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-sm text-emerald-500 dark:text-emerald-400 font-medium">
                    <span>View case study</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-1"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                  <Activity className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Oncology Treatment
                </h3>
                <p className="text-slate-500 dark:text-gray-300">
                  Personalizes chemotherapy dosages to maximize efficacy while
                  reducing side effects through continuous analysis of patient
                  response and biomarkers.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-sm text-emerald-500 dark:text-emerald-400 font-medium">
                    <span>View case study</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl p-1"
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="p-6 relative z-10">
                <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                  <Activity className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  Hypertension Control
                </h3>
                <p className="text-slate-500 dark:text-gray-300">
                  Adjusts blood pressure medication based on continuous
                  monitoring of vital signs, lifestyle factors, and individual
                  physiological responses.
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center text-sm text-emerald-500 dark:text-emerald-400 font-medium">
                    <span>View case study</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full py-20 bg-white dark:bg-gray-950 relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900/50 dark:to-gray-950"></div>
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-300 text-sm font-medium">
              Powered by Advanced Technology
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Key{" "}
              <span className="text-emerald-500 dark:text-emerald-400">Features</span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with healthcare expertise to
              deliver a comprehensive medication management system
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-6 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800/70"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)",
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-bl-full opacity-40"></div>
              <div className="p-3 mb-4 rounded-xl w-14 h-14 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                <Brain className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Reinforcement Learning
              </h3>
              <p className="text-slate-500 dark:text-gray-300">
                Our AI continuously learns from patient responses to optimize
                dosage recommendations over time
              </p>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-6 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800/70"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)",
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-bl-full opacity-40"></div>
              <div className="p-3 mb-4 rounded-xl w-14 h-14 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                <Database className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                EHR Integration
              </h3>
              <p className="text-slate-500 dark:text-gray-300">
                Seamlessly connects with existing electronic health record
                systems for comprehensive data access
              </p>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-6 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800/70"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)",
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-bl-full opacity-40"></div>
              <div className="p-3 mb-4 rounded-xl w-14 h-14 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                <Activity className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Real-time Monitoring
              </h3>
              <p className="text-slate-500 dark:text-gray-300">
                Continuously tracks patient vitals and responses to medication
                for immediate adjustments
              </p>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-6 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800/70"
              variants={fadeInUp}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.1)",
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-bl-full opacity-40"></div>
              <div className="p-3 mb-4 rounded-xl w-14 h-14 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30">
                <Shield className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                Security & Compliance
              </h3>
              <p className="text-slate-500 dark:text-gray-300">
                HIPAA-compliant data handling with advanced encryption and
                privacy controls
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="w-full py-20 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-teal-950/30 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="relative p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="w-full aspect-video rounded-xl overflow-hidden">
                  <Image
                    src="/8.jpg"
                    alt="AI Dashboard Demo"
                    width={800}
                    height={500}
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Interactive Demo
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                See Our Platform{" "}
                <span className="text-emerald-500 dark:text-emerald-400">
                  in Action
                </span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-gray-300 mb-6">
                Experience how our AI-powered system processes patient data,
                learns from responses, and dynamically adjusts dosages to
                achieve the best therapeutic results. Interact with a live
                simulation of our intelligent dashboard.
              </p>
              <Link href="/demo">
                <Button className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-6 py-3 rounded-lg text-lg">
                  Try the Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-24 bg-white dark:bg-gray-950 text-center">
        <motion.div
          className="container mx-auto px-4 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Ready to Revolutionize{" "}
            <span className="text-emerald-500 dark:text-emerald-400">
              Your Patient Care?
            </span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            Join the healthcare innovation movement. Experience AI-powered
            personalized dosage optimization.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/get-started">
              <Button className="bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-6 py-3 rounded-lg text-lg">
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-emerald-300 dark:border-emerald-600 text-emerald-500 dark:text-emerald-400 px-6 py-3 rounded-lg text-lg"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}