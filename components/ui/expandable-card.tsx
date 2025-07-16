import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

interface ExpandableCardProps {
  title: string;
  summary: string;
  content: string;
  className?: string;
}

export default function ExpandableCard({
  title,
  summary,
  content,
  className = '',
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`cursor-pointer rounded-xl border border-white/10 bg-surface/50 p-6 backdrop-blur-sm ${className}`}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.h3
        className="mb-3 font-semibold text-white text-xl"
        layout="position"
      >
        {title}
      </motion.h3>

      <motion.p className="mb-4 text-white/70" layout="position">
        {summary}
      </motion.p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-white/80 leading-relaxed"
              layout="position"
            >
              {content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ rotate: isExpanded ? 180 : 0 }}
        className="mt-4 flex justify-center"
        layout="position"
      >
        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
          <title>Expand or collapse card</title>
          <path
            d="M19 9l-7 7-7-7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
