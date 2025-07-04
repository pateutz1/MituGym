import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/libs/utils';

interface CounterProps {
  /** Target number to count to */
  target: number;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Starting number (default: 0) */
  start?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Suffix to display after the number (e.g., '+', '%', 'K') */
  suffix?: string;
  /** Prefix to display before the number (e.g., '$', '#') */
  prefix?: string;
  /** Custom className for styling */
  className?: string;
  /** Whether to trigger animation when component comes into view */
  triggerOnView?: boolean;
  /** Custom easing function for animation */
  easing?: (t: number) => number;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Whether to format large numbers (e.g., 1000 -> 1K) */
  formatLargeNumbers?: boolean;
}

// Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

const formatNumber = (num: number, formatLarge: boolean = false): string => {
  if (!formatLarge) return Math.floor(num).toLocaleString();
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return Math.floor(num).toLocaleString();
};

export const Counter: React.FC<CounterProps> = ({
  target,
  duration = 2000,
  start = 0,
  delay = 0,
  suffix = '',
  prefix = '',
  className,
  triggerOnView = true,
  easing = easingFunctions.easeOut,
  onComplete,
  formatLargeNumbers = false,
}) => {
  const [currentValue, setCurrentValue] = useState(start);
  const [isVisible, setIsVisible] = useState(!triggerOnView);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number>();

  // Intersection Observer for trigger on view
  useEffect(() => {
    if (!triggerOnView || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView, hasAnimated]);

  // Animation logic
  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const startTime = Date.now() + delay;
    const startValue = start;
    const endValue = target;
    const totalDuration = duration;

    const animate = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / totalDuration, 1);
      
      const easedProgress = easing(progress);
      const newValue = startValue + (endValue - startValue) * easedProgress;
      
      setCurrentValue(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
        onComplete?.();
      }
    };

    if (delay > 0) {
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, hasAnimated, target, duration, start, delay, easing, onComplete]);

  return (
    <span
      ref={counterRef}
      className={cn(
        "inline-block font-bold text-4xl md:text-5xl lg:text-6xl",
        "bg-gradient-to-r from-green-400 via-emerald-500 to-green-600",
        "bg-clip-text text-transparent",
        "transition-all duration-300 ease-out",
        "drop-shadow-lg",
        className
      )}
    >
      {prefix}
      {formatNumber(currentValue, formatLargeNumbers)}
      {suffix}
    </span>
  );
};

// Preset configurations for common use cases
export const CounterPresets = {
  members: (count: number) => (
    <Counter
      target={count}
      suffix="+"
      duration={2500}
      formatLargeNumbers={true}
      className="text-green-400"
    />
  ),
  
  experience: (years: number) => (
    <Counter
      target={years}
      suffix="+ Years"
      duration={2000}
      className="text-emerald-400"
    />
  ),
  
  equipment: (count: number) => (
    <Counter
      target={count}
      suffix="+"
      duration={2200}
      formatLargeNumbers={true}
      className="text-green-500"
    />
  ),
  
  percentage: (percent: number) => (
    <Counter
      target={percent}
      suffix="%"
      duration={1800}
      className="text-emerald-500"
    />
  ),
  
  currency: (amount: number) => (
    <Counter
      target={amount}
      prefix="$"
      duration={2000}
      formatLargeNumbers={true}
      className="text-green-400"
    />
  ),
};

export default Counter; 