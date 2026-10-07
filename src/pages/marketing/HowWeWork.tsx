import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Clock, Award, 
  Sparkles, FileText, Code2, Rocket, RefreshCw, PhoneCall, 
  MessageSquare, ChevronRight, Layers, Eye, Users, Terminal
} from 'lucide-react';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';

interface ProcessStep {
  number: string;
  phase: string;
  title: string;
  tagline: string;
  duration: string;
  deliverables: string[];
  clientCommitment: string;
  details: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    phase: 'Strategic Discovery',
    title: 'Listen, Audit & Understand',
    tagline: 'We uncover the underlying operational problem — not sell pre-baked packages.',
    duration: '1 - 3 Days',
    deliverables: [
      'Current infrastructure & software bottleneck assessment',
      'Technical feasibility & UAE regulatory checklist (DLD/DFSA/FTA)',
      'Clear scope boundaries and prioritized requirements document',
    ],
    clientCommitment: 'A 30-minute discovery call with key stakeholders.',
    details: 'Every project begins with disciplined listening. We analyze your commercial workflow, existing software pain points, security baseline, and growth goals. We will explicitly tell you if a project does not make commercial sense.',
  },
  {
    number: '02',
    phase: 'Fixed-Scope Proposal',
    title: 'Transparent Architecture & Pricing',
    tagline: 'Itemized milestones, zero hidden surprises, and guaranteed fixed pricing.',
    duration: '24 - 48 Hours',
    deliverables: [
      'Complete Technical Scope of Work (SOW) specification',
      'Fixed-fee investment schedule (AED or USD) with stage gates',
      'Defined milestone delivery dates and SLA performance targets',
    ],
    clientCommitment: 'Review and sign-off on the architectural scope.',
    details: 'You receive an exact, plain-English proposal. No ambiguous hourly billing or unexpected scope-creep invoices. You know exactly what is being built, when each milestone will be demoed, and what the final investment is.',
  },
  {
    number: '03',
    phase: 'Agile Engineering',
    title: 'Bi-Weekly Sprints & Staging Access',
    tagline: 'You see continuous progress on live staging servers, never waiting in the dark.',
    duration: '2 - 6 Weeks (Per Sprint)',
    deliverables: [
      'Interactive staging environments updated every sprint cycle',
      'Dedicated Slack / WhatsApp VIP channel with senior lead engineer',
      'Automated code quality & zero-vulnerability security scans',
    ],
    clientCommitment: '15-minute weekly sprint demo & review.',
    details: 'We execute in focused, fast-cadence sprints. From day 10 onward, you have live staging URLs to test features in real time. Our UAE engineers manage everything from database architecture to micro-animations.',
  },
  {
    number: '04',
    phase: 'Launch & Continuous Support',
    title: 'Audited Deployment & Managed SLA',
    tagline: 'Zero-downtime UAE cloud launch, comprehensive team handover, and proactive 15-min SLA support.',
    duration: '3 - 5 Days Launch + Ongoing Retainer',
    deliverables: [
      'Pre-launch stress, security audit, zero-downtime cutover & SSL certification',
      'Recorded video walkthroughs, staff training & comprehensive architecture documentation',
      'Guaranteed 15-minute response SLA, continuous patching, telemetry, and proactive scaling',
    ],
    clientCommitment: 'Final acceptance sign-off & monthly roadmap alignment.',
    details: 'We execute audited, zero-downtime cutovers, verify UAE payment gateways, validate backup snapshots, and conduct hands-on training sessions. From then on, our partnership continues through Managed SLA retainers, serving as your dedicated DevOps division ensuring 99.99% uptime, rapid troubleshooting, and proactive scaling.',
  },
];

const WORKING_PRINCIPLES = [
  {
    title: 'Direct Senior Engineering',
    desc: 'You work directly with senior architects and developers who write the code — never junior account managers playing telephone.',
    icon: Terminal,
  },
  {
    title: 'Transparent Fixed Scope',
    desc: 'Fixed-price contracts mean our incentives are aligned with yours: ship high-quality code on time, without surprise budget overruns.',
    icon: FileText,
  },
  {
    title: 'UAE In-Person Presence',
    desc: 'Based in Dubai with physical presence across DIFC, Downtown, and Silicon Oasis. We meet in person whenever high-stakes discussions require it.',
    icon: Award,
  },
  {
    title: 'Zero Vendor Lock-In',
    desc: 'You own 100% of your source code, repositories, cloud accounts, and data from day one. Clean documentation ensures total autonomy.',
    icon: ShieldCheck,
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[200px] bg-[#0046AF]/10 blur-[90px] rounded-full" />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <MorphBlock direction="up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0046AF] text-xs font-bold mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Predictable Delivery Framework</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-5 max-w-4xl mx-auto">
              How We Work: Transparent, Agile, Predictable
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-normal">
              No black-box development, no mysterious invoices. From your first discovery conversation to live deployment and 24/7 SLA telemetry, experience software engineering with complete clarity.
            </p>
          </MorphBlock>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
              The 4-Stage Delivery Methodology
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Each stage produces tangible deliverables with defined milestones and review gates.
            </p>
          </div>

          {/* Interactive Steps Horizontal Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0046AF] text-white border-[#0046AF] shadow-md scale-102'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div className={`text-xs font-mono font-bold mb-1 ${isActive ? 'text-blue-200' : 'text-[#0046AF]'}`}>
                    STEP {step.number}
                  </div>
                  <div className="text-xs font-bold truncate">
                    {step.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Feature Box */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 mb-16"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0046AF] font-mono font-bold text-xs flex items-center justify-center">
                    {PROCESS_STEPS[activeStep].number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0046AF]">
                    {PROCESS_STEPS[activeStep].phase}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 ml-2">
                    ⏱️ Typical Duration: {PROCESS_STEPS[activeStep].duration}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {PROCESS_STEPS[activeStep].title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
                  {PROCESS_STEPS[activeStep].tagline}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 shrink-0 max-w-sm">
                <div className="text-xs font-bold text-blue-900 mb-0.5">Your Commitment:</div>
                <div className="text-xs text-blue-800">{PROCESS_STEPS[activeStep].clientCommitment}</div>
              </div>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-8">
              {PROCESS_STEPS[activeStep].details}
            </p>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0046AF]" />
                Key Deliverables &amp; Artifacts Produced:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PROCESS_STEPS[activeStep].deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF] shrink-0 mt-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Core Principles */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Our Core Working Principles
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              The operational standards our clients rely on for every release.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {WORKING_PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0046AF] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {principle.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Discovery Call CTA Card */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0046AF] to-blue-700 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
                Ready to Experience a Better Way to Build?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Book a no-obligation 30-minute discovery session. We will evaluate your technical landscape and return a detailed, fixed-price SOW within 48 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link to="/contact">
                <button className="bg-white text-[#0046AF] hover:bg-blue-50 px-6 py-3.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer">
                  <span>Start Discovery (Phase 1)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/estimator">
                <button className="bg-blue-800/60 hover:bg-blue-800 text-white border border-blue-400/40 px-5 py-3.5 rounded-full text-xs font-bold transition-all cursor-pointer">
                  <span>Estimate Project Cost</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
