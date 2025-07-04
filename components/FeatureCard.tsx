'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import AnimatedBorderTrail from './ui/animated-border-trail'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  animatedBorder?: boolean
  borderVariant?: 'continuous' | 'pulse' | 'chase' | 'glow'
  borderColor?: string
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  delay = 0, 
  animatedBorder = false,
  borderVariant = 'continuous',
  borderColor = 'rgb(34, 197, 94)'
}: FeatureCardProps) => {
  const cardContent = (
    <motion.div
      className="group relative bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-surface/70 transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-primary text-2xl">
            {icon}
          </div>
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/70 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>

        {/* Decorative element */}
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-50"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  )

  return animatedBorder ? (
    <AnimatedBorderTrail
      variant={borderVariant}
      trailColor={borderColor}
      animationDuration={4 + delay}
      borderWidth={1}
      borderRadius="0.75rem"
      trailOpacity={0.4}
      glowIntensity={6}
      className="h-full"
    >
      {cardContent}
    </AnimatedBorderTrail>
  ) : (
    cardContent
  )
}

export default FeatureCard 