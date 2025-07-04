import React from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'

const LocationMap: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  })

  const cardVariants = createAccessibleVariants({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  })

  const buttonVariants = createAccessibleVariants({
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  })

  const locationInfo = {
    name: "MituGym Premium Fitness",
    address: "123 Fitness Boulevard",
    city: "Bucharest, Romania",
    phone: "+40 21 123 4567",
    email: "info@mitugym.com",
    hours: {
      weekdays: "6:00 AM - 11:00 PM",
      saturday: "7:00 AM - 10:00 PM", 
      sunday: "7:00 AM - 8:00 PM"
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      id="location"
    >
      {/* Location Info */}
      <motion.div
        variants={cardVariants}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.5, delay: 0.2 }}
        className="glass-effect rounded-2xl p-8 space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Visit Our Location</h2>
          <p className="text-white/70">
            Located in the heart of Bucharest, our premium facility offers easy access 
            and convenient parking for all members.
          </p>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Address</h3>
              <p className="text-white/70">
                {locationInfo.address}<br />
                {locationInfo.city}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Phone</h3>
              <a href={`tel:${locationInfo.phone}`} className="text-primary hover:text-emerald-400 transition-colors duration-300">
                {locationInfo.phone}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <a href={`mailto:${locationInfo.email}`} className="text-primary hover:text-emerald-400 transition-colors duration-300">
                {locationInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-white font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg"
            variants={buttonVariants}
            whileHover={prefersReducedMotion ? undefined : "hover"}
            whileTap={prefersReducedMotion ? undefined : "tap"}
          >
            Get Directions
          </motion.a>
          <motion.button
            className="flex-1 border border-primary text-primary font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 hover:bg-primary hover:text-white"
            variants={buttonVariants}
            whileHover={prefersReducedMotion ? undefined : "hover"}
            whileTap={prefersReducedMotion ? undefined : "tap"}
          >
            Schedule Tour
          </motion.button>
        </div>
      </motion.div>

      {/* Map Placeholder */}
      <motion.div
        variants={cardVariants}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.5, delay: 0.4 }}
        className="glass-effect rounded-2xl p-2 overflow-hidden"
      >
        <div className="w-full h-full min-h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl relative flex items-center justify-center">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl" />
          <div className="relative z-10 text-center p-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
            <p className="text-white/70 mb-4">
              Find us easily in the heart of Bucharest
            </p>
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary hover:text-emerald-400 transition-colors duration-300 font-medium"
              whileHover={prefersReducedMotion ? undefined : { x: 5 }}
            >
              <span>Open in Google Maps</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="absolute bottom-6 right-6 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/3 right-8 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LocationMap 