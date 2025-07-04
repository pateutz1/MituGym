"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  radius?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
  path?: boolean;
  circles?: Array<{
    size: number;
    color: string;
    delay: number;
    duration: number;
  }>;
}

export default function OrbitingCircles({
  className = "",
  children,
  radius = 50,
  duration = 20,
  delay = 0,
  reverse = false,
  path = false,
  circles = [
    { size: 8, color: "rgba(30, 155, 113, 0.8)", delay: 0, duration: 20 },
    { size: 6, color: "rgba(59, 130, 246, 0.6)", delay: 5, duration: 15 },
    { size: 4, color: "rgba(139, 92, 246, 0.4)", delay: 10, duration: 25 },
  ]
}: OrbitingCirclesProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`relative ${className}`}>
      {/* Central Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Orbital Path */}
      {path && (
        <div 
          className="absolute inset-0 rounded-full border border-white/10"
          style={{
            width: radius * 2,
            height: radius * 2,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Orbiting Circles */}
      {isVisible && circles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            backgroundColor: circle.color,
            top: '50%',
            left: '50%',
            marginTop: -circle.size / 2,
            marginLeft: -circle.size / 2,
          }}
          animate={{
            rotate: reverse ? -360 : 360,
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: circle.delay,
          }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              transform: `translateX(${radius}px)`,
            }}
            animate={{
              rotate: reverse ? 360 : -360,
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: circle.delay,
            }}
          >
            <motion.div
              className="w-full h-full rounded-full shadow-lg"
              style={{
                backgroundColor: circle.color,
                boxShadow: `0 0 ${circle.size}px ${circle.color}`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: circle.delay,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
      
      {/* Pulsing Background */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-radial from-primary/10 via-transparent to-transparent"
        style={{
          width: radius * 2.5,
          height: radius * 2.5,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      />
    </div>
  );
} 