'use client';

import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface BackgroundBeamsProps {
  className?: string;
  beamCount?: number;
  duration?: number;
  delay?: number;
}

export default function BackgroundBeams({
  className = '',
  beamCount = 3,
  duration = 8,
  delay = 0,
}: BackgroundBeamsProps) {
  const beamRef = useRef<HTMLDivElement>(null);

  // Generate stable beam and particle data with unique IDs
  const beamData = Array.from({ length: beamCount }, (_, i) => ({
    id: `beam-${Date.now()}-${Math.random().toString(36).slice(2)}-${i}`,
    position: 20 + i * 30,
    delay: delay + i * 0.5,
  }));

  const particleData = Array.from({ length: 5 }, (_, i) => ({
    id: `particle-${Date.now()}-${Math.random().toString(36).slice(2)}-${i}`,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2,
  }));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!beamRef.current) {
        return;
      }

      const rect = beamRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      beamRef.current.style.setProperty('--mouse-x', `${x}px`);
      beamRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      ref={beamRef}
    >
      {/* Animated Beams */}
      {beamData.map((beam) => (
        <motion.div
          animate={{
            opacity: [0, 1, 0],
            scaleY: [0, 1, 0],
            x: [0, 50, 0],
          }}
          className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0, scaleY: 0 }}
          key={beam.id}
          style={{
            left: `${beam.position}%`,
            background:
              'linear-gradient(180deg, transparent 0%, rgba(30, 155, 113, 0.6) 50%, transparent 100%)',
          }}
          transition={{
            duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: beam.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Radial Gradient */}
      <div
        className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(30, 155, 113, 0.15), transparent 40%)',
        }}
      />

      {/* Animated Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Floating Particles */}
      {particleData.map((particle) => (
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.2, 0.5],
          }}
          className="absolute h-1 w-1 rounded-full bg-primary/60"
          key={particle.id}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
