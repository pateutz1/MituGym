import { motion, type Variants } from 'motion/react';
import { useState } from 'react';

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
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    rotateX: 90,
    scale: 0.5,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    rotateY: 10,
    z: 50,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

export function VariantsShowcase() {
  const [isVisible, setIsVisible] = useState(true);

  const workoutTypes = [
    { id: 1, name: 'Strength Training', icon: '💪', color: 'bg-red-500' },
    { id: 2, name: 'Cardio Blast', icon: '🏃', color: 'bg-blue-500' },
    { id: 3, name: 'Flexibility', icon: '🧘', color: 'bg-green-500' },
    { id: 4, name: 'HIIT Training', icon: '⚡', color: 'bg-yellow-500' },
    { id: 5, name: 'Yoga Flow', icon: '🕉️', color: 'bg-purple-500' },
    { id: 6, name: 'CrossFit', icon: '🏋️', color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <motion.button
        className="rounded-lg bg-primary px-4 py-2 text-white"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isVisible ? 'Hide' : 'Show'} Workout Types
      </motion.button>

      {isVisible && (
        <motion.div
          animate="visible"
          className="grid grid-cols-2 gap-4 md:grid-cols-3"
          exit="exit"
          initial="hidden"
          style={{ perspective: '1000px' }}
          variants={containerVariants}
        >
          {workoutTypes.map((workout) => (
            <motion.div
              className={`${workout.color} transform-gpu cursor-pointer rounded-lg p-6 text-white`}
              key={workout.id}
              style={{ transformStyle: 'preserve-3d' }}
              variants={itemVariants}
              whileHover="hover"
            >
              <motion.div className="mb-2 text-3xl">{workout.icon}</motion.div>
              <motion.h3 className="font-semibold">{workout.name}</motion.h3>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Advanced staggered animations with different patterns
const _staggeredContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const _staggeredItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotate: -180,
    scale: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

export function StaggeredPatterns() {
  const [pattern, setPattern] = useState<
    'normal' | 'reverse' | 'center' | 'random'
  >('normal');

  const exercises = [
    'Push-ups',
    'Squats',
    'Lunges',
    'Planks',
    'Burpees',
    'Mountain Climbers',
    'Jumping Jacks',
    'Sit-ups',
  ];

  const getStaggerDelay = (index: number, total: number) => {
    switch (pattern) {
      case 'reverse':
        return (total - index - 1) * 0.1;
      case 'center': {
        const center = total / 2;
        return Math.abs(index - center) * 0.1;
      }
      case 'random':
        return Math.random() * 0.5;
      default:
        return index * 0.1;
    }
  };

  const patternVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(['normal', 'reverse', 'center', 'random'] as const).map((p) => (
          <motion.button
            className={`rounded px-3 py-1 text-sm ${
              pattern === p
                ? 'bg-primary text-white'
                : 'bg-surface/30 text-white/70'
            }`}
            key={p}
            onClick={() => setPattern(p)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </motion.button>
        ))}
      </div>

      <motion.div
        animate="visible"
        className="grid grid-cols-2 gap-3 md:grid-cols-4"
        initial="hidden"
        key={pattern}
        variants={patternVariants}
      >
        {exercises.map((exercise, index) => (
          <motion.div
            className="rounded-lg border border-white/10 bg-surface/30 p-4 text-center"
            key={`${pattern}-${exercise}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
                rotateY: -90,
                scale: 0.5,
              },
              visible: {
                opacity: 1,
                y: 0,
                rotateY: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 25,
                  delay: getStaggerDelay(index, exercises.length),
                },
              },
            }}
          >
            <span className="font-medium text-sm text-white">{exercise}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Orchestrated animations with multiple variant groups
const orchestratedVariants: Variants = {
  idle: {
    scale: 1,
    rotate: 0,
    backgroundColor: 'rgb(30, 155, 113)',
  },
  active: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    backgroundColor: [
      'rgb(30, 155, 113)',
      'rgb(59, 130, 246)',
      'rgb(168, 85, 247)',
      'rgb(30, 155, 113)',
    ],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
  workout: {
    scale: [1, 0.8, 1.3, 1],
    rotate: [0, -45, 45, 0],
    backgroundColor: [
      'rgb(239, 68, 68)',
      'rgb(245, 158, 11)',
      'rgb(34, 197, 94)',
      'rgb(239, 68, 68)',
    ],
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'easeInOut',
    },
  },
};

export function OrchestratedAnimations() {
  const [mode, setMode] = useState<'idle' | 'active' | 'workout'>('idle');

  const equipmentItems = [
    { id: 1, name: 'Dumbbells', icon: '🏋️' },
    { id: 2, name: 'Treadmill', icon: '🏃' },
    { id: 3, name: 'Bike', icon: '🚴' },
    { id: 4, name: 'Kettlebell', icon: '⚫' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        {(['idle', 'active', 'workout'] as const).map((m) => (
          <motion.button
            className={`rounded-lg px-4 py-2 ${
              mode === m
                ? 'bg-primary text-white'
                : 'bg-surface/30 text-white/70'
            }`}
            key={m}
            onClick={() => setMode(m)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)} Mode
          </motion.button>
        ))}
      </div>

      <motion.div
        animate={mode}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
        variants={{
          idle: {
            transition: { staggerChildren: 0.1 },
          },
          active: {
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
          },
          workout: {
            transition: { staggerChildren: 0.05, delayChildren: 0 },
          },
        }}
      >
        {equipmentItems.map((item, _index) => (
          <motion.div
            className="flex h-20 w-20 flex-col items-center justify-center rounded-lg font-semibold text-white"
            key={item.id}
            style={{
              transformOrigin: 'center',
              willChange: 'transform, background-color',
            }}
            variants={orchestratedVariants}
          >
            <div className="mb-1 text-2xl">{item.icon}</div>
            <div className="text-xs">{item.name}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Complex coordinated sequence
const sequenceVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  phase1: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  phase2: {
    scale: [1, 1.2, 1],
    rotate: [0, 180, 360],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
  phase3: {
    x: [0, 100, -100, 0],
    y: [0, -50, 50, 0],
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
  final: {
    scale: 1.5,
    rotate: 720,
    backgroundColor: 'rgb(34, 197, 94)',
    transition: {
      duration: 1,
      ease: 'backOut',
    },
  },
};

export function CoordinatedSequence() {
  const [currentPhase, setCurrentPhase] = useState<
    'initial' | 'phase1' | 'phase2' | 'phase3' | 'final'
  >('initial');

  const phases = ['initial', 'phase1', 'phase2', 'phase3', 'final'] as const;

  const nextPhase = () => {
    const currentIndex = phases.indexOf(currentPhase);
    const nextIndex = (currentIndex + 1) % phases.length;
    setCurrentPhase(phases[nextIndex]);
  };

  const resetSequence = () => {
    setCurrentPhase('initial');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        <motion.button
          className="rounded-lg bg-primary px-4 py-2 text-white"
          onClick={nextPhase}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Phase
        </motion.button>
        <motion.button
          className="rounded-lg bg-surface/30 px-4 py-2 text-white"
          onClick={resetSequence}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset
        </motion.button>
      </div>

      <div className="text-center text-white/70">
        Current Phase:{' '}
        <span className="font-semibold text-primary">{currentPhase}</span>
      </div>

      <div className="relative h-64 overflow-hidden rounded-lg border border-white/10 bg-surface/20">
        <motion.div
          animate={currentPhase}
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-16 w-16 rounded-lg bg-primary"
          style={{ transformOrigin: 'center' }}
          variants={sequenceVariants}
        />
      </div>
    </div>
  );
}
