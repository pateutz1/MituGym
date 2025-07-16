'use client';

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Physics-based spring animations
export function PhysicsSpring() {
  const [target, setTarget] = useState(0);
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness, damping });

  useEffect(() => {
    x.set(target);
  }, [target, x]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-white" htmlFor="target-input">
            Target: {target}
          </label>
          <input
            className="w-full"
            id="target-input"
            max="300"
            min="0"
            onChange={(e) => setTarget(Number(e.target.value))}
            type="range"
            value={target}
          />
        </div>
        <div>
          <label className="text-sm text-white" htmlFor="stiffness-input">
            Stiffness: {stiffness}
          </label>
          <input
            className="w-full"
            id="stiffness-input"
            max="500"
            min="10"
            onChange={(e) => setStiffness(Number(e.target.value))}
            type="range"
            value={stiffness}
          />
        </div>
        <div>
          <label className="text-sm text-white" htmlFor="damping-input">
            Damping: {damping}
          </label>
          <input
            className="w-full"
            id="damping-input"
            max="50"
            min="1"
            onChange={(e) => setDamping(Number(e.target.value))}
            type="range"
            value={damping}
          />
        </div>
      </div>

      <div className="relative h-24 rounded-lg border border-white/10 bg-surface/20">
        <motion.div
          className="-translate-y-1/2 absolute top-1/2 h-8 w-8 rounded-full bg-primary"
          style={{ x: springX }}
        />
      </div>
    </div>
  );
}

// Advanced mouse tracking with physics
export function MouseTracker() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const unsubscribe = springX.on('change', (latest: number) => {
      const vel = Math.abs(latest - springX.getPrevious());
      setVelocity(vel);
    });
    return unsubscribe;
  }, [springX]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const scale = useTransform(springX, (x: number) =>
    Math.max(0.5, Math.min(2, x / 200))
  );
  const rotate = useTransform([springX, springY], (values: number[]) => {
    const [x, y] = values;
    return Math.atan2(y - 200, x - 200) * (180 / Math.PI);
  });
  const opacity = useTransform(springY, [0, 400], [1, 0.3]);

  return (
    <button
      aria-label="Interactive mouse tracking area"
      className="relative h-96 w-full cursor-none overflow-hidden rounded-lg border border-white/10 bg-surface/20"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Handle keyboard interaction for accessibility
        }
      }}
      onMouseMove={handleMouseMove}
      type="button"
    >
      <motion.div
        className="pointer-events-none absolute h-8 w-8 rounded-full bg-primary"
        style={{
          x: springX,
          y: springY,
          scale,
          rotate,
          opacity,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <div className="absolute top-4 left-4 space-y-1 text-sm text-white/70">
        <p>Velocity: {velocity.toFixed(0)}</p>
        <p>X: {springX.get().toFixed(0)}</p>
        <p>Y: {springY.get().toFixed(0)}</p>
        <p>Scale: {scale.get().toFixed(2)}</p>
      </div>
    </button>
  );
}

