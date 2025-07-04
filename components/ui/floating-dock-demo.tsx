'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FloatingDock from './floating-dock'
import GymFloatingDock from './gym-floating-dock'

const FloatingDockDemo = () => {
  const [activeDemo, setActiveDemo] = useState<string>('gym')

  // Custom dock items for demo
  const customDockItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: '/',
      type: 'link' as const,
      external: false
    },
    {
      id: 'search',
      label: 'Search',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      type: 'action' as const,
      onClick: () => alert('Search clicked!')
    },
    {
      id: 'bookmark',
      label: 'Bookmark',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      type: 'action' as const,
      onClick: () => alert('Bookmark clicked!')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      type: 'action' as const,
      onClick: () => alert('Settings clicked!')
    }
  ]

  const demos = [
    {
      id: 'gym',
      title: 'Gym Floating Dock',
      description: 'Pre-configured dock with social media, contact options, and language switcher',
              component: <GymFloatingDock position="bottom-right" />
    },
    {
      id: 'custom',
      title: 'Custom Floating Dock',
      description: 'Custom dock with navigation and action items',
      component: <FloatingDock items={customDockItems} position="bottom-left" />
    },
    {
      id: 'minimal',
      title: 'Minimal Dock',
      description: 'Simple dock with just essential items',
      component: <FloatingDock 
        items={customDockItems.slice(0, 3)} 
        position="left-center" 
      />
    }
  ]

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Floating Dock Component
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Modern, accessible navigation element perfect for quick actions and social media links
          </p>
        </motion.div>

        {/* Demo Selector */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {demos.map((demo) => (
            <motion.button
              key={demo.id}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeDemo === demo.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-gray-800 text-white/70 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveDemo(demo.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {demo.title}
            </motion.button>
          ))}
        </div>

        {/* Demo Description */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-4">
            {demos.find(d => d.id === activeDemo)?.title}
          </h2>
          <p className="text-white/70 mb-6">
            {demos.find(d => d.id === activeDemo)?.description}
          </p>
          
          {/* Usage Example */}
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400 mb-2">{`// Usage Example:`}</div>
            {activeDemo === 'gym' && (
              <div className="text-gray-300">
                {`import GymFloatingDock from '@/components/ui/gym-floating-dock'

<GymFloatingDock position="bottom-right" />`}
              </div>
            )}
            {activeDemo === 'custom' && (
              <div className="text-gray-300">
                {`import FloatingDock from '@/components/ui/floating-dock'

const customItems = [
  {
    id: 'home',
    label: 'Home',
    icon: <HomeIcon />,
    href: '/',
    type: 'link'
  },
  /* ... more items */
]

<FloatingDock items={customItems} position="bottom-left" />`}
              </div>
            )}
            {activeDemo === 'minimal' && (
              <div className="text-gray-300">
                {`import FloatingDock from '@/components/ui/floating-dock'

<FloatingDock 
  items={minimalItems} 
  position="left-center" 
/>`}
              </div>
            )}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gray-900/30 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-primary">✨ Features</h3>
            <ul className="space-y-2 text-white/70">
              <li>• Modern glass morphism design</li>
              <li>• Smooth animations with Framer Motion</li>
              <li>• Multiple positioning options</li>
              <li>• Customizable items and actions</li>
              <li>• Built-in tooltips</li>
              <li>• Mobile responsive</li>
              <li>• Accessibility friendly</li>
            </ul>
          </div>

          <div className="bg-gray-900/30 rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4 text-primary">🎯 Perfect For</h3>
            <ul className="space-y-2 text-white/70">
              <li>• Social media links</li>
              <li>• Contact options</li>
              <li>• Quick navigation</li>
              <li>• Language switcher</li>
              <li>• User actions</li>
              <li>• App shortcuts</li>
              <li>• Utility functions</li>
            </ul>
          </div>
        </motion.div>

        {/* Position Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-900/30 rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-4 text-primary">📍 Position Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              'bottom-left',
              'bottom-center', 
              'bottom-right',
              'left-center',
              'right-center'
            ].map((position) => (
              <div key={position} className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm font-mono text-primary">
                  {position}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Render Active Demo */}
        {demos.find(d => d.id === activeDemo)?.component}
      </div>
    </div>
  )
}

export default FloatingDockDemo 