import React from 'react';

export interface NexusSectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  hasHairlineRule?: boolean;
  className?: string;
  actionSlot?: React.ReactNode;
}

export const NexusSectionHeader: React.FC<NexusSectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  hasHairlineRule = true,
  className = '',
  actionSlot
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-4xl'} ${className}`}>
      {/* Eyebrow Label */}
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="w-2 h-0.5 bg-[#1677FF] dark:bg-[#39B9FF]" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#1677FF] dark:text-[#39B9FF]">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Main Title */}
      <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 ${isCenter ? 'justify-center' : ''}`}>
        <h2 
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
            dark ? 'text-white' : 'text-[#07142F]'
          } leading-tight`}
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>

        {actionSlot && !isCenter && (
          <div className="shrink-0 sm:pb-1">
            {actionSlot}
          </div>
        )}
      </div>

      {/* Supporting Description */}
      {description && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${
          dark ? 'text-[#94A3B8]' : 'text-[#66748B]'
        } max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}

      {/* Technical Hairline Accent Rule */}
      {hasHairlineRule && (
        <div className={`mt-6 h-[1px] w-full ${dark ? 'bg-white/10' : 'bg-[#DCE6F0]'}`} />
      )}
    </div>
  );
};
