'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  type: 'link' | 'action' | 'component'
  component?: React.ReactNode
  external?: boolean
}

interface FloatingDockProps {
  items?: DockItem[]
  position?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'left-center' | 'right-center'
  className?: string
}

const FloatingDock: React.FC<FloatingDockProps> = ({ 
  items: customItems, 
  position = 'bottom-right',
  className = ''
}) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  // Default dock items
  const defaultItems: DockItem[] = [
    {
      id: 'facebook',
      label: 'Facebook',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      href: 'https://facebook.com',
      type: 'link',
      external: true
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.459 0 4.468 2.01 4.468 4.468s-2.009 4.468-4.468 4.468zm7.519 0c-2.458 0-4.467-2.01-4.467-4.468s2.009-4.468 4.467-4.468c2.459 0 4.468 2.01 4.468 4.468s-2.009 4.468-4.468 4.468z"/>
        </svg>
      ),
      href: 'https://instagram.com',
      type: 'link',
      external: true
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
        </svg>
      ),
      href: 'https://wa.me/1234567890',
      type: 'link',
      external: true
    },
    {
      id: 'email',
      label: 'Email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: 'mailto:contact@mitugym.com',
      type: 'link',
      external: true
    },
    {
      id: 'phone',
      label: 'Phone',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      href: 'tel:+1234567890',
      type: 'link',
      external: true
    },
    {
      id: 'language',
      label: 'Language',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      type: 'component',
      component: <LanguageSwitcher position={position === 'bottom-right' ? 'bottom' : 'auto'} />
    }
  ]

  const items = customItems || defaultItems

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6'
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2'
      case 'bottom-right':
        return 'bottom-6 right-6'
      case 'left-center':
        return 'left-6 top-1/2 transform -translate-y-1/2'
      case 'right-center':
        return 'right-6 top-1/2 transform -translate-y-1/2'
      default:
        return 'bottom-6 right-6'
    }
  }

  const getItemLayout = () => {
    // Always use vertical layout for bottom-right position to open upward
    if (position === 'bottom-right' || (position.includes('center') && (position.includes('left') || position.includes('right')))) {
      return 'flex-col space-y-2'
    }
    return 'flex-row space-x-2'
  }

  const MainButton = () => (
    <motion.button
      className="relative w-14 h-14 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl shadow-2xl shadow-primary/40 flex items-center justify-center group overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsExpanded(!isExpanded)}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/80 to-emerald-500/80 rounded-2xl"
        animate={{
          scale: isExpanded ? 1.05 : 1,
          rotate: isExpanded ? 180 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg scale-110" />
      
      {/* Icon */}
      <motion.div
        className="relative z-10 text-white"
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </motion.div>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isExpanded ? 1 : 0, opacity: isExpanded ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )

  const DockItem = ({ item, index }: { item: DockItem; index: number }) => {
    const isHovered = hoveredItem === item.id
    
    const itemContent = (
      <motion.div
        layoutId={`dock-item-${item.id}`}
        className="relative w-12 h-12 bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 flex items-center justify-center group cursor-pointer overflow-hidden"
        whileHover={(() => {
          const isVertical = position === 'bottom-right' || (position.includes('center') && (position.includes('left') || position.includes('right')))
          const isRightSide = position === 'bottom-right' || position.includes('right')
          
          if (isVertical) {
            return { scale: 1.1, x: isRightSide ? -3 : 3 }
          }
          return { scale: 1.1, y: -3 }
        })()}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setHoveredItem(item.id)}
        onHoverEnd={() => setHoveredItem(null)}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md scale-110" />
        
        {/* Icon */}
        <div className="relative z-10 text-white/80 group-hover:text-primary transition-colors duration-300">
          {item.icon}
        </div>
        
        {/* Tooltip */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key={`tooltip-${item.id}`}
              className={`absolute bg-gray-900/95 backdrop-blur-lg text-white text-xs px-3 py-1.5 rounded-lg shadow-xl border border-white/20 whitespace-nowrap z-50 ${
                position === 'bottom-right'
                  ? '-left-24 top-1/2 transform -translate-y-1/2'
                  : position.includes('center') && (position.includes('left') || position.includes('right'))
                    ? position.includes('right') 
                      ? '-left-24 top-1/2 transform -translate-y-1/2'
                      : '-right-24 top-1/2 transform -translate-y-1/2'
                    : '-top-12 left-1/2 transform -translate-x-1/2'
              }`}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
              <div className={`absolute w-0 h-0 ${
                position === 'bottom-right'
                  ? 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900/95'
                  : position.includes('center') && (position.includes('left') || position.includes('right'))
                    ? position.includes('right')
                      ? 'left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900/95'
                      : 'right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/95'
                    : 'top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )

    if (item.type === 'component') {
      return (
        <div key={item.id} className="relative">
          {item.component}
        </div>
      )
    }

    if (item.type === 'link' && item.href) {
      return (
        <Link 
          key={item.id} 
          href={item.href} 
          target={item.external ? '_blank' : '_self'}
          rel={item.external ? 'noopener noreferrer' : ''}
        >
          {itemContent}
        </Link>
      )
    }

    return (
      <div key={item.id} onClick={item.onClick}>
        {itemContent}
      </div>
    )
  }

  return (
    <div className={`fixed z-[9999] ${getPositionClasses()} ${className}`}>
      <div 
        ref={dockRef}
        className={`flex items-center ${position === 'bottom-right' ? 'flex-col-reverse space-y-reverse space-y-2' : getItemLayout()}`}
      >
        {/* Main toggle button */}
        <MainButton />
        
        {/* Dock items */}
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              key="dock-items"
              className={`flex ${getItemLayout()}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {items.map((item, index) => (
                <DockItem key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingDock 