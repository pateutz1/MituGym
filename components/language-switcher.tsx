'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface LanguageSwitcherProps {
  position?: 'top' | 'bottom' | 'auto';
}

// Helper function to calculate chevron rotation
const getChevronRotation = (
  isOpen: boolean,
  position: 'top' | 'bottom' | 'auto'
): number => {
  if (position === 'bottom') {
    return isOpen ? 0 : 180;
  }
  return isOpen ? 180 : 0;
};

const LanguageSwitcher = ({ position = 'auto' }: LanguageSwitcherProps) => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('language.english'), flag: '/images/flags/us.png' },
    { code: 'ro', name: t('language.romanian'), flag: '/images/flags/ro.png' },
  ];

  const currentLanguage = languages.find((l) => l.code === lang);

  const handleLanguageChange = (languageCode: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <motion.button
        className="glass-effect group relative flex items-center space-x-2 overflow-hidden rounded-xl border border-white/10 px-4 py-2.5 shadow-lg transition-all duration-500 hover:border-primary/40 hover:bg-white/10 hover:shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Enhanced hover glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

        {/* Animated background shimmer */}
        <motion.div
          animate={{
            x: isOpen ? 0 : [-100, 100],
          }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        />

        <div className="relative z-10 h-4 w-5 overflow-hidden rounded-sm shadow-md">
          <Image
            alt={currentLanguage?.name || 'English'}
            className="object-cover"
            fill
            sizes="20px"
            src={currentLanguage?.flag || '/images/flags/us.png'}
          />
        </div>
        <span className="relative z-10 font-display font-semibold text-sm text-white/90 transition-colors duration-300 group-hover:text-primary">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <motion.svg
          animate={{
            rotate: getChevronRotation(isOpen, position),
          }}
          className="relative z-10 h-4 w-4 text-white/70 transition-colors duration-300 group-hover:text-primary"
          fill="none"
          stroke="currentColor"
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          viewBox="0 0 24 24"
        >
          <title>Language selector arrow</title>
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced backdrop overlay */}
            <motion.div
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              transition={{ duration: 0.2 }}
            />

            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`glass-effect absolute right-0 z-50 w-44 overflow-hidden rounded-2xl border border-white/20 shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-3xl ${
                position === 'bottom' ? 'bottom-full mb-3' : 'top-full mt-3'
              }`}
              exit={{
                opacity: 0,
                y: position === 'bottom' ? 10 : -10,
                scale: 0.95,
              }}
              initial={{
                opacity: 0,
                y: position === 'bottom' ? 10 : -10,
                scale: 0.95,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

              {/* Animated border glow */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(30, 155, 113, 0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />

              <div className="relative z-10 p-2">
                {languages.map((language, index) => (
                  <motion.button
                    animate={{ opacity: 1, x: 0 }}
                    className={`group relative flex w-full items-center space-x-3 overflow-hidden rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                      language.code === lang
                        ? 'border border-primary/40 bg-primary/25 text-primary shadow-lg shadow-primary/20'
                        : 'border border-transparent text-white/90 hover:border-primary/30 hover:bg-white/15 hover:text-primary hover:shadow-lg hover:shadow-primary/10'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Enhanced hover gradient background */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Shimmer effect on hover */}
                    <motion.div
                      animate={{
                        x: [-100, 100],
                      }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'linear',
                      }}
                    />

                    <div className="relative z-10 h-5 w-6 overflow-hidden rounded-sm shadow-md">
                      <Image
                        alt={language.name}
                        className="object-cover"
                        fill
                        sizes="24px"
                        src={language.flag}
                      />
                    </div>
                    <span className="relative z-10 font-display font-medium text-sm transition-colors duration-300">
                      {language.name}
                    </span>

                    {language.code === lang && (
                      <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10 ml-auto flex items-center"
                        initial={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1],
                          }}
                          className="h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50"
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
