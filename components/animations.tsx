"use client"

import { motion } from "framer-motion"

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const slideIn = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const SlideIn = ({ children, direction = "right", delay = 0, className = "" }) => {
  const directionVariants = {
    left: { x: -60 },
    right: { x: 60 },
    up: { y: 60 },
    down: { y: -60 },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { ...directionVariants[direction], opacity: 0 },
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, delay, ease: "easeOut" },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const ScaleIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.6, delay, ease: "easeOut" },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
)

export const StaggerChildren = ({ children, className = "" }) => (
  <motion.div initial="hidden" animate="visible" variants={staggerContainer} className={className}>
    {children}
  </motion.div>
)

export const StaggerItem = ({ children, className = "" }) => (
  <motion.div variants={fadeIn} className={className}>
    {children}
  </motion.div>
)

