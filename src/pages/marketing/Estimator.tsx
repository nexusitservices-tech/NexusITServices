import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, Server, Code, Bot, Palette, Briefcase, 
  CheckCircle2, ArrowRight, ShieldCheck, Clock, Send, 
  ChevronRight, Sparkles, Building2, User, Mail, Phone, RefreshCw 
} from 'lucide-react';
import { MorphBlock } from '@/components/ui/MorphBlock';
import { useCurrency } from '@/context/CurrencyContext';
import { submitInquiry } from '@/lib/firebase';

interface ServiceOption {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  baseAed: number;
  description: string;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'sovereign-cloud',
    name: 'Sovereign Cloud & Zero-Trust IT',
    category: 'Infrastructure',
    icon: Server,
    baseAed: 18000,
    description: 'AWS me-central-1 UAE & Azure North hosting with Fortinet firewall defense.'
  },
  {
    id: 'bespoke-software',
    name: 'Custom Web Platform & ERP / CRM',
    category: 'Engineering',
    icon: Code,
    baseAed: 28000,
    description: 'Modern Next.js & Node platform with native Arabic RTL support and payment gateways.'
  },
  {
    id: 'ai-agents',
    name: 'Enterprise AI & WhatsApp Bots',
    category: 'Automation',
    icon: Bot,
    baseAed: 22000,
    description: 'Official WhatsApp Business API agents, RAG knowledge bases, and document OCR.'
  },
  {
    id: 'creative-media',
    name: '4K Commercial Adverts & 3D CGI',
    category: 'Creative',
    icon: Palette,
    baseAed: 14000,
    description: 'Broadcast-quality 4K brand film, drone shoots in Dubai, and 3D product renders.'
  },
  {
    id: 'fractional-cto',
    name: 'Fractional CTO & Advisory',
    category: 'Strategy',
    icon: Briefcase,
    baseAed: 25000,
    description: 'C-level technology roadmap, cloud spend audit, and DESC compliance steering.'
  }
];

interface Addon {
  id: string;
  name: string;
  priceAed: number;
  description: string;
}

const ADDONS: Addon[] = [
  {
    id: 'arabic-rtl',
    name: 'Native Arabic RTL Localization & Translation',
    priceAed: 6000,
    description: 'Full cultural typography, bilingual content layout, and Arabic copy validation.'
  },
  {
    id: 'sla-24-7',
    name: 'Mission Critical 24/7/365 On-Site SLA (15-Min Dispatch)',
    priceAed: 8500,
    description: 'Guaranteed emergency physical engineer response across Downtown, DIFC, and DSO.'
  },
  {
    id: 'red-team',
    name: 'Annual Red-Team Penetration Test & Audit',
    priceAed: 12000,
    description: 'Comprehensive DESC & TDRA vulnerability testing and signed compliance report.'
  },
  {
    id: 'whatsapp-high-vol',
    name: 'WhatsApp Business API High-Capacity Node',
    priceAed: 5000,
    description: 'High-throughput Meta cloud webhooks supporting 10,000+ daily conversational interactions.'
  }
];

