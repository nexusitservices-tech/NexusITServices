import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Code2, Bot, 
  TrendingUp, Film, Compass, 
  ArrowRight, ChevronRight, ChevronLeft,
  Pause, Play, Sparkles
} from 'lucide-react';

// ============================================================================
// NEXUS IT SERVICES — HIGH-END HERO SECTION
// 
// Key Features:
// - NO SLIDER SCROLL FUNCTION / NO SCROLL JACKING: Scrolls naturally down the page.
// - NO EMPTY SPACE: True infinite seamless looping carousel track. Cards never run out
//   and never leave empty space on the right or bottom.
// - AUTO-ANIMATION LOOP: Cards automatically advance forward every 4.0 seconds.
// - PAUSE ON HOVER: Gracefully halts animation when the cursor enters the card area,
//   giving users time to read and interact.
// - SEAMLESS FORWARD TRANSITIONS: Looping from card 06 to 01 continues smoothly forward
//   in the same direction without jarring backward rewinding.
// - INTERACTIVE VERTICAL TRACKER: Synchronized 01 to 06 nodes with real-time countdown bar.
// - CLICK-TO-SELECT: Direct jump via any node, chevron, or card click.
// - SIGNATURE AESTHETIC: Warm ivory (#F5F5ED), Forest (#003F3B), Lime (#A8F05C), White (#FFFFFF)
//   with blended imagery and precision negative-space cutout CTAs.
// ============================================================================

interface HeroServiceCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  link: string;
  variant: 'forest' | 'white' | 'lime';
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  cutoutWidth: number;
}

const HERO_SERVICES: HeroServiceCard[] = [
  {
    id: 'it-services',
    number: '01',
    title: 'IT Services',
    subtitle: 'Reliable infrastructure. Secure operations.',
    description: 'Keep your business connected, protected, and running smoothly with dependable IT infrastructure, cybersecurity, cloud solutions, and 24/7 technical management.',
    ctaText: 'Explore Service',
    link: '/services/it-services',
    variant: 'forest',
    image: '/it-services.png',
    icon: Server,
    cutoutWidth: 156,
  },
  {
    id: 'software-development',
    number: '02',
    title: 'Software & Web Development',
    subtitle: 'Digital products built around your business.',
    description: 'We design and develop modern websites, web applications, software platforms, and custom systems that turn ideas into scalable digital products.',
    ctaText: 'Explore Service',
    link: '/services/software-development',
    variant: 'white',
    image: '/software-development.png',
    icon: Code2,
    cutoutWidth: 156,
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI & Automation',
    subtitle: 'Work smarter. Automate what slows you down.',
    description: 'Transform repetitive processes with AI-powered tools, intelligent automation, chatbots, workflow systems, and custom AI solutions designed to scale throughput.',
    ctaText: 'Explore Service',
    link: '/services/ai-automation',
    variant: 'lime',
    image: '/ai-automation.png',
    icon: Bot,
    cutoutWidth: 156,
  },
  {
    id: 'advertising-marketing',
    number: '04',
    title: 'Advertising & Advanced Marketing',
    subtitle: 'Turn attention into measurable growth.',
    description: 'Build stronger brands and acquire more customers through strategic advertising, digital campaigns, social media, SEO, analytics, and conversion optimization.',
    ctaText: 'Explore Service',
    link: '/services/creative-services',
    variant: 'forest',
    image: '/creative-production.png',
    icon: TrendingUp,
    cutoutWidth: 156,
  },
  {
    id: 'creative-production',
    number: '05',
    title: 'Multimedia & Creative Production',
    subtitle: 'Ideas transformed into experiences.',
    description: 'Bring your brand to life through professional graphic design, photography, 4K videography, animation, 3D motion graphics, brand identity, and creative campaigns.',
    ctaText: 'Explore Service',
    link: '/services/creative-services',
    variant: 'white',
    image: '/creative-production.png',
    icon: Film,
    cutoutWidth: 156,
  },
  {
    id: 'business-consulting',
    number: '06',
    title: 'Business Technology & Consulting',
    subtitle: 'Technology aligned with your business goals.',
    description: 'We help organizations identify opportunities, improve operations, modernize legacy technology, and build practical digital strategies supporting long-term performance.',
    ctaText: 'Explore Service',
    link: '/services/consulting',
    variant: 'lime',
    image: '/business-consulting.png',
    icon: Compass,
    cutoutWidth: 156,
  },
];

