import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Server, Code, Bot, Palette, Briefcase, CheckCircle2, ArrowRight, 
  ShieldCheck, Clock, Award, Cpu, Zap, Activity, Globe,
  MessageSquare, FileCode, Check, ChevronRight, Sparkles, Building2, Users, Layers
} from 'lucide-react';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';
import { Typewriter } from '@/components/ui/Typewriter';
import ITServicesPage from './ITServicesPage';
import SoftwareDevelopmentPage from './SoftwareDevelopmentPage';

interface OfficialPackage {
  number: string;
  name: string;
  bestFor: string;
  tagline?: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

interface SolutionData {
  slug: string;
  badge: string;
  categoryTitle: string;
  title: string;
  subtitle: string;
  description: string;
  startingPriceAed: number;
  sla: string;
  icon: React.ElementType;
  heroImage: string;
  telemetry: { label: string; value: string; detail: string }[];
  keyCapabilities: { title: string; desc: string }[];
  officialPackages?: OfficialPackage[];
  architecturePoints: string[];
  dubaiAdvantage: string;
  technologies: string[];
  deliverables: string[];
  caseStudy: {
    clientType: string;
    challenge: string;
    result: string;
  };
}

const SOLUTIONS_DATA: Record<string, SolutionData> = {
  'it-services': {
    slug: 'it-services',
    badge: '🇦🇪 UAE Sovereign Cloud & Enterprise IT',
    categoryTitle: 'Cloud & Infrastructure',
    title: 'Sovereign Cloud & Enterprise IT Infrastructure',
    subtitle: 'High-availability AWS me-central-1, Microsoft Azure UAE North, and 24/7 Zero-Trust Cybersecurity.',
    description: 'Designed specifically for UAE corporations requiring guaranteed in-country data sovereignty (UAE Federal Decree-Law No. 45), ultra-low regional latency, and certified Fortinet zero-trust perimeter defense. Backed by a guaranteed 15-minute emergency on-site dispatch across Downtown Dubai, DIFC, and Dubai Silicon Oasis.',
    startingPriceAed: 18000,
    sla: '15-Min Response • 99.99% Cloud Uptime',
    icon: Server,
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    telemetry: [
      { label: 'Downtown DXB Latency', value: '< 1.4 ms', detail: 'Direct UAE IX exchange peering' },
      { label: 'Data Residency', value: '100% In-Country', detail: 'Strict compliance with Federal Law No. 45' },
      { label: 'Emergency Dispatch', value: '< 15 Mins', detail: 'Rapid on-site response in DIFC & DSO' },
      { label: 'Uptime SLA', value: '99.99%', detail: 'Sub-second active-active failover' }
    ],
    keyCapabilities: [
      { title: 'In-Country Cloud Hosting', desc: 'Engineered on AWS me-central-1 and Azure UAE North with geo-redundant backups within UAE borders.' },
      { title: 'Zero-Trust Perimeter Defense', desc: 'Next-gen Fortinet firewalls, continuous SIEM/SOC monitoring, and annual red-team penetration testing.' },
      { title: 'Disaster Recovery & Business Continuity', desc: 'Near-instant recovery point objectives (RPO < 5 mins) to prevent enterprise revenue loss.' },
      { title: 'On-Premises Office Infrastructure', desc: 'Structured Cat6A cabling, Cisco Meraki Wi-Fi 6, rack deployment, and access-control hardware.' }
    ],
    architecturePoints: [
      'Dual-homed BGP routing with redundant Etisalat & du internet backbones',
      'Immutable daily cloud snapshots encrypted with customer-managed AES-256 keys',
      'Automated patch management and vulnerability scanning with CIS Benchmark compliance',
      '24/7/365 NOC surveillance with proactive incident escalation'
    ],
    dubaiAdvantage: 'Fully audited to comply with the UAE TDRA National Cybersecurity Strategy and Dubai Electronic Security Center (DESC) standards.',
    technologies: ['AWS UAE me-central-1', 'Microsoft Azure North', 'Fortinet', 'Cloudflare', 'Cisco Meraki', 'Docker', 'Kubernetes'],
    deliverables: [
      'Comprehensive Cloud Architecture Blueprint',
      'TDRA & ISO 27001 Compliance Audit Documentation',
      '24/7 Live Monitoring Dashboard & SLA Guarantee',
      'Automated Disaster Recovery Runbooks',
      'Dedicated Tier-3 UAE IT Support Squad'
    ],
    caseStudy: {
      clientType: 'DIFC Financial Asset Management Firm',
      challenge: 'Legacy on-premise infrastructure caused compliance flags and slow cross-office latency during trading hours.',
      result: 'Migrated 40+ servers to AWS me-central-1 in 72 hours with zero downtime, cutting latency by 68% and passing TDRA audit.'
    }
  },
  'software-development': {
    slug: 'software-development',
    badge: '🇦🇪 DIFC & Downtown Engineering Hub',
    categoryTitle: 'Software Engineering',
    title: 'Custom Software & Enterprise Web Platforms',
    subtitle: 'Bespoke ERP/CRM, scalable SaaS, and high-performance mobile apps built for the GCC market.',
    description: 'We build enterprise software that fits your exact operating model. From internal operational portals and custom multi-tenant ERPs to client-facing web and mobile applications with native Arabic RTL localization and UAE payment gateway integrations.',
    startingPriceAed: 28000,
    sla: 'Bi-Weekly Sprints • 100% Client Code Ownership',
    icon: Code,
    heroImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    telemetry: [
      { label: 'Code Ownership', value: '100% Client', detail: 'Zero vendor lock-in; full IP transfer' },
      { label: 'Arabic RTL Engine', value: 'Native Bilingual', detail: 'Culturally fluent typography & layouts' },
      { label: 'Deployment Cadence', value: 'Bi-Weekly', detail: 'Iterative sprint deliverables with demo' },
      { label: 'Test Coverage', value: '96.4%', detail: 'Automated CI/CD regression suites' }
    ],
    keyCapabilities: [
      { title: 'Modern Full-Stack Web Platforms', desc: 'Engineered using Next.js, React, Node.js, and PostgreSQL for instantaneous sub-second load times.' },
      { title: 'Bespoke ERP & CRM Systems', desc: 'Custom tailored to GCC tax rules (5% UAE VAT, Corporate Tax) and regional commercial workflows.' },
      { title: 'Native iOS & Android Applications', desc: 'Crafted with Flutter and native SDKs featuring biometric authentication and push notifications.' },
      { title: 'UAE Payment Gateway Integrations', desc: 'Seamless checkout via Stripe UAE, Network International, Telr, Tabby, and Apple Pay.' }
    ],
    architecturePoints: [
      'Microservices-ready containerized Docker architecture on scalable cloud clusters',
      'Strict TypeScript type-safety across front-end and back-end services',
      'Arabic typography optimization using IBM Plex Sans Arabic and Geists font systems',
      'Comprehensive OpenAPI 3.0 documented REST and GraphQL endpoints'
    ],
    dubaiAdvantage: 'Bilingual engineering team located in Dubai for weekly face-to-face sprint reviews and whiteboarding sessions.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Flutter', 'Tailwind CSS', 'Redis'],
    deliverables: [
      'Production-Ready Cloud-Hosted Web/Mobile Applications',
      'Complete Git Repository Access with Full Intellectual Property Rights',
      'Figma High-Fidelity UI/UX Interactive Design System',
      'Automated CI/CD Deployment Pipelines',
      'Bilingual Admin Documentation & Developer Handoff'
    ],
    caseStudy: {
      clientType: 'Dubai Luxury Real Estate Brokerage',
      challenge: 'Off-the-shelf CRMs failed to sync developer off-plan inventory and lacked WhatsApp lead automation in Arabic.',
      result: 'Engineered a bespoke broker portal handling AED 1.2B in pipeline with real-time DLD integration and instant WhatsApp buyer notifications.'
    }
  },
  'creative-services': {
    slug: 'creative-services',
    badge: '🇦🇪 Cinema-Grade Dubai Production Studio',
    categoryTitle: 'Creative & Media',
    title: 'Business Adverts, 3D Assets & Creative Media',
    subtitle: 'High-impact commercial video, 3D CGI product visualization, and luxury brand design for Gulf leaders.',
    description: 'Elevate your brand above the noise. Our creative studio produces broadcast-grade commercial advertisements, on-location corporate brand films, high-fidelity 3D CGI product animations, and comprehensive visual identity systems that resonate with GCC consumers and high-net-worth investors.',
    startingPriceAed: 14000,
    sla: '10-14 Day Turnaround • 100% Perpetual Rights',
    icon: Palette,
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    telemetry: [
      { label: 'Commercial Rights', value: '100% Perpetual', detail: 'Worldwide broadcast & digital clearance' },
      { label: 'Mastering Quality', value: 'ProRes 422 HQ', detail: 'Mastered in 4K HDR for cinema & socials' },
      { label: 'Studio Turnaround', value: '10-14 Days', detail: 'Rapid on-location shoots across Dubai' },
      { label: 'Asset Library', value: 'Full Source Files', detail: 'After Effects, Blender, Figma archives' }
    ],
    keyCapabilities: [
      { title: 'Corporate Brand Documentaries & Commercials', desc: 'Shot on cinema-grade RED and ARRI cameras across Dubai locations with certified drone operators.' },
      { title: '3D CGI Product Renders & Animations', desc: 'Photorealistic architectural fly-throughs, luxury product explosion views, and interactive WebGL assets.' },
      { title: 'Complete Brand Identity & Typography', desc: 'Bilingual logos, typography guidelines, iconography kits, and executive stationery suites.' },
      { title: 'Performance Ad Campaign Suites', desc: 'High-converting social video creatives formatted for Instagram, TikTok, LinkedIn, and programmatic displays.' }
    ],
    officialPackages: [
      {
        number: 'Package 1',
        name: 'Starter / Basic',
        bestFor: 'Small businesses, startups',
        tagline: 'Ideal for emerging ventures seeking professional credibility and steady brand momentum.',
        badge: 'Startups & Emerging Brands',
        isPopular: false,
        features: [
          '2 social media platforms (e.g., Instagram + Facebook).',
          '8–12 posts per month.',
          'Basic graphic design (static images).',
          'Caption writing + hashtags.',
          'Monthly performance report.',
          '1 revision per post.'
        ]
      },
      {
        number: 'Package 2',
        name: 'Growth / Standard',
        bestFor: 'Medium businesses',
        tagline: 'Engineered for scaling enterprises seeking multi-platform video reach and active audience management.',
        badge: 'Most Popular for Growth',
        isPopular: true,
        features: [
          '3 platforms (e.g., Instagram, Facebook, TikTok).',
          '15–20 posts per month.',
          'Graphics + basic video/reels (2–4/month).',
          'Caption writing + hashtags + call-to-action.',
          'Community management (reply to comments/DMs).',
          'Bi-weekly performance report.',
          'Competitor analysis (monthly).'
        ]
      },
      {
        number: 'Package 3',
        name: 'Professional / Premium',
        bestFor: 'Established brands',
        tagline: 'High-cadence editorial dominance with rapid reels, regular stories, and boosted ad campaigns.',
        badge: 'High Performance & Scale',
        isPopular: false,
        features: [
          '4–5 platforms.',
          '25–30 posts per month.',
          'Graphics + videos/reels (6–8/month).',
          'Stories (daily or every 2 days).',
          'Full community management.',
          'Paid ads management (boosting posts).',
          'Weekly reports + strategy calls.',
          'Content calendar.'
        ]
      },
      {
        number: 'Package 4',
        name: 'Enterprise / Full Management',
        bestFor: 'Large companies',
        tagline: 'Full agency production firepower with unlimited publishing, paid ad funnels, influencer outreach, and dedicated management.',
        badge: 'Turnkey Enterprise Suite',
        isPopular: false,
        features: [
          'All platforms.',
          'Unlimited posts.',
          'Full content production (photos, videos, reels, stories).',
          'Paid ads (Facebook Ads, Instagram Ads, TikTok Ads).',
          'Influencer outreach.',
          'Monthly strategy meeting.',
          'Dedicated account manager.',
          'Full analytics dashboard.'
        ]
      }
    ],
    architecturePoints: [
      'Licensed UAE drone flight clearance with Dubai Civil Aviation Authority (DCAA)',
      'Professional color grading and Dolby Atmos sound mastering',
      'Dual-language voiceovers recorded by native Emirati and international voice talents',
      'Modular social asset cuts in 16:9, 9:16 vertical, and 1:1 square aspect ratios'
    ],
    dubaiAdvantage: 'Permitted and experienced shooting on-location across Burj Khalifa, Downtown, Dubai Marina, DIFC, and DSO.',
    technologies: ['RED Cinema', 'ARRI Alexa', 'DaVinci Resolve Studio', 'Blender 3D', 'Unreal Engine 5', 'Adobe Creative Cloud', 'Figma'],
    deliverables: [
      'Master 4K Video Commercials (Clean and Subtitled Versions)',
      'Social Ad Cutdowns (15s, 30s, 60s vertical & horizontal)',
      'High-Resolution 3D CGI Product Renders (8K Still Assets)',
      'Bilingual Brand Guidelines PDF & Vector Vector Asset Library',
      'Full Copyright Assignment & Release Agreements'
    ],
    caseStudy: {
      clientType: 'Dubai Maritime & Yacht Charter Operator',
      challenge: 'Needed a cinematic brand campaign to launch a new fleet of luxury superyachts targeting GCC ultra-HNW clients.',
      result: 'Produced a 90-second 4K film with aerial choreography and 3D interior maps, achieving 4.8M impressions and AED 3.4M in pre-bookings.'
    }
  },
  'ai-automation': {
    slug: 'ai-automation',
    badge: '🇦🇪 Dubai Silicon Oasis AI Innovation Lab',
    categoryTitle: 'AI & Automation',
    title: 'Enterprise AI Tools & Autonomous Workflows',
    subtitle: 'Official WhatsApp Business API bots, bilingual Arabic LLMs, and intelligent document extraction.',
    description: 'Transform manual enterprise bottlenecks into autonomous workflows. We build custom conversational AI agents, internal knowledge copilots, and intelligent invoice/document pipelines deployed within sovereign UAE cloud environments for strict privacy.',
    startingPriceAed: 22000,
    sla: 'Bilingual NLP • Custom Enterprise Fine-Tuning',
    icon: Bot,
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    telemetry: [
      { label: 'Response Speed', value: '0.6s Avg', detail: 'Instantaneous conversational latency' },
      { label: 'Arabic Comprehension', value: '98.2%', detail: 'Fine-tuned on GCC and Gulf dialects' },
      { label: 'Privacy Sandbox', value: '100% In-Country', detail: 'Zero public training on client data' },
      { label: 'Availability', value: '24/7/365', detail: 'Uninterrupted automated lead response' }
    ],
    keyCapabilities: [
      { title: 'Official WhatsApp Business API Bots', desc: 'Automated 24/7 customer service, booking systems, and lead qualification that route directly into your CRM.' },
      { title: 'Bilingual Conversational Assistants', desc: 'Neural agents trained to understand both formal Modern Standard Arabic (MSA) and colloquial Gulf dialects.' },
      { title: 'Intelligent Document & Invoice OCR', desc: 'Automatically extract data from trade licenses, UAE Emirates IDs, invoices, and customs manifests into your ERP.' },
      { title: 'Enterprise Knowledge Base Copilots', desc: 'Secure internal AI assistants that let staff search thousands of company policies, contracts, and manuals in seconds.' }
    ],
    architecturePoints: [
      'Self-hosted open-weights LLMs (Llama 3, Mistral) or private Azure OpenAI instances in UAE North',
      'Retrieval-Augmented Generation (RAG) architecture using vector databases for factual accuracy',
      'Strict Role-Based Access Control (RBAC) ensuring employees only query data they are permitted to view',
      'Deterministic fallback to human agents when sentiment or complexity thresholds are met'
    ],
    dubaiAdvantage: 'Fully aligned with the UAE National Strategy for Artificial Intelligence 2031, with all processing hosted locally.',
    technologies: ['Python', 'LangChain', 'FastAPI', 'Azure OpenAI UAE', 'Pinecone', 'WhatsApp Cloud API', 'PostgreSQL pgvector'],
    deliverables: [
      'Custom Fine-Tuned AI Assistant or WhatsApp Automation Engine',
      'Interactive Analytics & Live Conversation Monitoring Dashboard',
      'Private Vector Database Integration with Enterprise Knowledge Base',
      'Human-in-the-Loop Handover System & Escalation Rules',
      'Comprehensive Staff Training & Prompt Engineering Playbook'
    ],
    caseStudy: {
      clientType: 'UAE Logistics & Cold-Chain Distributor',
      challenge: 'Operations team spent 45+ hours weekly re-typing customs clearance declarations and bill of lading documents.',
      result: 'Deployed an autonomous document intelligence pipeline that extracts and validates manifest data in 3 seconds, reducing manual entry errors to 0%.'
    }
  },
  'consulting': {
    slug: 'consulting',
    badge: '🇦🇪 Executive Advisory & Fractional CTO',
    categoryTitle: 'Digital Advisory & Strategy',
    title: 'Enterprise Technology Advisory & Fractional CTO',
    subtitle: 'C-level technology leadership, IT vendor audits, and digital transformation roadmaps for GCC boards.',
    description: 'Scale your organization with veteran technology leadership based in Dubai. We provide Fractional CTO leadership, enterprise architecture audits, cloud procurement optimization, IT team structuring, and Dubai Electronic Security Center (DESC) compliance preparation without the burden of full-time executive overhead.',
    startingPriceAed: 25000,
    sla: 'Direct C-Suite Access • Fortnightly Board Reviews',
    icon: Briefcase,
    heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    telemetry: [
      { label: 'Executive Presence', value: 'In-Person DXB', detail: 'On-site boardroom representation' },
      { label: 'Vendor Cost Reduction', value: '34% Avg', detail: 'Eliminating bloated legacy licensing' },
      { label: 'Security Compliance', value: 'DESC & ISO', detail: 'Regulatory roadmap verification' },
      { label: 'Delivery Acceleration', value: '+45%', detail: 'Engineering sprint throughput' }
    ],
    keyCapabilities: [
      { title: 'Fractional CTO & Executive Advisory', desc: 'Embedded executive steering software architecture, vendor negotiations, and board technical reporting.' },
      { title: 'IT Infrastructure & Spend Audit', desc: 'Thorough review of existing cloud hosting, ERP licenses, and telecom agreements to eliminate redundant expenditures.' },
      { title: 'Cybersecurity Governance & DESC Readiness', desc: 'Formulating disaster recovery runbooks, access policies, and compliance roadmaps for Dubai regulations.' },
      { title: 'Tech Team Hiring & Culture Structuring', desc: 'Screening, technical interviewing, and mentoring internal engineering squads in the UAE.' }
    ],
    architecturePoints: [
      'Comprehensive Technology Health Scorecard delivered within first 14 days',
      'Vendor-neutral RFP drafting and competitive procurement evaluation',
      'Zero-trust identity and governance policies tailored to UAE data sovereignty laws',
      'Quarterly digital transformation milestones reviewed directly with company ownership'
    ],
    dubaiAdvantage: 'Advisors hold proven track records navigating UAE government portals, DLD, TDRA, and regional banking ecosystems.',
    technologies: ['Enterprise Architecture', 'TOGAF', 'ISO 27001', 'Cloud ROI', 'DESC Standards', 'Agile Governance', 'Board Reporting'],
    deliverables: [
      'Comprehensive 3-Year Enterprise Technology Roadmap',
      'Cloud & IT Vendor Spend Optimization Audit Report',
      'Cybersecurity & Regulatory Compliance Gap Analysis',
      'Technical Interview Assessments for Key Hires',
      'Fortnightly Executive Sprint & Steering Sessions'
    ],
    caseStudy: {
      clientType: 'GCC Retail & Luxury Goods Conglomerate',
      challenge: 'Multi-brand entity was burning AED 2.8M annually on fragmented legacy ERP systems with no unified digital strategy.',
      result: 'Restructured cloud licenses, selected an agile regional architecture, and renegotiated vendor terms, slashing recurring IT OPEX by AED 1.1M in Year 1.'
    }
  }
};

