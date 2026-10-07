import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Server, Code, Bot, Palette, Briefcase, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Activity, Cpu, Sparkles, 
  Clock, Award, Layers, ArrowUpRight, ChevronRight, Check
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';
import { Typewriter } from '@/components/ui/Typewriter';

interface SolutionOverviewItem {
  id: string;
  slug: string;
  category: 'it-services' | 'software' | 'ai' | 'creative' | 'consulting';
  title: string;
  badge: string;
  tagline: string;
  description: string;
  startingPriceAed: number;
  sla: string;
  icon: React.ElementType;
  image: string;
  metrics: { label: string; val: string }[];
  highlights: string[];
}

export default function Solutions() {
  const { formatPrice } = useCurrency();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const SOLUTIONS_LIST: SolutionOverviewItem[] = [
    {
      id: 'it-services',
      slug: 'it-services',
      category: 'it-services',
      title: 'Cloud & Sovereign IT Infrastructure',
      badge: 'AWS me-central-1 & Azure UAE North',
      tagline: 'Guaranteed UAE Data Residency (Decree-Law No. 45) & Zero-Trust Defense',
      description: 'Enterprise-grade hosting, zero-trust cybersecurity, and automated disaster recovery with sub-second failover. Supported by guaranteed 15-minute emergency on-site dispatch across Dubai.',
      startingPriceAed: 18000,
      sla: '15-Min Response • 99.99% Cloud Uptime',
      icon: Server,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
      metrics: [
        { label: 'DXB Latency', val: '< 1.4 ms' },
        { label: 'Uptime SLA', val: '99.99%' },
        { label: 'Data Residency', val: '100% In-Country' }
      ],
      highlights: [
        'Sovereign cloud hosting on AWS me-central-1 & Azure UAE North',
        'Zero-trust Fortinet firewalls & annual red-team penetration audits',
        'Structured Cat6A cabling, Wi-Fi 6 & server rack configuration',
        '24/7/365 NOC monitoring & rapid on-site engineer dispatch'
      ]
    },
    {
      id: 'software-development',
      slug: 'software-development',
      category: 'software',
      title: 'Custom Software & Enterprise Web Platforms',
      badge: 'DIFC & Downtown Dubai Engineering',
      tagline: 'Bespoke ERP/CRM, Scalable SaaS, and Native Mobile Applications',
      description: 'Purpose-built software platforms with 100% client code ownership. High-performance Next.js web applications, native iOS/Android apps, and seamless UAE payment gateway integrations.',
      startingPriceAed: 28000,
      sla: 'Bi-Weekly Releases • 100% Code Ownership',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
      metrics: [
        { label: 'Client IP', val: '100% Owned' },
        { label: 'QA Coverage', val: '96.4%' },
        { label: 'Deployments', val: 'Bi-Weekly' }
      ],
      highlights: [
        'Modern high-performance web platforms (React, Next.js, Node.js, Postgres)',
        'Bespoke ERP & CRM configured for 5% UAE VAT & Corporate Tax rules',
        'Native bilingual Arabic RTL & English typography localization',
        'UAE checkout integrations: Stripe UAE, Network International, Telr'
      ]
    },
    {
      id: 'ai-automation',
      slug: 'ai-automation',
      category: 'ai',
      title: 'Enterprise AI Tools & Autonomous Workflows',
      badge: 'Dubai Silicon Oasis AI Lab',
      tagline: 'Official WhatsApp Business API Agents & Sovereign Document Intelligence',
      description: 'Intelligent conversational systems, bilingual Arabic LLM copilots, and autonomous document extraction that eliminate manual enterprise bottlenecks while keeping data 100% sovereign.',
      startingPriceAed: 22000,
      sla: 'Bilingual NLP • Custom Enterprise Fine-Tuning',
      icon: Bot,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      metrics: [
        { label: 'Avg Latency', val: '0.6s' },
        { label: 'Arabic Accuracy', val: '98.2%' },
        { label: 'Sovereign Privacy', val: '100% Sandboxed' }
      ],
      highlights: [
        'Official WhatsApp Business API customer service & lead capture bots',
        'Bilingual conversational copilots trained on Gulf Arabic dialects',
        'Automated document & invoice OCR extraction into enterprise ERPs',
        'Private Retrieval-Augmented Generation (RAG) knowledge search'
      ]
    },
    {
      id: 'creative-services',
      slug: 'creative-services',
      category: 'creative',
      title: 'Business Adverts, 3D Assets & Creative Media',
      badge: 'Cinema-Grade Dubai Production Studio',
      tagline: '4K Commercial Films, 3D CGI Product Renders, and Visual Brand Suites',
      description: 'Broadcast-grade video commercials, high-fidelity 3D CGI product animation, and comprehensive visual identity systems crafted for UAE market leaders and international campaigns.',
      startingPriceAed: 14000,
      sla: '10-14 Day Turnaround • 100% Perpetual Rights',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=80',
      metrics: [
        { label: 'Broadcast Standard', val: 'ProRes 422 HQ' },
        { label: 'Turnaround', val: '10-14 Days' },
        { label: 'Rights', val: '100% Perpetual' }
      ],
      highlights: [
        '4 Official Packages: Starter, Growth, Professional & Full Enterprise Management',
        'Multi-platform management (Instagram, Facebook, TikTok), reels & ad funnels',
        'Cinema-grade 4K commercials shot on RED & ARRI cameras in Dubai',
        'Photorealistic 3D CGI product renders & architectural visualizations'
      ]
    },
    {
      id: 'consulting',
      slug: 'consulting',
      category: 'consulting',
      title: 'Digital Advisory & Fractional CTO Leadership',
      badge: 'Downtown Dubai Executive Boardroom',
      tagline: 'C-Level Technology Strategy, IT Spend Optimization & DESC Governance',
      description: 'Strategic technology advisory and fractional executive leadership for boards and founders across the GCC. Accelerating engineering delivery and auditing software vendors.',
      startingPriceAed: 25000,
      sla: 'Direct C-Suite Access • Fortnightly Board Reviews',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80',
      metrics: [
        { label: 'Executive Presence', val: 'In-Person DXB' },
        { label: 'Cost Reduction', val: '34% Avg' },
        { label: 'Regulatory Path', val: 'DESC Aligned' }
      ],
      highlights: [
        'Fractional CTO steering architecture, vendor negotiations, and technical roadmaps',
        'Enterprise IT spend audit eliminating bloated and duplicate legacy licenses',
        'Cybersecurity governance & disaster recovery runbooks for Dubai regulations',
        'Technical hiring, skills assessment, and engineering squad structuring in the UAE'
      ]
    }
  ];

  const filtered = selectedFilter === 'all'
    ? SOLUTIONS_LIST
    : SOLUTIONS_LIST.filter(item => item.category === selectedFilter);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Hero Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4 shadow-xs">
            <span>🇦🇪 Enterprise Capabilities • Aligned with Dubai D33</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            Integrated Solutions Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046AF] via-blue-600 to-indigo-600">
              <Typewriter 
                words={["Market Leadership.", "UAE Compliance.", "High ROI.", "Zero Downtime."]}
                typingSpeed={70}
                pauseTime={2200}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
            From sovereign in-country cloud hosting and bespoke software to autonomous AI workflows and cinema-grade commercial adverts, we engineer end-to-end technology solutions with guaranteed SLAs.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-8">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Solutions
            </button>
            <button
              onClick={() => setSelectedFilter('it-services')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'it-services'
                  ? 'bg-[#0046AF] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-[#0046AF] border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Cloud & IT Infrastructure
            </button>
            <button
              onClick={() => setSelectedFilter('software')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'software'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-blue-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Custom Software & ERP
            </button>
            <button
              onClick={() => setSelectedFilter('ai')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'ai'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-indigo-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              AI & Automation
            </button>
            <button
              onClick={() => setSelectedFilter('creative')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'creative'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-indigo-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Creative & Business Adverts
            </button>
            <button
              onClick={() => setSelectedFilter('consulting')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === 'consulting'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-amber-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Advisory & Fractional CTO
            </button>
          </div>
        </MorphBlock>
      </section>

      {/* Solutions Bento Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 hover:border-white/40 hover:bg-white/[0.14] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,70,175,0.14)] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Visual Media Header with Badge */}
                    <div className="relative h-52 sm:h-60 rounded-2xl overflow-hidden mb-6 bg-slate-100">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                      
                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-xs">
                          {item.badge}
                        </span>
                      </div>

                      {/* Bottom Floating Price */}
                      <div className="absolute bottom-3 left-3 text-white">
                        <div className="text-[10px] font-mono uppercase text-blue-200 font-bold">Starting from</div>
                        <div className="text-base font-bold">{formatPrice(item.startingPriceAed)}</div>
                      </div>

                      {/* Icon Bubble */}
                      <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white text-slate-800 flex items-center justify-center shadow-md">
                        <IconComp className="w-5 h-5 text-[#0046AF]" />
                      </div>
                    </div>

                    {/* Title and Tagline */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#0046AF] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#0046AF] mb-3">
                      {item.tagline}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 mb-6">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <div className="text-[10px] font-mono uppercase text-slate-500">{m.label}</div>
                          <div className="text-xs font-bold text-slate-900 mt-0.5">{m.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Highlight List */}
                    <div className="space-y-2 mb-6">
                      {item.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-3.5 h-3.5 text-[#0046AF] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      {item.sla}
                    </span>
                    <Link 
                      to={`/solutions/${item.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <span>Explore Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* UAE Enterprise Trust & D33 Compliance Matrix */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MorphBlock className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold text-[#0046AF] uppercase tracking-wider mb-2">Governance & Standards</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Engineered for the United Arab Emirates
            </h2>
            <p className="text-slate-600 text-base">
              Every system we architect complies with regional statutory frameworks and regulatory directives.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Federal Decree-Law No. 45</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full compliance with UAE Personal Data Protection laws. Personal consumer and enterprise records remain 100% within sovereign UAE cloud borders.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0046AF] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">TDRA & DESC Guidelines</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Network routing, encryption in transit (TLS 1.3), and zero-trust firewalls configured to pass Telecommunications and Digital Government audits without penalty.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Dubai Economic Agenda (D33)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accelerating digital economy output by transitioning GCC enterprises to modern automated architectures, eliminating legacy software drag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MorphBlock className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Technical Discovery • Zero Obligation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              Need a custom architecture or technology quote?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Schedule an in-person discovery meeting with our technical directors at Radiance ONE Business Center, Rigga Al Buteen, Dubai, or connect via WhatsApp for an immediate response.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <button className="bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white px-8 py-3.5 rounded-full font-bold shadow-md transition-all text-sm cursor-pointer">
                  Schedule In-Person Meeting
                </button>
              </Link>
              <a 
                href="https://wa.me/971526367221" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-full font-semibold transition-all text-sm flex items-center gap-2"
              >
                <span>WhatsApp: +971 52 636 7221</span>
              </a>
            </div>
          </div>
        </MorphBlock>
      </section>

    </div>
  );
}
