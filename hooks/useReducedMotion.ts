import { useState, useEffect } from 'react'
import React from 'react'

// Hook to detect reduced motion preference
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    // Create media query to check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

// Enhanced hook with additional accessibility options
export function useAccessibilityPreferences() {
  const [preferences, setPreferences] = useState({
    prefersReducedMotion: false,
    prefersReducedTransparency: false,
    prefersHighContrast: false,
    prefersReducedData: false
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const queries = {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      prefersReducedTransparency: window.matchMedia('(prefers-reduced-transparency: reduce)'),
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)'),
      prefersReducedData: window.matchMedia('(prefers-reduced-data: reduce)')
    }

    // Set initial values
    setPreferences({
      prefersReducedMotion: queries.prefersReducedMotion.matches,
      prefersReducedTransparency: queries.prefersReducedTransparency.matches,
      prefersHighContrast: queries.prefersHighContrast.matches,
      prefersReducedData: queries.prefersReducedData.matches
    })

    // Listen for changes
    const handleChange = () => {
      setPreferences({
        prefersReducedMotion: queries.prefersReducedMotion.matches,
        prefersReducedTransparency: queries.prefersReducedTransparency.matches,
        prefersHighContrast: queries.prefersHighContrast.matches,
        prefersReducedData: queries.prefersReducedData.matches
      })
    }

    // Add listeners
    Object.values(queries).forEach(query => {
      query.addEventListener('change', handleChange)
    })

    // Cleanup
    return () => {
      Object.values(queries).forEach(query => {
        query.removeEventListener('change', handleChange)
      })
    }
  }, [])

  return preferences
}

// Animation configuration based on motion preferences
export function useMotionConfig() {
  const prefersReducedMotion = useReducedMotion()

  return {
    // Transition configurations
    spring: prefersReducedMotion 
      ? { type: 'tween' as const, duration: 0.01 }
      : { type: 'spring' as const, stiffness: 300, damping: 30 },
    
    fade: prefersReducedMotion
      ? { duration: 0.01 }
      : { duration: 0.3 },
    
    slide: prefersReducedMotion
      ? { duration: 0.01 }
      : { type: 'spring' as const, stiffness: 400, damping: 25 },
    
    scale: prefersReducedMotion
      ? { duration: 0.01 }
      : { type: 'spring' as const, stiffness: 500, damping: 30 },

    // Stagger configurations
    stagger: prefersReducedMotion
      ? { staggerChildren: 0.01, delayChildren: 0 }
      : { staggerChildren: 0.1, delayChildren: 0.2 },

    // Complex animations
    complex: prefersReducedMotion
      ? { duration: 0.01 }
      : { type: 'spring' as const, stiffness: 200, damping: 20, duration: 0.6 },

    // Hover effects
    hover: prefersReducedMotion
      ? { scale: 1, transition: { duration: 0.01 } }
      : { scale: 1.05, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } },

    // Tap effects
    tap: prefersReducedMotion
      ? { scale: 1, transition: { duration: 0.01 } }
      : { scale: 0.95, transition: { duration: 0.1 } }
  }
}

// Safe animation variants that respect reduced motion
export function createAccessibleVariants(normalVariants: any, reducedVariants?: any) {
  const prefersReducedMotion = useReducedMotion()
  
  if (prefersReducedMotion && reducedVariants) {
    return reducedVariants
  }
  
  if (prefersReducedMotion) {
    // Create reduced motion versions of normal variants
    const reducedMotionVariants: any = {}
    
    Object.keys(normalVariants).forEach(key => {
      const variant = normalVariants[key]
      if (typeof variant === 'object') {
        reducedMotionVariants[key] = {
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
          opacity: variant.opacity
        }
      } else {
        reducedMotionVariants[key] = variant
      }
    })
    
    return reducedMotionVariants
  }
  
  return normalVariants
}

// Component wrapper interface for accessible motion (implementation moved to separate component file)
export interface AccessibleMotionOptions<T> {
  fallbackComponent?: React.ComponentType<T>
  disableOnReducedMotion?: boolean
}

// Utility to get safe animation properties
export function getSafeAnimationProps(prefersReducedMotion: boolean, animationProps: any) {
  if (!prefersReducedMotion) {
    return animationProps
  }

  // Remove or simplify problematic animations
  const safeProps = { ...animationProps }
  
  // Remove rotation animations
  delete safeProps.rotate
  delete safeProps.rotateX
  delete safeProps.rotateY
  delete safeProps.rotateZ
  
  // Simplify transitions
  if (safeProps.transition) {
    safeProps.transition = { duration: 0.01 }
  }
  
  // Remove spring physics
  if (safeProps.transition?.type === 'spring') {
    safeProps.transition = { duration: 0.01 }
  }
  
  // Keep position and opacity but make them instant
  if (safeProps.animate) {
    Object.keys(safeProps.animate).forEach(key => {
      if (key === 'transition') {
        safeProps.animate[key] = { duration: 0.01 }
      }
    })
  }
  
  return safeProps
}

// Global motion settings
export const MOTION_SETTINGS = {
  // Reduced motion fallbacks
  REDUCED_MOTION: {
    transition: { duration: 0.01 },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  // Safe animations that work well with reduced motion
  SAFE_ANIMATIONS: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    }
  }
}

// CSS class generator for reduced motion
export function getMotionClasses(prefersReducedMotion: boolean) {
  return {
    transition: prefersReducedMotion ? 'transition-none' : 'transition-all duration-300',
    transform: prefersReducedMotion ? '' : 'transform',
    animation: prefersReducedMotion ? '' : 'animate-in'
  }
} 