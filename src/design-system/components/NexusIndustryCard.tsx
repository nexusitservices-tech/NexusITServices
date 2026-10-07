import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { NexusCard } from './NexusCard';

export interface NexusIndustryCardProps {
  sector: string;                // e.g. "Financial Services & FinTech"
  regulatoryStandard: string;    // e.g. "DIFC / ADGM / CBUAE Compliant"
  description: string;           // Sector business context
  highlights: string[];          // Key sector solutions
  icon: React.ReactNode;
  onExplore?: () => void;
  dark?: boolean;
  className?: string;
}

export const NexusIndustryCard: React.FC<NexusIndustryCardProps> = ({
  sector,
  regulatoryStandard,
  description,
  highlights,
  icon,
  onExplore,
  dark = false,
  className = ''
}) => {
  return (
    <NexusCard
      surface={dark ? 'dark' : 'white'}
      padding="lg"
      hoverable
      className={`group flex flex-col justify-between h-full text-left ${className}`}
    >
      <div>
        {/* Header: Sector Icon & Regulatory Assurance Marker */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="w-12 h-12 rounded flex items-center justify-center border border-[#DCE6F0] dark:border-white/15 bg-[#F5F8FC] dark:bg-[#0B2144] text-[#1677FF] dark:text-[#39B9FF] group-hover:scale-105 transition-transform">
            {icon}
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#DCE6F0] dark:border-white/10 bg-[#F5F8FC] dark:bg-[#0B2144] text-[11px] text-[#07142F] dark:text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1677FF] dark:text-[#39B9FF] shrink-0" />
            <span className="font-medium whitespace-nowrap">{regulatoryStandard}</span>
          </div>
        </div>

        {/* Sector Title */}
        <h3 className="text-xl font-bold tracking-tight text-[#07142F] dark:text-white mb-2.5">
          {sector}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#66748B] dark:text-[#94A3B8] mb-6">
          {description}
        </p>

        {/* Sector Highlights */}
        <div className="space-y-2 mb-6 pt-4 border-t border-[#DCE6F0]/60 dark:border-white/10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#66748B] dark:text-[#94A3B8] block">
            Specialized Capabilities
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#07142F] dark:text-slate-200">
                <span className="w-1 h-1 rounded-full bg-[#1677FF] dark:bg-[#39B9FF]" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#DCE6F0]/70 dark:border-white/10">
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#1677FF] dark:text-[#39B9FF] group-hover:text-[#0B2144] dark:group-hover:text-white transition-colors cursor-pointer"
        >
          <span>Sector Solutions</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </NexusCard>
  );
};
