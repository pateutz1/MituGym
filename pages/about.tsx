import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'
import FaqSection from '@/components/ui/faq'
import ShinyButton from '@/components/ui/shiny-button'
import Counter from '@/components/ui/counter'
import TypingText from '@/components/ui/typing-text'
import MagneticButton from '@/components/ui/magnetic-button'
import ExpandableCard from '@/components/ui/expandable-card'
import StaggeredList from '@/components/ui/staggered-list'
import ScrollProgress from '@/components/ui/scroll-progress'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'

// Premium Components
import BackgroundBeams from '@/components/ui/background-beams'
import Card3D from '@/components/ui/card-3d'
import OrbitingCircles from '@/components/ui/orbiting-circles'
import NumberTicker from '@/components/ui/number-ticker'
import Meteors from '@/components/ui/meteors'

// Lazy load advanced motion components
import { 
  LazyScrollLinkedAnimations,
  LazyDynamicGrid
} from '@/components/ui/lazy-motion-components'

import { generalFAQs } from '@/data/faqData'

// Define stable arrays outside component to prevent recreation
const TYPING_TEXTS = [
  "every member becomes family.",
  "dreams transform into reality.", 
  "strength is built every day.",
  "wellness becomes lifestyle.",
  "champions are forged.",
  "excellence is our standard."
];

