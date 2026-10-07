import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';
import { NEXUS_BRAND } from '../tokens';

export interface NexusFooterProps {
  dark?: boolean;
  className?: string;
}

export const NexusFooter: React.FC<NexusFooterProps> = ({
  dark = true,
  className = ''
}) => {
  return (
    <footer
      className={`border-t text-left transition-colors duration-200 ${
        dark
          ? 'bg-[#07142F] text-slate-300 border-[rgba(220,230,240,0.12)]'
          : 'bg-white text-[#66748B] border-[#DCE6F0]'
      } ${className}`}
    >
      {/* Upper Architectural Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1: Brand & UAE Corporate Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#1677FF] text-white flex items-center justify-center font-bold text-sm">
                N
              </div>
              <span className={`text-xl font-bold tracking-tight ${dark ? 'text-white' : 'text-[#07142F]'}`}>
                {NEXUS_BRAND.name}
              </span>
            </div>

            <p className="text-sm font-semibold text-[#1677FF] dark:text-[#39B9FF]">
              “{NEXUS_BRAND.tagline}”
            </p>

            <p className="text-xs leading-relaxed max-w-sm">
              UAE-based enterprise technology and business solutions company providing strategic IT infrastructure, custom software engineering, AI automation, and cloud management across Dubai, Abu Dhabi, and the GCC.
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1677FF] shrink-0 mt-0.5" />
                <span>Radiance ONE Business Center 9th Floor, Rigga Al Buteen, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1677FF] shrink-0" />
                <span>+971 52 6367221</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1677FF] shrink-0" />
                <span>nexus.itservices06@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Service Pillars */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${dark ? 'text-white' : 'text-[#07142F]'}`}>
              Service Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/services" className="hover:text-[#1677FF] transition-colors">IT Infrastructure & Support</a></li>
              <li><a href="/services" className="hover:text-[#1677FF] transition-colors">Custom Software & Web</a></li>
              <li><a href="/services" className="hover:text-[#1677FF] transition-colors">AI & Workflow Automation</a></li>
              <li><a href="/services" className="hover:text-[#1677FF] transition-colors">Cloud & Cyber Defense</a></li>
              <li><a href="/services" className="hover:text-[#1677FF] transition-colors">Multimedia & Digital Assets</a></li>
              <li><a href="/services" className="hover:text-[#1677FF] transition-colors">Strategic Tech Consulting</a></li>
            </ul>
          </div>

          {/* Column 3: UAE Industry Verticals */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${dark ? 'text-white' : 'text-[#07142F]'}`}>
              UAE Industries
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/industries" className="hover:text-[#1677FF] transition-colors">Banking & FinTech (DIFC)</a></li>
              <li><a href="/industries" className="hover:text-[#1677FF] transition-colors">Government & Semi-Gov</a></li>
              <li><a href="/industries" className="hover:text-[#1677FF] transition-colors">Free Zones & Logistics</a></li>
              <li><a href="/industries" className="hover:text-[#1677FF] transition-colors">Healthcare & Diagnostics</a></li>
              <li><a href="/industries" className="hover:text-[#1677FF] transition-colors">Real Estate & Development</a></li>
              <li><a href="/industries" className="hover:text-[#1677FF] transition-colors">Hospitality & Retail</a></li>
            </ul>
          </div>

          {/* Column 4: Governance & Portal */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${dark ? 'text-white' : 'text-[#07142F]'}`}>
              Client & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/estimator" className="hover:text-[#1677FF] transition-colors">Project Budget Estimator</a></li>
              <li><a href="/case-studies" className="hover:text-[#1677FF] transition-colors">Case Studies & Impact</a></li>
              <li><a href="/privacy" className="hover:text-[#1677FF] transition-colors">Privacy & Data Governance</a></li>
              <li><a href="/terms" className="hover:text-[#1677FF] transition-colors">Terms of Enterprise SLA</a></li>
              <li><a href="/contact" className="hover:text-[#1677FF] transition-colors">Book Dubai Meeting</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Compliance Hairline Bar */}
      <div className={`border-t py-6 text-xs ${
        dark ? 'border-white/10 text-slate-400' : 'border-[#DCE6F0] text-[#66748B]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1677FF]" />
            <span>© {new Date().getFullYear()} NEXUS IT Services LLC. Registered in Dubai, UAE. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>ISO 27001 & UAE Data Residency Aligned</span>
            <span>·</span>
            <span>GCC Multi-Region Operations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
