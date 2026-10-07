import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NexusButton } from './NexusButton';

export interface NexusNavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface NexusNavbarProps {
  brandName?: string;
  tagline?: string;
  items?: NexusNavItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  onRequestConsultation?: () => void;
  dark?: boolean;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NexusNavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const NexusNavbar: React.FC<NexusNavbarProps> = ({
  brandName = 'NEXUS',
  items = DEFAULT_NAV_ITEMS,
  activeHref = '/',
  onNavigate,
  onRequestConsultation,
  dark = false,
  className = ''
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleItemClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
        dark
          ? 'bg-[#07142F]/90 backdrop-blur-md border-[rgba(220,230,240,0.12)] text-white'
          : 'bg-white/95 backdrop-blur-md border-[#DCE6F0] text-[#07142F]'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element wordmark, no attached location chips) */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            onClick={(e) => handleItemClick('/', e)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-[#07142F] dark:bg-white text-white dark:text-[#07142F] flex items-center justify-center font-bold text-sm tracking-wider border border-[#DCE6F0] dark:border-white/20">
              N
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight leading-none text-[#07142F] dark:text-white">
                {brandName}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#1677FF] dark:text-[#39B9FF] leading-tight">
                IT SERVICES
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Clean Text Navigation Links (4-6 links, single-line) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleItemClick(item.href, e)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-[#1677FF] dark:text-[#39B9FF] font-semibold'
                    : dark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-[#66748B] hover:text-[#07142F]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1677FF] dark:bg-[#39B9FF]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <NexusButton
            variant="primary"
            size="sm"
            onClick={onRequestConsultation}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Consult Architect
          </NexusButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-[#07142F] dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#DCE6F0] dark:border-white/10 px-4 pt-3 pb-6 bg-white dark:bg-[#07142F]">
          <nav className="flex flex-col space-y-2 mb-4">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleItemClick(item.href, e)}
                className="px-3 py-2 rounded text-sm font-medium text-[#07142F] dark:text-white hover:bg-[#F5F8FC] dark:hover:bg-[#0B2144]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#DCE6F0] dark:border-white/10 flex flex-col gap-2">
            <NexusButton
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestConsultation?.();
              }}
            >
              Consult Architect
            </NexusButton>
          </div>
        </div>
      )}
    </header>
  );
};
