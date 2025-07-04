import { motion } from 'motion/react'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'
import ScrollProgress from '@/components/ui/scroll-progress'

// Lazy load advanced motion components
import { 
  LazyDynamicGrid,
  LazyVariantsShowcase
} from '@/components/ui/lazy-motion-components'

export default function Gallery() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  // const { startTracking, endTracking } = useAnimationPerformance('GalleryPage')

  // Accessible animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  })

  const gridVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  })

  const itemVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  })

  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Modern gym equipment',
      title: 'Premium Equipment',
      description: 'Latest generation fitness machines'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Gym interior',
      title: 'Spacious Training Area',
      description: '500m² of premium training space'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Group fitness class',
      title: 'Group Classes',
      description: 'Dynamic fitness community'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Weight training area',
      title: 'Free Weights Zone',
      description: 'Complete range of weights'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Cardio equipment',
      title: 'Cardio Zone',
      description: 'State-of-the-art cardio machines'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Locker room',
      title: 'Luxury Locker Rooms',
      description: 'Premium amenities and comfort'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Personal training',
      title: 'Personal Training',
      description: 'One-on-one expert guidance'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Functional training area',
      title: 'Functional Training',
      description: 'Versatile workout space'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Reception area',
      title: 'Modern Reception',
      description: 'Welcoming entrance area'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Yoga class',
      title: 'Yoga & Flexibility',
      description: 'Mind-body wellness programs'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Stretching area',
      title: 'Stretching Zone',
      description: 'Dedicated recovery space'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Community event',
      title: 'Community Events',
      description: 'Building connections through fitness'
    }
  ]

  return (
    <>
      <ScrollProgress />
      <div className="pt-24 pb-16 min-h-screen bg-background">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              OUR <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                GALLERY
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Take a look at our premium facilities and see what makes MituGym the perfect place for your fitness journey.
            </p>
          </motion.div>

          {/* Simple Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            transition={prefersReducedMotion ? { duration: 0.01, delay: 0.1 } : { duration: 0.6, delay: 0.2 }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative aspect-square rounded-xl overflow-hidden group"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={prefersReducedMotion ? { duration: 0.01, delay: index * 0.02 } : { duration: 0.3, delay: index * 0.1 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-semibold text-sm mb-1">{image.title}</h4>
                  <p className="text-white/80 text-xs">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Experience It Yourself?
              </h3>
              <p className="text-white/70 mb-6">
                Book a tour or start your membership to access these amazing facilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book a Tour
                </motion.button>
                <motion.button
                  className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Now
                </motion.button>
              </div>
            </div>
          </motion.div>


        </div>
      </div>
    </>
  )
} 