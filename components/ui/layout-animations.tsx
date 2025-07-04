import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { useState } from 'react'

// Dynamic grid layout with smooth transitions
export function DynamicGrid() {
  const [items, setItems] = useState([
    { id: 1, title: 'Strength Training', color: 'bg-red-500' },
    { id: 2, title: 'Cardio Workouts', color: 'bg-blue-500' },
    { id: 3, title: 'Flexibility', color: 'bg-green-500' },
    { id: 4, title: 'Nutrition', color: 'bg-yellow-500' },
    { id: 5, title: 'Recovery', color: 'bg-purple-500' },
    { id: 6, title: 'Mental Health', color: 'bg-pink-500' },
  ])

  const [selectedId, setSelectedId] = useState<number | null>(null)

  const shuffleItems = () => {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: `New Item ${items.length + 1}`,
      color: `bg-${['red', 'blue', 'green', 'yellow', 'purple', 'pink'][Math.floor(Math.random() * 6)]}-500`
    }
    setItems(prev => [...prev, newItem])
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={shuffleItems}
          className="px-4 py-2 bg-primary text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shuffle
        </motion.button>
        <motion.button
          onClick={addItem}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Item
        </motion.button>
      </div>

      <LayoutGroup>
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                layoutId={`item-${item.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30 
                }}
                className={`${item.color} p-4 rounded-lg cursor-pointer relative group`}
                onClick={() => setSelectedId(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeItem(item.id)
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for selected item */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                layoutId={`item-${selectedId}`}
                className={`${items.find(item => item.id === selectedId)?.color} p-8 rounded-lg max-w-md w-full mx-4`}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-white text-2xl font-bold mb-4">
                  {items.find(item => item.id === selectedId)?.title}
                </h2>
                <p className="text-white/80 mb-6">
                  This is the expanded view of the selected item. The layout animation 
                  smoothly transitions from the grid position to this modal view.
                </p>
                <motion.button
                  onClick={() => setSelectedId(null)}
                  className="bg-white/20 text-white px-4 py-2 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  )
}

// Shared layout transitions between different states
export function SharedLayoutTransitions() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-6">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2 bg-primary text-white rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </motion.button>

      <motion.div
        layout
        className={`bg-surface/30 border border-white/10 rounded-lg p-6 ${
          isExpanded ? 'md:p-12' : ''
        }`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.h3 
          layout="position"
          className="text-white text-xl font-bold mb-4"
        >
          Shared Layout Animation
        </motion.h3>
        
        <motion.p 
          layout="position"
          className="text-white/70 mb-4"
        >
          This content smoothly transitions between different layout states.
        </motion.p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="space-y-4"
            >
              <motion.div
                layout
                className="bg-primary/20 p-4 rounded-lg"
              >
                <h4 className="text-white font-semibold mb-2">Additional Content</h4>
                <p className="text-white/70">
                  This content appears with smooth layout transitions when expanded.
                </p>
              </motion.div>
              
              <motion.div
                layout
                className="bg-blue-500/20 p-4 rounded-lg"
              >
                <h4 className="text-white font-semibold mb-2">More Information</h4>
                <p className="text-white/70">
                  Layout animations automatically handle the repositioning of elements.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Tab system with smooth layout transitions
export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(0)
  
  const tabs = [
    { id: 0, label: 'Workouts', content: 'Discover our comprehensive workout programs designed for all fitness levels.' },
    { id: 1, label: 'Nutrition', content: 'Learn about our nutrition guidance and meal planning services.' },
    { id: 2, label: 'Recovery', content: 'Explore our recovery and wellness programs for optimal performance.' },
    { id: 3, label: 'Community', content: 'Join our vibrant fitness community and connect with like-minded individuals.' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 bg-surface/20 p-1 rounded-lg">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id ? 'text-white' : 'text-white/60 hover:text-white/80'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-surface/30 border border-white/10 rounded-lg p-6"
      >
        <p className="text-white/80">{tabs[activeTab].content}</p>
      </motion.div>
    </div>
  )
}

// Reorderable list with layout animations
export function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, title: 'Bench Press', sets: '3x10' },
    { id: 2, title: 'Squats', sets: '4x8' },
    { id: 3, title: 'Deadlifts', sets: '3x6' },
    { id: 4, title: 'Pull-ups', sets: '3x12' },
    { id: 5, title: 'Push-ups', sets: '3x15' },
  ])

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    setItems(newItems)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-white text-xl font-bold">Workout Order</h3>
      <p className="text-white/70 text-sm">Click the arrows to reorder exercises</p>
      
      <motion.div layout className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-surface/30 border border-white/10 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h4 className="text-white font-semibold">{item.title}</h4>
              <p className="text-white/60 text-sm">{item.sets}</p>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                onClick={() => index > 0 && moveItem(index, index - 1)}
                disabled={index === 0}
                className="p-1 bg-white/10 rounded disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ↑
              </motion.button>
              <motion.button
                onClick={() => index < items.length - 1 && moveItem(index, index + 1)}
                disabled={index === items.length - 1}
                className="p-1 bg-white/10 rounded disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ↓
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
} 