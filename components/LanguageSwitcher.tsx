'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/hooks/useTranslation'

interface LanguageSwitcherProps {
  position?: 'top' | 'bottom' | 'auto'
}

const LanguageSwitcher = ({ position = 'auto' }: LanguageSwitcherProps) => {
  const { t, lang } = useTranslation('common')
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: t('language.english'), flag: '/images/flags/us.png' },
    { code: 'ro', name: t('language.romanian'), flag: '/images/flags/ro.png' },
  ]

  const currentLanguage = languages.find(l => l.code === lang)

  const handleLanguageChange = (languageCode: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: languageCode })
    setIsOpen(false)
  }

  return (
    <div className="relative z-50">
      <motion.button
        className="flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-effect hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-primary/40 group relative overflow-hidden shadow-lg hover:shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Enhanced hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm"></div>
        
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"
          animate={{
            x: isOpen ? 0 : [-100, 100],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="w-5 h-4 relative z-10 rounded-sm overflow-hidden shadow-md">
          <Image
            src={currentLanguage?.flag || '/images/flags/us.png'}
            alt={currentLanguage?.name || 'English'}
            fill
            className="object-cover"
            sizes="20px"
          />
        </div>
        <span className="text-sm font-semibold font-display text-white/90 group-hover:text-primary transition-colors duration-300 relative z-10">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <motion.svg
          className="w-4 h-4 text-white/70 group-hover:text-primary transition-colors duration-300 relative z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ 
            rotate: isOpen 
              ? position === 'bottom' ? 0 : 180 
              : position === 'bottom' ? 180 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Enhanced backdrop overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              className={`absolute right-0 w-44 glass-effect rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-3xl border border-white/20 z-50 overflow-hidden ${
                position === 'bottom' ? 'bottom-full mb-3' : 'top-full mt-3'
              }`}
              initial={{ opacity: 0, y: position === 'bottom' ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: position === 'bottom' ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-2xl"></div>
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(30, 155, 113, 0.3), transparent)`,
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10 p-2">
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-300 group relative overflow-hidden ${
                      language.code === lang 
                        ? 'bg-primary/25 text-primary border border-primary/40 shadow-lg shadow-primary/20' 
                        : 'hover:bg-white/15 text-white/90 hover:text-primary border border-transparent hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10'
                    }`}
                    onClick={() => handleLanguageChange(language.code)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Enhanced hover gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"
                      animate={{
                        x: [-100, 100],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="w-6 h-5 relative z-10 rounded-sm overflow-hidden shadow-md">
                      <Image
                        src={language.flag}
                        alt={language.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="text-sm font-medium font-display relative z-10 transition-colors duration-300">
                      {language.name}
                    </span>
                    
                    {language.code === lang && (
                      <motion.div
                        className="ml-auto relative z-10 flex items-center"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
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
  )
}

export default LanguageSwitcher 