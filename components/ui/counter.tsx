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

// Optimized easing functions
const easingFunctions = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 2), // Simplified cubic to quadratic
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
};

// Optimized number formatting
const formatNumber = (value: number, formatLarge: boolean = false): string => {
  if (!formatLarge) return Math.round(value).toString();
  
  const absValue = Math.abs(value);
  if (absValue >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  } else if (absValue >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return Math.round(value).toString();
};

export const Counter: React.FC<CounterProps> = ({
  target,
  duration = 1500, // Reduced from 2000ms
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

  // Optimized Intersection Observer
  useEffect(() => {
    if (!triggerOnView || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "-50px" } // Optimized threshold
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnView, hasAnimated]);

  // Optimized animation logic
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

// Optimized preset configurations
export const CounterPresets = {
  members: (count: number) => (
    <Counter
      target={count}
      suffix="+"
      duration={1800} // Reduced duration
      formatLargeNumbers={true}
      className="text-green-400"
    />
  ),
  
  experience: (years: number) => (
    <Counter
      target={years}
      suffix="+ Years"
      duration={1500} // Reduced duration
      className="text-emerald-400"
    />
  ),
  
  equipment: (count: number) => (
    <Counter
      target={count}
      suffix="+"
      duration={1600} // Reduced duration
      formatLargeNumbers={true}
      className="text-green-500"
    />
  ),
  
  percentage: (percent: number) => (
    <Counter
      target={percent}
      suffix="%"
      duration={1200} // Reduced duration
      className="text-emerald-500"
    />
  ),
  
  currency: (amount: number) => (
    <Counter
      target={amount}
      prefix="$"
      duration={1500} // Reduced duration
      formatLargeNumbers={true}
      className="text-green-400"
    />
  ),
};

export default Counter; 