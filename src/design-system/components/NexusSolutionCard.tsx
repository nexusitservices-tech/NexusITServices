import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NexusCard } from './NexusCard';

export interface NexusSolutionCardProps {
  category: string;             // e.g. "Cloud & Data Governance"
  title: string;                // e.g. "UAE Sovereign Cloud Architecture"
  highlightMetric: string;      // e.g. "100% In-Country Data Residency"
  summary: string;              // Concrete architectural prose
  outcomes: { label: string; value: string }[];
  tags: string[];               // e.g. ["DIFC Compliant", "Multi-Region", "Zero-Trust"]
  onSelect?: () => void;
  dark?: boolean;
  className?: string;
}

export const NexusSolutionCard: React.FC<NexusSolutionCardProps> = ({
  category,
  title,
  highlightMetric,
  summary,
  outcomes,
  tags,
  onSelect,
  dark = false,
  className = ''
}) => {
  return (
    <NexusCard
      surface={dark ? 'deep' : 'white'}
      padding="lg"
      hoverable
      className={`group flex flex-col justify-between h-full text-left nexus-corner-bracket ${className}`}
    >
      <div>
        {/* Category Eyebrow & Top Outcome Metric */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DCE6F0]/70 dark:border-white/10 gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1677FF] dark:text-[#39B9FF]">
            {category}
          </span>
          <span className="text-xs font-medium text-[#07142F] dark:text-slate-300 font-mono tabular-nums">
            {highlightMetric}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-[#07142F] dark:text-white mb-3 group-hover:text-[#1677FF] dark:group-hover:text-[#39B9FF] transition-colors">
          {title}
        </h3>

        {/* Summary */}
        <p className="text-sm leading-relaxed text-[#66748B] dark:text-[#94A3B8] mb-6">
          {summary}
        </p>

        {/* Measured Outcomes Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded bg-[#F5F8FC] dark:bg-[#07142F] border border-[#DCE6F0]/80 dark:border-white/10 mb-6">
          {outcomes.map((item, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-[#66748B] dark:text-[#94A3B8] tracking-wider">
                {item.label}
              </span>
              <span className="text-sm font-bold text-[#07142F] dark:text-white font-mono tabular-nums mt-0.5">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Technical Tags — Hairline borders, no puffy pill candy */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-0.5 rounded border border-[#DCE6F0] dark:border-white/15 text-[#66748B] dark:text-slate-300 bg-white/50 dark:bg-transparent font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Trigger */}
      <div className="pt-4 border-t border-[#DCE6F0]/70 dark:border-white/10 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#07142F] dark:text-white">
          Architecture & Implementation
        </span>
        <button
          type="button"
          onClick={onSelect}
          className="w-8 h-8 rounded-full border border-[#DCE6F0] dark:border-white/20 flex items-center justify-center text-[#07142F] dark:text-white group-hover:border-[#1677FF] group-hover:bg-[#1677FF] group-hover:text-white transition-all cursor-pointer"
          aria-label={`View solution details for ${title}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </NexusCard>
  );
};
