import type React from 'react';
import { useEffect, useState } from 'react';
import { Variants, type Variant } from 'motion/react';
import type { MotionVariant } from './useMotionConfig';

// Core hook for detecting reduced motion preference
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// Enhanced accessibility preferences
export interface AccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersReducedData: boolean;
}

export function useAccessibilityPreferences(): AccessibilityPreferences {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersReducedData: false,
  });

  useEffect(() => {
    const queries = {
      prefersReducedMotion: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ),
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)'),
      prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)'),
    };

    const handleChange = () => {
      setPreferences({
        prefersReducedMotion: queries.prefersReducedMotion.matches,
        prefersHighContrast: queries.prefersHighContrast.matches,
        prefersReducedData: queries.prefersReducedData.matches,
      });
    };

    // Set initial values
    handleChange();

    // Add listeners using for...of for better performance
    for (const query of Object.values(queries)) {
      query.addEventListener('change', handleChange);
    }

    // Cleanup
    return () => {
      for (const query of Object.values(queries)) {
        query.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return preferences;
}

// Helper function to create reduced motion variant
const createReducedMotionVariant = (variant: MotionVariant): MotionVariant => {
  return {
    ...variant,
    transition: { duration: 0.01 },
    // Remove complex transforms that might cause motion sickness
    rotate: undefined,
    rotateX: undefined,
    rotateY: undefined,
    rotateZ: undefined,
    // Keep position and opacity changes but make them instant
    scale: variant.scale,
    x: variant.x,
    y: variant.y,
    opacity: variant.opacity,
  };
};

// Safe animation variants that respect reduced motion (custom hook)
export function useAccessibleVariants(
  normalVariants: Variants,
  reducedVariants?: Variants
): Variants {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion && reducedVariants) {
    return reducedVariants;
  }

  if (prefersReducedMotion) {
    // Create reduced motion versions of normal variants
    const reducedMotionVariants: Variants = {};

    // Use for...of instead of forEach for better performance
    for (const key of Object.keys(normalVariants)) {
      const variant = normalVariants[key];
      if (typeof variant === 'object' && variant !== null) {
        reducedMotionVariants[key] = createReducedMotionVariant(
          variant as MotionVariant
        ) as Variant;
      } else {
        reducedMotionVariants[key] = variant;
      }
    }

    return reducedMotionVariants;
  }

  return normalVariants;
}

// Note: createAccessibleVariants is now exported from useMotionConfig.ts

// Component wrapper interface for accessible motion (implementation moved to separate component file)
export interface AccessibleMotionOptions<T> {
  fallbackComponent?: React.ComponentType<T>;
  disableOnReducedMotion?: boolean;
}

// Define proper types for animation props
interface AnimationProps {
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  transition?: {
    duration?: number;
    type?: string;
    [key: string]: unknown;
  };
  animate?: {
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

// Utility to get safe animation properties
export function getSafeAnimationProps(
  prefersReducedMotion: boolean,
  animationProps: AnimationProps
): AnimationProps {
  if (!prefersReducedMotion) {
    return animationProps;
  }

  // Remove or simplify problematic animations
  const safeProps = { ...animationProps };

  // Remove rotation animations
  safeProps.rotate = undefined;
  safeProps.rotateX = undefined;
  safeProps.rotateY = undefined;
  safeProps.rotateZ = undefined;

  // Simplify transitions
  if (safeProps.transition) {
    safeProps.transition = { duration: 0.01 };
  }

  // Remove spring physics
  if (safeProps.transition?.type === 'spring') {
    safeProps.transition = { duration: 0.01 };
  }

  // Keep position and opacity but make them instant
  if (safeProps.animate) {
    // Use for...of instead of forEach for better performance
    for (const key of Object.keys(safeProps.animate)) {
      if (key === 'transition') {
        safeProps.animate[key] = { duration: 0.01 };
      }
    }
  }

  return safeProps;
}

// Global motion settings
export const MOTION_SETTINGS = {
  // Reduced motion fallbacks
  REDUCED_MOTION: {
    transition: { duration: 0.01 },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Safe animations that work well with reduced motion
  SAFE_ANIMATIONS: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  },
};

// CSS class generator for reduced motion
export function getMotionClasses(prefersReducedMotion: boolean) {
  return {
    transition: prefersReducedMotion
      ? 'transition-none'
      : 'transition-all duration-300',
    transform: prefersReducedMotion ? '' : 'transform',
    animation: prefersReducedMotion ? '' : 'animate-in',
  };
}
