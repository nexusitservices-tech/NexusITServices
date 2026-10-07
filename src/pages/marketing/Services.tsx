import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Server, Code, Bot, Palette, Briefcase, CheckCircle2, 
  ArrowRight, Shield, Zap, Clock, Calculator, MessageSquare, 
  Check, Sparkles, Terminal, Activity, Layers, ArrowUpRight, 
  ChevronRight, RefreshCw, Cpu, Database, Eye, Globe,
  Moon, Sun
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { Typewriter } from '@/components/ui/Typewriter';
import { MorphBlock } from '@/components/ui/MorphBlock';

interface ServiceItem {
  id: string;
  category: 'it-services' | 'software' | 'ai' | 'creative' | 'consulting';
  icon: React.ElementType;
  title: string;
  badge: string;
  subtitle: string;
  startingAed: number;
  sla: string;
  image: string;
  locationTag: string;
  highlightStat: { label: string; value: string; color: string };
  items: string[];
  techStack: string[];
  liveTelemetry: { label: string; metric: string; detail: string }[];
  configOptions?: {
    name: string;
    options: { label: string; aedDelta: number }[];
  };
}

export default function Services() {
  const { formatPrice } = useCurrency();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);
  const [selectedServiceConfig, setSelectedServiceConfig] = useState<Record<string, number>>({
    'it-services': 0,
    'software': 0,
    'ai': 0,
    'creative': 0,
    'consulting': 0
  });

  const CATEGORIES = [
    { id: 'all', label: 'All 5 Divisions' },
    { id: 'it-services', label: '01 — IT Services', icon: Server },
    { id: 'software', label: '02 — Software & Web', icon: Code },
    { id: 'ai', label: '03 — AI & Automation', icon: Bot },
    { id: 'creative', label: '04 — Multimedia & Creative', icon: Palette },
    { id: 'consulting', label: '05 — Business Technology Consulting', icon: Briefcase },
  ];

  const SERVICES: ServiceItem[] = [
    {
      id: "it-services",
      category: "it-services",
      icon: Server,
      title: "01 — IT Services",
      badge: "AWS me-central-1 & Azure UAE North",
      subtitle: "Reliable Infrastructure & Technical Support for modern enterprises.",
      startingAed: 18000,
      sla: "15-Min Response • 99.99% Cloud Uptime",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
      locationTag: "AWS me-central-1 (UAE) & Azure North",
      highlightStat: { label: "Downtown DXB Latency", value: "< 1.4 ms", color: "text-emerald-400" },
      items: [
        "Managed IT & Helpdesk Support",
        "Hardware & Troubleshooting",
        "Enterprise Networks & Wi-Fi 6",
        "Cloud Migration (AWS me-central-1 & Azure UAE North)",
        "Zero-Trust Cybersecurity & Penetration Testing",
        "IT Maintenance & 24/7 Monitoring"
      ],
      techStack: ["AWS UAE", "Microsoft Azure", "Cloudflare", "Fortinet", "Cisco Meraki", "Docker"],
      liveTelemetry: [
        { label: "BGP Failover", metric: "Active-Active", detail: "Sub-second recovery" },
        { label: "Data Residency", metric: "100% In-Country", detail: "UAE Federal Law No. 45" },
        { label: "Rapid On-Site Dispatch", metric: "< 15 Mins", detail: "Downtown, DIFC & Marina" }
      ],
      configOptions: {
        name: "Support & SLA Tier",
        options: [
          { label: "Standard Business (9x5 Remote + 30-min SLA)", aedDelta: 0 },
          { label: "Mission Critical (24/7/365 + 15-min Guaranteed On-Site)", aedDelta: 7500 },
          { label: "High-Security Defense (Includes Annual Red-Team Pentest)", aedDelta: 14000 }
        ]
      }
    },
    {
      id: "software",
      category: "software",
      icon: Code,
      title: "02 — Software & Web",
      badge: "DIFC & Downtown Engineering",
      subtitle: "Digital Products Built Around Your Business.",
      startingAed: 28000,
      sla: "Bi-Weekly Sprint Releases • 100% Code Ownership",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
      locationTag: "DIFC & Downtown Dubai Engineering Hub",
      highlightStat: { label: "Deployment Cadence", value: "Bi-Weekly", color: "text-cyan-400" },
      items: [
        "Modern Responsive Websites",
        "High-Converting E-Commerce Platforms",
        "Cloud-Native Web Applications",
        "Custom Software Engineering",
        "CRM & ERP Architectures",
        "Scalable Business Systems & API Hubs"
      ],
      techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Flutter", "Tailwind CSS"],
      liveTelemetry: [
        { label: "Code Repository", metric: "Client Owned", detail: "Zero vendor lock-in" },
        { label: "Arabic RTL Engine", metric: "Native Support", detail: "Culturally fluent typography" },
        { label: "QA Test Coverage", metric: "96.4%", detail: "Automated regression pipelines" }
      ],
      configOptions: {
        name: "Architecture Blueprint",
        options: [
          { label: "Core Web App & Portal (Next.js + Postgres)", aedDelta: 0 },
          { label: "Omnichannel Suite (Web + iOS + Android App)", aedDelta: 18000 },
          { label: "Enterprise ERP / Custom Multi-Tenant Platform", aedDelta: 32000 }
        ]
      }
    },
    {
      id: "ai",
      category: "ai",
      icon: Bot,
      title: "03 — AI & Automation",
      badge: "Bilingual Arabic & English Neural Stack",
      subtitle: "Smarter Workflows. Less Manual Work.",
      startingAed: 22000,
      sla: "Bilingual NLP • Custom Enterprise Fine-Tuning",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      locationTag: "Dubai Silicon Oasis AI Innovation Lab",
      highlightStat: { label: "Response Speed", value: "0.6s Avg", color: "text-emerald-400" },
      items: [
        "AI Integration & Model Deployment",
        "End-to-End Business Automation",
        "Intelligent AI Assistants",
        "Conversational AI Chatbots (WhatsApp & Web)",
        "Workflow Automation & RPA",
        "Advanced Data Analysis & Business Intelligence"
      ],
      techStack: ["Gemini 1.5 Pro", "LangChain", "OpenAI", "Python", "WhatsApp Cloud API", "FastAPI"],
      liveTelemetry: [
        { label: "Inbound Lead Conversion", metric: "+38%", detail: "Instant WhatsApp qualification" },
        { label: "Document OCR Accuracy", metric: "99.2%", detail: "Trade bills & customs clearances" },
        { label: "Private LLM Hosting", metric: "Isolated VPC", detail: "Zero training on your confidential data" }
      ],
      configOptions: {
        name: "AI Model Deployment Model",
        options: [
          { label: "Standard Bilingual WhatsApp Bot (Customer Service)", aedDelta: 0 },
          { label: "Full Enterprise OCR + CRM Deep Synchronization", aedDelta: 9500 },
          { label: "Dedicated On-Premise / Sovereign Gemini Private Agent", aedDelta: 16500 }
        ]
      }
    },
    {
      id: "creative",
      category: "creative",
      icon: Palette,
      title: "04 — Multimedia & Creative",
      badge: "Dubai Design District (d3) Studio",
      subtitle: "Creative Media, Visual Communication & Digital Brand Experiences.",
      startingAed: 12000,
      sla: "Full Commercial IP Rights Handed Over",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80",
      locationTag: "Dubai Design District (d3) Studio",
      highlightStat: { label: "Resolution & Grade", value: "4K Cinema", color: "text-amber-400" },
      items: [
        "Brand Identity & Corporate Guidelines",
        "Graphic Design & Visual Assets",
        "Executive & Commercial Photography",
        "4K Video Production & Cinematography",
        "Social Media Content Strategy & Creation",
        "High-Impact Marketing Materials & Pitch Decks"
      ],
      techStack: ["Figma", "Adobe After Effects", "Premiere Pro", "DaVinci Resolve", "Cinema 4D"],
      liveTelemetry: [
        { label: "Commercial Rights", metric: "100% Perpetual", detail: "Worldwide broadcast & digital clearance" },
        { label: "Video Delivery", metric: "ProRes 422 HQ", detail: "Mastered for 4K broadcast & socials" },
        { label: "Typical Turnaround", metric: "10-14 Days", detail: "Rapid Dubai on-location shoots" }
      ],
      configOptions: {
        name: "Creative Package Scope",
        options: [
          { label: "Package 1: Starter / Basic (2 platforms, 8–12 posts/mo)", aedDelta: 0 },
          { label: "Package 2: Growth / Standard (3 platforms, 15–20 posts/mo, reels)", aedDelta: 3500 },
          { label: "Package 3: Professional / Premium (4–5 platforms, 25–30 posts, ads)", aedDelta: 8500 },
          { label: "Package 4: Enterprise / Full Management (All platforms, full production)", aedDelta: 16000 }
        ]
      }
    },
    {
      id: "consulting",
      category: "consulting",
      icon: Briefcase,
      title: "05 — Business Technology Consulting",
      badge: "Downtown Executive Boardroom",
      subtitle: "Strategic Technology, Digital Transformation & Business Growth.",
      startingAed: 15000,
      sla: "Executive Advisory in Dubai Time Zone (GST)",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      locationTag: "Downtown Dubai Executive Boardroom",
      highlightStat: { label: "Cost Reductions", value: "Up to 35%", color: "text-emerald-400" },
      items: [
        "Technology Strategy & Technical Roadmaps",
        "Comprehensive Digital Transformation",
        "Workflow & Process Optimization",
        "Technology Assessment & Architecture Audits",
        "Business Systems Integration",
        "Executive IT Advisory & Fractional CTO"
      ],
      techStack: ["TOGAF", "ISO 27001", "TDRA Framework", "Agile/Scrum", "ITIL"],
      liveTelemetry: [
        { label: "IT Cost Optimization", metric: "Avg 28% Saved", detail: "Eliminating redundant SaaS licenses" },
        { label: "Compliance Verification", metric: "TDRA Ready", detail: "Audit-certified documentation" },
        { label: "Executive Sessions", metric: "Weekly Boardroom", detail: "Direct partner-level engagement" }
      ],
      configOptions: {
        name: "Advisory Engagement Model",
        options: [
          { label: "Comprehensive 30-Day Tech & Vendor Audit", aedDelta: 0 },
          { label: "Fractional CTO Retainer (20 Hours / Month)", aedDelta: 15000 },
          { label: "Full M&A Technical Due Diligence & Roadmap", aedDelta: 28000 }
        ]
      }
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-[#070A0E] text-slate-100 selection:bg-emerald-500 selection:text-black' 
        : 'bg-[#F8FAFC] text-slate-900 selection:bg-emerald-600 selection:text-white'
    }`}>
      
      {/* Ambient Radial Lighting */}
      {/* Subtle Corporate Ambient Mesh */}
      <div className={`fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        isDarkMode ? 'bg-[#0046AF]/15' : 'bg-[#0046AF]/5'
      }`} />
      <div className={`fixed bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none ${
        isDarkMode ? 'bg-blue-600/10' : 'bg-blue-400/5'
      }`} />

      {/* Hero Header Section */}
      <section className={`relative pt-12 sm:pt-16 md:pt-24 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-b ${
        isDarkMode ? 'border-white/10' : 'border-slate-200/80'
      }`}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Top Row: Once UI Floating Badge & Theme Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
            <div className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full border shadow-2xs backdrop-blur-md ${
              isDarkMode 
                ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300' 
                : 'border-emerald-300/80 bg-white/90 text-emerald-800'
            }`}>
              <span className="text-xs">🇦🇪</span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wide uppercase font-mono">
                Enterprise Solutions & Architecture
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-[11px] sm:text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Dubai HQ</span>
            </div>

            {/* Dark / Light Interactive Style Toggle */}
            <div className={`inline-flex items-center p-1 rounded-full border shadow-2xs backdrop-blur-md ${
              isDarkMode ? 'bg-[#0D1117] border-white/10' : 'bg-white border-slate-200'
            }`}>
              <button
                onClick={() => setIsDarkMode(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isDarkMode 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3 h-3 text-emerald-400" />
                <span>Obsidian Command</span>
              </button>
              <button
                onClick={() => setIsDarkMode(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  !isDarkMode 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-400" />
                <span>Studio Light</span>
              </button>
            </div>
          </div>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 sm:mb-6 leading-tight ${
            isDarkMode ? 'text-white' : 'text-slate-950'
          }`}>
            High-Performance Capabilities. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              <Typewriter 
                words={[
                  "One Accountable UAE Partner.",
                  "Sovereign In-Country Cloud.",
                  "Custom AI & ERP Engineering.",
                  "99.95% Enterprise SLA."
                ]}
                typingSpeed={75}
                pauseTime={2200}
              />
            </span>
          </h1>

          <p className={`text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Five specialized engineering disciplines operating as a single unified force. 
            From sovereign in-country cloud grids to bespoke AI automation and executive advisory, 
            explore our scope of delivery below.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/contact">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs shadow-md hover:shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer">
                <span>Book Dubai Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <a href="/#estimator">
              <button className={`font-semibold px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs shadow-2xs transition-all flex items-center gap-2 cursor-pointer ${
                isDarkMode 
                  ? 'bg-[#0D1117] hover:bg-white/5 text-white border border-white/15' 
                  : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400'
              }`}>
                <Calculator className="w-4 h-4 text-emerald-500" />
                <span>Instant Cost Calculator (AED)</span>
              </button>
            </a>
          </div>
        </motion.div>

        {/* Once UI Segmented Capsule Pill Filter */}
        <div className="mt-8 sm:mt-12 flex justify-start sm:justify-center overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          <div className={`inline-flex items-center p-1 sm:p-1.5 rounded-full backdrop-blur-md shadow-2xs whitespace-nowrap border shrink-0 ${
            isDarkMode ? 'bg-[#0D1117]/90 border-white/10' : 'bg-slate-200/80 border-slate-300/80'
          }`}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative z-10 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer select-none ${
                    isActive 
                      ? (isDarkMode ? 'text-white font-bold' : 'text-emerald-950 font-bold') 
                      : (isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-white/60')
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="serviceFilterPill"
                      className={`absolute inset-0 rounded-full shadow-xs border ${
                        isDarkMode 
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                          : 'bg-white border-slate-300/60'
                      }`}
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services List with Dark Interactive Component Styling */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            const currentConfigIndex = selectedServiceConfig[service.id] || 0;
            const extraDelta = service.configOptions 
              ? service.configOptions.options[currentConfigIndex]?.aedDelta || 0 
              : 0;
            const calculatedPrice = service.startingAed + extraDelta;

            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,70,175,0.25)] hover:bg-white/[0.14] transition-all duration-300 overflow-hidden group"
              >
                {/* Visual Header Ribbon with Image & Badges */}
                <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-semibold shadow-2xs">
                      <span>📍 {service.locationTag}</span>
                    </span>

                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20 text-[11px] font-mono">
                      <span>{service.badge}</span>
                    </span>
                  </div>

                  {/* Bottom Stats Ribbon */}
                  <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold font-mono shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-white" />
                      <span>{service.sla}</span>
                    </div>

                    <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-mono text-white">
                      <span className="text-slate-400">{service.highlightStat.label}: </span>
                      <span className="font-bold text-emerald-400">{service.highlightStat.value}</span>
                    </div>
                  </div>
                </div>

                {/* Main Content Body */}
                <div className="p-4 sm:p-6 lg:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    
                    {/* Left Column: Title, Subtitle, Interactive Configuration (5 Cols) */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-2xs ${
                            isDarkMode 
                              ? 'bg-[#0046AF]/20 border-[#0046AF]/40 text-blue-400' 
                              : 'bg-blue-50 border-blue-200 text-[#0046AF]'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#0046AF] font-bold block">
                              Service Discipline
                            </span>
                            <span className={`text-xs font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              UAE Standard Compliant
                            </span>
                          </div>
                        </div>

                        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight leading-snug mb-3 ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {service.title}
                        </h2>

                        <p className={`text-sm leading-relaxed mb-6 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {service.subtitle}
                        </p>

                        {/* Interactive Scope Configurator (Glass Component) */}
                        {service.configOptions && (
                          <div className="p-4 rounded-2xl space-y-2 mb-6 bg-white/10 backdrop-blur-lg border border-white/20">
                            <label className={`text-[11px] font-mono uppercase tracking-wider font-semibold block ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              Configure {service.configOptions.name}:
                            </label>
                            <div className="space-y-1.5">
                              {service.configOptions.options.map((opt, optIdx) => {
                                const isSelected = currentConfigIndex === optIdx;
                                return (
                                   <button
                                    key={optIdx}
                                    onClick={() => setSelectedServiceConfig(prev => ({ ...prev, [service.id]: optIdx }))}
                                    className={`w-full text-left p-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                                      isSelected
                                        ? 'bg-[#0046AF]/40 border-2 border-[#0046AF] text-white font-semibold shadow-xs' 
                                        : 'bg-white/10 border border-white/20 text-slate-300 hover:text-white hover:border-white/40'
                                    }`}
                                  >
                                    <span className="truncate pr-2">{opt.label}</span>
                                    <span className={`text-[10px] whitespace-nowrap ${
                                      isSelected 
                                        ? 'text-blue-400 font-bold' 
                                        : (isDarkMode ? 'text-slate-400' : 'text-slate-500')
                                    }`}>
                                      {opt.aedDelta === 0 ? 'Included' : `+${formatPrice(opt.aedDelta)}`}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Live Estimated Investment Card */}
                        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm backdrop-blur-[10px] ${
                          isDarkMode 
                            ? 'bg-black/60 border-white/15' 
                            : 'bg-slate-900/95 text-white border-slate-800'
                        }`}>
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Estimated Base Investment</span>
                            <div className="text-xl sm:text-2xl font-black font-mono text-white mt-0.5">
                              {formatPrice(calculatedPrice)}
                            </div>
                            <span className="text-[10px] text-slate-400">Milestone phased • Tax Invoice with 5% VAT</span>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <Link to={`/services/${service.id}`}>
                              <button className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/20 transition-all flex items-center gap-1 cursor-pointer">
                                <span>Deep Dive</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </Link>
                            <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                              <button className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-[11px] font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer">
                                <span>Inquire</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Tech stack badge strip */}
                      <div className="pt-2">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold block mb-2 ${
                          isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Enterprise Stack & Protocols:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.techStack.map((tech, i) => (
                            <span key={i} className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border ${
                              isDarkMode 
                                ? 'bg-[#131922] text-slate-300 border-white/10' 
                                : 'bg-slate-100 text-slate-700 border-slate-200/70'
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Scope of Work & Live Telemetry (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Live Telemetry Matrix Box (Glass Component) */}
                      <div className="rounded-2xl p-5 shadow-2xs bg-white/10 backdrop-blur-lg border border-white/20">
                        <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
                          isDarkMode ? 'border-white/10' : 'border-slate-200'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-400" />
                            <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              Operational Telemetry & Guarantees
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${
                            isDarkMode 
                              ? 'text-blue-300 bg-blue-950/50 border-blue-500/30' 
                              : 'text-[#0046AF] bg-blue-50 border-blue-200'
                          }`}>
                            Active SLA Protocol
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {service.liveTelemetry.map((item, idx) => (
                            <div key={idx} className="p-3 rounded-xl border shadow-2xs bg-white/10 backdrop-blur-sm border-white/15">
                              <span className={`text-[10px] font-mono uppercase block ${
                                isDarkMode ? 'text-slate-400' : 'text-slate-500'
                              }`}>{item.label}</span>
                              <span className={`text-sm font-bold font-mono block mt-1 ${
                                isDarkMode ? 'text-white' : 'text-slate-900'
                              }`}>{item.metric}</span>
                              <span className="text-[10px] text-blue-500 font-medium block mt-0.5">{item.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scope Deliverables Checklist (Glass Component) */}
                      <div className="rounded-2xl p-5 sm:p-6 shadow-2xs bg-white/10 backdrop-blur-lg border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`text-xs font-bold uppercase tracking-wider font-mono ${
                            isDarkMode ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Scope Deliverables & UAE Standard Output
                          </h3>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            isDarkMode ? 'text-slate-400 bg-white/5' : 'text-slate-500 bg-slate-100'
                          }`}>5 Concrete Outputs</span>
                        </div>

                        <div className="space-y-3">
                          {service.items.map((item, i) => (
                            <div key={i} className={`flex items-start gap-3 text-xs sm:text-sm group/item ${
                              isDarkMode ? 'text-slate-300' : 'text-slate-700'
                            }`}>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isDarkMode 
                                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/30 group-hover/item:bg-blue-600 group-hover/item:text-white' 
                                  : 'bg-blue-50 text-[#0046AF] border-blue-200 group-hover/item:bg-[#0046AF] group-hover/item:text-white'
                              }`}>
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                              <span className="leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Bottom UAE Regulatory Bar */}
                        <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
                          isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-100 text-slate-500'
                        }`}>
                          <span className="flex items-center gap-1.5 font-mono text-[11px]">
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Complying with UAE TDRA & Data Protection Law No. 45</span>
                          </span>
                          <Link to="/estimator" className="text-emerald-400 font-bold hover:underline flex items-center gap-1 font-mono text-[11px]">
                            <span>Open Cost Estimator</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className={`py-20 border-t relative overflow-hidden ${
        isDarkMode ? 'bg-[#070A0E] border-white/10' : 'bg-white border-slate-200/80'
      }`}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`p-8 sm:p-12 rounded-3xl border shadow-xl ${
              isDarkMode 
                ? 'bg-[#090C10] border-emerald-500/30 text-white' 
                : 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 text-white'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Discipline Engineering Packages</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Need a Combined Multi-Discipline Package?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              Most clients bundle Sovereign Cloud Infrastructure, Custom Web/Mobile Software, 
              and WhatsApp AI Automation under one consolidated contract for maximum cost efficiency.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-3.5 rounded-full text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                  <span>Schedule Dubai Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
              <a 
                href="https://wa.me/971526367221" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-full text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat with Solutions Director</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
