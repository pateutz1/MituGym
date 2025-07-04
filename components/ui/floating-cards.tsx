'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '../../libs/utils'

interface FloatingCard {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  gradient?: string
  delay?: number
}

interface FloatingCardsProps {
  cards: FloatingCard[]
  className?: string
  containerClassName?: string
}

const FloatingCards = ({ cards, className = '', containerClassName = '' }: FloatingCardsProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className={cn('relative w-full', containerClassName)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={cn(
              'relative group cursor-pointer',
              className
            )}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: card.delay || index * 0.1,
              type: 'spring',
              stiffness: 100
            }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Floating effect container */}
            <motion.div
              className="relative"
              animate={{
                y: hoveredCard === card.id ? -10 : 0,
                rotateX: hoveredCard === card.id ? 5 : 0,
                rotateY: hoveredCard === card.id ? 5 : 0,
              }}
              transition={{ 
                duration: 0.3,
                ease: 'easeOut'
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              {/* Card background with gradient */}
              <div
                className={cn(
                  'relative overflow-hidden rounded-2xl p-6 h-full',
                  'bg-gradient-to-br backdrop-blur-sm',
                  'border border-white/10 hover:border-white/20',
                  'transition-all duration-300',
                  'shadow-lg hover:shadow-2xl',
                  card.gradient || 'from-white/5 to-white/10'
                )}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-[#1e9b71]/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 mb-4 text-[#1e9b71] group-hover:text-[#16a085] transition-colors duration-300"
                    animate={{
                      scale: hoveredCard === card.id ? 1.1 : 1,
                      rotate: hoveredCard === card.id ? 5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-bold text-white mb-3 group-hover:text-[#1e9b71] transition-colors duration-300"
                    animate={{
                      y: hoveredCard === card.id ? -2 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-white/70 group-hover:text-white/90 transition-colors duration-300"
                    animate={{
                      y: hoveredCard === card.id ? -2 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {card.description}
                  </motion.p>
                </div>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1e9b71] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* 3D shadow */}
              <div
                className={cn(
                  'absolute inset-0 rounded-2xl -z-10',
                  'bg-gradient-to-br from-black/20 to-black/40',
                  'transform translate-y-2 translate-x-2 opacity-0 group-hover:opacity-100',
                  'transition-all duration-300 blur-sm'
                )}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FloatingCards 