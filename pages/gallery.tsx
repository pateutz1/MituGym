import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import BackgroundBeams from '@/components/ui/background-beams';
import Card3D from '@/components/ui/card-3d';
import FocusCards from '@/components/ui/focus-cards';
import GalleryModal from '@/components/ui/gallery-modal';
import ScrollProgress from '@/components/ui/scroll-progress';
import ShinyButton from '@/components/ui/shiny-button';
import TypingText from '@/components/ui/typing-text';
// import { useAnimationPerformance } from '@/hooks/usePerformanceMonitoring'
import { createAccessibleVariants } from '@/hooks/useMotionConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTranslation } from '@/hooks/useTranslation';

// Gallery data with categories
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern gym equipment',
    title: 'Premium Equipment',
    description:
      'State-of-the-art fitness machines from top manufacturers like Technogym and Life Fitness',
    category: 'Equipment',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Spacious gym interior',
    title: 'Spacious Training Area',
    description:
      'Over 500m² of premium training space with high ceilings and natural lighting',
    category: 'Interior',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Dynamic group fitness class',
    title: 'Group Fitness Classes',
    description:
      'High-energy group classes led by certified instructors in our dedicated studio',
    category: 'Classes',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Free weights training area',
    title: 'Free Weights Zone',
    description:
      'Complete range of dumbbells, barbells, and Olympic lifting equipment',
    category: 'Equipment',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Cardio equipment row',
    title: 'Cardio Zone',
    description:
      'Latest cardio machines with entertainment systems and heart rate monitoring',
    category: 'Equipment',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Luxury locker room',
    title: 'Premium Locker Rooms',
    description:
      'Spa-like amenities with spacious lockers, rain showers, and luxury finishes',
    category: 'Amenities',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Peaceful yoga class',
    title: 'Yoga & Meditation',
    description:
      'Tranquil studio space for yoga, meditation, and mindfulness practices',
    category: 'Classes',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Functional training area',
    title: 'Functional Training',
    description:
      'Versatile space for functional fitness, CrossFit, and athletic training',
    category: 'Training',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern reception area',
    title: 'Welcome Reception',
    description:
      'Contemporary entrance with comfortable seating and member services',
    category: 'Interior',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Personal training session',
    title: 'Personal Training',
    description:
      'One-on-one training sessions with certified fitness professionals',
    category: 'Training',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Stretching and recovery area',
    title: 'Recovery Zone',
    description:
      'Dedicated space for stretching, mobility work, and post-workout recovery',
    category: 'Training',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    alt: 'Community fitness event',
    title: 'Community Events',
    description:
      'Regular fitness challenges and social events to build lasting connections',
    category: 'Community',
  },
];

const categories = [
  'All',
  'Equipment',
  'Interior',
  'Classes',
  'Training',
  'Amenities',
  'Community',
];

