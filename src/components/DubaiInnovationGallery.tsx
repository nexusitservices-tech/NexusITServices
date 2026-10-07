import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Code, Bot, Palette, Briefcase, MapPin, 
  ExternalLink, CheckCircle2, ShieldCheck, ArrowRight, X, Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface GalleryItem {
  id: string;
  category: 'cloud' | 'software' | 'ai' | 'creative' | 'advisory';
  title: string;
  location: string;
  description: string;
  image: string;
  tags: string[];
  specs: { label: string; value: string }[];
  deliverable: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'uae-cloud-datacenter',
    category: 'cloud',
    title: 'UAE In-Country Cloud Infrastructure',
    location: 'AWS Middle East & Azure UAE North (Dubai / Abu Dhabi)',
    description: 'High-availability sovereign cloud clusters configured for zero-loss failover, enterprise firewall micro-segmentation, and strict UAE data residency.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tags: ['AWS UAE', 'Azure UAE North', 'ISO 27001', 'Zero Trust'],
    specs: [
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Latency to DXB Hub', value: '< 2ms' },
      { label: 'Compliance', value: 'TDRA Data Decree-Law 45' }
    ],
    deliverable: 'Fully managed enterprise cloud with automated backups, DDoS mitigation, and 24/7 Dubai SOC monitoring.'
  },
  {
    id: 'difc-proptech-platform',
    category: 'software',
    title: 'DIFC FinTech & PropTech Digital Portals',
    location: 'Radiance ONE Business Center & DIFC Tech Hub',
    description: 'Bespoke web and mobile platforms built for Dubai real estate conglomerates and financial firms, featuring native Arabic RTL and payment gateway sync.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js 14', 'Flutter Mobile', 'Arabic RTL', 'UAE Pass'],
    specs: [
      { label: 'Framework', value: 'React / Next.js / TypeScript' },
      { label: 'Mobile Platforms', value: 'iOS & Android Native' },
      { label: 'Performance', value: '98+ Lighthouse Score' }
    ],
    deliverable: 'Turnkey code repository, CI/CD automated pipeline, and 100% intellectual property ownership transferred to client.'
  },
  {
    id: 'dso-ai-automation-lab',
    category: 'ai',
    title: 'AI WhatsApp & Enterprise Workflow Bots',
    location: 'Dubai Silicon Oasis & Internet City Lab',
    description: 'Intelligent conversational AI integrated directly into official WhatsApp Business API, syncing customer inquiries, bookings, and trade documents with client CRMs.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['WhatsApp Cloud API', 'Gemini Pro', 'FastAPI', 'Arabic NLP'],
    specs: [
      { label: 'Languages', value: 'Modern Standard Arabic & English' },
      { label: 'Response Velocity', value: '< 1.5s average' },
      { label: 'CRM Integrations', value: 'Salesforce, HubSpot, Zoho, SAP' }
    ],
    deliverable: 'Custom fine-tuned bilingual LLM model with private data boundary and WhatsApp verified green-tick onboarding.'
  },
  {
    id: 'dubai-executive-advisory',
    category: 'advisory',
    title: 'Dubai Executive Tech Advisory & Strategy',
    location: 'Radiance ONE Business Center, Rigga Al Buteen, Dubai',
    description: 'High-level fractional CTO guidance, digital transformation strategy aligned with Dubai Economic Agenda D33, and vendor consolidation audits.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Fractional CTO', 'Dubai D33', 'IT Governance', 'Vendor Audit'],
    specs: [
      { label: 'Advisory Mode', value: 'In-Person & Steering Committee' },
      { label: 'Average Cost Savings', value: '28% - 35% on IT spend' },
      { label: 'Location', value: 'On-Site at Client Dubai Office' }
    ],
    deliverable: 'Comprehensive 3-year digital transformation architecture, vendor consolidation plan, and board-ready technical roadmaps.'
  },
  {
    id: 'creative-media-production',
    category: 'creative',
    title: 'Corporate Visual Identity & 4K Media',
    location: 'Dubai Design District (d3) & Media City',
    description: 'Commanding brand systems, corporate 4K executive video production, and investor pitch decks designed for high-profile Middle East capital raises.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brand Identity', '4K Video', 'Pitch Decks', 'd3 Production'],
    specs: [
      { label: 'Video Resolution', value: '4K Cinema HDR' },
      { label: 'Brand Guidelines', value: 'Arabic & English Typography' },
      { label: 'Licensing', value: 'Full Commercial Global Rights' }
    ],
    deliverable: 'Complete corporate visual assets, vector design library, and multi-channel campaign collateral.'
  },
  {
    id: 'dubai-smart-city-skyline',
    category: 'cloud',
    title: 'Smart City Network Integration',
    location: 'Dubai Internet City & JAFZA Logistics Corridor',
    description: 'Secure IoT telemetry and high-density wireless grid engineering connecting distributed headquarters, distribution warehouses, and regional branches.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Wi-Fi 6 Enterprise', 'Fortinet SD-WAN', 'Cisco Meraki', 'IoT Hub'],
    specs: [
      { label: 'Coverage', value: 'Multi-site GCC interconnection' },
      { label: 'Encryption', value: 'IPSec VPN & WireGuard' },
      { label: 'Support SLA', value: '24/7/365 On-Call' }
    ],
    deliverable: 'Zero-touch SD-WAN deployment, unified dashboard monitoring, and automated failover cellular links.'
  }
];

