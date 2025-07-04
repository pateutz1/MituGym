import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface ProgressRingProps {
  value: number // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl'
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showLabel?: boolean
  label?: string
  suffix?: string
  duration?: number
  delay?: number
  className?: string
  children?: React.ReactNode
  gradient?: boolean
  glowEffect?: boolean
  animated?: boolean
}

const sizeConfig = {
  sm: { radius: 40, text: 'text-base', container: 'w-20 h-20' },
  md: { radius: 60, text: 'text-lg', container: 'w-32 h-32' },
  lg: { radius: 80, text: 'text-xl', container: 'w-40 h-40' },
  xl: { radius: 100, text: 'text-2xl', container: 'w-52 h-52' }
}

export default function ProgressRing({
  value,
  size = 'md',
  strokeWidth = 8,
  color = '#1e9b71',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  showLabel = true,
  label,
  suffix = '%',
  duration = 2000,
  delay = 0,
  className = '',
  children,
  gradient = false,
  glowEffect = false,
  animated = true
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [animatedValue, setAnimatedValue] = useState(0)
  
  const config = sizeConfig[size]
  const normalizedRadius = config.radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const progress = animated ? animatedValue : value
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  // Animate the value when in view
  useEffect(() => {
    if (isInView && animated) {
      const timer = setTimeout(() => {
        const startTime = Date.now()
        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3)
          setAnimatedValue(value * easeOut)
          
          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }
        animate()
      }, delay)
      
      return () => clearTimeout(timer)
    } else if (!animated) {
      setAnimatedValue(value)
    }
  }, [isInView, value, duration, delay, animated])

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`
  const glowId = `glow-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div ref={ref} className={`relative ${config.container} ${className}`}>
      <svg
        className="w-full h-full transform -rotate-90"
        width={config.radius * 2}
        height={config.radius * 2}
      >
        <defs>
          {gradient && (
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="50%" stopColor={`${color}CC`} />
              <stop offset="100%" stopColor={`${color}80`} />
            </linearGradient>
          )}
          {glowEffect && (
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>
        
        {/* Background circle */}
        <circle
          className="opacity-30"
          stroke={backgroundColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={config.radius}
          cy={config.radius}
        />
        
        {/* Progress circle */}
        <motion.circle
          stroke={gradient ? `url(#${gradientId})` : color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={config.radius}
          cy={config.radius}
          className="transition-all duration-300 ease-out"
          style={{
            filter: glowEffect ? `url(#${glowId})` : undefined,
          }}
          initial={animated ? { strokeDashoffset: circumference } : undefined}
          animate={animated && isInView ? { strokeDashoffset } : undefined}
          transition={animated ? { 
            duration: duration / 1000, 
            delay: delay / 1000,
            ease: "easeOut" 
          } : undefined}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children ? (
          children
        ) : showLabel ? (
          <div className="text-center">
            <motion.div 
              className={`font-bold text-white ${config.text}`}
              initial={animated ? { opacity: 0, scale: 0.5 } : undefined}
              animate={animated && isInView ? { opacity: 1, scale: 1 } : undefined}
              transition={animated ? { 
                duration: 0.5, 
                delay: (delay + duration * 0.7) / 1000 
              } : undefined}
            >
              {Math.round(progress)}{suffix}
            </motion.div>
            {label && (
              <motion.div 
                className="text-xs text-white/70 mt-1"
                initial={animated ? { opacity: 0 } : undefined}
                animate={animated && isInView ? { opacity: 1 } : undefined}
                transition={animated ? { 
                  duration: 0.3, 
                  delay: (delay + duration) / 1000 
                } : undefined}
              >
                {label}
              </motion.div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

// Preset configurations for common use cases
export const ProgressRingPresets = {
  membership: {
    gradient: true,
    glowEffect: true,
    color: '#1e9b71',
    size: 'xl' as const,
    strokeWidth: 12
  },
  facility: {
    gradient: true,
    color: '#3b82f6',
    size: 'lg' as const,
    strokeWidth: 8
  },
  workout: {
    gradient: true,
    glowEffect: true,
    color: '#8b5cf6',
    size: 'lg' as const,
    strokeWidth: 10
  },
  achievement: {
    gradient: true,
    glowEffect: true,
    color: '#f59e0b',
    size: 'xl' as const,
    strokeWidth: 12
  }
} 