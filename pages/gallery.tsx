import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'
import ScrollProgress from '@/components/ui/scroll-progress'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import TypingText from '@/components/ui/typing-text'
import ShinyButton from '@/components/ui/shiny-button'
import Card3D from '@/components/ui/card-3d'
import BackgroundBeams from '@/components/ui/background-beams'
import GalleryModal from '@/components/ui/gallery-modal'
import FocusCards from '@/components/ui/focus-cards'

// Lazy load advanced motion components
import { 
  LazyDynamicGrid,
  LazyVariantsShowcase
} from '@/components/ui/lazy-motion-components'

// Gallery data with categories
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern gym equipment',
    title: 'Premium Equipment',
    description: 'State-of-the-art fitness machines from top manufacturers like Technogym and Life Fitness',
    category: 'Equipment'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Spacious gym interior',
    title: 'Spacious Training Area',
    description: 'Over 500m² of premium training space with high ceilings and natural lighting',
    category: 'Interior'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Dynamic group fitness class',
    title: 'Group Fitness Classes',
    description: 'High-energy group classes led by certified instructors in our dedicated studio',
    category: 'Classes'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Free weights training area',
    title: 'Free Weights Zone',
    description: 'Complete range of dumbbells, barbells, and Olympic lifting equipment',
    category: 'Equipment'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Cardio equipment row',
    title: 'Cardio Zone',
    description: 'Latest cardio machines with entertainment systems and heart rate monitoring',
    category: 'Equipment'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury locker room',
    title: 'Premium Locker Rooms',
    description: 'Spa-like amenities with spacious lockers, rain showers, and luxury finishes',
    category: 'Amenities'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Peaceful yoga class',
    title: 'Yoga & Meditation',
    description: 'Tranquil studio space for yoga, meditation, and mindfulness practices',
    category: 'Classes'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Functional training area',
    title: 'Functional Training',
    description: 'Versatile space for functional fitness, CrossFit, and athletic training',
    category: 'Training'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern reception area',
    title: 'Welcome Reception',
    description: 'Contemporary entrance with comfortable seating and member services',
    category: 'Interior'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Personal training session',
    title: 'Personal Training',
    description: 'One-on-one training sessions with certified fitness professionals',
    category: 'Training'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Stretching and recovery area',
    title: 'Recovery Zone',
    description: 'Dedicated space for stretching, mobility work, and post-workout recovery',
    category: 'Training'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Community fitness event',
    title: 'Community Events',
    description: 'Regular fitness challenges and social events to build lasting connections',
    category: 'Community'
  }
]

const categories = ['All', 'Equipment', 'Interior', 'Classes', 'Training', 'Amenities', 'Community']

export default function Gallery() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Filter images by category
  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  // Animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  })

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const navigateImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <>
      <ScrollProgress />
      
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background effects */}
        <BackgroundBeams className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/95 -z-10" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <AnimatedGradientText className="text-6xl md:text-8xl font-display font-bold mb-6">
                  Our Gallery
                </AnimatedGradientText>
                <div className="text-2xl md:text-3xl text-white/90 mb-6">
                  <TypingText
                    texts={["Experience Premium Fitness"]}
                    className="font-display font-semibold"
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12"
              >
                Discover our state-of-the-art facilities, premium equipment, and inspiring spaces 
                designed to elevate your fitness journey. Every detail crafted for your success.
              </motion.p>

              {/* Gallery Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-r from-primary/20 to-blue-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-primary mr-3" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-white">Professional Photography</h3>
                  </div>
                  <p className="text-white/70 text-sm">
                    Every image captures the essence of our premium facilities. Click any photo to explore in full detail.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                      : 'bg-transparent text-white/70 border-white/20 hover:border-primary hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid with Focus Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <FocusCards
                  cards={filteredImages}
                  onCardClick={(card, index) => {
                    const originalIndex = galleryImages.findIndex(img => img.id === card.id)
                    openModal(originalIndex)
                  }}
                  className="mb-16"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Featured Facilities */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-blue-600/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Premium <span className="text-primary">Facilities</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Every space is designed with attention to detail and your comfort in mind
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.slice(0, 6).map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <Card3D className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-96">
                    <div className="relative h-2/3">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6 h-1/3">
                      <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                      <p className="text-white/70 text-sm line-clamp-2">{image.description}</p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual Tour Invitation */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-primary/20 rounded-full">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                  Experience Our Facilities <span className="text-primary">Virtually</span>
                </h2>
                
                <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                  Take a comprehensive virtual tour through our premium facilities. Explore every corner, 
                  from our cutting-edge equipment to our luxury amenities.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Equipment Zones</h4>
                    <p className="text-sm text-white/60">Explore our premium equipment areas</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Studio Spaces</h4>
                    <p className="text-sm text-white/60">Visit our group fitness studios</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-white mb-2">Luxury Amenities</h4>
                    <p className="text-sm text-white/60">Discover our premium facilities</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary/20 to-blue-600/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Ready to Experience It <span className="text-primary">Yourself?</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
                Book a personal tour of our facilities or start your membership journey today
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <ShinyButton
                  className="bg-primary text-white px-8 py-4 text-lg font-semibold"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Book a Tour
                </ShinyButton>
                <motion.button
                  className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={galleryImages}
        currentIndex={currentImageIndex}
        onNavigate={navigateImage}
      />
    </>
  )
} 