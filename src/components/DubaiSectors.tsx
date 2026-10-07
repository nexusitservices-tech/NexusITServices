import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Landmark, ShoppingBag, Truck, Stethoscope, ArrowRight, 
  ShieldCheck, Search, Home, ChevronLeft, ChevronRight, Sparkles, 
  CheckCircle2, Activity, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Sector {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  challenges: string;
  solutions: string[];
  caseStudy: string;
  impact: string;
  image: string;
  locationTag: string;
}

interface PlatformTemplateSample {
  id: string;
  sectorId: string;
  title: string;
  category: string;
  tagline: string;
  image: string;
  location: string;
  status: string;
  features: string[];
  techStack: string[];
  impactMetric: string;
  impactLabel: string;
  overlayType: 'realestate' | 'businessos' | 'fintech' | 'retail' | 'logistics';
}

const SECTORS: Sector[] = [
  {
    id: 'realestate',
    name: 'Real Estate & PropTech',
    icon: Building2,
    tagline: 'High-conversion platforms for UAE developers & brokerages',
    challenges: 'High lead acquisition costs, fragmented MLS listing sync, and slow broker-to-client follow-ups.',
    solutions: [
      'Custom CRM with automated WhatsApp lead routing',
      'Interactive 3D masterplan & floorplan viewers',
      'Escrow & payment gateway integration',
      'Integration with Bayut, Property Finder & Dubizzle feeds'
    ],
    caseStudy: 'Engineered an off-plan sales portal for a Dubai Marina luxury developer with real-time unit reservation.',
    impact: '3.4x faster lead response time & +42% international buyer conversion.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Dubai Marina & Downtown DXB'
  },
  {
    id: 'fintech',
    name: 'Fintech & Banking',
    icon: Landmark,
    tagline: 'Secure, compliant financial systems & payment pipelines',
    challenges: 'Strict DIFC / ADGM regulatory standards, cyber resilience, and legacy core banking barriers.',
    solutions: [
      'CBUAE & TDRA compliant cloud architecture',
      'UAE Pass biometric authentication integration',
      'Instant cross-border payment & crypto/fiat gateways',
      'Automated KYC/AML verification workflows'
    ],
    caseStudy: 'Architected a micro-lending and payment gateway platform certified under UAE cybersecurity standards.',
    impact: '99.99% system uptime and full regulatory compliance audit passed in 30 days.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'DIFC & Abu Dhabi Global Market (ADGM)'
  },
  {
    id: 'retail',
    name: 'Luxury Retail & E-Commerce',
    icon: ShoppingBag,
    tagline: 'Omnichannel commerce tailored to GCC VIP consumers',
    challenges: 'High expectations for ultra-fast checkout, bilingual Arabic/English UX, and same-day Dubai deliveries.',
    solutions: [
      'Headless Shopify / custom Next.js storefronts',
      'Tabby & Tamara Buy Now Pay Later (BNPL) integrations',
      'Bilingual RTL Arabic & LTR English responsive design',
      'Automated dispatch sync with Quiqup & Aramex'
    ],
    caseStudy: 'Launched a flagship bilingual luxury fragrance e-commerce portal with sub-second page loads across GCC.',
    impact: '68% mobile checkout completion rate with 2-hour Dubai express dispatch.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    locationTag: 'Dubai Mall & Mall of the Emirates'
  },
  {
    id: 'logistics',
    name: 'Logistics & Trade',
    icon: Truck,
    tagline: 'Real-time telemetry and customs workflow automation',
    challenges: 'Disjointed communication between JAFZA/ports, clearing agents, and fleet drivers.',
    solutions: [
      'Fleet telematics & GPS tracking dashboard',
      'Automated customs documentation & OCR bill-of-lading processing',
      'Warehouse inventory scanning & Barcode/RFID sync',
      'Client portal with live consignment ETA tracking'
    ],
    caseStudy: 'Overhauled a multimodal freight forwarder based in Dubai South with an automated dispatch engine.',
    impact: 'Eliminated 18 manual coordination hours per week across 120 container shipments.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
    locationTag: 'JAFZA & Dubai South Logistics Corridor'
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Smart Entities',
    icon: Stethoscope,
    tagline: 'HIPAA & UAE Health Data compliant clinical platforms',
    challenges: 'Patient privacy compliance with DHA / Nabidh standards and fragmented clinic appointment schedules.',
    solutions: [
      'DHA Nabidh interoperability and electronic health records (EHR)',
      'Automated patient appointment booking via WhatsApp',
      'Telehealth video consultations with end-to-end encryption',
      'Medical inventory and pharmacy ERP'
    ],
    caseStudy: 'Implemented patient management and automated WhatsApp reminder bots for a multi-branch dental clinic in Jumeirah.',
    impact: 'Reduced appointment no-shows by 37% and automated 1,400 monthly patient bookings.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
    locationTag: 'Dubai Healthcare City & Jumeirah'
  }
];

