'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ParallaxCardProps {
  title: string
  description: string
  icon: string | React.ReactNode
  gradient: string
  delay?: number
}

const ParallaxCard = ({ title, description, icon, gradient, delay = 0 }: ParallaxCardProps) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const maxRotation = 15 // Maximum rotation in degrees

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate mouse position relative to the center of the card
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation values
    const rotY = (mouseX / (rect.width / 2)) * maxRotation
    const rotX = -((mouseY / (rect.height / 2)) * maxRotation)

    setRotateX(rotX)
    setRotateY(rotY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-80 sm:h-96 perspective-1000 group cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: "spring",
        stiffness: 100 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className={`
          relative w-full h-full rounded-2xl overflow-hidden transform-gpu
          ${gradient}
          glass-effect border border-white/10
          shadow-2xl group-hover:shadow-3xl
          transition-shadow duration-500
        `}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(135deg, rgba(30, 155, 113, 0.3), rgba(16, 160, 133, 0.2), rgba(77, 222, 128, 0.1))`,
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse",
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{
            x: isHovered ? [-300, 300] : -300,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-center items-center text-center">
          {/* Icon with 3D effect */}
          <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 mb-6 relative"
            style={{
              transform: 'translateZ(40px)',
            }}
            animate={{
              rotateX: rotateX * 0.5,
              rotateY: rotateY * 0.5,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="w-full h-full bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg">
              {typeof icon === 'string' ? (
                <Image
                  src={icon}
                  alt={title}
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 filter brightness-110"
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  {icon}
                </div>
              )}
            </div>
          </motion.div>

          {/* Title with 3D effect */}
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-white mb-4"
            style={{
              transform: 'translateZ(30px)',
            }}
            animate={{
              rotateX: rotateX * 0.3,
              rotateY: rotateY * 0.3,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {title}
          </motion.h3>

          {/* Description with 3D effect */}
          <motion.p
            className="text-white/80 text-sm sm:text-base leading-relaxed mb-6"
            style={{
              transform: 'translateZ(20px)',
            }}
            animate={{
              rotateX: rotateX * 0.2,
              rotateY: rotateY * 0.2,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {description}
          </motion.p>

          {/* Learn More button with 3D effect */}
          <motion.div
            className="flex items-center text-primary text-sm sm:text-base font-medium group-hover:text-white transition-colors duration-300"
            style={{
              transform: 'translateZ(10px)',
            }}
            animate={{
              rotateX: rotateX * 0.1,
              rotateY: rotateY * 0.1,
              x: isHovered ? 5 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <span>Learn More</span>
            <motion.svg 
              className="w-4 h-4 ml-2"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{
                x: isHovered ? 5 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(45deg, transparent, rgba(30, 155, 113, 0.4), transparent)`,
            padding: '2px',
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: "linear",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ParallaxCard 