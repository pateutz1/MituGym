import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface ProgressRingProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
  gradient?: boolean;
  glowEffect?: boolean;
  animated?: boolean;
}

const sizeConfig = {
  sm: { radius: 40, text: 'text-base', container: 'w-20 h-20' },
  md: { radius: 60, text: 'text-lg', container: 'w-32 h-32' },
  lg: { radius: 80, text: 'text-xl', container: 'w-40 h-40' },
  xl: { radius: 100, text: 'text-2xl', container: 'w-52 h-52' },
};

// Helper function to create easing animation
const createEaseOutAnimation = (
  value: number,
  duration: number,
  setAnimatedValue: (val: number) => void
) => {
  const startTime = Date.now();
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const animationProgress = Math.min(elapsed / duration, 1);

    // Optimized easing function for Motion's hybrid engine
    const easeOut = 1 - (1 - animationProgress) ** 3;
    setAnimatedValue(value * easeOut);

    if (animationProgress < 1) {
      requestAnimationFrame(animate);
    }
  };
  animate();
};

// Helper function to generate gradient ID
const generateGradientId = () =>
  `gradient-${Math.random().toString(36).substr(2, 9)}`;

// Helper function to create SVG gradient
const createGradient = (gradientId: string, color: string) => (
  <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="100%">
    <stop offset="0%" stopColor={color} />
    <stop offset="100%" stopColor={`${color}80`} />
  </linearGradient>
);

// Helper function to create glow filter
const createGlowFilter = (glowId: string) => (
  <filter id={glowId}>
    <feGaussianBlur result="coloredBlur" stdDeviation="3" />
    <feMerge>
      <feMergeNode in="coloredBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

// Component for the progress value display
const ProgressValue = ({
  progress,
  suffix,
  config,
  animated,
  isInView,
  delay,
  duration,
}: {
  progress: number;
  suffix: string;
  config: { text: string };
  animated: boolean;
  isInView: boolean;
  delay: number;
  duration: number;
}) => (
  <motion.div
    animate={animated && isInView ? { opacity: 1 } : undefined}
    className={`font-bold text-white ${config.text}`}
    initial={animated ? { opacity: 0 } : undefined}
    transition={
      animated
        ? {
            duration: 0.3,
            delay: (delay + duration * 0.5) / 1000,
          }
        : undefined
    }
  >
    {Math.round(progress)}
    {suffix}
  </motion.div>
);

// Component for the progress label
const ProgressLabel = ({
  label,
  animated,
  isInView,
  delay,
  duration,
}: {
  label: string;
  animated: boolean;
  isInView: boolean;
  delay: number;
  duration: number;
}) => (
  <motion.div
    animate={animated && isInView ? { opacity: 1 } : undefined}
    className="mt-1 text-white/70 text-xs"
    initial={animated ? { opacity: 0 } : undefined}
    transition={
      animated
        ? {
            duration: 0.3,
            delay: (delay + duration * 0.7) / 1000,
          }
        : undefined
    }
  >
    {label}
  </motion.div>
);

// Component for center content with cleaner conditional logic
const CenterContent = ({
  children,
  showLabel,
  progress,
  suffix,
  label,
  config,
  animated,
  isInView,
  delay,
  duration,
}: {
  children?: React.ReactNode;
  showLabel: boolean;
  progress: number;
  suffix: string;
  label?: string;
  config: { text: string };
  animated: boolean;
  isInView: boolean;
  delay: number;
  duration: number;
}) => {
  if (children) {
    return children;
  }

  if (!showLabel) {
    return null;
  }

  return (
    <div className="text-center">
      <ProgressValue
        progress={progress}
        suffix={suffix}
        config={config}
        animated={animated}
        isInView={isInView}
        delay={delay}
        duration={duration}
      />
      {label && (
        <ProgressLabel
          label={label}
          animated={animated}
          isInView={isInView}
          delay={delay}
          duration={duration}
        />
      )}
    </div>
  );
};

export default function ProgressRing({
  value,
  size = 'md',
  strokeWidth = 8,
  color = '#1e9b71',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  showLabel = true,
  label,
  suffix = '%',
  duration = 1500,
  delay = 0,
  className = '',
  children,
  gradient = false,
  glowEffect = false,
  animated = true,
}: ProgressRingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [animatedValue, setAnimatedValue] = useState(0);

  const config = sizeConfig[size];
  const normalizedRadius = config.radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const currentProgress = animated ? animatedValue : value;
  const strokeDashoffset =
    circumference - (currentProgress / 100) * circumference;

  // Enhanced animation with Motion library's hybrid engine
  useEffect(() => {
    if (isInView && animated) {
      const timer = setTimeout(() => {
        createEaseOutAnimation(value, duration, setAnimatedValue);
      }, delay);

      return () => clearTimeout(timer);
    }
    if (!animated) {
      setAnimatedValue(value);
    }
  }, [isInView, value, duration, delay, animated]);

  const gradientId = generateGradientId();
  const glowId = `glow-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`relative ${config.container} ${className}`} ref={ref}>
      <svg
        className="-rotate-90 h-full w-full transform"
        height={config.radius * 2}
        width={config.radius * 2}
      >
        <title>Progress Ring</title>
        <defs>
          {gradient && createGradient(gradientId, color)}
          {glowEffect && createGlowFilter(glowId)}
        </defs>

        {/* Background circle */}
        <circle
          className="opacity-20"
          cx={config.radius}
          cy={config.radius}
          fill="transparent"
          r={normalizedRadius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          animate={
            animated && isInView
              ? {
                  strokeDashoffset,
                  pathLength: currentProgress / 100,
                }
              : undefined
          }
          className="drop-shadow-md"
          cx={config.radius}
          cy={config.radius}
          fill="transparent"
          filter={glowEffect ? `url(#${glowId})` : undefined}
          initial={
            animated
              ? {
                  strokeDashoffset: circumference,
                  pathLength: 0,
                }
              : undefined
          }
          r={normalizedRadius}
          stroke={gradient ? `url(#${gradientId})` : color}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transition={
            animated
              ? {
                  duration: duration / 1000,
                  delay: delay / 1000,
                  ease: 'easeOut',
                }
              : undefined
          }
        />
      </svg>

      {/* Center content - Enhanced with Motion library animations */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CenterContent
          animated={animated}
          config={config}
          delay={delay}
          duration={duration}
          isInView={isInView}
          label={label}
          progress={currentProgress}
          showLabel={showLabel}
          suffix={suffix}
        >
          {children}
        </CenterContent>
      </div>
    </div>
  );
}

// Enhanced preset configurations optimized for Motion library
export const ProgressRingPresets = {
  membership: {
    gradient: true,
    glowEffect: true,
    color: '#1e9b71',
    size: 'xl' as const,
    strokeWidth: 12,
    duration: 1300, // Optimized for Motion's hybrid engine
  },
  facility: {
    gradient: true,
    color: '#3b82f6',
    size: 'lg' as const,
    strokeWidth: 8,
    duration: 1000, // Faster with Motion's performance improvements
  },
  workout: {
    gradient: true,
    glowEffect: true,
    color: '#8b5cf6',
    size: 'lg' as const,
    strokeWidth: 10,
    duration: 1000,
  },
  achievement: {
    gradient: true,
    glowEffect: true,
    color: '#f59e0b',
    size: 'xl' as const,
    strokeWidth: 12,
    duration: 1300,
  },
};
