'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface TestimonialsMarqueeProps {
  testimonials: Testimonial[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
}

const TestimonialsMarquee = ({
  testimonials,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: TestimonialsMarqueeProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPlaying(false);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPlaying(true);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        key={i}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <motion.div
      className="group mx-4 w-80 flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20"
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 flex items-center space-x-1">
        {renderStars(testimonial.rating)}
      </div>

      <p className="mb-4 text-sm text-white/90 leading-relaxed transition-colors group-hover:text-white">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1e9b71] to-[#16a085]">
          <span className="font-semibold text-sm text-white">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-sm text-white">{testimonial.name}</p>
          <p className="text-white/60 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <motion.div
        animate={{
          x: direction === 'left' ? -containerWidth : containerWidth,
        }}
        className="flex"
        style={{
          animationPlayState: isPlaying ? 'running' : 'paused',
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'loop',
        }}
      >
        {/* First set of testimonials */}
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}

        {/* Duplicate set for seamless loop */}
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={`duplicate-${testimonial.id}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-gray-950 to-transparent" />
    </div>
  );
};

export default TestimonialsMarquee;
