import { motion } from 'motion/react';
import type React from 'react';
import { createAccessibleVariants } from '@/hooks/useMotionConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const LocationMap: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  });

  const cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  });

  const buttonVariants = createAccessibleVariants({
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  });

  const locationInfo = {
    name: 'FitPro Center Premium Fitness',
    address: '123 Fitness Boulevard',
    city: 'Bucharest, Romania',
    phone: '+40 21 123 4567',
    email: 'info@fitprocenter.com',
    hours: {
      weekdays: '6:00 AM - 11:00 PM',
      saturday: '7:00 AM - 10:00 PM',
      sunday: '7:00 AM - 8:00 PM',
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      id="location"
      initial="hidden"
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="visible"
    >
      {/* Location Info */}
      <motion.div
        className="glass-effect space-y-6 rounded-2xl p-8"
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.5, delay: 0.2 }
        }
        variants={cardVariants}
      >
        <div>
          <h2 className="mb-4 font-bold text-3xl text-white">
            Visit Our Location
          </h2>
          <p className="text-white/70">
            Located in the heart of Bucharest, our premium facility offers easy
            access and convenient parking for all members.
          </p>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Location</title>
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
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">Address</h3>
              <p className="text-white/70">
                {locationInfo.address}
                <br />
                {locationInfo.city}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Phone</title>
                <path
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">Phone</h3>
              <a
                className="text-primary transition-colors duration-300 hover:text-emerald-400"
                href={`tel:${locationInfo.phone}`}
              >
                {locationInfo.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Email</title>
                <path
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-white">Email</h3>
              <a
                className="text-primary transition-colors duration-300 hover:text-emerald-400"
                href={`mailto:${locationInfo.email}`}
              >
                {locationInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="border-white/10 border-t pt-6">
          <h3 className="mb-4 flex items-center font-semibold text-white">
            <svg
              className="mr-2 h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Clock</title>
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Operating Hours
          </h3>
          <div className="space-y-2 text-white/70">
            <div className="flex justify-between">
              <span>Monday - Friday</span>
              <span>{locationInfo.hours.weekdays}</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>{locationInfo.hours.saturday}</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>{locationInfo.hours.sunday}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <motion.a
            className="flex-1 rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-6 py-3 text-center font-semibold text-white transition-all duration-300 hover:shadow-lg"
            href="https://maps.google.com"
            rel="noopener noreferrer"
            target="_blank"
            variants={buttonVariants}
            whileHover={prefersReducedMotion ? undefined : 'hover'}
            whileTap={prefersReducedMotion ? undefined : 'tap'}
          >
            Get Directions
          </motion.a>
          <motion.button
            className="flex-1 rounded-xl border border-primary px-6 py-3 text-center font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            variants={buttonVariants}
            whileHover={prefersReducedMotion ? undefined : 'hover'}
            whileTap={prefersReducedMotion ? undefined : 'tap'}
          >
            Schedule Tour
          </motion.button>
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        className="glass-effect overflow-hidden rounded-2xl p-2"
        transition={
          prefersReducedMotion
            ? { duration: 0.01 }
            : { duration: 0.5, delay: 0.4 }
        }
        variants={cardVariants}
      >
        <div className="relative flex h-full min-h-[400px] w-full items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
          {/* Map Placeholder */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20" />
          <div className="relative z-10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-500">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>Map</title>
                <path
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white text-xl">
              Interactive Map
            </h3>
            <p className="mb-4 text-white/70">
              Find us easily in the heart of Bucharest
            </p>
            <motion.a
              className="inline-flex items-center space-x-2 font-medium text-primary transition-colors duration-300 hover:text-emerald-400"
              href="https://maps.google.com"
              rel="noopener noreferrer"
              target="_blank"
              whileHover={prefersReducedMotion ? undefined : { x: 5 }}
            >
              <span>Open in Google Maps</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <title>External link</title>
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </motion.a>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 h-2 w-2 animate-pulse rounded-full bg-primary" />
          <div
            className="absolute right-6 bottom-6 h-3 w-3 animate-pulse rounded-full bg-emerald-400"
            style={{ animationDelay: '0.5s' }}
          />
          <div
            className="absolute top-1/3 right-8 h-1 w-1 animate-pulse rounded-full bg-blue-400"
            style={{ animationDelay: '1s' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LocationMap;
