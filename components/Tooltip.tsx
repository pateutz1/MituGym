import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
} from '@floating-ui/react'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: Placement
  offset?: number
  delay?: number
  className?: string
}

export default function Tooltip({ 
  children, 
  content, 
  placement = 'top',
  offset: offsetValue = 8,
  delay = 300,
  className = ''
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(offsetValue),
      flip(),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
  })

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('Tooltip positioning:', floatingStyles)
    }
  }, [isOpen, floatingStyles])

  const hover = useHover(context, { 
    delay: { open: delay, close: 100 },
  })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ])

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`inline-block ${className}`}
      >
        {children}
      </div>
      
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                position: 'fixed',
              }}
              {...getFloatingProps()}
              className="z-[9999] pointer-events-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-sm text-white shadow-xl max-w-xs"
              >
                {content}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
} 