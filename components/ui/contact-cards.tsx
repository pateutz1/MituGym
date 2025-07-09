import { motion } from 'motion/react';
import type React from 'react';
import { createAccessibleVariants } from '@/hooks/useMotionConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ContactCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  href: string;
  color: string;
}

const ContactCards: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  });

  const hoverVariants = createAccessibleVariants({
    idle: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -5 },
  });

  const iconVariants = createAccessibleVariants({
    idle: { rotate: 0 },
    hover: { rotate: 10 },
  });

  const contactCards: ContactCard[] = [
    {
      title: 'Visit Our Gym',
      subtitle: 'Premium Location',
      description:
        'Experience our state-of-the-art facility with cutting-edge equipment and professional atmosphere.',
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
          <path
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      action: 'Get Directions',
      href: '#location',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Call Us Now',
      subtitle: 'Instant Support',
      description:
        'Speak directly with our fitness consultants about membership options and training programs.',
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      action: 'Call Now',
      href: 'tel:+1234567890',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Email Us',
      subtitle: '24/7 Response',
      description:
        "Send us your questions and we'll get back to you within 24 hours with detailed information.",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      action: 'Send Email',
      href: 'mailto:info@mitugym.com',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Book a Tour',
      subtitle: 'Free Consultation',
      description:
        'Schedule a complimentary facility tour and consultation with our fitness experts.',
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      ),
      action: 'Schedule Tour',
      href: '#booking',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {contactCards.map((card, index) => (
        <motion.div
          className="group"
          initial="hidden"
          key={card.title}
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : { duration: 0.5, delay: index * 0.1 }
          }
          variants={cardVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <motion.div
            className="glass-effect h-full cursor-pointer rounded-2xl p-6 transition-all duration-300"
            variants={hoverVariants}
            whileHover={prefersReducedMotion ? undefined : 'hover'}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <motion.div
                className={`h-16 w-16 flex-shrink-0 bg-gradient-to-br ${card.color} flex items-center justify-center rounded-xl text-white transition-all duration-300 group-hover:shadow-lg`}
                variants={iconVariants}
              >
                {card.icon}
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-white text-xl transition-colors duration-300 group-hover:text-primary">
                    {card.title}
                  </h3>
                  <span className="font-medium text-primary text-sm">
                    {card.subtitle}
                  </span>
                </div>
                <p className="mb-4 text-sm text-white/70 leading-relaxed">
                  {card.description}
                </p>
                <motion.a
                  className="inline-flex items-center space-x-2 font-medium text-primary transition-colors duration-300 hover:text-emerald-400"
                  href={card.href}
                  whileHover={prefersReducedMotion ? undefined : { x: 5 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                >
                  <span>{card.action}</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ContactCards;
