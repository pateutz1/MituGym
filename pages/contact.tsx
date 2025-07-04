import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'
import ScrollProgress from '@/components/ui/scroll-progress'
import AnimatedContactForm from '@/components/ui/animated-contact-form'
import ContactCards from '@/components/ui/contact-cards'
import ContactFAQ from '@/components/ui/contact-faq'
import LocationMap from '@/components/ui/location-map'
import { LazyScrollLinkedAnimations } from '@/components/ui/lazy-motion-components'

export default function Contact() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  // const { startTracking, endTracking } = useAnimationPerformance('ContactPage')

  // Accessible animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  })

  const sectionVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  })

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-surface via-background to-surface relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-emerald-500 rounded-2xl flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
                Let&apos;s Start Your
                <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent block">
                  Fitness Journey
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
                Ready to transform your life? Our expert team is here to guide you every step of the way. 
                Get personalized support, premium facilities, and proven results.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="#contact-form"
                  className="bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Start Your Journey
                </motion.a>
                <motion.a
                  href="tel:+40211234567"
                  className="border border-primary text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-primary hover:text-white"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Call Now: +40 21 123 4567
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </section>

        {/* Contact Cards Section */}
        <section className="py-20 bg-gradient-to-br from-background via-surface/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How to Reach Us
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Choose the best way to connect with our team. We&apos;re here to answer your questions 
                and help you achieve your fitness goals.
              </p>
            </motion.div>

            <ContactCards />
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-gradient-to-br from-surface/30 to-background relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <AnimatedContactForm />
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-20 bg-gradient-to-br from-background to-surface/50">
          <div className="container mx-auto px-4">
            <LocationMap />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-surface/30 via-background to-surface/30">
          <div className="container mx-auto px-4">
            <ContactFAQ />
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Join the MituGym Community
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div
                  className="text-center"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-white/70">Happy Members</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-emerald-400 mb-2">50+</div>
                  <p className="text-white/70">Expert Trainers</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
                  <p className="text-white/70">Premium Access</p>
                </motion.div>
              </div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.3 }}
              >
                <p className="text-white/80 text-lg mb-6">
                  &quot;The best decision I made for my health. The trainers are amazing and the facility is world-class!&quot;
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Maria Popescu</p>
                    <p className="text-white/60 text-sm">Premium Member</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-background to-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-emerald-500/5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Life?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Don&apos;t wait another day to start your fitness journey. Our team is ready to help you achieve incredible results.
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, delay: 0.2 }}
              >
                <motion.a
                  href="#contact-form"
                  className="bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Get Started Today
                </motion.a>
                <motion.a
                  href="#location"
                  className="border border-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-white/10"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Visit Our Gym
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 