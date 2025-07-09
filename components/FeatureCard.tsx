'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import AnimatedBorderTrail from './ui/animated-border-trail';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  animatedBorder?: boolean;
  borderVariant?: 'continuous' | 'pulse' | 'chase' | 'glow';
  borderColor?: string;
}

const FeatureCard = ({
  icon,
  title,
  description,
  delay = 0,
  animatedBorder = false,
  borderVariant = 'continuous',
  borderColor = 'rgb(34, 197, 94)',
}: FeatureCardProps) => {
  const cardContent = (
    <motion.div
      className="group relative rounded-xl border border-white/10 bg-surface/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-surface/70"
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Background gradient effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/20 transition-colors duration-300 group-hover:bg-primary/30"
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <div className="text-2xl text-primary">{icon}</div>
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 font-semibold text-white text-xl transition-colors duration-300 group-hover:text-primary">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/70 leading-relaxed transition-colors duration-300 group-hover:text-white/80">
          {description}
        </p>

        {/* Decorative element */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary opacity-50"
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );

  return animatedBorder ? (
    <AnimatedBorderTrail
      animationDuration={4 + delay}
      borderRadius="0.75rem"
      borderWidth={1}
      className="h-full"
      glowIntensity={6}
      trailColor={borderColor}
      trailOpacity={0.4}
      variant={borderVariant}
    >
      {cardContent}
    </AnimatedBorderTrail>
  ) : (
    cardContent
  );
};

export default FeatureCard;
