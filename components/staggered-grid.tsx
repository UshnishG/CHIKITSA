"use client"

import React from "react"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StaggeredGridProps {
  children: ReactNode
  className?: string
  itemClassName?: string
  columns?: number
  staggerDelay?: number
}

export function StaggeredGrid({
  children,
  className,
  itemClassName,
  columns = 3,
  staggerDelay = 0.05,
}: StaggeredGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Convert children to array to map over them
  const childrenArray = React.Children.toArray(children)

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4`, className)}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={item} className={itemClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

