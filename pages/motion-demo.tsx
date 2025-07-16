import { motion } from 'motion/react';
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
// import { PerformanceMonitor } from '@/components/ui/performance-monitor'
import { useEffect, useRef } from 'react';
import DraggableCard from '@/components/ui/draggable-card';
import ExpandableCard from '@/components/ui/expandable-card';
// Import optimized lazy-loaded components
import {
  LazyAnimatedTabs,
  LazyCoordinatedSequence,
  LazyDynamicGrid,
  LazyGesturePhysics,
  LazyMouseTracker,
  LazyOrchestratedAnimations,
  LazyPhysicsSimulation,
  LazyPhysicsSpring,
  LazyReorderableList,
  LazyScrollLinkedAnimations,
  LazyScrollLinkedBackground,
  LazyScrollLinkedCounter,
  LazyScrollLinkedParallaxLayers,
  LazyScrollLinkedTextReveal,
  LazySharedLayoutTransitions,
  LazyStaggeredPatterns,
  LazyTransformChains,
  LazyVariantsShowcase,
  preloadCriticalComponents,
} from '@/components/ui/lazy-motion-components';
import MagneticButton from '@/components/ui/magnetic-button';
import ScrollProgress from '@/components/ui/scroll-progress';
import StaggeredList from '@/components/ui/staggered-list';
// Import accessibility and performance monitoring
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMotionConfig } from '@/hooks/useMotionConfig';

