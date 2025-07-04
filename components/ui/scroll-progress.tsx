import { motion, useScroll } from 'motion/react'

interface ScrollProgressProps {
  className?: string
}

export default function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left ${className}`}
      style={{ scaleX: scrollYProgress }}
    />
  )
} 