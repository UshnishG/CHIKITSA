"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Brain, Syringe, HeartPulse, Users } from "lucide-react";

// Animation variants
const fadeIn = {
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

const fromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const fromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Subtle Pattern Background */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-300/10 dark:from-emerald-900/20 dark:to-blue-900/20 z-0"></div>
          {/* Refined SVG pattern overlay */}
          <svg
            className="absolute w-full h-full opacity-10 dark:opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 12 0 L 0 0 0 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <motion.div
            className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400"
            >
              Redefining Medication Management
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="max-w-[800px] text-xl md:text-2xl text-slate-600 dark:text-slate-300"
            >
              Our AI-powered system delivers truly personalized dosage
              optimization to improve patient outcomes
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4 mt-4"
            >
              <Link href="/product">
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center">
                  Explore Product <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-3 rounded-full bg-white dark:bg-gray-800 text-emerald-600 dark:text-teal-400 font-medium border border-emerald-200 dark:border-teal-800 hover:border-emerald-400 dark:hover:border-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Mission Cards */}
      <motion.section
        ref={missionRef}
        initial="hidden"
        animate={missionInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full py-20 bg-white dark:bg-gray-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-3">
              Our Purpose
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Our Mission
            </h2>
            <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-300 text-lg">
              To transform healthcare by delivering personalized medication
              dosages that maximize efficacy while minimizing side effects for
              every patient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-2 border border-emerald-100 dark:border-gray-700"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800/60 dark:to-teal-900/60 rounded-full text-emerald-600 dark:text-emerald-300 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all">
                  <Brain size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-emerald-700 dark:text-emerald-300">
                AI-Powered
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Leveraging reinforcement learning to optimize medication dosages
                in real-time
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-2 border border-emerald-100 dark:border-gray-700"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800/60 dark:to-teal-900/60 rounded-full text-emerald-600 dark:text-emerald-300 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all">
                  <Syringe size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-emerald-700 dark:text-emerald-300">
                Personalized
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Tailoring treatments to individual patient data and biological
                responses
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-2 border border-emerald-100 dark:border-gray-700"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800/60 dark:to-teal-900/60 rounded-full text-emerald-600 dark:text-emerald-300 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all">
                  <HeartPulse size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-emerald-700 dark:text-emerald-300">
                Effective
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Improving treatment outcomes while reducing adverse side effects
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all group hover:-translate-y-2 border border-emerald-100 dark:border-gray-700"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800/60 dark:to-teal-900/60 rounded-full text-emerald-600 dark:text-emerald-300 group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all">
                  <Users size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center text-emerald-700 dark:text-emerald-300">
                Human-Centered
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-center">
                Supporting doctors with data-driven insights while keeping them
                in control
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Story - Timeline */}
      <motion.section
        ref={storyRef}
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full py-20 bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:from-gray-800 dark:to-gray-800/95"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-sm font-medium mb-3">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300">
              Our Story
            </h2>
            <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-300 text-lg">
              From identifying a critical gap in healthcare to building a
              revolutionary AI solution
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-300 to-emerald-400 dark:from-teal-700 dark:to-emerald-600 rounded-full"></div>

            <div className="flex flex-col space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <motion.div
                  variants={fromLeft}
                  className="md:w-5/12 mb-8 md:mb-0 md:text-right"
                >
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-teal-900/30">
                    <h3 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">
                      The Realization
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      As curious students passionate about tech and medicine, we
                      identified a major gap: standard medication routines
                      ignore patient individuality. This causes unnecessary side
                      effects or poor results — and no one was solving it
                      accessibly.
                    </p>
                  </div>
                </motion.div>

                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-500 z-10 shadow-md">
                  <span className="text-white font-bold">1</span>
                </div>

                <div className="md:w-5/12"></div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-5/12"></div>

                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-500 z-10 shadow-md">
                  <span className="text-white font-bold">2</span>
                </div>

                <motion.div
                  variants={fromRight}
                  className="md:w-5/12 mt-8 md:mt-0"
                >
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-teal-900/30">
                    <h3 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">
                      The Challenge
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Even in the age of AI, most systems don’t adapt to a
                      patient’s specific data — like prescriptions, scanned
                      medical documents, or personal context. We wanted to build
                      something that could read, understand, and respond
                      intelligently — in real-time.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center">
                <motion.div
                  variants={fromLeft}
                  className="md:w-5/12 mb-8 md:mb-0 md:text-right"
                >
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-teal-900/30">
                    <h3 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">
                      The Hackathon & Our Idea
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      At DevHouse, a GDG-powered student hackathon, we took this
                      idea from spark to solution. We’re building a medical
                      assistant powered by Mistral LLM (via Ollama), TF-IDF for
                      smart retrieval, and PyTesseract for scanning medical
                      documents — so it can offer fast, relevant, and
                      context-aware dosage support.
                    </p>
                  </div>
                </motion.div>

                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-500 z-10 shadow-md">
                  <span className="text-white font-bold">3</span>
                </div>

                <div className="md:w-5/12"></div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-5/12"></div>

                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-500 z-10 shadow-md">
                  <span className="text-white font-bold">4</span>
                </div>

                <motion.div
                  variants={fromRight}
                  className="md:w-5/12 mt-8 md:mt-0"
                >
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-teal-100 dark:border-teal-900/30">
                    <h3 className="text-xl font-bold mb-2 text-teal-600 dark:text-teal-400">
                      What We're Building
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Our intelligent chatbot, backed by Flask and integrated
                      with real-time document extraction and contextual chat,
                      helps users get smart, safe, and personalized medication
                      guidance — even before visiting a clinic.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        ref={teamRef}
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="w-full py-24 bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div variants={fadeIn} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-3">
              Meet Our Experts
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Leadership Team
            </h2>
            <p className="max-w-3xl mx-auto text-slate-600 dark:text-slate-300 text-lg">
              Meet the visionaries behind DevHouse's innovative approach to
              personalized medicine and healthcare technology solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <motion.div
              variants={fadeIn}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 p-1.5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden h-full">
                  <div className="h-64 overflow-hidden">
                    <Image
                      src="/shubham.jpeg"
                      alt="Dr. Jane Smith"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                      Shubham Bhandari
                    </h3>
                    <p className="text-teal-600 dark:text-teal-400 mb-3 font-medium">
                      Full-Stack Developer
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {/* Former hospital director with 15+ years of experience in
                      clinical medicine and healthcare innovation. */}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              variants={fadeIn}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 p-1.5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden h-full">
                  <div className="h-64 overflow-hidden">
                    <Image
                      src="ushnish.jpg"
                      alt="Alex Johnson"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                      Ushnish Goshal
                    </h3>
                    <p className="text-teal-600 dark:text-teal-400 mb-3 font-medium">
                      Backend Dev
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {/* AI researcher with expertise in reinforcement learning and
                      healthcare applications of machine learning. */}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              variants={fadeIn}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 p-1.5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden h-full">
                  <div className="h-64 overflow-hidden">
                    <Image
                      src="/mal.jpeg"
                      alt="Alex Johnson"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                      Arnab Kr. Mal
                    </h3>
                    <p className="text-teal-600 dark:text-teal-400 mb-3 font-medium">
                      UI/UX Designer
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {/* AI researcher with expertise in reinforcement learning and
                      healthcare applications of machine learning. */}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Team Member 4 (Added) */}
            <motion.div
              variants={fadeIn}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-gray-800 dark:to-gray-700 p-1.5 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden h-full">
                  <div className="h-64 overflow-hidden">
                    <Image
                      src="/arnab.jpg"
                      alt="Dr. Sarah Williams"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                      Arnab Ghosh
                    </h3>
                    <p className="text-teal-600 dark:text-teal-400 mb-3 font-medium">
                      ML Engineer
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {/* Healthcare consultant with expertise in digital health
                      solutions and patient-centered product development. */}
                    </p>
                    <div className="mt-4 flex space-x-3">
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="text-slate-500 hover:text-emerald-500 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional decorative element */}
          <motion.div variants={fadeIn} className="mt-16 text-center">
            <span className="inline-block h-1 w-20 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></span>
            <p className="mt-6 text-slate-500 dark:text-slate-400 italic">
              "Innovation in healthcare requires both technical expertise and
              deep clinical understanding."
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        ref={ctaRef}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={fadeIn}
        className="w-full py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 dark:from-emerald-800 dark:via-teal-800 dark:to-blue-900"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="lg:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Mission to Transform Healthcare
              </h2>
              <p className="text-emerald-50 text-lg max-w-2xl">
                We're looking for passionate individuals to help us
                revolutionize medication management and improve patient
                outcomes. Join our team of innovators dedicated to personalized
                healthcare.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/careers">
                <button className="px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-emerald-600 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  View Careers
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 rounded-full bg-transparent hover:bg-emerald-700/30 text-white border border-white/80 hover:border-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
