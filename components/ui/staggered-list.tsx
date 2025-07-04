import { motion } from 'motion/react'

interface StaggeredListProps {
  items: string[]
  className?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20
    }
  }
}

export default function StaggeredList({ items, className = '' }: StaggeredListProps) {
  return (
    <motion.ul
      className={`space-y-4 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="flex items-center space-x-3 p-4 bg-surface/30 backdrop-blur-sm border border-white/10 rounded-lg"
          whileHover={{ 
            x: 10, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transition: { duration: 0.2 }
          }}
        >
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}
          />
          <span className="text-white/90">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
} 