'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  intensity?: number;
  glowEffect?: boolean;
}

export default function Card3D({
  children,
  className = '',
  containerClassName = '',
  intensity = 0.1,
  glowEffect = true,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) {
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      // Update CSS variables for glow effect
      if (glowEffect) {
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    if (isHovered) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, glowEffect]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const cardStyle = cardRef.current
    ? {
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - cardRef.current.offsetHeight / 2) * intensity}deg) rotateY(${(mousePosition.x - cardRef.current.offsetWidth / 2) * -intensity}deg) translateZ(20px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      }
    : {};

  return (
    <div className={`relative ${containerClassName}`}>
      <motion.div
        className={`relative transform-gpu transition-all duration-300 ease-out ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
        style={cardStyle}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Glow Effect */}
        {glowEffect && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background:
                'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(30, 155, 113, 0.2), transparent 40%)',
            }}
          />
        )}

        {/* Card Content */}
        <div className="relative z-10 h-full">{children}</div>

        {/* Animated Border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/50 via-transparent to-primary/50 opacity-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
    </div>
  );
}
