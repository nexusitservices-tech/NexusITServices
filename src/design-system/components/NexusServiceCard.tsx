import React from 'react';
import { ArrowRight } from 'lucide-react';
import { NexusCard } from './NexusCard';

export interface NexusServiceCardProps {
  index: string;             // e.g. "01", "02"
  title: string;             // e.g. "IT Infrastructure & Security"
  description: string;       // Concise business outcome prose
  icon: React.ReactNode;     // Lucide icon
  capabilities: string[];    // 3-5 core capability bullet points
  actionLabel?: string;      // e.g. "Explore Capability"
  onAction?: () => void;
  dark?: boolean;
  className?: string;
}

export const NexusServiceCard: React.FC<NexusServiceCardProps> = ({
  index,
  title,
  description,
  icon,
  capabilities,
  actionLabel = 'Explore Capability',
  onAction,
  dark = false,
  className = ''
}) => {
  return (
    <NexusCard
      surface={dark ? 'deep' : 'white'}
      padding="lg"
      hoverable
      className={`group flex flex-col justify-between h-full text-left ${className}`}
    >
      <div>
        {/* Top Header Row: Editorial Index & Technical Icon Frame */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#DCE6F0]/60 dark:border-white/10">
          <span className="font-mono text-xs font-semibold tracking-wider text-[#1677FF] dark:text-[#39B9FF]">
            [{index}]
          </span>
          <div className="w-10 h-10 rounded flex items-center justify-center border border-[#DCE6F0] dark:border-white/15 bg-[#F5F8FC] dark:bg-[#07142F] text-[#1677FF] dark:text-[#39B9FF] transition-colors group-hover:border-[#1677FF] group-hover:bg-[#1677FF] group-hover:text-white">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold tracking-tight text-[#07142F] dark:text-white mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#66748B] dark:text-[#94A3B8] mb-6">
          {description}
        </p>

        {/* Capabilities List — Zero-Pill Discipline: Clean unboxed list */}
        <div className="space-y-2 mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66748B] dark:text-[#94A3B8] block mb-2">
            Key Scope & Deliverables
          </span>
          <ul className="space-y-1.5 text-xs text-[#07142F] dark:text-slate-200">
            {capabilities.map((cap, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1677FF] dark:bg-[#39B9FF] mt-1.5 shrink-0" aria-hidden="true" />
                <span className="leading-snug">{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="pt-4 border-t border-[#DCE6F0]/60 dark:border-white/10">
        <button
          type="button"
          onClick={onAction}
          className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#07142F] dark:text-white group-hover:text-[#1677FF] dark:group-hover:text-[#39B9FF] transition-colors cursor-pointer"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#1677FF] dark:text-[#39B9FF]" />
        </button>
      </div>
    </NexusCard>
  );
};
