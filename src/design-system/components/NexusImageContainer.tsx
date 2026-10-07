import React, { useState } from 'react';
import { Server, Eye } from 'lucide-react';

export type NexusImageAspectRatio = '16:9' | '4:3' | '1:1' | '21:9';

export interface NexusImageContainerProps {
  src?: string;
  alt: string;
  aspectRatio?: NexusImageAspectRatio;
  caption?: string;
  technicalLabel?: string;
  hasCornerBrackets?: boolean;
  hasScrim?: boolean;
  dark?: boolean;
  className?: string;
}

export const NexusImageContainer: React.FC<NexusImageContainerProps> = ({
  src,
  alt,
  aspectRatio = '16:9',
  caption,
  technicalLabel,
  hasCornerBrackets = true,
  hasScrim = false,
  dark = false,
  className = ''
}) => {
  const [hasError, setHasError] = useState(!src);

  const aspectClasses: Record<NexusImageAspectRatio, string> = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '21:9': 'aspect-[21/9]'
  };

  return (
    <figure className={`flex flex-col ${className}`}>
      <div
        className={`relative w-full rounded-lg overflow-hidden border ${
          dark ? 'border-white/10 bg-[#07142F]' : 'border-[#DCE6F0] bg-[#F5F8FC]'
        } shadow-[0_2px_12px_rgba(7,20,47,0.04)] ${aspectClasses[aspectRatio]} ${
          hasCornerBrackets ? 'nexus-corner-bracket' : ''
        }`}
      >
        {/* Technical Label Tag */}
        {technicalLabel && (
          <div className="absolute top-2.5 left-2.5 z-20 px-2 py-0.5 rounded bg-[#07142F]/80 backdrop-blur-sm border border-white/10 text-[10px] font-mono uppercase tracking-wider text-white">
            {technicalLabel}
          </div>
        )}

        {!hasError && src ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          /* Zero-Broken-Image Resilient Architectural Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center nexus-grid-dark bg-[#07142F]">
            <div className="w-12 h-12 rounded border border-white/15 bg-[#0B2144] flex items-center justify-center text-[#39B9FF] mb-3">
              <Server className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-white tracking-wide mb-1">
              {alt || 'NEXUS Architectural Infrastructure'}
            </span>
            <span className="text-[11px] text-[#94A3B8] font-mono">
              Enterprise Technology System
            </span>
          </div>
        )}

        {/* Optical Scrim for High-Contrast Text Overlay */}
        {hasScrim && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#07142F]/90 via-[#07142F]/30 to-transparent pointer-events-none" />
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 text-xs text-[#66748B] flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[#1677FF]" />
          <span>{caption}</span>
        </figcaption>
      )}
    </figure>
  );
};
