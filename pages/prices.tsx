import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import FaqSection from '@/components/ui/faq'
import ShinyButton from '@/components/ui/shiny-button'
import Counter from '@/components/ui/counter'
import TypingText from '@/components/ui/typing-text'
import PlanCard from '@/components/PlanCard'
import { membershipFAQs } from '@/data/faqData'

export default function Prices() {
  const { t } = useTranslation()

  const pricingPlans = [
    {
      name: "Silver",
      price: "$29",
      originalPrice: "$39",
      gradient: "from-gray-800/40 to-gray-900/40",
      description: "Perfect for getting started with your fitness journey",
      features: [
        { text: "Access to gym equipment", enabled: true },
        { text: "Locker room access", enabled: true },
        { text: "Basic workout plans", enabled: true },
        { text: "6am-10pm access", enabled: true },
        { text: "Group fitness classes", enabled: false },
        { text: "Personal trainer sessions", enabled: false },
        { text: "Nutrition consultation", enabled: false }
      ],
      isPopular: false
    },
    {
      name: "Gold",
      price: "$49", 
      originalPrice: "$69",
      gradient: "from-emerald-800/40 to-emerald-900/40",
      description: "Most popular choice with personal training included",
      features: [
        { text: "Access to gym equipment", enabled: true },
        { text: "Locker room access", enabled: true },
        { text: "Basic workout plans", enabled: true },
        { text: "6am-10pm access", enabled: true },
        { text: "Group fitness classes", enabled: true },
        { text: "Personal trainer sessions", enabled: true },
        { text: "Guest privileges", enabled: true },
        { text: "Nutrition consultation", enabled: false }
      ],
      isPopular: true
    },
    {
      name: "Platinum",
      price: "$89",
      originalPrice: "$119",
      gradient: "from-purple-800/40 to-purple-900/40",
      description: "Complete wellness experience with premium amenities",
      features: [
        { text: "Access to gym equipment", enabled: true },
        { text: "Locker room access", enabled: true },
        { text: "Basic workout plans", enabled: true },
        { text: "6am-10pm access", enabled: true },
        { text: "Group fitness classes", enabled: true },
        { text: "Personal trainer sessions", enabled: true },
        { text: "Guest privileges", enabled: true },
        { text: "Nutrition consultation", enabled: true },
        { text: "Premium amenities access", enabled: true },
        { text: "Priority class booking", enabled: true }
      ],
      isPopular: false
    }
  ]

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            {t('navigation.prices')}
          </h1>
          <div className="text-xl text-white/70 max-w-2xl mx-auto">
            <p className="mb-4">Discover our flexible membership plans designed to fit</p>
            <TypingText
              texts={[
                "every fitness goal.",
                "your busy lifestyle.",
                "any budget range.",
                "personal preferences.",
                "long-term success.",
                "your unique needs."
              ]}
              typingSpeed={50}
              deletingSpeed={25}
              pauseDuration={2000}
              startDelay={1500}
              className="text-emerald-400 font-semibold"
              cursor="_"
            />
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PlanCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                originalPrice={plan.originalPrice}
                features={plan.features}
                delay={index * 0.1}
                isPopular={plan.isPopular}
                gradient={plan.gradient}
              />
            ))}
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose <span className="gradient-text">MituGym</span>?
            </h2>
            <p className="text-white/70 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied members who have transformed their lives with our premium facilities and expert guidance.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">
                  <Counter
                    target={95}
                    suffix="%"
                    duration={2500}
                    delay={800}
                    className="text-3xl sm:text-4xl"
                  />
                </div>
                <h3 className="text-white font-semibold mb-1">Satisfaction</h3>
                <p className="text-white/60 text-sm">Member retention rate</p>
              </motion.div>

                             <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.7 }}
                 className="text-center"
               >
                 <div className="text-2xl sm:text-3xl font-bold mb-2 text-primary">
                   Premium
                 </div>
                 <h3 className="text-white font-semibold mb-1">Equipment</h3>
                 <p className="text-white/60 text-sm">Latest technology</p>
               </motion.div>

                             <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.8 }}
                 className="text-center"
               >
                 <div className="space-y-1 mb-2">
                   <div className="text-xs font-semibold text-primary/80">Monday - Friday</div>
                   <div className="text-2xl font-bold text-primary">6:00 - 23:00</div>
                 </div>
                 <div className="grid grid-cols-2 gap-2 text-xs text-white/60 mb-2">
                   <div>Sat: 7:00-22:00</div>
                   <div>Sun: 7:00-20:00</div>
                 </div>
                 <h3 className="text-white font-semibold mb-1">Access Hours</h3>
                 <p className="text-white/60 text-sm">Extended schedule</p>
               </motion.div>

                             <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.9 }}
                 className="text-center"
               >
                 <div className="text-2xl sm:text-3xl font-bold mb-2 text-primary">
                   Coming<br/>Soon
                 </div>
                 <h3 className="text-white font-semibold mb-1">Trainers</h3>
                 <p className="text-white/60 text-sm">Expert guidance</p>
               </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FaqSection 
            data={membershipFAQs}
            title={t('faq.titles.membership')}
            subtitle={t('faq.subtitles.membership')}
          />
        </motion.section>
      </div>
    </div>
  )
} 