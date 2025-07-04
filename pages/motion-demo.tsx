import { motion } from 'motion/react'
import { useRef } from 'react'
import ScrollProgress from '@/components/ui/scroll-progress'
import ExpandableCard from '@/components/ui/expandable-card'
import DraggableCard from '@/components/ui/draggable-card'
import MagneticButton from '@/components/ui/magnetic-button'
import StaggeredList from '@/components/ui/staggered-list'

export default function MotionDemo() {
  const constraintsRef = useRef<HTMLDivElement>(null)

  const features = [
    "Scroll-linked progress indicator",
    "Layout animations with smooth transitions",
    "Drag gestures with physics",
    "Magnetic button interactions",
    "Staggered list animations",
    "Spring physics for natural movement",
    "Transform values for complex effects"
  ]

  const expandableCards = [
    {
      title: "Scroll Progress",
      summary: "Visual indicator of scroll position",
      content: "The scroll progress bar at the top uses Motion's useScroll hook to create a smooth scroll-linked animation that tracks your reading progress through the page."
    },
    {
      title: "Layout Animations",
      summary: "Smooth transitions between layout states",
      content: "These expandable cards use Motion's layout prop to automatically animate between different sizes and positions, creating smooth transitions without manual calculations."
    },
    {
      title: "Drag Interactions",
      summary: "Interactive drag gestures with physics",
      content: "The draggable cards below use Motion's drag gestures with realistic physics including momentum, constraints, and elastic bouncing effects."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      <div className="container mx-auto px-4 py-20">
        <motion.header 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Motion.dev Features Demo
          </h1>
          <p className="text-xl text-white/70">
            Explore the power of Motion&apos;s hybrid animation engine
          </p>
        </motion.header>

        {/* Expandable Cards Section */}
        <section className="mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Layout Animations
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Draggable Cards Section */}
        <section className="mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Drag Gestures
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
              <h3 className="text-lg font-semibold text-white mb-2">Draggable Card 1</h3>
              <p className="text-white/70">I can be dragged around with physics!</p>
            </DraggableCard>
            
            <DraggableCard 
              constraintsRef={constraintsRef}
              className="absolute top-16 right-8"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Draggable Card 2</h3>
              <p className="text-white/70">Me too! Try dragging me to the edges.</p>
            </DraggableCard>
            
            <DraggableCard 
              constraintsRef={constraintsRef}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Draggable Card 3</h3>
              <p className="text-white/70">Spring physics make movement feel natural!</p>
            </DraggableCard>
          </div>
        </section>

        {/* Magnetic Buttons Section */}
        <section className="mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Magnetic Interactions
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton strength={0.3}>
              Gentle Magnetic
            </MagneticButton>
            <MagneticButton strength={0.5}>
              Strong Magnetic
            </MagneticButton>
            <MagneticButton strength={0.7}>
              Super Magnetic
            </MagneticButton>
          </div>
          <p className="text-center text-white/60 mt-4">
            Hover over the buttons to see the magnetic effect in action!
          </p>
        </section>

        {/* Staggered Lists Section */}
        <section className="mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Staggered Animations
          </motion.h2>
          <div className="max-w-2xl mx-auto">
            <StaggeredList items={features} />
          </div>
        </section>

        {/* Footer */}
        <motion.footer 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60">
            Powered by Motion.dev - The animation library with a hybrid engine
          </p>
        </motion.footer>
      </div>
    </div>
  )
} 