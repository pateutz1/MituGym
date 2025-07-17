import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface SimpleTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  preferredPosition?: 'auto' | 'left' | 'right' | 'top' | 'bottom';
}

interface ViewportInfo {
  width: number;
  height: number;
  isMobile: boolean;
}

interface ElementRects {
  container: DOMRect;
  tooltip: DOMRect;
}

// Helper function to get viewport information
const getViewportInfo = (): ViewportInfo => ({
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth < 768,
});

// Helper function to calculate mobile position
const calculateMobilePosition = (
  rects: ElementRects,
  viewport: ViewportInfo
): 'top' | 'bottom' => {
  const { container, tooltip } = rects;

  // Check if there's space above
  if (container.top - tooltip.height - 10 < 0) {
    return 'bottom';
  }

  return 'top';
};

// Helper function to calculate desktop position
const calculateDesktopPosition = (
  rects: ElementRects,
  viewport: ViewportInfo
): 'top' | 'bottom' | 'left' | 'right' => {
  const { container, tooltip } = rects;

  // Check if there's space above
  if (container.top - tooltip.height - 10 < 0) {
    return 'bottom';
  }

  // Check if there's space on sides for wider tooltips
  if (container.left + tooltip.width / 2 > viewport.width - 20) {
    return 'left';
  }

  if (container.right - tooltip.width / 2 < 20) {
    return 'right';
  }

  return 'top';
};

// Helper function to determine optimal tooltip position
const calculateTooltipPosition = (
  containerRef: React.RefObject<HTMLButtonElement>,
  tooltipRef: React.RefObject<HTMLDivElement>
): 'top' | 'bottom' | 'left' | 'right' => {
  if (!(containerRef.current && tooltipRef.current)) {
    return 'top';
  }

  const viewport = getViewportInfo();
  const rects: ElementRects = {
    container: containerRef.current.getBoundingClientRect(),
    tooltip: tooltipRef.current.getBoundingClientRect(),
  };

  if (viewport.isMobile) {
    return calculateMobilePosition(rects, viewport);
  }

  return calculateDesktopPosition(rects, viewport);
};

// Helper function to get position classes with mobile safety
const getPositionClasses = (
  position: 'top' | 'bottom' | 'left' | 'right'
): string => {
  const positions = {
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  };

  return positions[position];
};

// Helper function to get arrow classes
const getArrowClasses = (
  position: 'top' | 'bottom' | 'left' | 'right'
): string => {
  const arrows = {
    bottom:
      'bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900/95',
    left: 'left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900/95',
    right:
      'right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/95',
    top: 'top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95',
  };

  return arrows[position];
};

export default function SimpleTooltip({
  children,
  content,
  className = '',
  preferredPosition = 'auto',
}: SimpleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>(
    'top'
  );
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isVisible) {
      if (preferredPosition !== 'auto') {
        // Immediately set preferred position without calculation
        console.log('Setting preferred position:', preferredPosition);
        setPosition(preferredPosition as 'top' | 'bottom' | 'left' | 'right');
      } else {
        // Small delay to ensure tooltip is rendered and has dimensions for auto positioning
        const timeoutId = setTimeout(() => {
          const newPosition = calculateTooltipPosition(containerRef, tooltipRef);
          setPosition(newPosition);
        }, 10);
        
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isVisible, preferredPosition]);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);

  return (
    <button
      className={`relative inline-block ${className}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsVisible(!isVisible);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      type="button"
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`absolute ${getPositionClasses(position)} pointer-events-none z-[9999]`}
            exit={{
              opacity: 0,
              scale: 0.8,
              y: position === 'bottom' ? -10 : 10,
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
              y: position === 'bottom' ? -10 : 10,
            }}
            ref={tooltipRef}
            style={{
              // Only apply dynamic positioning for 'auto' mode
              ...(preferredPosition === 'auto' && typeof window !== 'undefined' && window.innerWidth < 768 && containerRef.current
                ? (() => {
                    const rect = containerRef.current.getBoundingClientRect();
                    const rightEdge = rect.right;
                    const screenWidth = window.innerWidth;
                    const tooltipWidth = 260; // base width
                    
                    // If the tooltip would overflow on the right
                    if (rightEdge + tooltipWidth / 2 > screenWidth - 20) {
                      return {
                        left: 'auto',
                        right: '0',
                        transform: position.includes('bottom') || position.includes('top') 
                          ? 'translateX(-20px)' 
                          : 'translateX(-20px) translateY(-50%)'
                      };
                    }
                    
                    // If the tooltip would overflow on the left
                    if (rect.left - tooltipWidth / 2 < 20) {
                      return {
                        left: '0',
                        right: 'auto',
                        transform: position.includes('bottom') || position.includes('top') 
                          ? 'translateX(20px)' 
                          : 'translateX(20px) translateY(-50%)'
                      };
                    }
                    
                    return {};
                  })()
                : {}),
            }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-[260px] rounded-lg border border-white/20 bg-gray-900/95 px-6 py-4 text-white text-xs leading-relaxed shadow-xl backdrop-blur-sm sm:w-[300px] sm:text-sm md:w-[320px] md:text-sm lg:w-[340px] lg:text-base max-w-[calc(100vw-2rem)]">
              {content}
            </div>
            {/* Arrow */}
            <div className={`absolute ${getArrowClasses(position)}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
