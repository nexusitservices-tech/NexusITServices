import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Globe, Smartphone, Settings, Cpu, Bot, ArrowRight,
  CheckCircle2, Layers, Zap, Server, Shield, Database, RefreshCw,
  Search, ShieldCheck, ChevronDown, Activity, Sparkles, Terminal,
  Workflow, ArrowUpRight, HelpCircle, Check, Users, Building2,
  ExternalLink, BarChart3, Lock, Rocket, Cloud, GitBranch,
  Monitor, Compass, AlertCircle, Laptop, Shuffle, Share2
} from 'lucide-react';
import { MorphBlock } from '@/components/ui/MorphBlock';
import { Typewriter } from '@/components/ui/Typewriter';

export default function SoftwareDevelopmentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'operations' | 'portal' | 'ai'>('operations');
  const [activeArchLayer, setActiveArchLayer] = useState<'experience' | 'application' | 'intelligence' | 'data' | 'infrastructure'>('application');
  const [activeProblemId, setActiveProblemId] = useState<number>(0);
  const [activeTechTab, setActiveTechTab] = useState<'frontend' | 'backend' | 'data' | 'cloud' | 'ai' | 'dev' | 'integration'>('frontend');
  const [legacyTab, setLegacyTab] = useState<'modernize' | 'integrate' | 'optimize' | 'migrate' | 'extend'>('modernize');

  // Quick anchor scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { label: 'Overview', id: 'software-overview' },
    { label: 'Capabilities', id: 'capabilities' },
    { label: 'Showcase', id: 'product-showcase' },
    { label: 'Architecture', id: 'software-architecture' },
    { label: 'Process', id: 'dev-process' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Problem Matcher', id: 'problem-matcher' },
    { label: 'AI-Native', id: 'ai-native' },
    { label: 'Security', id: 'security-reliability' },
    { label: 'Integrations', id: 'integrations' },
    { label: 'Legacy Modernization', id: 'legacy-systems' },
    { label: 'FAQ', id: 'software-faq' },
  ];

  // 03. Capabilities Data
  const capabilities = [
    {
      icon: Globe,
      title: 'Web Development',
      badge: 'Front-Facing Experiences',
      desc: 'Responsive websites and sophisticated web experiences built for performance, usability, search visibility, and conversion.',
      includes: [
        'Corporate websites',
        'Business websites',
        'Web portals',
        'Landing pages',
        'Customer platforms',
        'CMS solutions',
        'Membership platforms'
      ],
      tag: 'Next.js & React'
    },
    {
      icon: Laptop,
      title: 'Web Applications',
      badge: 'Complex Workflows',
      desc: 'Custom applications that turn complex business processes into intuitive digital workflows.',
      includes: [
        'Business applications',
        'Customer portals',
        'Admin platforms',
        'Internal tools',
        'Dashboards',
        'Workflow systems',
        'SaaS platforms'
      ],
      tag: 'Full-Stack Apps'
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      badge: 'iOS & Android Native/Cross',
      desc: 'Mobile experiences designed around the needs of customers, employees, or business operations.',
      includes: [
        'Customer apps',
        'Business apps',
        'Internal workforce apps',
        'Cross-platform applications',
        'Mobile dashboards',
        'API-connected applications'
      ],
      tag: 'React Native & Flutter'
    },
    {
      icon: Settings,
      title: 'Business Software',
      badge: 'Operational Core',
      desc: 'Replace disconnected spreadsheets and manual processes with software built around your operation.',
      includes: [
        'CRM systems',
        'Business management platforms',
        'Booking systems',
        'Inventory systems',
        'Order management',
        'Employee portals',
        'Workflow platforms'
      ],
      tag: 'Custom ERP & Operations'
    },
    {
      icon: Workflow,
      title: 'APIs & Integrations',
      badge: 'Ecosystem Glue',
      desc: 'Connect the systems your business already depends on with secure high-throughput data bridges.',
      includes: [
        'REST APIs',
        'Third-party integrations',
        'Payment integrations',
        'CRM integrations',
        'ERP integrations',
        'Webhooks',
        'Data synchronization'
      ],
      tag: 'Microservices & Webhooks'
    },
    {
      icon: Bot,
      title: 'AI-Powered Applications',
      badge: 'Embedded Intelligence',
      desc: 'Bring intelligence directly into your software for automated decision support and instant user responses.',
      includes: [
        'AI assistants',
        'Intelligent search',
        'Document processing',
        'AI recommendations',
        'Automated workflows',
        'Conversational interfaces',
        'AI-powered analytics'
      ],
      tag: 'LLMs & Agents'
    }
  ];

  // 04. Visual Product Showcase
  const showcaseProducts = {
    operations: {
      tag: 'Product 01 — Business Operations',
      title: 'Business Management Platform',
      caption: 'A connected workspace for managing customers, operations, workflows, and business performance.',
      image: '/assets/software/business-platform-dashboard.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
      features: [
        { label: 'KPI Dashboard', detail: 'Real-time revenue, margins, and operational burn rates' },
        { label: 'Customer 360', detail: 'Consolidated client history, contracts, and touchpoints' },
        { label: 'Sales & Invoicing', detail: 'Multi-currency AED/USD quotation and milestone billing' },
        { label: 'Task Execution', detail: 'Kanban sprints, team bandwidth, and automated SLAs' }
      ]
    },
    portal: {
      tag: 'Product 02 — Customer Experience',
      title: 'Customer Portal',
      caption: 'Give customers a secure digital environment to interact with your business.',
      image: '/assets/software/customer-portal.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85',
      features: [
        { label: 'Customer Account', detail: 'Role-based authentication, MFA, and company profiles' },
        { label: 'Order Tracking', detail: 'Live shipment and service milestone delivery status' },
        { label: 'Self-Service Support', detail: 'Ticketing, file exchange, and direct manager chat' },
        { label: 'Instant Notifications', detail: 'Automated SMS, email, and WhatsApp dispatch' }
      ]
    },
    ai: {
      tag: 'Product 03 — Intelligent Operations',
      title: 'AI-Powered Business System',
      caption: 'Combine business data, automation, and AI to help teams work faster and make better-informed decisions.',
      image: '/assets/software/ai-business-dashboard.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
      features: [
        { label: 'AI Executive Assistant', detail: 'Natural language queries over your live databases' },
        { label: 'Automated Workflows', detail: 'Zero-touch lead routing, invoicing, and contract checks' },
        { label: 'Predictive Analytics', detail: 'Demand forecasting and churn anomaly alerts' },
        { label: 'Live Activity Stream', detail: 'Real-time audit log with automated risk scoring' }
      ]
    }
  };

  // 08. Problem Matcher Data
  const problemScenarios = [
    {
      id: 0,
      buyerWords: '“We need to manage customers.”',
      solutionTitle: 'CRM / Customer Management Platform',
      category: 'Sales & Relationships',
      description: 'A dedicated platform to track leads, pipeline stages, client communication logs, and contracts tailored exactly to your sales cycle rather than rigid off-the-shelf software.',
      deliverables: ['Custom deal stages', 'Contact timelines', 'Automated reminders', 'WhatsApp & Email sync']
    },
    {
      id: 1,
      buyerWords: '“Our team relies on spreadsheets.”',
      solutionTitle: 'Custom Business Application',
      category: 'Operational Systems',
      description: 'Convert scattered Excel sheets into a relational, multi-user system with role-based access control, automated validation, audit histories, and instant reporting.',
      deliverables: ['Relational database', 'Input validation', 'User roles & permissions', 'Exportable BI reports']
    },
    {
      id: 2,
      buyerWords: '“Customers need to access their information.”',
      solutionTitle: 'Customer Portal',
      category: 'Self-Service & Retention',
      description: 'A white-labeled self-service client dashboard where customers view statements, download reports, submit requests, and pay invoices without calling support.',
      deliverables: ['Secure customer login', 'Invoice payment gateway', 'Document repository', 'Ticket dispatch']
    },
    {
      id: 3,
      buyerWords: '“We have several systems that don’t communicate.”',
      solutionTitle: 'API & System Integration',
      category: 'Interoperability',
      description: 'Custom middleware and REST/GraphQL APIs that automatically synchronize inventory, customer records, and orders across your ERP, CRM, and accounting tools.',
      deliverables: ['Bi-directional webhooks', 'Data normalization', 'Failure retries & logging', 'Real-time queues']
    },
    {
      id: 4,
      buyerWords: '“Our employees repeat the same tasks every day.”',
      solutionTitle: 'Workflow Automation',
      category: 'Efficiency & Time',
      description: 'Automated digital triggers that eliminate manual copy-pasting, invoice generation, approval chains, and report emailing.',
      deliverables: ['Trigger-based actions', 'Multi-step approval loops', 'Error alerts', 'Time-saved metrics']
    },
    {
      id: 5,
      buyerWords: '“We need an online platform.”',
      solutionTitle: 'Web Application / SaaS Platform',
      category: 'Digital Product',
      description: 'Scalable subscription platforms with multi-tenant architectures, payment processing, user onboarding, and granular usage analytics.',
      deliverables: ['Multi-tenancy', 'Stripe/Local checkout', 'Onboarding flows', 'Telemetry dashboard']
    },
    {
      id: 6,
      buyerWords: '“We want AI inside our business.”',
      solutionTitle: 'AI-Powered Application',
      category: 'Applied Intelligence',
      description: 'Embedding generative AI and machine learning directly into your operational systems for document classification, semantic search, and predictive routing.',
      deliverables: ['Private vector embeddings', 'Document parser', 'Smart chatbot', 'Natural language BI']
    },
    {
      id: 7,
      buyerWords: '“We need a mobile experience.”',
      solutionTitle: 'Mobile Application',
      category: 'Workforce & Consumer',
      description: 'Offline-first, high-performance iOS and Android apps with biometric login, push notifications, and camera integration for field teams or end customers.',
      deliverables: ['iOS App Store & Android build', 'Push notifications', 'Offline sync', 'Biometric auth']
    }
  ];

  // 14. Project Types Table
  const projectTypes = [
    { type: 'Corporate Websites', typicalUse: 'Authoritative digital presence, brand leadership & conversion', tech: 'Next.js, Tailwind, Headless CMS' },
    { type: 'E-Commerce Platforms', typicalUse: 'High-volume online selling, multi-currency checkout & warehouse sync', tech: 'Custom React Storefront, Stripe/Checkout' },
    { type: 'Web Applications', typicalUse: 'Complex internal operations, workflow management & data processing', tech: 'React, Node.js, PostgreSQL, Redis' },
    { type: 'Mobile Applications', typicalUse: 'Customer engagement, field workforce management & push interaction', tech: 'React Native, Expo, Swift/Kotlin' },
    { type: 'CRM Systems', typicalUse: 'Custom deal funnels, client communications & automated pipeline tracking', tech: 'TypeScript, PostgreSQL, Tailored UI' },
    { type: 'Business Platforms', typicalUse: 'End-to-end operational management, resource allocation & BI', tech: 'Microservices, REST, Python/Node' },
    { type: 'Customer Portals', typicalUse: 'Secure self-service account management, statements & ticketing', tech: 'Next.js, JWT/OAuth, Cloud Storage' },
    { type: 'SaaS Products', typicalUse: 'Commercial subscription platforms with multi-tenancy & billing', tech: 'Multi-tenant architecture, Stripe Billing' },
    { type: 'APIs & Integrations', typicalUse: 'Synchronizing disparate ERPs, banks, logistics, and legacy databases', tech: 'Node.js, Docker, Webhooks, GraphQL' },
    { type: 'AI Applications', typicalUse: 'Automated document processing, intelligent assistants & smart routing', tech: 'Gemini, Vector DBs, Fastify' }
  ];

  // 20. FAQ Items
  const faqs = [
    {
      q: 'How much does custom software development cost?',
      a: 'Cost depends on project scope, architectural complexity, required integrations, user concurrency, and whether native mobile apps or AI workflows are included. Rather than vague open-ended hourly billing, NEXUS conducts a preliminary discovery session to provide a transparent, fixed-milestone statement of work (SOW) with exact deliverables and milestone timelines in AED.'
    },
    {
      q: 'Can NEXUS develop software from an idea?',
      a: 'Yes. We frequently partner with founders and enterprise leaders at the conceptual phase. We take your business vision through structured UX/UI wireframing, technical architecture design, database modeling, MVP development, rigorous testing, and cloud deployment, continuing through growth-phase engineering.'
    },
    {
      q: 'Can you improve an existing application?',
      a: 'Absolutely. You do not always have to throw away prior investments. We conduct code audits, UI modernization, database query optimization, API integrations, and cloud migrations that extend the longevity of existing systems without starting over.'
    },
    {
      q: 'Can you integrate our existing systems?',
      a: 'Yes. Connecting fragmented tools is one of our primary specialties. We engineer custom REST and GraphQL APIs, webhooks, and secure database bridges to connect ERPs (SAP, Oracle, Odoo), CRMs (Salesforce, HubSpot), payment gateways, and inventory software.'
    },
    {
      q: 'Do you provide maintenance after launch?',
      a: 'Yes. Software is a living asset. We offer structured monthly Dedicated Development and Software Partnership models covering 24/7 SLA monitoring, feature additions, dependency updates, security patching, and ongoing performance tuning.'
    },
    {
      q: 'Can you add AI to existing software?',
      a: 'Yes. We specialize in embedding practical AI capabilities—such as document extraction, semantic search across business databases, natural language assistants, and smart categorization—directly into your active software stack via modern AI APIs without breaking your current workflows.'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* ──────────────────────────────────────────────────────────
          STICKY ANCHOR SUB-NAVIGATION BAR
      ────────────────────────────────────────────────────────── */}
      <div className="sticky top-16 lg:top-20 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs font-semibold text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-[#0046AF] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          01. HERO — SOFTWARE THAT MOVES BUSINESS FORWARD
      ────────────────────────────────────────────────────────── */}
      <section id="software-overview" className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-white border-b border-slate-200">
        {/* Subtle Brand Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#0046AF]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            {/* Eyebrow */}
            <MorphBlock direction="up" delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0046AF] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0046AF]" />
                <span>NEXUS SOFTWARE DEVELOPMENT</span>
              </div>
            </MorphBlock>

            {/* Headline */}
            <MorphBlock direction="up" delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
                Software Built Around <br className="hidden sm:inline" />
                <span className="text-[#0046AF]">Your Business.</span>
              </h1>
            </MorphBlock>

            {/* Supporting Copy */}
            <MorphBlock direction="up" delay={0.15}>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
                We design and develop websites, web applications, mobile apps, business platforms, APIs, and custom software that solve real operational problems and give businesses the technology they need to grow.
              </p>
            </MorphBlock>

            {/* CTAs */}
            <MorphBlock direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0046AF] hover:bg-blue-800 text-white font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer">
                    <span>Start a Software Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <button
                  onClick={() => scrollToSection('capabilities')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base transition-all border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Capabilities</span>
                </button>
              </div>
            </MorphBlock>
          </div>

          {/* Hero Visual — Sophisticated B2B SaaS Product Mockup */}
          <MorphBlock direction="up" delay={0.25} className="mt-8">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-2 sm:p-4 group">
              {/* Window Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/60 rounded-t-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    nexus-os://platform.enterprise.app/workspace
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Live System Active
                  </span>
                  <span className="text-xs font-mono text-slate-500">v4.2.0 • Microservices</span>
                </div>
              </div>

              {/* Main Dashboard Representation */}
              <div className="relative min-h-[380px] sm:min-h-[500px] w-full overflow-hidden rounded-b-2xl">
                <img
                  src="/assets/software/software-hero-dashboard.webp"
                  alt="NEXUS B2B SaaS Product Interface Dashboard"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=85';
                  }}
                  className="w-full h-full object-cover object-top opacity-60 filter contrast-105"
                />

                {/* Ambient Dark Gradient Overlays for High Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 pointer-events-none" />

                {/* Floating Interactive Live Cards Over the Image */}
                <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between pointer-events-none">
                  {/* Top Floating Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
                    <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg">
                      <div className="text-[11px] font-mono uppercase text-slate-400">System Uptime</div>
                      <div className="text-lg sm:text-2xl font-bold text-white mt-1">99.99%</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" /> UAE me-central-1
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg">
                      <div className="text-[11px] font-mono uppercase text-slate-400">API Response</div>
                      <div className="text-lg sm:text-2xl font-bold text-white mt-1">&lt; 42 ms</div>
                      <div className="text-[10px] text-blue-400 flex items-center gap-1 mt-0.5">
                        <Activity className="w-3 h-3" /> Global edge CDN
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg">
                      <div className="text-[11px] font-mono uppercase text-slate-400">Workflows Processed</div>
                      <div className="text-lg sm:text-2xl font-bold text-white mt-1">1.4M / mo</div>
                      <div className="text-[10px] text-indigo-400 flex items-center gap-1 mt-0.5">
                        <Zap className="w-3 h-3" /> Zero manual handoff
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-lg">
                      <div className="text-[11px] font-mono uppercase text-slate-400">Security Posture</div>
                      <div className="text-lg sm:text-2xl font-bold text-white mt-1">Zero Trust</div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3 h-3" /> SOC2 & TDRA aligned
                      </div>
                    </div>
                  </div>

                  {/* Bottom Feature Callout */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-6">
                    <div className="max-w-md p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0046AF] text-blue-400 mb-1">
                        <Terminal className="w-4 h-4" />
                        <span>Connected Architecture Engine</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Single codebase managing multi-channel apps, real-time client portals, and secure enterprise ERP synchronizations.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
                      <span>Commercial Story:</span>
                      <span className="text-white font-semibold">Idea → Architecture → Product → Integration → Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MorphBlock>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          02. OPENING VALUE PROPOSITION
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Value Proposition
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              From Business Problem to Working Software.
            </h2>
            <div className="text-base sm:text-lg text-slate-700 leading-relaxed space-y-3">
              <p className="text-xl font-semibold text-slate-900">
                Most businesses don't need more software. They need <span className="text-[#0046AF]">better software</span>.
              </p>
              <p className="text-slate-600">
                NEXUS turns business requirements, operational challenges, and growth opportunities into practical digital products and systems that are designed around how your organization actually works.
              </p>
            </div>
          </MorphBlock>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MorphBlock delay={0.08} enableHover className="h-full">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#0046AF]/40 hover:bg-white transition-all h-full flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0046AF] mb-6 shadow-2xs">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-bold uppercase text-[#0046AF] mb-1">Phase 01</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Understand</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We begin with your business, users, processes, and objectives before writing a single line of code.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-500">
                  Business Analysis & Discovery
                </div>
              </div>
            </MorphBlock>

            <MorphBlock delay={0.16} enableHover className="h-full">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#0046AF]/40 hover:bg-white transition-all h-full flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0046AF] mb-6 shadow-2xs">
                    <Code className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-bold uppercase text-[#0046AF] mb-1">Phase 02</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Engineer</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We design the architecture, interfaces, integrations, and technology required for clean, maintainable scaling.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-500">
                  Full-Stack Product Engineering
                </div>
              </div>
            </MorphBlock>

            <MorphBlock delay={0.24} enableHover className="h-full">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#0046AF]/40 hover:bg-white transition-all h-full flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0046AF] mb-6 shadow-2xs">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-bold uppercase text-[#0046AF] mb-1">Phase 03</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Evolve</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We continue improving the product with new capabilities, integrations, and optimizations as your business expands.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-500">
                  Continuous Growth & Iteration
                </div>
              </div>
            </MorphBlock>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          03. SOFTWARE DEVELOPMENT CAPABILITIES
      ────────────────────────────────────────────────────────── */}
      <section id="capabilities" className="w-full py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              One Development Partner. Multiple Digital Products.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether building an outward customer application, an internal operations hub, or integrating disparate business tools, NEXUS provides end-to-end engineering excellence.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <MorphBlock key={i} delay={i * 0.06} enableHover className="h-full">
                  <div className="p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 hover:bg-white/[0.14] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,70,175,0.14)] transition-all duration-300 h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0046AF] group-hover:bg-[#0046AF] group-hover:text-white transition-all shadow-2xs">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase text-[#0046AF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                          {cap.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#0046AF] transition-colors">
                        {cap.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                        {cap.desc}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Includes:</div>
                        <ul className="space-y-1.5">
                          {cap.includes.map((item, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#0046AF] shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0046AF] hover:underline">
                        <span>Discuss this product</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </MorphBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          04. VISUAL PRODUCT SHOWCASE
      ────────────────────────────────────────────────────────── */}
      <section id="product-showcase" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Visual Product Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Software You Can Actually Use.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore real-world software modules engineered by NEXUS. See how user interfaces, workflows, and actionable business intelligence come together.
            </p>
          </MorphBlock>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveShowcaseTab('operations')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeShowcaseTab === 'operations'
                  ? 'bg-[#0046AF] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Product 01: Business Operations
            </button>
            <button
              onClick={() => setActiveShowcaseTab('portal')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeShowcaseTab === 'portal'
                  ? 'bg-[#0046AF] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Product 02: Customer Experience
            </button>
            <button
              onClick={() => setActiveShowcaseTab('ai')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeShowcaseTab === 'ai'
                  ? 'bg-[#0046AF] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Product 03: Intelligent Operations (AI)
            </button>
          </div>

          {/* Active Product Panel */}
          {(() => {
            const current = showcaseProducts[activeShowcaseTab];
            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden relative">
                {/* Visual Left/Top */}
                <div className="lg:col-span-7">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
                    <img
                      src={current.image}
                      alt={current.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = current.fallbackImage;
                      }}
                      className="w-full h-auto max-h-[440px] object-cover object-top filter contrast-105 group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                      <span className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
                        {current.tag}
                      </span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> High Performance UI
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Right */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                      {current.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 mb-3">
                      {current.title}
                    </h3>
                    <blockquote className="p-4 rounded-2xl bg-slate-800/80 border-l-4 border-[#0046AF] text-sm text-slate-200 leading-relaxed italic">
                      “{current.caption}”
                    </blockquote>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">Features Included:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {current.features.map((feat, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            {feat.label}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1 leading-normal">
                            {feat.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link to="/contact">
                      <button className="px-6 py-3 rounded-xl bg-[#0046AF] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer">
                        <span>Deploy this architecture</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          05. THE NEXUS SOFTWARE ARCHITECTURE
      ────────────────────────────────────────────────────────── */}
      <section id="software-architecture" className="w-full py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2">
              System Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Built as a Connected System.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              This is where NEXUS differentiates itself from ordinary web agencies. We architect multi-tier enterprise systems engineered for resilience, data flow, and frictionless business automation.
            </p>
          </MorphBlock>

          {/* Interactive Architecture Flow Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Diagram Stack Left */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  id: 'experience',
                  title: '01. EXPERIENCE LAYER',
                  subtitle: 'Web • Mobile Apps • Customer Portals',
                  desc: 'What users see and interact with. High-performance, low-latency, responsive interfaces crafted in Next.js, React, and Flutter with zero layout shift.',
                  tag: 'Frontend & UI Client',
                  color: 'border-blue-500 bg-blue-500/10'
                },
                {
                  id: 'application',
                  title: '02. APPLICATION LAYER',
                  subtitle: 'Business Logic • Workflow Engines • Rules',
                  desc: 'The business logic that powers the product. Custom backend microservices enforcing your company processes, calculation engines, and role permissions.',
                  tag: 'Core Execution Engine',
                  color: 'border-indigo-500 bg-indigo-500/10'
                },
                {
                  id: 'intelligence',
                  title: '03. INTELLIGENCE & INTEGRATION LAYER',
                  subtitle: 'REST / GraphQL APIs • AI Models • Webhooks',
                  desc: 'APIs and services connecting your ecosystem with embedded machine intelligence, conversational agents, and automated decision support.',
                  tag: 'AI & Data Bridges',
                  color: 'border-cyan-500 bg-cyan-500/10'
                },
                {
                  id: 'data',
                  title: '04. DATA LAYER',
                  subtitle: 'PostgreSQL • Redis • Document Stores • Audits',
                  desc: 'The information your business depends on. ACID-compliant relational schemas, sub-millisecond caching layers, and encrypted data partitions.',
                  tag: 'Persistence & Integrity',
                  color: 'border-purple-500 bg-purple-500/10'
                },
                {
                  id: 'infrastructure',
                  title: '05. CLOUD & INFRASTRUCTURE LAYER',
                  subtitle: 'AWS / Azure UAE • Docker • CI/CD • Zero Trust',
                  desc: 'The cloud, servers, security, automated deployment pipelines, and 24/7 telemetry monitoring underneath it all.',
                  tag: 'Sovereign UAE Hosting',
                  color: 'border-emerald-500 bg-emerald-500/10'
                }
              ].map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => setActiveArchLayer(layer.id as any)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    activeArchLayer === layer.id
                      ? `${layer.color} border-2 shadow-lg shadow-blue-500/5`
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold tracking-wider text-blue-400">
                      {layer.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-md">
                      {layer.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{layer.subtitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{layer.desc}</p>
                </div>
              ))}
            </div>

            {/* Architecture Explanation Card Right */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 sticky top-32">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                Layer Breakdown
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Every layer has a purpose.
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div>
                  <strong className="text-white block mb-0.5">Experience</strong>
                  What users see and interact with, optimized for conversion, tactile feedback, and accessibility.
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Application</strong>
                  The business logic that powers the product, transforming raw user inputs into verified transactions.
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Integration</strong>
                  The APIs and services that connect your software to ERPs, CRM, payment processors, and logistics.
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Intelligence</strong>
                  AI, automation, semantic search, analytics, and autonomous decision support.
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Data</strong>
                  The resilient, backup-synchronized information your organization relies on.
                </div>
                <div>
                  <strong className="text-white block mb-0.5">Infrastructure</strong>
                  The cloud, servers, security, continuous deployment, and monitoring underneath it all.
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Aligned with UAE Data Sovereignty (AWS me-central-1 & Azure UAE North)</span>
                </div>
                <Link to="/contact">
                  <button className="w-full py-3 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-bold text-xs transition-colors cursor-pointer">
                    Request Architecture Blueprint
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          06. DEVELOPMENT PROCESS
      ────────────────────────────────────────────────────────── */}
      <section id="dev-process" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Engineering Framework
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              From Idea to Production.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We follow a disciplined 6-stage engineering lifecycle that removes ambiguity, prevents budget creep, and guarantees enterprise code quality.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: '01',
                title: 'Discover',
                desc: 'Understand your business, users, workflows, objectives, and technical requirements.',
                deliverables: ['Requirements specification', 'User journey mapping', 'Technical feasibility report', 'Fixed project scope & SOW']
              },
              {
                step: '02',
                title: 'Architect',
                desc: 'Translate requirements into a scalable, high-throughput technical architecture.',
                deliverables: ['System architecture diagram', 'Data schema modeling', 'Technology stack selection', 'Third-party integration plan']
              },
              {
                step: '03',
                title: 'Design',
                desc: 'Create the experience before engineering the product. Validate with real workflows.',
                deliverables: ['UX architecture', 'Figma wireframes', 'Design systems & typography', 'Clickable interactive prototype'],
                hasImageBadge: true
              },
              {
                step: '04',
                title: 'Build',
                desc: 'Develop the product using structured, maintainable, and audited engineering practices.',
                deliverables: ['Frontend interface', 'Backend microservices', 'Database configuration', 'Automated unit & E2E testing']
              },
              {
                step: '05',
                title: 'Deploy',
                desc: 'Move the product into a controlled, zero-downtime production environment.',
                deliverables: ['Cloud deployment in UAE', 'Environment configuration', 'Security penetration testing', 'Telemetry & alerting setup']
              },
              {
                step: '06',
                title: 'Improve',
                desc: 'Software is not finished when it launches. We provide ongoing evolution and feature sprints.',
                deliverables: ['Performance optimization', 'Feature backlog delivery', 'Security patches & updates', 'AI capability additions']
              }
            ].map((stage, i) => (
              <MorphBlock key={i} delay={i * 0.08} enableHover className="h-full">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#0046AF]/40 hover:bg-white transition-all h-full flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-[#0046AF] font-bold flex items-center justify-center text-sm shadow-2xs">
                        {stage.step}
                      </span>
                      {stage.hasImageBadge && (
                        <span className="text-[10px] font-mono text-[#0046AF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                          UI/UX Prototype
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{stage.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{stage.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60">
                    <div className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-2">Deliverables:</div>
                    <ul className="space-y-1">
                      {stage.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="text-xs text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0046AF] shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MorphBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          07. TECHNOLOGY STACK
      ────────────────────────────────────────────────────────── */}
      <section id="tech-stack" className="w-full py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Engineering Stack
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Powerful Technology. Purposeful Engineering.
            </h2>
            <blockquote className="p-4 rounded-2xl bg-white border-l-4 border-[#0046AF] text-sm sm:text-base font-semibold text-slate-800 shadow-2xs mb-4">
              “Technology should serve the architecture — not the other way around.”
            </blockquote>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We select mature, supported, and battle-tested technologies that balance developer velocity with enterprise maintainability and long-term security.
            </p>
          </MorphBlock>

          {/* Technology Layer Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: 'Frontend',
                desc: 'Client-side performance, accessible DOM, and instant hydration.',
                techs: ['React', 'Next.js', 'TypeScript', 'JavaScript (ESNext)', 'Tailwind CSS', 'Framer Motion'],
                badge: 'UI & Interaction'
              },
              {
                category: 'Backend',
                desc: 'High-concurrency servers, validation engines, and business logic.',
                techs: ['Node.js', 'Python', 'PHP / Laravel', 'REST APIs', 'Fastify / Express', 'GraphQL'],
                badge: 'Application Tier'
              },
              {
                category: 'Data & Persistence',
                desc: 'Structured, relational, and real-time database management.',
                techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase / Firestore', 'Redis Caching', 'Prisma ORM'],
                badge: 'Storage & ACID'
              },
              {
                category: 'Cloud & DevOps',
                desc: 'Sovereign UAE hosting, containerized microservices, and metrics.',
                techs: ['AWS me-central-1', 'Azure UAE North', 'Linux / Ubuntu', 'Docker', 'Nginx', 'Datadog / CloudWatch'],
                badge: 'Infrastructure'
              },
              {
                category: 'AI & Intelligence',
                desc: 'Generative intelligence, vector search, and automated workflows.',
                techs: ['Gemini 2.5/3.0', 'LangChain', 'Vector DBs (pgvector)', 'Document OCR', 'AI Agents', 'OpenAI'],
                badge: 'Machine Intelligence'
              },
              {
                category: 'Integrations & Ecosystem',
                desc: 'Connecting enterprise applications, payment gateways, and ERPs.',
                techs: ['Stripe / Local Pay', 'Salesforce / HubSpot', 'Odoo / SAP Webhooks', 'SendGrid', 'Twilio', 'WhatsApp Cloud API'],
                badge: 'Connected Systems'
              }
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{st.category}</h3>
                  <span className="text-[10px] font-mono text-[#0046AF] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {st.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">{st.desc}</p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                  {st.techs.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          08. BUILT FOR REAL BUSINESS PROBLEMS
      ────────────────────────────────────────────────────────── */}
      <section id="problem-matcher" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Buyer Guide
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              What Should We Build?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Customers usually know their <strong>operational problem</strong>, not necessarily the technical taxonomy of the solution. Click your current challenge below to view the exact software architecture we deploy.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Scenarios Buttons Left */}
            <div className="lg:col-span-5 space-y-2.5">
              {problemScenarios.map((prob) => (
                <button
                  key={prob.id}
                  onClick={() => setActiveProblemId(prob.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    activeProblemId === prob.id
                      ? 'bg-[#0046AF] text-white border-[#0046AF] shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-bold">{prob.buyerWords}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ml-2 transition-transform ${activeProblemId === prob.id ? 'translate-x-1' : 'opacity-40'}`} />
                </button>
              ))}
            </div>

            {/* Solution Card Right */}
            {(() => {
              const active = problemScenarios[activeProblemId];
              return (
                <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono mb-4 border border-blue-500/30">
                    <span>Category: {active.category}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Recommended Solution: <span className="text-blue-400">{active.solutionTitle}</span>
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {active.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 mb-6">
                    <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">Key Core Deliverables:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {active.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact">
                    <button className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer">
                      <span>Scope this project with NEXUS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          09. AI-NATIVE DEVELOPMENT
      ────────────────────────────────────────────────────────── */}
      <section id="ai-native" className="w-full py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2">
              Artificial Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Don't Add AI Because It's Trending.<br />
              <span className="text-blue-400">Build Intelligence Where It Creates Value.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              NEXUS integrates artificial intelligence directly into applications and business workflows where it produces measurable operational time savings and strategic advantages.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Assistants',
                desc: 'Help users interact with your business systems using natural Arabic and English conversation.',
                use: 'Instant order lookups, task creation, and internal policy answers'
              },
              {
                title: 'Intelligent Search',
                desc: 'Semantic vector search across structured records, PDFs, invoices, and contracts.',
                use: 'Find relevant information instantly without exact keyword matching'
              },
              {
                title: 'Document Intelligence',
                desc: 'Extract, classify, summarize, and process inbound trade documents and scanned receipts.',
                use: 'Automated invoice data entry and contract risk summaries'
              },
              {
                title: 'Automated Decisions',
                desc: 'Support workflows with intelligent classification, lead scoring, and automated task routing.',
                use: 'Assign tickets to the right UAE specialist in seconds'
              },
              {
                title: 'AI Workflows',
                desc: 'Connect AI capabilities to existing legacy ERPs and CRM business processes.',
                use: 'Multi-step autonomous execution from email trigger to database update'
              },
              {
                title: 'Business Intelligence',
                desc: 'Turn operational telemetry and financial records into automated executive briefings.',
                use: 'Daily Slack/WhatsApp performance digests and anomaly detection'
              }
            ].map((ai, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{ai.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{ai.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-700 text-[11px] text-blue-300">
                  <span className="font-semibold text-slate-400">Typical Impact:</span> {ai.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          10. SECURITY & RELIABILITY
      ────────────────────────────────────────────────────────── */}
      <section id="security-reliability" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Security Governance
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Software Built With Security in Mind.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Security is never treated as a final-week patch. NEXUS considers defensive architecture, access controls, and data privacy throughout the entire design and engineering lifecycle.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Secure Development',
                desc: 'Structured engineering practices, peer code reviews, static vulnerability scanning, and isolated git branch access controls.'
              },
              {
                icon: Lock,
                title: 'Authentication & RBAC',
                desc: 'Secure user authentication, MFA tokens, session timeouts, and granular role-based authorization mechanisms.'
              },
              {
                icon: Database,
                title: 'Data Protection & Encryption',
                desc: 'Strict AES-256 encryption at rest and TLS 1.3 in transit with adherence to UAE Federal Decree-Law No. 45.'
              },
              {
                icon: Server,
                title: 'Isolated Infrastructure',
                desc: 'VPC isolation, hardened Docker containers, automated daily snapshots, and intrusion monitoring.'
              },
              {
                icon: Terminal,
                title: 'Rigorous Testing',
                desc: 'Automated regression suites, SQL-injection prevention, cross-site scripting audits, and user scenario testing.'
              },
              {
                icon: RefreshCw,
                title: 'Ongoing Maintenance',
                desc: 'Proactive dependency upgrades, security CVE patching, and continuous health checks post-deployment.'
              }
            ].map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-[#0046AF]/40 transition-all shadow-2xs">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#0046AF] mb-4 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{sec.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          11. INTEGRATION ECOSYSTEM
      ────────────────────────────────────────────────────────── */}
      <section id="integrations" className="w-full py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2">
              Ecosystem Connectivity
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Your Software Shouldn't Become Another Island.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              NEXUS connects software to the tools, databases, and commercial platforms your team already depends on every day.
            </p>
          </MorphBlock>

          {/* Integration Hub Diagram */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs">
                <span>Connect → Synchronize → Automate → Analyze</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center items-center">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-sm font-bold text-white">CRM</div>
                <div className="text-[11px] text-slate-400">HubSpot / Salesforce</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-sm font-bold text-white">ERP</div>
                <div className="text-[11px] text-slate-400">Odoo / SAP / Oracle</div>
              </div>
              <div className="p-5 rounded-2xl bg-[#0046AF] border border-blue-400 shadow-xl col-span-2 sm:col-span-1">
                <div className="text-xs font-mono text-blue-200">CORE ENGINE</div>
                <div className="text-base font-black text-white">NEXUS PLATFORM</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-sm font-bold text-white">PAYMENTS</div>
                <div className="text-[11px] text-slate-400">Stripe / UAE PGW</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-sm font-bold text-white">INTELLIGENCE</div>
                <div className="text-[11px] text-slate-400">AI Agents & LLMs</div>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
              Bi-directional API webhooks, automated data transformations, and transactional rollbacks.
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          12. PERFORMANCE & SCALABILITY
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Scalability Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Built for Today. Ready for What's Next.
            </h2>
            <blockquote className="p-4 rounded-2xl bg-slate-50 border-l-4 border-[#0046AF] text-sm sm:text-base font-semibold text-slate-800 mb-4">
              “Start with what the business needs. Build the architecture for where it is going.”
            </blockquote>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Your first version should never suffer from bloated enterprise complexity—but it must possess a clean, modular foundation that scales from 10 users to 100,000 without requiring an entire codebase rewrite.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Application Speed',
              'Database Architecture',
              'API Efficiency',
              'Infrastructure Capacity',
              'Sub-Second Caching',
              'Real-Time Telemetry',
              'Horizontal Scaling',
              'Maintainable Code',
              'Zero-Trust Security',
              'Future Integrations'
            ].map((metric, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#0046AF] mb-2" />
                <span className="text-xs sm:text-sm font-bold text-slate-900">{metric}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          13. EXISTING SOFTWARE & LEGACY SYSTEMS
      ────────────────────────────────────────────────────────── */}
      <section id="legacy-systems" className="w-full py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Legacy Modernization
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              You Don't Always Need to Start Over.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Many technology agencies automatically suggest throwing away prior systems. NEXUS audits your existing software and identifies high-ROI pathways to modernize, integrate, and extend what already works.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Modernize', desc: 'Revamp outdated user interfaces, upgrade frameworks, and eliminate technical debt.' },
              { title: 'Integrate', desc: 'Build modern REST/GraphQL APIs around legacy databases to connect new tools.' },
              { title: 'Optimize', desc: 'Accelerate slow database queries, optimize caching, and resolve UI bottlenecks.' },
              { title: 'Migrate', desc: 'Safely move on-premise servers and legacy databases to sovereign UAE cloud.' },
              { title: 'Extend', desc: 'Engineer new modules and AI workflows on top of existing platforms without disruption.' }
            ].map((leg, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#0046AF]/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0046AF] font-mono font-bold text-xs flex items-center justify-center mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{leg.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{leg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          14. PROJECT TYPES TABLE
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Scope Taxonomy
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              What We Build.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our core digital product archetypes, primary enterprise use cases, and recommended production engineering frameworks.
            </p>
          </MorphBlock>

          <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">Project Type</th>
                  <th className="py-4 px-6">Typical Commercial Use</th>
                  <th className="py-4 px-6">Core Engineering Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectTypes.map((pt, i) => (
                  <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{pt.type}</td>
                    <td className="py-4 px-6 text-slate-600">{pt.typicalUse}</td>
                    <td className="py-4 px-6 font-mono text-xs text-[#0046AF] font-medium">{pt.tech}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          15. ENGAGEMENT MODELS
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Commercial Structure
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Build It. Improve It. Keep It Moving.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Choose the commercial engagement model that fits your organization's roadmap, from standalone milestone builds to full dedicated engineering teams.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#0046AF]/40 transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#0046AF] mb-2">Model 01</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Project Development</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Defined project with a specific scope, milestone deliverables, fixed timeline, and guaranteed outcomes.
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-50 text-xs text-slate-700 font-medium">
                  <strong>Best for:</strong> New websites, mobile applications, defined portals, and specific API integrations.
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link to="/contact" className="text-xs font-bold text-[#0046AF] hover:underline flex items-center gap-1">
                  <span>Scope a Project</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#0046AF] transition-all flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#0046AF] text-white text-[10px] font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#0046AF] mb-2">Model 02</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Dedicated Development</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Ongoing engineering capacity and bi-weekly sprint deliverables assigned exclusively to your product requirements.
                </p>
                <div className="p-3.5 rounded-2xl bg-blue-50 text-xs text-slate-700 font-medium">
                  <strong>Best for:</strong> Growing digital products, funded startups, and companies with continuous feature roadmaps.
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link to="/contact" className="text-xs font-bold text-[#0046AF] hover:underline flex items-center gap-1">
                  <span>Inquire About Dedicated Capacity</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#0046AF]/40 transition-all flex flex-col justify-between shadow-2xs">
              <div>
                <div className="text-xs font-mono font-bold uppercase text-[#0046AF] mb-2">Model 03</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Software Partnership</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Long-term technology partnership covering development, infrastructure, AI integration, security audits, and technical advisory.
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-50 text-xs text-slate-700 font-medium">
                  <strong>Best for:</strong> Established enterprises where software and technology are central to day-to-day revenue.
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link to="/contact" className="text-xs font-bold text-[#0046AF] hover:underline flex items-center gap-1">
                  <span>Explore Partnership</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          16. AFTER LAUNCH
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Post-Launch Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Launch Is the Beginning.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A high-caliber technology partner never disappears after initial deployment. NEXUS provides continuous SLA-backed operational stewardship.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Maintenance', desc: 'Updates, bug resolutions, dependency upgrades, and operational health monitoring.' },
              { title: 'Feature Development', desc: 'Continuous implementation of user feedback, enhancements, and new product modules.' },
              { title: 'Optimization', desc: 'Core Web Vitals tuning, database query performance, and user retention improvements.' },
              { title: 'Security Audits', desc: 'Regular vulnerability scans, package dependency auditing, and access hygiene.' },
              { title: 'System Integration', desc: 'Seamlessly connecting new CRM tools, payment providers, or partners as your business grows.' },
              { title: 'AI & Automation', desc: 'Introducing new predictive capabilities and automated workflows as opportunities emerge.' }
            ].map((post, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                <h3 className="text-base font-bold text-slate-900 mb-2">{post.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{post.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          17. INDUSTRIES
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Sector Expertise
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Software Built Around Different Business Models.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every vertical possesses unique compliance requirements, operational dynamics, and consumer expectations across the UAE and GCC.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Retail & E-Commerce', desc: 'Custom storefronts, real-time inventory, order routing, CRM, and omnichannel POS sync.' },
              { title: 'Real Estate & PropTech', desc: 'Property listing portals, CRM lead routing, 3D tours, and automated WhatsApp inquiries.' },
              { title: 'Hospitality & F&B', desc: 'Table reservation engines, guest portals, automated ordering, and loyalty rewards.' },
              { title: 'Healthcare & Wellness', desc: 'Patient scheduling systems, HIPAA/UAE-compliant data records, and doctor portals.' },
              { title: 'Logistics & Trade', desc: 'Fleet dispatching, JAFZA/customs documentation processing, and container tracking.' },
              { title: 'Professional Services', desc: 'Client portal repositories, milestone invoicing, document generation, and secure messaging.' },
              { title: 'Startups & Scaleups', desc: 'Rapid MVP launches, scalable multi-tenant SaaS foundations, and technical investor diligence.' },
              { title: 'Government & Free Zones', desc: 'Bilingual Arabic/English portals, TDRA compliance, and automated applicant workflows.' }
            ].map((ind, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#0046AF]/40 transition-all">
                <h3 className="text-base font-bold text-slate-900 mb-2">{ind.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          18. WHY NEXUS — CONNECTED TECHNOLOGY ECOSYSTEM
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2">
              The Single-Partner Advantage
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Software Is Better When the Technology Is Connected.
            </h2>
            <blockquote className="p-4 rounded-2xl bg-slate-800/80 border-l-4 border-blue-500 text-sm sm:text-base font-semibold text-slate-200 mb-4">
              “NEXUS doesn't just develop software. We connect software to the technology and business systems around it.”
            </blockquote>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Because NEXUS also provides IT infrastructure, cloud hosting, AI automation, and business consulting, your application benefits from cohesive technical alignment that separate vendors cannot deliver.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                pair: 'Software + AI',
                desc: 'Build intelligent capabilities, natural language processing, and smart search directly into applications.'
              },
              {
                pair: 'Software + Automation',
                desc: 'Eliminate manual data re-entry and synchronize workflows across systems automatically.'
              },
              {
                pair: 'Software + Cloud',
                desc: 'Deploy on sovereign UAE cloud infrastructure engineered specifically for the software’s performance.'
              },
              {
                pair: 'Software + IT Services',
                desc: 'Connect applications directly to your office hardware, workstation fleet, and enterprise networks.'
              },
              {
                pair: 'Software + Consulting',
                desc: 'Align technical choices with practical commercial strategy and Dubai D33 economic objectives.'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-blue-500/40 transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-blue-300 mb-2">{item.pair}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          19. CASE STUDIES / WORK SHOWCASE
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Verified Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Built for Real Business Outcomes.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We focus on practical, operational engineering that eliminates business bottlenecks and drives verifiable ROI for our UAE clients.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#0046AF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    Logistics & Supply Chain
                  </span>
                  <span className="text-xs font-mono text-slate-400">JAFZA, Dubai</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Multi-Channel Logistics Platform & Custom Dispatching
                </h3>
                
                <div className="space-y-3 mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div>
                    <strong className="text-slate-900">Challenge:</strong> Client managed 400+ daily freight movements via manual WhatsApp messages and unlinked Excel spreadsheets, leading to booking delays.
                  </div>
                  <div>
                    <strong className="text-slate-900">Solution:</strong> Designed a full-stack Next.js dispatch platform with automated WhatsApp booking bots, driver mobile portal, and ERP billing sync.
                  </div>
                  <div>
                    <strong className="text-slate-900">Technology:</strong> React, Node.js, PostgreSQL, WhatsApp Cloud API, AWS me-central-1.
                  </div>
                  <div>
                    <strong className="text-slate-900">Outcome:</strong> Coordination overhead dropped by 45% within 60 days, with 99.98% system uptime during peak logistics seasons.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#0046AF]">
                <span>Verified Client Case Study</span>
                <Link to="/case-studies" className="hover:underline flex items-center gap-1">
                  <span>View full case study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#0046AF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    Real Estate & PropTech
                  </span>
                  <span className="text-xs font-mono text-slate-400">Downtown Dubai</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Bilingual Luxury Real Estate Portal & CRM Lead Routing
                </h3>
                
                <div className="space-y-3 mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <div>
                    <strong className="text-slate-900">Challenge:</strong> High-end brokerage required an ultra-fast bilingual Arabic/English web portal that instantly distributed international buyer inquiries to agents.
                  </div>
                  <div>
                    <strong className="text-slate-900">Solution:</strong> Engineered an SSR Next.js web application with sub-second page loads, automated CRM webhook routing, and interactive unit floor plans.
                  </div>
                  <div>
                    <strong className="text-slate-900">Technology:</strong> Next.js, TypeScript, Tailwind RTL, PostgreSQL, Redis caching.
                  </div>
                  <div>
                    <strong className="text-slate-900">Outcome:</strong> Lead response time improved from 4 hours to under 3 minutes, producing a 32% increase in qualified property viewings.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-[#0046AF]">
                <span>Verified Client Case Study</span>
                <Link to="/case-studies" className="hover:underline flex items-center gap-1">
                  <span>View full case study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          20. FAQ
      ────────────────────────────────────────────────────────── */}
      <section id="software-faq" className="w-full py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <MorphBlock className="text-center mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-wider text-[#0046AF] uppercase mb-2">
              Common Inquiries
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need to know about partnering with NEXUS for software engineering and digital products.
            </p>
          </MorphBlock>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'bg-white border-[#0046AF]/40 shadow-sm' : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          21. FINAL CTA
      ────────────────────────────────────────────────────────── */}
      <section className="w-full py-20 sm:py-28 bg-[#0B1728] text-white relative overflow-hidden">
        {/* Ambient Brand Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0046AF]/20 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <MorphBlock className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6">
              <span>Ready to Build</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
              Have a Business Problem That Software Could Solve?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mb-10">
              Tell us what you're trying to build, improve, automate, or connect. Our product architects will map out the ideal engineering roadmap.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0046AF] hover:bg-blue-600 text-white font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer">
                  <span>Start a Software Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm sm:text-base transition-all border border-slate-700 flex items-center justify-center gap-2 cursor-pointer">
                  <span>Talk to an Engineer</span>
                </button>
              </Link>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Web • Mobile • Business Systems • APIs • AI • Automation
            </div>
          </MorphBlock>
        </div>
      </section>

    </div>
  );
}
