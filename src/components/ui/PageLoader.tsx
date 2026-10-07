import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface InitialPageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  minDuration?: number;
}

/**
 * High-Performance Mobile-Optimized Blurry White Fluid PageLoader:
 * - Fluid pearlescent white backdrop with hardware-accelerated transforms
 * - Dynamic adaptive timing: ~380ms for mobile, ~680ms for desktop
 * - Tap-to-dismiss support for instant mobile responsiveness
 * - Clean borderless brand logo with smooth fade in and fade out
 */
export function InitialPageLoader({
  isLoading,
  onComplete,
  minDuration,
}: InitialPageLoaderProps) {
  const [hasCompleted, setHasCompleted] = useState(false);

  const isMobile = useMemo(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  }, []);

  const effectiveDuration = minDuration !== undefined ? minDuration : (isMobile ? 380 : 680);

  const handleFinish = useCallback(() => {
    setHasCompleted(true);
    if (onComplete) {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    if (!isLoading) {
      setHasCompleted(true);
      return;
    }

    setHasCompleted(false);

    const timer = setTimeout(() => {
      handleFinish();
    }, effectiveDuration);

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, effectiveDuration, handleFinish]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && !hasCompleted && (
        <motion.div
          key="nexus-fluid-white-loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Nexus IT Services"
          onClick={handleFinish}
          onTouchStart={handleFinish}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: 'blur(8px)',
            transition: { duration: isMobile ? 0.25 : 0.38, ease: [0.16, 1, 0.3, 1] } 
          }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] flex items-center justify-center select-none px-6 overflow-hidden cursor-pointer will-change-[opacity,filter]"
        >
          {/* Pure White Refined Canvas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Solid White Backdrop */}
            <div className="absolute inset-0 bg-white" />

            {/* Ultra-subtle depth layer (nearly invisible white-on-white) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_0%,rgba(248,250,252,0.5)_100%)]" />
          </div>

          {/* Clean Brand Logo with Refined Premium Fade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: 0,
              transition: { 
                duration: isMobile ? 0.4 : 0.55, 
                ease: [0.22, 1, 0.36, 1] 
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 1.02,
              y: -4,
              transition: { 
                duration: isMobile ? 0.25 : 0.35, 
                ease: [0.22, 1, 0.36, 1] 
              } 
            }}
            className="relative z-10 flex items-center justify-center pointer-events-none will-change-[opacity,transform]"
          >
            <img
              src="/logo.png"
              alt="Nexus IT Services"
              width={288}
              height={112}
              className="w-44 sm:w-60 md:w-72 h-auto max-h-24 sm:max-h-28 object-contain drop-shadow-[0_10px_25px_rgba(0,70,175,0.08)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * RouteProgressBar kept as null stub for compatibility
 */
export function RouteProgressBar() {
  return null;
}

export default function PageLoader({
  isLoading,
  onComplete,
  minDuration,
}: InitialPageLoaderProps) {
  return (
    <InitialPageLoader 
      isLoading={isLoading} 
      onComplete={onComplete}
      minDuration={minDuration}
    />
  );
}
