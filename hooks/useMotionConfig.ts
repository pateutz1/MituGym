import { Variants } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

export interface MotionConfig {
  spring: {
    type: 'spring';
    stiffness: number;
    damping: number;
    mass: number;
  };
  fade: {
    duration: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  };
  slideUp: {
    duration: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  };
  slideDown: {
    duration: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  };
  scale: {
    duration: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  };
  rotate: {
    duration: number;
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  };
}

// Define proper types for motion variants
export interface MotionVariant {
  x?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  opacity?: number;
  [key: string]: unknown;
}

// Use the motion library's Variants type instead of our custom one
export type MotionVariants = Variants;

export function useMotionConfig(): MotionConfig {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      spring: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1,
      },
      fade: {
        duration: 0.01,
        ease: 'linear',
      },
      slideUp: {
        duration: 0.01,
        ease: 'linear',
      },
      slideDown: {
        duration: 0.01,
        ease: 'linear',
      },
      scale: {
        duration: 0.01,
        ease: 'linear',
      },
      rotate: {
        duration: 0.01,
        ease: 'linear',
      },
    };
  }

  return {
    spring: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 1,
    },
    fade: {
      duration: 0.6,
      ease: 'easeOut',
    },
    slideUp: {
      duration: 0.6,
      ease: 'easeOut',
    },
    slideDown: {
      duration: 0.6,
      ease: 'easeOut',
    },
    scale: {
      duration: 0.4,
      ease: 'easeOut',
    },
    rotate: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  };
}

// Helper function to remove rotation properties
const removeRotationProperties = (variant: MotionVariant): void => {
  variant.rotate = undefined;
  variant.rotateX = undefined;
  variant.rotateY = undefined;
  variant.rotateZ = undefined;
};

// Helper function to remove scale properties
const removeScaleProperties = (variant: MotionVariant): void => {
  variant.scale = undefined;
  variant.scaleX = undefined;
  variant.scaleY = undefined;
};

// Helper function to reduce movement values
const reduceMovementValues = (variant: MotionVariant): void => {
  if (variant.y && Math.abs(variant.y) > 20) {
    variant.y = variant.y > 0 ? 10 : -10;
  }
  if (variant.x && Math.abs(variant.x) > 20) {
    variant.x = variant.x > 0 ? 10 : -10;
  }
};

// Helper function to process a single variant
const processVariantForAccessibility = (variant: MotionVariant): void => {
  removeRotationProperties(variant);
  removeScaleProperties(variant);
  reduceMovementValues(variant);
};

export function useAccessibleVariants(
  variants: Variants
): Variants {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    // Remove potentially problematic animations
    const accessibleVariants = { ...variants };

    // Use for...of instead of forEach for better performance
    for (const key of Object.keys(accessibleVariants)) {
      const variant = accessibleVariants[key];
      if (typeof variant === 'object' && variant !== null) {
        processVariantForAccessibility(variant as MotionVariant);
      }
    }

    return accessibleVariants;
  }

  return variants;
}

// Helper function for creating accessible variants without using hooks
export function createAccessibleVariants(
  variants: Variants
): Variants {
  // This is a helper function that can be used outside React components
  // It doesn't use hooks and just returns the variants as-is
  return variants;
}
