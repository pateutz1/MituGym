import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'
import { useMultiParallax, useParallax, useIntersectionParallax } from '@/hooks/useParallax'
import Countdown from '@/components/Countdown'
import FeatureCard from '@/components/FeatureCard'
import PlanCard from '@/components/PlanCard'
import ParallaxCard from '@/components/ParallaxCard'
import Tooltip from '@/components/Tooltip'
import SimpleTooltip from '@/components/SimpleTooltip'
import FaqSection from '@/components/ui/faq'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import ShinyButton from '@/components/ui/shiny-button'
import { popularFAQs } from '@/data/faqData'

export default function Home() {
  const { t } = useTranslation()

  // Parallax hooks
  const scrollY = useMultiParallax()
  const heroParallax = useParallax<HTMLDivElement>({ speed: 0.5 })
  const floatingParallax1 = useParallax<HTMLDivElement>({ speed: -0.3 })
  const floatingParallax2 = useParallax<HTMLDivElement>({ speed: -0.6 })
  const imageParallax = useParallax<HTMLDivElement>({ speed: 0.05 })

  // Stats data with tooltip content
  const stats = [
    { 
      number: 'Opening', 
      label: 'Soon',
      tooltip: 'State-of-the-art facility opening Saturday, July 12th at 10 AM. Be part of our founding member community!'
    },
    { 
      number: '1000m²', 
      label: 'Training Space',
      tooltip: 'Spacious areas with dedicated zones for cardio, strength training, functional fitness, and group classes.'
    },
    { 
      number: 'Premium', 
      label: 'Equipment',
      tooltip: 'Latest generation fitness equipment from top manufacturers like Technogym, Life Fitness, and Hammer Strength.'
    },
    { 
      number: '6am-10pm', 
      label: 'Daily Hours',
      tooltip: 'Extended hours to fit your schedule - whether you\'re an early bird or night owl, we\'ve got you covered.'
    }
  ]



  // Professional Icons Components with Gradients
  const DumbbellIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="dumbbellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e9b71" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#dumbbellGrad)" d="M7 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4m10 0h4a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-4M7 8V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3m-9 0v8m9-8v8M10 8v8m4-8v8" />
    </svg>
  )

  const FitnessIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="fitnessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#fitnessGrad)" d="M13 10V3L4 14h7v7l9-11h-7z" />
      <circle cx="12" cy="12" r="3" strokeWidth={1.5} stroke="url(#fitnessGrad)" />
    </svg>
  )

  const PersonalTrainerIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="trainerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#trainerGrad)" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#trainerGrad)" d="M15 11l2-2 4 4" />
    </svg>
  )

  const TargetIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="targetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} stroke="url(#targetGrad)" />
      <circle cx="12" cy="12" r="6" strokeWidth={1.5} stroke="url(#targetGrad)" />
      <circle cx="12" cy="12" r="2" strokeWidth={1.5} stroke="url(#targetGrad)" />
    </svg>
  )

  // Feature icons with Gradients
  const EquipmentIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="equipmentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e9b71" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="url(#equipmentGrad)" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  )

  const TrainersIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="trainersGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="url(#trainersGrad)" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  )

  const ClassesIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="classesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="url(#classesGrad)" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )

  const CommunityIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="communityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="url(#communityGrad)" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )

  return (
    <div className="overflow-hidden parallax-container">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 md:pt-24 section-transition hero-bg">
        {/* Background with Grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(30, 155, 113, 0.3) 1px, transparent 0)',
            backgroundSize: '30px 30px sm:50px 50px'
          }} />
        </div>
        
        {/* Floating Elements with Parallax */}
        <div 
          ref={floatingParallax1.ref}
          className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/5 rounded-full blur-3xl animate-float parallax-element parallax-float-1"
          style={{ transform: floatingParallax1.transform }}
        />
        <div 
          ref={floatingParallax2.ref}
          className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/3 rounded-full blur-3xl animate-float parallax-element parallax-float-2"
          style={{ transform: floatingParallax2.transform, animationDelay: '3s' }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block bg-primary/10 border border-primary/20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6"
              >
                <span className="text-primary font-medium text-sm sm:text-base">✨ Premium Fitness Experience</span>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight">
                <span className="text-white">FITNESS IS NOT A</span>
                <br />
                <span className="text-white">DESTINATION IT</span>
                <br />
                <span className="text-white">IS A </span>
                <AnimatedGradientText 
                  className="inline-block"
                  colors={['#1e9b71', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444', '#1e9b71']}
                  duration="6s"
                >
                  WAY OF LIFE.
                </AnimatedGradientText>
              </h1>
              
              <motion.p
                className="text-base sm:text-lg lg:text-xl text-white/70 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Explore our brand-new fitness center, equipped with the latest machines and premium amenities to kickstart your journey.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {stats.map((stat, index) => (
                  <SimpleTooltip 
                    key={index}
                    content={stat.tooltip}
                    className="cursor-help"
                  >
                    <div className="text-center lg:text-left hover:scale-105 transition-transform duration-200">
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                      <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
                    </div>
                  </SimpleTooltip>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShinyButton
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto text-base sm:text-lg"
                    >
                      Get Started Today
                    </ShinyButton>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShinyButton
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-base sm:text-lg"
                    >
                      Watch Demo
                    </ShinyButton>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-[0.15em]">
                    {t('hero.countdown.title')}
                  </h3>
                </div>
                <Countdown 
                  targetDate={(() => {
                    // Grand Opening: Saturday 12 July 2025 at 10:00 AM
                    const grandOpeningDate = new Date('2025-07-12T10:00:00');
                    return grandOpeningDate;
                  })()}
                />
              </motion.div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative text-center">
                <div 
                  ref={imageParallax.ref}
                  className="w-96 h-96 sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px] mx-auto relative parallax-element"
                  style={{ transform: imageParallax.transform }}
                >
                  <Image
                    src="/images/fitness-activity.png"
                    alt="Strength Training"
                    fill
                    className="object-contain opacity-95 hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl"
                    sizes="(max-width: 768px) 384px, (max-width: 1024px) 800px, 1000px"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden section-transition programs-bg fade-overlay">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm sm:text-base lg:text-lg">OUR PROGRAMS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 mt-2">
              BUILD YOUR <AnimatedGradientText 
                className="inline-block"
                colors={['#1e9b71', '#3b82f6', '#8b5cf6', '#ef4444', '#1e9b71']}
                duration="5s"
              >
                BEST BODY
              </AnimatedGradientText>
            </h2>
          </motion.div>

          {/* Main Content Container */}
          <div className="relative max-w-7xl mx-auto">
            {/* Man Rope Image - Large Background with Parallax */}
            <motion.div
              className="hidden lg:block absolute left-0 bottom-0 transform -translate-y-1/2 z-0 parallax-element parallax-bg-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/images/man-rope.png"
                alt="Battle Rope Training"
                width={600}
                height={800}
                className="w-80 lg:w-96 xl:w-[28rem] h-auto opacity-90 drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Parallax Cards Grid - Positioned to work with rope man */}
            <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:ml-64 xl:ml-80 max-w-5xl">
              <ParallaxCard
                title="Pure Muscle"
                description="Professional strength training designed to build lean muscle mass and increase power through progressive overload."
                icon={
                  <div className="w-8 h-8 relative">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600"
                      style={{
                        WebkitMask: 'url(/images/programs/muscle.svg) no-repeat center',
                        WebkitMaskSize: 'contain',
                        mask: 'url(/images/programs/muscle.svg) no-repeat center',
                        maskSize: 'contain',
                        filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
                      }}
                    />
                  </div>
                }
                gradient="bg-gradient-to-br from-blue-500/20 to-blue-600/5"
                delay={0}
              />
              
              <ParallaxCard
                title="Cardio Training"
                description="High-intensity cardio workouts to burn fat and improve cardiovascular health with dynamic exercises."
                icon={
                  <div className="w-8 h-8 relative">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600"
                      style={{
                        WebkitMask: 'url(/images/programs/cardio.svg) no-repeat center',
                        WebkitMaskSize: 'contain',
                        mask: 'url(/images/programs/cardio.svg) no-repeat center',
                        maskSize: 'contain',
                        filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))'
                      }}
                    />
                  </div>
                }
                gradient="bg-gradient-to-br from-purple-500/20 to-purple-600/5"
                delay={0.1}
              />
              
              <ParallaxCard
                title="Health Fitness"
                description="Comprehensive health programs focusing on overall wellness and lifestyle transformation."
                icon={
                  <div className="w-8 h-8 relative">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"
                      style={{
                        WebkitMask: 'url(/images/programs/health.svg) no-repeat center',
                        WebkitMaskSize: 'contain',
                        mask: 'url(/images/programs/health.svg) no-repeat center',
                        maskSize: 'contain',
                        filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))'
                      }}
                    />
                  </div>
                }
                gradient="bg-gradient-to-br from-orange-500/20 to-orange-600/5"
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden section-transition features-bg fade-overlay section-blend">
        {/* Background Elements with Parallax */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 parallax-element parallax-bg-1" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30 parallax-element parallax-float-1" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30 parallax-element parallax-float-2" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-primary font-medium">✨ Why Choose MituGym</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              EXPERIENCE THE <AnimatedGradientText 
                className="inline-block"
                colors={['#1e9b71', '#10b981', '#3b82f6', '#8b5cf6', '#1e9b71']}
                duration="7s"
              >
                DIFFERENCE
              </AnimatedGradientText>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Discover what sets us apart with premium facilities, expert guidance, and a community 
              dedicated to helping you achieve extraordinary results.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-6"
            >
              {/* Elite Training Programs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 glass-effect hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-emerald-400/50 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/60 group-hover:shadow-emerald-500/80 transition-all duration-300 relative overflow-hidden">
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-green-500/30 rounded-xl"
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(16, 185, 129, 0.3) 0%, rgba(20, 184, 166, 0.3) 50%, rgba(34, 197, 94, 0.3) 100%)',
                            'linear-gradient(45deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(20, 184, 166, 0.3) 100%)',
                            'linear-gradient(45deg, rgba(20, 184, 166, 0.3) 0%, rgba(34, 197, 94, 0.3) 50%, rgba(16, 185, 129, 0.3) 100%)'
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div
                        className="w-7 h-7 relative z-10"
                        style={{
                          background: '#00ff88',
                          WebkitMask: 'url("/images/icons/fitness-level.svg") no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url("/images/icons/fitness-level.svg") no-repeat center',
                          maskSize: 'contain',
                          filter: 'drop-shadow(0 0 16px rgba(0, 255, 136, 0.8))'
                        }}
                      />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      Elite Training Programs
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      Scientifically designed workouts that adapt to your fitness level, ensuring optimal progress 
                      and sustainable results with our certified elite trainers.
                    </p>
                  </div>
                </div>
              </motion.div>

                             {/* Modern Facilities */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.4 }}
                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
                 className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 glass-effect hover:border-primary/30 transition-all duration-300"
               >
                 <div className="flex items-start gap-4">
                   <motion.div
                     className="flex-shrink-0"
                     whileHover={{ rotate: 10, scale: 1.1 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-blue-400/50 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/60 group-hover:shadow-blue-500/80 transition-all duration-300 relative overflow-hidden">
                       {/* Animated background glow */}
                       <motion.div 
                         className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-sky-500/30 rounded-xl"
                         animate={{
                           background: [
                             'linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(14, 165, 233, 0.3) 100%)',
                             'linear-gradient(45deg, rgba(14, 165, 233, 0.3) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(6, 182, 212, 0.3) 100%)',
                             'linear-gradient(45deg, rgba(6, 182, 212, 0.3) 0%, rgba(14, 165, 233, 0.3) 50%, rgba(59, 130, 246, 0.3) 100%)'
                           ]
                         }}
                         transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                       />
                       <div
                         className="w-7 h-7 relative z-10"
                         style={{
                           background: '#00aaff',
                           WebkitMask: 'url("/images/icons/Facilities-icon.svg") no-repeat center',
                           WebkitMaskSize: 'contain',
                           mask: 'url("/images/icons/Facilities-icon.svg") no-repeat center',
                           maskSize: 'contain',
                           filter: 'drop-shadow(0 0 16px rgba(0, 170, 255, 0.8))'
                         }}
                       />
                     </div>
                   </motion.div>
                   <div className="flex-1">
                     <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                       Modern Facilities
                     </h3>
                     <p className="text-white/70 leading-relaxed">
                       Brand new, spacious facilities with premium amenities including luxurious locker rooms, 
                       private changing areas, and refreshing shower facilities for your comfort.
                     </p>
                   </div>
                 </div>
               </motion.div>

              {/* State-of-the-Art Equipment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 glass-effect hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-violet-400/50 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/60 group-hover:shadow-violet-500/80 transition-all duration-300 relative overflow-hidden">
                      {/* Animated background glow */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-fuchsia-500/30 rounded-xl"
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.3) 50%, rgba(217, 70, 239, 0.3) 100%)',
                            'linear-gradient(45deg, rgba(217, 70, 239, 0.3) 0%, rgba(139, 92, 246, 0.3) 50%, rgba(168, 85, 247, 0.3) 100%)',
                            'linear-gradient(45deg, rgba(168, 85, 247, 0.3) 0%, rgba(217, 70, 239, 0.3) 50%, rgba(139, 92, 246, 0.3) 100%)'
                          ]
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div
                        className="w-7 h-7 relative z-10"
                        style={{
                          background: '#bb44ff',
                          WebkitMask: 'url("/images/icons/Facilities-icon.svg") no-repeat center',
                          WebkitMaskSize: 'contain',
                          mask: 'url("/images/icons/Facilities-icon.svg") no-repeat center',
                          maskSize: 'contain',
                          filter: 'drop-shadow(0 0 16px rgba(187, 68, 255, 0.8))'
                        }}
                      />
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      Premium Equipment
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      Latest generation fitness technology and commercial-grade equipment from top brands, 
                      meticulously maintained for optimal performance and safety.
                    </p>
                  </div>
                </div>
              </motion.div>

                             {/* Flexible Membership Plans */}
               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.6 }}
                 whileHover={{ y: -5, transition: { duration: 0.2 } }}
                 className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 glass-effect hover:border-primary/30 transition-all duration-300"
               >
                 <div className="flex items-start gap-4">
                   <motion.div
                     className="flex-shrink-0"
                     whileHover={{ rotate: 10, scale: 1.1 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className="w-14 h-14 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-orange-400/50 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/60 group-hover:shadow-orange-500/80 transition-all duration-300 relative overflow-hidden">
                       {/* Animated background glow */}
                       <motion.div 
                         className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-amber-500/30 to-yellow-500/30 rounded-xl"
                         animate={{
                           background: [
                             'linear-gradient(45deg, rgba(249, 115, 22, 0.3) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(234, 179, 8, 0.3) 100%)',
                             'linear-gradient(45deg, rgba(234, 179, 8, 0.3) 0%, rgba(249, 115, 22, 0.3) 50%, rgba(245, 158, 11, 0.3) 100%)',
                             'linear-gradient(45deg, rgba(245, 158, 11, 0.3) 0%, rgba(234, 179, 8, 0.3) 50%, rgba(249, 115, 22, 0.3) 100%)'
                           ]
                         }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       />
                       <div
                         className="w-7 h-7 relative z-10"
                         style={{
                           background: '#ff8800',
                           WebkitMask: 'url("/images/icons/membership-icon.svg") no-repeat center',
                           WebkitMaskSize: 'contain',
                           mask: 'url("/images/icons/membership-icon.svg") no-repeat center',
                           maskSize: 'contain',
                           filter: 'drop-shadow(0 0 16px rgba(255, 136, 0, 0.8))'
                         }}
                       />
                     </div>
                   </motion.div>
                   <div className="flex-1">
                     <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                       Flexible Membership Plans
                     </h3>
                     <p className="text-white/70 leading-relaxed">
                       Choose from affordable membership options designed to fit your lifestyle and budget, 
                       with no long-term commitments and special grand opening discounts available.
                     </p>
                   </div>
                 </div>
               </motion.div>
            </motion.div>

            {/* Interactive Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative">
                {/* Main Image */}
                <motion.div
                  className="relative h-[400px] sm:h-[500px] lg:h-[700px] rounded-3xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Professional fitness training at MituGym"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                                     {/* Floating Stats Cards */}
                   <motion.div
                     className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
                     initial={{ opacity: 0, y: -20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: 0.8 }}
                     whileHover={{ scale: 1.05 }}
                   >
                     <div className="text-2xl sm:text-3xl font-bold text-primary">1000m²</div>
                     <div className="text-white/80 text-sm">Training Space</div>
                   </motion.div>
                   
                   <motion.div
                     className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.6, delay: 1 }}
                     whileHover={{ scale: 1.05 }}
                   >
                     <div className="text-2xl sm:text-3xl font-bold text-primary">NEW</div>
                     <div className="text-white/80 text-sm">Grand Opening</div>
                   </motion.div>
                </motion.div>

                {/* Background Decoration */}
                <div className="absolute -z-10 top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Training Excellence Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden section-transition training-bg fade-overlay section-blend">
        {/* Background Elements with Parallax */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-70 parallax-element parallax-bg-1" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-40 parallax-element parallax-float-2" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-40 parallax-element parallax-float-3" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-blue-400 font-medium">🚀 Coming Soon</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              EXPERT GUIDANCE <span className="gradient-text">AWAITS</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We&apos;re assembling a team of elite fitness professionals who will provide personalized training, 
              nutrition guidance, and motivation to help you achieve extraordinary results.
            </p>
          </motion.div>

          {/* Training Excellence Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Strength & Conditioning */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0,
                type: "spring",
                stiffness: 100 
              }}
              className="group"
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl h-full bg-gradient-to-br from-primary/20 to-primary/5 border border-white/10 backdrop-blur-sm shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(30, 155, 113, 0.3)",
                }}
              >
                                {/* Icon Header */}
                <div className="relative p-6 sm:p-8 text-center">
                  <Tooltip 
                    content="Progressive strength training with professional coaching to build muscle mass and increase power output safely and effectively."
                    placement="top"
                  >
                    <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-emerald-500/40 cursor-help group-hover:shadow-emerald-400/60 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-green-400/20 rounded-xl"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.2) 50%, rgba(34, 197, 94, 0.2) 100%)',
                          'linear-gradient(45deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 50%, rgba(20, 184, 166, 0.2) 100%)',
                          'linear-gradient(45deg, rgba(20, 184, 166, 0.2) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(16, 185, 129, 0.2) 100%)'
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div
                      className="w-10 h-10 relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #22c55e 100%)',
                        WebkitMask: 'url("/images/icons/dumbbell.svg") no-repeat center',
                        WebkitMaskSize: 'contain',
                        mask: 'url("/images/icons/dumbbell.svg") no-repeat center',
                        maskSize: 'contain',
                        filter: 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))'
                      }}
                    />
                  </motion.div>
                  </Tooltip>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Strength & Conditioning</h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    Expert-led strength training programs designed to build muscle, increase power, and improve athletic performance.
                  </p>
                  
                  {/* Future Features */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Powerlifting & Olympic Lifting</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Progressive Overload Programs</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Form & Technique Mastery</span>
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Functional Training */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1,
                type: "spring",
                stiffness: 100 
              }}
              className="group"
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl h-full bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-white/10 backdrop-blur-sm shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.3)",
                }}
              >
                {/* Icon Header */}
                <div className="relative p-6 sm:p-8 text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 backdrop-blur-sm border border-violet-400/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-violet-500/40 group-hover:shadow-violet-400/60 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-fuchsia-400/20 rounded-xl"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(217, 70, 239, 0.2) 100%)',
                          'linear-gradient(45deg, rgba(217, 70, 239, 0.2) 0%, rgba(139, 92, 246, 0.2) 50%, rgba(168, 85, 247, 0.2) 100%)',
                          'linear-gradient(45deg, rgba(168, 85, 247, 0.2) 0%, rgba(217, 70, 239, 0.2) 50%, rgba(139, 92, 246, 0.2) 100%)'
                        ]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div
                      className="w-10 h-10 relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)',
                        WebkitMask: 'url("/images/icons/lightning-bolt.svg") no-repeat center',
                        WebkitMaskSize: 'contain',
                        mask: 'url("/images/icons/lightning-bolt.svg") no-repeat center',
                        maskSize: 'contain',
                        filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.6))'
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Functional Training</h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    Movement-based workouts that improve daily activities, mobility, and overall functional fitness.
                  </p>
                  
                  {/* Future Features */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">HIIT & Circuit Training</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Mobility & Flexibility</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Injury Prevention</span>
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Wellness & Recovery */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring",
                stiffness: 100 
              }}
              className="group sm:col-span-2 lg:col-span-1"
            >
              <motion.div
                className="relative overflow-hidden rounded-3xl h-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-white/10 backdrop-blur-sm shadow-2xl group-hover:shadow-3xl transition-all duration-500"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)",
                }}
              >
                {/* Icon Header */}
                <div className="relative p-6 sm:p-8 text-center">
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-sky-500/20 to-blue-500/20 backdrop-blur-sm border border-sky-400/30 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-sky-500/40 group-hover:shadow-sky-400/60 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Animated background glow */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-cyan-400/20 rounded-xl"
                      animate={{
                        background: [
                          'linear-gradient(45deg, rgba(59, 130, 246, 0.2) 0%, rgba(14, 165, 233, 0.2) 50%, rgba(6, 182, 212, 0.2) 100%)',
                          'linear-gradient(45deg, rgba(6, 182, 212, 0.2) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(14, 165, 233, 0.2) 100%)',
                          'linear-gradient(45deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(59, 130, 246, 0.2) 100%)'
                        ]
                      }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div
                      className="w-10 h-10 relative z-10"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #06b6d4 100%)',
                        WebkitMask: 'url("/images/icons/heart.svg") no-repeat center',
                        WebkitMaskSize: 'contain',
                        mask: 'url("/images/icons/heart.svg") no-repeat center',
                        maskSize: 'contain',
                        filter: 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))'
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Wellness & Recovery</h3>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    Holistic approach to health including nutrition guidance, stress management, and recovery protocols.
                  </p>
                  
                  {/* Future Features */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Nutrition Counseling</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Yoga & Mindfulness</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-white/80 text-xs sm:text-sm">Recovery Protocols</span>
                    </div>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12 sm:mt-16"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Interested in <span className="text-primary">Joining Our Team?</span>
              </h3>
              <p className="text-white/70 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
                We&apos;re looking for passionate, certified fitness professionals who share our commitment to excellence. 
                If you&apos;re ready to inspire and transform lives, we&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShinyButton
                      variant="primary"
                      size="md"
                      className="text-sm sm:text-base"
                    >
                      Apply to Join Our Team
                    </ShinyButton>
                  </motion.div>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShinyButton
                    variant="outline"
                    size="md"
                    className="text-sm sm:text-base"
                  >
                    Learn More
                  </ShinyButton>
                </motion.div>
              </div>
            </div>
          </motion.div>

          
        </div>
      </section>

      {/* Get Ready Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden section-transition success-bg fade-overlay section-blend">
        {/* Background Elements with Parallax */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-70 parallax-element parallax-bg-2" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-30 parallax-element parallax-float-1" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30 parallax-element parallax-float-3" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <span className="text-primary font-medium">⏰ Opening Soon</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              GET READY FOR <span className="gradient-text">SOMETHING AMAZING</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We&apos;re putting the finishing touches on our brand-new facility! Be among the first to experience 
              premium equipment, modern amenities, and a welcoming community atmosphere.
            </p>
          </motion.div>

          {/* Pre-Opening Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 glass-effect hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm border border-emerald-400/60 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-emerald-500/70 group-hover:shadow-emerald-500/90 transition-all duration-300 relative overflow-hidden"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/35 via-teal-500/35 to-green-500/35 rounded-2xl"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(16, 185, 129, 0.35) 0%, rgba(20, 184, 166, 0.35) 50%, rgba(34, 197, 94, 0.35) 100%)',
                      'linear-gradient(45deg, rgba(34, 197, 94, 0.35) 0%, rgba(16, 185, 129, 0.35) 50%, rgba(20, 184, 166, 0.35) 100%)',
                      'linear-gradient(45deg, rgba(20, 184, 166, 0.35) 0%, rgba(34, 197, 94, 0.35) 50%, rgba(16, 185, 129, 0.35) 100%)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="w-8 h-8 relative z-10"
                  style={{
                    background: '#00ff88',
                    WebkitMask: 'url("/images/icons/premium-icon.svg") no-repeat center',
                    WebkitMaskSize: 'contain',
                    mask: 'url("/images/icons/premium-icon.svg") no-repeat center',
                    maskSize: 'contain',
                    filter: 'drop-shadow(0 0 18px rgba(0, 255, 136, 0.9))'
                  }}
                />
              </motion.div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1000m²</div>
                <h3 className="text-xl font-semibold text-white mb-3">Premium Space</h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Spacious training areas with natural lighting and modern ventilation for optimal comfort
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 glass-effect hover:border-purple-400/30 transition-all duration-300"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm border border-violet-400/60 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-violet-500/70 group-hover:shadow-violet-500/90 transition-all duration-300 relative overflow-hidden"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/35 via-purple-500/35 to-fuchsia-500/35 rounded-2xl"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(139, 92, 246, 0.35) 0%, rgba(168, 85, 247, 0.35) 50%, rgba(217, 70, 239, 0.35) 100%)',
                      'linear-gradient(45deg, rgba(217, 70, 239, 0.35) 0%, rgba(139, 92, 246, 0.35) 50%, rgba(168, 85, 247, 0.35) 100%)',
                      'linear-gradient(45deg, rgba(168, 85, 247, 0.35) 0%, rgba(217, 70, 239, 0.35) 50%, rgba(139, 92, 246, 0.35) 100%)'
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="w-8 h-8 relative z-10"
                  style={{
                    background: '#bb44ff',
                    WebkitMask: 'url("/images/icons/new-Equipment.svg") no-repeat center',
                    WebkitMaskSize: 'contain',
                    mask: 'url("/images/icons/new-Equipment.svg") no-repeat center',
                    maskSize: 'contain',
                    filter: 'drop-shadow(0 0 18px rgba(187, 68, 255, 0.9))'
                  }}
                />
              </motion.div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">Latest</div>
                <h3 className="text-xl font-semibold text-white mb-3">Equipment</h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Brand new commercial-grade fitness machines and free weights from top manufacturers
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 glass-effect hover:border-blue-400/30 transition-all duration-300 sm:col-span-2 lg:col-span-1"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-black/50 to-black/30 backdrop-blur-sm border border-sky-400/60 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg shadow-sky-500/70 group-hover:shadow-sky-500/90 transition-all duration-300 relative overflow-hidden"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-sky-500/35 via-blue-500/35 to-cyan-500/35 rounded-2xl"
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(59, 130, 246, 0.35) 0%, rgba(14, 165, 233, 0.35) 50%, rgba(6, 182, 212, 0.35) 100%)',
                      'linear-gradient(45deg, rgba(6, 182, 212, 0.35) 0%, rgba(59, 130, 246, 0.35) 50%, rgba(14, 165, 233, 0.35) 100%)',
                      'linear-gradient(45deg, rgba(14, 165, 233, 0.35) 0%, rgba(6, 182, 212, 0.35) 50%, rgba(59, 130, 246, 0.35) 100%)'
                    ]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <div
                  className="w-8 h-8 relative z-10"
                  style={{
                    background: '#0099ff',
                    WebkitMask: 'url("/images/icons/community.svg") no-repeat center',
                    WebkitMaskSize: 'contain',
                    mask: 'url("/images/icons/community.svg") no-repeat center',
                    maskSize: 'contain',
                    filter: 'drop-shadow(0 0 18px rgba(0, 153, 255, 0.9))'
                  }}
                />
              </motion.div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">New</div>
                <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Join our growing community of fitness enthusiasts and be part of something special from day one
                </p>
              </div>
            </motion.div>
          </div>

          {/* Opening Success Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mb-8 mx-auto shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f0f9ff" />
                    </linearGradient>
                  </defs>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="url(#starGrad)" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </motion.div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                Reserve Your <span className="gradient-text">Founding Membership</span>
              </h3>
              <p className="text-white/70 mb-8 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                Secure your spot as a founding member of MituGym. Get exclusive pre-opening rates, 
                priority access, and special benefits when we officially open our doors.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShinyButton
                    variant="primary"
                    size="lg"
                    className="text-base"
                  >
                    Reserve Your Spot
                  </ShinyButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShinyButton
                    variant="outline"
                    size="lg"
                    className="text-base"
                  >
                    Get Notified
                  </ShinyButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 mt-2">
              Membership
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
              Gym session walk can help. Physical activity stimulates<br className="hidden sm:block" />
              many brain chemicals that may leave you.
            </p>
          </motion.div>

          {/* Premium Plans - Silver, Gold, Platinum */}
          {(() => {
            const plans = [
              {
                name: "Silver",
                price: "$29",
                originalPrice: "$39",
                gradient: "from-gray-800/90 to-gray-900/90",
                isPopular: false,
                features: [
                  { text: "Access to gym equipment", enabled: true },
                  { text: "Locker room access", enabled: true },
                  { text: "Basic workout plans", enabled: true },
                  { text: "Group fitness classes", enabled: false },
                  { text: "Personal trainer sessions", enabled: false },
                  { text: "Nutrition consultation", enabled: false },
                  { text: "Premium amenities", enabled: false }
                ]
              },
              {
                name: "Gold",
                price: "$49",
                originalPrice: "$69",
                gradient: "from-[#1e9b71]/20 to-emerald-900/30",
                isPopular: true,
                features: [
                  { text: "Access to gym equipment", enabled: true },
                  { text: "Locker room access", enabled: true },
                  { text: "Basic workout plans", enabled: true },
                  { text: "Group fitness classes", enabled: true },
                  { text: "Personal trainer sessions", enabled: true },
                  { text: "Nutrition consultation", enabled: false },
                  { text: "Premium amenities", enabled: false }
                ]
              },
              {
                name: "Platinum",
                price: "$89",
                originalPrice: "$119",
                gradient: "from-slate-800/40 to-slate-900/40",
                isPopular: false,
                features: [
                  { text: "Access to gym equipment", enabled: true },
                  { text: "Locker room access", enabled: true },
                  { text: "Basic workout plans", enabled: true },
                  { text: "Group fitness classes", enabled: true },
                  { text: "Personal trainer sessions", enabled: true },
                  { text: "Nutrition consultation", enabled: true },
                  { text: "Premium amenities", enabled: true }
                ]
              }
            ]

            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-6xl mx-auto">
                {plans.map((plan, index) => (
                  <PlanCard
                    key={plan.name}
                    name={plan.name}
                    price={plan.price}
                    originalPrice={plan.originalPrice}
                    features={plan.features}
                    delay={index * 0.2}
                    isPopular={plan.isPopular}
                    gradient={plan.gradient}
                  />
                ))}
              </div>
            )
          })()}

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/prices">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShinyButton
                  variant="secondary"
                  size="md"
                  className="text-sm sm:text-base"
                >
                  View All Plans
                </ShinyButton>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaqSection 
              data={popularFAQs}
              title={t('faq.titles.general')}
              subtitle={t('faq.subtitles.general')}
            />
          </motion.div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-primary/30 to-purple-600/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 glass-effect text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-4 sm:mb-6">
              JOIN OUR <AnimatedGradientText 
                className="inline-block"
                colors={['#1e9b71', '#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b', '#1e9b71']}
                duration="6s"
              >
                COMMUNITY
              </AnimatedGradientText>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Get 15% off your first three months when you sign up for our newsletter. 
              Receive workout tips, nutrition advice, and exclusive member benefits.
            </p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-primary text-sm sm:text-base"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShinyButton
                  variant="primary"
                  size="md"
                  className="whitespace-nowrap text-sm sm:text-base"
                >
                  Get Started
                </ShinyButton>
              </motion.div>
            </motion.div>

            <div className="text-white/60 text-xs sm:text-sm">
              No spam. Unsubscribe at any time. By signing up, you agree to our terms.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 