import React from 'react';

/**
 * NexusBadge & NexusTag Primitives
 * Compliant with Anti-Slop Zero-Pill Rules:
 * - Never garish candy pills
 * - Architectural hairline borders or clean unboxed metadata
 */

export type NexusBadgeVariant = 
  | 'neutral'   // #07142F text, #DCE6F0 border, #F5F8FC bg
  | 'electric'  // #1677FF text, electric border, light blue bg
  | 'cyan'      // #07142F text, #39B9FF border, subtle cyan tint
  | 'dark'      // white text, dark navy bg, subtle hairline
  | 'status';   // dot indicator + label (operational, active, in-progress)

export interface NexusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: NexusBadgeVariant;
  statusDot?: 'success' | 'warning' | 'info' | 'neutral';
  children: React.ReactNode;
}

export const NexusBadge: React.FC<NexusBadgeProps> = ({
  variant = 'neutral',
  statusDot,
  children,
  className = '',
  ...props
}) => {
  const variantStyles: Record<NexusBadgeVariant, string> = {
    neutral: 'bg-[#F5F8FC] text-[#07142F] border border-[#DCE6F0]',
    electric: 'bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/25',
    cyan: 'bg-[#39B9FF]/10 text-[#07142F] border border-[#39B9FF]/30',
    dark: 'bg-[#0B2144] text-white border border-[rgba(220,230,240,0.15)]',
    status: 'bg-white text-[#07142F] border border-[#DCE6F0]'
  };

  const statusDotColors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    info: 'bg-[#1677FF]',
    neutral: 'bg-[#66748B]'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium tracking-tight whitespace-nowrap ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {statusDot && (
        <span 
          className={`w-1.5 h-1.5 rounded-full ${statusDotColors[statusDot]} shrink-0`} 
          aria-hidden="true" 
        />
      )}
      <span>{children}</span>
    </span>
  );
};

/**
 * Clean Unboxed Metadata Item
 * Uses subtle typographical separators (`·`, `/`) instead of pill boxes
 */
export interface NexusMetadataProps {
  items: (string | React.ReactNode)[];
  separator?: string;
  className?: string;
  dark?: boolean;
}

export const NexusMetadata: React.FC<NexusMetadataProps> = ({
  items,
  separator = '·',
  className = '',
  dark = false
}) => {
  return (
    <div className={`flex items-center flex-wrap gap-2 text-xs font-medium ${dark ? 'text-[#94A3B8]' : 'text-[#66748B]'} ${className}`}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span>{item}</span>
          {idx < items.length - 1 && (
            <span className="opacity-40 select-none" aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/**
 * Interactive Filter Tag / Segment Button
 * Functional button for category filtering
 */
export interface NexusFilterTagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
  dark?: boolean;
}

export const NexusFilterTag: React.FC<NexusFilterTagProps> = ({
  active = false,
  count,
  dark = false,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
        active
          ? dark
            ? 'bg-[#1677FF] text-white shadow-sm'
            : 'bg-[#07142F] text-white shadow-sm'
          : dark
          ? 'text-slate-300 hover:text-white bg-[#0B2144]/60 border border-white/10 hover:border-white/25'
          : 'text-[#66748B] hover:text-[#07142F] bg-white border border-[#DCE6F0] hover:border-[#1677FF]'
      } ${className}`}
      {...props}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${active ? 'bg-white/20 text-white' : 'text-[#66748B]'}`}>
          {count}
        </span>
      )}
    </button>
  );
};
