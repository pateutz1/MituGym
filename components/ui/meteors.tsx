"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";

interface MeteorProps {
  id: number;
  delay: number;
  duration: number;
  size: number;
  left: string;
  color: string;
}

interface MeteorsProps {
  number?: number;
  className?: string;
  colors?: string[];
  sizes?: number[];
  durations?: number[];
}

// Define default values outside component to prevent recreation
const DEFAULT_COLORS = ["#1e9b71", "#3b82f6", "#8b5cf6", "#ef4444"];
const DEFAULT_SIZES = [1, 2, 3];
const DEFAULT_DURATIONS = [2, 4, 6];

export default function Meteors({ 
  number = 20, 
  className = "",
  colors = DEFAULT_COLORS,
  sizes = DEFAULT_SIZES,
  durations = DEFAULT_DURATIONS
}: MeteorsProps) {
  const [meteors, setMeteors] = useState<MeteorProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const meteorArray: MeteorProps[] = [];
    
    for (let i = 0; i < number; i++) {
      meteorArray.push({
        id: i,
        delay: Math.random() * 10,
        duration: durations[Math.floor(Math.random() * durations.length)],
        size: sizes[Math.floor(Math.random() * sizes.length)],
        left: Math.random() * 100 + "%",
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setMeteors(meteorArray);
  }, [number, isClient, colors, sizes, durations]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute top-0 opacity-0"
          style={{
            left: meteor.left,
            width: meteor.size,
            height: meteor.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, isClient ? window.innerHeight : 800],
            x: [0, Math.random() * 200 - 100],
          }}
          transition={{
            duration: meteor.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
            delay: meteor.delay,
            ease: "easeOut",
          }}
        >
          {/* Meteor Trail */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(to bottom, ${meteor.color}, transparent)`,
              boxShadow: `0 0 ${meteor.size * 4}px ${meteor.color}`,
              transform: "scaleY(20) scaleX(0.3)",
              transformOrigin: "top",
            }}
          />
          
          {/* Meteor Head */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full"
            style={{
              backgroundColor: meteor.color,
              boxShadow: `0 0 ${meteor.size * 2}px ${meteor.color}`,
            }}
          />
        </motion.div>
      ))}
      
      {/* Sparkles */}
      {Array.from({ length: Math.floor(number / 4) }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
} 