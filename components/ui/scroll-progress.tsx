import { motion, useScroll } from 'motion/react';

interface ScrollProgressProps {
  className?: string;
}

export default function ScrollProgress({
  className = '',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-primary ${className}`}
      style={{ scaleX: scrollYProgress }}
    />
  );
}
