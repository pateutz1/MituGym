import { motion } from 'motion/react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
  rating: number
  image?: string
}

interface GalleryTestimonialsProps {
  testimonials: Testimonial[]
  className?: string
  reverse?: boolean
}

export default function GalleryTestimonials({ 
  testimonials, 
  className = '', 
  reverse = false 
}: GalleryTestimonialsProps) {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrolling container */}
      <motion.div
        className="flex space-x-6"
        animate={{
          x: reverse ? '0%' : '-50%',
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-80 bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-surface/70 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header with avatar and rating */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
              
              {/* Rating stars */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Content */}
            <blockquote className="text-white/80 text-sm leading-relaxed mb-4">
              &quot;{testimonial.content}&quot;
            </blockquote>

            {/* Optional image */}
            {testimonial.image && (
              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s photo`}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Example testimonials data
export const gymTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content: "The facilities at MituGym are absolutely incredible! The equipment is top-notch and the environment is so motivating. I've achieved my fitness goals faster than I ever imagined.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Professional Athlete",
    content: "As a professional athlete, I need access to the best equipment and training facilities. MituGym delivers exactly that. The trainers are knowledgeable and the atmosphere is perfect for serious training.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Yoga Instructor",
    content: "The yoga and flexibility areas are beautifully designed with natural lighting and calming ambiance. It's the perfect space for both beginners and advanced practitioners.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Business Executive",
    content: "The extended hours and premium amenities make it easy to maintain my fitness routine despite my busy schedule. The locker rooms are like a luxury spa!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Fitness Blogger",
    content: "I've visited hundreds of gyms for my blog, and MituGym stands out for its attention to detail and member experience. Every corner is thoughtfully designed.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Alex Rivera",
    role: "Personal Trainer",
    content: "The functional training area is exceptional - it has everything I need to create diverse, challenging workouts for my clients. The space really inspires creativity.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
] 