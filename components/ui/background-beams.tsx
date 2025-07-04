"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

interface BackgroundBeamsProps {
  className?: string;
  beamCount?: number;
  duration?: number;
  delay?: number;
}

export default function BackgroundBeams({ 
  className = "", 
  beamCount = 3,
  duration = 8,
  delay = 0 
}: BackgroundBeamsProps) {
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!beamRef.current) return;
      
      const rect = beamRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      beamRef.current.style.setProperty("--mouse-x", `${x}px`);
      beamRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={beamRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Animated Beams */}
      {Array.from({ length: beamCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          style={{
            left: `${20 + i * 30}%`,
            background: `linear-gradient(180deg, transparent 0%, rgba(30, 155, 113, 0.6) 50%, transparent 100%)`,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scaleY: [0, 1, 0],
            x: [0, 50, 0]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: delay + i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Radial Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(30, 155, 113, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Floating Particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-primary/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
} 