export default function DubaiInnovationGallery() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Technology in Action across Dubai & the GCC</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Engineering Excellence in the UAE
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 sm:mt-3 leading-relaxed">
              Explore our verified project footprints, technical infrastructure deployments, and digital innovations spanning Dubai Downtown, DIFC, Dubai Silicon Oasis, and Abu Dhabi.
            </p>
          </div>

          {/* Interactive Filters */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 sm:p-1.5 bg-slate-100 rounded-2xl border border-slate-200 self-start md:self-auto">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'cloud', label: 'Cloud & Cyber' },
              { id: 'software', label: 'Software & Web' },
              { id: 'ai', label: 'AI Automation' },
              { id: 'advisory', label: 'Tech Advisory' },
              { id: 'creative', label: 'Creative Media' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Image Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={() => setSelectedItem(item)}
                className="group rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer flex flex-col"
              >
                {/* Image Container with Hover Scale & Location Tag */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/60 text-[10px] font-semibold">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      <span>{item.location}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="font-mono text-[11px] text-blue-300 font-semibold bg-blue-950/70 px-2 py-0.5 rounded-md border border-blue-800/60">
                      Nexus IT Project
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium group-hover:text-white transition-colors flex items-center gap-1">
                      <span>Inspect Specs</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Lightbox for Full Project Inspection */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Hero Image */}
                <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold uppercase">
                        UAE Deployment
                      </span>
                      <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {selectedItem.location}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{selectedItem.title}</h3>
                  </div>
                </div>

                {/* Modal Details */}
                <div className="p-6 md:p-8 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Architecture & Scope Overview
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Technical Specifications */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Performance & SLA Specifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedItem.specs.map((sp, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-[11px] text-slate-500 block mb-1">{sp.label}</span>
                          <span className="text-sm font-bold text-slate-900 font-mono">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Deliverable */}
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#0046AF] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-blue-900 block mb-0.5">
                        Guaranteed Client Deliverable
                      </span>
                      <p className="text-xs text-[#0046AF] leading-relaxed">
                        {selectedItem.deliverable}
                      </p>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.tags.map((tg, i) => (
                        <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                          {tg}
                        </span>
                      ))}
                    </div>

                    <Link to="/contact" className="w-full sm:w-auto">
                      <button 
                        onClick={() => setSelectedItem(null)}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-2"
                      >
                        <span>Consult Our Engineering Team</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
