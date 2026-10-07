import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function CinematicHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);

  // Current pages navigation links
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Industries', path: '/industries' },
    { label: 'How We Work', path: '/how-we-work' },
    { label: 'About', path: '/about' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
  ];

  // JavaScript Word-by-Word Logic preserving <br> tags with sequential animation timeline
  useEffect(() => {
    const animateWords = (element: HTMLElement, startDelay: number, stepDelay: number): number => {
      let currentDelay = startDelay;
      const childNodes = Array.from(element.childNodes);
      element.innerHTML = '';

      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || '';
          const words = text.split(/\s+/).filter(Boolean);
          words.forEach((word) => {
            const span = document.createElement('span');
            span.className = 'hero-word-wrap';
            span.style.animationDelay = `${currentDelay.toFixed(3)}s`;
            span.textContent = word;
            element.appendChild(span);
            element.appendChild(document.createTextNode(' '));
            currentDelay += stepDelay;
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName.toLowerCase() === 'br') {
            element.appendChild(el.cloneNode(true));
          } else {
            element.appendChild(el.cloneNode(true));
          }
        }
      });

      return currentDelay;
    };

    if (headingRef.current && subheadingRef.current) {
      // 1. Heading animates word-by-word
      const headingEnd = animateWords(headingRef.current, 0.35, 0.10);
      // 2. Subheading animates word-by-word right as the heading finishes
      animateWords(subheadingRef.current, headingEnd + 0.05, 0.055);
    }
  }, []);

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black text-white select-none">
      
      {/* 2. BACKGROUND VIDEO & OVERLAY
          Fixed/absolute fullscreen background layer (z-index: 0, object-fit: cover) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source 
            src="https://cdn.sceneai.art/Hero%20Section%20Video/0519be39-d8d1-48a5-84ee-f8a1ec038cd6.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Absolute overlay with bg-black/30 for optimal text readability */}
        <div className="absolute inset-0 bg-black/35 z-[1]" />
      </div>

      {/* 3. HEADER & NAVIGATION (Absolute positioned at top, z-index: 20) */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 py-6 md:px-16 md:py-10">
        {/* Left Side (Logo): Abstract globe SVG icon inside rounded-full container + Trav */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg 
              className="w-4 h-4 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-[16px] font-medium tracking-wide text-white">
            Trav
          </span>
        </Link>

        {/* Right Side (Desktop Nav): Hidden on mobile. Customized with all current pages */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-[14px] font-medium text-white/95 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Hamburger Icon Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 text-white/90 hover:text-white transition-colors focus:outline-none"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Full-Screen Backdrop-Blurred Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="text-[16px] font-medium text-white">Trav</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close Navigation Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-6 my-auto text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium text-white/90 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-center text-xs text-white/40">
            Nexus IT Services FZ-LLC
          </div>
        </div>
      )}

      {/* 4. MAIN HERO CONTENT (Centered flex container, max-w-4xl, h-[100dvh]) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto relative z-10 my-auto">
        
        {/* Icon: White SVG Map Pin with drop shadow (Drops in first) */}
        <div className="hero-pin-drop mb-6 md:mb-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          <svg 
            className="w-8 h-8 md:w-9 md:h-9 text-white" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>

        {/* Main Heading: 60px on desktop, font-semibold, negative tracking, leading-[1.1] */}
        <h1 
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-[60px] font-semibold tracking-[-0.02em] leading-[1.1] text-white mb-5 sm:mb-6"
        >
          Begin Your Next<br className="hidden md:block" />Big Adventure
        </h1>

        {/* Subheading: 16-17px, font-medium, text-white/95, leading-[1.6], max-w-480px */}
        <p 
          ref={subheadingRef}
          className="text-[16px] md:text-[17px] font-medium text-white/95 leading-[1.6] max-w-[480px] mx-auto mb-8 sm:mb-10"
        >
          Discover hidden gems, plan unforgettable trips, and<br className="hidden md:block" />explore the world — all in one seamless app.
        </p>

        {/* CTA Button: "Download Now", rounded-full, 15px, white glow hover effect */}
        <div>
          <button 
            type="button"
            className="hero-btn-fade inline-block bg-white text-black font-medium text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] active:scale-95 cursor-pointer"
          >
            Download Now
          </button>
        </div>

      </div>

      {/* Spacer to balance vertical centering */}
      <div className="h-12 md:h-16" />

    </section>
  );
}
