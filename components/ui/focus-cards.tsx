import { motion } from 'motion/react'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface FocusCard {
  id: number
  src: string
  alt: string
  title: string
  description: string
  category?: string
}

interface FocusCardsProps {
  cards: FocusCard[]
  className?: string
  onCardClick?: (card: FocusCard, index: number) => void
}

export default function FocusCards({ cards, className = '', onCardClick }: FocusCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background blur overlay */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl"
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight effect */}
      {hoveredIndex !== null && (
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 155, 113, 0.15), transparent 40%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="relative group cursor-pointer"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => onCardClick?.(card, index)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Card container */}
            <motion.div
              className="relative h-80 rounded-2xl overflow-hidden"
              animate={{
                filter: hoveredIndex === null || hoveredIndex === index ? 'blur(0px)' : 'blur(8px)',
                scale: hoveredIndex === index ? 1.05 : hoveredIndex === null ? 1 : 0.95,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0.7,
                    y: hoveredIndex === index ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category badge */}
                  {card.category && (
                    <motion.span
                      className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-primary bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        scale: hoveredIndex === index ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.category}
                    </motion.span>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-sm line-clamp-2">
                    {card.description}
                  </p>
                </motion.div>
              </div>

              {/* Hover border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-primary/50 rounded-2xl pointer-events-none"
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{
                  x: hoveredIndex === index ? '100%' : '-100%',
                }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* 3D shadow effect */}
            <motion.div
              className="absolute inset-0 bg-black/20 rounded-2xl -z-10"
              animate={{
                x: hoveredIndex === index ? 8 : 0,
                y: hoveredIndex === index ? 8 : 0,
                opacity: hoveredIndex === index ? 0.3 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
} 