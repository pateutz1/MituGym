import { useReducedMotion } from './useReducedMotion'

export interface MotionConfig {
  spring: {
    type: 'spring'
    stiffness: number
    damping: number
    mass: number
  }
  fade: {
    duration: number
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  }
  slideUp: {
    duration: number
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  }
  slideDown: {
    duration: number
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  }
  scale: {
    duration: number
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  }
  rotate: {
    duration: number
    ease: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'
  }
}

export function useMotionConfig(): MotionConfig {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return {
      spring: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 1
      },
      fade: {
        duration: 0.01,
        ease: 'linear'
      },
      slideUp: {
        duration: 0.01,
        ease: 'linear'
      },
      slideDown: {
        duration: 0.01,
        ease: 'linear'
      },
      scale: {
        duration: 0.01,
        ease: 'linear'
      },
      rotate: {
        duration: 0.01,
        ease: 'linear'
      }
    }
  }

  return {
    spring: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 1
    },
    fade: {
      duration: 0.6,
      ease: 'easeOut'
    },
    slideUp: {
      duration: 0.6,
      ease: 'easeOut'
    },
    slideDown: {
      duration: 0.6,
      ease: 'easeOut'
    },
    scale: {
      duration: 0.4,
      ease: 'easeOut'
    },
    rotate: {
      duration: 0.8,
      ease: 'easeInOut'
    }
  }
}

export function createAccessibleVariants(variants: any) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion) {
    // Remove potentially problematic animations
    const accessibleVariants = { ...variants }
    
    Object.keys(accessibleVariants).forEach(key => {
      const variant = accessibleVariants[key]
      if (typeof variant === 'object') {
        // Remove rotation and complex transforms
        delete variant.rotate
        delete variant.rotateX
        delete variant.rotateY
        delete variant.rotateZ
        delete variant.scale
        delete variant.scaleX
        delete variant.scaleY
        
        // Reduce movement
        if (variant.y && Math.abs(variant.y) > 20) {
          variant.y = variant.y > 0 ? 10 : -10
        }
        if (variant.x && Math.abs(variant.x) > 20) {
          variant.x = variant.x > 0 ? 10 : -10
        }
      }
    })
    
    return accessibleVariants
  }
  
  return variants
} 