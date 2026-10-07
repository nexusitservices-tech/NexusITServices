import React from 'react';

export type NexusCardSurface = 'white' | 'light' | 'dark' | 'deep' | 'glassLight' | 'glassDark';
export type NexusCardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface NexusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: NexusCardSurface;
  padding?: NexusCardPadding;
  hoverable?: boolean;
  hasCornerBrackets?: boolean;
  hasTopAccent?: boolean;
  accentColor?: 'electric' | 'cyan' | 'navy';
}

export const NexusCard: React.FC<NexusCardProps> = ({
  children,
  surface = 'white',
  padding = 'lg',
  hoverable = false,
  hasCornerBrackets = false,
  hasTopAccent = false,
  accentColor = 'electric',
  className = '',
  ...props
}) => {
  const surfaceClasses: Record<NexusCardSurface, string> = {
    white: 'bg-white text-[#07142F] border border-[#DCE6F0] shadow-[0_2px_12px_rgba(7,20,47,0.03)]',
    light: 'bg-[#F5F8FC] text-[#07142F] border border-[#DCE6F0]',
    dark: 'bg-[#07142F] text-white border border-[rgba(220,230,240,0.12)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]',
    deep: 'bg-[#0B2144] text-white border border-[rgba(220,230,240,0.15)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]',
    glassLight: 'nexus-glass-light text-[#07142F]',
    glassDark: 'nexus-glass-dark text-white'
  };

  const paddingClasses: Record<NexusCardPadding, string> = {
    none: 'p-0',
    sm: 'p-4',      // 16px
    md: 'p-6',      // 24px
    lg: 'p-6 sm:p-8', // 24px mobile, 32px desktop
    xl: 'p-8 sm:p-10' // 32px mobile, 40px desktop
  };

  const hoverClasses = hoverable 
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(7,20,47,0.08)] hover:border-[#1677FF]/40' 
    : '';

  const accentColorMap = {
    electric: 'bg-[#1677FF]',
    cyan: 'bg-[#39B9FF]',
    navy: 'bg-[#07142F]'
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden ${surfaceClasses[surface]} ${paddingClasses[padding]} ${hoverClasses} ${hasCornerBrackets ? 'nexus-corner-bracket' : ''} ${className}`}
      {...props}
    >
      {hasTopAccent && (
        <div className={`absolute top-0 left-0 right-0 h-1 ${accentColorMap[accentColor]}`} />
      )}
      {children}
    </div>
  );
};
