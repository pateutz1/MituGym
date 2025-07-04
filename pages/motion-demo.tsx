import { motion } from 'motion/react'
import { useRef } from 'react'
import ScrollProgress from '@/components/ui/scroll-progress'
import ExpandableCard from '@/components/ui/expandable-card'
import DraggableCard from '@/components/ui/draggable-card'
import MagneticButton from '@/components/ui/magnetic-button'
import StaggeredList from '@/components/ui/staggered-list'

// Import optimized lazy-loaded components
import {
  LazyScrollLinkedAnimations,
  LazyScrollLinkedBackground,
  LazyScrollLinkedTextReveal,
  LazyScrollLinkedParallaxLayers,
  LazyScrollLinkedCounter,
  LazyDynamicGrid,
  LazySharedLayoutTransitions,
  LazyAnimatedTabs,
  LazyReorderableList,
  LazyPhysicsSpring,
  LazyMouseTracker,
  LazyTransformChains,
  LazyGesturePhysics,
  LazyPhysicsSimulation,
  LazyVariantsShowcase,
  LazyStaggeredPatterns,
  LazyOrchestratedAnimations,
  LazyCoordinatedSequence,
  preloadCriticalComponents
} from '@/components/ui/lazy-motion-components'

// Import accessibility and performance monitoring
import { useReducedMotion, useMotionConfig } from '@/hooks/useReducedMotion'
import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { PerformanceMonitor } from '@/components/ui/performance-monitor'
import { useEffect } from 'react'

