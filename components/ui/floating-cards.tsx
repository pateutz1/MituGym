'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { cn } from '../../libs/utils';

interface FloatingCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient?: string;
  delay?: number;
}

interface FloatingCardsProps {
  cards: FloatingCard[];
  className?: string;
  containerClassName?: string;
}

interface CardContentProps {
  card: FloatingCard;
  isHovered: boolean;
}

interface GlowEffectProps {
  isVisible: boolean;
}

const GlowEffect = ({ isVisible }: GlowEffectProps) => (
  <div
    className={`absolute inset-0 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
  >
    <div className="absolute top-0 left-0 h-20 w-20 animate-pulse rounded-full bg-[#1e9b71]/10 blur-3xl" />
    <div className="absolute right-0 bottom-0 h-24 w-24 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000" />
  </div>
);

const CardContent = ({ card, isHovered }: CardContentProps) => (
  <div className="relative z-10">
    {/* Icon */}
    <motion.div
      animate={{
        scale: isHovered ? 1.1 : 1,
        rotate: isHovered ? 5 : 0,
      }}
      className="mb-4 h-12 w-12 text-[#1e9b71] transition-colors duration-300 group-hover:text-[#16a085]"
      transition={{ duration: 0.3 }}
    >
      {card.icon}
    </motion.div>

    {/* Title */}
    <motion.h3
      animate={{
        y: isHovered ? -2 : 0,
      }}
      className="mb-3 font-bold text-white text-xl transition-colors duration-300 group-hover:text-[#1e9b71]"
      transition={{ duration: 0.3 }}
    >
      {card.title}
    </motion.h3>

    {/* Description */}
    <motion.p
      animate={{
        y: isHovered ? -2 : 0,
      }}
      className="text-white/70 transition-colors duration-300 group-hover:text-white/90"
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {card.description}
    </motion.p>
  </div>
);

interface FloatingCardItemProps {
  card: FloatingCard;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className: string;
}

const FloatingCardItem = ({
  card,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  className,
}: FloatingCardItemProps) => (
  <motion.div
    animate={{ opacity: 1, y: 0, scale: 1 }}
    className={cn('group relative cursor-pointer', className)}
    initial={{ opacity: 0, y: 60, scale: 0.8 }}
    key={card.id}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    transition={{
      duration: 0.6,
      delay: card.delay || index * 0.1,
      type: 'spring',
      stiffness: 100,
    }}
  >
    {/* Floating effect container */}
    <motion.div
      animate={{
        y: isHovered ? -10 : 0,
        rotateX: isHovered ? 5 : 0,
        rotateY: isHovered ? 5 : 0,
      }}
      className="relative"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {/* Card background with gradient */}
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-2xl p-6',
          'bg-gradient-to-br backdrop-blur-sm',
          'border border-white/10 hover:border-white/20',
          'transition-all duration-300',
          'shadow-lg hover:shadow-2xl',
          card.gradient || 'from-white/5 to-white/10'
        )}
      >
        {/* Glow effect */}
        <GlowEffect isVisible={isHovered} />

        {/* Content */}
        <CardContent card={card} isHovered={isHovered} />

        {/* Bottom gradient line */}
        <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#1e9b71] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* 3D shadow */}
      <div
        className={cn(
          '-z-10 absolute inset-0 rounded-2xl',
          'bg-gradient-to-br from-black/20 to-black/40',
          'translate-x-2 translate-y-2 transform opacity-0 group-hover:opacity-100',
          'blur-sm transition-all duration-300'
        )}
      />
    </motion.div>
  </motion.div>
);

const FloatingCards = ({
  cards,
  className = '',
  containerClassName = '',
}: FloatingCardsProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className={cn('relative w-full', containerClassName)}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <FloatingCardItem
            card={card}
            className={className}
            index={index}
            isHovered={hoveredCard === card.id}
            key={card.id}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingCards;
