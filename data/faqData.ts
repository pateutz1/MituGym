export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

// Membership & Pricing FAQs
export const membershipFAQs: FAQItem[] = [
  {
    id: 1,
    question:
      "What's the difference between Silver, Gold, and Platinum memberships?",
    answer:
      'Silver ($29/month) includes basic gym access and equipment. Gold ($49/month) adds group fitness classes and personal trainer sessions. Platinum includes everything plus nutrition consultation and premium amenities like sauna and massage therapy.',
    icon: '💎',
  },
  {
    id: 2,
    question: 'Can I cancel my membership anytime?',
    answer:
      'Yes! We offer flexible membership options with no long-term contracts. You can cancel your membership with 30 days notice. We believe in earning your loyalty through excellent service, not contracts.',
    icon: '📋',
  },
  {
    id: 3,
    question: 'Do you offer student or senior discounts?',
    answer:
      'Absolutely! We offer 20% student discounts with valid ID and 15% senior discounts for members 65+. We also have special family packages and corporate rates for groups of 10 or more.',
    icon: '🎓',
  },
  {
    id: 4,
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, bank transfers, and cash. Monthly memberships are automatically charged on your enrollment date. We also offer convenient annual payment options with additional savings.',
    icon: '💳',
  },
  {
    id: 5,
    question: 'Can I freeze my membership if I travel?',
    answer:
      'Yes! Gold and Platinum members can freeze their membership for up to 3 months per year for travel, medical reasons, or other circumstances. A small administrative fee applies to maintain your membership benefits.',
    icon: '✈️',
  },
];

// General Gym FAQs
export const generalFAQs: FAQItem[] = [
  {
    id: 6,
    question: 'What are your operating hours?',
    answer:
      "We're open daily from 6:00 AM to 10:00 PM, including weekends and most holidays. Our extended hours ensure you can fit your workout into any schedule, whether you're an early bird or prefer evening sessions.",
    icon: '🕐',
  },
  {
    id: 7,
    question: 'When is your grand opening?',
    answer:
      "We're opening Saturday, July 12th, 2025 at 10:00 AM! Join us for our grand opening celebration with free classes, equipment demos, facility tours, and special founding member discounts.",
    icon: '🎉',
  },
  {
    id: 8,
    question: 'How large is your facility?',
    answer:
      "Our state-of-the-art facility spans 1000m² with dedicated zones for cardio, strength training, functional fitness, group classes, and recovery areas. We've designed spacious workout areas to never feel crowded.",
    icon: '🏢',
  },
  {
    id: 9,
    question: 'What equipment brands do you use?',
    answer:
      'We feature premium equipment from top manufacturers including Technogym, Life Fitness, and Hammer Strength. All equipment is commercial-grade, regularly maintained, and represents the latest in fitness technology.',
    icon: '🏋️',
  },
  {
    id: 10,
    question: 'Do you have parking available?',
    answer:
      'Yes! We provide free parking for all members with over 50 spaces available. The parking area is well-lit and secure, with designated spots close to the main entrance for convenience.',
    icon: '🚗',
  },
];

// Training & Classes FAQs
export const trainingFAQs: FAQItem[] = [
  {
    id: 11,
    question: 'Do you offer personal training?',
    answer:
      'Yes! Our certified personal trainers provide one-on-one sessions, small group training, and customized workout plans. Gold and Platinum members receive discounted rates and priority booking.',
    icon: '👨‍💼',
  },
  {
    id: 12,
    question: 'What group classes do you offer?',
    answer:
      'We offer a variety of classes including HIIT, yoga, strength training, functional fitness, and cardio sessions. Our schedule accommodates all fitness levels with morning, afternoon, and evening options.',
    icon: '👥',
  },
  {
    id: 13,
    question: "I'm a complete beginner. Will I feel comfortable?",
    answer:
      'Absolutely! We welcome all fitness levels. Our trainers offer complimentary orientation sessions for new members, and we have beginner-friendly classes and equipment zones designed for those just starting their fitness journey.',
    icon: '🌱',
  },
  {
    id: 14,
    question: 'Do you provide nutrition guidance?',
    answer:
      'Platinum members receive comprehensive nutrition consultations with our certified nutritionists. We also offer meal planning, supplement guidance, and body composition analysis to support your fitness goals.',
    icon: '🥗',
  },
  {
    id: 15,
    question: 'Can I bring a guest?',
    answer:
      'Gold and Platinum members can bring guests for a small daily fee. We also offer guest passes and trial memberships for friends and family who want to experience MituGym before joining.',
    icon: '👫',
  },
];

// Popular/Most Asked FAQs (for home page)
export const popularFAQs: FAQItem[] = [
  {
    id: 16,
    question: 'When does MituGym open?',
    answer:
      'Grand opening is Saturday, July 12th, 2025 at 10:00 AM! Join us for special opening day events and founding member discounts.',
    icon: '🎉',
  },
  {
    id: 17,
    question: 'What makes MituGym different?',
    answer:
      'Premium equipment, expert trainers, 1000m² of modern facilities, flexible membership options, and a supportive community focused on helping you achieve extraordinary results.',
    icon: '⭐',
  },
  {
    id: 18,
    question: 'How much does membership cost?',
    answer:
      'Plans start at $29/month for Silver, $49/month for Gold, and $69/month for Platinum. Each tier offers increasing benefits from basic access to comprehensive wellness services.',
    icon: '💰',
  },
  {
    id: 19,
    question: 'Do I need to sign a contract?',
    answer:
      'No long-term contracts required! We offer flexible month-to-month memberships because we believe in earning your loyalty through excellent service and results.',
    icon: '📋',
  },
];