export default function About() {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  // const { startTracking, endTracking } = useAnimationPerformance('AboutPage')
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Accessible animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 }
  })

  const cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  })

  const ourValues = [
    {
      title: "Excellence First",
      summary: "Premium quality in everything we do",
      content: "We believe that excellence isn't just a goal—it's our standard. From state-of-the-art equipment to certified trainers, every aspect of MituGym is designed to exceed your expectations and help you achieve results that last.",
      icon: "⭐",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "Community Driven",
      summary: "Building connections through fitness",
      content: "At MituGym, we're more than just a gym—we're a family. Our supportive community encourages each member to push their limits, celebrate victories, and overcome challenges together. Your success is our success.",
      icon: "🤝",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Innovation & Progress",
      summary: "Constantly evolving with latest fitness trends",
      content: "We stay ahead of the curve by continuously updating our equipment, training methods, and programs. Our commitment to innovation ensures you always have access to the most effective and cutting-edge fitness solutions.",
      icon: "🚀",
      gradient: "from-primary/20 to-emerald-500/20"
    },
    {
      title: "Personalized Approach",
      summary: "Every member gets individual attention",
      content: "We understand that every fitness journey is unique. Our certified trainers work with you to create personalized workout plans, nutrition guidance, and support systems tailored to your specific goals and lifestyle.",
      icon: "🎯",
      gradient: "from-pink-500/20 to-red-500/20"
    }
  ]

  const stats = [
    { value: 500, suffix: "m²", label: "Training Space", delay: 0.2 },
    { value: 95, suffix: "%", label: "Satisfaction Rate", delay: 0.4 },
    { value: 1000, suffix: "+", label: "Members", delay: 0.6 },
    { value: 24, suffix: "/7", label: "Access Hours", delay: 0.8 },
  ]

  const achievements = [
    {
      title: "Award Winning",
      description: "Best Gym 2023 & 2024",
      icon: "🏆",
      color: "#f59e0b"
    },
    {
      title: "Certified Trainers",
      description: "Expert fitness professionals",
      icon: "🎓",
      color: "#3b82f6"
    },
    {
      title: "Premium Equipment",
      description: "Latest technology & gear",
      icon: "💪",
      color: "#1e9b71"
    },
    {
      title: "Member Focused",
      description: "Your success is our priority",
      icon: "❤️",
      color: "#ef4444"
    }
  ]

  return (
    <>
      <ScrollProgress />
      <div ref={containerRef} className="min-h-screen relative">
        
        {/* Hero Section with Background Beams */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <BackgroundBeams className="opacity-60" beamCount={5} />
          <Meteors number={15} className="opacity-40" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center"
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-8"
              >
                <span className="text-primary font-semibold">💪 Our Story</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8">
                ABOUT{' '}
                <AnimatedGradientText 
                  className="inline-block"
                  colors={['#1e9b71', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#1e9b71']}
                  duration="8s"
                >
                  MITUGYM
                </AnimatedGradientText>
              </h1>
              
              <div className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12">
                <p className="mb-4">Where fitness excellence meets premium experience and</p>
                <TypingText
                  texts={TYPING_TEXTS}
                  typingSpeed={60}
                  deletingSpeed={30}
                  pauseDuration={3000}
                  startDelay={2000}
                  className="text-primary font-bold"
                  cursor="▌"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              >
                <Link href="/contact">
                  <ShinyButton size="lg" className="text-lg px-8 py-4">
                    Start Your Journey
                  </ShinyButton>
                </Link>
                <Link href="/prices">
                  <MagneticButton 
                    className="bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                    strength={0.3}
                  >
                    View Membership Plans
                  </MagneticButton>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section - Premium Design */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-8"
              >
                <span className="text-primary font-semibold">📊 Our Excellence</span>
              </motion.div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8">
                BY THE <span className="text-primary">NUMBERS</span>
              </h2>
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Our commitment to excellence reflected in every metric that matters
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  className="group relative"
                >
                  <motion.div
                    className="relative bg-gradient-to-br from-surface/40 to-surface/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-primary/30 transition-all duration-500 overflow-hidden"
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 25px 50px -12px rgba(30, 155, 113, 0.2)",
                    }}
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl opacity-50" />
                    <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl opacity-50" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6">
                        <NumberTicker
                          value={stat.value}
                          suffix={stat.suffix}
                          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white group-hover:text-primary transition-colors duration-500"
                          delay={stat.delay + 0.5}
                          duration={2.5}
                        />
                      </div>
                      
                      <h3 className="text-lg md:text-xl font-semibold text-white/90 group-hover:text-white transition-colors duration-500">
                        {stat.label}
                      </h3>
                      
                      {/* Bottom accent line */}
                      <div className="mt-6 w-12 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto opacity-50 group-hover:opacity-100 group-hover:w-16 transition-all duration-500" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
            
            {/* Additional info section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-20 text-center"
            >
              <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
                These numbers represent more than statistics—they embody our promise to deliver 
                exceptional fitness experiences that transform lives and build lasting wellness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section with 3D Cards */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                OUR <span className="text-primary">STORY</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                                    From vision to reality - discover the journey that created MituGym&apos;s premium fitness experience
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card3D className="h-full">
                <div className="bg-gradient-to-br from-primary/20 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🏋️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Premium Excellence</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">
                    MituGym was born from a simple belief: everyone deserves access to premium fitness facilities and expert guidance. 
                    Our state-of-the-art equipment and certified trainers create an environment where your fitness goals become reality.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    From high-intensity strength training to personalized nutrition plans, we provide everything you need to transform 
                    your body and mind with uncompromising quality.
                  </p>
                </div>
              </Card3D>

              <Card3D className="h-full">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Innovation First</h3>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">
                    Join our community and discover what it means to train with purpose. Our commitment to excellence, innovation, 
                    and personalized service has made us the premier fitness destination in the region.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Whether you&apos;re a beginner or a seasoned athlete, MituGym provides the tools, support, and motivation 
                    you need to exceed your expectations and achieve extraordinary results.
                  </p>
                </div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* Values Bento Grid */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                OUR <span className="text-primary">VALUES</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                The core principles that drive everything we do at MituGym
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {ourValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card3D className="h-full">
                    <div className={`bg-gradient-to-br ${value.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full`}>
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-3xl">{value.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{value.title}</h3>
                          <p className="text-white/60 text-sm">{value.summary}</p>
                        </div>
                      </div>
                      <p className="text-white/80 leading-relaxed">
                        {value.content}
                      </p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                WHY CHOOSE <span className="text-primary">US</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Recognized excellence in every aspect of fitness and wellness
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card3D>
                    <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center h-full">
                      <div 
                        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: achievement.color + '20' }}
                      >
                        <span className="text-3xl">{achievement.icon}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                      <p className="text-white/70 text-sm">{achievement.description}</p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
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
            </motion.div>
          </div>
        </section>

        {/* Call to Action with Meteors */}
        <section className="py-20 relative overflow-hidden">
          <Meteors number={25} className="opacity-60" />
          <BackgroundBeams className="opacity-30" beamCount={3} />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center bg-gradient-to-br from-primary/20 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12 lg:p-16 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                  Ready to Start Your <span className="text-primary">Transformation</span>?
                </h2>
                <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
                  Join MituGym today and experience the difference of training with premium equipment, 
                  expert guidance, and a supportive community that celebrates your success.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/contact">
                    <ShinyButton size="lg" className="text-lg px-10 py-4">
                      Start Your Journey Today
                    </ShinyButton>
                  </Link>
                  <Link href="/prices">
                    <MagneticButton 
                      className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 px-10 py-4 text-lg"
                      strength={0.3}
                    >
                      View Membership Plans
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 