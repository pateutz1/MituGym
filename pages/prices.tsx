import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

export default function Prices() {
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
            {t('navigation.prices')}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our flexible membership plans designed to fit every fitness goal and budget.
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
            <p className="text-white/70">
              Detailed pricing information will be available soon. Contact us for early member discounts.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 