import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#EEF2F8] text-slate-800 flex flex-col justify-between overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Top Atmospheric Office & City Collaboration Skyline with Light Fade Mask */}
      <div className="absolute top-0 left-0 right-0 h-[480px] overflow-hidden pointer-events-none select-none z-0">
        <div className="w-full h-full bg-[#E5EDF6]" />
        {/* Soft atmospheric gradient transitions matching the template */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EEF2F8]/30 via-[#EEF2F8]/75 to-[#EEF2F8]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF2F8]/70 via-transparent to-[#EEF2F8]/70" />
        
        {/* Subtle decorative floating holographic particles & glass cubes */}
        <div className="absolute top-24 left-[15%] w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-400/30 backdrop-blur-md rotate-12 animate-pulse" />
        <div className="absolute top-16 right-[18%] w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/30 backdrop-blur-md -rotate-6 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-36 right-[28%] w-6 h-6 rounded-md bg-cyan-500/10 border border-cyan-400/30 backdrop-blur-md rotate-45" />
      </div>

      {/* Top Brand Header Bar: CSS selector 1 targets this layout root; selector 2 targets the logo div, selector 3 targets the brand span */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-3 group transition-transform hover:scale-[1.01]">
          {/* CSS selector 2: 2nd div selected -> place and fix logo.png */}
          <div className="relative flex items-center justify-center h-11 w-11 rounded-xl bg-white/95 border border-slate-200 shadow-sm group-hover:border-blue-400/60 transition-all p-1.5 overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Nexus IT Services Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
          {/* CSS selector 3: span selected -> change text to Nexus IT Services */}
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            Nexus IT Services
          </span>
        </Link>

        {/* Back to Home / Direct link */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200/90 bg-white/80 hover:bg-white transition-all shadow-xs backdrop-blur-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </Link>
        </div>
      </div>

      {/* Main Login Experience / Outlet */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <span>&copy; {new Date().getFullYear()} Nexus IT Services. All rights reserved.</span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <span className="hidden sm:inline">Dubai, UAE</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Enterprise 256-bit SSL
          </span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
