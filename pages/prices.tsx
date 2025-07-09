import { motion } from 'framer-motion';
import PlanCard from '../components/PlanCard';
import AnimatedGradientText from '../components/ui/animated-gradient-text';
import { Counter } from '../components/ui/counter';
// import { usePerformanceMonitoring } from '../hooks/usePerformanceMonitoring'
import FaqSection from '../components/ui/faq';
import FloatingCards from '../components/ui/floating-cards';
import Meteors from '../components/ui/meteors';
import ScrollProgress from '../components/ui/scroll-progress';
import TestimonialsMarquee from '../components/ui/testimonials-marquee';
import { TypingText } from '../components/ui/typing-text';
import { membershipFAQs } from '../data/faqData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTranslation } from '../hooks/useTranslation';

export default function Prices() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  // const { startTracking, endTracking } = usePerformanceMonitoring()

  // Accessible animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -50 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 },
  };

  const pricingPlans = [
    {
      name: 'Silver',
      price: '$29',
      originalPrice: '$39',
      gradient: 'from-gray-800/40 to-gray-900/40',
      description: 'Perfect for beginners getting started with fitness',
      features: [
        { text: 'Access to gym equipment', enabled: true },
        { text: 'Locker room access', enabled: true },
        { text: 'Basic workout plans', enabled: true },
        { text: '6am-10pm access', enabled: true },
        { text: 'Group fitness classes', enabled: false },
        { text: 'Personal trainer sessions', enabled: false },
        { text: 'Nutrition consultation', enabled: false },
      ],
      isPopular: false,
    },
    {
      name: 'Gold',
      price: '$49',
      originalPrice: '$69',
      gradient: 'from-emerald-800/40 to-emerald-900/40',
      description: 'Most popular choice with personal training included',
      features: [
        { text: 'Access to gym equipment', enabled: true },
        { text: 'Locker room access', enabled: true },
        { text: 'Basic workout plans', enabled: true },
        { text: '6am-10pm access', enabled: true },
        { text: 'Group fitness classes', enabled: true },
        { text: 'Personal trainer sessions', enabled: true },
        { text: 'Guest privileges', enabled: true },
        { text: 'Nutrition consultation', enabled: false },
      ],
      isPopular: true,
    },
    {
      name: 'Platinum',
      price: '$89',
      originalPrice: '$119',
      gradient: 'from-purple-800/40 to-purple-900/40',
      description: 'Complete wellness experience with premium amenities',
      features: [
        { text: 'Access to gym equipment', enabled: true },
        { text: 'Locker room access', enabled: true },
        { text: 'Basic workout plans', enabled: true },
        { text: '6am-10pm access', enabled: true },
        { text: 'Group fitness classes', enabled: true },
        { text: 'Personal trainer sessions', enabled: true },
        { text: 'Guest privileges', enabled: true },
        { text: 'Nutrition consultation', enabled: true },
        { text: 'Premium amenities access', enabled: true },
        { text: 'Priority class booking', enabled: true },
      ],
      isPopular: false,
    },
  ];

  // Premium feature cards data
  const premiumFeatures = [
    {
      id: 1,
      title: 'State-of-the-Art Equipment',
      description:
        'Latest fitness technology and machines from leading brands, maintained to the highest standards.',
      icon: (
        <svg
          className="h-full w-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6.5 6.5h11v11h-11z" />
          <path d="M6.5 6.5L12 12l5.5-5.5" />
          <path d="M12 12l5.5 5.5" />
          <path d="M12 12L6.5 17.5" />
        </svg>
      ),
      gradient: 'from-blue-500/20 to-blue-600/20',
      delay: 0.2,
    },
    {
      id: 2,
      title: 'Expert Personal Trainers',
      description:
        'Certified professionals dedicated to helping you achieve your fitness goals safely and effectively.',
      icon: (
        <svg
          className="h-full w-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      gradient: 'from-purple-500/20 to-purple-600/20',
      delay: 0.4,
    },
    {
      id: 3,
      title: 'Flexible Scheduling',
      description:
        'Extended hours and convenient booking system to fit your busy lifestyle and preferences.',
      icon: (
        <svg
          className="h-full w-full"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      ),
      gradient: 'from-green-500/20 to-green-600/20',
      delay: 0.6,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Member since 2022',
      content:
        'MituGym transformed my fitness journey. The trainers are amazing and the facilities are top-notch!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Gold Member',
      content:
        'Best investment I&apos;ve made for my health. The equipment is always clean and the staff is incredibly supportive.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Platinum Member',
      content:
        'The personal training sessions have been life-changing. I&apos;ve achieved goals I never thought possible.',
      rating: 5,
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Member since 2021',
      content:
        'Flexible hours and professional environment make it easy to maintain a consistent workout routine.',
      rating: 5,
    },
  ];

  return (
    <>
      <ScrollProgress />
      <div className="relative min-h-screen overflow-hidden pt-24 pb-16">
        {/* Background meteors effect */}
        <Meteors className="opacity-30" number={15} />

        <div className="container mx-auto px-4">
          <motion.div
            animate="visible"
            className="mb-16 text-center"
            initial="hidden"
            transition={
              prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }
            }
            variants={headerVariants}
          >
            <motion.h1
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 font-bold font-display text-4xl text-white md:text-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedGradientText
                animationDuration={2}
                className="text-4xl md:text-5xl"
                variant="glow"
              >
                {t('navigation.prices')}
              </AnimatedGradientText>
            </motion.h1>
            <div className="mx-auto max-w-2xl text-white/70 text-xl">
              <p className="mb-4">
                Discover our flexible membership plans designed to fit
              </p>
              <TypingText
                className="font-semibold text-emerald-400"
                cursor="_"
                deletingSpeed={25}
                pauseDuration={2000}
                startDelay={1500}
                texts={[
                  'every fitness goal.',
                  'your busy lifestyle.',
                  'any budget range.',
                  'personal preferences.',
                  'long-term success.',
                  'your unique needs.',
                ]}
                typingSpeed={50}
              />
            </div>
          </motion.div>

          {/* Premium Features Section */}
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-2xl text-white md:text-3xl">
                Why Choose{' '}
                <AnimatedGradientText variant="shimmer">
                  MituGym
                </AnimatedGradientText>
                ?
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Experience premium fitness with our world-class facilities and
                expert guidance
              </p>
            </div>
            <FloatingCards cards={premiumFeatures} />
          </motion.section>

          {/* Pricing Plans */}
          <section className="mb-20">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="mb-4 font-bold text-3xl text-white md:text-4xl">
                Choose Your{' '}
                <AnimatedGradientText variant="wave">
                  Perfect Plan
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Flexible membership options designed to support your fitness
                journey
              </p>
            </motion.div>
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <PlanCard
                  delay={index * 0.1}
                  features={plan.features}
                  gradient={plan.gradient}
                  isPopular={plan.isPopular}
                  key={plan.name}
                  name={plan.name}
                  originalPrice={plan.originalPrice}
                  price={plan.price}
                />
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-bold text-3xl text-white md:text-4xl">
                What Our{' '}
                <AnimatedGradientText variant="pulse">
                  Members Say
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70">
                Real stories from real people who&apos;ve transformed their
                lives at MituGym
              </p>
            </div>
            <TestimonialsMarquee
              className="h-48"
              direction="left"
              speed={30}
              testimonials={testimonials}
            />
          </motion.section>

          {/* Value Proposition Section */}
          <section className="mb-20">
            <motion.div
              animate="visible"
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 p-8 text-center lg:p-12"
              initial="hidden"
              transition={
                prefersReducedMotion
                  ? { duration: 0.01, delay: 0.2 }
                  : { duration: 0.6, delay: 1.0 }
              }
              variants={cardVariants}
            >
              {/* Background animation */}
              <div className="absolute inset-0 opacity-10">
                <Meteors className="opacity-50" number={8} />
              </div>

              <div className="relative z-10">
                <h2 className="mb-6 font-bold text-2xl text-white sm:text-3xl md:text-4xl">
                  Join the{' '}
                  <AnimatedGradientText variant="glow">
                    MituGym Family
                  </AnimatedGradientText>
                </h2>
                <p className="mx-auto mb-12 max-w-2xl text-white/70">
                  Thousands of satisfied members have transformed their lives
                  with our premium facilities and expert guidance.
                </p>

                <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="mb-2 font-bold text-3xl sm:text-4xl">
                      <Counter
                        className="text-3xl text-[#1e9b71] sm:text-4xl"
                        delay={800}
                        duration={2500}
                        suffix="%"
                        target={95}
                      />
                    </div>
                    <h3 className="mb-1 font-semibold text-white">
                      Satisfaction
                    </h3>
                    <p className="text-sm text-white/60">
                      Member retention rate
                    </p>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                  >
                    <div className="mb-2 font-bold text-2xl sm:text-3xl">
                      <AnimatedGradientText
                        className="text-2xl sm:text-3xl"
                        variant="shimmer"
                      >
                        Premium
                      </AnimatedGradientText>
                    </div>
                    <h3 className="mb-1 font-semibold text-white">Equipment</h3>
                    <p className="text-sm text-white/60">Latest technology</p>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <div className="mb-2 space-y-1">
                      <div className="font-semibold text-primary/80 text-xs">
                        Monday - Friday
                      </div>
                      <div className="font-bold text-2xl text-primary">
                        6:00 - 23:00
                      </div>
                    </div>
                    <div className="mb-2 grid grid-cols-2 gap-2 text-white/60 text-xs">
                      <div>Sat: 7:00-22:00</div>
                      <div>Sun: 7:00-20:00</div>
                    </div>
                    <h3 className="mb-1 font-semibold text-white">
                      Access Hours
                    </h3>
                    <p className="text-sm text-white/60">Extended schedule</p>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <div className="mb-2 font-bold text-2xl sm:text-3xl">
                      <AnimatedGradientText
                        className="text-2xl sm:text-3xl"
                        variant="wave"
                      >
                        Expert
                        <br />
                        Trainers
                      </AnimatedGradientText>
                    </div>
                    <h3 className="mb-1 font-semibold text-white">Support</h3>
                    <p className="text-sm text-white/60">
                      Professional guidance
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* FAQ Section */}
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <FaqSection
              data={membershipFAQs}
              subtitle={t('faq.subtitles.membership')}
              title={t('faq.titles.membership')}
            />
          </motion.section>
        </div>
      </div>
    </>
  );
}
