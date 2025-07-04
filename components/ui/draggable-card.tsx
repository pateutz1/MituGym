import { motion } from 'motion/react'
import { useState } from 'react'

interface DraggableCardProps {
  children: React.ReactNode
  className?: string
  constraintsRef?: React.RefObject<HTMLElement>
}

export default function DraggableCard({ children, className = '', constraintsRef }: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      whileDrag={{ 
        scale: 1.1, 
        rotate: 5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
      animate={{
        scale: isDragging ? 1.1 : 1,
        rotate: isDragging ? 5 : 0,
      }}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 30
      }}
    >
      <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        {children}
      </div>
    </motion.div>
  )
} 