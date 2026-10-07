import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export function Skeleton({ className, rounded = 'md', ...props }: SkeletonProps) {
  const roundedClass = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }[rounded];

  return (
    <div
      className={cn("skeleton-shimmer", roundedClass, className)}
      {...props}
    />
  );
}

/**
 * High-end Card Skeleton for services, solutions, and features
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 rounded-3xl border border-slate-200/90 bg-white/90 shadow-sm space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Skeleton className="w-12 h-12" rounded="2xl" />
        <Skeleton className="w-20 h-6" rounded="full" />
      </div>
      <div className="space-y-2 pt-2">
        <Skeleton className="w-3/4 h-6" rounded="md" />
        <Skeleton className="w-full h-4" rounded="md" />
        <Skeleton className="w-5/6 h-4" rounded="md" />
      </div>
      <div className="pt-4 flex items-center justify-between border-t border-slate-100">
        <Skeleton className="w-24 h-4" rounded="md" />
        <Skeleton className="w-8 h-8" rounded="full" />
      </div>
    </div>
  );
}

/**
 * Metric stats skeleton
 */
export function SkeletonMetrics({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 space-y-3 shadow-xs">
          <Skeleton className="w-10 h-10" rounded="xl" />
          <Skeleton className="w-24 h-8" rounded="md" />
          <Skeleton className="w-32 h-4" rounded="md" />
        </div>
      ))}
    </div>
  );
}

/**
 * Hero section skeleton
 */
export function SkeletonHero() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center space-y-6">
      <Skeleton className="w-48 h-8" rounded="full" />
      <Skeleton className="w-4/5 max-w-2xl h-16 sm:h-20" rounded="2xl" />
      <Skeleton className="w-full max-w-xl h-6" rounded="md" />
      <Skeleton className="w-2/3 max-w-md h-6" rounded="md" />
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Skeleton className="w-44 h-12" rounded="full" />
        <Skeleton className="w-36 h-12" rounded="full" />
      </div>
    </div>
  );
}

/**
 * Morphy Skeleton Wrapper: Smoothly morphs from skeleton placeholder to loaded children
 */
export interface SkeletonMorphWrapperProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SkeletonMorphWrapper({
  isLoading,
  skeleton,
  children,
  className = '',
}: SkeletonMorphWrapperProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.99 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)', scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {skeleton}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 10, scale: 0.98 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(6px)', y: -10 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 26,
              mass: 0.8,
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
