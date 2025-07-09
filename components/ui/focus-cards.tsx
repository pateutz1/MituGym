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
          <motion.div
            className="group relative cursor-pointer"
            key={card.id}
            onClick={() => onCardClick?.(card, index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onHoverStart={() => setHoveredIndex(index)}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Card container */}
            <motion.div
              animate={{
                filter:
                  hoveredIndex === null || hoveredIndex === index
                    ? 'blur(0px)'
                    : 'blur(8px)',
                scale:
                  hoveredIndex === index
                    ? 1.05
                    : hoveredIndex === null
                      ? 1
                      : 0.95,
              }}
              className="relative h-80 overflow-hidden rounded-2xl"
              transition={{ duration: 0.3 }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  alt={card.alt}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={card.src}
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute right-0 bottom-0 left-0 p-6">
                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.7,
                    y: hoveredIndex === index ? 0 : 10,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Category badge */}
                  {card.category && (
                    <motion.span
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        scale: hoveredIndex === index ? 1 : 0.8,
                      }}
                      className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/20 px-3 py-1 font-semibold text-primary text-xs backdrop-blur-sm"
                      transition={{ duration: 0.3 }}
                    >
                      {card.category}
                    </motion.span>
                  )}

                  {/* Title */}
                  <h3 className="mb-2 line-clamp-1 font-bold text-white text-xl">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm text-white/80">
                    {card.description}
                  </p>
                </motion.div>
              </div>

              {/* Hover border effect */}
              <motion.div
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  scale: hoveredIndex === index ? 1 : 1.1,
                }}
                className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary/50"
                transition={{ duration: 0.3 }}
              />

              {/* Shine effect */}
              <motion.div
                animate={{
                  x: hoveredIndex === index ? '100%' : '-100%',
                }}
                className="-skew-x-12 absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                transition={{ duration: 0.6 }}
              />
            </motion.div>

            {/* 3D shadow effect */}
            <motion.div
              animate={{
                x: hoveredIndex === index ? 8 : 0,
                y: hoveredIndex === index ? 8 : 0,
                opacity: hoveredIndex === index ? 0.3 : 0,
              }}
              className="-z-10 absolute inset-0 rounded-2xl bg-black/20"
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
