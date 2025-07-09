import {
  autoUpdate,
  FloatingPortal,
  flip,
  offset,
  type Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { useState } from 'react';

interface UseFloatingTooltipProps {
  placement?: Placement;
  offset?: number;
  delay?: number;
}

export function useFloatingTooltip({
  placement = 'top',
  offset: offsetValue = 8,
  delay = 300,
}: UseFloatingTooltipProps = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [
      offset(offsetValue),
      flip({
        fallbackPlacements: ['bottom', 'top', 'left', 'right'],
      }),
      shift({ padding: 16 }),
    ],
    whileElementsMounted: autoUpdate,
    strategy: 'fixed',
  });

  const hover = useHover(context, {
    delay: { open: delay, close: 100 },
    restMs: 100,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return {
    isOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
    FloatingPortal,
  };
}
