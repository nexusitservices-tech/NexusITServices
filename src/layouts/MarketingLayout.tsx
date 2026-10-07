import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Phone, MessageCircle, Globe, Shield, MapPin, 
  ArrowRight, ArrowUpRight, Sparkles, ChevronDown, ChevronRight, 
  Lock, ShieldCheck, Mail, Clock, ExternalLink, Building2 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { CurrencyProvider, useCurrency } from '@/context/CurrencyContext';
import PageLoader from '@/components/ui/PageLoader';
import { nav, siteMeta } from '@/content/site.js';

function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const location = useLocation();

  // Scroll listener: toggles scrolled glass state past 16px (passive listener, cleaned up)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route changes auto-close both the mega menu and the mobile drawer
  useEffect(() => {
    setMega(null);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open (restored on close/unmount)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const solutionsItem = nav.find((item) => item.mega === 'solutions');

  return (
    <>
      {/* Shell: Fixed, full-width, z-50. Transparent over hero; switches on scroll past 16px to bg-nx-midnight/80 backdrop-blur-xl with hairline border-white/10 bottom border */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500",
          scrolled 
            ? "bg-nx-midnight/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/25" 
            : "bg-transparent border-b border-transparent"
        )}
        onMouseLeave={() => setMega(null)}
      >
        {/* Inner bar: h-16 mobile / h-20 desktop, three-column flex: Logo left, primary nav center, utility actions right */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-4 relative">
          
          {/* Column 1: Logo left */}
          <Link to="/" className="flex items-center group shrink-0">
            <div 
              id="header-logo-container"
              className="flex items-center transition-opacity duration-300 group-hover:opacity-85"
            >
              <img 
                id="header-logo-img"
                src="/logo.png" 
                alt="Nexus IT Services Logo" 
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert" 
              />
            </div>
          </Link>
          
          {/* Column 2: Primary nav center */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 absolute left-1/2 -translate-x-1/2">
            {nav.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              const isMegaOpen = item.mega && mega === item.mega;

              return (
                <div
                  key={item.href}
                  className="relative py-2"
                  onMouseEnter={() => {
                    if (item.mega) {
                      setMega(item.mega);
                    } else {
                      setMega(null);
                    }
                  }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 py-1",
                      isActive || isMegaOpen
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    <span>{item.label}</span>
                    {item.mega && (
                      <ChevronDown 
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isMegaOpen ? "rotate-180 text-white" : "text-white/50"
                        )} 
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Column 3: Utility actions right (Client Portal + Start a Project Button + Mobile Hamburger) */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            {/* Desktop Utility Actions */}
            <div className="hidden lg:flex items-center gap-5">
              {/* "Client Portal" text link with the nx-link-underline animated underline */}
              <Link 
                to="/portal" 
                className="text-xs font-semibold text-white/80 hover:text-white nx-link-underline transition-colors py-1 cursor-pointer"
              >
                Client Portal
              </Link>

              {/* Primary "Start a Project" Button (links to /contact) */}
              <Link to="/contact">
                <button className="bg-gradient-to-r from-[#1677FF] to-blue-600 hover:from-[#0B5ED7] hover:to-[#1677FF] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-[#1677FF]/25 hover:shadow-[#1677FF]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 group cursor-pointer whitespace-nowrap">
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger (Menu icon) */}
            <div className="flex items-center lg:hidden">
              <button 
                type="button"
                className="text-white/85 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu: full-width nx-surface glass panel docked to header's bottom edge */}
        <AnimatePresence>
          {mega === 'solutions' && solutionsItem?.pillars && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 w-full nx-surface border-t border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 4-column grid (one column per solution pillar) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {solutionsItem.pillars.map((pillar, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-[#39B9FF] uppercase mb-1">
                        {pillar.number}
                      </span>
                      <Link
                        to={pillar.href}
                        className="group/title flex items-center justify-between text-sm font-bold text-white hover:text-[#39B9FF] transition-colors mb-4 pb-2 border-b border-white/10"
                      >
                        <span>{pillar.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-white/50 group-hover/title:text-[#39B9FF] group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                      </Link>
                      <ul className="space-y-2.5">
                        {pillar.services.map((service, sIdx) => (
                          <li key={sIdx}>
                            <Link
                              to={service.href}
                              className="text-xs text-white/70 hover:text-white transition-colors block py-0.5"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer row pitches the Solution Discovery tool with a "Find my solution" link */}
                <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-white/75">
                    <Sparkles className="w-4 h-4 text-[#39B9FF] shrink-0" />
                    <span>Need architectural guidance tailored to your operational scale? Explore our roadmaps.</span>
                  </div>
                  <Link
                    to="/estimator"
                    className="inline-flex items-center gap-1.5 font-bold text-[#39B9FF] hover:text-white transition-colors group"
                  >
                    <span>Find my solution</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Navigation Drawer:
          A hamburger (Menu icon) opens a full-height right-side drawer (z-[60], max-w-md, bg-nx-deep) 
          over a blurred bg-nx-midnight/90 scrim. Slide-in via translate-x over 500ms; scrim click closes.
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Blurred bg-nx-midnight/90 scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[59] bg-[#07142F]/90 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Slide-over Drawer (z-[60], max-w-md, bg-nx-deep) via translate-x over 500ms */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[60] w-full max-w-md bg-nx-deep shadow-2xl border-l border-white/10 flex flex-col text-white"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Drawer"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <img 
                    src="/logo.png" 
                    alt="Nexus IT Services Logo" 
                    className="h-8 w-auto object-contain brightness-0 invert" 
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-tight">Nexus IT Services</span>
                    <span className="text-[10px] font-mono text-white/50">FZ-LLC</span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body: stacked list of nav links, Client Portal link, full-width "Start a Project" button, and tel: phone link */}
              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
                <div className="space-y-1">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors font-semibold text-sm group"
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#39B9FF] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}

                  {/* Client Portal link */}
                  <Link
                    to="/portal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 border-b border-white/5 transition-colors font-semibold text-sm group"
                  >
                    <span>Client Portal</span>
                    <Lock className="w-4 h-4 text-white/40 group-hover:text-[#39B9FF] transition-colors" />
                  </Link>
                </div>

                {/* Bottom cluster: full-width "Start a Project" button and tel: phone link */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <button className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#1677FF] to-blue-600 hover:from-[#0B5ED7] hover:to-[#1677FF] text-white font-bold text-sm shadow-lg shadow-[#1677FF]/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]">
                      <span>Start a Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>

                  <a
                    href="tel:+97142600000"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#39B9FF]" />
                    <span>+971 4 260 0000 (Dubai HQ)</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MarketingLayout() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Allow replaying the page loader at any time via a custom window event
  useEffect(() => {
    const handleReplay = () => setIsAppLoading(true);
    window.addEventListener('nexus-replay-loader', handleReplay);
    return () => window.removeEventListener('nexus-replay-loader', handleReplay);
  }, []);

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col font-sans bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden w-full">
        {/* Multimillion-Dollar Refined PageLoader & Dynamic Route Beam */}
        <PageLoader 
          isLoading={isAppLoading} 
          onComplete={() => setIsAppLoading(false)}
        />

        <HeaderNav />

        <main className="flex-1 flex flex-col relative z-10 w-full overflow-x-hidden">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="flex-1 flex flex-col w-full overflow-x-hidden"
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Floating WhatsApp and Quick Callback Widget */}
        <WhatsAppWidget />

        {/* Corporate Dubai Footer */}
        <footer className="border-t border-slate-200 bg-white text-slate-600 relative overflow-hidden w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
            {/* Main Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 pb-12 border-b border-slate-200">
              
              {/* Col 1 & 2: Brand, Address & Verification (2 Cols) */}
              <div className="lg:col-span-2 space-y-4">
                <Link to="/" className="flex items-center gap-3">
                  <img 
                    id="footer-logo-img"
                    src="/logo.png" 
                    alt="Nexus IT Services Logo" 
                    className="h-10 w-10 object-contain" 
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-900 tracking-tight">Nexus IT Services</span>
                    <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#0046AF] border border-blue-200 px-1.5 py-0.5 rounded-full">FZ-LLC</span>
                  </div>
                </Link>
                
                <p className="text-sm text-slate-500 leading-relaxed">
                  Technology. Simplified. Delivered. One unified partner for enterprise IT infrastructure, custom software engineering, AI workflow automation, 3D creative production, and strategic business consulting in Dubai and the GCC.
                </p>

                {/* Verified Physical Address Block */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0046AF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-bold">Registered Office Location:</strong>
                      <span className="text-slate-600 leading-relaxed">
                        Radiance ONE Business Center 9th floor, Dubai Creek Car parking, Rigga Al Buteen, Dubai, UAE
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1 border-t border-slate-200/60">
                    <Phone className="w-4 h-4 text-[#0046AF] shrink-0" />
                    <a href="tel:+971526367221" className="hover:text-[#0046AF] font-semibold text-slate-800 transition-colors">
                      +971 52 6367221
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#0046AF] shrink-0" />
                    <a href="mailto:info@nexus.ae.org" className="hover:text-[#0046AF] font-semibold text-slate-800 transition-colors">
                      info@nexus.ae.org
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#0046AF] shrink-0" />
                    <span className="text-slate-500 text-[11px]">Mon – Fri: 9:00 AM – 6:00 PM GST • 24/7 Rapid Incident Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Col 3: Enterprise Solutions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF]"></span>
                  <span>Solutions</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li><Link to="/solutions/it-infrastructure" className="hover:text-blue-600 transition-colors">IT &amp; Cloud Infrastructure</Link></li>
                  <li><Link to="/solutions/software-development" className="hover:text-blue-600 transition-colors">Custom Software &amp; ERP</Link></li>
                  <li><Link to="/solutions/ai-automation" className="hover:text-blue-600 transition-colors">AI &amp; Workflow Automation</Link></li>
                  <li><Link to="/solutions/creative-services" className="hover:text-blue-600 transition-colors font-medium text-slate-800">Creative Media &amp; 3D Adverts</Link></li>
                  <li><Link to="/solutions/advisory" className="hover:text-blue-600 transition-colors">Digital Advisory &amp; Strategy</Link></li>
                  <li className="pt-1">
                    <Link to="/solutions" className="text-[#0046AF] font-bold hover:underline inline-flex items-center gap-1">
                      <span>View All Solutions</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Col 4: Core Services */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF]"></span>
                  <span>Core Services</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li><Link to="/services" className="hover:text-blue-600 transition-colors">Managed IT &amp; 24/7 Helpdesk</Link></li>
                  <li><Link to="/services" className="hover:text-blue-600 transition-colors">Web &amp; Mobile Engineering</Link></li>
                  <li><Link to="/services" className="hover:text-blue-600 transition-colors">Fortinet Zero-Trust Security</Link></li>
                  <li><Link to="/services" className="hover:text-blue-600 transition-colors">AWS &amp; Azure Cloud Migration</Link></li>
                  <li><Link to="/services" className="hover:text-blue-600 transition-colors">CRM &amp; API Integration</Link></li>
                  <li><Link to="/services" className="hover:text-blue-600 transition-colors">4K Video &amp; CGI Commercials</Link></li>
                </ul>
              </div>

              {/* Col 5: UAE Industries */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF]"></span>
                  <span>UAE Industries</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li><Link to="/industries" className="hover:text-blue-600 transition-colors font-medium text-slate-800">All 8 Industry Verticals →</Link></li>
                  <li><Link to="/industries" className="hover:text-blue-600 transition-colors">Real Estate &amp; PropTech</Link></li>
                  <li><Link to="/industries" className="hover:text-blue-600 transition-colors">Fintech &amp; DIFC/ADGM</Link></li>
                  <li><Link to="/industries" className="hover:text-blue-600 transition-colors">Omnichannel Retail</Link></li>
                  <li><Link to="/industries" className="hover:text-blue-600 transition-colors">Logistics &amp; Maritime</Link></li>
                  <li><Link to="/industries" className="hover:text-blue-600 transition-colors">Healthcare &amp; Clinics</Link></li>
                </ul>
              </div>

              {/* Col 6: Company & Enterprise Hub */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF]"></span>
                  <span>Company &amp; Hub</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li><Link to="/about" className="hover:text-blue-600 transition-colors font-medium">About Nexus Tech</Link></li>
                  <li><Link to="/how-we-work" className="hover:text-blue-600 transition-colors font-medium text-slate-800">How We Work (4 Stages)</Link></li>
                  <li><Link to="/insights" className="hover:text-blue-600 transition-colors font-medium text-slate-800">Insights &amp; Whitepapers</Link></li>
                  <li><Link to="/case-studies" className="hover:text-blue-600 transition-colors">Case Studies &amp; Impact</Link></li>
                  <li><Link to="/estimator" className="hover:text-blue-600 transition-colors">Project Cost Estimator</Link></li>
                  <li><Link to="/contact" className="hover:text-blue-600 transition-colors font-semibold text-slate-800">Contact &amp; Book Discovery</Link></li>
                  <li>
                    <Link to="/whatsapp-gateway" className="text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1 font-medium">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp API Gateway</span>
                    </Link>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Bar: Copyright, Compliance & Legal */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0046AF]"></span>
                <span>© 2026 Nexus IT Services FZ-LLC. All rights reserved. Registered in Dubai, United Arab Emirates.</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500">
                <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200">
                  TDRA &amp; ISO 27001 Security Standard
                </span>
                <Link to="/privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-slate-800 transition-colors">Terms of Service</Link>
                <Link to="/design-system" className="hover:text-[#1677FF] transition-colors font-medium">Design System</Link>
                <a href="https://maps.google.com/?q=Nexus+IT+Services+Dubai" target="_blank" rel="noopener noreferrer" className="hover:text-[#0046AF] transition-colors flex items-center gap-1">
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </CurrencyProvider>
  );
}
