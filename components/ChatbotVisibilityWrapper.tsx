"use client"

import { usePathname } from "next/navigation"
import ChatbotWidget from "@/components/ChatbotWidget"

export default function ChatbotVisibilityWrapper() {
  const pathname = usePathname()
  const hideOnPaths = ["/login", "/signup"]

  const shouldHide = hideOnPaths.includes(pathname)

  return !shouldHide ? <ChatbotWidget /> : null
}
