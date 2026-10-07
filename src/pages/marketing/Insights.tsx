import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, BookOpen, Clock, Tag, Search, 
  ExternalLink, TrendingUp, ShieldCheck, Server, Bot, 
  FileText, CheckCircle2, ChevronRight, Building2
} from 'lucide-react';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';

interface InsightArticle {
  id: string;
  category: 'cloud' | 'ai' | 'regulatory' | 'proptech' | 'case-study';
  categoryLabel: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
  };
  metrics?: { label: string; value: string };
  tags: string[];
}

const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: 'uae-data-residency-law-45',
    category: 'regulatory',
    categoryLabel: 'UAE Regulatory & Compliance',
    title: 'Navigating UAE Federal Decree-Law No. 45: What Every DXB Enterprise Must Host In-Country',
    summary: 'A practical technical guide for CTOs and CISOs on cross-border data transfer restrictions, sovereign cloud requirements on AWS me-central-1 and Azure UAE North, and DFSA audit readiness.',
    readTime: '6 min read',
    date: 'September 2026',
    featured: true,
    author: {
      name: 'Dr. Tariq Al-Mansoor',
      role: 'Principal Cloud Architect & Compliance Fellow',
    },
    metrics: { label: 'Compliance Penalty Risk Avoided', value: 'Up to AED 10M' },
    tags: ['Federal Law No. 45', 'AWS me-central-1', 'DFSA', 'Data Residency', 'ADGM'],
  },
  {
    id: 'dubai-real-estate-crm-dld-sync',
    category: 'proptech',
    categoryLabel: 'PropTech & Real Estate',
    title: 'How High-Volume Dubai Brokerages Handle AED 1.4B in Off-Plan Deals with Real-Time WhatsApp CRM',
    summary: 'Architectural breakdown of integrating custom multi-tenant CRM platforms with direct DLD title deed verification and automated bilingual WhatsApp lead response.',
    readTime: '5 min read',
    date: 'August 2026',
    featured: true,
    author: {
      name: 'Omar Khouri',
      role: 'Head of Software Engineering',
    },
    metrics: { label: 'First-Touch Lead Response', value: '< 15 Seconds' },
    tags: ['PropTech', 'DLD Verification', 'WhatsApp Automation', 'Off-Plan'],
  },
  {
    id: 'zero-trust-cloud-migration-difc',
    category: 'cloud',
    categoryLabel: 'Sovereign Cloud & Security',
    title: 'Zero-Downtime Sovereign Migration: Moving Wealth Management Cores into UAE Sovereign Data Centers',
    summary: 'Step-by-step migration blueprint used to transition regulated financial services from European legacy servers to Dubai-based active-active cloud clusters with Fortinet zero-trust defense.',
    readTime: '8 min read',
    date: 'July 2026',
    author: {
      name: 'Farhan Siddiqui',
      role: 'Lead Infrastructure Engineer',
    },
    metrics: { label: 'Latency Reduction', value: '-68% Regional Latency' },
    tags: ['Cloud Migration', 'Zero-Trust', 'Fortinet', 'DIFC', 'Sovereignty'],
  },
  {
    id: 'ai-customer-service-hospitality-uae',
    category: 'ai',
    categoryLabel: 'Enterprise AI & Automation',
    title: 'Bilingual AI Concierge in Luxury Hospitality: Resolving 82% of Guest Requests Instantly',
    summary: 'How 5-star hotels and private dining entities in Downtown Dubai use fine-tuned RAG pipelines and WhatsApp bots to handle concierge requests, spa bookings, and room services.',
    readTime: '4 min read',
    date: 'June 2026',
    author: {
      name: 'Aisha Al-Nuaimi',
      role: 'AI Solutions Director',
    },
    metrics: { label: 'Automated Resolutions', value: '82% Without Staff' },
    tags: ['RAG Pipeline', 'Bilingual AI', 'Hospitality', 'WhatsApp API'],
  },
  {
    id: 'uae-corporate-tax-erp-compliance',
    category: 'regulatory',
    categoryLabel: 'UAE Regulatory & Compliance',
    title: 'Configuring Enterprise ERP for UAE Corporate Tax (9%) & FTA E-Invoicing Mandates',
    summary: 'What growing businesses need to know about upcoming UAE FTA digital invoice exchange (Peppol framework) and automating inter-company transfer pricing documentation.',
    readTime: '7 min read',
    date: 'May 2026',
    author: {
      name: 'Rami Haddad',
      role: 'Enterprise Systems Consultant',
    },
    metrics: { label: 'Tax Filing Accuracy', value: '100% FTA Aligned' },
    tags: ['UAE Corporate Tax', 'FTA VAT', 'E-Invoicing', 'ERP Architecture'],
  },
  {
    id: 'case-study-dfsa-asset-management',
    category: 'case-study',
    categoryLabel: 'Client Case Study',
    title: 'Case Study: Transitioning Al-Thuraya Wealth Management to Zero-Downtime UAE Sovereign Cloud',
    summary: 'Full post-mortem analysis of transitioning a DFSA-regulated asset manager with zero trading interruption, reducing annual infrastructure OPEX by AED 380,000.',
    readTime: '5 min read',
    date: 'April 2026',
    author: {
      name: 'Editorial Team',
      role: 'Nexus Client Stories',
    },
    metrics: { label: 'Annual OPEX Saved', value: 'AED 380,000' },
    tags: ['Case Study', 'DFSA', 'AWS UAE', 'Cost Optimization'],
  },
];

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = INSIGHTS_DATA.filter((article) => {
    const matchesCat = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

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
              <span>Technology Thought Leadership &amp; Engineering Reports</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-5 max-w-4xl mx-auto">
              Nexus Insights &amp; Market Intelligence
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
              In-depth research on UAE sovereign data laws, enterprise software engineering, AI agent implementations, and high-stakes digital transformations in Dubai and the GCC.
            </p>
          </MorphBlock>
        </div>
      </section>

      {/* Main Insights Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200/80">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Insights' },
                { id: 'regulatory', label: 'UAE Compliance & Law 45' },
                { id: 'proptech', label: 'PropTech & DLD' },
                { id: 'cloud', label: 'Sovereign Cloud' },
                { id: 'ai', label: 'AI Automation' },
                { id: 'case-study', label: 'Case Studies' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0046AF] text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics or regulations..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0046AF]/20 focus:border-[#0046AF]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Featured Article Card (if first matches) */}
          {filteredArticles.length > 0 && selectedCategory === 'all' && searchQuery === '' && (
            <div className="mb-12 bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-4">
                <span>⭐ Featured Engineering Whitepaper</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-3">
                    {filteredArticles[0].title}
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {filteredArticles[0].summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-6">
                    <span className="font-semibold text-slate-900">{filteredArticles[0].author.name}</span>
                    <span>•</span>
                    <span>{filteredArticles[0].author.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {filteredArticles[0].readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {filteredArticles[0].tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between h-full">
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Key Takeaway:
                    </div>
                    <div className="text-2xl font-black text-[#0046AF] mb-1">
                      {filteredArticles[0].metrics?.value}
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      {filteredArticles[0].metrics?.label}
                    </div>
                  </div>
                  <Link to="/contact" className="mt-6">
                    <button className="w-full bg-[#0046AF] hover:bg-[#00388C] text-white py-2.5 rounded-full text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <span>Request Full Advisory Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-[#0046AF] bg-blue-50 px-2.5 py-1 rounded-full">
                      {article.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0046AF] transition-colors leading-snug mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-slate-800">{article.author.name}</span>
                    <span className="font-mono text-[11px]">{article.date}</span>
                  </div>

                  {article.metrics && (
                    <div className="mb-3 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{article.metrics.label}:</span>
                      <span className="font-bold text-[#0046AF]">{article.metrics.value}</span>
                    </div>
                  )}

                  <Link 
                    to="/contact"
                    className="flex items-center justify-between text-xs font-bold text-[#0046AF] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Discuss Implementation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-600">No insight articles matching your search query.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-3 text-xs font-bold text-[#0046AF] hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Direct Consultation Banner */}
          <div className="mt-16 rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Need a Custom Architectural Audit?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Our senior engineering team conducts bespoke security audits, UAE cloud sovereignty assessments, and software modernizations for enterprise clients.
              </p>
            </div>
            <Link to="/contact" className="shrink-0">
              <button className="bg-[#0046AF] hover:bg-[#00388C] text-white px-6 py-3.5 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer">
                <span>Book Architecture Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
