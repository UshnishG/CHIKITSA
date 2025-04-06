"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const fadeInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 80 },
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
  initial: { scale: 0.95, opacity: 0.8 },
  animate: {
    scale: [0.95, 1.05, 0.95],
    opacity: [0.8, 1, 0.8],
    transition: {
      repeat: Infinity,
      duration: 2.5,
      ease: "easeInOut",
    },
  },
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({
      name: "",
      email: "",
      organization: "",
      message: "",
      subject: "",
    });

    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with Animated Particles */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-teal-300/10 dark:from-emerald-900/10 dark:to-teal-800/10 z-0"></div>
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-emerald-400 dark:bg-teal-600"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                x: [0, Math.random() * 30 - 15],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4 + Math.random() * 6,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto"
          >
            <motion.span
              variants={fadeIn}
              className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6"
            >
              Let's Connect
            </motion.span>
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400 mb-6"
            >
              Get In Touch With Us
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8"
            >
              Have questions about our AI-powered dosage optimization system?
              Our team is here to help you transform your healthcare practice.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#contact-form"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-medium shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 flex items-center justify-center"
              >
                <Send className="mr-2 h-4 w-4" /> Send a Message
              </a>
              <a
                href="#support"
                className="px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 font-medium shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1 flex items-center justify-center"
              >
                <Clock className="mr-2 h-4 w-4" /> Schedule a Demo
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Options Tab Section */}
      <section id="contact-form" className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10"
          >
            {/* Left column - Contact Methods */}
            <motion.div
              variants={fadeIn}
              className="lg:col-span-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  Reach Out To Us
                </h2>

                <div className="space-y-6 mb-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="flex p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/70 dark:bg-gray-800 hover:from-emerald-100 hover:to-teal-100/70 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="mr-4 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Email Us
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        info@devhouse.com
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                        We respond within 24 hours
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/70 dark:bg-gray-800 hover:from-emerald-100 hover:to-teal-100/70 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="mr-4 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Call Us
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                        Mon-Fri: 9am - 5pm PST
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/70 dark:bg-gray-800 hover:from-emerald-100 hover:to-teal-100/70 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="mr-4 h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-teal-200 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Visit Us
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        123 Innovation Way
                        <br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-700 dark:via-teal-600 dark:to-blue-700 rounded-2xl p-6 text-white shadow-xl"
              >
                <h3 className="font-bold text-lg mb-2">Join Our Newsletter</h3>
                <p className="text-emerald-100 mb-4">
                  Stay updated with the latest news on AI in healthcare and
                  product updates.
                </p>
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="rounded-l-full rounded-r-none border-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-800"
                  />
                  <Button className="rounded-l-none rounded-r-full bg-white hover:bg-gray-100 text-emerald-600">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Contact Form */}
            <motion.div variants={fadeInFromRight} className="lg:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    className={`py-4 px-6 font-medium text-sm flex-1 ${
                      activeTab === "general"
                        ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    General Inquiry
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm flex-1 ${
                      activeTab === "support"
                        ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    onClick={() => setActiveTab("support")}
                  >
                    Technical Support
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm flex-1 ${
                      activeTab === "demo"
                        ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                    onClick={() => setActiveTab("demo")}
                  >
                    Schedule Demo
                  </button>
                </div>

                <div className="p-8">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-lg border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-900/20 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-green-600 dark:text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-md">
                        Thank you for reaching out. Our team will get back to
                        you shortly.
                      </p>
                      <motion.div
                        initial="initial"
                        animate="animate"
                        variants={pulseAnimation}
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          This message will disappear automatically
                        </p>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                            className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label
                            htmlFor="organization"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Organization
                          </label>
                          <Input
                            id="organization"
                            name="organization"
                            value={formState.organization}
                            onChange={handleChange}
                            placeholder="Your company or organization"
                            className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="subject"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            required
                            placeholder="What's this regarding?"
                            className="rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          placeholder="Please provide details about your inquiry..."
                          className="min-h-[160px] rounded-lg border-gray-300 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="privacy"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-emerald-600 dark:text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="privacy"
                            className="text-gray-600 dark:text-gray-400"
                          >
                            I agree to the{" "}
                            <Link
                              href="/privacy"
                              className="text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                              privacy policy
                            </Link>{" "}
                            and consent to being contacted regarding my inquiry
                          </label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 hover:from-emerald-700 hover:via-teal-600 hover:to-blue-700 text-white font-medium transition-all transform hover:-translate-y-1 hover:shadow-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending Message...
                          </div>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-500">
              Visit Our Office
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Located in the heart of San Francisco's innovation district, our
              office is easily accessible and we welcome visitors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="aspect-[16/9] w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.040704936248!2d80.0421882!3d12.823082799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f712b57a4bc9%3A0xce4e8f4044d9e018!2sSRM%20Institute%20of%20Science%20and%20Technology%20(Formerly%20known%20as%20SRM%20University)!5e0!3m2!1sen!2sin!4v1711235433044!5m2!1sen!2sin"
              style={{ border: 0 }}
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* <section id="support" className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Find quick answers to common questions about our AI-powered dosage system
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-emerald-600 dark:text-emerald-400">How does your AI system maintain data privacy?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our system is designed with privacy at its core. All patient data is encrypted end-to-end, and we comply with HIPAA and other regional health data regulations. We use federated learning techniques that allow the AI to learn without exposing raw patient data.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-emerald-600 dark:text-emerald-400">What integration options are available?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our platform offers seamless integration with major EHR systems through secure APIs. We also provide custom integration solutions for healthcare providers with specific needs. Our team can work with your IT department to ensure a smooth implementation.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:bg-gray-800 rounded-xl p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold mb-2 text-emerald-600 dark:text-emerald-400">How long does implementation typically take?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Implementation timelines vary based on your existing infrastructure, but typically range from 4-8 weeks from initial setup to full deployment. Our dedicated implementation team works with you throughout the process to ensure minimal disruption to your workflow.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700 dark:from-emerald-800 dark:via-teal-700 dark:to-blue-800">
        <div className="container px-4 md:px-6 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Patient Care?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join healthcare providers already using our AI-powered dosage
              optimization system to deliver truly personalized medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                Schedule a Demo
              </Button>
              <Button className="px-8 py-3 rounded-full bg-transparent border border-white hover:bg-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
