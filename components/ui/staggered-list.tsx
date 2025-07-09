import { motion } from 'motion/react';

interface StaggeredListProps {
  items: string[];
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function StaggeredList({
  items,
  className = '',
}: StaggeredListProps) {
  return (
    <motion.ul
      className={`space-y-4 ${className}`}
      initial="hidden"
      variants={containerVariants}
      viewport={{ once: true, margin: '-50px' }}
      whileInView="visible"
    >
      {items.map((item, index) => (
        <motion.li
          className="flex items-center space-x-3 rounded-lg border border-white/10 bg-surface/30 p-4 backdrop-blur-sm"
          key={index}
          variants={itemVariants}
          whileHover={{
            x: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            transition: { duration: 0.2 },
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            className="h-2 w-2 rounded-full bg-primary"
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
          <span className="text-white/90">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
