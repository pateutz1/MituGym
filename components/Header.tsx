'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: t('navigation.home') },
    { href: '/about', label: t('navigation.about') },
    { href: '/prices', label: t('navigation.prices') },
    { href: '/gallery', label: t('navigation.gallery') },
    { href: '/motion-demo', label: 'Motion Demo' },
    { href: '/contact', label: t('navigation.contact') },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        className="fixed top-6 left-0 right-0 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 max-w-[75%]">
        <motion.div 
          className="nav-glass-effect rounded-full shadow-2xl shadow-black/40 ring-1 ring-white/5 px-8 py-2 relative w-full"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient overlay for premium effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-full"></div>
          
          <div className="flex items-center justify-between relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 flex-shrink-0 group">
              <motion.div 
                className="w-9 h-9 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  className="w-5 h-5 text-white drop-shadow-sm" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                </svg>
              </motion.div>
              <span className="text-lg font-bold font-display gradient-text group-hover:scale-105 transition-transform duration-300">
                MITUGYM
              </span>
            </Link>

            {/* Navigation Links + Language Switcher */}
            <div className="flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={`${item.href}-${index}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-primary transition-all duration-300 font-medium font-display text-sm tracking-wide relative group px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
                      <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg blur-sm"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language Switcher */}
              <div className="flex-shrink-0">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 md:hidden px-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="nav-glass-effect rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/5 relative"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl"></div>
          
          <div className="flex items-center justify-between px-5 py-3 relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 group">
              <motion.div 
                className="w-8 h-8 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <svg 
                  className="w-4 h-4 text-white drop-shadow-sm" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
                </svg>
              </motion.div>
              <span className="text-base font-bold font-display gradient-text group-hover:scale-105 transition-transform duration-300">
                MITUGYM
              </span>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <motion.span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''
                  }`}
                  animate={{ 
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 2 : 0
                  }}
                />
                <motion.span
                  className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                />
                <motion.span
                  className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                  animate={{ 
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0
                  }}
                />
              </div>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.nav
              className="border-t border-white/10 relative z-10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex flex-col space-y-1 px-5 py-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={`mobile-${item.href}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-200 hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium font-display py-2.5 px-3 rounded-lg text-sm tracking-wide block relative group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-2 border-t border-white/10 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <LanguageSwitcher />
                </motion.div>
              </div>
            </motion.nav>
          )}
        </motion.div>
      </motion.header>
    </>
  )
}

export default Header 