import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import FaqSection from '@/components/ui/faq'
import ShinyButton from '@/components/ui/shiny-button'
import { membershipFAQs } from '@/data/faqData'

export default function Prices() {
  const { t } = useTranslation()

  const pricingPlans = [
    {
      name: "Silver",
      price: "$29",
      originalPrice: "$39",
      period: "/month",
      description: "Perfect for getting started with your fitness journey",
      features: [
        "Access to gym equipment",
        "Locker room access", 
        "Basic workout plans",
        "6am-10pm access"
      ],
      isPopular: false
    },
    {
      name: "Gold",
      price: "$49", 
      originalPrice: "$69",
      period: "/month",
      description: "Most popular choice with personal training included",
      features: [
        "Everything in Silver",
        "Group fitness classes",
        "Personal trainer sessions",
        "Priority equipment access",
        "Guest privileges"
      ],
      isPopular: true
    },
    {
      name: "Platinum",
      price: "$89",
      originalPrice: "$119", 
      period: "/month",
      description: "Complete wellness experience with premium amenities",
      features: [
        "Everything in Gold",
        "Nutrition consultation",
        "Premium amenities access",
        "Unlimited guest privileges",
        "Priority class booking"
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
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover our flexible membership plans designed to fit every fitness goal and budget.
          </p>
        </motion.div>

        {/* Pricing Plans */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-surface/30 backdrop-blur-sm border rounded-3xl p-8 hover:scale-105 transition-all duration-300 ${
                  plan.isPopular 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/70 text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-white/70">{plan.period}</span>
                    </div>
                    <span className="text-white/50 line-through text-sm">{plan.originalPrice}/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <ShinyButton
                    variant={plan.isPopular ? "primary" : "outline"}
                    size="md"
                    className="w-full"
                  >
                    Choose Plan
                  </ShinyButton>
                </div>
              </motion.div>
            ))}
          </div>
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