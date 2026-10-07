import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, ShoppingBag, Hotel, Stethoscope, Truck, Briefcase, 
  Rocket, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, 
  ExternalLink, Sparkles, Server, Code, Bot, BarChart3, Globe
} from 'lucide-react';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';

interface IndustrySector {
  id: string;
  name: string;
  badge: string;
  icon: React.ElementType;
  tagline: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  metrics: { label: string; value: string }[];
  complianceHighlight?: string;
}

const INDUSTRY_SECTORS: IndustrySector[] = [
  {
    id: 'real-estate',
    name: 'Real Estate & PropTech',
    badge: 'Dubai & GCC Market Leader',
    icon: Building2,
    tagline: 'Custom brokerage CRMs, DLD title sync, and immersive virtual sales centers.',
    overview: 'In the high-velocity Dubai real estate market, off-the-shelf software falls short. We engineer custom property platforms with instant WhatsApp lead response, Dubai Land Department compliance, and off-plan inventory allocation.',
    challenges: [
      'Disjointed off-plan developer feeds causing duplicate lead allocation',
      'Complex DLD / RERA regulatory compliance and contract generation',
      'Need for instant bilingual (Arabic/English) WhatsApp buyer qualification',
    ],
    solutions: [
      'Multi-tenant Brokerage CRM with automated lead routing & agent commission tracking',
      'Interactive 3D masterplan unit selectors and virtual walkthroughs',
      'Real-time automated WhatsApp marketing and KYC verification flows',
    ],
    metrics: [
      { label: 'Lead Response Time', value: '< 15 sec' },
      { label: 'Gross Pipeline Tracked', value: 'AED 2.4B+' },
      { label: 'Conversion Lift', value: '+34%' },
    ],
    complianceHighlight: 'Built with RERA & Dubai Land Department standard data schemas.'
  },
  {
    id: 'financial-services',
    name: 'Banking, Wealth & DIFC/ADGM',
    badge: 'Regulatory Sovereign Grade',
    icon: ShieldCheck,
    tagline: 'Zero-trust infrastructure and in-country cloud residency for DFSA & FSRA firms.',
    overview: 'Asset managers, family offices, and fintech firms operating in DIFC and ADGM face rigorous compliance standards. We deliver sovereign AWS/Azure architectures strictly within UAE borders with zero-trust perimeter defense.',
    challenges: [
      'Strict adherence to UAE Federal Decree-Law No. 45 on Personal Data Protection',
      'Complex DFSA / ADGM regulatory inspection and annual cybersecurity audits',
      'Legacy cross-border servers causing latency and regulatory vulnerabilities',
    ],
    solutions: [
      'Sovereign cloud migration to AWS UAE (me-central-1) and Azure UAE North',
      'Fortinet Zero-Trust firewall architecture and automated SIEM/SOC event logging',
      'Daily immutable encrypted backup vaults with air-gapped disaster recovery',
    ],
    metrics: [
      { label: 'Data Sovereignty', value: '100% UAE' },
      { label: 'Cloud Uptime SLA', value: '99.99%' },
      { label: 'Audit Passage', value: '1st Review' },
    ],
    complianceHighlight: 'DFSA, FSRA, CBUAE, and UAE Federal Law No. 45 aligned.'
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & Omnichannel Commerce',
    badge: 'High Concurrency & Scale',
    icon: ShoppingBag,
    tagline: 'Headless storefronts, localized payment gateways, and unified ERP integration.',
    overview: 'Powering high-growth retail brands with sub-second commerce engines that seamlessly bridge physical mall POS systems with online storefronts, Tabby/Tamara buy-now-pay-later, and regional logistics.',
    challenges: [
      'Slow mobile page speeds causing cart abandonment during peak shopping festivals',
      'Inventory synchronization discrepancies between flagship stores and warehouses',
      'Multi-currency and split tax reporting requirements across GCC territories',
    ],
    solutions: [
      'Next.js headless e-commerce architectures with sub-second page delivery',
      'Real-time 2-way synchronization with retail POS and warehouse ERPs',
      'Seamless integration with Apple Pay, Tamara, Tabby, and local courier APIs',
    ],
    metrics: [
      { label: 'Page Load Speed', value: '0.8s' },
      { label: 'Checkout Conversion', value: '+42%' },
      { label: 'Black Friday Concurrency', value: '50K+ RPM' },
    ],
    complianceHighlight: 'FTA UAE VAT 5% compliant reporting and PCI-DSS Level 1 payment handling.'
  },
  {
    id: 'hospitality-tourism',
    name: 'Hospitality, Luxury & Tourism',
    badge: 'Elevated Guest Experience',
    icon: Hotel,
    tagline: 'Bespoke booking engines, digital concierge web apps, and high-impact 3D multimedia.',
    overview: 'Transforming luxury hotels, private dining concepts, and tour operators with frictionless guest-facing digital touchpoints, AI concierge assistants, and world-class multimedia advertising.',
    challenges: [
      'Heavy OTA commissions diminishing direct guest acquisition revenues',
      'Fragmented PMS systems making personalization difficult across properties',
      'Demand for immersive visual storytelling to stand out in Dubai’s hospitality scene',
    ],
    solutions: [
      'Direct booking engines with automated currency conversion and dynamic pricing',
      'WhatsApp AI Concierge for instant room service, spa, and experience bookings',
      'Cinema-grade 3D CGI visuals, promotional videos, and experiential digital menus',
    ],
    metrics: [
      { label: 'Direct Bookings Increase', value: '+28%' },
      { label: 'Guest Response Time', value: '< 30 sec' },
      { label: 'OTA Commission Saved', value: 'AED 450K/yr' },
    ],
    complianceHighlight: 'Integrated with leading Hospitality PMS systems (Opera, Cloudbeds, Oracle).'
  },
  {
    id: 'healthcare-clinics',
    name: 'Healthcare & Specialized Clinics',
    badge: 'NABIDH & Malaffi Ready',
    icon: Stethoscope,
    tagline: 'Secure clinic management systems, HIPAA-level telemetry, and patient appointment portals.',
    overview: 'Medical centers, dental practices, and cosmetic clinics in Dubai and Abu Dhabi rely on Nexus for patient booking automation, zero-leak medical document storage, and compliant local hosting.',
    challenges: [
      'Mandatory integration with Dubai DHA NABIDH and Abu Dhabi Malaffi exchanges',
      'High patient no-show rates causing clinic chair vacancy and lost revenue',
      'Strict health privacy regulations regarding sensitive diagnostic records',
    ],
    solutions: [
      'Automated WhatsApp appointment confirmations with 1-click rescheduling',
      'End-to-end encrypted electronic health record (EHR) backup and access auditing',
      'Bilingual patient intake portals with digital consent signing and Emirates ID scan',
    ],
    metrics: [
      { label: 'No-Show Reduction', value: '-65%' },
      { label: 'Booking Automation', value: '82%' },
      { label: 'Data Encryption', value: 'AES-256' },
    ],
    complianceHighlight: 'DHA, NABIDH, and UAE Health Data Protection Law certified architectures.'
  },
  {
    id: 'logistics-trade',
    name: 'Logistics, Maritime & Free Zones',
    badge: 'Supply Chain Velocity',
    icon: Truck,
    tagline: 'Custom freight tracking, warehouse portals, and customs documentation automation.',
    overview: 'Supporting regional freight forwarders, JAFZA trading companies, and cold-chain operators with custom cloud dashboards that eliminate manual paperwork and track shipments in real time.',
    challenges: [
      'Manual entry of customs declarations and shipping manifests wasting labor hours',
      'Lack of unified visibility across air, sea, and land freight dispatches',
      'Warehouse downtime caused by legacy on-premise hardware and network drops',
    ],
    solutions: [
      'Automated customs document parser and Dubai Customs API connector',
      'Live GPS fleet and container telemetry tracking dashboard with geofencing',
      'Industrial-grade Wi-Fi 6 warehouse infrastructure and redundant 4G/5G failover',
    ],
    metrics: [
      { label: 'Documentation Hours Saved', value: '40 hrs/wk' },
      { label: 'Shipment Visibility', value: '100% Realtime' },
      { label: 'Warehouse Uptime', value: '99.98%' },
    ],
    complianceHighlight: 'Direct integration readiness for Dubai Trade & Mirsal II customs platforms.'
  },
  {
    id: 'professional-services',
    name: 'Professional Services & Legal',
    badge: 'Confidentiality & Precision',
    icon: Briefcase,
    tagline: 'Secure client portals, automated document generation, and sovereign corporate IT.',
    overview: 'Law firms, management consultancies, and accounting practices trust our encrypted communications infrastructure, matter management tools, and Microsoft 365 sovereign configurations.',
    challenges: [
      'Risk of privilege leaks in confidential litigation or M&A advisory files',
      'Unbillable hours lost in document formatting, time-tracking, and invoicing',
      'Complex UAE Corporate Tax & VAT compliance workflows for multiple entities',
    ],
    solutions: [
      'Restricted-access virtual data rooms (VDR) with watermarked PDF previews',
      'Custom ERP with automated time-billing and UAE FTA-compliant VAT invoicing',
      'Microsoft 365 Copilot integration for swift legal brief synthesis and translation',
    ],
    metrics: [
      { label: 'Document Prep Time', value: '-55%' },
      { label: 'Data Leak Incidents', value: '0' },
      { label: 'Billing Accuracy', value: '100%' },
    ],
    complianceHighlight: 'Compliant with DIFC Courts and UAE Ministry of Justice data confidentiality.'
  },
  {
    id: 'new-entrants',
    name: 'Startups & UAE New Entrants',
    badge: '90-Day Market Launch',
    icon: Rocket,
    tagline: 'Rapid digital turnkey foundations: branding, sovereign web, email, and corporate systems.',
    overview: 'Accelerating new companies launching in IFZA, DMCC, Meydan, DSO, or mainland with the complete digital suite needed to start operating and invoicing in Dubai within weeks.',
    challenges: [
      'Delays getting professional enterprise branding and corporate website live',
      'Navigating local bank account IT requirements and corporate email compliance',
      'Limited internal IT bandwidth during initial market testing and customer outreach',
    ],
    solutions: [
      'Complete 90-Day Digital Launchkit: Corporate site, branding, and domain setup',
      'Configured Google Workspace / Microsoft 365 with professional email signatures',
      'Fractional CTO advisory guiding technology stack decisions and local partner selection',
    ],
    metrics: [
      { label: 'Time to Market', value: '14 Days' },
      { label: 'Cost vs. Full Hire', value: '-70%' },
      { label: 'Ready-to-Invoice Setup', value: 'Day 1' },
    ],
    complianceHighlight: 'Tailored for UAE Free Zones including DMCC, IFZA, DAFZA, DSO, and DIFC.'
  }
];

