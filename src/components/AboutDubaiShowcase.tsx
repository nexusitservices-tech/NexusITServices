import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Award, CheckCircle2, ShieldCheck, Sparkles, Compass } from 'lucide-react';

export default function AboutDubaiShowcase() {
  const MILESTONES = [
    {
      year: '2021',
      title: 'Foundation in Dubai',
      desc: 'Established in Dubai to provide unified IT and software engineering for emerging UAE enterprises.'
    },
    {
      year: '2022',
      title: 'TDRA & Sovereign Cloud Standard',
      desc: 'Architected in-country data residency frameworks for AWS me-central-1 and Azure UAE North.'
    },
    {
      year: '2023',
      title: 'AI & WhatsApp Automation Studio',
      desc: 'Launched bilingual Arabic/English enterprise AI workflows and official WhatsApp Cloud API bots.'
    },
    {
      year: '2024+',
      title: 'Dubai D33 Alignment',
      desc: 'Expanded fractional CTO services and enterprise ERP modernization across 65+ UAE organizations.'
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rooted in the UAE Tech Capital</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Our Dubai Presence & Engineering Culture
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 leading-relaxed">
            We don't outsource critical architecture. Our leadership, solution architects, and engineering teams work on-the-ground in Dubai, ensuring immediate communication, cultural fluency, and uncompromised governance.
          </p>
        </div>

        {/* 3-Card Photographic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          
          {/* Card 1: Downtown Dubai Executive Suite */}
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all group"
          >
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=85"
                alt="Executive Business Strategy and Growth Planning in Dubai"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith("/assets/strategy-growth.jpg")) {
                    target.src = "/assets/strategy-growth.jpg";
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-105 saturate-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 text-[10px] font-semibold">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>Radiance ONE Business Center, Rigga Al Buteen</span>
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Executive Advisory & Strategy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Where fractional CTO sessions, digital transformation roadmaps, and stakeholder alignment meetings take place in view of the Burj Khalifa.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Engineering & Development Lab */}
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all group"
          >
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Nexus IT Engineers in Dubai"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 text-[10px] font-semibold">
                  <Building className="w-3 h-3 text-blue-400" />
                  <span>Dubai Internet City (DIC) R&D Lab</span>
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Software & AI Development Lab</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hands-on engineering squads building resilient cloud architectures, bi-weekly Next.js sprints, and bilingual Arabic AI bots.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Creative Production Studio */}
          <motion.div
            whileHover={{ y: -6 }}
            className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all group"
          >
            <div className="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80"
                alt="Dubai Creative Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 text-[10px] font-semibold">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>Dubai Design District (d3) Studio</span>
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Creative & Brand Production</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Corporate 4K cinema video cameras, executive sound stages, and vector typography designers shaping GCC market leadership.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Dubai Milestones Interactive Timeline */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
            Timeline of Commitment
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Pioneering Enterprise Tech in the Emirates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {MILESTONES.map((m, i) => (
              <div key={i} className="relative flex flex-col items-start border-l-2 md:border-l-0 md:border-t-2 border-blue-600 pl-4 md:pl-0 md:pt-4">
                <span className="text-2xl font-black font-mono text-blue-600 mb-1">
                  {m.year}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