export default function Gallery() {
  const { t } = useTranslation();
  const _prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filter images by category
  const filteredImages =
    selectedCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  // Animation variants
  const headerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  });

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const navigateImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <ScrollProgress />

      <div className="relative min-h-screen overflow-hidden bg-background">
        {/* Background effects */}
        <BackgroundBeams className="-z-10 absolute inset-0" />
        <div className="-z-10 absolute inset-0 bg-gradient-to-br from-background via-background to-background/95" />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              animate="visible"
              className="mx-auto max-w-4xl text-center"
              initial="hidden"
              transition={{ duration: 0.8 }}
              variants={headerVariants}
            >
              {/* Main heading */}
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <AnimatedGradientText className="mb-6 font-bold font-display text-6xl md:text-8xl">
                  Our Gallery
                </AnimatedGradientText>
                <div className="mb-6 text-2xl text-white/90 md:text-3xl">
                  <TypingText
                    className="font-display font-semibold"
                    texts={['Experience Premium Fitness']}
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto mb-12 max-w-3xl text-white/70 text-xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover our state-of-the-art facilities, premium equipment, and
                inspiring spaces designed to elevate your fitness journey. Every
                detail crafted for your success.
              </motion.p>

              {/* Gallery Highlight */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-primary/20 to-blue-600/20 p-6 text-center backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-center">
                    <svg
                      className="mr-3 h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <h3 className="font-bold text-white text-xl">
                      Professional Photography
                    </h3>
                  </div>
                  <p className="text-sm text-white/70">
                    Every image captures the essence of our premium facilities.
                    Click any photo to explore in full detail.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pt-1 pb-1">
          <div className="container mx-auto px-1">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              {categories.map((category) => (
                <motion.button
                  className={`rounded-full border px-6 py-3 transition-all duration-300 ${
                    selectedCategory === category
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                      : 'border-white/20 bg-transparent text-white/70 hover:border-primary hover:text-primary'
                  }`}
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid with Focus Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                initial={{ opacity: 0, y: 20 }}
                key={selectedCategory}
                transition={{ duration: 0.5 }}
              >
                <FocusCards
                  cards={filteredImages}
                  className="mb-16"
                  onCardClick={(card, _index) => {
                    const originalIndex = galleryImages.findIndex(
                      (img) => img.id === card.id
                    );
                    openModal(originalIndex);
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Featured Facilities */}
        <section className="bg-gradient-to-r from-primary/10 to-blue-600/10 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 font-bold font-display text-4xl text-white md:text-5xl">
                Premium <span className="text-primary">Facilities</span>
              </h2>
              <p className="mx-auto max-w-2xl text-white/70 text-xl">
                Every space is designed with attention to detail and your
                comfort in mind
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {galleryImages.slice(0, 6).map((image, index) => (
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  key={image.id}
                  onClick={() => openModal(index)}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <Card3D className="h-96 overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm">
                    <div className="relative h-2/3">
                      <Image
                        alt={image.alt}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        src={image.src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="h-1/3 p-6">
                      <h3 className="mb-2 font-bold text-white text-xl">
                        {image.title}
                      </h3>
                      <p className="line-clamp-2 text-sm text-white/70">
                        {image.description}
                      </p>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual Tour Invitation */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mx-auto max-w-4xl text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-surface/80 to-surface/40 p-8 backdrop-blur-xl md:p-12">
                <div className="mb-6 flex items-center justify-center">
                  <div className="rounded-full bg-primary/20 p-4">
                    <svg
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                  </div>
                </div>

                <h2 className="mb-6 font-bold font-display text-3xl text-white md:text-4xl">
                  Experience Our Facilities{' '}
                  <span className="text-primary">Virtually</span>
                </h2>

                <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
                  Take a comprehensive virtual tour through our premium
                  facilities. Explore every corner, from our cutting-edge
                  equipment to our luxury amenities.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <h4 className="mb-2 font-semibold text-white">
                      Equipment Zones
                    </h4>
                    <p className="text-sm text-white/60">
                      Explore our premium equipment areas
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <h4 className="mb-2 font-semibold text-white">
                      Studio Spaces
                    </h4>
                    <p className="text-sm text-white/60">
                      Visit our group fitness studios
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <svg
                        className="h-6 w-6 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>
                    <h4 className="mb-2 font-semibold text-white">
                      Luxury Amenities
                    </h4>
                    <p className="text-sm text-white/60">
                      Discover our premium facilities
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-br from-primary/20 to-blue-600/20 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="mb-6 font-bold font-display text-4xl text-white md:text-5xl">
                Ready to Experience It{' '}
                <span className="text-primary">Yourself?</span>
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/70 text-xl">
                Book a personal tour of our facilities or start your membership
                journey today
              </p>

              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <ShinyButton
                  className="bg-primary px-8 py-4 font-semibold text-lg text-white"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                >
                  Book a Tour
                </ShinyButton>
                <motion.button
                  className="rounded-xl border-2 border-primary bg-transparent px-8 py-4 font-semibold text-lg text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Now
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        currentIndex={currentImageIndex}
        images={galleryImages}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNavigate={navigateImage}
      />
    </>
  );
}
