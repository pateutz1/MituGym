import { motion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface FocusCard {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  category?: string;
}

interface FocusCardsProps {
  cards: FocusCard[];
  className?: string;
  onCardClick?: (card: FocusCard, index: number) => void;
}

// Helper functions to reduce cognitive complexity
const getCardFilter = (
  hoveredIndex: number | null,
  currentIndex: number
): string => {
  if (hoveredIndex === null || hoveredIndex === currentIndex) {
    return 'blur(0px)';
  }
  return 'blur(8px)';
};

const getCardScale = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  if (hoveredIndex === currentIndex) {
    return 1.05;
  }
  if (hoveredIndex === null) {
    return 1;
  }
  return 0.95;
};

const getContentOpacity = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 1 : 0.7;
};

const getContentY = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 0 : 10;
};

const getCategoryOpacity = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 1 : 0;
};

const getCategoryScale = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 1 : 0.8;
};

const getBorderOpacity = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 1 : 0;
};

const getBorderScale = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 1 : 1.1;
};

const getShinePosition = (
  hoveredIndex: number | null,
  currentIndex: number
): string => {
  return hoveredIndex === currentIndex ? '100%' : '-100%';
};

const getShadowX = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 8 : 0;
};

const getShadowY = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 8 : 0;
};

const getShadowOpacity = (
  hoveredIndex: number | null,
  currentIndex: number
): number => {
  return hoveredIndex === currentIndex ? 0.3 : 0;
};

function CardImage({ card }: { card: FocusCard }) {
  return (
    <div className="absolute inset-0">
      <Image
        alt={card.alt}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        src={card.src}
      />
    </div>
  );
}

function CardCategory({
  card,
  hoveredIndex,
  currentIndex,
}: {
  card: FocusCard;
  hoveredIndex: number | null;
  currentIndex: number;
}) {
  if (!card.category) {
    return null;
  }

  return (
    <motion.span
      animate={{
        opacity: getCategoryOpacity(hoveredIndex, currentIndex),
        scale: getCategoryScale(hoveredIndex, currentIndex),
      }}
      className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/20 px-3 py-1 font-semibold text-primary text-xs backdrop-blur-sm"
      transition={{ duration: 0.3 }}
    >
      {card.category}
    </motion.span>
  );
}

function CardContent({
  card,
  hoveredIndex,
  currentIndex,
}: {
  card: FocusCard;
  hoveredIndex: number | null;
  currentIndex: number;
}) {
  return (
    <div className="absolute right-0 bottom-0 left-0 p-6">
      <motion.div
        animate={{
          opacity: getContentOpacity(hoveredIndex, currentIndex),
          y: getContentY(hoveredIndex, currentIndex),
        }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <CardCategory
          card={card}
          currentIndex={currentIndex}
          hoveredIndex={hoveredIndex}
        />

        <h3 className="mb-2 line-clamp-1 font-bold text-white text-xl">
          {card.title}
        </h3>

        <p className="line-clamp-2 text-sm text-white/80">{card.description}</p>
      </motion.div>
    </div>
  );
}

function CardEffects({
  hoveredIndex,
  currentIndex,
}: {
  hoveredIndex: number | null;
  currentIndex: number;
}) {
  return (
    <>
      {/* Hover border effect */}
      <motion.div
        animate={{
          opacity: getBorderOpacity(hoveredIndex, currentIndex),
          scale: getBorderScale(hoveredIndex, currentIndex),
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary/50"
        transition={{ duration: 0.3 }}
      />

      {/* Shine effect */}
      <motion.div
        animate={{
          x: getShinePosition(hoveredIndex, currentIndex),
        }}
        className="-skew-x-12 absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        transition={{ duration: 0.6 }}
      />
    </>
  );
}

function FocusCard({
  card: cardData,
  index: cardIndex,
  hoveredIndex,
  onCardClick,
  onHoverStart,
  onHoverEnd,
}: {
  card: FocusCard;
  index: number;
  hoveredIndex: number | null;
  onCardClick?: (card: FocusCard, index: number) => void;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
}) {
  return (
    <motion.div
      className="group relative cursor-pointer"
      key={cardData.id}
      onClick={() => onCardClick?.(cardData, cardIndex)}
      onHoverEnd={onHoverEnd}
      onHoverStart={() => onHoverStart(cardIndex)}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Card container */}
      <motion.div
        animate={{
          filter: getCardFilter(hoveredIndex, cardIndex),
          scale: getCardScale(hoveredIndex, cardIndex),
        }}
        className="relative h-80 overflow-hidden rounded-2xl"
        transition={{ duration: 0.3 }}
      >
        <CardImage card={cardData} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <CardContent
          card={cardData}
          currentIndex={cardIndex}
          hoveredIndex={hoveredIndex}
        />

        <CardEffects currentIndex={cardIndex} hoveredIndex={hoveredIndex} />
      </motion.div>

      {/* 3D shadow effect */}
      <motion.div
        animate={{
          x: getShadowX(hoveredIndex, cardIndex),
          y: getShadowY(hoveredIndex, cardIndex),
          opacity: getShadowOpacity(hoveredIndex, cardIndex),
        }}
        className="-z-10 absolute inset-0 rounded-2xl bg-black/20"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function FocusCards({
  cards,
  className = '',
  onCardClick,
}: FocusCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Background blur overlay */}
      <motion.div
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
        className="absolute inset-0 rounded-3xl bg-black/20 backdrop-blur-sm"
        transition={{ duration: 0.3 }}
      />

      {/* Spotlight effect */}
      {hoveredIndex !== null && (
        <motion.div
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute inset-0 rounded-3xl"
          initial={{ opacity: 0 }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(30, 155, 113, 0.15), transparent 40%)`,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <FocusCard
            card={card}
            hoveredIndex={hoveredIndex}
            index={index}
            key={card.id}
            onCardClick={onCardClick}
            onHoverEnd={() => setHoveredIndex(null)}
            onHoverStart={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
}
