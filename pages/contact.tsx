import { motion } from 'motion/react';
import AnimatedContactForm from '@/components/ui/animated-contact-form';
import ContactCards from '@/components/ui/contact-cards';
import ContactFAQ from '@/components/ui/contact-faq';
import LocationMap from '@/components/ui/location-map';
import ScrollProgress from '@/components/ui/scroll-progress';
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTranslation } from '@/hooks/useTranslation';

export default function Contact() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  // const { startTracking, endTracking } = useAnimationPerformance('ContactPage')

  // Accessible animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  });

  const sectionVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  });

  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-surface via-background to-surface pt-32 pb-16 sm:pt-36 lg:pt-40">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              animate="visible"
              className="mx-auto max-w-4xl text-center"
              initial="hidden"
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 }
              }
              variants={headerVariants}
            >
              <motion.div
                animate={{ scale: 1 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500"
                initial={{ scale: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.6, delay: 0.2 }
                }
              >
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.div>

              <h1 className="mb-6 font-bold font-display text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Let&apos;s Start Your
                <span className="block bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                  Fitness Journey
                </span>
              </h1>

              <p className="mb-8 text-white/70 text-base leading-relaxed sm:text-lg md:text-xl lg:text-2xl">
                Ready to transform your life? Our expert team is here to guide
                you every step of the way. Get personalized support, premium
                facilities, and proven results.
              </p>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.6, delay: 0.4 }
                }
              >
                <motion.a
                  className="rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 font-semibold text-sm text-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 sm:px-8 sm:py-4 sm:text-base"
                  href="#contact-form"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Start Your Journey
                </motion.a>
                <motion.a
                  className="rounded-xl border border-primary px-6 py-3 font-semibold text-primary text-sm transition-all duration-300 hover:bg-primary hover:text-white sm:px-8 sm:py-4 sm:text-base"
                  href="tel:+40211234567"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Call Now: +40 21 123 4567
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </section>

        {/* Contact Cards Section */}
        <section className="bg-gradient-to-br from-background via-surface/50 to-background py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-16 text-center"
              initial="hidden"
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }
              }
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
            >
              <h2 className="mb-4 font-bold text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl">
                How to Reach Us
              </h2>
              <p className="mx-auto max-w-2xl text-sm text-white/70 sm:text-base md:text-lg">
                Choose the best way to connect with our team. We&apos;re here to
                answer your questions and help you achieve your fitness goals.
              </p>
            </motion.div>

            <ContactCards />
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          className="relative bg-gradient-to-br from-surface/30 to-background py-20"
          id="contact-form"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              className="mx-auto max-w-2xl"
              initial="hidden"
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }
              }
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
            >
              <AnimatedContactForm />
            </motion.div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-gradient-to-br from-background to-surface/50 py-20">
          <div className="container mx-auto px-4">
            <LocationMap />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gradient-to-br from-surface/30 via-background to-surface/30 py-20">
          <div className="container mx-auto px-4">
            <ContactFAQ />
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 py-16">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-emerald-500/30 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              className="text-center"
              initial="hidden"
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }
              }
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
            >
              <h2 className="mb-8 font-bold text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl">
                Join the FitPro Center Community
              </h2>

              <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                <motion.div
                  className="text-center"
                  transition={{ duration: 0.3 }}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                >
                  <div className="mb-2 font-bold text-3xl text-primary sm:text-4xl">
                    500+
                  </div>
                  <p className="text-sm text-white/70 sm:text-base">Happy Members</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  transition={{ duration: 0.3 }}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                >
                  <div className="mb-2 font-bold text-3xl text-emerald-400 sm:text-4xl">
                    50+
                  </div>
                  <p className="text-sm text-white/70 sm:text-base">Expert Trainers</p>
                </motion.div>
                <motion.div
                  className="text-center"
                  transition={{ duration: 0.3 }}
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                >
                  <div className="mb-2 font-bold text-3xl text-blue-400 sm:text-4xl">
                    24/7
                  </div>
                  <p className="text-sm text-white/70 sm:text-base">Premium Access</p>
                </motion.div>
              </div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.6, delay: 0.3 }
                }
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <p className="mb-6 text-lg text-white/80">
                  &quot;The best decision I made for my health. The trainers are
                  amazing and the facility is world-class!&quot;
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-500">
                    <span className="font-semibold text-white">M</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">Maria Popescu</p>
                    <p className="text-sm text-white/60">Premium Member</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background to-surface py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-emerald-500/5" />

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="hidden"
              transition={
                prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }
              }
              variants={sectionVariants}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
            >
              <h2 className="mb-6 font-bold text-xl text-white sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                Ready to Transform Your Life?
              </h2>
              <p className="mb-8 text-white/70 text-base sm:text-lg md:text-xl">
                Don&apos;t wait another day to start your fitness journey. Our
                team is ready to help you achieve incredible results.
              </p>

              <motion.div
                className="flex flex-col justify-center gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.01 }
                    : { duration: 0.6, delay: 0.2 }
                }
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <motion.a
                  className="rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 font-semibold text-sm text-white transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25 sm:px-8 sm:py-4 sm:text-base"
                  href="#contact-form"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  Get Started Today
                </motion.a>
                <motion.a
                  className="rounded-xl border border-white/20 px-6 py-3 font-semibold text-sm text-white transition-all duration-300 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
                  href="#location"
                  whileHover={
                    prefersReducedMotion ? undefined : { scale: 1.05 }
                  }
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
  );
}
