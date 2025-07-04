import React from 'react';
import { cn } from '@/libs/utils';

interface AnimatedGradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  duration?: string;
  direction?: 'left' | 'right';
}

export default function AnimatedGradientText({
  children,
  className,
  colors = ['#1e9b71', '#10b981', '#3b82f6', '#8b5cf6', '#1e9b71'], // Default MituGym green palette
  duration = '8s',
  direction = 'right',
  ...props
}: AnimatedGradientTextProps) {
  const gradientDirection = direction === 'right' ? 'to right' : 'to left';
  const gradientStops = colors.join(', ');
  
  const animationDuration = duration === '8s' ? 'animate-gradient' : '';

  return (
    <div
      className={cn(
        'relative inline-block bg-clip-text text-transparent',
        animationDuration,
        className
      )}
      style={{
        background: `linear-gradient(${gradientDirection}, ${gradientStops})`,
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...(duration !== '8s' && {
          animation: `animatedGradient ${duration} ease infinite`,
        }),
      }}
      {...props}
    >
      {children}
    </div>
  );
} 