const TEMPLATE_SAMPLES: PlatformTemplateSample[] = [
  {
    id: 'tpl-proptech',
    sectorId: 'realestate',
    title: 'Luxury PropTech & 3D Masterplan Portal',
    category: 'Off-Plan Real Estate Template',
    tagline: 'High-conversion developer platform featuring interactive masterplan viewers, Bayut/Property Finder feed sync, and escrow booking.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    location: 'Dubai Marina & Downtown DXB',
    status: 'Live Platform Sample',
    features: [
      'Interactive 3D Floorplan & Unit Stacker',
      'Automated WhatsApp lead concierge & Bayut API sync',
      'Instant escrow payment calculator & reservation'
    ],
    techStack: ['Next.js App Router', 'Three.js', 'Tailwind CSS', 'WhatsApp Cloud API'],
    impactMetric: '+42% International Conversion',
    impactLabel: 'Measured Booking Velocity',
    overlayType: 'realestate'
  },
  {
    id: 'tpl-businessos',
    sectorId: 'fintech',
    title: 'Nexus Business OS — Enterprise Core Suite',
    category: 'SaaS & Enterprise ERP Sample',
    tagline: 'All-in-one operating system unifying multi-tenant CRM, bilingual quotations, UAE 5% VAT invoicing, and AI Copilot.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    location: 'DIFC & Business Bay HQ',
    status: 'Flagship Core Architecture',
    features: [
      'Bilingual quotations & 5% UAE VAT billing engine',
      'Real-time SLA ticket management & auto-dispatch',
      'Embedded AI Copilot for pipeline & risk intelligence'
    ],
    techStack: ['React 19', 'NestJS', 'PostgreSQL', 'BullMQ & Redis'],
    impactMetric: '18 hrs saved/wk per team',
    impactLabel: 'Operational Efficiency',
    overlayType: 'businessos'
  },
  {
    id: 'tpl-fintech',
    sectorId: 'fintech',
    title: 'Regulated Wealth Portal & Asset Rebalancer',
    category: 'Fintech & Digital Banking Template',
    tagline: 'ADGM & CBUAE cyber-resilient financial portal with UAE Pass biometrics and real-time portfolio telemetry.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    location: 'DIFC & Abu Dhabi Global Market',
    status: 'Regulated Prototype',
    features: [
      'UAE Pass biometric authentication & KYC engine',
      'Real-time multi-currency crypto/fiat ledger',
      'Zero-trust data isolation with TDRA compliance'
    ],
    techStack: ['TypeScript', 'Tailwind', 'WebSockets', 'UAE Pass SDK'],
    impactMetric: '99.99% Guaranteed SLA',
    impactLabel: 'Audited Resilience',
    overlayType: 'fintech'
  },
  {
    id: 'tpl-retail',
    sectorId: 'retail',
    title: 'GCC Luxury Omnichannel Storefront',
    category: 'E-Commerce & Retail Template',
    tagline: 'Ultra-fast headless commerce with bilingual RTL Arabic / LTR English switching, Tabby BNPL, and express courier dispatch.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    location: 'Dubai Mall & Galleria Abu Dhabi',
    status: 'Omnichannel Storefront',
    features: [
      'Native Arabic RTL / English typography engine',
      'Tabby & Tamara BNPL checkout integrations',
      'Same-day Quiqup & Aramex courier dispatch sync'
    ],
    techStack: ['Headless Next.js', 'Shopify Plus', 'Redis Edge', 'Tabby API'],
    impactMetric: '68% Mobile Checkout',
    impactLabel: 'Conversion Benchmark',
    overlayType: 'retail'
  },
  {
    id: 'tpl-logistics',
    sectorId: 'logistics',
    title: 'Multimodal Port Clearing & Fleet Telematics',
    category: 'Logistics & Supply Chain Hub',
    tagline: 'Live GPS consignment tracking, OCR customs documentation, and container gate management across UAE trade zones.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    location: 'JAFZA & Dubai South Logistics Corridor',
    status: 'Supply Chain Solution',
    features: [
      'Live container GPS tracking & ETA prediction',
      'Automated OCR customs bill-of-lading pipeline',
      'Driver mobile app sync with barcode verification'
    ],
    techStack: ['React', 'Node.js', 'IoT MQTT', 'PostGIS'],
    impactMetric: '120+ Daily Consignments',
    impactLabel: 'Paperless Velocity',
    overlayType: 'logistics'
  }
];

