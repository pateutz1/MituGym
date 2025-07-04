'use client'

import { useState } from 'react'
import AnimatedBorderTrail from './animated-border-trail'
import { motion } from 'framer-motion'

const AnimatedBorderTrailDemo = () => {
  const [selectedVariant, setSelectedVariant] = useState<'continuous' | 'pulse' | 'chase' | 'glow'>('continuous')

  const variants = [
    {
      name: 'Continuous',
      value: 'continuous' as const,
      description: 'Smooth rotating border trail',
      color: 'rgb(34, 197, 94)' // emerald-500
    },
    {
      name: 'Pulse',
      value: 'pulse' as const,
      description: 'Pulsing border with scale effect',
      color: 'rgb(59, 130, 246)' // blue-500
    },
    {
      name: 'Chase',
      value: 'chase' as const,
      description: 'Rotating with opacity variations',
      color: 'rgb(168, 85, 247)' // purple-500
    },
    {
      name: 'Glow',
      value: 'glow' as const,
      description: 'Glowing border with shadow effects',
      color: 'rgb(236, 72, 153)' // pink-500
    }
  ]

  const demoCards = [
    {
      title: 'Feature Card',
      content: 'This card showcases the animated border trail effect with customizable properties.',
      icon: '✨'
    },
    {
      title: 'Pricing Card',
      content: 'Perfect for highlighting premium features and subscription tiers.',
      icon: '💎'
    },
    {
      title: 'Service Card',
      content: 'Ideal for service offerings and feature highlights.',
      icon: '🚀'
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Animated Border Trail</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Add subtle polish to your components with animated border effects. Choose from different variants
          to match your design aesthetic.
        </p>
      </div>

      {/* Variant Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {variants.map((variant) => (
          <motion.button
            key={variant.value}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedVariant === variant.value
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setSelectedVariant(variant.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="font-semibold">{variant.name}</div>
              <div className="text-xs opacity-80">{variant.description}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Demo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoCards.map((card, index) => {
          const currentVariant = variants.find(v => v.value === selectedVariant)
          return (
            <AnimatedBorderTrail
              key={`${selectedVariant}-${index}`}
              variant={selectedVariant}
              trailColor={currentVariant?.color}
              animationDuration={3 + index * 0.5}
              className="h-full"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl h-full flex flex-col">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400 flex-1">{card.content}</p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Variant: {currentVariant?.name}</span>
                    <span>Duration: {3 + index * 0.5}s</span>
                  </div>
                </div>
              </div>
            </AnimatedBorderTrail>
          )
        })}
      </div>

      {/* Large Demo Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-white mb-6 text-center">Section Border Trail</h3>
        <AnimatedBorderTrail
          variant={selectedVariant}
          trailColor={variants.find(v => v.value === selectedVariant)?.color}
          borderWidth={3}
          borderRadius="1.5rem"
          animationDuration={4}
          className="w-full"
        >
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 rounded-3xl">
            <div className="text-center space-y-6">
              <div className="text-6xl">🎨</div>
              <h4 className="text-3xl font-bold text-white">Premium Section</h4>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                This section demonstrates how the animated border trail can be used to highlight
                important content areas and create visual hierarchy in your designs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <div className="bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium">
                  Enhanced Visuals
                </div>
                <div className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg font-medium">
                  Smooth Animations
                </div>
                <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg font-medium">
                  Customizable
                </div>
              </div>
            </div>
          </div>
        </AnimatedBorderTrail>
      </div>

      {/* Usage Example */}
      <div className="mt-12 bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
        <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300">
            <code>{`import AnimatedBorderTrail from '@/components/ui/animated-border-trail'

<AnimatedBorderTrail
  variant="${selectedVariant}"
  trailColor="${variants.find(v => v.value === selectedVariant)?.color}"
  animationDuration={3}
  borderWidth={2}
  borderRadius="1rem"
>
  <div className="bg-gray-900 p-6 rounded-2xl">
    Your content here
  </div>
</AnimatedBorderTrail>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default AnimatedBorderTrailDemo 