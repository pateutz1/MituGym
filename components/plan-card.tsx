'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { FC } from 'react';
import AnimatedBorderTrail from './ui/animated-border-trail';
import ShinyButton from './ui/shiny-button';

export interface Feature {
  text: string;
  enabled: boolean;
}

interface PlanCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  features: Feature[];
  delay?: number;
  isPopular?: boolean;
  gradient: string;
}

const PlanCard: FC<PlanCardProps> = ({
  name,
  price,
  originalPrice,
  features,
  delay = 0,
  isPopular = false,
  gradient,
}) => {
  const cardContent = (
    <motion.div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br sm:rounded-3xl ${gradient}backdrop-blur-sm shadow-2xl transition-all duration-500 group-hover:shadow-3xl `}
      style={{ position: 'relative', zIndex: 1 }}
      whileHover={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute top-0 left-0 h-24 w-24 animate-pulse rounded-full bg-[#1e9b71]/10 blur-3xl sm:h-32 sm:w-32" />
        <div className="absolute right-0 bottom-0 h-32 w-32 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-1000 sm:h-40 sm:w-40" />
      </div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-3xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1e9b71]/20 to-transparent blur-sm sm:rounded-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <motion.h3
            animate={{ opacity: 1 }}
            className="mb-2 font-bold text-lg text-white sm:mb-3 sm:text-xl lg:text-2xl"
            initial={{ opacity: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            {name}
          </motion.h3>

          <div className="mb-4 space-y-1">
            {originalPrice && (
              <div className="text-gray-400 text-sm line-through sm:text-base lg:text-lg">
                {originalPrice}
              </div>
            )}
            <div className="flex items-baseline justify-center">
              <span className="font-bold text-3xl text-white sm:text-4xl lg:text-5xl">
                {price}
              </span>
              <span className="ml-2 text-gray-300 text-sm sm:text-base lg:text-lg">
                /month
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6 flex-1 sm:mb-8">
          <ul className="space-y-3 sm:space-y-4">
            {features.map((feature, index) => (
              <motion.li
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                key={index}
                transition={{
                  delay: delay + 0.3 + index * 0.1,
                  duration: 0.4,
                }}
              >
                <div
                  className={`mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full sm:mr-4 sm:h-6 sm:w-6 ${
                    feature.enabled
                      ? 'bg-[#1e9b71] shadow-[#1e9b71]/30 shadow-lg'
                      : 'bg-gray-700/50'
                  } `}
                >
                  <svg
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${feature.enabled ? 'text-white' : 'text-gray-500'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <title>
                      {feature.enabled
                        ? 'Feature included'
                        : 'Feature not included'}
                    </title>
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm sm:text-base ${
                    feature.enabled
                      ? 'font-medium text-white'
                      : 'text-gray-500 line-through'
                  } `}
                >
                  {feature.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: delay + 0.6 }}
        >
          <Link href="/contact">
            <motion.div
              whileHover={{
                scale: 1.02,
                boxShadow: isPopular
                  ? '0 20px 40px -10px rgba(30, 155, 113, 0.4)'
                  : '0 10px 30px -5px rgba(30, 155, 113, 0.3)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              <ShinyButton
                className="w-full font-bold text-sm sm:text-base lg:text-lg"
                size="lg"
                variant={isPopular ? 'primary' : 'outline'}
              >
                <span className="flex items-center justify-center">
                  Get Started
                  <motion.svg
                    className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    stroke="currentColor"
                    transition={{ duration: 0.2 }}
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                  >
                    <title>Arrow right</title>
                    <path
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </motion.svg>
                </span>
              </ShinyButton>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="group relative h-full"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{
        delay,
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      {/* Popular badge */}
      {isPopular && (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="-top-3 sm:-top-4 -translate-x-1/2 absolute left-1/2 z-20 transform"
          initial={{ opacity: 0, scale: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
        >
          <div className="rounded-full bg-gradient-to-r from-[#1e9b71] to-[#16a085] px-4 py-1.5 font-semibold text-white text-xs shadow-lg sm:px-6 sm:py-2 sm:text-sm">
            Most Popular
          </div>
        </motion.div>
      )}

      {/* Main card with conditional animated border */}
      {isPopular ? (
        <AnimatedBorderTrail
          animationDuration={4}
          borderRadius="1.5rem"
          borderWidth={2}
          className="h-full"
          glowIntensity={12}
          trailColor="rgb(30, 155, 113)"
          trailOpacity={0.6}
          variant="glow"
        >
          {cardContent}
        </AnimatedBorderTrail>
      ) : (
        <div className="group relative h-full">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10 h-full rounded-3xl border border-white/10 transition-colors duration-300 group-hover:border-white/20">
            {cardContent}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PlanCard;