export default function DubaiSectors() {
  const [activeSector, setActiveSector] = useState<string>('realestate');
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const currentSector = SECTORS.find(s => s.id === activeSector) || SECTORS[0];
  const currentTemplate = TEMPLATE_SAMPLES[activeSlide] || TEMPLATE_SAMPLES[0];
  const Icon = currentSector.icon;

  // Auto-advance slide every 5.5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % TEMPLATE_SAMPLES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  // When sector tab is clicked, jump to relevant template
  const handleSelectSector = (sectorId: string) => {
    setActiveSector(sectorId);
    const matchedIndex = TEMPLATE_SAMPLES.findIndex(tpl => tpl.sectorId === sectorId);
    if (matchedIndex !== -1) {
      setActiveSlide(matchedIndex);
    }
  };

  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev === 0 ? TEMPLATE_SAMPLES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % TEMPLATE_SAMPLES.length);
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Industry-Tailored Tech for Enterprises
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4">
            We understand the unique dynamics of the UAE market — from bilingual Arabic consumer behaviors to DIFC and TDRA regulatory requirements.
          </p>
        </div>

        {/* Sector Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {SECTORS.map((sector) => {
            const SIcon = sector.icon;
            const isActive = activeSector === sector.id;
            return (
              <button
                key={sector.id}
                onClick={() => handleSelectSector(sector.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-105'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <SIcon className="w-4 h-4 shrink-0" />
                <span>{sector.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Sector Deep-Dive Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-4 sm:p-6 md:p-10 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left: Sector Challenges & Solutions (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                      {currentSector.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600">
                      {currentSector.tagline}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-4">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Typical UAE Industry Bottleneck
                  </span>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    {currentSector.challenges}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Nexus Engineered Solutions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentSector.solutions.map((sol, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <ShieldCheck className="w-4 h-4 text-[#0046AF] shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link to="/contact">
                  <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-3 rounded-full transition-all flex items-center gap-2 group cursor-pointer">
                    <span>Discuss Your {currentSector.name} Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Combined Unified Column — Image Slider with Smooth Morphing Animation (5 Cols) */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="lg:col-span-5 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex flex-col shadow-2xl relative text-white"
            >
              {/* Slider Header Control Bar */}
              <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 font-mono">
                    Template & Platform Sample
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 font-semibold mr-1">
                    {String(activeSlide + 1).padStart(2, '0')} / {String(TEMPLATE_SAMPLES.length).padStart(2, '0')}
                  </span>
                  
                  {/* Prev Button */}
                  <button
                    onClick={handlePrevSlide}
                    aria-label="Previous template sample"
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNextSlide}
                    aria-label="Next template sample"
                    className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700/60 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Morphing Slide Container */}
              <div className="relative flex-1 flex flex-col min-h-[460px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTemplate.id}
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)', y: 8 }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)', y: -8 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full flex-1 flex flex-col justify-between"
                  >
                    {/* Visual Media Canvas with Dynamic Contextual Overlays */}
                    <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-950 group shrink-0">
                      <img
                        src={currentTemplate.image}
                        alt={currentTemplate.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter contrast-[1.08] brightness-[0.92] transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Gradient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/50"></div>

                      {/* Top Location Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-slate-200 border border-slate-700/70 text-[10px] font-semibold">
                          <span>📍 {currentTemplate.location}</span>
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/85 backdrop-blur-md text-blue-300 border border-blue-700/60 text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                          {currentTemplate.status}
                        </span>
                      </div>

                      {/* Contextual Overlays customized per template */}
                      {currentTemplate.overlayType === 'realestate' && (
                        <>
                          <div className="absolute top-12 right-3 bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-2.5 shadow-lg border border-white/40 flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-[#0046AF] text-white flex items-center justify-center shrink-0">
                              <Home className="w-3.5 h-3.5" />
                            </div>
                            <div className="text-left">
                              <div className="text-[9px] font-medium text-slate-500 leading-none">Modern Luxury Villa</div>
                              <div className="text-[11px] font-bold text-slate-900 leading-tight mt-0.5">AED 12,450,000</div>
                            </div>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-1.5 pl-2.5 shadow-md border border-white/50 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate-700 text-[11px] truncate">
                              <Search className="w-3.5 h-3.5 text-[#0046AF] shrink-0" />
                              <span className="font-semibold text-slate-900">Dubai Marina</span>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500">Villas</span>
                              <span className="text-slate-300">·</span>
                              <span className="text-slate-500">4-6 Beds</span>
                            </div>
                            <span className="bg-[#0046AF] text-white font-semibold px-2.5 py-1 rounded-lg text-[10px] tracking-wide shrink-0">
                              Search
                            </span>
                          </div>
                        </>
                      )}

                      {currentTemplate.overlayType === 'businessos' && (
                        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md rounded-xl p-2 px-3 border border-slate-700/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Activity className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="font-mono text-[11px] text-slate-200">Pipeline: <strong className="text-white">AED 4.2M</strong></span>
                          </div>
                          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/80">
                            5% VAT Automated
                          </span>
                        </div>
                      )}

                      {currentTemplate.overlayType === 'fintech' && (
                        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md rounded-xl p-2 px-3 border border-slate-700/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-[11px] text-slate-200 font-semibold">ADGM & CBUAE Certified</span>
                          </div>
                          <span className="text-[10px] font-bold text-blue-400 bg-blue-950/70 px-2 py-0.5 rounded border border-blue-800/80">
                            UAE Pass Ready
                          </span>
                        </div>
                      )}

                      {currentTemplate.overlayType === 'retail' && (
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2 px-3 border border-white/50 flex items-center justify-between text-xs text-slate-900">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-[11px] font-bold">VIP Fragrance Boutique</span>
                          </div>
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            Bilingual RTL / LTR
                          </span>
                        </div>
                      )}

                      {currentTemplate.overlayType === 'logistics' && (
                        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md rounded-xl p-2 px-3 border border-slate-700/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Truck className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-[11px] text-slate-200 font-mono">Port Gate 4 · Consignment Active</span>
                          </div>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/80">
                            Live Telematics
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Integrated Details Panel inside the Combined Column */}
                    <div className="p-5 md:p-6 flex flex-col justify-between flex-1 space-y-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
                            {currentTemplate.category}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-300">
                            {currentTemplate.impactMetric}
                          </span>
                        </div>

                        <h4 className="text-base md:text-lg font-bold text-white leading-snug">
                          {currentTemplate.title}
                        </h4>

                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {currentTemplate.tagline}
                        </p>
                      </div>

                      {/* Architectural Features */}
                      <div className="space-y-1.5 py-1">
                        {currentTemplate.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentTemplate.techStack.map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/70 text-[10px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <Link 
                          to="/solutions/software-development" 
                          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors group"
                        >
                          <span>Explore Template Specs</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          to="/request-quote"
                          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Request Build</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider Footer Dot Navigator */}
              <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {TEMPLATE_SAMPLES.map((tpl, idx) => (
                    <button
                      key={tpl.id}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}: ${tpl.title}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeSlide === idx 
                          ? 'w-6 bg-cyan-400' 
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[10px] text-slate-500 font-mono">
                  {isPaused ? 'Paused on hover' : 'Auto-sliding'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