export default function MotionDemo() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionConfig = useMotionConfig();
  // const { startTracking, endTracking } = useAnimationPerformance('MotionDemo')

  // Preload critical components on mount
  useEffect(() => {
    preloadCriticalComponents();
  }, []);

  const features = [
    'Enhanced scroll-linked animations with multiple transforms',
    'Advanced layout animations with smooth transitions',
    'Complex physics simulations with real-time controls',
    'Sophisticated variant systems for coordinated animations',
    'Interactive gesture-based physics demonstrations',
    'Multi-layered parallax effects with spring physics',
    'Dynamic content with automatic layout transitions',
  ];

  const expandableCards = [
    {
      title: 'Scroll-Linked Animations',
      summary: 'Advanced scroll-driven effects with physics',
      content:
        "Enhanced scroll animations using Motion's useScroll hook with multiple transform values, spring physics, and complex interpolations for smooth, performance-optimized effects.",
    },
    {
      title: 'Layout Animations',
      summary: 'Automatic layout transitions with shared elements',
      content:
        "Sophisticated layout animations using Motion's layout prop with shared element transitions, dynamic grids, and seamless state changes without manual calculations.",
    },
    {
      title: 'Advanced Physics',
      summary: 'Real-time physics with interactive controls',
      content:
        'Complex physics simulations including gravity, momentum, elasticity, and collision detection with real-time parameter adjustments and visual feedback.',
    },
    {
      title: 'Variant Systems',
      summary: 'Coordinated animations with staggered effects',
      content:
        'Powerful variant system enabling complex choreographed animations with multiple stagger patterns, orchestrated sequences, and coordinated element behaviors.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-white">
      {/* Enhanced Background Effects */}
      <LazyScrollLinkedBackground />
      <LazyScrollLinkedParallaxLayers />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Performance Monitor - Disabled */}
      {/* <PerformanceMonitor 
        showDebugInfo={process.env.NODE_ENV === 'development'} 
        position="bottom-right" 
      /> */}

      <div className="container relative z-10 mx-auto px-4 py-20">
        {/* Enhanced Header */}
        <LazyScrollLinkedTextReveal className="mb-16 text-center">
          <motion.header
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -50 }}
            transition={
              prefersReducedMotion ? motionConfig.fade : { duration: 0.8 }
            }
          >
            <motion.div
              className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-6 py-3"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(30, 155, 113, 0.2)',
              }}
            >
              <span className="font-medium text-primary">
                🚀 Advanced Motion Features
              </span>
            </motion.div>

            <h1 className="mb-6 font-bold text-5xl md:text-6xl lg:text-7xl">
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              >
                Motion.dev
              </motion.span>{' '}
              <br />
              Enhanced Demo
            </h1>

            <p className="mx-auto max-w-4xl text-white/70 text-xl leading-relaxed md:text-2xl">
              Experience the full power of Motion&apos;s hybrid animation engine
              with advanced scroll effects, layout transitions, physics
              simulations, and coordinated animations.
            </p>

            <LazyScrollLinkedCounter className="text-center" target={100} />
          </motion.header>
        </LazyScrollLinkedTextReveal>

        {/* Enhanced Features List */}
        <section className="mb-20">
          <LazyScrollLinkedAnimations>
            <motion.h2
              className="mb-8 text-center font-bold text-3xl md:text-4xl"
              initial={{ opacity: 0 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1 }}
            >
              Advanced Features
            </motion.h2>
            <StaggeredList items={features} />
          </LazyScrollLinkedAnimations>
        </section>

        {/* Expandable Cards Section */}
        <section className="mb-20">
          <motion.h2
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            Feature Overview
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2">
            {expandableCards.map((card, index) => (
              <ExpandableCard
                content={card.content}
                key={index}
                summary={card.summary}
                title={card.title}
              />
            ))}
          </div>
        </section>

        {/* Scroll-Linked Animations Section */}
        <section className="mb-20">
          <motion.h2
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            1. Enhanced Scroll Animations
          </motion.h2>

          <div className="space-y-12">
            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Multi-Transform Scroll Effects
              </h3>
              <LazyScrollLinkedAnimations>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      className="rounded-lg bg-primary/20 p-6 text-center"
                      key={i}
                    >
                      <div className="mb-2 text-2xl">🎯</div>
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
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            2. Advanced Layout Animations
          </motion.h2>

          <div className="space-y-12">
            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Dynamic Grid with Shared Elements
              </h3>
              <LazyDynamicGrid />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Shared Layout Transitions
              </h3>
              <LazySharedLayoutTransitions />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Animated Tab System
              </h3>
              <LazyAnimatedTabs />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Reorderable List
              </h3>
              <LazyReorderableList />
            </div>
          </div>
        </section>

        {/* Advanced Physics Section */}
        <section className="mb-20">
          <motion.h2
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            3. Advanced Physics & Transform Values
          </motion.h2>

          <div className="space-y-12">
            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Physics-Based Springs
              </h3>
              <LazyPhysicsSpring />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Mouse Tracking with Physics
              </h3>
              <LazyMouseTracker />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Complex Transform Chains
              </h3>
              <LazyTransformChains />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Gesture-Based Physics
              </h3>
              <LazyGesturePhysics />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Real-Time Physics Simulation
              </h3>
              <LazyPhysicsSimulation />
            </div>
          </div>
        </section>

        {/* Variants & Staggered Animations Section */}
        <section className="mb-20">
          <motion.h2
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            4. Variants & Staggered Animations
          </motion.h2>

          <div className="space-y-12">
            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Complex Variant System
              </h3>
              <LazyVariantsShowcase />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Staggered Animation Patterns
              </h3>
              <LazyStaggeredPatterns />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Orchestrated Animations
              </h3>
              <LazyOrchestratedAnimations />
            </div>

            <div className="rounded-xl border border-white/10 bg-surface/20 p-8">
              <h3 className="mb-4 font-semibold text-primary text-xl">
                Coordinated Sequence
              </h3>
              <LazyCoordinatedSequence />
            </div>
          </div>
        </section>

        {/* Original Draggable Cards Section - Enhanced */}
        <section className="mb-20">
          <motion.h2
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            5. Interactive Drag Gestures
          </motion.h2>
          <div
            className="relative h-96 overflow-hidden rounded-xl border border-white/10 bg-surface/20"
            ref={constraintsRef}
          >
            <p className="absolute top-4 left-4 text-sm text-white/60">
              Drag the cards around! They have physics and constraints.
            </p>

            <DraggableCard
              className="absolute top-16 left-8"
              constraintsRef={constraintsRef}
            >
              <h3 className="mb-2 font-semibold text-lg text-white">
                Enhanced Card 1
              </h3>
              <p className="text-white/70">
                Advanced drag physics with momentum!
              </p>
            </DraggableCard>

            <DraggableCard
              className="absolute top-16 right-8"
              constraintsRef={constraintsRef}
            >
              <h3 className="mb-2 font-semibold text-lg text-white">
                Enhanced Card 2
              </h3>
              <p className="text-white/70">Smooth spring animations on drag!</p>
            </DraggableCard>

            <DraggableCard
              className="-translate-x-1/2 absolute bottom-16 left-1/2 transform"
              constraintsRef={constraintsRef}
            >
              <h3 className="mb-2 font-semibold text-lg text-white">
                Enhanced Card 3
              </h3>
              <p className="text-white/70">Elastic constraints with physics!</p>
            </DraggableCard>
          </div>
        </section>

        {/* Enhanced Magnetic Buttons Section */}
        <section className="mb-20">
          <motion.h2
            className="mb-8 text-center font-bold text-3xl md:text-4xl"
            initial={{ opacity: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            6. Enhanced Magnetic Interactions
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton strength={0.2}>Subtle Magnetic</MagneticButton>
            <MagneticButton strength={0.4}>Medium Magnetic</MagneticButton>
            <MagneticButton strength={0.6}>Strong Magnetic</MagneticButton>
            <MagneticButton strength={0.8}>Ultra Magnetic</MagneticButton>
          </div>
          <p className="mt-6 text-center text-white/60">
            Hover over the buttons to experience different magnetic field
            strengths!
          </p>
        </section>

        {/* Footer */}
        <motion.footer
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 to-blue-500/10 p-8 backdrop-blur-sm">
            <h3 className="mb-4 font-bold text-2xl text-white">
              Ready to Implement These Features?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-white/70">
              All these advanced animations are powered by Motion.dev&apos;s
              hybrid engine, combining the best of CSS and JavaScript animations
              for optimal performance. Features lazy loading, reduced motion
              support, and real-time performance monitoring.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <MagneticButton strength={0.3}>View Documentation</MagneticButton>
              <MagneticButton
                className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white"
                strength={0.2}
              >
                Get Started
              </MagneticButton>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
