"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Brain,
  Activity,
  Shield,
  Database,
  ChevronRight,
  Users,
  Droplet,
  LineChart,
  PieChart,
  Microscope,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className: string;
}

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
}

// Letter animation component
const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.04,
            ease: "easeOut",
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Fade in animation for sections
const FadeInSection = ({ children, delay = 0, threshold = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold } as any);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const [isClient, setIsClient] = useState(false);

  // Initialize isClient to true after component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Elements for parallax effect
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Background element animations
  const bgElement1Y = useTransform(scrollY, [0, 500], [0, 150]);
  const bgElement2Y = useTransform(scrollY, [0, 500], [0, -200]);

  // Step 1: Generate random offset ranges once (these are just numbers, not hooks)
  const backgroundOffsets = useMemo(() => {
    return [...Array(15)].map(() => Math.random() * 200 - 100);
  }, []); // ← No dependency on scrollY

  // Step 2: Create transforms at top level (valid Hook usage)
  const backgroundTransforms = backgroundOffsets.map((offset) =>
    useTransform(scrollY, [0, 500], [0, offset])
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Dynamic Parallax Effect */}
      <motion.section
        className="relative h-screen flex items-center overflow-hidden bg-gradient-to-b from-primary/5 to-white dark:from-gray-900 dark:to-gray-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="hero"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute rounded-full bg-primary/10 w-96 h-96 top-1/4 -left-48 blur-3xl"
            style={{ y: bgElement1Y }}
          />
          <motion.div
            className="absolute rounded-full bg-blue-400/10 w-96 h-96 bottom-1/4 -right-48 blur-3xl"
            style={{ y: bgElement2Y }}
          />

          {/* Animated pills/molecules background */}
          {isClient &&
            [...Array(15)].map((_, i) => {
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
                  initial={{
                    width: `${Math.random() * 8 + 2}rem`,
                    height: `${Math.random() * 8 + 2}rem`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  style={{ y: backgroundTransforms[i] }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              );
            })}
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            <motion.div
              className="flex flex-col justify-center space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 mb-2 w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Next-Gen Healthcare Technology
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary dark:text-white space-y-2">
                <AnimatedText text="Precision Medicine." className="block" />
                <AnimatedText text="Perfect Dosage." className="block" />
                <motion.span
                  className="text-2xl md:text-3xl font-normal text-gray-600 dark:text-gray-400 mt-4 block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  AI-powered personalized medication management
                </motion.span>
              </h1>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              >
                <Link href="/dosage-ai">
                  <Button className="rounded-lg text-base px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
                    Try Dosage AI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="rounded-lg text-base px-8 py-6 border-2 hover:bg-secondary/10 transition-all"
                  >
                    Book a Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center mt-8 space-x-4 text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.1 }}
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900 flex items-center justify-center font-medium text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 2.1 + i * 0.1 }}
                    >
                      {["M", "J", "A", "S"][i]}
                    </motion.div>
                  ))}
                </div>
                <span>Trusted by 500+ medical professionals</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative p-4 lg:p-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <motion.div
                className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400" />

                <div className="p-8">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Brain className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-lg">
                          DosageAI Dashboard
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Patient: John D.
                        </p>
                      </div>
                    </div>
                    <motion.div
                      className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Optimized
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          label: "Current Dose",
                          value: "125",
                          unit: "mg",
                          color: "text-primary",
                        },
                        {
                          label: "Recommended",
                          value: "140",
                          unit: "mg",
                          color: "text-green-600",
                        },
                        {
                          label: "Efficacy",
                          value: "87",
                          unit: "%",
                          color: "text-blue-600",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.8 + index * 0.1,
                          }}
                        >
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {item.label}
                          </div>
                          <div
                            className={`text-2xl font-bold ${item.color} flex items-baseline`}
                          >
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                duration: 0.8,
                                delay: 1.2 + index * 0.1,
                              }}
                            >
                              {item.value}
                            </motion.span>
                            <span className="text-sm ml-1 font-normal text-gray-500">
                              {item.unit}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl h-40 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                    >
                      <div className="w-full h-32 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          [Interactive Dosage Response Chart]
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                      >
                        Patient History
                      </Button>
                      <Button size="sm" className="rounded-lg">
                        Apply Recommendation
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={() => scrollToSection("value-proposition")}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Scroll to explore
          </span>
          <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400 transform rotate-90" />
        </motion.div>
      </motion.section>

      {/* Value Proposition */}
      <section
        id="value-proposition"
        className="py-20 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50" />

        <div className="container px-4 md:px-6 relative z-10">
          <FadeInSection>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Problem We're Solving
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                One-size-fits-all dosing{" "}
                <span className="text-primary">doesn't work</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Traditional medication dosing fails to account for individual
                variability, leading to ineffective treatments and unnecessary
                side effects.
              </motion.p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Droplet className="h-6 w-6 text-red-600 dark:text-red-400" />
                ),
                title: "Imprecise Dosing",
                description:
                  "Standard dosages ignore genetic variations, metabolism differences, and other patient-specific factors",
                color: "red",
              },
              {
                icon: (
                  <Activity className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                ),
                title: "Unpredictable Responses",
                description:
                  "Standard dosages ignore genetic variations, metabolism differences, and other patient-specific factors",
                color: "yellow",
              },
              {
                icon: (
                  <LineChart className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                ),
                title: "Poor Outcomes",
                description:
                  "Standard dosages ignore genetic variations, metabolism differences, and other patient-specific factors",
                color: "red",
              },
            ].map((item, i) => (
              <FadeInSection key={i} delay={0.1 * i}>
                <motion.div
                  className={`relative p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden group`}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-${item.color}-500`}
                  />
                  <motion.div
                    className={`p-4 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/20 mb-6 w-fit`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="order-2 lg:order-1">
                <motion.div
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Our Solution
                </motion.div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  AI-Powered{" "}
                  <span className="text-primary">Precision Dosing</span>
                </motion.h2>
                <motion.p
                  className="text-lg text-gray-600 dark:text-gray-400 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Our platform combines machine learning with continuous
                  feedback to optimize medication dosages for each individual
                  patient in real-time.
                </motion.p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Personalized Recommendations",
                      description:
                        "Tailored dosing based on patient genetics, medical history, and real-time biomarkers",
                    },
                    {
                      title: "Adaptive Learning",
                      description:
                        "Our AI continuously improves as it learns from patient responses and outcomes",
                    },
                    {
                      title: "Clinical Decision Support",
                      description:
                        "Gives healthcare providers actionable insights while maintaining human oversight",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <motion.div
                        className="shrink-0 mt-1 mr-4 bg-primary/10 p-1 rounded-full"
                        whileHover={{
                          scale: 1.2,
                          backgroundColor: "rgba(var(--primary), 0.2)",
                        }}
                      >
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link href="/how-it-works">
                    <Button
                      variant="link"
                      className="text-primary p-0 flex items-center"
                    >
                      Learn how it works
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="order-1 lg:order-2 relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-3xl blur-2xl opacity-70"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 p-1"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <div className="h-96 flex items-center justify-center">
                      <Image
                        src="/3.jpg"
                        alt="AI Dosage Optimization Visualization"
                        width={400} // adjust as needed
                        height={400} // adjust as needed
                        className="object-contain rounded-xl"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-gray-950 dark:to-transparent" />

        <div className="container px-4 md:px-6 relative z-10">
          <FadeInSection>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Powerful Features
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Built for modern{" "}
                <span className="text-primary">healthcare</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Our comprehensive platform integrates seamlessly into clinical
                workflows to enhance patient care and treatment outcomes
              </motion.p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Brain className="h-6 w-6 text-primary" />,
                title: "AI Chatbot Assistant",
                description:
                  "Get instant answers to complex dosing questions with our AI-powered clinical assistant",
              },
              {
                icon: <Microscope className="h-6 w-6 text-primary" />,
                title: "Deep Learning Models",
                description:
                  "Advanced algorithms trained on diverse patient populations for accurate predictions",
              },
              {
                icon: <PieChart className="h-6 w-6 text-primary" />,
                title: "Outcome Analytics",
                description:
                  "Visualize treatment efficacy with detailed dashboards and metrics",
              },
              {
                icon: <Database className="h-6 w-6 text-primary" />,
                title: "Comprehensive Drug Database",
                description:
                  "Up-to-date information on thousands of medications and their interactions",
              },
              {
                icon: <Users className="h-6 w-6 text-primary" />,
                title: "Collaborative Care",
                description:
                  "Seamlessly share insights between physicians, pharmacists, and specialists",
              },
              {
                icon: <Shield className="h-6 w-6 text-primary" />,
                title: "HIPAA Compliant Security",
                description:
                  "Enterprise-grade encryption and privacy controls to protect patient data",
              },
            ].map((feature, i) => (
              <FadeInSection key={i} delay={0.05 * i}>
                <motion.div
                  className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20"
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/features">
                <Button className="rounded-lg text-base px-8 py-6">
                  Explore All Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f0f9ff,transparent)]" />

        <div className="container px-4 md:px-6 relative z-10">
          <FadeInSection>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Success Stories
              </motion.div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Trusted by leading{" "}
                <span className="text-primary">healthcare providers</span>
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                See how our platform is transforming patient care and improving
                outcomes across different specialties
              </motion.p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "DosageAI helped us reduce adverse events by 27% in our oncology department by optimizing chemotherapy protocols for each patient.",
                author: "Dr. Sarah Chen",
                role: "Chief of Oncology, Memorial Hospital",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "The precision dosing recommendations have been game-changing for our patients with complex chronic conditions. Treatment adherence is up and side effects are down.",
                author: "Dr. James Wilson",
                role: "Internal Medicine Specialist",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "As a pharmacist, I appreciate how the platform helps me collaborate with physicians to find the optimal medication regimen for each unique patient.",
                author: "Lisa Rodriguez, PharmD",
                role: "Clinical Pharmacist",
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, i) => (
              <FadeInSection key={i} delay={0.1 * i}>
                <motion.div
                  className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 h-full flex flex-col"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6 flex-grow">
                    <motion.div
                      className="text-yellow-400 flex mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </motion.svg>
                      ))}
                    </motion.div>
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.4}>
            <div className="mt-16 text-center">
              <Link href="/case-studies">
                <Button
                  variant="outline"
                  className="rounded-lg text-base px-8 py-6 border-2"
                >
                  View Case Studies
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)]" />

        <div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="container px-4 md:px-6 relative z-10">
          <FadeInSection threshold={0.2}>
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-8 md:p-12">
                  <div className="text-center mb-10">
                    <motion.h2
                      className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      Are You Ready to Lead Healthcare’s AI Revolution?
                    </motion.h2>
                    <motion.p
                      className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      Join leading healthcare providers in delivering
                      personalized medicine with AI-powered precision.
                    </motion.p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      {[
                        {
                          text: "<span className='font-medium'>Free implementation</span> for qualifying healthcare facilities",
                        },
                        {
                          text: "<span className='font-medium'>Dedicated support team</span> to ensure seamless integration",
                        },
                        {
                          text: "<span className='font-medium'>Customizable platform</span> that adapts to your workflow",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        >
                          <div className="shrink-0 mt-1 mr-4 bg-green-100 p-1 rounded-full">
                            <svg
                              className="h-4 w-4 text-green-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p
                            className="text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: item.text }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <Link href="/demo">
                          <Button className="w-full rounded-lg text-base py-6 shadow-lg bg-primary hover:bg-primary/90">
                            Request Demo
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button
                            variant="outline"
                            className="w-full rounded-lg text-base py-6 border-2 text-primary border-primary hover:bg-primary/10 transition-all"
                          >
                            Contact Sales
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.p
                        className="text-sm text-gray-500 dark:text-gray-400 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        We'll get back to you within 1 business day.
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
