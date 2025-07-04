import { motion, Variants } from 'motion/react'
import { useState } from 'react'

// Complex variant system for coordinated animations
const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.3
    }
  }
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      duration: 0.6
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    rotateX: 90,
    scale: 0.5,
    transition: {
      duration: 0.3
    }
  },
  hover: {
    scale: 1.05,
    rotateY: 10,
    z: 50,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
}

export function VariantsShowcase() {
  const [isVisible, setIsVisible] = useState(true)
  
  const workoutTypes = [
    { id: 1, name: 'Strength Training', icon: '💪', color: 'bg-red-500' },
    { id: 2, name: 'Cardio Blast', icon: '🏃', color: 'bg-blue-500' },
    { id: 3, name: 'Flexibility', icon: '🧘', color: 'bg-green-500' },
    { id: 4, name: 'HIIT Training', icon: '⚡', color: 'bg-yellow-500' },
    { id: 5, name: 'Yoga Flow', icon: '🕉️', color: 'bg-purple-500' },
    { id: 6, name: 'CrossFit', icon: '🏋️', color: 'bg-pink-500' },
  ]

  return (
    <div className="space-y-6">
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-primary text-white rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isVisible ? 'Hide' : 'Show'} Workout Types
      </motion.button>

      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          style={{ perspective: '1000px' }}
        >
          {workoutTypes.map((workout) => (
            <motion.div
              key={workout.id}
              variants={itemVariants}
              whileHover="hover"
              className={`${workout.color} p-6 rounded-lg text-white cursor-pointer transform-gpu`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div className="text-3xl mb-2">{workout.icon}</motion.div>
              <motion.h3 className="font-semibold">{workout.name}</motion.h3>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Advanced staggered animations with different patterns
const staggeredContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const staggeredItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -100, 
    rotate: -180,
    scale: 0
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
}

export function StaggeredPatterns() {
  const [pattern, setPattern] = useState<'normal' | 'reverse' | 'center' | 'random'>('normal')
  
  const exercises = [
    'Push-ups', 'Squats', 'Lunges', 'Planks', 'Burpees', 
    'Mountain Climbers', 'Jumping Jacks', 'Sit-ups'
  ]

  const getStaggerDelay = (index: number, total: number) => {
    switch (pattern) {
      case 'reverse':
        return (total - index - 1) * 0.1
      case 'center':
        const center = total / 2
        return Math.abs(index - center) * 0.1
      case 'random':
        return Math.random() * 0.5
      default:
        return index * 0.1
    }
  }

  const patternVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {(['normal', 'reverse', 'center', 'random'] as const).map((p) => (
          <motion.button
            key={p}
            onClick={() => setPattern(p)}
            className={`px-3 py-1 rounded text-sm ${
              pattern === p ? 'bg-primary text-white' : 'bg-surface/30 text-white/70'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </motion.button>
        ))}
      </div>

      <motion.div
        key={pattern}
        variants={patternVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {exercises.map((exercise, index) => (
          <motion.div
            key={`${pattern}-${exercise}`}
            variants={{
              hidden: { 
                opacity: 0, 
                y: 50, 
                rotateY: -90,
                scale: 0.5
              },
              visible: { 
                opacity: 1, 
                y: 0, 
                rotateY: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: getStaggerDelay(index, exercises.length)
                }
              }
            }}
            className="bg-surface/30 border border-white/10 rounded-lg p-4 text-center"
          >
            <span className="text-white text-sm font-medium">{exercise}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Orchestrated animations with multiple variant groups
const orchestratedVariants: Variants = {
  idle: {
    scale: 1,
    rotate: 0,
    backgroundColor: 'rgb(30, 155, 113)'
  },
  active: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    backgroundColor: [
      'rgb(30, 155, 113)',
      'rgb(59, 130, 246)',
      'rgb(168, 85, 247)',
      'rgb(30, 155, 113)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  workout: {
    scale: [1, 0.8, 1.3, 1],
    rotate: [0, -45, 45, 0],
    backgroundColor: [
      'rgb(239, 68, 68)',
      'rgb(245, 158, 11)',
      'rgb(34, 197, 94)',
      'rgb(239, 68, 68)'
    ],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function OrchestratedAnimations() {
  const [mode, setMode] = useState<'idle' | 'active' | 'workout'>('idle')
  
  const equipmentItems = [
    { id: 1, name: 'Dumbbells', icon: '🏋️' },
    { id: 2, name: 'Treadmill', icon: '🏃' },
    { id: 3, name: 'Bike', icon: '🚴' },
    { id: 4, name: 'Kettlebell', icon: '⚫' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        {(['idle', 'active', 'workout'] as const).map((m) => (
          <motion.button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg ${
              mode === m ? 'bg-primary text-white' : 'bg-surface/30 text-white/70'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)} Mode
          </motion.button>
        ))}
      </div>

      <motion.div
        variants={{
          idle: { 
            transition: { staggerChildren: 0.1 }
          },
          active: { 
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
          },
          workout: { 
            transition: { staggerChildren: 0.05, delayChildren: 0 }
          }
        }}
        animate={mode}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {equipmentItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={orchestratedVariants}
            className="w-20 h-20 rounded-lg flex flex-col items-center justify-center text-white font-semibold"
            style={{ 
              transformOrigin: 'center',
              willChange: 'transform, background-color'
            }}
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs">{item.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Complex coordinated sequence
const sequenceVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    rotate: -180
  },
  phase1: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  phase2: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  },
  phase3: {
    x: [0, 100, -100, 0],
    y: [0, -50, 50, 0],
    transition: {
      duration: 2,
      ease: "easeInOut"
    }
  },
  final: {
    scale: 1.5,
    rotate: 720,
    backgroundColor: 'rgb(34, 197, 94)',
    transition: {
      duration: 1,
      ease: "backOut"
    }
  }
}

export function CoordinatedSequence() {
  const [currentPhase, setCurrentPhase] = useState<'initial' | 'phase1' | 'phase2' | 'phase3' | 'final'>('initial')
  
  const phases = ['initial', 'phase1', 'phase2', 'phase3', 'final'] as const
  
  const nextPhase = () => {
    const currentIndex = phases.indexOf(currentPhase)
    const nextIndex = (currentIndex + 1) % phases.length
    setCurrentPhase(phases[nextIndex])
  }

  const resetSequence = () => {
    setCurrentPhase('initial')
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={nextPhase}
          className="px-4 py-2 bg-primary text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Phase
        </motion.button>
        <motion.button
          onClick={resetSequence}
          className="px-4 py-2 bg-surface/30 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>

      <div className="text-center text-white/70">
        Current Phase: <span className="text-primary font-semibold">{currentPhase}</span>
      </div>

      <div className="relative h-64 bg-surface/20 rounded-lg border border-white/10 overflow-hidden">
        <motion.div
          variants={sequenceVariants}
          animate={currentPhase}
          className="absolute top-1/2 left-1/2 w-16 h-16 bg-primary rounded-lg -translate-x-1/2 -translate-y-1/2"
          style={{ transformOrigin: 'center' }}
        />
      </div>
    </div>
  )
} 