import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SimpleTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
}

export default function SimpleTooltip({ 
  children, 
  content, 
  className = ''
}: SimpleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top')
  const tooltipRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltip = tooltipRef.current
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      const viewport = { width: window.innerWidth, height: window.innerHeight }
      const isMobile = viewport.width < 768

      // Check if tooltip would go off screen and adjust position
      let newPosition: 'top' | 'bottom' | 'left' | 'right' = 'top'
      
      // For mobile, prioritize top/bottom positioning to avoid horizontal overflow
      if (isMobile) {
        // Check if there's space above
        if (rect.top - tooltipRect.height - 10 < 0) {
          newPosition = 'bottom'
        } else {
          newPosition = 'top'
        }
        
        // Only use side positioning on mobile if absolutely necessary
        const centerX = rect.left + rect.width / 2
        const tooltipHalfWidth = tooltipRect.width / 2
        
        // If tooltip would extend beyond screen edges significantly, adjust
        if (centerX - tooltipHalfWidth < 10) {
          // Tooltip would go off left edge, but keep it top/bottom with left offset
          newPosition = rect.top - tooltipRect.height - 10 < 0 ? 'bottom' : 'top'
        } else if (centerX + tooltipHalfWidth > viewport.width - 10) {
          // Tooltip would go off right edge, but keep it top/bottom with right offset
          newPosition = rect.top - tooltipRect.height - 10 < 0 ? 'bottom' : 'top'
        }
      } else {
        // Desktop logic - can use all directions
        // Check if there's space above
        if (rect.top - tooltipRect.height - 10 < 0) {
          newPosition = 'bottom'
        }
        
        // Check if there's space on sides for wider tooltips
        if (rect.left + tooltipRect.width / 2 > viewport.width - 20) {
          newPosition = 'left'
        } else if (rect.right - tooltipRect.width / 2 < 20) {
          newPosition = 'right'
        }
      }

      setPosition(newPosition)
    }
  }, [isVisible])

  const getPositionClasses = () => {    
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2'
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2'
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    }
  }

  const getArrowClasses = () => {
    switch (position) {
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900/95'
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900/95'
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/95'
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95'
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.8, y: position === 'bottom' ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: position === 'bottom' ? -10 : 10 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${getPositionClasses()} z-[9999] pointer-events-none`}
          >
                         <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg w-[260px] sm:w-[300px] md:w-[320px] lg:w-[340px] px-6 py-4 text-xs sm:text-sm md:text-sm lg:text-base text-white shadow-xl leading-relaxed">
              {content}
            </div>
            {/* Arrow */}
            <div className={`absolute ${getArrowClasses()}`}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 