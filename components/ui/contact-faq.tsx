import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { createAccessibleVariants } from '@/hooks/useMotionConfig'

interface FAQ {
  question: string
  answer: string
  category: string
}

const ContactFAQ: React.FC = () => {
  const prefersReducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const containerVariants = createAccessibleVariants({
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  })

  const itemVariants = createAccessibleVariants({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  })

  const faqs: FAQ[] = [
    {
      question: "What are your operating hours?",
      answer: "We're open Monday through Friday from 6:00 AM to 11:00 PM, Saturday from 7:00 AM to 10:00 PM, and Sunday from 7:00 AM to 8:00 PM. We also offer 24/7 access for premium members.",
      category: "Hours"
    },
    {
      question: "Do you offer membership plans?",
      answer: "Yes! We offer flexible membership options including monthly, quarterly, and annual plans. We also have student discounts, corporate rates, and family packages. Contact us for a personalized quote that fits your needs.",
      category: "Membership"
    },
    {
      question: "Is personal training available?",
      answer: "Absolutely! Our certified personal trainers offer one-on-one sessions, small group training, and specialized programs. We provide complimentary initial consultations to assess your fitness goals and create a customized plan.",
      category: "Training"
    },
    {
      question: "What equipment do you have?",
      answer: "Our facility features state-of-the-art equipment including cardio machines, strength training equipment, functional training areas, and group exercise studios. We regularly update our equipment to ensure you have access to the latest fitness technology.",
      category: "Facilities"
    },
    {
      question: "Do you offer group classes?",
      answer: "Yes! We offer a variety of group fitness classes including yoga, pilates, HIIT, spinning, zumba, and more. Classes are included with membership, and we provide options for all fitness levels from beginner to advanced.",
      category: "Classes"
    },
    {
      question: "What safety measures do you have?",
      answer: "Safety is our top priority. We maintain enhanced cleaning protocols, provide hand sanitizing stations throughout the facility, ensure proper ventilation, and our staff is trained in first aid and emergency procedures.",
      category: "Safety"
    },
    {
      question: "Can I bring guests?",
      answer: "Members can bring guests for a daily fee. We also offer guest passes and trial memberships for those interested in trying our facility. Please check with our front desk for current guest policies and rates.",
      category: "Policies"
    },
    {
      question: "Do you have parking available?",
      answer: "Yes, we provide free parking for all members and guests. Our parking lot is well-lit and secure, with dedicated spaces close to the main entrance for your convenience.",
      category: "Facilities"
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6 }}
      className="space-y-4"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Find answers to common questions about our facilities, membership, and services.
          Don&apos;t see your question? Contact us directly!
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: index * 0.05 }}
            className="glass-effect rounded-xl overflow-hidden"
          >
            <motion.button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              whileHover={prefersReducedMotion ? undefined : { backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.998 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>
            </motion.button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        variants={itemVariants}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, delay: 0.4 }}
        className="text-center mt-8 p-6 glass-effect rounded-xl"
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Still have questions?
        </h3>
        <p className="text-white/70 mb-4">
          Our friendly team is here to help you get started on your fitness journey.
        </p>
        <motion.a
          href="#contact-form"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg"
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
        >
          <span>Contact Us</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}

export default ContactFAQ 