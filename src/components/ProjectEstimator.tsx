import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Code, Bot, Palette, Briefcase, 
  Check, ArrowRight, Shield, Download, 
  Sparkles, Clock, Calculator, Send, CheckCircle2 
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface ServiceOption {
  id: string;
  name: string;
  icon: any;
  baseAed: number;
  description: string;
  features: string[];
}

const SERVICES: ServiceOption[] = [
  {
    id: 'it-infra',
    name: 'IT Infrastructure & Cybersecurity',
    icon: Server,
    baseAed: 18000,
    description: 'Enterprise network setup, firewall protection, cloud migration, and 24/7 managed IT support.',
    features: ['UAE Cloud Migration (AWS/Azure)', 'Zero-Trust Cybersecurity & Audit', '24/7 Disaster Recovery & Backup', 'Workstation & Server Management']
  },
  {
    id: 'software',
    name: 'Custom Software & Web Platform',
    icon: Code,
    baseAed: 28000,
    description: 'High-performance React/Node web platforms, bespoke ERP/CRM software, and e-commerce portals.',
    features: ['Custom Enterprise Architecture', 'Payment Gateway (Stripe/Telr/Network Intl)', 'Role-Based Access & Admin Dashboard', 'API Integrations & Mobile Responsiveness']
  },
  {
    id: 'mobile',
    name: 'iOS & Android Mobile App',
    icon: Code,
    baseAed: 35000,
    description: 'Native or Flutter cross-platform mobile apps published to Apple App Store & Google Play.',
    features: ['Dual Platform iOS & Android', 'Push Notifications & Real-Time Sync', 'Biometric & UAE Pass Ready', 'App Store Submission & Approval']
  },
  {
    id: 'ai-automation',
    name: 'AI Agents & Process Automation',
    icon: Bot,
    baseAed: 22000,
    description: 'Custom AI conversational bots, automated CRM pipelines, and intelligent document processing.',
    features: ['Multilingual Arabic & English AI Bot', 'WhatsApp Business API Automated Bot', 'Document Extraction & OCR Pipeline', 'Custom Gemini & LLM Fine-Tuning']
  },
  {
    id: 'creative',
    name: 'Corporate Branding & Media',
    icon: Palette,
    baseAed: 12000,
    description: 'Brand identity system, 4K corporate video production, pitch decks, and digital collateral.',
    features: ['Complete Brand Guidelines & Logo Suite', 'Corporate Video & Executive Photography', 'Marketing Collateral & Pitch Decks', 'Social Media Asset Kits']
  },
  {
    id: 'consulting',
    name: 'Digital Transformation Advisory',
    icon: Briefcase,
    baseAed: 15000,
    description: 'Strategic tech audits, vendor consolidation, architecture review, and UAE regulatory roadmaps.',
    features: ['Technology Stack Audit & Optimization', 'Vendor Consolidation Strategy', 'TDRA & Data Residency Advisory', 'Cost-Reduction Technology Roadmap']
  }
];

