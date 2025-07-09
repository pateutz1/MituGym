'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [_isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && event.target instanceof Element) {
        const mobileHeader = document.querySelector('.mobile-header');
        if (mobileHeader && !mobileHeader.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const navItems = [
    { href: '/', label: t('navigation.home') },
    { href: '/about', label: t('navigation.about') },
    { href: '/prices', label: t('navigation.prices') },
    { href: '/gallery', label: t('navigation.gallery') },
    { href: '/contact', label: t('navigation.contact') },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-3 right-0 left-0 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto max-w-[65%] px-4">
          <motion.div
            className="nav-glass-effect relative w-full rounded-full px-8 py-2 shadow-2xl shadow-black/40 ring-1 ring-white/5"
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Gradient overlay for premium effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

            <div className="relative z-10 flex items-center justify-between">
              {/* Logo */}
              <Link
                className="group flex flex-shrink-0 items-center space-x-2.5"
                href="/"
              >
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/30"
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg
                    className="h-5 w-5 text-white drop-shadow-sm"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                  </svg>
                </motion.div>
                <span className="gradient-text font-bold font-display text-lg transition-transform duration-300 group-hover:scale-105">
                  MITUGYM
                </span>
              </Link>

              {/* Navigation Links + Language Switcher */}
              <div className="flex items-center space-x-8">
                <nav className="flex items-center space-x-8">
                  {navItems.map((item, index) => (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: -20 }}
                      key={`${item.href}-${index}`}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link
                        className="group relative rounded-lg px-3 py-2 font-display font-medium text-gray-200 text-sm tracking-wide transition-all duration-300 hover:bg-white/10 hover:text-primary"
                        href={item.href}
                      >
                        {item.label}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-300 group-hover:w-full" />
                        <span className="absolute inset-0 rounded-lg bg-primary/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
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
        animate={{ y: 0, opacity: 1 }}
        className="mobile-header fixed top-4 right-0 left-0 z-50 px-4 md:hidden"
        initial={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="nav-glass-effect relative rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/5"
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.01 }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

          <div className="relative z-10 flex items-center justify-between px-5 py-3">
            {/* Logo */}
            <Link className="group flex items-center space-x-2.5" href="/">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/30"
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg
                  className="h-4 w-4 text-white drop-shadow-sm"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
                </svg>
              </motion.div>
              <span className="gradient-text font-bold font-display text-base transition-transform duration-300 group-hover:scale-105">
                MITUGYM
              </span>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              aria-label="Toggle mobile menu"
              className="touch-manipulation rounded-lg p-2 text-white transition-all duration-300 hover:bg-white/10 hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              style={{ touchAction: 'manipulation' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex h-5 w-5 flex-col items-center justify-center">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 2 : 0,
                  }}
                  className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-y-0.5 rotate-45' : ''
                  }`}
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className={`mt-1 block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  className={`mt-1 block h-0.5 w-5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}
                />
              </div>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                animate={{ opacity: 1, height: 'auto' }}
                className="relative z-10 border-white/10 border-t"
                exit={{ opacity: 0, height: 0 }}
                initial={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="flex flex-col space-y-1 px-5 py-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: -20 }}
                      key={`mobile-${item.href}-${index}`}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        className="group relative block touch-manipulation rounded-lg px-3 py-2.5 font-display font-medium text-gray-200 text-sm tracking-wide transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                        href={item.href}
                        onClick={(e) => {
                          // Ensure the click is properly handled
                          e.stopPropagation();
                          setIsMobileMenuOpen(false);
                        }}
                        style={{ touchAction: 'manipulation' }}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="mt-2 border-white/10 border-t pt-2"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <LanguageSwitcher />
                  </motion.div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Mobile menu backdrop - outside the header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[45] bg-black/30 backdrop-blur-sm md:hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
