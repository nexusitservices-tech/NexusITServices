import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MorphBlockProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  enableHover?: boolean;
  blurEffect?: boolean;
}

/**
 * Multimillion-dollar Morphy Block:
 * Fluid spring-based in-and-out motion with layout morphing and subtle depth elevation
 */
export function MorphBlock({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  enableHover = false,
  blurEffect = false,
  ...props
}: MorphBlockProps) {
  const getOffsets = () => {
    switch (direction) {
      case 'up':
        return { y: 20, x: 0 };
      case 'down':
        return { y: -20, x: 0 };
      case 'left':
        return { y: 0, x: 20 };
      case 'right':
        return { y: 0, x: -20 };
      case 'none':
      default:
        return { y: 0, x: 0 };
    }
  };

  const { x, y } = getOffsets();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x,
        y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      whileHover={
        enableHover
          ? {
              y: -4,
              scale: 1.01,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      className={cn("relative", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parent container that orchestrates morphy staggered entrance for child cards or items
 */
export function MorphStagger({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
