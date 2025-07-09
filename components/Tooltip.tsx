import {
  autoUpdate,
  flip,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: Placement;
  offset?: number;
  delay?: number;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  placement = 'top',
  offset: offsetValue = 8,
  delay = 300,
  className = '',
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(offsetValue), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
  });

  // Debug logging
  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen]);

  const hover = useHover(context, {
    delay: { open: delay, close: 100 },
  });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
    role,
  ]);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={`inline-block ${className}`}
      >
        {children}
      </div>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div
                ref={refs.setFloating}
                style={{
                  ...floatingStyles,
                  position: 'fixed',
                }}
                {...getFloatingProps()}
                className="pointer-events-none z-[9999]"
              >
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-xs rounded-lg border border-white/20 bg-gray-900/95 px-3 py-2 text-sm text-white shadow-xl backdrop-blur-sm"
                  exit={{ opacity: 0, scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {content}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
