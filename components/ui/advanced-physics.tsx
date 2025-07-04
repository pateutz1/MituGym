'use client'

import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

// Physics-based spring animations
export function PhysicsSpring() {
  const [target, setTarget] = useState(0)
  const [stiffness, setStiffness] = useState(100)
  const [damping, setDamping] = useState(10)
  
  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness, damping })
  
  useEffect(() => {
    x.set(target)
  }, [target, x])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-white text-sm">Target: {target}</label>
          <input
            type="range"
            min="0"
            max="300"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-white text-sm">Stiffness: {stiffness}</label>
          <input
            type="range"
            min="10"
            max="500"
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-white text-sm">Damping: {damping}</label>
          <input
            type="range"
            min="1"
            max="50"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="relative h-24 bg-surface/20 rounded-lg border border-white/10">
        <motion.div
          className="absolute top-1/2 w-8 h-8 bg-primary rounded-full -translate-y-1/2"
          style={{ x: springX }}
        />
      </div>
    </div>
  )
}

// Advanced mouse tracking with physics
export function MouseTracker() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  
  const [velocity, setVelocity] = useState(0)
  
  useEffect(() => {
    const unsubscribe = springX.on('change', (latest: number) => {
      const vel = Math.abs(latest - springX.getPrevious())
      setVelocity(vel)
    })
    return unsubscribe
  }, [springX])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const scale = useTransform(springX, (x: number) => Math.max(0.5, Math.min(2, x / 200)))
  const rotate = useTransform([springX, springY], (values: number[]) => {
    const [x, y] = values
    return Math.atan2(y - 200, x - 200) * (180 / Math.PI)
  })
  const opacity = useTransform(springY, [0, 400], [1, 0.3])

  return (
    <div 
      className="relative w-full h-96 bg-surface/20 rounded-lg border border-white/10 overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute w-8 h-8 bg-primary rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          scale,
          rotate,
          opacity,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      
      <div className="absolute top-4 left-4 text-white/70 text-sm space-y-1">
        <p>Velocity: {velocity.toFixed(0)}</p>
        <p>X: {springX.get().toFixed(0)}</p>
        <p>Y: {springY.get().toFixed(0)}</p>
        <p>Scale: {scale.get().toFixed(2)}</p>
      </div>
    </div>
  )
}

