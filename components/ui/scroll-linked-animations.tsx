import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface ScrollLinkedAnimationsProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollLinkedAnimations({
  children,
  className = '',
}: ScrollLinkedAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll tracking with multiple targets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Multiple transform values for different effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Spring physics for smooth animations
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 200, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 150, damping: 25 });

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <motion.div
        className="transform-gpu"
        style={{
          y: smoothY,
          scale: smoothScale,
          rotate: smoothRotate,
          opacity,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Scroll-linked background component
export function ScrollLinkedBackground() {
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <motion.div
      className="-z-10 fixed inset-0 opacity-20"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, rgba(30, 155, 113, 0.3) 0%, transparent 70%)',
        backgroundPosition: backgroundY,
        scale: backgroundScale,
        rotate: backgroundRotate,
      }}
    />
  );
}

// Scroll-linked text reveal
export function ScrollLinkedTextReveal({
  children,
  className = '',
}: ScrollLinkedAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <motion.div className="transform-gpu" style={{ clipPath }}>
        {children}
      </motion.div>
    </div>
  );
}

// Scroll-linked parallax layers
export function ScrollLinkedParallaxLayers() {
  const { scrollYProgress } = useScroll();

  const layer1Y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  return (
    <div className="-z-10 fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10"
        style={{ y: layer1Y }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 to-pink-500/5"
        style={{ y: layer2Y }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-teal-500/5"
        style={{ y: layer3Y }}
      />
    </div>
  );
}

// Scroll-linked counter with physics
export function ScrollLinkedCounter({
  target = 100,
  className = '',
}: {
  target?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const count = useTransform(scrollYProgress, [0, 1], [0, target]);
  const smoothCount = useSpring(count, { stiffness: 100, damping: 30 });

  return (
    <div className={className} ref={containerRef}>
      <motion.div className="font-bold text-4xl text-primary">
        {smoothCount.get().toFixed(0)}
      </motion.div>
    </div>
  );
}