export default function MotionDemo() {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const motionConfig = useMotionConfig()
  const { startTracking, endTracking } = useAnimationPerformance('MotionDemo')

  // Preload critical components on mount
  useEffect(() => {
    preloadCriticalComponents()
  }, [])

  const features = [
    "Enhanced scroll-linked animations with multiple transforms",
    "Advanced layout animations with smooth transitions",
    "Complex physics simulations with real-time controls",
    "Sophisticated variant systems for coordinated animations",
    "Interactive gesture-based physics demonstrations",
    "Multi-layered parallax effects with spring physics",
    "Dynamic content with automatic layout transitions"
  ]

  const expandableCards = [
    {
      title: "Scroll-Linked Animations",
      summary: "Advanced scroll-driven effects with physics",
      content: "Enhanced scroll animations using Motion's useScroll hook with multiple transform values, spring physics, and complex interpolations for smooth, performance-optimized effects."
    },
    {
      title: "Layout Animations",
      summary: "Automatic layout transitions with shared elements",
      content: "Sophisticated layout animations using Motion's layout prop with shared element transitions, dynamic grids, and seamless state changes without manual calculations."
    },
    {
      title: "Advanced Physics",
      summary: "Real-time physics with interactive controls",
      content: "Complex physics simulations including gravity, momentum, elasticity, and collision detection with real-time parameter adjustments and visual feedback."
    },
    {
      title: "Variant Systems",
      summary: "Coordinated animations with staggered effects",
      content: "Powerful variant system enabling complex choreographed animations with multiple stagger patterns, orchestrated sequences, and coordinated element behaviors."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <LazyScrollLinkedBackground />
      <LazyScrollLinkedParallaxLayers />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Performance Monitor - only in development */}
      <PerformanceMonitor 
        showDebugInfo={process.env.NODE_ENV === 'development'} 
        position="bottom-right" 
      />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Enhanced Header */}
        <LazyScrollLinkedTextReveal className="text-center mb-16">
                      <motion.header 
            className="space-y-6"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? motionConfig.fade : { duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(30, 155, 113, 0.2)' }}
            >
              <span className="text-primary font-medium">🚀 Advanced Motion Features</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <motion.span
                className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Motion.dev
              </motion.span>{' '}
              <br />Enhanced Demo
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Experience the full power of Motion&apos;s hybrid animation engine with advanced 
              scroll effects, layout transitions, physics simulations, and coordinated animations.
            </p>
            
            <LazyScrollLinkedCounter target={100} className="text-center" />
          </motion.header>
        </LazyScrollLinkedTextReveal>

        {/* Enhanced Features List */}
        <section className="mb-20">
          <LazyScrollLinkedAnimations>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Advanced Features
            </motion.h2>
            <StaggeredList items={features} />
          </LazyScrollLinkedAnimations>
        </section>

        {/* Expandable Cards Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Feature Overview
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {expandableCards.map((card, index) => (
              <ExpandableCard
                key={index}
                title={card.title}
                summary={card.summary}
                content={card.content}
              />
            ))}
          </div>
        </section>

        {/* Scroll-Linked Animations Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            1. Enhanced Scroll Animations
          </motion.h2>
          
          <div className="space-y-12">
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Multi-Transform Scroll Effects</h3>
              <LazyScrollLinkedAnimations>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-primary/20 p-6 rounded-lg text-center">
                      <div className="text-2xl mb-2">🎯</div>
                      <p className="text-sm">Scroll Effect {i}</p>
                    </div>
                  ))}
                </div>
              </LazyScrollLinkedAnimations>
            </div>
          </div>
        </section>

        {/* Layout Animations Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            2. Advanced Layout Animations
          </motion.h2>
          
          <div className="space-y-12">
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Dynamic Grid with Shared Elements</h3>
              <LazyDynamicGrid />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Shared Layout Transitions</h3>
              <LazySharedLayoutTransitions />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Animated Tab System</h3>
              <LazyAnimatedTabs />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Reorderable List</h3>
              <LazyReorderableList />
            </div>
          </div>
        </section>

        {/* Advanced Physics Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            3. Advanced Physics & Transform Values
          </motion.h2>
          
          <div className="space-y-12">
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Physics-Based Springs</h3>
              <LazyPhysicsSpring />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Mouse Tracking with Physics</h3>
              <LazyMouseTracker />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Complex Transform Chains</h3>
              <LazyTransformChains />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Gesture-Based Physics</h3>
              <LazyGesturePhysics />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Real-Time Physics Simulation</h3>
              <LazyPhysicsSimulation />
            </div>
          </div>
        </section>

        {/* Variants & Staggered Animations Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            4. Variants & Staggered Animations
          </motion.h2>
          
          <div className="space-y-12">
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Complex Variant System</h3>
              <LazyVariantsShowcase />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Staggered Animation Patterns</h3>
              <LazyStaggeredPatterns />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Orchestrated Animations</h3>
              <LazyOrchestratedAnimations />
            </div>
            
            <div className="bg-surface/20 rounded-xl p-8 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-primary">Coordinated Sequence</h3>
              <LazyCoordinatedSequence />
            </div>
          </div>
        </section>

        {/* Original Draggable Cards Section - Enhanced */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            5. Interactive Drag Gestures
          </motion.h2>
          <div 
            ref={constraintsRef}
            className="relative h-96 bg-surface/20 rounded-xl border border-white/10 overflow-hidden"
          >
            <p className="absolute top-4 left-4 text-white/60 text-sm">
              Drag the cards around! They have physics and constraints.
            </p>
            
            <DraggableCard 
              constraintsRef={constraintsRef}
              className="absolute top-16 left-8"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Enhanced Card 1</h3>
              <p className="text-white/70">Advanced drag physics with momentum!</p>
            </DraggableCard>
            
            <DraggableCard 
              constraintsRef={constraintsRef}
              className="absolute top-16 right-8"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Enhanced Card 2</h3>
              <p className="text-white/70">Smooth spring animations on drag!</p>
            </DraggableCard>
            
            <DraggableCard 
              constraintsRef={constraintsRef}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Enhanced Card 3</h3>
              <p className="text-white/70">Elastic constraints with physics!</p>
            </DraggableCard>
          </div>
        </section>

        {/* Enhanced Magnetic Buttons Section */}
        <section className="mb-20">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            6. Enhanced Magnetic Interactions
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton strength={0.2}>
              Subtle Magnetic
            </MagneticButton>
            <MagneticButton strength={0.4}>
              Medium Magnetic
            </MagneticButton>
            <MagneticButton strength={0.6}>
              Strong Magnetic
            </MagneticButton>
            <MagneticButton strength={0.8}>
              Ultra Magnetic
            </MagneticButton>
          </div>
          <p className="text-center text-white/60 mt-6">
            Hover over the buttons to experience different magnetic field strengths!
          </p>
        </section>

        {/* Footer */}
        <motion.footer 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Implement These Features?
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              All these advanced animations are powered by Motion.dev&apos;s hybrid engine, 
              combining the best of CSS and JavaScript animations for optimal performance.
              Features lazy loading, reduced motion support, and real-time performance monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton strength={0.3}>
                View Documentation
              </MagneticButton>
              <MagneticButton 
                className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
                strength={0.2}
              >
                Get Started
              </MagneticButton>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
} 