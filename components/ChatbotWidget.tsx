"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Bot, MessageCircle, X, ArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
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
  const [showScrollButton, setShowScrollButton] = useState(false)
  
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle sending a message
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    fetch("http://localhost:5005/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    })
      .then(res => res.json())
      .then(data => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: data.reply || "Sorry, I couldn’t understand that.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      })
      .catch((err) => {
        const botMessage: Message = {
          id: Date.now().toString(),
          content: "Error connecting to medical assistant server.",
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      })    
  }

  // Detect scroll position to show/hide scroll-to-bottom button
  const handleScroll = () => {
    if (!messagesContainerRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
    
    setShowScrollButton(!isNearBottom)
  }

  // Scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (!isTyping) {
      scrollToBottom()
    }
  }, [messages, isTyping])

  // Add scroll event listener
  useEffect(() => {
    const messagesContainer = messagesContainerRef.current
    if (messagesContainer) {
      messagesContainer.addEventListener("scroll", handleScroll)
      return () => messagesContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-[380px] max-h-[85vh] h-[600px] sm:h-[600px] rounded-md sm:rounded-2xl shadow-2xl overflow-hidden bg-background border"
          >
            <Card className="border-none h-full flex flex-col">
              {/* Header */}
              <CardHeader className="bg-primary/10 py-3 px-4 flex-row flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-primary">
                  <Bot className="w-5 h-5" />
                  Dosage Assistant
                </CardTitle>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setOpen(false)} 
                  className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
                {/* Chat messages container with improved scrolling */}
                <div 
                  ref={messagesContainerRef} 
                  className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin"
                  onScroll={handleScroll}
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[85%] ${
                          msg.sender === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <Avatar className={`h-8 w-8 border ${msg.sender === "bot" ? "bg-primary/10" : "bg-primary/20"}`}>
                          <AvatarFallback className={msg.sender === "user" ? "bg-primary/20" : "bg-primary/10"}>
                            {msg.sender === "user" ? "U" : "AI"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary dark:bg-gray-800"
                          } shadow-sm`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70 text-right">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 items-start">
                        <Avatar className="h-8 w-8 border bg-primary/10">
                          <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-2xl px-4 py-3 bg-secondary dark:bg-gray-800 shadow-sm">
                          <div className="flex space-x-2 items-center h-5">
                            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" />
                            <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-150" />
                            <div className="h-2 w-2 bg-primary rounded-full animate-bounce delay-300" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-px" />
                </div>

                {/* Scroll to bottom button */}
                <AnimatePresence>
                  {showScrollButton && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute bottom-20 right-4"
                    >
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={scrollToBottom}
                        className="h-9 w-9 rounded-full shadow-md"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input area */}
                <div className="p-3 border-t bg-background/80 backdrop-blur-sm">
                  <form onSubmit={handleSend} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="rounded-full text-sm py-6 px-4 border-muted shadow-sm focus-visible:ring-primary"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="rounded-full h-12 w-12 shadow-sm"
                      disabled={!input.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button to open chatbot */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  )
}