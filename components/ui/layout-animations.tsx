import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useState } from 'react';

// Dynamic grid layout with smooth transitions
export function DynamicGrid() {
  const [items, setItems] = useState([
    { id: 1, title: 'Strength Training', color: 'bg-red-500' },
    { id: 2, title: 'Cardio Workouts', color: 'bg-blue-500' },
    { id: 3, title: 'Flexibility', color: 'bg-green-500' },
    { id: 4, title: 'Nutrition', color: 'bg-yellow-500' },
    { id: 5, title: 'Recovery', color: 'bg-purple-500' },
    { id: 6, title: 'Mental Health', color: 'bg-pink-500' },
  ]);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const shuffleItems = () => {
    setItems((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: `New Item ${items.length + 1}`,
      color: `bg-${['red', 'blue', 'green', 'yellow', 'purple', 'pink'][Math.floor(Math.random() * 6)]}-500`,
    };
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        <motion.button
          className="rounded-lg bg-primary px-4 py-2 text-white"
          onClick={shuffleItems}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shuffle
        </motion.button>
        <motion.button
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
          onClick={addItem}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Item
        </motion.button>
      </div>

      <LayoutGroup>
        <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-3" layout>
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className={`${item.color} group relative cursor-pointer rounded-lg p-4`}
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                key={item.id}
                layout
                layoutId={`item-${item.id}`}
                onClick={() => setSelectedId(item.id)}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="font-semibold text-sm text-white">
                  {item.title}
                </h3>
                <motion.button
                  className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
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
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            >
              <motion.div
                className={`${items.find((item) => item.id === selectedId)?.color} mx-4 w-full max-w-md rounded-lg p-8`}
                layoutId={`item-${selectedId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="mb-4 font-bold text-2xl text-white">
                  {items.find((item) => item.id === selectedId)?.title}
                </h2>
                <p className="mb-6 text-white/80">
                  This is the expanded view of the selected item. The layout
                  animation smoothly transitions from the grid position to this
                  modal view.
                </p>
                <motion.button
                  className="rounded bg-white/20 px-4 py-2 text-white"
                  onClick={() => setSelectedId(null)}
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
  );
}

// Shared layout transitions between different states
export function SharedLayoutTransitions() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-6">
      <motion.button
        className="rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </motion.button>

      <motion.div
        className={`rounded-lg border border-white/10 bg-surface/30 p-6 ${
          isExpanded ? 'md:p-12' : ''
        }`}
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.h3
          className="mb-4 font-bold text-white text-xl"
          layout="position"
        >
          Shared Layout Animation
        </motion.h3>

        <motion.p className="mb-4 text-white/70" layout="position">
          This content smoothly transitions between different layout states.
        </motion.p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.div className="rounded-lg bg-primary/20 p-4" layout>
                <h4 className="mb-2 font-semibold text-white">
                  Additional Content
                </h4>
                <p className="text-white/70">
                  This content appears with smooth layout transitions when
                  expanded.
                </p>
              </motion.div>

              <motion.div className="rounded-lg bg-blue-500/20 p-4" layout>
                <h4 className="mb-2 font-semibold text-white">
                  More Information
                </h4>
                <p className="text-white/70">
                  Layout animations automatically handle the repositioning of
                  elements.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Tab system with smooth layout transitions
export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: 'Workouts',
      content:
        'Discover our comprehensive workout programs designed for all fitness levels.',
    },
    {
      id: 1,
      label: 'Nutrition',
      content: 'Learn about our nutrition guidance and meal planning services.',
    },
    {
      id: 2,
      label: 'Recovery',
      content:
        'Explore our recovery and wellness programs for optimal performance.',
    },
    {
      id: 3,
      label: 'Community',
      content:
        'Join our vibrant fitness community and connect with like-minded individuals.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-1 rounded-lg bg-surface/20 p-1">
        {tabs.map((tab) => (
          <motion.button
            className={`relative rounded-md px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-white/60 hover:text-white/80'
            }`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 rounded-md bg-primary"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      <motion.div
        animate={{ opacity: 1, x: 0 }}
        className="rounded-lg border border-white/10 bg-surface/30 p-6"
        exit={{ opacity: 0, x: -20 }}
        initial={{ opacity: 0, x: 20 }}
        key={activeTab}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <p className="text-white/80">{tabs[activeTab].content}</p>
      </motion.div>
    </div>
  );
}

// Reorderable list with layout animations
export function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, title: 'Bench Press', sets: '3x10' },
    { id: 2, title: 'Squats', sets: '4x8' },
    { id: 3, title: 'Deadlifts', sets: '3x6' },
    { id: 4, title: 'Pull-ups', sets: '3x12' },
    { id: 5, title: 'Push-ups', sets: '3x15' },
  ]);

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newItems = [...items];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);
    setItems(newItems);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-white text-xl">Workout Order</h3>
      <p className="text-sm text-white/70">
        Click the arrows to reorder exercises
      </p>

      <motion.div className="space-y-2" layout>
        {items.map((item, index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-surface/30 p-4"
            exit={{ opacity: 0, x: 20 }}
            initial={{ opacity: 0, x: -20 }}
            key={item.id}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div>
              <h4 className="font-semibold text-white">{item.title}</h4>
              <p className="text-sm text-white/60">{item.sets}</p>
            </div>

            <div className="flex gap-2">
              <motion.button
                className="rounded bg-white/10 p-1 disabled:opacity-50"
                disabled={index === 0}
                onClick={() => index > 0 && moveItem(index, index - 1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ↑
              </motion.button>
              <motion.button
                className="rounded bg-white/10 p-1 disabled:opacity-50"
                disabled={index === items.length - 1}
                onClick={() =>
                  index < items.length - 1 && moveItem(index, index + 1)
                }
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
  );
}
