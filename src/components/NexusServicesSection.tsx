import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Server, Code2, Bot, 
  TrendingUp, Film, Compass 
} from 'lucide-react';

// ============================================================================
// NEXUS SERVICES SECTION — REIMPLEMENTED WITH SPECIFIED CARDS 01 TO 06
//
// 01 — IT Services
// 02 — Software & Web Development
// 03 — AI & Automation
// 04 — Advertising & Advanced Marketing
// 05 — Multimedia & Creative Production
// 06 — Business Technology & Consulting
//
// Visual Design:
// - Blended background image effect on each division matching the card surface
// - Borderless surfaces (White, Lime #A8F05C, Forest #003F3B)
// - Warm off-white background #F5F5ED
// - Exact negative-space cutout notch with organic concave fillets
// - Tailored cutout width per CTA button text
// - Interactive micro-animations (spring lift, image zoom, icon tilt, rotating arcs)
// ============================================================================

interface ServiceCardData {
  id: string;
  variant: 'white' | 'lime' | 'forest';
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  ctaText: string;
  mobileCtaText: string;
  cutoutWidth: number;
  mobileCutoutWidth: number;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  hasArcs?: boolean;
}

export default function NexusServicesSection() {
  const cards: ServiceCardData[] = [
    {
      id: '01',
      variant: 'white',
      badge: '01',
      title: '01 — IT Services',
      subtitle: 'Reliable technology. Secure infrastructure.',
      description: 'Keep your business connected, protected, and running smoothly with dependable IT infrastructure, support, cybersecurity, cloud solutions, networking, and ongoing technical management.',
      link: '/services/it-services',
      ctaText: 'Explore IT Services',
      mobileCtaText: 'Explore IT',
      cutoutWidth: 168,
      mobileCutoutWidth: 94,
      image: '/it-services.png',
      icon: Server,
    },
    {
      id: '02',
      variant: 'lime',
      badge: '02',
      title: '02 — Software & Web Development',
      subtitle: 'Digital products built around your business.',
      description: 'We design and develop modern websites, web applications, software platforms, e-commerce solutions, and custom systems that turn ideas into scalable digital products.',
      link: '/services/software-development',
      ctaText: 'Build With Us',
      mobileCtaText: 'Build',
      cutoutWidth: 134,
      mobileCutoutWidth: 80,
      image: '/software-development.png',
      icon: Code2,
      hasArcs: true,
    },
    {
      id: '03',
      variant: 'forest',
      badge: '03',
      title: '03 — AI & Automation',
      subtitle: 'Work smarter. Automate what slows you down.',
      description: 'Transform repetitive processes with AI-powered tools, intelligent automation, chatbots, workflow systems, integrations, and custom AI solutions designed to increase productivity.',
      link: '/services/ai-automation',
      ctaText: 'Explore AI & Automation',
      mobileCtaText: 'Explore AI',
      cutoutWidth: 206,
      mobileCutoutWidth: 98,
      image: '/ai-automation.png',
      icon: Bot,
      hasArcs: true,
    },
    {
      id: '04',
      variant: 'white',
      badge: '04',
      title: '04 — Advertising & Advanced Marketing',
      subtitle: 'Turn attention into measurable growth.',
      description: 'Build stronger brands and acquire more customers through strategic advertising, digital campaigns, social media, performance marketing, SEO, content strategy, analytics, and conversion optimization.',
      link: '/services/creative-services',
      ctaText: 'Grow Your Business',
      mobileCtaText: 'Marketing',
      cutoutWidth: 164,
      mobileCutoutWidth: 94,
      image: '/creative-production.png',
      icon: TrendingUp,
    },
    {
      id: '05',
      variant: 'lime',
      badge: '05',
      title: '05 — Multimedia & Creative Production',
      subtitle: 'Ideas transformed into experiences.',
      description: 'Bring your brand to life through professional graphic design, photography, videography, animation, motion graphics, brand identity, social content, and creative campaigns.',
      link: '/services/creative-services',
      ctaText: 'Explore Creative',
      mobileCtaText: 'Creative',
      cutoutWidth: 146,
      mobileCutoutWidth: 88,
      image: '/creative-production.png',
      icon: Film,
      hasArcs: true,
    },
    {
      id: '06',
      variant: 'forest',
      badge: '06',
      title: '06 — Business Technology & Consulting',
      subtitle: 'Technology aligned with your business goals.',
      description: 'We help organizations identify opportunities, improve operations, modernize technology, and build practical digital strategies that support sustainable growth and long-term performance.',
      link: '/services/consulting',
      ctaText: 'Talk To An Expert',
      mobileCtaText: 'Consult',
      cutoutWidth: 162,
      mobileCutoutWidth: 86,
      image: '/business-consulting.png',
      icon: Compass,
      hasArcs: true,
    }
  ];

  return (
    <section 
      id="nexus-services-section" 
      className="w-full py-14 sm:py-20 lg:py-28 bg-[#F5F5ED] relative overflow-hidden"
    >
      <style>{`
        .service-cutout { width: var(--cutout-mobile); }
        @media (min-width: 640px) {
          .service-cutout { width: var(--cutout-desktop); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* ====================================================================
            1. SECTION HEADER
            - Left: Asterisk icon + eyebrow, followed by editorial heading
            - Right: Supporting narrative
           ==================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 lg:gap-12 mb-6 sm:mb-14 sm:mb-16">
          {/* Left Column: Heading (50-55% width on desktop) */}
          <div className="sm:w-[54%] text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5 mb-1.5 sm:mb-4"
            >
              <span className="text-[#073B38] font-bold text-sm select-none leading-none animate-pulse">*</span>
              <span className="text-[11px] sm:text-[13px] font-semibold tracking-wide text-[#073B38]">
                Our Approach
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-xl sm:text-3xl lg:text-[44px] xl:text-[50px] font-bold tracking-tight text-[#073B38] leading-tight sm:leading-[1.02]"
              style={{ textWrap: 'balance' }}
            >
              Essential features for modern business success
            </motion.h2>
          </div>

          {/* Right Column: Supporting paragraph (35-40% width on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sm:w-[38%] text-left sm:pt-3"
          >
            <p className="text-[11px] sm:text-[14.5px] text-[#6E7772] leading-relaxed">
              Explore integrated consulting approaches improve processes, increase productivity, and support long-term organizational data driven business development across the UAE and GCC.
            </p>
          </motion.div>
        </div>

        {/* ====================================================================
            2. BORDERLESS LIVING CARD GRID WITH BLENDED BACKGROUND IMAGE EFFECT
            - 2-column mobile phone grid view matching the PC grid experience
            - 3-column desktop layout (2 rows of 3)
            - Responsive notch cutouts and tailored typography
           ==================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-4.5">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            // Configure palette and card background per variant (NO BORDERS)
            let cardBgColor = '#FFFFFF';
            let cardClasses = 'bg-white text-[#073B38] shadow-[0_4px_16px_rgba(7,59,56,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(7,59,56,0.13)]';
            let iconColor = 'text-[#073B38]';
            let titleColor = 'text-[#073B38]';
            let subtitleColor = 'text-[#073B38]/85';
            let descColor = 'text-[#6E7772]';
            let btnClasses = 'bg-white text-[#073B38] shadow-[0_2px_8px_rgba(7,59,56,0.08)] hover:shadow-[0_4px_14px_rgba(7,59,56,0.14)] hover:bg-[#FAFBF7]';

            if (card.variant === 'lime') {
              cardBgColor = '#A8F05C';
              cardClasses = 'bg-[#A8F05C] text-[#073B38] shadow-[0_4px_16px_rgba(168,240,92,0.2)] hover:shadow-[0_24px_45px_-10px_rgba(140,217,61,0.48)]';
              iconColor = 'text-[#073B38]';
              titleColor = 'text-[#073B38]';
              subtitleColor = 'text-[#073B38] font-bold';
              descColor = 'text-[#1D524C]';
              btnClasses = 'bg-[#A8F05C] text-[#073B38] shadow-[0_2px_8px_rgba(7,59,56,0.1)] hover:shadow-[0_4px_14px_rgba(7,59,56,0.18)] hover:bg-[#B7F670]';
            } else if (card.variant === 'forest') {
              cardBgColor = '#003F3B';
              cardClasses = 'bg-[#003F3B] text-white shadow-[0_4px_20px_rgba(0,63,59,0.25)] hover:shadow-[0_25px_50px_-10px_rgba(0,63,59,0.55)]';
              iconColor = 'text-[#A8F05C]';
              titleColor = 'text-white';
              subtitleColor = 'text-[#A8F05C] font-semibold';
              descColor = 'text-[#A2CCC6]';
              btnClasses = 'bg-[#003F3B] text-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:bg-[#004A45]';
            }

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -7 }}
                className="relative group h-full flex flex-col transition-all duration-300"
              >
                {/* Main Card Container (Borderless, refined radius on mobile & desktop) */}
                <div 
                  className={`relative rounded-[14px] sm:rounded-[18px] p-3 sm:p-6 lg:p-8 pb-13 sm:pb-16 flex flex-col justify-between overflow-hidden h-full min-h-[295px] sm:min-h-[380px] lg:min-h-[400px] transition-all duration-500 ease-out ${cardClasses}`}
                >
                  {/* ==========================================================
                      BLENDED BACKGROUND IMAGE EFFECT (ENHANCED VISIBILITY)
                     ========================================================== */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <img 
                      src={card.image} 
                      alt="" 
                      className={`w-full h-full object-cover object-center transform transition-all duration-700 ease-out group-hover:scale-110 ${
                        card.variant === 'white' 
                          ? 'opacity-[0.38] group-hover:opacity-[0.50] mix-blend-multiply filter contrast-110' 
                          : card.variant === 'lime' 
                          ? 'opacity-[0.44] group-hover:opacity-[0.56] mix-blend-multiply filter contrast-125 saturate-125' 
                          : 'opacity-[0.40] group-hover:opacity-[0.52] mix-blend-overlay filter contrast-125 brightness-110'
                      }`}
                      loading="lazy"
                    />
                    {/* Increased transparency gradient scrim to make bg image vividly visible */}
                    <div 
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        card.variant === 'white'
                          ? 'bg-gradient-to-t from-white/95 via-white/45 to-transparent'
                          : card.variant === 'lime'
                          ? 'bg-gradient-to-t from-[#A8F05C]/95 via-[#A8F05C]/45 to-transparent'
                          : 'bg-gradient-to-t from-[#003F3B]/95 via-[#003F3B]/50 to-transparent'
                      }`}
                    />
                  </div>

                  {/* Living Abstract Curved Arcs in lower-right corner (Lime & Forest only) */}
                  {card.hasArcs && (
                    <svg 
                      className={`absolute -bottom-5 -right-5 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-44 sm:h-44 pointer-events-none select-none z-0 transition-transform duration-700 ease-out group-hover:scale-120 group-hover:rotate-12 ${
                        card.variant === 'lime' ? 'text-[#073B38]/10' : 'text-white/5'
                      }`} 
                      viewBox="0 0 200 200" 
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="200" cy="200" r="45" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="200" cy="200" r="90" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="200" cy="200" r="135" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}

                  {/* Top & Middle Content (z-10 to stay above blended background) */}
                  <div className="relative z-10 text-left">
                    {/* Animated Minimal Line Icon: lifts and gently tilts on card hover */}
                    <div className="w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-start mb-2 sm:mb-5">
                      <div className="transform transition-transform duration-300 ease-out group-hover:scale-115 group-hover:-rotate-6 group-hover:-translate-y-1">
                        <Icon className={`w-5 h-5 sm:w-8 sm:h-8 ${iconColor} stroke-[1.6]`} />
                      </div>
                    </div>

                    {/* Bold Card Title */}
                    <h3 className={`text-[12.5px] sm:text-[19px] lg:text-[22px] font-bold tracking-tight leading-tight sm:leading-snug mb-1 sm:mb-1.5 transition-colors duration-200 ${titleColor}`}>
                      {card.title}
                    </h3>

                    {/* Subtitle / Punchline */}
                    <div className={`text-[9.5px] sm:text-xs lg:text-[13px] tracking-tight sm:tracking-wide mb-1.5 sm:mb-3 leading-tight ${subtitleColor}`}>
                      {card.subtitle}
                    </div>

                    {/* Description with responsive line-clamp on phone */}
                    <p className={`text-[10px] sm:text-xs lg:text-sm leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none ${descColor}`}>
                      {card.description}
                    </p>
                  </div>

                  {/* Spacer ensuring no overlap with bottom-left cutout */}
                  <div className="h-3 sm:h-4" />

                  {/* ==========================================================
                      THE DISTINCTIVE NEGATIVE-SPACE CARD CUTOUT (BORDERLESS)
                      - Responsive width for phone 2-col grid & desktop 3-col grid
                      - Organic concave fillets curve naturally into the card
                     ========================================================== */}
                  <div 
                    className="absolute left-0 bottom-0 pointer-events-none z-10" 
                    aria-hidden="true"
                  >
                    {/* Main cutout block in section background color */}
                    <div 
                      className="service-cutout relative bg-[#F5F5ED] rounded-tr-[12px] sm:rounded-tr-[18px] h-[36px] sm:h-[46px]"
                      style={{ 
                        ['--cutout-mobile' as any]: `${card.mobileCutoutWidth}px`,
                        ['--cutout-desktop' as any]: `${card.cutoutWidth}px`,
                      }}
                    >
                      {/* Top concave fillet */}
                      <div 
                        className="absolute left-0 -top-[10px] sm:-top-[14px] w-[10px] sm:w-[14px] h-[10px] sm:h-[14px] bg-[#F5F5ED] overflow-hidden"
                      >
                        <div 
                          className="w-full h-full rounded-bl-[10px] sm:rounded-bl-[14px]"
                          style={{ backgroundColor: cardBgColor }}
                        />
                      </div>

                      {/* Right concave fillet */}
                      <div 
                        className="absolute -right-[10px] sm:-right-[14px] bottom-0 w-[10px] sm:w-[14px] h-[10px] sm:h-[14px] bg-[#F5F5ED] overflow-hidden"
                      >
                        <div 
                          className="w-full h-full rounded-bl-[10px] sm:rounded-bl-[14px]"
                          style={{ backgroundColor: cardBgColor }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ==========================================================
                      COMPACT CTA PILL BUTTON (BORDERLESS & ANIMATED)
                      - Sits directly inside the cutout notch
                      - Uses concise label on phone grid and full label on desktop
                     ========================================================== */}
                  <div className="absolute left-[6px] sm:left-[8px] bottom-[5px] sm:bottom-[7px] z-20">
                    <Link
                      to={card.link}
                      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-tight transition-all duration-200 group/btn hover:scale-105 active:scale-95 ${btnClasses}`}
                    >
                      <span className="sm:hidden">{card.mobileCtaText}</span>
                      <span className="hidden sm:inline">{card.ctaText}</span>
                      <span className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1.5 group-hover/btn:translate-x-2 inline-block">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
