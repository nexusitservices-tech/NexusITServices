import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, 
  Server, Code, Bot, Palette, Briefcase, ExternalLink, Sparkles, ChevronRight 
} from 'lucide-react';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';
import { useCurrency } from '@/context/CurrencyContext';

interface CaseStudy {
  id: string;
  category: 'cloud' | 'software' | 'ai' | 'creative' | 'advisory';
  clientName: string;
  clientType: string;
  location: string;
  title: string;
  challenge: string;
  solution: string;
  results: { label: string; metric: string }[];
  technologies: string[];
  image: string;
  quote: { text: string; author: string; role: string };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'difc-cloud',
    category: 'cloud',
    clientName: 'Al-Thuraya Wealth Management',
    clientType: 'DFSA-Regulated Financial Firm',
    location: 'DIFC, Dubai',
    title: 'Zero-Downtime Migration to AWS me-central-1 UAE with Fortinet Defense',
    challenge: 'Strict regulatory audits mandated immediate in-country data residency (UAE Federal Decree-Law No. 45). Legacy European servers introduced unacceptable cross-border latency and compliance risks.',
    solution: 'Engineered an active-active sovereign cloud environment on AWS me-central-1 (UAE) with automated daily immutable backups and Fortinet Zero-Trust virtual firewalls.',
    results: [
      { label: 'Latency Cut', metric: '-68%' },
      { label: 'Uptime Achieved', metric: '100%' },
      { label: 'Audit Passage', metric: '1st Review' },
      { label: 'Annual OPEX Saved', metric: 'AED 380,000' }
    ],
    technologies: ['AWS UAE me-central-1', 'Fortinet FortiGate', 'Docker', 'Cloudflare Enterprise', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    quote: {
      text: 'Nexus IT transitioned our entire core trading infrastructure over a single weekend with zero trade interruption. Their mastery of DFSA and UAE data residency laws is unmatched.',
      author: 'Tariq Al-Mansoor',
      role: 'Chief Operating Officer'
    }
  },
  {
    id: 'proptech-crm',
    category: 'software',
    clientName: 'Elysian Real Estate Holdings',
    clientType: 'Premier Off-Plan & Luxury Brokerage',
    location: 'Downtown Dubai',
    title: 'Bespoke Multi-Tenant Brokerage CRM with DLD & Instant WhatsApp Sync',
    challenge: 'Generic off-the-shelf CRM solutions lacked native Dubai Land Department (DLD) title deed verification and could not support automated Arabic/English WhatsApp buyer journeys.',
    solution: 'Architected a custom cloud CRM with real-time developer inventory tracking, bilingual Arabic/English interfaces, and automated WhatsApp lead qualification bots.',
    results: [
      { label: 'Pipeline Handled', metric: 'AED 1.4B' },
      { label: 'Lead Response Time', metric: '< 45 Sec' },
      { label: 'Conversion Rate', metric: '+38%' },
      { label: 'Agent Adoption', metric: '98%' }
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API', 'Redis'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    quote: {
      text: 'Our brokers closed AED 420M in off-plan inventory in the first quarter of deployment. Nexus delivered software that actually fits Dubai’s rapid real estate tempo.',
      author: 'Soraia Haddad',
      role: 'Head of Sales & Expansion'
    }
  },
  {
    id: 'cold-chain-ai',
    category: 'ai',
    clientName: 'Gulf Cold Logistics LLC',
    clientType: 'UAE Regional Supply Chain Distributor',
    location: 'Dubai South & JAFZA',
    title: 'Autonomous Customs Manifest & Commercial Invoice OCR Pipeline',
    challenge: 'Operational staff were processing over 3,000 paper shipping manifests, bills of lading, and customs declarations monthly, causing manual entry backlogs of up to 48 hours.',
    solution: 'Deployed a private, sovereign document extraction pipeline using fine-tuned bilingual OCR and LLMs that instantly validates declarations against UAE customs formats.',
    results: [
      { label: 'Processing Speed', metric: '2.8 Sec/Doc' },
      { label: 'Error Rate', metric: '0.0%' },
      { label: 'Hours Saved/Wk', metric: '45+ Hours' },
      { label: 'Clearance Acceleration', metric: '3.4x Faster' }
    ],
    technologies: ['Python', 'FastAPI', 'Azure OpenAI UAE', 'Pinecone', 'Docker', 'Tesseract OCR'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    quote: {
      text: 'The AI pipeline has eliminated our border clearance delays. What used to take two days of frantic typing now processes automatically before trucks even arrive at the port.',
      author: 'Khalfan Al-Zaabi',
      role: 'Director of Logistics'
    }
  },
  {
    id: 'superyacht-media',
    category: 'creative',
    clientName: 'Majesty Horizons Charters',
    clientType: 'Ultra-Luxury Maritime Experience',
    location: 'Dubai Harbour & Abu Dhabi',
    title: 'Cinema-Grade 4K HDR Commercials & 3D Interactive Vessel Configurator',
    challenge: 'Needed an international marketing presence to attract high-net-worth Gulf and international clientele for a newly commissioned 60-meter superyacht fleet.',
    solution: 'Executed a 5-day on-location cinema shoot with certified DCAA drone permits, mastering in 4K ProRes alongside photorealistic 3D interactive WebGL interior walk-throughs.',
    results: [
      { label: 'Video Reach', metric: '5.2M Views' },
      { label: 'Charter Pre-Bookings', metric: 'AED 4.1M' },
      { label: 'Average Watch Time', metric: '82%' },
      { label: 'Award Recognition', metric: 'GCC Luxury 2026' }
    ],
    technologies: ['RED V-Raptor 8K', 'Blender 3D', 'Unreal Engine 5', 'DaVinci Resolve', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1000&q=80',
    quote: {
      text: 'The film and 3D visual experience Nexus produced set a new benchmark for luxury maritime advertising in Dubai. Our charter calendar was fully reserved within 3 weeks.',
      author: 'Fahad Bin Rashid',
      role: 'Managing Partner'
    }
  },
  {
    id: 'retail-advisory',
    category: 'advisory',
    clientName: 'Al-Mirath Retail Conglomerate',
    clientType: 'Multi-Brand GCC Department Store Group',
    location: 'Dubai & Riyadh',
    title: 'Fractional CTO Steering & Legacy ERP License Consolidation',
    challenge: 'The conglomerate operated 8 disparate software systems across 35 retail stores, hemorrhaging millions in redundant licensing and suffering from frequent POS outages.',
    solution: 'Embedded an executive Fractional CTO to redesign corporate architecture, terminate bloated legacy software contracts, and negotiate modern cloud vendor agreements.',
    results: [
      { label: 'IT OPEX Saved', metric: 'AED 1.1M/Yr' },
      { label: 'Vendor Contracts Cut', metric: '8 to 2' },
      { label: 'POS Downtime', metric: 'Zero Incidents' },
      { label: 'Staff Alignment', metric: '100% On-Track' }
    ],
    technologies: ['Enterprise Architecture', 'TOGAF', 'Cloud Cost Management', 'DESC Standards', 'Agile Steering'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
    quote: {
      text: 'Nexus didn’t just give us advice; their Fractional CTO sat with our board and took ownership of the transition. The savings alone paid for the service five times over.',
      author: 'Dr. Mona Al-Sayegh',
      role: 'Executive Vice President'
    }
  }
];

export default function CaseStudies() {
  const [filter, setFilter] = useState<string>('all');
  const { formatPrice } = useCurrency();

  const filteredStudies = filter === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === filter);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Case Studies & Client Impact</span>
        </div>
      </div>

      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MorphBlock className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span>Proven Enterprise Track Record across Dubai & the GCC</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            Engineering Outcomes, Not Just Promises.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Explore how leading UAE financial institutions, luxury real estate brokerages, regional supply chain operators, and multi-brand conglomerates scale with Nexus IT Services.
          </p>
        </MorphBlock>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Engagements' },
            { id: 'cloud', label: 'Sovereign Cloud & IT' },
            { id: 'software', label: 'Custom Software & CRM' },
            { id: 'ai', label: 'AI & Automation' },
            { id: 'creative', label: 'Creative & 3D Media' },
            { id: 'advisory', label: 'Advisory & Fractional CTO' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filter === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {filteredStudies.map((study, idx) => (
            <MorphBlock key={study.id} delay={idx * 0.05} className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Visual / Image Col (5 cols) */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{study.location}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono opacity-80 mb-1">{study.clientType}</div>
                    <div className="text-base font-bold">{study.clientName}</div>
                  </div>
                </div>

                {/* Content Col (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug">
                      {study.title}
                    </h3>
                    
                    <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <div>
                        <strong className="text-slate-900">The Challenge: </strong>
                        <span>{study.challenge}</span>
                      </div>
                      <div>
                        <strong className="text-emerald-700">The Nexus Solution: </strong>
                        <span>{study.solution}</span>
                      </div>
                    </div>

                    {/* Metrics Banner */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 pt-2">
                      {study.results.map((res, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
                          <div className="text-lg sm:text-xl font-black text-blue-700 font-mono">{res.metric}</div>
                          <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{res.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial Quote */}
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 italic relative">
                      "{study.quote.text}"
                      <div className="not-italic font-bold text-slate-900 mt-2 flex items-center gap-2">
                        <span>— {study.quote.author}</span>
                        <span className="text-slate-400 font-normal">| {study.quote.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer & Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {study.technologies.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link to="/contact">
                      <button className="px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer">
                        <span>Discuss Similar Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>

                </div>

              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 sm:p-12 rounded-3xl shadow-md text-center max-w-4xl mx-auto space-y-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            Ready to Accelerate Your Enterprise?
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold">
            Book an In-Person Technical Discovery Session
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Meet our senior solutions directors at Radiance ONE Business Center, Rigga Al Buteen, Dubai, or invite us to your headquarters.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link to="/contact">
              <button className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm">
                Schedule Meeting
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
