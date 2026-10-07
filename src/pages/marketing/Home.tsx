import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, Code, Bot, Palette, Briefcase, ArrowRight, 
  Quote, Layers, Search, Target, Rocket, Star,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Typewriter, TypewriterReveal } from '@/components/ui/Typewriter';
import { MorphBlock } from '@/components/ui/MorphBlock';
import NexusServicesSection from '@/components/NexusServicesSection';

const PARTNERS = [
  { name: 'AWS', url: '/partners/aws.svg', role: 'Cloud Infrastructure' },
  { name: 'Google', url: '/partners/google.svg', role: 'AI & Enterprise Suite' },
  { name: 'Cloudflare', url: '/partners/cloudflare.svg', role: 'Edge & Cybersecurity' },
  { name: 'GitHub', url: '/partners/github.svg', role: 'DevOps & Versioning' },
  { name: 'Shopify', url: '/partners/shopify.svg', role: 'E-Commerce Infrastructure' },
  { name: 'Grok AI', url: '/partners/grok.svg', role: 'Generative Intelligence' },
  { name: 'Meta', url: '/partners/meta.svg', role: 'Business & Ad APIs' },
  { name: 'WIX', url: '/partners/wix.svg', role: 'Web Architecture' },
  { name: 'Whois', url: '/partners/whois.svg', role: 'Domains & DNS' },
  { name: 'TravelPayouts', url: '/partners/travelpayouts.svg', role: 'Travel Tech APIs' },
  { name: 'CJ Affiliates', url: '/partners/cj.svg', role: 'Performance Media' },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-[#F8FAFC]">
      
      {/* Hero Section with Morphy Background & Dynamic Typewriter */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="/herobackground.jpg" 
            alt="Dubai Skyline & Enterprise Network Background" 
            referrerPolicy="no-referrer"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={1671}
            height={941}
            className="w-full h-full object-cover object-center opacity-45 filter contrast-105 saturate-115"
          />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,#F8FAFC_90%)] opacity-75"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/15 blur-[130px] rounded-full"></div>
          <div className="absolute top-1/3 left-1/3 w-[450px] h-[250px] bg-[#0046AF]/15 blur-[110px] rounded-full"></div>
          <div className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#0f172a0a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_70%,transparent_100%)]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center text-center">
              {/* Dynamic Typewriter Headline */}
              <MorphBlock direction="up" delay={0.1}>
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] mb-3 sm:mb-8 flex flex-col items-center text-center">
                  <span>Nexus.</span>
                  <span className="min-h-[1.35em] sm:min-h-[1.15em] flex items-center justify-center text-center">
                    <Typewriter 
                      words={[
                        'Software Development',
                        'Web Development',
                        'IT',
                        'Creative Production',
                        'Advertising',
                        'Marketing',
                        'Branding & More'
                      ]} 
                      typingSpeed={85}
                      deletingSpeed={45}
                      pauseTime={2000}
                      className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046AF] via-blue-600 to-indigo-600"
                    />
                  </span>
                  <span>Services.</span>
                </h1>
              </MorphBlock>
              
              {/* Typewriter Staggered Subtitle */}
              <MorphBlock direction="up" delay={0.2} className="max-w-2xl">
                <TypewriterReveal 
                  as="p"
                  delay={0.25}
                  text="At NEXUS IT Services FZ-LLC, we don't just create and connect the technology your business needs to grow — we also design the right tools to elevate your brand's visibility and recognition in the market."
                  className="text-slate-600 text-xs sm:text-base md:text-xl font-normal leading-relaxed justify-center"
                />
              </MorphBlock>
            </div>

          {/* Technology Partners Carousel Bar */}
          <MorphBlock 
            id="tech-partners-section"
            delay={0.35} 
            className="w-full max-w-full mt-8 sm:mt-12 md:mt-16 overflow-hidden rounded-none border-y border-x-0 border-slate-200/60 bg-transparent py-4 sm:py-6 px-2 sm:px-6 flex flex-col items-center justify-center relative"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            {/* Seamless Infinite Slider with Hardware Acceleration */}
            <div className="marquee-container relative w-full overflow-hidden py-2 select-none">
              <div 
                className="overflow-hidden w-full"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
                }}
              >
                <div className="animate-marquee-smooth flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6 bg-transparent">
                  {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                    <motion.div 
                      key={`${partner.name}-${i}`} 
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      className="group flex items-center gap-3.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-transparent hover:bg-slate-100/60 shadow-none cursor-pointer shrink-0 min-w-[215px] sm:min-w-[245px] transition-all duration-300"
                    >
                      <div className="w-11 h-11 rounded-xl bg-transparent flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={partner.url} 
                          alt={`${partner.name} logo`} 
                          className="w-7 h-7 sm:w-8 sm:h-8 object-contain filter transition-transform duration-300" 
                          loading="lazy" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col text-left min-w-0 flex-1">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight truncate">
                          {partner.name}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors truncate">
                          {partner.role}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro-Metrics Strip */}
            <div className="w-full pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 sm:gap-x-10 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0046AF]"></span>
                <span>11+ Certified Partner Integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>99.95% Infrastructure SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-xs shadow-cyan-500/50"></span>
                <span className="font-semibold text-slate-700">4-Stage Engagement Model</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Direct 24/7 Engineering Escalation</span>
              </div>
            </div>
          </MorphBlock>

        </div>
      </section>

      {/* Redesigned NEXUS Services Section: Integrated Technology Partner */}
      <NexusServicesSection />

      {/* Value Proposition Bento Grid with Morphy Physics */}
      <section className="w-full py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <MorphBlock className="mb-10 sm:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <span>The Single-Vendor Advantage</span>
          </div>
          <TypewriterReveal 
            text="We remove the complexity of modern business technology."
            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-tight"
          />
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
            <strong className="text-slate-900">Nexus IT Services FZ-LLC</strong> is engineered for UAE organizations that want to scale rapidly without the friction of managing separate IT contractors, software agencies, AI specialists, and branding studios.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our team structure establishes a transparent process designed to understand your needs, deliver the right solution, and support positive business results.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
            
            {/* Card 1: Discover & Understand */}
            <MorphBlock delay={0.1} enableHover className="col-span-2">
              <div className="h-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400/80 hover:shadow-xl transition-all relative overflow-hidden group flex flex-row cursor-pointer">
                <div className="p-3.5 sm:p-6 md:p-8 lg:p-10 relative z-10 h-full flex flex-col justify-between flex-1 w-7/12 sm:w-3/5">
                  <div>
                    <div className="mb-2 sm:mb-6 flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-100 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        <Search className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-blue-700 bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-200/80">
                        Stage 01
                      </span>
                    </div>
                    <h3 className="text-[13px] sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1 sm:mb-2.5 group-hover:text-blue-600 transition-colors leading-tight">
                      Discover &amp; Understand
                    </h3>
                    <p className="text-slate-600 leading-snug sm:leading-relaxed text-[10px] sm:text-xs md:text-sm line-clamp-3 sm:line-clamp-none">
                      We begin by understanding your business, challenges, objectives, existing systems, and what success looks like — before recommending a solution.
                    </p>
                  </div>

                  <div className="mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 sm:gap-4 text-[9.5px] sm:text-xs text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-blue-700 font-semibold truncate">
                      On-Site Dubai Workshop
                    </span>
                  </div>
                </div>
                
                <div className="w-5/12 sm:w-2/5 min-h-[140px] sm:min-h-[220px] relative overflow-hidden bg-slate-100 border-l border-slate-100">
                  <img 
                    src="/assets/blocks/block-discover.jpg" 
                    alt="Professional team collaborating in a modern tech office in Dubai" 
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-10 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center justify-between text-[9px] sm:text-[11px] font-semibold text-slate-700">
                    <span className="flex items-center gap-1 sm:gap-1.5 text-blue-600 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                      Audit &amp; Discovery
                    </span>
                    <span className="hidden sm:inline font-mono text-slate-400">Zero Obligation</span>
                  </div>
                </div>
              </div>
            </MorphBlock>

            {/* Card 2: Strategize & Propose */}
            <MorphBlock delay={0.2} enableHover className="col-span-1">
              <div className="h-full p-3.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-[#0046AF]/80 hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer">
                {/* Fine Matter Block Background Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img 
                    src="/assets/blocks/block-strategize.jpg" 
                    alt="Strategize and Propose Architecture" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-20 filter contrast-105 saturate-110 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/95" />
                  <div className="absolute top-0 right-0 w-24 sm:w-36 h-24 sm:h-36 bg-[#0046AF]/10 rounded-full blur-2xl group-hover:bg-[#0046AF]/20 transition-all" />
                </div>
                
                <div className="relative z-10">
                  <div className="mb-2 sm:mb-6 flex items-center justify-between">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-blue-100 text-[#0046AF] group-hover:scale-110 group-hover:bg-[#0046AF] group-hover:text-white transition-all shadow-xs">
                      <Target className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-[#0046AF] bg-blue-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-200/80">
                      Stage 02
                    </span>
                  </div>
                  <h3 className="text-[13px] sm:text-xl lg:text-2xl font-bold text-slate-900 mb-1 sm:mb-2.5 group-hover:text-[#0046AF] transition-colors leading-tight">
                    Strategize &amp; Propose
                  </h3>
                  <p className="text-slate-600 leading-snug sm:leading-relaxed text-[10px] sm:text-xs md:text-sm line-clamp-3 sm:line-clamp-none">
                    We analyze your requirements and develop a practical solution with clear scope, deliverables, timeline, technology and pricing.
                  </p>
                </div>

                <div className="relative z-10 mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[9.5px] sm:text-xs text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[#0046AF] font-semibold truncate">
                    Fixed SOW
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-slate-400 group-hover:translate-x-1 transition-transform">
                    Learn →
                  </span>
                </div>
              </div>
            </MorphBlock>

            {/* Card 3: Build/Implement */}
            <MorphBlock delay={0.3} enableHover className="col-span-1">
              <div className="h-full p-3.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-amber-400/80 hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer">
                {/* Fine Matter Block Background Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <img 
                    src="/assets/blocks/block-build.jpg" 
                    alt="Build and Implement Technology" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-20 filter contrast-105 saturate-110 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/95" />
                  <div className="absolute top-0 right-0 w-24 sm:w-36 h-24 sm:h-36 bg-amber-400/10 rounded-full blur-2xl group-hover:bg-amber-400/20 transition-all" />
                </div>

                <div className="relative z-10">
                  <div className="mb-2 sm:mb-6 flex items-center justify-between">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-amber-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-amber-100 text-amber-600 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs">
                      <Code className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-200/80">
                      Stage 03
                    </span>
                  </div>
                  <h3 className="text-[13px] sm:text-xl lg:text-2xl font-bold text-slate-900 mb-1 sm:mb-2.5 group-hover:text-amber-700 transition-colors leading-tight">
                    Build/Implement
                  </h3>
                  <p className="text-slate-600 leading-snug sm:leading-relaxed text-[10px] sm:text-xs md:text-sm line-clamp-3 sm:line-clamp-none">
                    Our team develops, configures, integrates or implements the solution while maintaining regular communication and process updates.
                  </p>
                </div>

                <div className="relative z-10 mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[9.5px] sm:text-xs text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 text-amber-700 font-semibold truncate">
                    Sprint Demos
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-slate-400 group-hover:translate-x-1 transition-transform">
                    Learn →
                  </span>
                </div>
              </div>
            </MorphBlock>

            {/* Card 4: Launch and Ongoing Support */}
            <MorphBlock delay={0.4} enableHover className="col-span-2">
              <div className="h-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-400/80 hover:shadow-xl transition-all relative overflow-hidden group flex flex-row cursor-pointer">
                
                <div className="p-3.5 sm:p-6 md:p-8 lg:p-10 relative z-10 flex flex-col justify-between flex-1 w-7/12 sm:w-3/5">
                  <div>
                    <div className="mb-2 sm:mb-6 flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 bg-indigo-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-indigo-100 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-xs">
                        <Rocket className="w-4 h-4 sm:w-6 sm:h-6" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 px-2.5 py-0.5 sm:py-1 rounded-full border border-indigo-200/80">
                        Stage 04
                      </span>
                    </div>
                    <h3 className="text-[13px] sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1 sm:mb-2.5 group-hover:text-indigo-600 transition-colors leading-tight">
                      Launch &amp; Ongoing Support
                    </h3>
                    <p className="text-slate-600 leading-snug sm:leading-relaxed text-[10px] sm:text-xs md:text-sm line-clamp-3 sm:line-clamp-none">
                      We test, deploy, document and hand over the solution. Where required, we provide training and guidance followed by continuous maintenance, optimization, and scalable UAE engineering.
                    </p>
                  </div>

                  <div className="mt-2.5 sm:mt-6 pt-2 sm:pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 sm:gap-4 text-[9.5px] sm:text-xs text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[#0046AF] font-semibold truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF] animate-pulse shrink-0"></span>
                      24/7 SLA
                    </span>
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 text-indigo-700 font-semibold truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                      UAE Support
                    </span>
                  </div>
                </div>

                <div className="w-5/12 sm:w-2/5 min-h-[140px] sm:min-h-[220px] relative overflow-hidden bg-slate-100 border-l border-slate-100">
                  <img 
                    src="/assets/blocks/block-launch.jpg" 
                    alt="Mission Launch and 24/7 Operations Control in Dubai" 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/80 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-10 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-xs flex items-center justify-between text-[9px] sm:text-[11px] font-semibold text-slate-700">
                    <span className="flex items-center gap-1 sm:gap-1.5 text-indigo-600 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping shrink-0"></span>
                      Live Cutover
                    </span>
                    <span className="hidden sm:inline font-mono text-slate-400">99.95% SLA</span>
                  </div>
                </div>

              </div>
            </MorphBlock>

          </div>
      </section>

      {/* UAE Client Testimonials */}
      <section className="w-full py-12 sm:py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MorphBlock className="text-center mb-8 sm:mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1 text-amber-500 mb-1.5 sm:mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <TypewriterReveal 
              text="Trusted by UAE Market Leaders"
              className="text-xl sm:text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight justify-center"
            />
            <p className="text-slate-600 text-xs sm:text-sm mt-2 sm:mt-3">Verified reviews from organizations based in Dubai and Abu Dhabi.</p>
          </MorphBlock>
          
          <div className="grid grid-cols-2 gap-2.5 sm:gap-6 md:gap-8">
            {[
              { 
                quote: "Nexus completely overhauled our logistics management portal in JAFZA and deployed an automated WhatsApp booking bot. Our operational coordination overhead dropped by 45% within 60 days.", 
                author: "Tariq Al-Hashemi", 
                role: "Managing Director, Globex Logistics Dubai",
                project: "Custom Logistics Platform & AI Dispatch"
              },
              { 
                quote: "Finding a technology partner in Dubai that doesn't over-promise and under-deliver is rare. Nexus delivered our luxury real estate portal on time, with flawless Arabic RTL styling and automated CRM lead distribution.", 
                author: "Leila Mirzah", 
                role: "VP Marketing, Prestige Horizon Properties",
                project: "PropTech Portal & WhatsApp CRM Automation"
              }
            ].map((test, i) => (
              <MorphBlock key={i} delay={i * 0.15} enableHover>
                <div className="p-3.5 sm:p-6 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div>
                    <Quote className="w-5 sm:w-8 md:w-10 h-5 sm:h-8 md:h-10 text-blue-200 mb-2 sm:mb-4" />
                    <p className="text-[11px] sm:text-base md:text-lg text-slate-800 leading-snug sm:leading-relaxed mb-3 sm:mb-6 font-medium line-clamp-4 sm:line-clamp-none">
                      "{test.quote}"
                    </p>
                  </div>
                  
                  <div className="border-t border-slate-100 pt-2.5 sm:pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] sm:text-sm shadow-xs shrink-0">
                        {test.author.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-[11px] sm:text-sm text-slate-900 truncate">{test.author}</div>
                        <div className="text-[9.5px] sm:text-xs text-slate-500 truncate">{test.role}</div>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-[10px] sm:text-[11px] font-mono text-[#0046AF] bg-blue-50 px-2 sm:px-2.5 py-1 rounded-full border border-blue-200">
                      Verified Client
                    </span>
                  </div>
                </div>
              </MorphBlock>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