export default function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('real-estate');
  const activeSector = INDUSTRY_SECTORS.find(s => s.id === selectedIndustry) || INDUSTRY_SECTORS[0];
  const ActiveIcon = activeSector.icon;

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[200px] bg-[#0046AF]/10 blur-[90px] rounded-full" />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <MorphBlock direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0046AF] text-xs font-bold mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Tailored for the UAE &amp; GCC Economy</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-5 max-w-4xl mx-auto">
              Industry-Specific Technology Solutions
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
              From regulated DFSA financial institutions to high-velocity Dubai real estate brokerages, we engineer technology architectures that meet your sector’s unique compliance, operational, and commercial demands.
            </p>
          </MorphBlock>
        </div>
      </section>

      {/* Main Interactive Industry Sector Showcase */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Quick Select Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {INDUSTRY_SECTORS.map((sector) => {
              const Icon = sector.icon;
              const isSelected = selectedIndustry === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedIndustry(sector.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0046AF] text-white shadow-md shadow-[#0046AF]/20 scale-105'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#0046AF]'}`} />
                  <span>{sector.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Deep-Dive Card */}
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 mb-16"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0046AF] border border-blue-200/80">
                    {activeSector.badge}
                  </span>
                  {activeSector.complianceHighlight && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ {activeSector.complianceHighlight}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0046AF] flex items-center justify-center shrink-0">
                    <ActiveIcon className="w-6 h-6" />
                  </div>
                  {activeSector.name}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl font-medium">
                  {activeSector.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/contact">
                  <button className="bg-[#0046AF] hover:bg-[#00388C] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer">
                    <span>Discuss {activeSector.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8">
              {activeSector.overview}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {activeSector.metrics.map((metric, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#0046AF] mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Challenges vs Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-4 flex items-center gap-2">
                  <span>Common Industry Roadblocks</span>
                </h3>
                <ul className="space-y-3">
                  {activeSector.challenges.map((c, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-4 flex items-center gap-2">
                  <span>Nexus Engineered Solutions</span>
                </h3>
                <ul className="space-y-3">
                  {activeSector.solutions.map((s, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Grid Overview of All Sectors */}
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              All 8 Supported Industry Verticals
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any domain to view our tailored delivery stack and UAE compliance guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRY_SECTORS.map((sec) => {
              const Icon = sec.icon;
              const isSelected = selectedIndustry === sec.id;
              return (
                <div
                  key={sec.id}
                  onClick={() => {
                    setSelectedIndustry(sec.id);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/60 border-[#0046AF] shadow-sm'
                      : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0046AF] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {sec.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {sec.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#0046AF]">
                    <span>View Stack</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Entrants Banner */}
          <div className="mt-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
                  <Rocket className="w-3.5 h-3.5 text-blue-400" />
                  <span>Free Zone &amp; Mainland Fast Track</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                  Operating in a Niche or Multi-Sector Domain?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Our senior solutions architects will assess your operational stack, regulatory parameters, and integration requirements during a confidential 30-minute discovery session.
                </p>
              </div>

              <Link to="/contact" className="shrink-0">
                <button className="bg-[#0046AF] hover:bg-[#00388C] text-white px-6 py-3.5 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
