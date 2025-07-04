import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'
import ScrollProgress from '@/components/ui/scroll-progress'

// Lazy load advanced motion components
import { 
  LazyScrollLinkedAnimations
} from '@/components/ui/lazy-motion-components'

export default function Contact() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const { startTracking, endTracking } = useAnimationPerformance('ContactPage')

  // Accessible animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  })

  const cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  })

  return (
    <>
      <ScrollProgress />
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              {t('navigation.contact')}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Get in touch with us to learn more about membership options and our premium fitness experience.
            </p>
          </motion.div>
          
          <motion.div
            className="mt-16 text-center"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={prefersReducedMotion ? { duration: 0.01, delay: 0.1 } : { duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-surface/50 backdrop-blur-sm border border-white/10 rounded-xl p-12">
              <h2 className="text-2xl font-semibold text-white mb-4">Coming Soon</h2>
              <p className="text-white/70 mb-6">
                Our contact form and location details will be available soon.
              </p>
              <p className="text-white/60">
                For now, follow us on social media for updates!
              </p>
            </div>
          </motion.div>


        </div>
      </div>
    </>
  )
} 