'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MeteorProps {
  number?: number;
  className?: string;
}

const Meteors = ({ number = 20, className = '' }: MeteorProps) => {
  const [meteors, setMeteors] = useState<
    Array<{
      id: number;
      left: string;
      animationDelay: string;
      animationDuration: string;
      size: string;
    }>
  >([]);

  useEffect(() => {
    const meteorArray = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      size: `${Math.random() * 2 + 1}px`,
    }));
    setMeteors(meteorArray);
  }, [number]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {meteors.map((meteor) => (
        <motion.span
          animate={{
            translateY: '100vh',
            translateX: '100px',
            opacity: [0, 1, 0],
          }}
          className="absolute top-0 h-px bg-gradient-to-r from-transparent via-[#1e9b71] to-transparent"
          initial={{
            translateY: '-100px',
            translateX: '-100px',
            opacity: 0,
          }}
          key={meteor.id}
          style={{
            left: meteor.left,
            height: meteor.size,
            width: '100px',
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
          transition={{
            duration: Number.parseFloat(meteor.animationDuration),
            delay: Number.parseFloat(meteor.animationDelay),
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default Meteors;
