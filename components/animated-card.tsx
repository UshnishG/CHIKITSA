"use client"

import type { ReactNode } from "react"
import { motion, type MotionProps } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  delay?: number
  onClick?: () => void
  hoverEffect?: "lift" | "scale" | "glow" | "none"
  animation?: "fade" | "slide" | "scale" | "none"
  motionProps?: MotionProps
}

export default function AnimatedCard({
  title,
  description,
  children,
  footer,
  className = "",
  delay = 0,
  onClick,
  hoverEffect = "lift",
  animation = "fade",
  motionProps,
}: AnimatedCardProps) {
  // Animation variants
  const animations = {
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay, ease: "easeOut" },
    },
    slide: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, delay, ease: "easeOut" },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, delay, ease: "easeOut" },
    },
    none: {},
  }

  // Hover effects
  const hoverEffects = {
    lift: { y: -5, transition: { duration: 0.2 } },
    scale: { scale: 1.02, transition: { duration: 0.2 } },
    glow: { boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)", transition: { duration: 0.2 } },
    none: {},
  }

  return (
    <motion.div
      {...animations[animation]}
      whileHover={hoverEffect !== "none" ? hoverEffects[hoverEffect] : undefined}
      className={cn("h-full", className)}
      onClick={onClick}
      {...motionProps}
    >
      <Card className="h-full border-none shadow-md bg-white dark:bg-gray-800">
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </motion.div>
  )
}

