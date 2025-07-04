import { useEffect, useRef, useState } from 'react'

interface ParallaxOptions {
  speed?: number
  offset?: number
  disable?: boolean
}

export const useParallax = <T extends HTMLElement = HTMLElement>(options: ParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0, disable = false } = options
  const [transform, setTransform] = useState('')
  const elementRef = useRef<T>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (disable || !elementRef.current) return

    const element = elementRef.current
    let ticking = false

    const updateTransform = () => {
      if (!element) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // Calculate if element is in viewport
      const inViewport = elementTop < windowHeight && elementTop + elementHeight > 0
      
      if (inViewport) {
        // Calculate parallax offset
        const scrolled = windowHeight - elementTop
        const parallaxOffset = (scrolled * speed) + offset
        
        setTransform(`translateY(${parallaxOffset}px)`)
      }
      
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateTransform)
        ticking = true
      }
    }

    // Initial calculation
    updateTransform()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [speed, offset, disable])

  return {
    ref: elementRef,
    transform
  }
}

// Hook for multiple parallax elements with different speeds
export const useMultiParallax = () => {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    let ticking = false

    const updateScrollY = () => {
      setScrollY(window.scrollY)
      document.documentElement.style.setProperty('--scroll-y', window.scrollY.toString())
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateScrollY)
        ticking = true
      }
    }

    // Initial value
    updateScrollY()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return scrollY
}

// Hook for intersection-based parallax
export const useIntersectionParallax = <T extends HTMLElement = HTMLElement>(options: ParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0 } = options
  const [isVisible, setIsVisible] = useState(false)
  const [transform, setTransform] = useState('')
  const elementRef = useRef<T>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    // Intersection Observer for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    )

    observer.observe(element)

    // Scroll handler for parallax effect
    let ticking = false

    const updateTransform = () => {
      if (!element || !isVisible) return

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      
      const scrolled = windowHeight - elementTop
      const parallaxOffset = (scrolled * speed) + offset
      
      setTransform(`translateY(${parallaxOffset}px)`)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking && isVisible) {
        rafRef.current = requestAnimationFrame(updateTransform)
        ticking = true
      }
    }

    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isVisible, speed, offset])

  return {
    ref: elementRef,
    transform,
    isVisible
  }
} 