export default function ProjectEstimator() {
  const { formatPrice, currency, setCurrency } = useCurrency();
  const [selectedService, setSelectedService] = useState<string>('software');
  const [scale, setScale] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [speed, setSpeed] = useState<'standard' | 'express'>('standard');
  const [includeCompliance, setIncludeCompliance] = useState<boolean>(true);
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // Client Form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  const currentService = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  // Pricing formula
  const scaleMultiplier = scale === 'starter' ? 0.75 : scale === 'growth' ? 1.0 : 1.7;
  const speedMultiplier = speed === 'express' ? 1.25 : 1.0;
  const complianceAddon = includeCompliance ? 4500 : 0;

  const estimatedAed = Math.round((currentService.baseAed * scaleMultiplier * speedMultiplier) + complianceAddon);
  const minRange = Math.round(estimatedAed * 0.9);
  const maxRange = Math.round(estimatedAed * 1.15);

  const estimatedWeeks = scale === 'starter' 
    ? (speed === 'express' ? '2-3 Weeks' : '4-5 Weeks') 
    : scale === 'growth' 
      ? (speed === 'express' ? '4-6 Weeks' : '6-8 Weeks') 
      : (speed === 'express' ? '8-10 Weeks' : '12-16 Weeks');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // also open WhatsApp optionally
      const text = `Hello Nexus IT! My name is ${clientName} from ${clientCompany || 'UAE'}. I generated an estimate for ${currentService.name} (~${formatPrice(estimatedAed)}). Can we discuss formal scope?`;
      window.open(`https://wa.me/971526367221?text=${encodeURIComponent(text)}`, '_blank');
      setShowInquiryModal(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <section id="estimator" className="w-full py-12 sm:py-16 md:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0046AF] text-xs font-semibold mb-3 sm:mb-4 shadow-2xs">
              <Calculator className="w-3.5 h-3.5 text-[#0046AF]" />
              <span>Transparent UAE Project Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Instant Scope & Cost Estimator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 leading-relaxed">
              No generic sales pitches. Configure your technology requirements and receive an immediate ballpark investment figure tailored for UAE enterprises.
            </p>
          </div>

          {/* Currency Toggle (Once UI Segmented Control) */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 p-1 sm:p-1.5 rounded-full border border-slate-200 self-start md:self-auto shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 pl-2.5 sm:pl-3 pr-1">Currency:</span>
            <button
              onClick={() => setCurrency('AED')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currency === 'AED' ? 'bg-white text-[#0046AF] shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AED (د.إ)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-white text-[#0046AF] shadow-xs border border-slate-200/60' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 bg-slate-50/80 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-2xs">
            
            {/* Step 1: Service Selection */}
            <div>
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono block mb-3">
                1. Select Core Capability
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  const isSelected = selectedService === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id)}
                      className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 cursor-pointer select-none ${
                        isSelected 
                          ? 'bg-blue-50/80 text-slate-900 border-2 border-[#0046AF] shadow-xs' 
                          : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-[#0046AF] text-white' : 'bg-blue-50 text-[#0046AF]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm leading-snug">{s.name}</h4>
                        <p className={`text-xs mt-1 line-clamp-1 ${isSelected ? 'text-[#0046AF] font-medium' : 'text-slate-500'}`}>
                          From {formatPrice(s.baseAed)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale / Complexity */}
            <div>
              <label className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono block mb-3">
                2. Business Scale & Complexity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'starter', label: 'Startup / MVP', desc: 'Core features, agile setup' },
                  { id: 'growth', label: 'Mid-Market / SME', desc: 'Full custom workflow & scale' },
                  { id: 'enterprise', label: 'Enterprise Grade', desc: 'Multi-tenant, high-volume SLA' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setScale(tier.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      scale === tier.id 
                        ? 'bg-blue-50/70 border-2 border-[#0046AF] shadow-2xs ring-2 ring-[#0046AF]/10' 
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-xs text-slate-900">{tier.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Delivery Timeline & UAE Compliance Add-on */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono block mb-3">
                  3. Delivery Pace
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSpeed('standard')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      speed === 'standard'
                        ? 'bg-white border-2 border-[#0046AF] text-[#0046AF] shadow-2xs font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50'
                    }`}
                  >
                    Standard Sprint
                  </button>
                  <button
                    type="button"
                    onClick={() => setSpeed('express')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      speed === 'express'
                        ? 'bg-white border-2 border-[#0046AF] text-[#0046AF] shadow-2xs font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Express Delivery
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold tracking-wider text-slate-500 uppercase font-mono block mb-3">
                  4. UAE In-Country Compliance
                </label>
                <div 
                  onClick={() => setIncludeCompliance(!includeCompliance)}
                  className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between select-none ${
                    includeCompliance ? 'bg-blue-50/80 border-blue-300 text-[#0046AF] font-semibold' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${includeCompliance ? 'text-[#0046AF]' : 'text-slate-400'}`} />
                    <span className="text-[11px] leading-tight">UAE Data Residency & TDRA Audit</span>
                  </div>
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${includeCompliance ? 'bg-[#0046AF] text-white' : 'border border-slate-300'}`}>
                    {includeCompliance && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Real-Time Investment Summary (Right 5 Cols - MUI Template High-Craft Card) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
            
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0046AF]/20 blur-[90px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Estimated Investment</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/20 font-semibold">
                  UAE Market Aligned
                </span>
              </div>

              <div>
                <div className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-2 font-mono break-words">
                  {formatPrice(minRange)} - {formatPrice(maxRange)}
                </div>
                <p className="text-xs text-slate-400">
                  Indicative range based on standard scope. Fixed milestone fee upon formal agreement.
                </p>
              </div>

              {/* Scope Breakdown */}
              <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Selected Solution:</span>
                  <span className="font-semibold text-slate-200">{currentService.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Estimated Timeline:</span>
                  <span className="font-semibold text-blue-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" /> {estimatedWeeks}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Payment Milestones:</span>
                  <span className="font-semibold text-slate-200">30% / 40% / 30% Delivery</span>
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 font-mono">Key Deliverables Included:</h5>
                <ul className="space-y-2">
                  {currentService.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                  {includeCompliance && (
                    <li className="flex items-center gap-2 text-xs text-blue-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>UAE Cyber Security & TDRA Architecture Audit</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* CTA Action */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => setShowInquiryModal(true)}
                  className="w-full bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white font-semibold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Request Full Proposal & Scope</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Includes in-person consultation in Dubai or video call in GST time zone.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Proposal Request Modal (MUI SaaS Dialog Style) */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Request Official Proposal</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Solution: <strong>{currentService.name}</strong> (~{formatPrice(estimatedAed)})
                  </p>
                </div>
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-blue-100 text-[#0046AF] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Proposal Request Dispatched!</h4>
                  <p className="text-xs text-slate-600">
                    Connecting to WhatsApp for instant verification. Our Dubai solutions architect will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mansoor"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0046AF] focus:ring-2 focus:ring-[#0046AF]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="tariq@company.ae"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0046AF] focus:ring-2 focus:ring-[#0046AF]/20"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">UAE / WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0046AF] focus:ring-2 focus:ring-[#0046AF]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Company / Entity Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Al-Mansoor Real Estate LLC"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0046AF] focus:ring-2 focus:ring-[#0046AF]/20"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white font-semibold py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit & Connect on WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
