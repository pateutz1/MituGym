import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
// Premium Components
import BackgroundBeams from '@/components/ui/background-beams';
import Card3D from '@/components/ui/card-3d';
import FaqSection from '@/components/ui/faq';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import MagneticButton from '@/components/ui/magnetic-button';
import Meteors from '@/components/ui/meteors';
import NumberTicker from '@/components/ui/number-ticker';
import ScrollProgress from '@/components/ui/scroll-progress';
import ShinyButton from '@/components/ui/shiny-button';
import TypingText from '@/components/ui/typing-text';
import { generalFAQs } from '@/data/faqData';
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTranslation } from '@/hooks/useTranslation';



export default function About() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  // const { startTracking, endTracking } = useAnimationPerformance('AboutPage')
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const _y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : -100]
  );
  const _opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  // Accessible animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  });

  const _cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  });

  const ourValues = [
    {
      title: 'Excellence First',
      summary: 'Premium quality in everything we do',
      content:
        "We believe that excellence isn't just a goal—it's our standard. From state-of-the-art equipment to certified trainers, every aspect of FitPro Center is designed to exceed your expectations and help you achieve results that last.",
      icon: '⭐',
      gradient: 'from-yellow-500/20 to-orange-500/20',
    },
    {
      title: 'Community Driven',
      summary: 'Building connections through fitness',
      content:
        "At FitPro Center, we're more than just a gym—we're a family. Our supportive community encourages each member to push their limits, celebrate victories, and overcome challenges together. Your success is our success.",
      icon: '🤝',
      gradient: 'from-blue-500/20 to-purple-500/20',
    },
    {
      title: 'Innovation & Progress',
      summary: 'Constantly evolving with latest fitness trends',
      content:
        'We stay ahead of the curve by continuously updating our equipment, training methods, and programs. Our commitment to innovation ensures you always have access to the most effective and cutting-edge fitness solutions.',
      icon: '🚀',
      gradient: 'from-primary/20 to-emerald-500/20',
    },
    {
      title: 'Personalized Approach',
      summary: 'Every member gets individual attention',
      content:
        'We understand that every fitness journey is unique. Our certified trainers work with you to create personalized workout plans, nutrition guidance, and support systems tailored to your specific goals and lifestyle.',
      icon: '🎯',
      gradient: 'from-pink-500/20 to-red-500/20',
    },
  ];

  const stats = [
    { value: 500, suffix: 'm²', label: 'Training Space', delay: 0.2 },
    { value: 95, suffix: '%', label: 'Satisfaction Rate', delay: 0.4 },
    { value: 1000, suffix: '+', label: 'Members', delay: 0.6 },
    { value: 24, suffix: '/7', label: 'Access Hours', delay: 0.8 },
  ];

  const achievements = [
    {
      title: 'Award Winning',
      description: 'Best Gym 2023 & 2024',
      icon: '🏆',
      color: '#f59e0b',
    },
    {
      title: 'Certified Trainers',
      description: 'Expert fitness professionals',
      icon: '🎓',
      color: '#3b82f6',
    },
    {
      title: 'Premium Equipment',
      description: 'Latest technology & gear',
      icon: '💪',
      color: '#1e9b71',
    },
    {
      title: 'Member Focused',
      description: 'Your success is our priority',
      icon: '❤️',
      color: '#ef4444',
    },
  ];

  return (
    <>
      <ScrollProgress />
      <div className="relative min-h-screen" ref={containerRef}>
        {/* Hero Section with Geometric Shapes */}
        <HeroGeometric 
          badge="💪 Our Story"
          title1="ABOUT"
          title2="FITPRO CENTER"
          description="Where fitness excellence meets premium experience and every member becomes family. We transform dreams into reality through strength, wellness, and championship mindset."
        />

        {/* Stats Section - Premium Design */}
        <section className="relative overflow-hidden py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5" />
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 opacity-30 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-blue-500/10 opacity-30 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <motion.div
                className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-6 py-3"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span className="font-semibold text-primary">
                  📊 Our Excellence
                </span>
              </motion.div>

              <h2 className="mb-8 font-bold font-display text-5xl text-white md:text-6xl lg:text-7xl">
                BY THE <span className="text-primary">NUMBERS</span>
              </h2>
              <p className="mx-auto max-w-3xl text-white/70 text-xl leading-relaxed md:text-2xl">
                Our commitment to excellence reflected in every metric that
                matters
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  className="group relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  key={index}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <motion.div
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-surface/40 to-surface/10 p-8 text-center backdrop-blur-sm transition-all duration-500 hover:border-primary/30"
                    whileHover={{
                      y: -8,
                      boxShadow: '0 25px 50px -12px rgba(30, 155, 113, 0.2)',
                    }}
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Decorative elements */}
                    <div className="-top-10 -right-10 absolute h-20 w-20 rounded-full bg-primary/20 opacity-50 blur-xl" />
                    <div className="-bottom-10 -left-10 absolute h-16 w-16 rounded-full bg-blue-500/20 opacity-50 blur-xl" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-6">
                        <NumberTicker
                          className="font-bold text-5xl text-white transition-colors duration-500 group-hover:text-primary md:text-6xl lg:text-7xl"
                          delay={stat.delay + 0.5}
                          duration={2.5}
                          suffix={stat.suffix}
                          value={stat.value}
                        />
                      </div>

                      <h3 className="font-semibold text-lg text-white/90 transition-colors duration-500 group-hover:text-white md:text-xl">
                        {stat.label}
                      </h3>

                      {/* Bottom accent line */}
                      <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-blue-500 opacity-50 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Additional info section */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <p className="mx-auto max-w-2xl text-white/60 leading-relaxed">
                These numbers represent more than statistics—they embody our
                promise to deliver exceptional fitness experiences that
                transform lives and build lasting wellness.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section with 3D Cards */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 font-bold font-display text-4xl text-white md:text-5xl">
                OUR <span className="text-primary">STORY</span>
              </h2>
              <p className="mx-auto max-w-3xl text-white/70 text-xl">
                From vision to reality - discover the journey that created
                FitPro Center&apos;s premium fitness experience
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
              <Card3D className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 to-blue-500/10 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                      <span className="text-2xl">🏋️</span>
                    </div>
                    <h3 className="font-bold text-2xl text-white">
                      Premium Excellence
                    </h3>
                  </div>
                  <p className="mb-6 text-white/80 leading-relaxed">
                    FitPro Center was born from a simple belief: everyone deserves
                    access to premium fitness facilities and expert guidance.
                    Our state-of-the-art equipment and certified trainers create
                    an environment where your fitness goals become reality.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    From high-intensity strength training to personalized
                    nutrition plans, we provide everything you need to transform
                    your body and mind with uncompromising quality.
                  </p>
                </div>
              </Card3D>

              <Card3D className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-pink-500/10 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <h3 className="font-bold text-2xl text-white">
                      Innovation First
                    </h3>
                  </div>
                  <p className="mb-6 text-white/80 leading-relaxed">
                    Join our community and discover what it means to train with
                    purpose. Our commitment to excellence, innovation, and
                    personalized service has made us the premier fitness
                    destination in the region.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Whether you&apos;re a beginner or a seasoned athlete,
                    FitPro Center provides the tools, support, and motivation you need
                    to exceed your expectations and achieve extraordinary
                    results.
                  </p>
                </div>
              </Card3D>
            </div>
          </div>
        </section>

        {/* Values Bento Grid */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 font-bold font-display text-4xl text-white md:text-5xl">
                OUR <span className="text-primary">VALUES</span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70 text-xl">
                The core principles that drive everything we do at FitPro Center
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
              {ourValues.map((value, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  key={value.title}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card3D className="h-full">
                    <div
                      className={`bg-gradient-to-br ${value.gradient} h-full rounded-2xl border border-white/10 p-8 backdrop-blur-sm`}
                    >
                      <div className="mb-6 flex items-center">
                        <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                          <span className="text-3xl">{value.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-xl">
                            {value.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {value.summary}
                          </p>
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
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 font-bold font-display text-4xl text-white md:text-5xl">
                WHY CHOOSE <span className="text-primary">US</span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70 text-xl">
                Recognized excellence in every aspect of fitness and wellness
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  key={achievement.title}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card3D>
                    <div className="h-full rounded-2xl border border-white/10 bg-surface/30 p-6 text-center backdrop-blur-sm">
                      <div
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${achievement.color}20` }}
                      >
                        <span className="text-3xl">{achievement.icon}</span>
                      </div>
                      <h3 className="mb-2 font-bold text-lg text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-white/70">
                        {achievement.description}
                      </p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <FaqSection
                data={generalFAQs}
                subtitle={t('faq.subtitles.facility')}
                title={t('faq.titles.facility')}
              />
            </motion.div>
          </div>
        </section>

        {/* Call to Action with Meteors */}
        <section className="relative overflow-hidden py-20">
          <Meteors className="opacity-60" number={25} />
          <BackgroundBeams beamCount={3} className="opacity-30" />

          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 to-blue-500/10 p-12 text-center backdrop-blur-sm lg:p-16"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-primary/20 opacity-50 blur-3xl" />
              <div className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-blue-500/20 opacity-50 blur-3xl" />

              <div className="relative z-10">
                <h2 className="mb-6 font-bold font-display text-3xl text-white md:text-5xl">
                  Ready to Start Your{' '}
                  <span className="text-primary">Transformation</span>?
                </h2>
                <p className="mx-auto mb-10 max-w-3xl text-white/80 text-xl">
                  Join FitPro Center today and experience the difference of training
                  with premium equipment, expert guidance, and a supportive
                  community that celebrates your success.
                </p>

                <div className="flex flex-col justify-center gap-6 sm:flex-row">
                  <Link href="/contact">
                    <ShinyButton className="px-10 py-4 text-lg" size="lg">
                      Start Your Journey Today
                    </ShinyButton>
                  </Link>
                  <Link href="/prices">
                    <MagneticButton
                      className="border-2 border-primary bg-transparent px-10 py-4 text-lg text-primary transition-all duration-300 hover:bg-primary hover:text-white"
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
  );
}
