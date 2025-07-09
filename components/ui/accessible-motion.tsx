'use client';

import type React from 'react';
import {
  type AccessibleMotionOptions,
  useReducedMotion,
} from '../../hooks/useReducedMotion';

// Component wrapper that automatically handles reduced motion
export function withAccessibleMotion<T extends object>(
  Component: React.ComponentType<T>,
  options: AccessibleMotionOptions<T> = {}
) {
  return function AccessibleMotionComponent(props: T) {
    const prefersReducedMotion = useReducedMotion();

    if (prefersReducedMotion && options.disableOnReducedMotion) {
      return options.fallbackComponent ? (
        <options.fallbackComponent {...props} />
      ) : (
        <div>Animation disabled due to accessibility preferences</div>
      );
    }

    return <Component {...props} />;
  };
}

// Alternative component-based approach for accessible motion
export function AccessibleMotionWrapper<T extends object>({
  children,
  fallbackComponent: FallbackComponent,
  disableOnReducedMotion = false,
  ...props
}: {
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<T>;
  disableOnReducedMotion?: boolean;
} & T) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion && disableOnReducedMotion) {
    return FallbackComponent ? (
      <FallbackComponent {...(props as T)} />
    ) : (
      <div>Animation disabled due to accessibility preferences</div>
    );
  }

  return <>{children}</>;
}
