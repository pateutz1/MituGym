import { motion } from 'motion/react';
import { useState } from 'react';

interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
  constraintsRef?: React.RefObject<HTMLElement>;
}

export default function DraggableCard({
  children,
  className = '',
  constraintsRef,
}: DraggableCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      animate={{
        scale: isDragging ? 1.1 : 1,
        rotate: isDragging ? 5 : 0,
      }}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={() => setIsDragging(false)}
      onDragStart={() => setIsDragging(true)}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      }}
      whileDrag={{
        scale: 1.1,
        rotate: 5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="rounded-xl border border-white/10 bg-surface/50 p-6 backdrop-blur-sm">
        {children}
      </div>
    </motion.div>
  );
}
