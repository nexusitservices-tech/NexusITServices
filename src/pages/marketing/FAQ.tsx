import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, ChevronDown, Search, ShieldCheck, 
  Server, Code, Bot, DollarSign, Clock, ArrowRight, ChevronRight, MessageSquare 
} from 'lucide-react';
import { MorphBlock } from '@/components/ui/MorphBlock';

interface FAQItem {
  id: string;
  category: 'sovereignty' | 'pricing' | 'sla' | 'tech' | 'contracts';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'data-residency',
    category: 'sovereignty',
    question: 'Where will our company data and cloud servers physically reside?',
    answer: 'Unless explicitly contracted otherwise for global multi-region redundancy, all customer communications, proprietary source code, and managed database records are hosted strictly within sovereign data centers located physically inside the United Arab Emirates. We deploy on AWS me-central-1 (UAE) and Microsoft Azure UAE North (Dubai), fully complying with UAE Federal Decree-Law No. 45 on Personal Data Protection and Dubai Electronic Security Center (DESC) standards.'
  },
  {
    id: 'ai-training',
    category: 'sovereignty',
    question: 'Does Nexus use client code or internal company documents to train public AI foundation models?',
    answer: 'Strictly zero. We operate under an ironclad zero-public-training policy. When we implement Retrieval-Augmented Generation (RAG) copilots, WhatsApp AI agents, or document OCR pipelines, all processing runs through private Azure OpenAI UAE instances or isolated self-hosted models in your private VPC. Your proprietary contracts, code, and financial data are never exposed or used to train any third-party model.'
  },
  {
    id: 'code-ownership',
    category: 'contracts',
    question: 'Who owns the custom software, source code, and intellectual property developed by Nexus?',
    answer: 'You own 100% of the intellectual property upon milestone settlement. We believe in total vendor freedom: upon project delivery, you receive full administrative Git repository rights, container deployment Dockerfiles, architectural blueprints, and Figma assets. There are zero licensing fees or hostage code.'
  },
  {
    id: 'vat-currency',
    category: 'pricing',
    question: 'What currency are projects billed in, and how is UAE VAT handled?',
    answer: 'Commercial proposals are primarily denominated in United Arab Emirates Dirham (AED), with USD invoicing available for international entities. As a licensed UAE entity (DED License No. 1048291-DXB), invoices are subject to 5% UAE Value Added Tax (VAT) with valid Tax Registration Numbers (TRN: 100482910000003) for your input tax recovery.'
  },
  {
    id: 'onsite-sla',
    category: 'sla',
    question: 'How fast can a senior engineer arrive on-site at our Dubai office in an emergency?',
    answer: 'For contracted Enterprise and Mission-Critical SLA tiers, we guarantee a 15-minute emergency on-site engineer dispatch for physical server, firewall, or network rack incidents in Downtown Dubai, DIFC, Business Bay, Dubai Internet City, and Dubai Silicon Oasis.'
  },
  {
    id: 'whatsapp-integration',
    category: 'tech',
    question: 'Are your WhatsApp automation bots built using the official Meta WhatsApp Business API?',
    answer: 'Yes. We are an authorized implementation partner utilizing the official Meta WhatsApp Cloud API. This ensures zero risk of phone number banning, high message deliverability, green-badge verification support, and enterprise webhooks that seamlessly stream customer leads directly into your custom CRM or ERP.'
  },
  {
    id: 'payment-milestones',
    category: 'pricing',
    question: 'What is the typical payment milestone structure for custom software and cloud migrations?',
    answer: 'For fixed-scope engineering deliveries, we typically structure engagements into 4 transparent milestones: 30% upon architecture and UX sign-off, 30% upon staging environment deployment, 25% upon user acceptance testing (UAT), and 15% upon final production launch and full code hand-off.'
  },
  {
    id: 'bilingual-rtl',
    category: 'tech',
    question: 'How do you handle Arabic language support and Right-to-Left (RTL) layouts?',
    answer: 'We do not simply auto-translate strings. We engineer bidirectional interfaces from the ground up with native RTL CSS typography, culturally fluent copy tailored to GCC audiences, and LLMs fine-tuned on both Modern Standard Arabic (MSA) and regional colloquial dialects.'
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'data-residency': true,
    'code-ownership': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = FAQ_DATA.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Knowledge Hub & Enterprise FAQ</span>
        </div>
      </div>

      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <MorphBlock>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Direct Answers for UAE Executives & Procurement Boards</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our sovereign UAE cloud facilities, intellectual property guarantees, SLAs, and commercial engagement terms.
          </p>
        </MorphBlock>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search topics (e.g. data residency, code ownership, VAT, WhatsApp)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 mt-6 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'sovereignty', label: 'UAE Data Sovereignty' },
            { id: 'contracts', label: 'IP & Contracts' },
            { id: 'pricing', label: 'Fees & 5% VAT' },
            { id: 'sla', label: 'SLAs & Emergency Dispatch' },
            { id: 'tech', label: 'Tech Stack & AI' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion FAQ List */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
              <p className="text-sm text-slate-500">No matching questions found for "{searchTerm}".</p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map(faq => {
              const isOpen = !!openItems[faq.id];
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Have a Specific Enterprise Requirement?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Speak directly with an enterprise architect in Dubai or reach our WhatsApp hotline.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/971526367221?text=Hello%20Nexus%2C%20I%20have%20a%20technical%20question%20regarding%20an%20enterprise%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#0046AF] hover:bg-[#00388C] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <Link to="/contact">
              <button className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5">
                <span>Book Dubai Discovery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
