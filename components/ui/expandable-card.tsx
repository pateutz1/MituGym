import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

interface ExpandableCardProps {
  title: string
  summary: string
  content: string
  className?: string
}

export default function ExpandableCard({ title, summary, content, className = '' }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className={`bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer ${className}`}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.h3 layout="position" className="text-xl font-semibold text-white mb-3">
        {title}
      </motion.h3>
      
      <motion.p layout="position" className="text-white/70 mb-4">
        {summary}
      </motion.p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div layout="position" className="text-white/80 leading-relaxed">
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout="position"
        animate={{ rotate: isExpanded ? 180 : 0 }}
        className="flex justify-center mt-4"
      >
        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.div>
  )
} 