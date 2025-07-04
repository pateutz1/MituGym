import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { MouseEvent } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  strength?: number
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  strength = 0.3 
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Spring physics for smooth movement
  const springX = useSpring(x, { stiffness: 200, damping: 10 })
  const springY = useSpring(y, { stiffness: 200, damping: 10 })
  
  // Transform values for rotation and scale
  const rotateX = useTransform(springY, [-50, 50], [10, -10])
  const rotateY = useTransform(springX, [-50, 50], [-10, 10])
  const scale = useTransform(springX, [-50, 50], [0.95, 1.05])

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength
    
    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      className={`relative overflow-hidden bg-primary text-white font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-primary/90 ${className}`}
      style={{
        translateX: springX,
        translateY: springY,
        rotateX,
        rotateY,
        scale,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
} 