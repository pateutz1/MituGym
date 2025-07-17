import { useRouter } from 'next/router';

// Define proper types for nested translations
type TranslationValue = string | TranslationObject;

interface TranslationObject {
  [key: string]: TranslationValue;
}

interface Translations {
  [key: string]: TranslationValue;
}

const translations: { [locale: string]: Translations } = {
  en: {
    navigation: {
      home: 'Home',
      about: 'About',
      prices: 'Prices',
      gallery: 'Gallery',
      contact: 'Contact',
    },
    buttons: {
      joinUs: 'Join Us',
      learnMore: 'Learn More',
      viewAllPlans: 'View All Plans',
      getStarted: 'Get Started',
      contact: 'Contact Us',
    },
    footer: {
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      copyright: '© 2024 FitPro Center. All rights reserved.',
    },
    language: {
      english: 'English',
      romanian: 'Romanian',
    },
    hero: {
      headline: 'Transform Your Body',
      subheadline:
        'Premium fitness equipment, expert trainers, and a supportive community await you',
      countdown: {
        title: 'Grand Opening In',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
      },
    },
    features: {
      title: 'Why Choose FitPro Center?',
      equipment: {
        title: 'State-of-the-Art Equipment',
        description:
          'Latest fitness technology and premium equipment for optimal results',
      },
      trainers: {
        title: 'Expert Trainers',
        description:
          'Certified professionals dedicated to helping you achieve your goals',
      },
      classes: {
        title: 'Diverse Classes',
        description:
          'From yoga to high-intensity training, find the perfect class for you',
      },
      community: {
        title: 'Supportive Community',
        description: 'Join a welcoming community of fitness enthusiasts',
      },
    },
    pricing: {
      title: 'Choose Your Plan',
      subtitle: 'Flexible membership options to fit your lifestyle',
      basic: {
        name: 'Basic',
        price: '$29',
        period: '/month',
      },
      premium: {
        name: 'Premium',
        price: '$49',
        period: '/month',
      },
      vip: {
        name: 'VIP',
        price: '$79',
        period: '/month',
      },
    },
    faq: {
      titles: {
        membership: 'Membership Questions',
        facility: 'Facility Information',
        general: 'Questions & Answers',
      },
      subtitles: {
        membership:
          'Everything you need to know about our membership plans and policies',
        facility:
          'Learn more about our facilities, equipment, and what makes FitPro Center special',
        general: 'Get quick answers to the most common questions about FitPro Center',
      },
    },
  },
  ro: {
    navigation: {
      home: 'Acasă',
      about: 'Despre',
      prices: 'Prețuri',
      gallery: 'Galerie',
      contact: 'Contact',
    },
    buttons: {
      joinUs: 'Alătură-te',
      learnMore: 'Află Mai Multe',
      viewAllPlans: 'Vezi Toate Planurile',
      getStarted: 'Începe Acum',
      contact: 'Contactează-ne',
    },
    footer: {
      quickLinks: 'Link-uri Rapide',
      followUs: 'Urmărește-ne',
      copyright: '© 2024 FitPro Center. Toate drepturile rezervate.',
    },
    language: {
      english: 'Engleză',
      romanian: 'Română',
    },
    hero: {
      headline: 'Transformă-ți Corpul',
      subheadline:
        'Echipamente premium, antrenori experți și o comunitate care te susține te așteaptă',
      countdown: {
        title: 'Deschiderea Oficială În',
        days: 'Zile',
        hours: 'Ore',
        minutes: 'Minute',
        seconds: 'Secunde',
      },
    },
    features: {
      title: 'De Ce Să Alegi FitPro Center?',
      equipment: {
        title: 'Echipamente de Ultimă Generație',
        description:
          'Tehnologie fitness de vârf și echipamente premium pentru rezultate optime',
      },
      trainers: {
        title: 'Antrenori Experți',
        description:
          'Profesioniști certificați dedicați să te ajute să îți atingi obiectivele',
      },
      classes: {
        title: 'Clase Diverse',
        description:
          'De la yoga la antrenamente de înaltă intensitate, găsește clasa perfectă pentru tine',
      },
      community: {
        title: 'Comunitate Care Te Susține',
        description:
          'Alătură-te unei comunități primitoare de pasionați de fitness',
      },
    },
    pricing: {
      title: 'Alege-ți Planul',
      subtitle:
        'Opțiuni flexibile de abonament care se potrivesc stilului tău de viață',
      basic: {
        name: 'Basic',
        price: '139 RON',
        period: '/lună',
      },
      premium: {
        name: 'Premium',
        price: '229 RON',
        period: '/lună',
      },
      vip: {
        name: 'VIP',
        price: '369 RON',
        period: '/lună',
      },
    },
    faq: {
      titles: {
        membership: 'Întrebări despre Abonamente',
        facility: 'Informații despre Facilități',
        general: 'Întrebări și Răspunsuri',
      },
      subtitles: {
        membership:
          'Tot ce trebuie să știi despre planurile și politicile noastre de abonament',
        facility:
          'Află mai multe despre facilitățile, echipamentele și ce face FitPro Center special',
        general:
          'Obține răspunsuri rapide la cele mai frecvente întrebări despre FitPro Center',
      },
    },
  },
};

export const useTranslation = (_namespace?: string) => {
  const router = useRouter();
  const locale = router.locale || 'en';

  const t = (key: string) => {
    const keys = key.split('.');
    let value: TranslationValue = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as TranslationObject)[k];
      } else {
        return key; // fallback to key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, lang: locale };
};
