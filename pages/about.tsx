import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import FaqSection from '@/components/ui/faq'
import ShinyButton from '@/components/ui/shiny-button'
import { generalFAQs } from '@/data/faqData'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            {t('navigation.about')}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the story behind MituGym - where fitness meets excellence and every member becomes part of our fitness family.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <div>
                <span className="text-primary font-semibold text-sm sm:text-base lg:text-lg">OUR STORY</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 mt-2">
                  WHERE FITNESS <span className="gradient-text">BEGINS</span>
                </h2>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                  MituGym was born from a simple belief: everyone deserves access to premium fitness facilities and expert guidance. 
                  Our state-of-the-art equipment and certified trainers create an environment where your fitness goals become reality.
                </p>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                  From high-intensity strength training to personalized nutrition plans, we provide everything you need to transform 
                  your body and mind. Join our community and discover what it means to train with purpose.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">1000m²</div>
                  <div className="text-white/70 text-sm">Training Space</div>
                </div>
                <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary mb-1">Premium</div>
                  <div className="text-white/70 text-sm">Equipment</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>



        {/* FAQ Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <FaqSection 
            data={generalFAQs}
            title={t('faq.titles.facility')}
            subtitle={t('faq.subtitles.facility')}
          />
        </motion.section>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-surface/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join MituGym today and experience the difference of training with premium equipment, expert guidance, and a supportive community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShinyButton
                  variant="primary"
                  size="lg"
                  className="text-lg"
                >
                  Get Started Today
                </ShinyButton>
              </motion.div>
            </Link>
            <Link href="/prices">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShinyButton
                  variant="outline"
                  size="lg"
                  className="text-lg"
                >
                  View Pricing
                </ShinyButton>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 