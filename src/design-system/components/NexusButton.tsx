import React from 'react';
import { Loader2 } from 'lucide-react';

export type NexusButtonVariant = 
  | 'primary'      // Electric Blue #1677FF — Main conversion action
  | 'secondary'    // Deep Blue #0B2144 — Secondary authoritative action
  | 'outline'      // Technical Hairline #DCE6F0 border, #07142F text
  | 'darkOutline'  // Hairline border on dark navy surfaces
  | 'ghost'        // Muted text with subtle hover
  | 'cyan';        // High-contrast cyan accent #39B9FF

export type NexusButtonSize = 'sm' | 'md' | 'lg';

export interface NexusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NexusButtonVariant;
  size?: NexusButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const NexusButton: React.FC<NexusButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  // Base 8px spatial discipline & single-line typography
  const baseClasses = 
    'inline-flex items-center justify-center font-semibold rounded-md ' +
    'whitespace-nowrap transition-colors duration-200 focus-visible:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] cursor-pointer';

  const sizeClasses: Record<NexusButtonSize, string> = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  };

  const variantClasses: Record<NexusButtonVariant, string> = {
    primary: 
      'bg-[#1677FF] hover:bg-[#0B2144] text-white shadow-sm hover:shadow',
    secondary: 
      'bg-[#0B2144] hover:bg-[#07142F] text-white shadow-sm',
    outline: 
      'border border-[#DCE6F0] bg-white text-[#07142F] hover:bg-[#F5F8FC] hover:border-[#1677FF] hover:text-[#1677FF]',
    darkOutline: 
      'border border-[rgba(220,230,240,0.2)] bg-transparent text-white hover:bg-[#0B2144] hover:border-[#39B9FF] hover:text-[#39B9FF]',
    ghost: 
      'bg-transparent text-[#07142F] hover:bg-[#F5F8FC] hover:text-[#1677FF]',
    cyan: 
      'bg-[#39B9FF] hover:bg-[#1677FF] text-[#07142F] hover:text-white font-semibold'
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      
      <span>{children}</span>

      {!isLoading && rightIcon && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </button>
  );
};
