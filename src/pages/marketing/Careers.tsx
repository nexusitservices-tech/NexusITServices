import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, DollarSign, Award, CheckCircle2, 
  ArrowRight, ShieldCheck, Sparkles, Building, User, Mail, 
  Phone, Send, ChevronRight, FileText, Globe 
} from 'lucide-react';
import { MorphBlock, MorphStagger } from '@/components/ui/MorphBlock';
import { submitInquiry } from '@/lib/firebase';

interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  compensation: string;
  summary: string;
  requirements: string[];
}

const OPENINGS: JobOpening[] = [
  {
    id: 'cloud-architect',
    title: 'Lead Sovereign Cloud & Infrastructure Architect',
    department: 'Cloud & Cyber Infrastructure',
    type: 'Full-Time (On-Site / Hybrid)',
    experience: '7+ Years',
    location: 'Downtown Dubai, UAE',
    compensation: 'AED 35,000 - 45,000 / month (Tax-Free)',
    summary: 'Lead the architecture and deployment of high-availability AWS me-central-1 and Azure UAE North cloud clusters for tier-1 GCC banks, family offices, and enterprise entities.',
    requirements: [
      'Deep expertise in AWS / Azure architecture with active Solutions Architect Professional certifications.',
      'Hands-on mastery of Fortinet Zero-Trust perimeters, Kubernetes, Docker, and Terraform.',
      'Comprehensive understanding of UAE TDRA and Dubai Electronic Security Center (DESC) regulations.',
      'Prior track record delivering zero-downtime database and server migrations.'
    ]
  },
  {
    id: 'ai-nlp-engineer',
    title: 'Senior Bilingual AI & NLP Systems Engineer',
    department: 'AI & Autonomous Workflows',
    type: 'Full-Time (Dubai)',
    experience: '5+ Years',
    location: 'Dubai Silicon Oasis & Downtown',
    compensation: 'AED 30,000 - 40,000 / month (Tax-Free)',
    summary: 'Design and deploy production-grade RAG pipelines, fine-tuned Arabic/English LLMs, and high-throughput WhatsApp Business API autonomous agents for enterprise clients.',
    requirements: [
      'Strong programming proficiency in Python, FastAPI, PyTorch, and LangChain.',
      'Experience fine-tuning bilingual NLP models (Modern Standard Arabic and colloquial Gulf dialects).',
      'Production experience with vector databases (pgvector, Pinecone, Qdrant) and Azure OpenAI in UAE.',
      'Track record building reliable agentic architectures with deterministic fallback safeguards.'
    ]
  },
  {
    id: 'lead-fullstack-engineer',
    title: 'Staff Full-Stack TypeScript / React / Node Engineer',
    department: 'Custom Software & ERP',
    type: 'Full-Time (Dubai)',
    experience: '6+ Years',
    location: 'Downtown Dubai, UAE',
    compensation: 'AED 28,000 - 38,000 / month (Tax-Free)',
    summary: 'Spearhead modern full-stack web platforms and bespoke enterprise ERP portals with ultra-low latency, strict TypeScript rigor, and native Arabic RTL typography support.',
    requirements: [
      'Mastery of modern React, Next.js, TypeScript, Node.js, and PostgreSQL.',
      'Deep understanding of state management, Tailwind CSS, accessibility, and micro-frontend architecture.',
      'Experience integrating GCC payment gateways (Stripe UAE, Network International, Apple Pay).',
      'Relentless focus on performance optimization, sub-second load times, and clean modular code.'
    ]
  },
  {
    id: 'creative-motion-director',
    title: 'Creative Motion & 3D Video Production Lead',
    department: 'Creative & Digital Media',
    type: 'Full-Time (Dubai)',
    experience: '5+ Years',
    location: 'Downtown Dubai Studio',
    compensation: 'AED 25,000 - 35,000 / month (Tax-Free)',
    summary: 'Direct cinema-grade commercials, 3D CGI product animations, and brand documentary films for high-net-worth brands, luxury hospitality, and maritime entities across Dubai.',
    requirements: [
      'Stunning showreel demonstrating cinema camera proficiency (RED, ARRI) and advanced DaVinci Resolve color grading.',
      'Proficiency in Blender / Unreal Engine 5 for 3D CGI product renders and architectural walk-throughs.',
      'Experience coordinating UAE production permits, certified drone flights, and local talent management.',
      'Exceptional eye for luxury typography, pacing, and multi-format commercial delivery (16:9 and 9:16).'
    ]
  }
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolioUrl: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setSubmitting(true);
    try {
      await submitInquiry({
        fullName: formData.name,
        company: 'Candidate Application',
        email: formData.email,
        phone: formData.phone,
        service: `Career Application: ${selectedJob.title}`,
        budget: selectedJob.compensation,
        requirements: `Position: ${selectedJob.title} (${selectedJob.department})\nPortfolio/LinkedIn: ${formData.portfolioUrl}\n\nCover Note:\n${formData.message}`,
        source: 'Careers Page'
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('Error saving application:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Careers & Engineering Hub</span>
        </div>
      </div>

      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MorphBlock className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Dubai Engineering Hub • Radiance ONE Business Center, Rigga Al Buteen</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
            Build the Tech Foundation of the Future in Dubai.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We are hiring world-class engineers, architects, and creative directors to craft sovereign cloud, bespoke enterprise software, and bilingual AI systems across the GCC.
          </p>
        </MorphBlock>
      </section>

      {/* Perks Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">100% Tax-Free Earnings</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Competitive compensation packages denominated in AED with zero personal income taxation under UAE federal law.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">UAE Golden Visa Support</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Expedited recommendation and paperwork sponsorship assistance for eligible senior engineering specialists.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Premier Medical Coverage</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comprehensive private health and dental insurance with top-tier hospital network coverage across the UAE and worldwide.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Dubai Creek Tech Hub</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Radiance ONE Business Center, Rigga Al Buteen with cutting-edge M3 Max MacBooks and dual 4K monitors.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Open Positions ({OPENINGS.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {OPENINGS.map((job) => (
            <MorphBlock 
              key={job.id} 
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                    {job.department}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                    {job.compensation}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                  {job.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </span>
                  <span>•</span>
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>Min {job.experience}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {job.summary}
                </p>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 mb-1">Key Requirements:</div>
                  {job.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Requisition Code: NEX-HR-{job.id.toUpperCase()}</span>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmitted(false);
                    // scroll to form
                    setTimeout(() => {
                      document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className="px-5 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Application Submitted!</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you for applying to <strong>Nexus IT Services Dubai</strong>. Our engineering leadership team reviews every submission and will respond directly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Join the Team
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {selectedJob ? `Apply for ${selectedJob.title}` : 'Submit Your Profile / Expression of Interest'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We review applications on a rolling basis. All files and personal data remain strictly confidential.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">LinkedIn or GitHub Profile *</label>
                  <input
                    type="url"
                    required
                    value={formData.portfolioUrl}
                    onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/... or github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Brief Note / What Drives You? *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a brief overview of relevant projects, architectural challenges solved, or current location in the UAE/GCC..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting Application...' : 'Submit Confidential Application'}</span>
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
