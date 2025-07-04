import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  service?: string
  message?: string
}

const AnimatedContactForm: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  })

  const fieldVariants = createAccessibleVariants({
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  })

  const buttonVariants = createAccessibleVariants({
    idle: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  })

  const services = [
    'General Inquiry',
    'Membership Information',
    'Personal Training',
    'Group Classes',
    'Nutrition Consulting',
    'Corporate Wellness',
    'Facility Tour'
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
        <p className="text-white/70">
          Thank you for your interest in MituGym. We&apos;ll get back to you within 24 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-effect rounded-2xl p-8 space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
        <p className="text-white/70">Ready to transform your fitness journey?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <motion.div
          variants={fieldVariants}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-white mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            placeholder="Enter your full name"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-2"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div
          variants={fieldVariants}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-white mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            placeholder="Enter your email address"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-2"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Phone Field */}
        <motion.div
          variants={fieldVariants}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-white mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            placeholder="Enter your phone number"
          />
          <AnimatePresence>
            {errors.phone && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-2"
              >
                {errors.phone}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Service Field */}
        <motion.div
          variants={fieldVariants}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-white mb-2">
            Service Interest *
          </label>
          <select
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          >
            <option value="" className="bg-surface text-white">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service} className="bg-surface text-white">
                {service}
              </option>
            ))}
          </select>
          <AnimatePresence>
            {errors.service && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-sm mt-2"
              >
                {errors.service}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Message Field */}
      <motion.div
        variants={fieldVariants}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.5 }}
      >
        <label className="block text-sm font-medium text-white mb-2">
          Message *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
          placeholder="Tell us about your fitness goals and how we can help you..."
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-400 text-sm mt-2"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        variants={fieldVariants}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.6 }}
      >
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          variants={buttonVariants}
          whileHover={prefersReducedMotion ? undefined : "hover"}
          whileTap={prefersReducedMotion ? undefined : "tap"}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Message...
            </div>
          ) : (
            'Send Message'
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}

export default AnimatedContactForm 