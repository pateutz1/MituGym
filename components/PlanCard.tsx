'use client'

import { FC } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ShinyButton from './ui/shiny-button'

import AnimatedBorderTrail from './ui/animated-border-trail'

export interface Feature {
  text: string
  enabled: boolean
}

interface PlanCardProps {
  name: string
  price: string
  originalPrice?: string
  features: Feature[]
  delay?: number
  isPopular?: boolean
  gradient: string
}

const PlanCard: FC<PlanCardProps> = ({ 
  name, 
  price, 
  originalPrice,
  features, 
  delay = 0, 
  isPopular = false,
  gradient 
}) => {
  const cardContent = (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl sm:rounded-3xl h-full flex flex-col
        bg-gradient-to-br ${gradient}
        backdrop-blur-sm
        shadow-2xl group-hover:shadow-3xl
        transition-all duration-500
      `}
      whileHover={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#1e9b71]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#1e9b71]/20 to-transparent blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.h3 
            className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {name}
          </motion.h3>
          
          <div className="space-y-1 mb-4">
            {originalPrice && (
              <div className="text-gray-400 text-sm sm:text-base lg:text-lg line-through">
                {originalPrice}
              </div>
            )}
            <div className="flex items-baseline justify-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {price}
              </span>
              <span className="text-gray-300 text-sm sm:text-base lg:text-lg ml-2">/month</span>
            </div>
          </div>


        </div>

        {/* Features */}
        <div className="flex-1 mb-6 sm:mb-8">
          <ul className="space-y-3 sm:space-y-4">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: delay + 0.3 + (index * 0.1),
                  duration: 0.4 
                }}
              >
                <div className={`
                  w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                  flex-shrink-0 mr-3 sm:mr-4
                  ${feature.enabled 
                    ? 'bg-[#1e9b71] shadow-lg shadow-[#1e9b71]/30' 
                    : 'bg-gray-700/50'
                  }
                `}>
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${feature.enabled ? 'text-white' : 'text-gray-500'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <span className={`
                  text-sm sm:text-base
                  ${feature.enabled 
                    ? 'text-white font-medium' 
                    : 'text-gray-500 line-through'
                  }
                `}>
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.6 }}
        >
          <Link href="/contact">
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: isPopular 
                  ? "0 20px 40px -10px rgba(30, 155, 113, 0.4)"
                  : "0 10px 30px -5px rgba(30, 155, 113, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ShinyButton
                variant={isPopular ? "primary" : "outline"}
                size="lg"
                className="w-full text-sm sm:text-base lg:text-lg font-bold"
              >
                <span className="flex items-center justify-center">
                  Get Started
                  <motion.svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </motion.svg>
                </span>
              </ShinyButton>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <motion.div
      className="relative group h-full"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
        >
          <div className="bg-gradient-to-r from-[#1e9b71] to-[#16a085] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Main card with conditional animated border */}
      {isPopular ? (
        <AnimatedBorderTrail
          variant="glow"
          trailColor="rgb(30, 155, 113)"
          animationDuration={4}
          borderWidth={2}
          borderRadius="1.5rem"
          glowIntensity={12}
          trailOpacity={0.6}
          className="h-full"
        >
          {cardContent}
        </AnimatedBorderTrail>
      ) : (
        <div className="h-full relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 h-full border border-white/10 rounded-3xl group-hover:border-white/20 transition-colors duration-300">
            {cardContent}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default PlanCard 