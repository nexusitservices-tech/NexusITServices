import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { NexusButton } from './NexusButton';

export interface NexusCTAProps {
  variant?: 'darkNavy' | 'lightClean';
  title?: string;
  description?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  className?: string;
}

export const NexusCTA: React.FC<NexusCTAProps> = ({
  variant = 'darkNavy',
  title = 'Ready to Modernize Your Technology Operations?',
  description = 'Connect directly with NEXUS senior infrastructure and software architects in Dubai. We review your GCC technical roadmap and provide immediate, actionable clarity.',
  primaryActionLabel = 'Schedule Technical Discovery',
  secondaryActionLabel = 'Call Dubai Office',
  onPrimaryAction,
  onSecondaryAction,
  className = ''
}) => {
  const isDark = variant === 'darkNavy';

  return (
    <div
      className={`relative rounded-xl overflow-hidden text-left p-8 sm:p-12 lg:p-16 nexus-corner-bracket ${
        isDark
          ? 'bg-[#07142F] text-white border border-[rgba(220,230,240,0.12)] nexus-glow-soft'
          : 'bg-[#F5F8FC] text-[#07142F] border border-[#DCE6F0]'
      } ${className}`}
    >
      {/* Background Subtle Tech Grid */}
      <div 
        className={`absolute inset-0 pointer-events-none opacity-40 ${
          isDark ? 'nexus-grid-dark' : 'nexus-grid-light'
        }`} 
      />

      {/* Soft Blue Lighting Ambient Glow */}
      <div 
        className={`absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none blur-3xl ${
          isDark ? 'bg-[#1677FF]/15' : 'bg-[#1677FF]/8'
        }`} 
      />

      <div className="relative z-10 max-w-3xl">
        {/* Brand Tagline Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-sm bg-[#1677FF]" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#1677FF] dark:text-[#39B9FF]">
            NEXUS · Technology. Simplified. Delivered.
          </span>
        </div>

        {/* Title */}
        <h2 
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-4"
          style={{ textWrap: 'balance' }}
        >
          {title}
        </h2>

        {/* Description */}
        <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-[#66748B]'}`}>
          {description}
        </p>

        {/* Single-Line Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 mb-8">
          <NexusButton
            variant="primary"
            size="lg"
            onClick={onPrimaryAction}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {primaryActionLabel}
          </NexusButton>

          <NexusButton
            variant={isDark ? 'darkOutline' : 'outline'}
            size="lg"
            onClick={onSecondaryAction}
            leftIcon={<PhoneCall className="w-4 h-4" />}
          >
            {secondaryActionLabel}
          </NexusButton>
        </div>

        {/* Regional Footnote & Trust Markers */}
        <div className={`flex items-center flex-wrap gap-4 pt-6 border-t ${
          isDark ? 'border-white/10 text-slate-400' : 'border-[#DCE6F0] text-[#66748B]'
        } text-xs`}>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
            <span>Dubai HQ: Radiance ONE Center, Rigga Al Buteen</span>
          </div>
          <span className="hidden sm:inline">·</span>
          <span>UAE & GCC On-Site Delivery</span>
          <span className="hidden sm:inline">·</span>
          <span>Enterprise SLA Guaranteed</span>
        </div>
      </div>
    </div>
  );
};