// Complex transform chains
export function TransformChains() {
  const [progress, setProgress] = useState(0)
  
  const baseValue = useMotionValue(0)
  const springValue = useSpring(baseValue, { stiffness: 300, damping: 30 })
  
  useEffect(() => {
    baseValue.set(progress)
  }, [progress, baseValue])

  // Chain multiple transforms
  const x = useTransform(springValue, [0, 1], [0, 200])
  const y = useTransform(springValue, [0, 1], [0, 100])
  const scale = useTransform(springValue, [0, 0.5, 1], [1, 1.5, 1])
  const rotate = useTransform(springValue, [0, 1], [0, 360])
  const borderRadius = useTransform(springValue, [0, 1], ['0%', '50%'])
  
  // Complex color interpolation
  const backgroundColor = useTransform(
    springValue,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'rgb(30, 155, 113)',
      'rgb(59, 130, 246)',
      'rgb(168, 85, 247)',
      'rgb(236, 72, 153)',
      'rgb(239, 68, 68)'
    ]
  )

  // Derived transforms
  const skewX = useTransform(x, [0, 200], [0, 15])
  const skewY = useTransform(y, [0, 100], [0, -10])
  const shadowBlur = useTransform(scale, [1, 1.5], [10, 30])
  const shadowOffset = useTransform(rotate, [0, 360], [0, 20])

  const filter = useTransform(
    [shadowBlur, shadowOffset],
    (values: number[]) => {
      const [blur, offset] = values
      return `drop-shadow(${offset}px ${offset}px ${blur}px rgba(0,0,0,0.3))`
    }
  )

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-white text-sm">Progress: {(progress * 100).toFixed(0)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={progress}
          onChange={(e) => setProgress(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="relative h-64 bg-surface/20 rounded-lg border border-white/10 overflow-hidden">
        <motion.div
          className="absolute top-8 left-8 w-16 h-16"
          style={{
            x,
            y,
            scale,
            rotate,
            borderRadius,
            backgroundColor,
            skewX,
            skewY,
            filter
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-white/70 text-sm">
        <div>
          <p>X: {x.get().toFixed(0)}</p>
          <p>Y: {y.get().toFixed(0)}</p>
          <p>Scale: {scale.get().toFixed(2)}</p>
        </div>
        <div>
          <p>Rotation: {rotate.get().toFixed(0)}°</p>
          <p>Skew X: {skewX.get().toFixed(1)}°</p>
          <p>Skew Y: {skewY.get().toFixed(1)}°</p>
        </div>
      </div>
    </div>
  )
}

// Gesture-based physics
export function GesturePhysics() {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [dragCount, setDragCount] = useState(0)
  
  return (
    <div className="space-y-6">
      <div className="text-center text-white/70">
        <p>Drag the elements around to see physics in action</p>
        <p>Total drags: {dragCount}</p>
      </div>

      <div 
        ref={constraintsRef}
        className="relative h-96 bg-surface/20 rounded-lg border border-white/10 overflow-hidden"
      >
        {/* Bouncy ball */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.7}
          dragMomentum={false}
          onDragStart={() => setDragCount(prev => prev + 1)}
          className="absolute top-4 left-4 w-12 h-12 bg-red-500 rounded-full cursor-grab active:cursor-grabbing"
          whileDrag={{ scale: 1.2 }}
          animate={{ 
            boxShadow: [
              '0 0 10px rgba(239, 68, 68, 0.5)',
              '0 0 20px rgba(239, 68, 68, 0.8)',
              '0 0 10px rgba(239, 68, 68, 0.5)'
            ]
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity },
            type: "spring",
            stiffness: 600,
            damping: 20
          }}
        />

        {/* Magnetic element */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          dragMomentum={true}
          onDragStart={() => setDragCount(prev => prev + 1)}
          className="absolute top-4 right-4 w-16 h-16 bg-blue-500 rounded-lg cursor-grab active:cursor-grabbing"
          whileDrag={{ 
            scale: 1.1,
            rotate: 45,
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)'
          }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        />

        {/* Elastic square */}
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={1}
          dragMomentum={false}
          onDragStart={() => setDragCount(prev => prev + 1)}
          className="absolute bottom-4 left-4 w-14 h-14 bg-green-500 rounded cursor-grab active:cursor-grabbing"
          whileDrag={{ 
            scale: [1, 1.3, 1],
            borderRadius: ['0%', '50%', '0%']
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        />

        {/* Pendulum effect */}
        <motion.div
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.3}
          onDragStart={() => setDragCount(prev => prev + 1)}
          className="absolute bottom-4 right-4 w-12 h-12 bg-purple-500 rounded-full cursor-grab active:cursor-grabbing"
          whileDrag={{ 
            rotate: 15,
            scale: 1.1
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      </div>
    </div>
  )
}

// Real-time physics simulation
export function PhysicsSimulation() {
  const [isRunning, setIsRunning] = useState(false)
  const [gravity, setGravity] = useState(0.5)
  const [bounce, setBounce] = useState(0.8)
  
  const ballY = useMotionValue(0)
  const ballVelocity = useMotionValue(0)
  
  useAnimationFrame(() => {
    if (!isRunning) return
    
    const currentY = ballY.get()
    const currentVelocity = ballVelocity.get()
    
    // Apply gravity
    const newVelocity = currentVelocity + gravity
    const newY = currentY + newVelocity
    
    // Bounce off bottom
    if (newY > 300) {
      ballY.set(300)
      ballVelocity.set(-newVelocity * bounce)
    } else {
      ballY.set(newY)
      ballVelocity.set(newVelocity)
    }
  })

  const startSimulation = () => {
    setIsRunning(true)
    ballY.set(0)
    ballVelocity.set(0)
  }

  const stopSimulation = () => {
    setIsRunning(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <motion.button
          onClick={startSimulation}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start
        </motion.button>
        <motion.button
          onClick={stopSimulation}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Stop
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-white text-sm">Gravity: {gravity.toFixed(2)}</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={gravity}
            onChange={(e) => setGravity(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-white text-sm">Bounce: {bounce.toFixed(2)}</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={bounce}
            onChange={(e) => setBounce(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="relative h-80 bg-surface/20 rounded-lg border border-white/10 overflow-hidden">
        <motion.div
          className="absolute left-1/2 w-8 h-8 bg-primary rounded-full -translate-x-1/2"
          style={{ y: ballY }}
        />
        
        <div className="absolute bottom-4 left-4 text-white/70 text-sm">
          <p>Y Position: {ballY.get().toFixed(0)}</p>
          <p>Velocity: {ballVelocity.get().toFixed(2)}</p>
          <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
        </div>
      </div>
    </div>
  )
} 