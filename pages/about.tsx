import { motion, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import FaqSection from '@/components/ui/faq'
import ShinyButton from '@/components/ui/shiny-button'
import Counter from '@/components/ui/counter'
import TypingText from '@/components/ui/typing-text'
import MagneticButton from '@/components/ui/magnetic-button'
import ExpandableCard from '@/components/ui/expandable-card'
import StaggeredList from '@/components/ui/staggered-list'
import ScrollProgress from '@/components/ui/scroll-progress'
import { generalFAQs } from '@/data/faqData'

export default function About() {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const ourValues = [
    {
      title: "Excellence First",
      summary: "Premium quality in everything we do",
      content: "We believe that excellence isn't just a goal—it's our standard. From state-of-the-art equipment to certified trainers, every aspect of MituGym is designed to exceed your expectations and help you achieve results that last."
    },
    {
      title: "Community Driven",
      summary: "Building connections through fitness",
      content: "At MituGym, we're more than just a gym—we're a family. Our supportive community encourages each member to push their limits, celebrate victories, and overcome challenges together. Your success is our success."
    },
    {
      title: "Innovation & Progress",
      summary: "Constantly evolving with latest fitness trends",
      content: "We stay ahead of the curve by continuously updating our equipment, training methods, and programs. Our commitment to innovation ensures you always have access to the most effective and cutting-edge fitness solutions."
    },
    {
      title: "Personalized Approach",
      summary: "Every member gets individual attention",
      content: "We understand that every fitness journey is unique. Our certified trainers work with you to create personalized workout plans, nutrition guidance, and support systems tailored to your specific goals and lifestyle."
    }
  ]

  const achievements = [
    "🏆 Awarded 'Best Gym' 3 years running",
    "👥 Over 2,000 satisfied members",
    "💪 500+ successful transformations",
    "🎯 95% member retention rate",
    "⭐ 4.9/5 average rating",
    "🏅 Certified by top fitness organizations"
  ]

  const facilities = [
    "🏋️‍♂️ Professional strength training area",
    "🏃‍♀️ Cardio zone with premium equipment",
    "🤸‍♂️ Functional training space",
    "🧘‍♀️ Dedicated yoga and flexibility area",
    "🚿 Luxury locker rooms with amenities",
    "🍃 Climate-controlled environment",
    "📱 Smart equipment with app integration",
    "🎯 Personal training studios"
  ]

  return (
    <>
      <ScrollProgress />
      <div ref={containerRef} className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Enhanced Header with Parallax */}
          <motion.div
            className="text-center mb-16 relative"
            style={{ y, opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl blur-3xl opacity-30" />
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-block bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
              >
                <span className="text-primary font-medium">💪 Our Story</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
                ABOUT <motion.span
                  className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  MITUGYM
                </motion.span>
              </h1>
              
              <div className="text-xl text-white/70 max-w-3xl mx-auto">
                <p className="mb-4">Discover the story behind MituGym - where fitness meets excellence and</p>
                <TypingText
                  texts={[
                    "every member becomes family.",
                    "dreams become reality.",
                    "strength is built daily.",
                    "wellness is a lifestyle.",
                    "transformation happens.",
                    "excellence is standard."
                  ]}
                  typingSpeed={70}
                  deletingSpeed={35}
                  pauseDuration={2500}
                  startDelay={2000}
                  className="text-primary font-semibold"
                  cursor="|"
                />
              </div>
            </div>
          </motion.div>

          {/* Enhanced Our Story Section */}
          <section className="mb-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-8"
              >
                <div className="bg-surface/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
                  <span className="text-primary font-semibold text-sm sm:text-base lg:text-lg">OUR STORY</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-6 mt-2">
                    WHERE FITNESS <span className="gradient-text">BEGINS</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                      <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                        MituGym was born from a simple belief: everyone deserves access to premium fitness facilities and expert guidance. 
                        Our state-of-the-art equipment and certified trainers create an environment where your fitness goals become reality.
                      </p>
                      <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                        From high-intensity strength training to personalized nutrition plans, we provide everything you need to transform 
                        your body and mind.
                      </p>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                        Join our community and discover what it means to train with purpose. Our commitment to excellence, innovation, 
                        and personalized service has made us the premier fitness destination.
                      </p>
                      <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                        Whether you're a beginner or a seasoned athlete, MituGym provides the tools, support, and motivation 
                        you need to exceed your expectations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                  <motion.div 
                    className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-2">
                      <Counter
                        target={500}
                        suffix="m²"
                        duration={2000}
                        delay={300}
                        className="text-3xl text-primary"
                      />
                    </div>
                    <div className="text-white/70 text-sm font-medium">Training Space</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-2 text-primary">
                      Premium
                    </div>
                    <div className="text-white/70 text-sm font-medium">Equipment</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="space-y-1 mb-2">
                      <div className="text-xs font-semibold text-primary/80">Monday - Friday</div>
                      <div className="text-xl font-bold text-primary">6:00 - 23:00</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-white/60 mb-2">
                      <div>Sat: 7:00-22:00</div>
                      <div>Sun: 7:00-20:00</div>
                    </div>
                    <div className="text-white/70 text-sm font-medium">Access Hours</div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold mb-2">
                      <Counter
                        target={100}
                        suffix="%"
                        duration={2500}
                        delay={900}
                        className="text-3xl text-primary"
                      />
                    </div>
                    <div className="text-white/70 text-sm font-medium">Premium Quality</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* New Values Section with ExpandableCard */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-primary font-semibold text-sm sm:text-base lg:text-lg">OUR VALUES</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 mt-2">
                WHAT DRIVES <span className="gradient-text">US</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Our core values shape every aspect of your MituGym experience
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {ourValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ExpandableCard
                    title={value.title}
                    summary={value.summary}
                    content={value.content}
                    className="h-full"
                  />
                </motion.div>
              ))}
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

          {/* Enhanced Call to Action */}
          <motion.div
            className="text-center bg-gradient-to-br from-primary/20 to-blue-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Start Your Fitness Journey?
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Join MituGym today and experience the difference of training with premium equipment, expert guidance, and a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <MagneticButton strength={0.3}>
                    Get Started Today
                  </MagneticButton>
                </Link>
                <Link href="/prices">
                  <MagneticButton 
                    className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    strength={0.2}
                  >
                    View Pricing
                  </MagneticButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
} 