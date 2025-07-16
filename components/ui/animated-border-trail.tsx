'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface AnimatedBorderTrailProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  trailColor?: string;
  trailOpacity?: number;
  animationDuration?: number;
  glowIntensity?: number;
  pauseOnHover?: boolean;
  direction?: 'clockwise' | 'counterclockwise';
  variant?: 'continuous' | 'pulse' | 'chase' | 'glow';
}

const AnimatedBorderTrail = ({
  children,
  className = '',
  borderWidth = 2,
  borderRadius = '1rem',
  trailColor = 'rgb(34, 197, 94)', // emerald-500
  trailOpacity = 0.8,
  animationDuration = 3,
  glowIntensity = 10,
  pauseOnHover = false,
  direction = 'clockwise',
  variant = 'continuous',
}: AnimatedBorderTrailProps) => {
  const getAnimationVariants = () => {
    const rotateDirection = direction === 'clockwise' ? 360 : -360;

    switch (variant) {
      case 'pulse':
        return {
          animate: {
            opacity: [
              trailOpacity * 0.3,
              trailOpacity * 0.8,
              trailOpacity * 0.3,
            ],
            scale: [1, 1.01, 1],
          },
          transition: {
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
          },
        };

      case 'chase':
        return {
          animate: {
            rotate: [0, rotateDirection],
            opacity: [
              trailOpacity * 0.4,
              trailOpacity * 0.7,
              trailOpacity * 0.4,
            ],
          },
          transition: {
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
          },
        };

      case 'glow':
        return {
          animate: {
            boxShadow: [
              `0 0 ${glowIntensity}px ${trailColor}40`,
              `0 0 ${glowIntensity * 1.5}px ${trailColor}80`,
              `0 0 ${glowIntensity}px ${trailColor}40`,
            ],
            opacity: [
              trailOpacity * 0.5,
              trailOpacity * 0.8,
              trailOpacity * 0.5,
            ],
          },
          transition: {
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
          },
        };

      default: // continuous
        return {
          animate: {
            opacity: [
              trailOpacity * 0.2,
              trailOpacity * 0.6,
              trailOpacity * 0.2,
            ],
          },
          transition: {
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
          },
        };
    }
  };

  const animationProps = getAnimationVariants();

  const getBackgroundStyle = () => {
    if (variant === 'continuous') {
      return `linear-gradient(45deg, transparent 0%, ${trailColor}20 25%, ${trailColor}40 50%, ${trailColor}20 75%, transparent 100%)`;
    }
    if (variant === 'chase') {
      return `conic-gradient(from 0deg, transparent 0deg, ${trailColor}60 90deg, transparent 180deg, transparent 360deg)`;
    }
    return `linear-gradient(135deg, ${trailColor}20, ${trailColor}40, ${trailColor}20)`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Animated Border Trail */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius,
          background: getBackgroundStyle(),
          padding: `${borderWidth}px`,
          opacity: trailOpacity * 0.7,
        }}
        {...animationProps}
        whileHover={pauseOnHover ? {} : {}}
      >
        {/* Inner mask to create border effect */}
        <div
          className="h-full w-full bg-background"
          style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
        />
      </motion.div>

      {/* Glow effect for enhanced visual appeal */}
      {variant === 'glow' && (
        <motion.div
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.98, 1.02, 0.98],
          }}
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius,
            background: `linear-gradient(45deg, transparent, ${trailColor}20, transparent)`,
            filter: `blur(${glowIntensity / 2}px)`,
          }}
          transition={{
            duration: animationDuration * 1.5,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBorderTrail;
