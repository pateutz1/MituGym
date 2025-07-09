import type React from 'react';
import { cn } from '@/libs/utils';

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  shimmerColor?: string;
  shimmerDuration?: number;
  shimmerWidth?: number;
}

export default function ShinyButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  shimmerColor = 'rgba(255, 255, 255, 0.8)',
  shimmerDuration = 2.5,
  shimmerWidth = 100,
  ...props
}: ShinyButtonProps) {
  const baseClasses = [
    'relative',
    'overflow-hidden',
    'font-semibold',
    'text-center',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'transform',
    'hover:scale-105',
    'active:scale-95',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-gray-900',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:hover:scale-100',
    'group',
  ];

  const variantClasses = {
    default: [
      'bg-gray-800',
      'text-white',
      'border-2',
      'border-gray-700',
      'hover:bg-gray-700',
      'focus:ring-gray-500',
    ],
    primary: [
      'bg-gradient-to-r',
      'from-green-500',
      'to-emerald-600',
      'text-white',
      'border-2',
      'border-green-500',
      'hover:from-green-600',
      'hover:to-emerald-700',
      'focus:ring-green-500',
      'shadow-lg',
      'shadow-green-500/25',
    ],
    secondary: [
      'bg-gradient-to-r',
      'from-blue-500',
      'to-purple-600',
      'text-white',
      'border-2',
      'border-blue-500',
      'hover:from-blue-600',
      'hover:to-purple-700',
      'focus:ring-blue-500',
      'shadow-lg',
      'shadow-blue-500/25',
    ],
    outline: [
      'bg-transparent',
      'text-green-400',
      'border-2',
      'border-green-500',
      'hover:bg-green-500',
      'hover:text-white',
      'focus:ring-green-500',
    ],
  };

  const sizeClasses = {
    sm: ['px-4', 'py-2', 'text-sm', 'rounded-md'],
    md: ['px-6', 'py-3', 'text-base', 'rounded-lg'],
    lg: ['px-8', 'py-4', 'text-lg', 'rounded-xl'],
  };

  return (
    <button
      className={cn(
        ...baseClasses,
        ...variantClasses[variant],
        ...sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 bg-[length:200%_100%] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-shimmer group-hover:opacity-100" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