const SLUG_ALIASES: Record<string, string> = {
  'it': 'it-services',
  'it-services': 'it-services',
  'cloud': 'it-services',
  'infrastructure': 'it-services',
  'software': 'software-development',
  'software-development': 'software-development',
  'custom-software': 'software-development',
  'creative': 'creative-services',
  'creative-services': 'creative-services',
  'business-adverts': 'creative-services',
  'ai': 'ai-automation',
  'ai-automation': 'ai-automation',
  'ai-tools': 'ai-automation',
  'consulting': 'consulting',
  'advisory': 'consulting',
  'fractional-cto': 'consulting',
};

export default function SolutionDetail() {
  const { slug } = useParams<{ slug: string }>();

  // Resolve slug or fallback to alias
  const canonicalSlug = slug ? (SLUG_ALIASES[slug.toLowerCase()] || slug) : null;

  if (canonicalSlug === 'it-services') {
    return <ITServicesPage />;
  }

  if (canonicalSlug === 'software-development') {
    return <SoftwareDevelopmentPage />;
  }

  const solution = canonicalSlug ? SOLUTIONS_DATA[canonicalSlug] : null;

  useEffect(() => {
    if (window.location.hash === '#official-packages') {
      const timer = setTimeout(() => {
        const el = document.getElementById('official-packages');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [canonicalSlug]);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const IconComponent = solution.icon;

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{solution.categoryTitle}</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Badges & Intro */}
          <div className="lg:col-span-7 space-y-6">
            <MorphBlock>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
                <span>{solution.badge}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
                {solution.title}
              </h1>
              <p className="text-lg md:text-xl text-blue-700 font-medium leading-relaxed mb-4">
                {solution.subtitle}
              </p>
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {solution.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact">
                  <button className="bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white px-7 py-3.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer">
                    <span>Request Discovery Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                {solution.officialPackages && (
                  <a href="#official-packages">
                    <button className="px-5 py-3.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0046AF] font-bold border border-blue-200 text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                      <Layers className="w-4 h-4 text-[#0046AF]" />
                      <span>View 4 Official Packages</span>
                    </button>
                  </a>
                )}
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                  <Clock className="w-4 h-4 text-[#0046AF]" />
                  <span>{solution.sla}</span>
                </div>
              </div>
            </MorphBlock>
          </div>

          {/* Right Column: Hero Visual Card with Live Telemetry */}
          <div className="lg:col-span-5">
            <MorphBlock delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-xl p-4">
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5">
                  <img 
                    src={solution.heroImage} 
                    alt={solution.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {solution.telemetry.map((t, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                      <div className="text-[10px] font-mono uppercase text-slate-500 tracking-wider mb-0.5">{t.label}</div>
                      <div className="text-sm font-bold text-slate-900">{t.value}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{t.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </MorphBlock>
          </div>

        </div>
      </section>

      {/* Key Capabilities Bento Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Architectural Excellence</div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Core Capabilities & Delivery Modules
          </h2>
          <p className="text-base text-slate-600">
            Engineered to remove friction and guarantee operational resilience for UAE enterprises.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solution.keyCapabilities.map((cap, i) => (
            <MorphBlock key={i} delay={0.1 * i} enableHover>
              <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-400/80 transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-xs border border-blue-100">
                    <CheckCircle2 className="w-6 h-6 text-[#0046AF]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{cap.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{cap.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
                  <span>Production-Ready SLA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* Official Packages (Rendered if defined, e.g. for Creative Media & Business Adverts) */}
      {solution.officialPackages && solution.officialPackages.length > 0 && (
        <section id="official-packages" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200 scroll-mt-20">
          <MorphBlock className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Media &amp; Management Plans</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              Official Social Media, 3D &amp; Creative Management Packages
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Transparent, scalable multi-platform publishing and creative management packages designed to elevate your brand presence, accelerate reach, and drive commercial growth across Dubai and the GCC.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {solution.officialPackages.map((pkg, idx) => (
              <MorphBlock key={idx} delay={0.08 * idx} enableHover className="h-full">
                <div 
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-300 ${
                    pkg.isPopular 
                      ? 'bg-gradient-to-b from-[#091E42] via-[#0B1E3F] to-slate-950 text-white shadow-xl shadow-blue-950/25 border-2 border-blue-400/90 -translate-y-1' 
                      : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300'
                  }`}
                >
                  {/* Top Header Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${
                        pkg.isPopular 
                          ? 'bg-blue-500/30 text-blue-200 border border-blue-400/40' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {pkg.number}
                      </span>
                      {pkg.isPopular ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                          <Sparkles className="w-3 h-3 fill-slate-950" />
                          <span>Popular</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400">
                          Official Tier
                        </span>
                      )}
                    </div>

                    {/* Package Name */}
                    <h3 className={`text-xl font-black mb-2 tracking-tight ${
                      pkg.isPopular ? 'text-white' : 'text-slate-900'
                    }`}>
                      {pkg.name}
                    </h3>

                    {/* Best For Highlight */}
                    <div className={`p-3 rounded-xl text-xs font-medium mb-4 flex items-start gap-2.5 ${
                      pkg.isPopular 
                        ? 'bg-white/10 text-blue-100 border border-white/10' 
                        : 'bg-slate-50 text-slate-700 border border-slate-200/70'
                    }`}>
                      <Users className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.isPopular ? 'text-blue-300' : 'text-blue-600'}`} />
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">Best for</span>
                        <strong className="font-semibold text-xs leading-tight block mt-0.5">{pkg.bestFor}</strong>
                      </div>
                    </div>

                    {/* Tagline / Subtitle */}
                    {pkg.tagline && (
                      <p className={`text-xs leading-relaxed mb-5 ${
                        pkg.isPopular ? 'text-blue-200/90' : 'text-slate-500'
                      }`}>
                        {pkg.tagline}
                      </p>
                    )}

                    {/* Included Features List */}
                    <div className={`space-y-3 pt-4 pb-6 border-t ${
                      pkg.isPopular ? 'border-white/10' : 'border-slate-100'
                    }`}>
                      <div className={`text-[11px] uppercase tracking-wider font-bold ${
                        pkg.isPopular ? 'text-blue-300' : 'text-slate-500'
                      }`}>
                        Included Deliverables:
                      </div>
                      <ul className="space-y-2.5">
                        {pkg.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs leading-relaxed">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                              pkg.isPopular ? 'text-blue-400' : 'text-blue-600'
                            }`} />
                            <span className={pkg.isPopular ? 'text-slate-200 font-medium' : 'text-slate-700'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className={`pt-4 border-t mt-auto ${
                    pkg.isPopular ? 'border-white/10' : 'border-slate-100'
                  }`}>
                    <Link 
                      to={`/contact?service=creative-services&package=${encodeURIComponent(pkg.number + ' — ' + pkg.name)}`}
                      className="block w-full"
                    >
                      <button 
                        className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          pkg.isPopular
                            ? 'bg-white hover:bg-blue-50 text-blue-950 shadow-md hover:shadow-lg'
                            : 'bg-blue-50 hover:bg-[#0046AF] text-blue-700 hover:text-white border border-blue-200/80 hover:border-transparent'
                        }`}
                      >
                        <span>Get Started with {pkg.number}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </MorphBlock>
            ))}
          </div>

          {/* Bottom Enterprise Custom Addons Note */}
          <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                <Layers className="w-5 h-5 text-[#0046AF]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Need Custom 3D CGI, Cinema Drone Permits or Bespoke Commercial Production?</h4>
                <p className="text-xs text-slate-500">All packages can be customized with on-location RED Cinema shoots across Dubai, multilingual Emirati voiceovers, and interactive WebGL 3D assets.</p>
              </div>
            </div>
            <Link to="/contact?service=creative-services&type=custom-scope" className="shrink-0">
              <button className="bg-slate-900 hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
                Request Custom Scope
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* Technology Stack & Deliverables */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Tech Stack (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <MorphBlock>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-2">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  <span>Vetted Enterprise Stack</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Technologies & Standards</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  We deploy mature, industry-standard technologies vetted for stability, security, and long-term maintainability.
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {solution.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 shadow-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Architecture Checklist */}
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">System Safeguards</h4>
                  {solution.architecturePoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-[#0046AF] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </MorphBlock>
            </div>

            {/* Deliverables & Case Study (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <MorphBlock delay={0.15}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-[#0046AF] mb-2">
                  <Award className="w-3.5 h-3.5 text-[#0046AF]" />
                  <span>Guaranteed Deliverables</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">What You Receive</h3>
                
                <div className="space-y-3 mb-8">
                  {solution.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0046AF] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-sm font-medium text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Case Study Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white shadow-md">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold mb-2">
                    Verified UAE Case Study • {solution.caseStudy.clientType}
                  </div>
                  <div className="text-xs text-slate-300 mb-3 leading-relaxed">
                    <strong className="text-white">Challenge:</strong> {solution.caseStudy.challenge}
                  </div>
                  <div className="text-xs text-blue-200 font-medium leading-relaxed">
                    <strong className="text-white">Outcome:</strong> {solution.caseStudy.result}
                  </div>
                </div>
              </MorphBlock>
            </div>

          </div>
        </div>
      </section>

      {/* Conversion Banner Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MorphBlock className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 md:p-16 shadow-lg text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>In-Person Discovery at Radiance ONE Business Center, Rigga Al Buteen, Dubai</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Ready to deploy {solution.title}?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Book a direct technical session with our principal engineers. We review your requirements, architect a detailed milestone roadmap, and provide transparent fixed-cost milestones.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <button className="bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white px-8 py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all text-sm cursor-pointer">
                  Schedule Consultation
                </button>
              </Link>
              <Link to="/services">
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3.5 rounded-full font-semibold transition-all text-sm">
                  Compare All Services
                </button>
              </Link>
            </div>
          </div>
        </MorphBlock>
      </section>

    </div>
  );
}
