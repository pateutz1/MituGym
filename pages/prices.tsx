import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'
import { useReducedMotion } from '../hooks/useReducedMotion'
// import { usePerformanceMonitoring } from '../hooks/usePerformanceMonitoring'
import FaqSection from '../components/ui/faq'
import { Counter } from '../components/ui/counter'
import { TypingText } from '../components/ui/typing-text'
import PlanCard from '../components/PlanCard'
import ScrollProgress from '../components/ui/scroll-progress'
import { membershipFAQs } from '../data/faqData'
import Meteors from '../components/ui/meteors'
import TestimonialsMarquee from '../components/ui/testimonials-marquee'
import AnimatedGradientText from '../components/ui/animated-gradient-text'
import FloatingCards from '../components/ui/floating-cards'

export default function Prices() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  // const { startTracking, endTracking } = usePerformanceMonitoring()

  // Accessible animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -50 },
    visible: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  }

  const pricingPlans = [
    {
      name: "Silver",
      price: "$29",
      originalPrice: "$39",
      gradient: "from-gray-800/40 to-gray-900/40",
      description: "Perfect for beginners getting started with fitness",
      features: [
        { text: "Access to gym equipment", enabled: true },
        { text: "Locker room access", enabled: true },
        { text: "Basic workout plans", enabled: true },
        { text: "6am-10pm access", enabled: true },
        { text: "Group fitness classes", enabled: false },
        { text: "Personal trainer sessions", enabled: false },
        { text: "Nutrition consultation", enabled: false }
      ],
      isPopular: false
    },
    {
      name: "Gold",
      price: "$49", 
      originalPrice: "$69",
      gradient: "from-emerald-800/40 to-emerald-900/40",
      description: "Most popular choice with personal training included",
      features: [
        { text: "Access to gym equipment", enabled: true },
        { text: "Locker room access", enabled: true },
        { text: "Basic workout plans", enabled: true },
        { text: "6am-10pm access", enabled: true },
        { text: "Group fitness classes", enabled: true },
        { text: "Personal trainer sessions", enabled: true },
        { text: "Guest privileges", enabled: true },
        { text: "Nutrition consultation", enabled: false }
      ],
      isPopular: true
    },
    {
      name: "Platinum",
      price: "$89",
      originalPrice: "$119",
      gradient: "from-purple-800/40 to-purple-900/40",
      description: "Complete wellness experience with premium amenities",
      features: [
        { text: "Access to gym equipment", enabled: true },
        { text: "Locker room access", enabled: true },
        { text: "Basic workout plans", enabled: true },
        { text: "6am-10pm access", enabled: true },
        { text: "Group fitness classes", enabled: true },
        { text: "Personal trainer sessions", enabled: true },
        { text: "Guest privileges", enabled: true },
        { text: "Nutrition consultation", enabled: true },
        { text: "Premium amenities access", enabled: true },
        { text: "Priority class booking", enabled: true }
      ],
      isPopular: false
    }
  ]

  // Premium feature cards data
  const premiumFeatures = [
    {
      id: 1,
      title: "State-of-the-Art Equipment",
      description: "Latest fitness technology and machines from leading brands, maintained to the highest standards.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M6.5 6.5h11v11h-11z"/>
          <path d="M6.5 6.5L12 12l5.5-5.5"/>
          <path d="M12 12l5.5 5.5"/>
          <path d="M12 12L6.5 17.5"/>
        </svg>
      ),
      gradient: "from-blue-500/20 to-blue-600/20",
      delay: 0.2
    },
    {
      id: 2,
      title: "Expert Personal Trainers",
      description: "Certified professionals dedicated to helping you achieve your fitness goals safely and effectively.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      gradient: "from-purple-500/20 to-purple-600/20",
      delay: 0.4
    },
    {
      id: 3,
      title: "Flexible Scheduling",
      description: "Extended hours and convenient booking system to fit your busy lifestyle and preferences.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      gradient: "from-green-500/20 to-green-600/20",
      delay: 0.6
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Member since 2022",
      content: "MituGym transformed my fitness journey. The trainers are amazing and the facilities are top-notch!",
      rating: 5
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Gold Member",
      content: "Best investment I&apos;ve made for my health. The equipment is always clean and the staff is incredibly supportive.",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Platinum Member",
      content: "The personal training sessions have been life-changing. I&apos;ve achieved goals I never thought possible.",
      rating: 5
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Member since 2021",
      content: "Flexible hours and professional environment make it easy to maintain a consistent workout routine.",
      rating: 5
    }
  ]

  return (
    <>
      <ScrollProgress />
      <div className="pt-24 pb-16 min-h-screen relative overflow-hidden">
        {/* Background meteors effect */}
        <Meteors number={15} className="opacity-30" />
        
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-display font-bold text-white mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedGradientText 
                variant="glow"
                animationDuration={2}
                className="text-4xl md:text-5xl"
              >
                {t('navigation.prices')}
              </AnimatedGradientText>
            </motion.h1>
            <div className="text-xl text-white/70 max-w-2xl mx-auto">
              <p className="mb-4">Discover our flexible membership plans designed to fit</p>
              <TypingText
                texts={[
                  "every fitness goal.",
                  "your busy lifestyle.",
                  "any budget range.",
                  "personal preferences.",
                  "long-term success.",
                  "your unique needs."
                ]}
                typingSpeed={50}
                deletingSpeed={25}
                pauseDuration={2000}
                startDelay={1500}
                className="text-emerald-400 font-semibold"
                cursor="_"
              />
            </div>
          </motion.div>

          {/* Premium Features Section */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Why Choose <AnimatedGradientText variant="shimmer">MituGym</AnimatedGradientText>?
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Experience premium fitness with our world-class facilities and expert guidance
              </p>
            </div>
            <FloatingCards cards={premiumFeatures} />
          </motion.section>

          {/* Pricing Plans */}
          <section className="mb-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Choose Your <AnimatedGradientText variant="wave">Perfect Plan</AnimatedGradientText>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Flexible membership options designed to support your fitness journey
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <PlanCard
                  key={plan.name}
                  name={plan.name}
                  price={plan.price}
                  originalPrice={plan.originalPrice}
                  features={plan.features}
                  delay={index * 0.1}
                  isPopular={plan.isPopular}
                  gradient={plan.gradient}
                />
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our <AnimatedGradientText variant="pulse">Members Say</AnimatedGradientText>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Real stories from real people who&apos;ve transformed their lives at MituGym
              </p>
            </div>
            <TestimonialsMarquee 
              testimonials={testimonials}
              speed={30}
              direction="left"
              className="h-48"
            />
          </motion.section>

          {/* Value Proposition Section */}
          <section className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={prefersReducedMotion ? { duration: 0.01, delay: 0.2 } : { duration: 0.6, delay: 1.0 }}
              className="relative bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 text-center overflow-hidden"
            >
              {/* Background animation */}
              <div className="absolute inset-0 opacity-10">
                <Meteors number={8} className="opacity-50" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                  Join the <AnimatedGradientText variant="glow">MituGym Family</AnimatedGradientText>
                </h2>
                <p className="text-white/70 mb-12 max-w-2xl mx-auto">
                  Thousands of satisfied members have transformed their lives with our premium facilities and expert guidance.
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-bold mb-2">
                      <Counter
                        target={95}
                        suffix="%"
                        duration={2500}
                        delay={800}
                        className="text-3xl sm:text-4xl text-[#1e9b71]"
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-1">Satisfaction</h3>
                    <p className="text-white/60 text-sm">Member retention rate</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2">
                      <AnimatedGradientText variant="shimmer" className="text-2xl sm:text-3xl">
                        Premium
                      </AnimatedGradientText>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Equipment</h3>
                    <p className="text-white/60 text-sm">Latest technology</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="text-center"
                  >
                    <div className="space-y-1 mb-2">
                      <div className="text-xs font-semibold text-primary/80">Monday - Friday</div>
                      <div className="text-2xl font-bold text-primary">6:00 - 23:00</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/60 mb-2">
                      <div>Sat: 7:00-22:00</div>
                      <div>Sun: 7:00-20:00</div>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Access Hours</h3>
                    <p className="text-white/60 text-sm">Extended schedule</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2">
                      <AnimatedGradientText variant="wave" className="text-2xl sm:text-3xl">
                        Expert<br/>Trainers
                      </AnimatedGradientText>
                    </div>
                    <h3 className="text-white font-semibold mb-1">Support</h3>
                    <p className="text-white/60 text-sm">Professional guidance</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
          
          {/* FAQ Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <FaqSection 
              data={membershipFAQs}
              title={t('faq.titles.membership')}
              subtitle={t('faq.subtitles.membership')}
            />
          </motion.section>
        </div>
      </div>
    </>
  )
} 