const BASE_COUNT = HERO_SERVICES.length; // 6
const SETS_COUNT = 4; // 4 sets of 6 = 24 cards for truly infinite, gapless track
const REPEATED_CARDS = Array.from({ length: SETS_COUNT }).flatMap((_, setIdx) =>
  HERO_SERVICES.map((card, cardIdx) => ({
    ...card,
    uniqueKey: `set-${setIdx}-srv-${card.id}`,
    setIdx,
    cardIdx,
    globalIdx: setIdx * BASE_COUNT + cardIdx,
  }))
);

const STEP_WIDTH = 488; // Card width (460px) + gap (28px)
const AUTO_LOOP_DURATION = 4200; // ms

export default function NexusInteractiveHero() {
  // Start at Set 1 (index 6 = first card of second set) to allow smooth backward navigation too
  const [virtualIndex, setVirtualIndex] = useState(BASE_COUNT);
  const [isInstantReset, setIsInstantReset] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  // Derived active card index (0 to 5)
  const activeServiceIndex = ((virtualIndex % BASE_COUNT) + BASE_COUNT) % BASE_COUNT;

  // Responsive check
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Handle seamless infinite reset after animation completes
  const handleAnimationComplete = useCallback(() => {
    if (virtualIndex >= BASE_COUNT * 3) {
      // Reached Set 3 -> silently shift back to Set 1 (subtract 12)
      setIsInstantReset(true);
      setVirtualIndex((prev) => prev - BASE_COUNT * 2);
    } else if (virtualIndex < BASE_COUNT) {
      // Reached Set 0 -> silently shift forward to Set 2 (add 12)
      setIsInstantReset(true);
      setVirtualIndex((prev) => prev + BASE_COUNT * 2);
    }
  }, [virtualIndex]);

  // Turn off instant reset on the next frame so subsequent animations are smooth
  useEffect(() => {
    if (isInstantReset) {
      const raf = requestAnimationFrame(() => setIsInstantReset(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [isInstantReset]);

  // Auto-animation loop timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
      setTimerKey((k) => k + 1);
    }, AUTO_LOOP_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, virtualIndex]);

  // Manual step forward
  const handleNext = () => {
    setVirtualIndex((prev) => prev + 1);
    setTimerKey((k) => k + 1);
  };

  // Manual step backward
  const handlePrev = () => {
    setVirtualIndex((prev) => prev - 1);
    setTimerKey((k) => k + 1);
  };

  // Direct selection from vertical tracker: takes shortest circular path
  const handleSelectService = (targetIndex: number) => {
    const current = activeServiceIndex;
    let diff = targetIndex - current;
    if (diff > BASE_COUNT / 2) diff -= BASE_COUNT;
    if (diff < -BASE_COUNT / 2) diff += BASE_COUNT;
    setVirtualIndex((prev) => prev + diff);
    setTimerKey((k) => k + 1);
  };

  return (
    <div className="relative w-full bg-[#F5F5ED] py-10 sm:py-14 lg:py-16 overflow-hidden">
      
      {/* Container matching standard 1440px grid */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* ================================================================
              LEFT CONTENT COLUMN (Fixed Editorial Messaging & Vertical Tracker)
              - Nexus Brand Eyebrow
              - Large Bold Headline (tight line-height, modern editorial)
              - Concise supporting narrative
              - Primary & Secondary Action CTAs
              - Vertically tracked navigation (01 to 06) with auto-loop status
             ================================================================ */}
          <div className="lg:col-span-5 xl:col-span-5 text-left flex flex-col justify-center">
            
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="w-2 h-2 rounded-full bg-[#003F3B] animate-pulse" />
              <span className="text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#003F3B]">
                NEXUS IT SERVICES
              </span>
            </div>

            {/* Primary Headline */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] font-extrabold tracking-[-0.035em] text-[#073B38] leading-[0.98] sm:leading-[1.0] mb-5 sm:mb-6"
              style={{ textWrap: 'balance' }}
            >
              Technology that moves your business forward.
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base lg:text-[15px] text-[#6E7772] leading-relaxed max-w-lg mb-7 sm:mb-8 font-normal">
              We build, automate, market and transform modern businesses through technology, creativity and intelligent digital solutions.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                to="/services/it-services"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#003F3B] text-white text-xs sm:text-sm font-semibold tracking-tight shadow-md hover:bg-[#00514C] hover:shadow-lg transition-all duration-200 group"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#073B38] text-xs sm:text-sm font-semibold tracking-tight shadow-xs hover:bg-[#FAFBF7] hover:shadow transition-all duration-200 group"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* ==============================================================
                VERTICAL PROGRESS TRACKER (01 TO 06) WITH AUTO-LOOP PROGRESS
                - Rail line with 6 distinct nodes
                - Smooth active node highlighting
                - Real-time countdown progress bar
                - Interactive Play / Pause control
               ============================================================== */}
            <div className="pt-4 border-t border-[#003F3B]/10">
              <div className="flex items-start gap-4 py-2">
                
                {/* Continuous Track Rail with 6 Nodes */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute top-2 bottom-2 w-[1.5px] bg-[#003F3B]/20" />

                  <div className="relative z-10 flex flex-col justify-between h-[154px] py-1">
                    {HERO_SERVICES.map((srv, idx) => {
                      const isActive = activeServiceIndex === idx;
                      return (
                        <button
                          key={srv.id}
                          onClick={() => handleSelectService(idx)}
                          className="group relative flex items-center justify-center focus:outline-none p-1 cursor-pointer"
                          aria-label={`Switch to service ${srv.number}: ${srv.title}`}
                          title={`Service ${srv.number}: ${srv.title}`}
                        >
                          <span 
                            className={`block rounded-full transition-all duration-300 ${
                              isActive 
                                ? 'w-3.5 h-3.5 bg-[#003F3B] ring-4 ring-[#003F3B]/20 scale-110 shadow-xs' 
                                : 'w-2 h-2 bg-[#003F3B]/35 hover:bg-[#003F3B]/70'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Service Status Label & Auto-Loop Countdown Controls */}
                <div className="flex flex-col justify-between h-[154px] py-1 text-left flex-1 min-w-0">
                  <div className="pt-0.5">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-base font-bold text-[#003F3B]">
                        {HERO_SERVICES[activeServiceIndex].number}
                      </span>
                      <span className="text-xs font-bold text-[#073B38] uppercase tracking-wider truncate">
                        {HERO_SERVICES[activeServiceIndex].title}
                      </span>
                    </div>

                    <p className="text-xs text-[#6E7772] max-w-sm leading-relaxed hidden sm:block truncate">
                      {HERO_SERVICES[activeServiceIndex].subtitle}
                    </p>
                  </div>

                  {/* Auto-Loop Control Bar */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="p-1.5 rounded-full bg-[#003F3B]/10 hover:bg-[#003F3B]/20 text-[#003F3B] transition-colors cursor-pointer"
                      title={isPaused ? 'Resume auto-loop' : 'Pause auto-loop'}
                    >
                      {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>

                    {/* Countdown Progress Bar */}
                    <div className="w-24 sm:w-32 h-1.5 bg-[#003F3B]/15 rounded-full overflow-hidden">
                      <motion.div 
                        key={`${timerKey}-${isPaused ? 'paused' : 'running'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isPaused ? '0%' : '100%' }}
                        transition={{ 
                          duration: isPaused ? 0 : AUTO_LOOP_DURATION / 1000, 
                          ease: 'linear' 
                        }}
                        className="h-full bg-[#003F3B] rounded-full"
                      />
                    </div>

                    <span className="text-[10px] font-mono font-semibold text-[#003F3B]/80 uppercase tracking-wider">
                      {isPaused ? 'Paused' : `${activeServiceIndex + 1} / 06 Loop`}
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ================================================================
              RIGHT CONTENT COLUMN: INFINITE AUTO-ANIMATING SERVICE CARDS
              - Zero empty space on the right (24 continuous repeated cards)
              - Seamless infinite forward loop without rewind
              - Hover pauses animation loop for effortless reading
              - Manual Prev / Next navigation chevrons
              - Active card depth elevation & peek styling
             ================================================================ */}
          <div className="lg:col-span-7 xl:col-span-7 relative">
            {isDesktop ? (
              /* Desktop Experience: Infinite Seamless Carousel */
              <div 
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative w-full py-2 select-none"
              >
                {/* Header Controls Bar: Prev/Next Chevrons & Hover Status */}
                <div className="flex items-center justify-between gap-2 mb-3 px-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#6E7772]">
                    <Sparkles className="w-3.5 h-3.5 text-[#003F3B]" />
                    <span>{isPaused ? 'Loop paused (Hovering)' : 'Continuous auto-animation'}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full bg-white text-[#073B38] shadow-xs hover:bg-[#FAFBF7] hover:shadow transition-all cursor-pointer"
                      aria-label="Previous service"
                      title="Previous service"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full bg-white text-[#073B38] shadow-xs hover:bg-[#FAFBF7] hover:shadow transition-all cursor-pointer"
                      aria-label="Next service"
                      title="Next service"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Outer clipping mask to allow smooth edge fade without cut-off */}
                <div 
                  className="w-full overflow-hidden py-4"
                  style={{
                    maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                  }}
                >
                  <motion.div 
                    animate={{ x: -virtualIndex * STEP_WIDTH }}
                    transition={
                      isInstantReset 
                        ? { duration: 0 } 
                        : { type: 'spring', stiffness: 220, damping: 28, mass: 0.8 }
                    }
                    onAnimationComplete={handleAnimationComplete}
                    className="flex items-center gap-7 will-change-transform"
                  >
                    {REPEATED_CARDS.map((card, idx) => {
                      const Icon = card.icon;
                      const isActive = idx === virtualIndex;
                      const isNext = idx === virtualIndex + 1;
                      const isPrev = idx === virtualIndex - 1;

                      // Card Surface Configuration (Borderless)
                      let cardBgColor = '#003F3B';
                      let cardClasses = 'bg-[#003F3B] text-white shadow-[0_16px_40px_rgba(0,63,59,0.28)]';
                      let iconColor = 'text-[#A8F05C]';
                      let titleColor = 'text-white';
                      let subtitleColor = 'text-[#A8F05C] font-semibold';
                      let descColor = 'text-[#A2CCC6]';
                      let btnClasses = 'bg-[#003F3B] text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:bg-[#004A45]';

                      if (card.variant === 'white') {
                        cardBgColor = '#FFFFFF';
                        cardClasses = 'bg-white text-[#073B38] shadow-[0_12px_36px_rgba(7,59,56,0.08)]';
                        iconColor = 'text-[#073B38]';
                        titleColor = 'text-[#073B38]';
                        subtitleColor = 'text-[#073B38]/85 font-medium';
                        descColor = 'text-[#6E7772]';
                        btnClasses = 'bg-white text-[#073B38] shadow-[0_2px_8px_rgba(7,59,56,0.08)] hover:bg-[#FAFBF7]';
                      } else if (card.variant === 'lime') {
                        cardBgColor = '#A8F05C';
                        cardClasses = 'bg-[#A8F05C] text-[#073B38] shadow-[0_16px_40px_rgba(168,240,92,0.25)]';
                        iconColor = 'text-[#073B38]';
                        titleColor = 'text-[#073B38]';
                        subtitleColor = 'text-[#073B38] font-bold';
                        descColor = 'text-[#1D524C]';
                        btnClasses = 'bg-[#A8F05C] text-[#073B38] shadow-[0_2px_8px_rgba(7,59,56,0.1)] hover:bg-[#B7F670]';
                      }

                      // Depth Hierarchy
                      const scale = isActive ? 1.0 : isNext ? 0.94 : isPrev ? 0.92 : 0.88;
                      const opacity = isActive ? 1.0 : isNext ? 0.82 : isPrev ? 0.65 : 0.45;

                      return (
                        <div
                          key={card.uniqueKey}
                          onClick={() => {
                            setVirtualIndex(idx);
                            setTimerKey((k) => k + 1);
                          }}
                          className="shrink-0 cursor-pointer"
                          style={{
                            width: '460px',
                            minHeight: '520px',
                          }}
                        >
                          <motion.div
                            animate={{ scale, opacity }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className={`relative rounded-[24px] p-8 sm:p-9 pb-16 flex flex-col justify-between overflow-hidden h-full min-h-[520px] transition-shadow duration-300 ${cardClasses}`}
                          >
                            {/* Blended Background Image Effect */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                              <img 
                                src={card.image} 
                                alt="" 
                                className={`w-full h-full object-cover object-center ${
                                  card.variant === 'white' 
                                    ? 'opacity-[0.25] mix-blend-multiply filter contrast-110' 
                                    : card.variant === 'lime' 
                                    ? 'opacity-[0.32] mix-blend-multiply filter contrast-125 saturate-125' 
                                    : 'opacity-[0.28] mix-blend-overlay filter contrast-125 brightness-110'
                                }`}
                                loading="lazy"
                              />
                              <div 
                                className={`absolute inset-0 ${
                                  card.variant === 'white'
                                    ? 'bg-gradient-to-t from-white/95 via-white/50 to-transparent'
                                    : card.variant === 'lime'
                                    ? 'bg-gradient-to-t from-[#A8F05C]/95 via-[#A8F05C]/50 to-transparent'
                                    : 'bg-gradient-to-t from-[#003F3B]/95 via-[#003F3B]/55 to-transparent'
                                }`}
                              />
                            </div>

                            {/* Abstract Arcs on Lime & Forest */}
                            {(card.variant === 'lime' || card.variant === 'forest') && (
                              <svg 
                                className={`absolute -bottom-10 -right-10 w-56 h-56 pointer-events-none select-none z-0 ${
                                  card.variant === 'lime' ? 'text-[#073B38]/10' : 'text-white/5'
                                }`} 
                                viewBox="0 0 200 200" 
                                fill="none"
                              >
                                <circle cx="200" cy="200" r="50" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="200" cy="200" r="200" stroke="currentColor" strokeWidth="1.5" />
                              </svg>
                            )}

                            {/* Top Section: Number & Outline Icon */}
                            <div className="relative z-10 text-left">
                              <div className="flex items-center justify-between mb-8">
                                <span className={`font-mono text-3xl font-extrabold tracking-tight ${
                                  card.variant === 'white' ? 'text-[#003F3B]' : card.variant === 'lime' ? 'text-[#073B38]' : 'text-[#A8F05C]'
                                }`}>
                                  {card.number}
                                </span>

                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-xs">
                                  <Icon className={`w-7 h-7 ${iconColor} stroke-[1.6]`} />
                                </div>
                              </div>

                              {/* Title */}
                              <h3 className={`text-2xl sm:text-[28px] font-bold tracking-tight leading-snug mb-2 ${titleColor}`}>
                                {card.title}
                              </h3>

                              {/* Subtitle */}
                              <div className={`text-xs sm:text-sm tracking-wide mb-4 ${subtitleColor}`}>
                                {card.subtitle}
                              </div>

                              {/* Description */}
                              <p className={`text-sm sm:text-[15px] leading-relaxed ${descColor}`}>
                                {card.description}
                              </p>
                            </div>

                            <div className="h-6" />

                            {/* Negative-Space Cutout Notch at Bottom-Left */}
                            <div className="absolute left-0 bottom-0 pointer-events-none z-10" aria-hidden="true">
                              <div 
                                className="relative bg-[#F5F5ED] rounded-tr-[20px]"
                                style={{ width: `${card.cutoutWidth}px`, height: '50px' }}
                              >
                                <div className="absolute left-0 -top-[14px] w-[14px] h-[14px] bg-[#F5F5ED] overflow-hidden">
                                  <div className="w-full h-full rounded-bl-[14px]" style={{ backgroundColor: cardBgColor }} />
                                </div>
                                <div className="absolute -right-[14px] bottom-0 w-[14px] h-[14px] bg-[#F5F5ED] overflow-hidden">
                                  <div className="w-full h-full rounded-bl-[14px]" style={{ backgroundColor: cardBgColor }} />
                                </div>
                              </div>
                            </div>

                            {/* Pill CTA inside Cutout */}
                            <div className="absolute left-[8px] bottom-[8px] z-20">
                              <Link
                                to={card.link}
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 group/btn hover:scale-105 active:scale-95 ${btnClasses}`}
                              >
                                <span>{card.ctaText}</span>
                                <span className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1.5 inline-block">
                                  →
                                </span>
                              </Link>
                            </div>

                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            ) : (
              /* Mobile Experience: Controlled Carousel Card with Auto-Loop */
              <div 
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative w-full"
              >
                <div className="overflow-hidden rounded-[24px]">
                  {(() => {
                    const card = HERO_SERVICES[activeServiceIndex];
                    const Icon = card.icon;

                    let cardBgColor = '#003F3B';
                    let cardClasses = 'bg-[#003F3B] text-white shadow-xl';
                    let iconColor = 'text-[#A8F05C]';
                    let titleColor = 'text-white';
                    let subtitleColor = 'text-[#A8F05C] font-semibold';
                    let descColor = 'text-[#A2CCC6]';
                    let btnClasses = 'bg-[#003F3B] text-white shadow hover:bg-[#004A45]';

                    if (card.variant === 'white') {
                      cardBgColor = '#FFFFFF';
                      cardClasses = 'bg-white text-[#073B38] shadow-md';
                      iconColor = 'text-[#073B38]';
                      titleColor = 'text-[#073B38]';
                      subtitleColor = 'text-[#073B38]/85 font-medium';
                      descColor = 'text-[#6E7772]';
                      btnClasses = 'bg-white text-[#073B38] shadow hover:bg-[#FAFBF7]';
                    } else if (card.variant === 'lime') {
                      cardBgColor = '#A8F05C';
                      cardClasses = 'bg-[#A8F05C] text-[#073B38] shadow-lg';
                      iconColor = 'text-[#073B38]';
                      titleColor = 'text-[#073B38]';
                      subtitleColor = 'text-[#073B38] font-bold';
                      descColor = 'text-[#1D524C]';
                      btnClasses = 'bg-[#A8F05C] text-[#073B38] shadow hover:bg-[#B7F670]';
                    }

                    return (
                      <div className={`relative rounded-[24px] p-6 sm:p-8 pb-16 flex flex-col justify-between overflow-hidden min-h-[460px] ${cardClasses}`}>
                        <div className="relative z-10 text-left">
                          <div className="flex items-center justify-between mb-6">
                            <span className="font-mono text-3xl font-extrabold tracking-tight">
                              {card.number}
                            </span>
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-black/5">
                              <Icon className={`w-7 h-7 ${iconColor} stroke-[1.6]`} />
                            </div>
                          </div>
                          <h3 className={`text-2xl font-bold tracking-tight mb-2 ${titleColor}`}>
                            {card.title}
                          </h3>
                          <div className={`text-xs tracking-wide mb-3 ${subtitleColor}`}>
                            {card.subtitle}
                          </div>
                          <p className={`text-sm leading-relaxed ${descColor}`}>
                            {card.description}
                          </p>
                        </div>

                        {/* Negative-Space Cutout Notch at Bottom-Left */}
                        <div className="absolute left-0 bottom-0 pointer-events-none z-10" aria-hidden="true">
                          <div 
                            className="relative bg-[#F5F5ED] rounded-tr-[20px]"
                            style={{ width: `${card.cutoutWidth}px`, height: '50px' }}
                          >
                            <div className="absolute left-0 -top-[14px] w-[14px] h-[14px] bg-[#F5F5ED] overflow-hidden">
                              <div className="w-full h-full rounded-bl-[14px]" style={{ backgroundColor: cardBgColor }} />
                            </div>
                            <div className="absolute -right-[14px] bottom-0 w-[14px] h-[14px] bg-[#F5F5ED] overflow-hidden">
                              <div className="w-full h-full rounded-bl-[14px]" style={{ backgroundColor: cardBgColor }} />
                            </div>
                          </div>
                        </div>

                        <div className="absolute left-[8px] bottom-[8px] z-20">
                          <Link
                            to={card.link}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all ${btnClasses}`}
                          >
                            <span>{card.ctaText}</span>
                            <span className="text-xs">→</span>
                          </Link>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex items-center justify-between mt-4 px-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-white text-[#073B38] shadow-xs cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-mono text-xs font-bold text-[#003F3B]">
                    {HERO_SERVICES[activeServiceIndex].number} / 06
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-white text-[#073B38] shadow-xs cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
