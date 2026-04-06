'use client'

import { motion } from "motion/react"

type FloatingSurfaceProps = {
  children: React.ReactNode
  className?: string
  surfaceClassName?: string
  initial?: Record<string, unknown>
  animate?: Record<string, unknown>
  transition?: Record<string, unknown>
}

export default function FloatingSurface({
  children,
  className = "",
  surfaceClassName = "",
  initial,
  animate,
  transition,
}: FloatingSurfaceProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <div
        className={`rounded-[28px] border border-gray-300 bg-gray-50/80 shadow-xl backdrop-blur w-fit ${surfaceClassName}`}
      >
        {children}
      </div>
    </motion.div>
  )
}
