"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Database,
  Server,
  Lock,
  Layers,
  Code,
  Activity,
  Shield,
  Zap,
  CloudLightning,
} from "lucide-react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

const featureCard = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function TechnologyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/20">
      {/* Hero Section with Parallax */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container px-4 md:px-6 mx-auto relative z-10"
        >
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent"
            >
              Our Technology
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-[800px] text-lg md:text-xl mt-4 text-teal-50"
            >
              The cutting-edge AI and infrastructure powering our personalized
              drug dosage platform
            </motion.p>
          </div>
        </motion.div>

        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <motion.div
            animate={{
              x: [0, 10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
            className="absolute top-[10%] left-[10%] w-40 h-40 rounded-full bg-white opacity-20"
          />
          <motion.div
            animate={{
              x: [0, -15, 0],
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
            className="absolute top-[40%] right-[15%] w-64 h-64 rounded-full bg-white opacity-10"
          />
        </div>
      </section>

      {/* Core Technology Overview */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50/70">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-4">
              Core Technologies
            </h2>
            <p className="text-slate-600 text-lg">
              Our platform combines advanced AI algorithms with robust
              infrastructure to deliver personalized medication dosage
              recommendations.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* AI */}
            <motion.div
              variants={featureCard}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-emerald-500"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 w-min mb-4">
                <Brain className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                AI & Machine Learning
              </h3>
              <p className="text-slate-600">
                Advanced reinforcement learning algorithms to optimize
                medication dosages in real-time.
              </p>
            </motion.div>

            {/* Backend */}
            <motion.div
              variants={featureCard}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-emerald-500"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 w-min mb-4">
                <Server className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Backend Infrastructure
              </h3>
              <p className="text-slate-600">
                Robust FastAPI and GraphQL services ensuring reliable and
                scalable performance.
              </p>
            </motion.div>

            {/* Frontend */}
            <motion.div
              variants={featureCard}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-emerald-500"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 w-min mb-4">
                <Code className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Frontend Experience
              </h3>
              <p className="text-slate-600">
                Intuitive Next.js interfaces designed for healthcare
                professionals and patients.
              </p>
            </motion.div>

            {/* Security */}
            <motion.div
              variants={featureCard}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-emerald-500"
            >
              <div className="p-3 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 w-min mb-4">
                <Lock className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Security & Compliance
              </h3>
              <p className="text-slate-600">
                HIPAA-compliant systems with end-to-end encryption for patient
                data protection.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI & ML Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600/5 to-teal-300/10">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="grid gap-12 lg:grid-cols-2 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-teal-200 text-emerald-600 font-medium text-sm mb-2">
                  AI & Machine Learning
                </div>
                <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Intelligent Dosage Optimization
                </h2>
                <p className="text-slate-600 text-lg">
                  Our platform leverages advanced reinforcement learning
                  algorithms to optimize medication dosages based on individual
                  patient data.
                </p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6 mt-6"
                >
                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Activity className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        Reinforcement Learning
                      </h3>
                      <p className="text-slate-600">
                        Our PPO and Q-learning algorithms continuously learn
                        from patient responses to optimize dosage
                        recommendations over time.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Layers className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        Neural Networks
                      </h3>
                      <p className="text-slate-600">
                        Deep neural networks process complex patient data to
                        identify patterns and predict optimal dosage
                        adjustments.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Zap className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        TensorFlow & PyTorch
                      </h3>
                      <p className="text-slate-600">
                        Industry-standard frameworks power our models, enabling
                        fast development and deployment of machine learning
                        solutions.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="AI and machine learning visualization"
                  width={600}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Backend Infrastructure */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50/70">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="grid gap-12 lg:grid-cols-2 items-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Backend infrastructure visualization"
                  width={600}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-teal-400/20 to-transparent"></div>
              </div>
            </motion.div>

            <div>
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-600 font-medium text-sm mb-2">
                  Backend Infrastructure
                </div>
                <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                  Scalable & Robust Architecture
                </h2>
                <p className="text-slate-600 text-lg">
                  Our backend infrastructure ensures reliable, secure, and
                  scalable performance for healthcare environments.
                </p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6 mt-6"
                >
                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Server className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        FastAPI Backend
                      </h3>
                      <p className="text-slate-600">
                        High-performance API built with FastAPI, providing fast
                        response times and automatic documentation.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Database className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        Firestore Database
                      </h3>
                      <p className="text-slate-600">
                        Real-time data synchronization ensuring that healthcare
                        providers always have access to the latest patient
                        information.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Code className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        GraphQL API
                      </h3>
                      <p className="text-slate-600">
                        Flexible, efficient data retrieval tailored to specific
                        clinical needs using Strawberry GraphQL.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Frontend Experience */}
      <section className="py-20 bg-gradient-to-r from-emerald-600/5 to-teal-300/10">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="grid gap-12 lg:grid-cols-2 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-600 font-medium text-sm mb-2">
                  Frontend Experience
                </div>
                <h2 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
                  Intuitive User Interfaces
                </h2>
                <p className="text-slate-600 text-lg">
                  Our intuitive interfaces are designed for healthcare
                  professionals and patients with clarity and usability in mind.
                </p>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-6 mt-6"
                >
                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Code className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        Next.js & React
                      </h3>
                      <p className="text-slate-600">
                        Fast, responsive interfaces built with Next.js and React
                        that work seamlessly across devices and screen sizes.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Activity className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        Real-time Updates
                      </h3>
                      <p className="text-slate-600">
                        Live data visualization and alerts keep healthcare
                        providers informed of important changes in patient
                        status.
                      </p>
                    </div>
                  </motion.div>

                  <motion.div variants={featureCard} className="flex space-x-4">
                    <div className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 h-min">
                      <Layers className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-700">
                        Accessibility Focused
                      </h3>
                      <p className="text-slate-600">
                        Our interfaces are designed with accessibility in mind,
                        ensuring they can be used by everyone in healthcare
                        settings.
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 mx-auto"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Frontend interface visualization"
                  width={600}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-400/20 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-teal-200 text-emerald-600 font-medium text-sm mb-4">
              Security & Compliance
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 bg-clip-text text-transparent">
              Protecting Patient Data
            </h2>
            <p className="text-slate-500 text-lg">
              We prioritize the security and privacy of patient data with
              industry-leading practices
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={featureCard}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-lg p-8 text-center border border-emerald-100"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 mb-6">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                HIPAA Compliance
              </h3>
              <p className="text-slate-500">
                Our platform adheres to all HIPAA regulations for handling
                protected health information with strict access controls.
              </p>
            </motion.div>

            <motion.div
              variants={featureCard}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-lg p-8 text-center border border-emerald-100"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 mb-6">
                <Lock className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                End-to-End Encryption
              </h3>
              <p className="text-slate-500">
                All data is encrypted in transit and at rest using
                industry-standard protocols and AES-256 encryption.
              </p>
            </motion.div>

            <motion.div
              variants={featureCard}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-lg p-8 text-center border border-emerald-100"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 mb-6">
                <Server className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                Regular Audits
              </h3>
              <p className="text-slate-500">
                We conduct regular security audits and penetration testing to
                ensure data protection and vulnerability assessment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Future Technology Roadmap */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50/70">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-100 to-emerald-200 text-teal-600 font-medium text-sm mb-4">
              Future Technologies
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Technology Roadmap
            </h2>
            <p className="text-slate-500 text-lg">
              Our ongoing development focuses on these cutting-edge technologies
              to continually improve patient care
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={featureCard}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100"
            >
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-6 w-6 text-teal-500" />
                  <h3 className="text-xl font-bold text-blue-700">
                    Hugging Face NLP
                  </h3>
                </div>
                <p className="text-slate-500">
                  Integrating natural language processing to extract insights
                  from clinical notes and patient feedback for better treatment
                  context.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={featureCard}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100"
            >
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-6 w-6 text-teal-500" />
                  <h3 className="text-xl font-bold text-blue-700">AutoML</h3>
                </div>
                <p className="text-slate-500">
                  Implementing AutoML to continuously improve and evolve our AI
                  models across diverse patient populations and medical
                  scenarios.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={featureCard}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-100"
            >
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <CloudLightning className="h-6 w-6 text-teal-500" />
                  <h3 className="text-xl font-bold text-blue-700">
                    Blockchain
                  </h3>
                </div>
                <p className="text-slate-500">
                  Exploring blockchain technology for secure, decentralized
                  patient data management and enhanced privacy with immutable
                  records.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 text-white relative overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Our Technology?
            </h2>
            <p className="text-lg text-teal-50 mb-8">
              Learn more about how our platform can integrate with your existing
              systems and improve patient outcomes
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/contact">
                <button className="px-8 py-3 bg-white text-emerald-600 rounded-full font-medium shadow-lg hover:shadow-xl transition-all flex items-center mx-auto">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <motion.div
            animate={{
              x: [0, 10, 0],
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "easeInOut",
            }}
            className="absolute bottom-[10%] left-[10%] w-40 h-40 rounded-full bg-white opacity-20"
          />
          <motion.div
            animate={{
              x: [0, -15, 0],
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: "easeInOut",
            }}
            className="absolute bottom-[40%] right-[15%] w-64 h-64 rounded-full bg-white opacity-10"
          />
        </div>
      </section>
    </div>
  );
}
