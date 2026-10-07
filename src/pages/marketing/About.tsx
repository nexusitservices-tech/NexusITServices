import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Server, Code, Bot, Palette, Briefcase, ArrowRight, 
  ShieldCheck, Award, Lightbulb, Users, CheckCircle2, 
  Zap, MessageSquare, Target, Eye, Sparkles, Building2,
  Check, ChevronRight, HelpCircle, Layers, MapPin, Compass,
  TrendingUp, Clock, FileCheck, ShoppingBag, Hotel, Stethoscope,
  Truck, Rocket, UserCheck
} from 'lucide-react';
import AboutDubaiShowcase from '@/components/AboutDubaiShowcase';
import { Typewriter, TypewriterReveal } from '@/components/ui/Typewriter';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';

export default function About() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const STATS = [
    {
      value: '5',
      label: 'Integrated Service Pillars',
      sub: 'Infrastructure, Code, AI, Creative & Advisory',
    },
    {
      value: '1',
      label: 'Dedicated Point of Contact',
      sub: 'Single accountable partner, no vendor finger-pointing',
    },
    {
      value: 'GCC',
      label: 'Regional Reach',
      sub: 'Dubai, Abu Dhabi, Saudi Arabia & the wider Gulf',
    },
    {
      value: 'AI',
      label: 'Built Into Everything We Do',
      sub: 'Designed from day one, not as an expensive afterthought',
    },
  ];

  const PILLARS = [
    {
      id: 'it-services',
      title: 'IT Services & Infrastructure',
      subtitle: 'Keep your business running — securely and reliably',
      icon: Server,
      color: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200/80',
      items: [
        'IT support and maintenance',
        'Network infrastructure and server administration',
        'Cybersecurity solutions and vulnerability audits',
        'Cloud services, migration (AWS / Azure) & backup',
        'Computer diagnostics, hardware repair & lifecycle management'
      ]
    },
    {
      id: 'software-dev',
      title: 'Software & Web Development',
      subtitle: 'Digital tools built around how you actually work',
      icon: Code,
      color: 'from-[#0046AF] to-blue-600',
      badgeBg: 'bg-blue-50 text-[#0046AF] border-blue-200/80',
      items: [
        'Custom website design and high-performance development',
        'E-commerce solutions and regional payment gateways',
        'Cross-platform iOS and Android mobile applications',
        'Custom business software and CRM systems',
        'Unified business management platforms and portal integrations'
      ]
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation Solutions',
      subtitle: 'Do more with the team you already have',
      icon: Bot,
      color: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200/80',
      items: [
        'AI integration for everyday business processes',
        'Intelligent chatbots and virtual assistants (Arabic & English)',
        'Workflow and business process automation',
        'Data analytics, dashboards and automated reporting',
        'Custom LLM models and document parsing engines'
      ]
    },
    {
      id: 'multimedia',
      title: 'Multimedia & Creative Production',
      subtitle: 'A brand that looks as good as your work is',
      icon: Palette,
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200/80',
      items: [
        'Graphic design, corporate typography and brand identity',
        'Executive video production and commercial photography',
        'Social media content creation and storytelling',
        'Marketing materials, brand collateral and launch campaigns',
        'Interactive UI/UX design and design systems'
      ]
    },
    {
      id: 'consulting',
      title: 'Business Consulting',
      subtitle: 'Strategic guidance, not just technical delivery',
      icon: Briefcase,
      color: 'from-rose-500 to-pink-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200/80',
      items: [
        'Digital transformation advisory for SMEs and mid-sized enterprises',
        'Technology planning, architecture and multi-year roadmaps',
        'Operational and process efficiency improvement',
        'Startup technology consulting and fractional CTO guidance',
        'Vendor assessment, compliance and risk management'
      ]
    }
  ];

  const WHY_CHOOSE_US = [
    {
      title: 'One partner, not five vendors',
      desc: 'Every capability under one roof means less coordination, fewer handoffs, and one team that truly understands your business.',
      icon: Layers,
      highlight: 'Unified Delivery'
    },
    {
      title: 'AI built in, not bolted on',
      desc: 'We design automation and AI into your systems from day one — not as an expensive, fragile afterthought.',
      icon: Bot,
      highlight: 'Native Intelligence'
    },
    {
      title: 'Transparent, fixed pricing',
      desc: 'Clear packages and proposals, agreed upfront in AED — no surprise invoices or unexpected scope creep.',
      icon: FileCheck,
      highlight: 'No Hidden Costs'
    },
    {
      title: 'Built for growing businesses',
      desc: 'Enterprise-grade capability, scaled and priced realistically for SMEs and established mid-sized companies.',
      icon: TrendingUp,
      highlight: 'Scalable Architecture'
    },
    {
      title: 'Local presence, responsive delivery',
      desc: 'A UAE-based team that understands the local market you operate in and responds when you need us.',
      icon: MapPin,
      highlight: 'Dubai On-The-Ground'
    },
    {
      title: 'A partner that grows with you',
      desc: 'Start with one project. Scale into an ongoing managed relationship as your operational needs expand.',
      icon: Users,
      highlight: 'Long-Term Vision'
    }
  ];

  const WORK_PROCESS = [
    {
      step: '1',
      title: 'Discover',
      desc: 'We start by understanding your business, your goals, and what success looks like — not by pitching a generic package.',
      tag: 'Strategic Listening'
    },
    {
      step: '2',
      title: 'Propose',
      desc: 'You receive a clear, fixed-scope proposal with defined deliverables, timeline, and pricing. No surprises.',
      tag: 'Fixed Scope & Price'
    },
    {
      step: '3',
      title: 'Build & Deliver',
      desc: 'Our team gets to work, with regular check-ins so you always know where things stand at every sprint.',
      tag: 'Agile Execution'
    },
    {
      step: '4',
      title: 'Launch & Ongoing Support',
      desc: 'We deploy, document, and train your team for a smooth cutover, followed by continuous maintenance, security patching, and proactive scaling.',
      tag: 'Go-Live & SLA Retainer'
    }
  ];

  const INDUSTRIES = [
    { name: 'Retail & E-Commerce', icon: ShoppingBag },
    { name: 'Hospitality & Tourism', icon: Hotel },
    { name: 'Real Estate & PropTech', icon: Building2 },
    { name: 'Healthcare & Clinics', icon: Stethoscope },
    { name: 'Logistics & Trade', icon: Truck },
    { name: 'Professional Services', icon: Briefcase },
    { name: 'Startups & New Entrants', icon: Rocket }
  ];

  const VALUES = [
    {
      title: 'Integrity',
      desc: 'Transparent pricing and honest recommendations — always.',
      icon: ShieldCheck,
      color: 'text-blue-600'
    },
    {
      title: 'Excellence',
      desc: 'Professional-grade delivery on every engagement, regardless of size.',
      icon: Award,
      color: 'text-[#0046AF]'
    },
    {
      title: 'Innovation',
      desc: 'Continuous adoption of new AI and automation capability, ahead of the curve.',
      icon: Lightbulb,
      color: 'text-amber-600'
    },
    {
      title: 'Partnership',
      desc: 'We treat every client relationship as a long-term partnership, not a transaction.',
      icon: Users,
      color: 'text-indigo-600'
    },
    {
      title: 'Accountability',
      desc: 'Clear ownership and clear reporting on everything we deliver.',
      icon: UserCheck,
      color: 'text-blue-600'
    },
    {
      title: 'Agility',
      desc: 'Fast, responsive scoping and delivery — built for how businesses actually move.',
      icon: Zap,
      color: 'text-rose-600'
    }
  ];

  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-[#F8FAFC]">
      
      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden text-black">
        {/* Background Visual Layer matching Home page style */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="/herobackground.jpg" 
            alt="Dubai Skyline & Enterprise Network Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-45 filter contrast-105 saturate-115"
          />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,#F8FAFC_90%)] opacity-75"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/15 blur-[130px] rounded-full"></div>
          <div className="absolute top-1/3 left-1/3 w-[450px] h-[250px] bg-indigo-500/15 blur-[110px] rounded-full"></div>
          <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#0f172a0a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center text-center max-w-4xl">
            
            {/* Tagline / Company Profile Headline */}
            <MorphBlock direction="up" delay={0.05}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-black leading-[1.06] mb-6 flex flex-col items-center text-center">
                <span className="text-black">Nexus IT Services FZ-LLC</span>
                <span className="text-black text-3xl sm:text-4xl md:text-5xl mt-3 font-extrabold tracking-tight">
                  Technology. Simplified. Delivered.
                </span>
              </h1>
            </MorphBlock>

            {/* Dynamic Typewriter Lead Proposition */}
            <MorphBlock direction="up" delay={0.15} className="mb-8">
              <div className="text-lg md:text-2xl text-black font-semibold min-h-[1.5em] flex items-center justify-center">
                <Typewriter 
                  words={[
                    "One technology partner. Every capability your business needs to grow.",
                    "IT Infrastructure • Custom Software • AI Automation under one roof.",
                    "One dedicated point of contact. One team accountable for results."
                  ]}
                  typingSpeed={60}
                  deletingSpeed={35}
                  pauseTime={2500}
                  className="text-black"
                />
              </div>
            </MorphBlock>

            {/* Profile Narrative */}
            <MorphBlock direction="up" delay={0.2} className="max-w-3xl mb-10">
              <div className="relative overflow-hidden text-black text-base md:text-lg leading-relaxed space-y-4 text-center sm:text-left bg-gradient-to-br from-white/35 via-white/15 to-white/25 backdrop-blur-[10px] border border-white/50 shadow-[0_8px_32px_0_rgba(15,23,42,0.06)] p-6 sm:p-8 rounded-3xl font-medium">
                <div className="absolute -top-16 -left-16 w-44 h-44 bg-blue-400/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-indigo-400/15 rounded-full blur-2xl pointer-events-none" />
                <p className="relative z-10">
                  <strong className="text-black font-black">Nexus IT Services</strong> is a UAE-based technology and business solutions company built for organizations that want to grow without the complexity of managing five different vendors. We bring IT infrastructure, software and web development, AI automation, creative production, and business consulting together under one roof — so you get one point of contact, one team that knows your business, and one partner accountable for results.
                </p>
                <p className="relative z-10">
                  We work with growing businesses across the UAE and the wider GCC — from newly launched startups to established mid-sized companies — helping them simplify operations, modernize their technology, and unlock the productivity gains that Artificial Intelligence now makes possible.
                </p>
              </div>
            </MorphBlock>

            {/* Hero CTAs */}
            <MorphBlock direction="up" delay={0.25} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a href="#capabilities" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-full bg-[#0046AF] hover:bg-[#00388C] text-white px-8 py-4 rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore 5 Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>

              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="w-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-black px-8 py-4 rounded-full text-sm font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#0046AF]" />
                  <span>Start a Conversation</span>
                </motion.button>
              </Link>
            </MorphBlock>

          </div>
        </div>
      </section>

      {/* 4 Key Pillars Metric Bar (Page 2 of Company Profile) */}
      <section className="w-full border-y border-slate-200/80 bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            {STATS.map((stat, idx) => (
              <MorphBlock key={idx} delay={0.05 * idx} className="flex flex-col items-center text-center px-4 pt-4 sm:pt-0">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046AF] to-blue-600">
                    {stat.value}
                  </span>
                </span>
                <span className="text-sm font-bold text-slate-900 mb-1">
                  {stat.label}
                </span>
                <span className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                  {stat.sub}
                </span>
              </MorphBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section (Page 2 of Company Profile) */}
      <section className="relative w-full py-24 md:py-32 bg-[#0B1528] text-white overflow-hidden border-y border-slate-800">
        {/* Rich Background Imagery Layer matching Home Page Aesthetic */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="/herobackground.jpg" 
            alt="Dubai Enterprise Architecture Background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 filter contrast-125 saturate-120"
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0B1528] via-[#0B1528]/85 to-[#0B1528]"></div>
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[380px] bg-indigo-600/15 blur-[150px] rounded-full"></div>
          <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
          
          {/* Section Heading with High Contrast & Polished Typography */}
          <div className="text-center max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-wide uppercase mb-4 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Corporate Purpose & Strategic Direction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
              Empowering Growth Across the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
                UAE & GCC
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Driven by clear accountability, cutting-edge engineering, and a long-term commitment to simplifying technology for growing businesses.
            </p>
          </div>

          {/* Mission & Vision Twin High-Contrast Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* Our Mission Card */}
            <div className="relative group rounded-3xl p-8 sm:p-10 bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden hover:border-[#0046AF] transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[70px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    Core Purpose
                  </span>
                </div>

                <div className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-2">
                  What Drives Our Daily Work
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight">
                  Our Mission
                </h3>
                
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8">
                  To empower businesses and individuals through innovative technology, professional services, and digital transformation that simplify operations, improve efficiency, and deliver measurable results.
                </p>

                {/* Key Pillars Checklist */}
                <div className="space-y-3 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Measurable ROI & tangible operational productivity</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Zero vendor finger-pointing with unified delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Enterprise-grade architecture scaled for mid-market budgets</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span>Execution Guarantee</span>
                <span className="text-slate-400 font-normal">Agreed fixed scope & timeline</span>
              </div>
            </div>

            {/* Our Vision Card */}
            <div className="relative group rounded-3xl p-8 sm:p-10 bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden hover:border-blue-500/60 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[70px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Eye className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    Strategic Horizon
                  </span>
                </div>

                <div className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-2">
                  Where We Are Heading
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-5 tracking-tight">
                  Our Vision
                </h3>
                
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal mb-8">
                  To become a leading technology and business solutions company across the GCC — and beyond — known for integrated, innovative, and customer-focused delivery.
                </p>

                {/* Key Pillars Checklist */}
                <div className="space-y-3 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Regional GCC benchmark for technology integration</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Native AI & automation built into everyday business ops</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">Long-term advisory relationships built on trust and transparency</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span>Regional Footprint</span>
                <span className="text-slate-400 font-normal">Dubai · Abu Dhabi · Riyadh & GCC</span>
              </div>
            </div>

          </div>

          {/* Regional Alignment Footer Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Aligned with UAE Digital Economy Strategy & Dubai D33</span>
            </div>
            <span className="hidden sm:inline text-slate-600">·</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>In-Country UAE Data Sovereignty Compliance</span>
            </div>
            <span className="hidden sm:inline text-slate-600">·</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>Bilingual Arabic & English Engineering Support</span>
            </div>
          </div>

        </div>
      </section>

      {/* What We Do: Five Capabilities, One Accountable Partner (Pages 2, 3 & 4) */}
      <section id="capabilities" className="w-full py-20 md:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          
          <MorphBlock className="text-center max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              What We Do
            </h2>
            <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0046AF] to-blue-600 mb-4">
              Five capabilities. One accountable partner.
            </p>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Whether you need a single project delivered or an ongoing technology partner, Nexus IT Services' capabilities are designed to work together — so the website we build can be automated with AI, the network we manage can be secured, and the brand we design can be brought to life across every channel.
            </p>
          </MorphBlock>

          {/* Interactive Pillars Navigation */}
          <div className="w-full flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Featured Display */}
          <div className="w-full max-w-4xl mb-16">
            <AnimatePresence mode="wait">
              {PILLARS.map((pillar, idx) => {
                if (idx !== activePillar) return null;
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl border border-slate-200/90 bg-[#F8FAFC] p-6 sm:p-10 shadow-sm relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-md shrink-0`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Pillar 0{idx + 1}
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold border ${pillar.badgeBg} self-start md:self-auto`}>
                        {pillar.subtitle}
                      </span>
                    </div>

                    <div className="mt-8">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                        Included Services & Capabilities
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {pillar.items.map((item, itemIdx) => (
                          <div 
                            key={itemIdx} 
                            className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/70 shadow-2xs"
                          >
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0046AF] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="text-sm font-semibold text-slate-800 leading-snug">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 text-center sm:text-left">
                        Need this delivered standalone or integrated with other systems?
                      </span>
                      <Link to="/services">
                        <span className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <span>View detailed service specifications</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* All 5 Pillars Grid Preview */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      isSelected ? 'bg-white/10 text-blue-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mb-1">0{idx + 1}</div>
                    <h4 className="text-sm font-bold leading-tight mb-2">
                      {pillar.title}
                    </h4>
                  </div>
                  <span className={`text-[11px] font-medium leading-relaxed mt-2 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {pillar.subtitle}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Why Businesses Choose Nexus IT Services (Page 4 of Company Profile) */}
      <section className="w-full py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <MorphBlock className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Why Businesses Choose Nexus IT Services
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We remove the complexity of modern technology so you can focus on running your business.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = item.icon;
              return (
                <MorphBlock key={idx} delay={0.07 * idx} enableHover className="h-full">
                  <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-2xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                          {item.highlight}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </MorphBlock>
              );
            })}
          </div>

        </div>
      </section>

      {/* How We Work: 4-Stage Transparent Process (Page 4 of Company Profile) */}
      <section className="w-full py-20 md:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <MorphBlock className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0046AF] text-xs font-semibold mb-3">
              <span>Predictable 4-Stage Framework</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              How We Work
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              A simple, transparent 4-stage process from first conversation to ongoing support.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-5">
            {WORK_PROCESS.map((step, idx) => (
              <MorphBlock key={idx} delay={0.08 * idx} enableHover className="h-full">
                <div className="bg-[#F8FAFC] p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-[#0046AF] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs">
                        0{step.step}
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-blue-800 bg-blue-100/70 px-1.5 sm:px-2 py-0.5 rounded-full">
                        {step.tag}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 mb-1 sm:mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-600 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </MorphBlock>
            ))}
          </div>

        </div>
      </section>

      {/* Industries We Serve + 90-Day UAE Market Entrant Callout (Page 5 of Company Profile) */}
      <section className="w-full py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <MorphBlock className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Industries We Serve
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Our services are built to flex across sectors — with deep familiarity in the industries driving the UAE's growth.
            </p>
          </MorphBlock>

          {/* Industry Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <MorphBlock key={idx} delay={0.04 * idx}>
                  <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-slate-800 text-sm font-bold hover:border-blue-400 hover:text-blue-600 transition-colors">
                    <Icon className="w-4 h-4 text-[#0046AF]" />
                    <span>{ind.name}</span>
                  </div>
                </MorphBlock>
              );
            })}
          </div>

          {/* Special Feature Box: New to UAE Market? (From Page 5) */}
          <MorphBlock delay={0.2} className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
                    <Sparkles className="w-3 h-3" />
                    <span>UAE Free Zone & Mainland Special Program</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    New to the UAE Market?
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Nexus IT Services FZ-LLC also supports newly formed companies and free zone entrants with the digital foundations — website, branding, systems, and socials — needed in the first 90 days of operation.
                  </p>
                </div>
                
                <Link to="/contact" className="shrink-0">
                  <motion.button 
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#0046AF] hover:bg-[#00388C] text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request 90-Day Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </MorphBlock>

        </div>
      </section>

      {/* Our Values (Page 5 of Company Profile) */}
      <section className="w-full py-20 md:py-28 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <MorphBlock className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              The foundational principles that govern our client relationships and engineering standards.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <MorphBlock key={idx} delay={0.06 * idx} enableHover className="h-full">
                  <div className="bg-[#F8FAFC] p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all h-full flex flex-col justify-between">
                    <div>
                      <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-2.5 sm:mb-4 shadow-2xs">
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${val.color}`} />
                      </div>
                      <h3 className="text-xs sm:text-lg font-bold text-slate-900 mb-1 sm:mb-2 leading-tight">
                        {val.title}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-slate-600 leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </MorphBlock>
              );
            })}
          </div>

        </div>
      </section>

      {/* Dubai Physical Presence & Engineering Culture */}
      <AboutDubaiShowcase />

      {/* Let's Build Something Together CTA (Page 5 of Company Profile) */}
      <section className="w-full py-20 md:py-28 bg-[#0B1728] text-white relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <MorphBlock className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
              <span>Dubai, United Arab Emirates</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Let's Build Something Together
            </h2>
            
            <p className="text-xl md:text-2xl font-semibold text-blue-300 mb-4">
              Ready to simplify your technology and unlock what AI can do for your business?
            </p>
            
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mb-10">
              Whether you need a single project delivered, an ongoing technology partner, or a strategic advisor for your digital transformation, Nexus IT Services FZ-LLC is ready to start with a conversation about your goals.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#0046AF] hover:bg-[#00388C] text-white px-8 py-4 rounded-full text-sm font-bold shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link to="/services" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 px-8 py-4 rounded-full text-sm font-bold backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Explore Our Capabilities</span>
                </motion.button>
              </Link>
            </div>
          </MorphBlock>
        </div>
      </section>

    </div>
  );
}
