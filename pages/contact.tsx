import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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
  )
} 