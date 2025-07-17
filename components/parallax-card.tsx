'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface ParallaxCardProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  gradient: string;
  delay?: number;
}

const ParallaxCard = ({
  title,
  description,
  icon,
  gradient,
  delay = 0,
}: ParallaxCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const maxRotation = 15; // Maximum rotation in degrees

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to the center of the card
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation values
    const rotY = (mouseX / (rect.width / 2)) * maxRotation;
    const rotX = -((mouseY / (rect.height / 2)) * maxRotation);

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      className="perspective-1000 group relative h-72 w-full cursor-pointer sm:h-80 md:h-96"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
      style={{ perspective: '1000px' }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        className={`relative h-full w-full transform-gpu overflow-hidden rounded-2xl ${gradient}glass-effect border border-white/10 shadow-2xl transition-shadow duration-500 group-hover:shadow-3xl `}
        style={{
          transformStyle: 'preserve-3d',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'linear-gradient(135deg, rgba(30, 155, 113, 0.3), rgba(16, 160, 133, 0.2), rgba(77, 222, 128, 0.1))',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          transition={{
            duration: 2,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            repeatType: 'reverse',
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: isHovered ? [-300, 300] : -300,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          transition={{
            duration: 1.5,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: 'linear',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center sm:p-8">
          {/* Icon with 3D effect */}
          <motion.div
            animate={{
              rotateX: rotateX * 0.5,
              rotateY: rotateY * 0.5,
              scale: isHovered ? 1.1 : 1,
            }}
            className="relative mb-6 h-16 w-16 sm:h-20 sm:w-20"
            style={{
              transform: 'translateZ(40px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
              {typeof icon === 'string' ? (
                <Image
                  alt={title}
                  className="h-10 w-10 brightness-110 filter sm:h-12 sm:w-12"
                  height={48}
                  src={icon}
                  width={48}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center sm:h-12 sm:w-12">
                  {icon}
                </div>
              )}
            </div>
          </motion.div>

          {/* Title with 3D effect */}
          <motion.h3
            animate={{
              rotateX: rotateX * 0.3,
              rotateY: rotateY * 0.3,
            }}
            className="mb-4 font-bold text-white text-xl sm:text-2xl"
            style={{
              transform: 'translateZ(30px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {title}
          </motion.h3>

          {/* Description with 3D effect */}
          <motion.p
            animate={{
              rotateX: rotateX * 0.2,
              rotateY: rotateY * 0.2,
            }}
            className="mb-6 text-sm text-white/80 leading-relaxed sm:text-base"
            style={{
              transform: 'translateZ(20px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {description}
          </motion.p>

          {/* Learn More button with 3D effect */}
          <motion.div
            animate={{
              rotateX: rotateX * 0.1,
              rotateY: rotateY * 0.1,
              x: isHovered ? 5 : 0,
            }}
            className="flex items-center font-medium text-primary text-sm transition-colors duration-300 group-hover:text-white sm:text-base"
            style={{
              transform: 'translateZ(10px)',
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            <span>Learn More</span>
            <motion.svg
              animate={{
                x: isHovered ? 5 : 0,
              }}
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25,
              }}
              viewBox="0 0 24 24"
            >
              <title>Arrow right</title>
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Glowing border effect */}
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(45deg, transparent, rgba(30, 155, 113, 0.4), transparent)',
            padding: '2px',
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
            ease: 'linear',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ParallaxCard;