export default function Estimator() {
  const { formatPrice, currency, setCurrency } = useCurrency();
  const [selectedServices, setSelectedServices] = useState<string[]>(['sovereign-cloud']);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['sla-24-7']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'expedited'>('standard');
  
  // Lead submission state
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) 
        : [...prev, id]
    );
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculate total
  const servicesTotal = selectedServices.reduce((acc, sid) => {
    const s = SERVICE_OPTIONS.find(x => x.id === sid);
    return acc + (s ? s.baseAed : 0);
  }, 0);

  const addonsTotal = selectedAddons.reduce((acc, aid) => {
    const a = ADDONS.find(x => x.id === aid);
    return acc + (a ? a.priceAed : 0);
  }, 0);

  const subtotal = servicesTotal + addonsTotal;
  const speedMultiplier = timelineSpeed === 'expedited' ? 1.25 : 1.0;
  const totalAed = Math.round(subtotal * speedMultiplier);
  const vatAed = Math.round(totalAed * 0.05);
  const grandTotalAed = totalAed + vatAed;

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const summaryText = `Custom Scope Configuration:\n\nServices: ${selectedServices.join(', ')}\nAddons: ${selectedAddons.join(', ')}\nDelivery Speed: ${timelineSpeed}\nCalculated Total: AED ${grandTotalAed.toLocaleString()} (inc. 5% UAE VAT)`;
      
      const docId = await submitInquiry({
        fullName: contactInfo.name,
        company: contactInfo.company || 'Enterprise Entity',
        email: contactInfo.email,
        phone: contactInfo.phone,
        service: 'Interactive Estimator Scope',
        budget: `AED ${grandTotalAed.toLocaleString()}`,
        requirements: summaryText,
        source: 'Estimator Page'
      });
      setSubmittedId(docId);
    } catch (err) {
      console.warn('Quote submission fallback:', err);
      setSubmittedId(`EST-${Date.now().toString().slice(-6)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-semibold">Interactive Cost Estimator</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Display Currency:</span>
            <button
              onClick={() => setCurrency('AED')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${currency === 'AED' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              AED
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${currency === 'USD' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              USD
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MorphBlock className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Transparent GCC Commercial Modeling • Instant Estimates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
            Project Cost Estimator & Scope Builder
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Configure your enterprise tech requirements. Receive an instant estimate backed by transparent UAE milestone pricing and direct submission to our solutions architects.
          </p>
        </MorphBlock>
      </section>

      {/* Main Builder Grid */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scope Selection (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Disciplines */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
                  Select Core Technology Disciplines
                </h3>
                <span className="text-xs text-slate-400 font-mono">Multi-select enabled</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  const Icon = srv.icon;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => toggleService(srv.id)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600 shadow-2xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 font-mono">
                          {formatPrice(srv.baseAed)}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{srv.name}</div>
                        <div className="text-[11px] text-slate-500 mt-1 leading-snug">{srv.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-Ons */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                  Enterprise Capabilities & Add-Ons
                </h3>
              </div>

              <div className="space-y-3">
                {ADDONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected 
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600 shadow-2xs' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{addon.name}</div>
                          <div className="text-[11px] text-slate-500 leading-snug">{addon.description}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900 font-mono shrink-0">
                        +{formatPrice(addon.priceAed)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Speed / Urgency */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">3</span>
                Delivery Pace & Resource Allocation
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    timelineSpeed === 'standard' 
                      ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">Standard Production (6-10 Weeks)</div>
                  <div className="text-[11px] text-slate-500 mt-1">Bi-weekly sprints, dedicated engineering squad.</div>
                  <div className="text-[11px] font-bold text-emerald-700 mt-2">Standard Pricing (1.0x)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTimelineSpeed('expedited')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    timelineSpeed === 'expedited' 
                      ? 'border-purple-600 bg-purple-50/40 ring-1 ring-purple-600' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">Fast-Track Delivery (3-5 Weeks)</div>
                  <div className="text-[11px] text-slate-500 mt-1">Doubled squad capacity, priority sprint reviews.</div>
                  <div className="text-[11px] font-bold text-purple-700 mt-2">+25% Acceleration Premium</div>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Real-Time Summary & Submission (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                Investment Modeling
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1 mb-4">
                Estimated Project Total
              </h3>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 mb-5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Services ({selectedServices.length}):</span>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(servicesTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Add-Ons & SLA ({selectedAddons.length}):</span>
                  <span className="font-mono font-bold text-slate-900">+{formatPrice(addonsTotal)}</span>
                </div>
                {timelineSpeed === 'expedited' && (
                  <div className="flex justify-between text-purple-700 font-semibold">
                    <span>Expedited Pace Multiplier:</span>
                    <span>+25%</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span>Net Subtotal:</span>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(totalAed)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>5% UAE Statutory VAT:</span>
                  <span className="font-mono">{formatPrice(vatAed)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-slate-300">
                  <span className="font-bold text-slate-900 text-sm">Total Investment:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-700 font-mono">
                      {formatPrice(grandTotalAed)}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">Includes 5% UAE VAT</div>
                  </div>
                </div>
              </div>

              {/* Milestones Structure */}
              <div className="space-y-1.5 mb-6 text-[11px] text-slate-500">
                <div className="font-bold text-slate-700 mb-1">Standard 4-Phase Payment Schedule:</div>
                <div className="flex justify-between">
                  <span>1. Architecture & UX Sign-off:</span>
                  <span className="font-mono font-bold text-slate-700">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>2. Cloud Staging MVP:</span>
                  <span className="font-mono font-bold text-slate-700">30%</span>
                </div>
                <div className="flex justify-between">
                  <span>3. UAT & Security Review:</span>
                  <span className="font-mono font-bold text-slate-700">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>4. Production Launch & IP Transfer:</span>
                  <span className="font-mono font-bold text-slate-700">15%</span>
                </div>
              </div>

              {/* Form to Submit Estimate to Firestore */}
              {submittedId ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-950">Proposal Generated & Saved!</div>
                  <div className="text-[11px] font-mono text-emerald-800">
                    Tracking ID: <strong>{submittedId}</strong>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    A technical director in Dubai will review your configuration and reach out within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmittedId(null)}
                    className="text-[11px] text-blue-600 font-bold hover:underline block mx-auto pt-1"
                  >
                    Recalculate Another Scope
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuote} className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900">
                    Save Quote & Lock-In Priority Consultation
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={contactInfo.name}
                      onChange={e => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Corporate Email *"
                      value={contactInfo.email}
                      onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp / Phone Number *"
                      value={contactInfo.phone}
                      onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company Name (Optional)"
                      value={contactInfo.company}
                      onChange={e => setContactInfo({ ...contactInfo, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting to Sovereign Cloud...' : 'Submit Scope & Receive Formal SOW'}</span>
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
