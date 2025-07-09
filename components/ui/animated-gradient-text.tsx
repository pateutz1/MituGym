'use client';

import { motion } from 'framer-motion';
import { cn } from '../../libs/utils';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientVia?: string;
  animationDuration?: number;
  variant?: 'shimmer' | 'pulse' | 'wave' | 'glow';
}

const AnimatedGradientText = ({
  children,
  className = '',
  gradientFrom = 'from-[#1e9b71]',
  gradientTo = 'to-[#16a085]',
  gradientVia = 'via-[#20b2aa]',
  animationDuration = 3,
  variant = 'shimmer',
}: AnimatedGradientTextProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'shimmer':
        return 'bg-gradient-to-r bg-[length:200%_auto] animate-shimmer';
      case 'pulse':
        return 'bg-gradient-to-r animate-pulse';
      case 'wave':
        return 'bg-gradient-to-r bg-[length:200%_auto] animate-wave';
      case 'glow':
        return 'bg-gradient-to-r animate-glow';
      default:
        return 'bg-gradient-to-r bg-[length:200%_auto] animate-shimmer';
    }
  };

  return (
    <motion.span
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'inline-block bg-clip-text font-bold text-transparent',
        `${gradientFrom} ${gradientVia} ${gradientTo}`,
        getVariantClasses(),
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      style={{
        animationDuration: `${animationDuration}s`,
        backgroundSize:
          variant === 'shimmer' || variant === 'wave'
            ? '200% auto'
            : '100% auto',
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.span>
  );
};

export default AnimatedGradientText;
