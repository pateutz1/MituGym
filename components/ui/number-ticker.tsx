"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  start?: number;
}

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
  start = 0
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const updateValue = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateValue);
        return;
      }
      
      if (now >= endTime) {
        setDisplayValue(value);
        return;
      }

      const progress = (now - startTime) / (endTime - startTime);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = direction === "up" 
        ? start + (value - start) * easeOutQuart
        : start - (start - value) * easeOutQuart;
      
      setDisplayValue(currentValue);
      requestAnimationFrame(updateValue);
    };

    requestAnimationFrame(updateValue);
  }, [isInView, value, direction, delay, duration, start]);

  const formatNumber = (num: number): string => {
    if (decimalPlaces === 0) {
      return Math.round(num).toString();
    }
    return num.toFixed(decimalPlaces);
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay }}
    >
      {prefix}
      <span className="tabular-nums">
        {formatNumber(displayValue)}
      </span>
      {suffix}
    </motion.span>
  );
} 