"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, User, Pill, Info, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FadeIn, SlideIn } from "@/components/animations"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI dosage assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "Based on your medical history, I recommend a dosage of 10mg twice daily.",
        "Your current medication might interact with this drug. I suggest consulting your doctor before changing the dosage.",
        "For your condition, the typical dosage range is 5-15mg daily. Your specific dosage should be determined by your healthcare provider.",
        "The optimal dosage for your profile would be 20mg in the morning and 10mg in the evening.",
        "I've analyzed your recent lab results, and they suggest your current dosage is appropriate.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <FadeIn>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">AI Dosage Chatbot</h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Get instant answers to your medication dosage questions with our AI-powered assistant.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="px-8 rounded-full" onClick={() => document.getElementById("chat-input")?.focus()}>
                    Start Chatting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </FadeIn>
            <SlideIn direction="right">
              <Card className="ios-card overflow-hidden border-none">
                <CardHeader className="bg-primary/5 pb-2">
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Dosage Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                            >
                              <Avatar className="h-8 w-8 mt-1">
                                {message.sender === "bot" ? (
                                  <>
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                    <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
                                  </>
                                ) : (
                                  <>
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                  </>
                                )}
                              </Avatar>
                              <div
                                className={`rounded-2xl p-3 ${
                                  message.sender === "user" ? "bg-primary text-white" : "bg-secondary dark:bg-gray-800"
                                }`}
                              >
                                <p>{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="flex gap-2 max-w-[80%]">
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback className="bg-primary text-white">AI</AvatarFallback>
                              </Avatar>
                              <div className="rounded-2xl p-3 bg-secondary dark:bg-gray-800">
                                <div className="flex space-x-1">
                                  <div
                                    className="h-2 w-2 rounded-full bg-primary animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                  ></div>
                                  <div
                                    className="h-2 w-2 rounded-full bg-primary animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                  ></div>
                                  <div
                                    className="h-2 w-2 rounded-full bg-primary animate-bounce"
                                    style={{ animationDelay: "600ms" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSend} className="p-2 border-t flex gap-2">
                      <Input
                        id="chat-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about medication dosage..."
                        className="rounded-full"
                      />
                      <Button type="submit" size="icon" className="rounded-full">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Our AI chatbot uses reinforcement learning to provide personalized dosage recommendations
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <SlideIn>
              <Card className="ios-card border-none">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 rounded-full bg-primary/10 mb-2">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Patient Data Analysis</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      The chatbot analyzes your medical history, current medications, and health status
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
            <SlideIn delay={0.1}>
              <Card className="ios-card border-none">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 rounded-full bg-primary/10 mb-2">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Medication Optimization</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Using reinforcement learning to determine the optimal dosage for your specific needs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
            <SlideIn delay={0.2}>
              <Card className="ios-card border-none">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 rounded-full bg-primary/10 mb-2">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Personalized Recommendations</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive tailored dosage suggestions with explanations and potential side effects
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  )
}