// Complex transform chains
export function TransformChains() {
  const [progress, setProgress] = useState(0);

  const baseValue = useMotionValue(0);
  const springValue = useSpring(baseValue, { stiffness: 300, damping: 30 });

  useEffect(() => {
    baseValue.set(progress);
  }, [progress, baseValue]);

  // Chain multiple transforms
  const x = useTransform(springValue, [0, 1], [0, 200]);
  const y = useTransform(springValue, [0, 1], [0, 100]);
  const scale = useTransform(springValue, [0, 0.5, 1], [1, 1.5, 1]);
  const rotate = useTransform(springValue, [0, 1], [0, 360]);
  const borderRadius = useTransform(springValue, [0, 1], ['0%', '50%']);

  // Complex color interpolation
  const backgroundColor = useTransform(
    springValue,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'rgb(30, 155, 113)',
      'rgb(59, 130, 246)',
      'rgb(168, 85, 247)',
      'rgb(236, 72, 153)',
      'rgb(239, 68, 68)',
    ]
  );

  // Derived transforms
  const skewX = useTransform(x, [0, 200], [0, 15]);
  const skewY = useTransform(y, [0, 100], [0, -10]);
  const shadowBlur = useTransform(scale, [1, 1.5], [10, 30]);
  const shadowOffset = useTransform(rotate, [0, 360], [0, 20]);

  const filter = useTransform(
    [shadowBlur, shadowOffset],
    (values: number[]) => {
      const [blur, offset] = values;
      return `drop-shadow(${offset}px ${offset}px ${blur}px rgba(0,0,0,0.3))`;
    }
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm text-white" htmlFor="progress-input">
          Progress: {(progress * 100).toFixed(0)}%
        </label>
        <input
          className="w-full"
          id="progress-input"
          max="1"
          min="0"
          onChange={(e) => setProgress(Number.parseFloat(e.target.value))}
          step="0.01"
          type="range"
          value={progress}
        />
      </div>

      <div className="relative h-64 overflow-hidden rounded-lg border border-white/10 bg-surface/20">
        <motion.div
          className="absolute top-8 left-8 h-16 w-16"
          style={{
            x,
            y,
            scale,
            rotate,
            borderRadius,
            backgroundColor,
            skewX,
            skewY,
            filter,
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
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
  );
}

// Gesture-based physics
export function GesturePhysics() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [dragCount, setDragCount] = useState(0);

  return (
    <div className="space-y-6">
      <div className="text-center text-white/70">
        <p>Drag the elements around to see physics in action</p>
        <p>Total drags: {dragCount}</p>
      </div>

      <div
        className="relative h-96 overflow-hidden rounded-lg border border-white/10 bg-surface/20"
        ref={constraintsRef}
      >
        {/* Bouncy ball */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(239, 68, 68, 0.5)',
              '0 0 20px rgba(239, 68, 68, 0.8)',
              '0 0 10px rgba(239, 68, 68, 0.5)',
            ],
          }}
          className="absolute top-4 left-4 h-12 w-12 cursor-grab rounded-full bg-red-500 active:cursor-grabbing"
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.7}
          dragMomentum={false}
          onDragStart={() => setDragCount((prev) => prev + 1)}
          transition={{
            boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
            type: 'spring',
            stiffness: 600,
            damping: 20,
          }}
          whileDrag={{ scale: 1.2 }}
        />

        {/* Magnetic element */}
        <motion.div
          className="absolute top-4 right-4 h-16 w-16 cursor-grab rounded-lg bg-blue-500 active:cursor-grabbing"
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          dragMomentum={true}
          onDragStart={() => setDragCount((prev) => prev + 1)}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
          whileDrag={{
            scale: 1.1,
            rotate: 45,
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
          }}
        />

        {/* Elastic square */}
        <motion.div
          className="absolute bottom-4 left-4 h-14 w-14 cursor-grab rounded bg-green-500 active:cursor-grabbing"
          drag
          dragConstraints={constraintsRef}
          dragElastic={1}
          dragMomentum={false}
          onDragStart={() => setDragCount((prev) => prev + 1)}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          whileDrag={{
            scale: [1, 1.3, 1],
            borderRadius: ['0%', '50%', '0%'],
          }}
        />

        {/* Pendulum effect */}
        <motion.div
          className="absolute right-4 bottom-4 h-12 w-12 cursor-grab rounded-full bg-purple-500 active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          dragElastic={0.3}
          onDragStart={() => setDragCount((prev) => prev + 1)}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          whileDrag={{
            rotate: 15,
            scale: 1.1,
          }}
        />
      </div>
    </div>
  );
}

// Real-time physics simulation
export function PhysicsSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [gravity, setGravity] = useState(0.5);
  const [bounce, setBounce] = useState(0.8);

  const ballY = useMotionValue(0);
  const ballVelocity = useMotionValue(0);

  useAnimationFrame(() => {
    if (!isRunning) {
      return;
    }

    const currentY = ballY.get();
    const currentVelocity = ballVelocity.get();

    // Apply gravity
    const newVelocity = currentVelocity + gravity;
    const newY = currentY + newVelocity;

    // Bounce off bottom
    if (newY > 300) {
      ballY.set(300);
      ballVelocity.set(-newVelocity * bounce);
    } else {
      ballY.set(newY);
      ballVelocity.set(newVelocity);
    }
  });

  const startSimulation = () => {
    setIsRunning(true);
    ballY.set(0);
    ballVelocity.set(0);
  };

  const stopSimulation = () => {
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <motion.button
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
          onClick={startSimulation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start
        </motion.button>
        <motion.button
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
          onClick={stopSimulation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Stop
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white" htmlFor="gravity-input">
            Gravity: {gravity.toFixed(2)}
          </label>
          <input
            className="w-full"
            id="gravity-input"
            max="2"
            min="0.1"
            onChange={(e) => setGravity(Number.parseFloat(e.target.value))}
            step="0.1"
            type="range"
            value={gravity}
          />
        </div>
        <div>
          <label className="text-sm text-white" htmlFor="bounce-input">
            Bounce: {bounce.toFixed(2)}
          </label>
          <input
            className="w-full"
            id="bounce-input"
            max="1"
            min="0.1"
            onChange={(e) => setBounce(Number.parseFloat(e.target.value))}
            step="0.1"
            type="range"
            value={bounce}
          />
        </div>
      </div>

      <div className="relative h-80 overflow-hidden rounded-lg border border-white/10 bg-surface/20">
        <motion.div
          className="-translate-x-1/2 absolute left-1/2 h-8 w-8 rounded-full bg-primary"
          style={{ y: ballY }}
        />

        <div className="absolute bottom-4 left-4 text-sm text-white/70">
          <p>Y Position: {ballY.get().toFixed(0)}</p>
          <p>Velocity: {ballVelocity.get().toFixed(2)}</p>
          <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
        </div>
      </div>
    </div>
  );
}
