import React, { useState } from 'react';
import { 
  Shield, Server, Database, Cloud, Code, Building2, CheckCircle2, 
  ArrowRight, Search, Mail, ExternalLink, Sparkles, SlidersHorizontal,
  Layers, Palette, Type, Box, Cpu, FileText
} from 'lucide-react';
import { 
  NEXUS_BRAND, 
  NEXUS_COLORS, 
  NexusButton, 
  NexusCard, 
  NexusServiceCard, 
  NexusSolutionCard, 
  NexusIndustryCard, 
  NexusBadge, 
  NexusMetadata, 
  NexusFilterTag, 
  NexusInput, 
  NexusTextarea, 
  NexusSelect, 
  NexusFormGroup, 
  NexusSectionHeader, 
  NexusCTA, 
  NexusImageContainer, 
  NexusNavbar, 
  NexusFooter 
} from '@/design-system';

export default function DesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState<'overview' | 'colors' | 'typography' | 'visuals' | 'components'>('overview');
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');
  
  // Interactive test states for form demo
  const [testEmail, setTestEmail] = useState('');
  const [testProject, setTestProject] = useState('cloud');
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className={`min-h-screen ${previewMode === 'dark' ? 'bg-[#07142F] text-white' : 'bg-[#F5F8FC] text-[#07142F]'} transition-colors duration-300 font-sans`}>
      
      {/* Design System Header Banner */}
      <div className="border-b border-[#DCE6F0] dark:border-white/10 bg-white dark:bg-[#07142F] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#1677FF] text-white flex items-center justify-center font-bold text-base">
              N
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#07142F] dark:text-white">
                  {NEXUS_BRAND.name}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#1677FF]/10 text-[#1677FF] border border-[#1677FF]/20">
                  Design System v1.0
                </span>
              </div>
              <p className="text-xs text-[#66748B] dark:text-slate-400">
                “{NEXUS_BRAND.tagline}” — UAE Enterprise Tech Standards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Surface Preview Toggle */}
            <div className="flex items-center p-1 rounded-md border border-[#DCE6F0] dark:border-white/15 bg-[#F5F8FC] dark:bg-[#0B2144] text-xs">
              <button
                type="button"
                onClick={() => setPreviewMode('light')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  previewMode === 'light' ? 'bg-white text-[#07142F] shadow-xs' : 'text-[#66748B] hover:text-[#07142F]'
                }`}
              >
                Light Canvas
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode('dark')}
                className={`px-3 py-1 rounded font-medium transition-colors ${
                  previewMode === 'dark' ? 'bg-[#07142F] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Navy Surface
              </button>
            </div>

            <a
              href="/"
              className="text-xs font-semibold px-3 py-1.5 rounded border border-[#DCE6F0] dark:border-white/15 hover:border-[#1677FF] text-[#07142F] dark:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <span>Back to Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 border-t border-[#DCE6F0]/60 dark:border-white/10 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Brand & Architecture', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'colors', label: 'Color Tokens', icon: <Palette className="w-3.5 h-3.5" /> },
            { id: 'typography', label: 'Typography Scale', icon: <Type className="w-3.5 h-3.5" /> },
            { id: 'visuals', label: 'Visual Language & Grids', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'components', label: 'Reusable Components', icon: <Box className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1677FF] text-white'
                  : 'text-[#66748B] dark:text-slate-300 hover:text-[#07142F] dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* ========================================================
            TAB 1: OVERVIEW & BRAND POSITIONING
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <NexusSectionHeader
              eyebrow="Enterprise Foundation"
              title="Brand Positioning & Design Constitution"
              description="NEXUS IT Services combines enterprise technology rigor, premium management consulting poise, modern SaaS responsiveness, and UAE corporate sophistication."
              dark={previewMode === 'dark'}
            />

            {/* Core Brand Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <NexusCard
                surface={previewMode === 'dark' ? 'deep' : 'white'}
                hasCornerBrackets
                className="lg:col-span-2"
              >
                <span className="text-xs font-mono uppercase tracking-widest text-[#1677FF] dark:text-[#39B9FF] block mb-2">
                  Brand Tagline & Mission
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                  “Technology. Simplified. Delivered.”
                </h3>
                <p className="text-sm leading-relaxed text-[#66748B] dark:text-slate-300 mb-6">
                  {NEXUS_BRAND.positioning} We bridge enterprise-grade architecture with real execution, delivering reliable IT operations, custom software engineering, and compliant cloud systems to businesses across Dubai, Abu Dhabi, and the wider GCC.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#DCE6F0] dark:border-white/10 text-xs">
                  <div>
                    <span className="font-bold text-[#07142F] dark:text-white block mb-1">Corporate HQ</span>
                    <span className="text-[#66748B] dark:text-slate-400">{NEXUS_BRAND.headquarters}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#07142F] dark:text-white block mb-1">Market Scope</span>
                    <span className="text-[#66748B] dark:text-slate-400">United Arab Emirates & GCC (Saudi Arabia, Qatar, Oman, Bahrain, Kuwait)</span>
                  </div>
                </div>
              </NexusCard>

              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'}>
                <span className="text-xs font-mono uppercase tracking-widest text-[#1677FF] dark:text-[#39B9FF] block mb-3">
                  Brand Values & Trust Markers
                </span>
                <ul className="space-y-2.5 text-xs">
                  {NEXUS_BRAND.coreValues.map((val, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1677FF] dark:text-[#39B9FF] shrink-0" />
                      <span className="font-medium text-[#07142F] dark:text-slate-200">{val}</span>
                    </li>
                  ))}
                </ul>
              </NexusCard>
            </div>

            {/* Design System Principles & Anti-Slop Discipline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#07142F] dark:text-white">
                    Mandatory Visual Language (Enforced)
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-[#66748B] dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1677FF] font-bold">✓</span>
                    <span><strong>Thin technical lines</strong> (1px solid #DCE6F0 hairlines, crisp architectural dividers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1677FF] font-bold">✓</span>
                    <span><strong>Subtle grids</strong> (32px technical dot and line grids with low opacity)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1677FF] font-bold">✓</span>
                    <span><strong>Architectural geometry</strong> (Precision corner brackets, balanced margins)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1677FF] font-bold">✓</span>
                    <span><strong>Soft blue lighting</strong> (Subtle 8-12% opacity radial ambient glows; zero harsh neon)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1677FF] font-bold">✓</span>
                    <span><strong>Dark tech surfaces & clean white sections</strong> (Balanced 60-30-10 distribution)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1677FF] font-bold">✓</span>
                    <span><strong>Zero-Pill discipline</strong> (Clean unboxed metadata with · separators, no candy capsules)</span>
                  </li>
                </ul>
              </NexusCard>

              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#07142F] dark:text-white">
                    Strict Anti-Patterns (Banned)
                  </h4>
                </div>
                <ul className="space-y-2 text-xs text-[#66748B] dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span><strong>No excessive gradients</strong> or multi-colored candy glows</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span><strong>No excessive rounded cards</strong> (strict 6px–8px radius, no rounded-3xl blobs)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span><strong>No generic SaaS templates</strong> or cookie-cutter 3-column triads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span><strong>No hacker imagery</strong> or terminal cliches (no // code comment prefixes in titles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span><strong>No stock IT technician photography</strong> or cartoon illustrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span><strong>No fake background engine tickers</strong> or arbitrary innovation scorecards</span>
                  </li>
                </ul>
              </NexusCard>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: COLOR TOKENS
           ======================================================== */}
        {activeTab === 'colors' && (
          <div className="space-y-12">
            <NexusSectionHeader
              eyebrow="Color Architecture"
              title="Standard Palette Tokens"
              description="A disciplined palette balancing deep technology surfaces with clean corporate reading planes. Enforces 60% dominant neutral canvas, 30% structural surfaces, and 10% electric blue action budget."
              dark={previewMode === 'dark'}
            />

            {/* Primary Palette */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1677FF] dark:text-[#39B9FF] mb-4">
                Primary Colors (Core Brand Identity)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: 'NEXUS Navy',
                    hex: '#07142F',
                    role: 'Dominant dark tech canvas, top headings, authoritative anchor',
                    textColor: 'text-white',
                    bg: 'bg-[#07142F]'
                  },
                  {
                    name: 'Deep Blue',
                    hex: '#0B2144',
                    role: 'Elevated dark card surfaces, secondary technology containers',
                    textColor: 'text-white',
                    bg: 'bg-[#0B2144]'
                  },
                  {
                    name: 'Electric Blue',
                    hex: '#1677FF',
                    role: 'Primary interactive accent, CTAs, focus rings, active indicators',
                    textColor: 'text-white',
                    bg: 'bg-[#1677FF]'
                  },
                  {
                    name: 'Cyan',
                    hex: '#39B9FF',
                    role: 'Precise highlights, data accents, ambient technical glows',
                    textColor: 'text-[#07142F]',
                    bg: 'bg-[#39B9FF]'
                  }
                ].map((c) => (
                  <div
                    key={c.hex}
                    className="rounded-lg overflow-hidden border border-[#DCE6F0] dark:border-white/15 bg-white dark:bg-[#0B2144] shadow-xs"
                  >
                    <div className={`h-24 ${c.bg} flex items-end p-3 ${c.textColor}`}>
                      <span className="font-mono text-xs font-bold">{c.hex}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-[#07142F] dark:text-white mb-1">{c.name}</h4>
                      <p className="text-xs text-[#66748B] dark:text-slate-400 leading-snug">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Palette */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1677FF] dark:text-[#39B9FF] mb-4">
                Supporting Colors (Structure & Typography)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: 'Light Background',
                    hex: '#F5F8FC',
                    role: 'Clean corporate canvas, airy section background, contrast layer',
                    textColor: 'text-[#07142F]',
                    bg: 'bg-[#F5F8FC]',
                    border: 'border border-[#DCE6F0]'
                  },
                  {
                    name: 'White',
                    hex: '#FFFFFF',
                    role: 'Card surfaces, high-legibility content planes, modal sheets',
                    textColor: 'text-[#07142F]',
                    bg: 'bg-[#FFFFFF]',
                    border: 'border border-[#DCE6F0]'
                  },
                  {
                    name: 'Secondary Text',
                    hex: '#66748B',
                    role: 'High-contrast muted body prose, helper notes, unboxed metadata',
                    textColor: 'text-white',
                    bg: 'bg-[#66748B]'
                  },
                  {
                    name: 'Borders (Hairline)',
                    hex: '#DCE6F0',
                    role: 'Thin technical dividers, architectural card boundaries',
                    textColor: 'text-[#07142F]',
                    bg: 'bg-[#DCE6F0]'
                  }
                ].map((c) => (
                  <div
                    key={c.hex}
                    className="rounded-lg overflow-hidden border border-[#DCE6F0] dark:border-white/15 bg-white dark:bg-[#0B2144] shadow-xs"
                  >
                    <div className={`h-24 ${c.bg} ${c.border || ''} flex items-end p-3 ${c.textColor}`}>
                      <span className="font-mono text-xs font-bold">{c.hex}</span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-[#07142F] dark:text-white mb-1">{c.name}</h4>
                      <p className="text-xs text-[#66748B] dark:text-slate-400 leading-snug">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Distribution Blueprint */}
            <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#07142F] dark:text-white mb-3">
                60-30-10 Color Allocation Rule
              </h4>
              <div className="h-6 w-full rounded flex overflow-hidden mb-3 border border-[#DCE6F0] dark:border-white/10">
                <div className="w-[60%] bg-[#F5F8FC] dark:bg-[#07142F] flex items-center justify-center text-[10px] font-mono text-[#07142F] dark:text-white font-bold border-r border-[#DCE6F0]">
                  60% Neutral Canvas (#F5F8FC / #07142F)
                </div>
                <div className="w-[30%] bg-[#FFFFFF] dark:bg-[#0B2144] flex items-center justify-center text-[10px] font-mono text-[#07142F] dark:text-white font-bold border-r border-[#DCE6F0]">
                  30% Structural Surfaces (#FFFFFF / #0B2144)
                </div>
                <div className="w-[10%] bg-[#1677FF] flex items-center justify-center text-[10px] font-mono text-white font-bold">
                  10% Accent (#1677FF)
                </div>
              </div>
              <p className="text-xs text-[#66748B] dark:text-slate-400">
                Maintains visual restraint. The Electric Blue (#1677FF) accent is strictly reserved for actionable elements, while Cyan (#39B9FF) acts as a precision technical marker.
              </p>
            </NexusCard>
          </div>
        )}

        {/* ========================================================
            TAB 3: TYPOGRAPHY SCALE
           ======================================================== */}
        {activeTab === 'typography' && (
          <div className="space-y-12">
            <NexusSectionHeader
              eyebrow="Geometric Neo-Grotesk"
              title="Typography Hierarchy & Scale"
              description="Constructed using Inter / Satoshi geometric neo-grotesk letterforms with tight tracking and optical compensation for light text on dark surfaces."
              dark={previewMode === 'dark'}
            />

            <div className="space-y-6">
              {/* Display Heading */}
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6F0]/60 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF]">
                    Display Heading · 48px–60px / Bold / Leading 1.08 / Tracking -0.02em
                  </span>
                  <span className="text-[10px] font-mono text-[#66748B] dark:text-slate-400">Hero & Major Statements</span>
                </div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#07142F] dark:text-white">
                  Technology. Simplified. Delivered.
                </div>
              </NexusCard>

              {/* H1 */}
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6F0]/60 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF]">
                    H1 · 36px–48px / Bold / Leading 1.14 / Tracking -0.015em
                  </span>
                  <span className="text-[10px] font-mono text-[#66748B] dark:text-slate-400">Page Headline</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#07142F] dark:text-white">
                  Enterprise Cloud & IT Solutions in Dubai
                </div>
              </NexusCard>

              {/* H2 */}
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6F0]/60 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF]">
                    H2 · 28px–36px / SemiBold / Leading 1.2 / Tracking -0.01em
                  </span>
                  <span className="text-[10px] font-mono text-[#66748B] dark:text-slate-400">Section Headers</span>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#07142F] dark:text-white">
                  Five Core Service Pillars Built for GCC Scale
                </div>
              </NexusCard>

              {/* H3 */}
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6F0]/60 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF]">
                    H3 · 20px–24px / SemiBold / Leading 1.3
                  </span>
                  <span className="text-[10px] font-mono text-[#66748B] dark:text-slate-400">Card Titles & Feature Blocks</span>
                </div>
                <div className="text-xl font-semibold text-[#07142F] dark:text-white">
                  01. IT Infrastructure & Cybersecurity Governance
                </div>
              </NexusCard>

              {/* Body */}
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#DCE6F0]/60 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF]">
                    Body · 16px / Regular / Leading 1.6 / Color #66748B
                  </span>
                  <span className="text-[10px] font-mono text-[#66748B] dark:text-slate-400">Explanatory Prose (65–75ch)</span>
                </div>
                <p className="text-base leading-relaxed text-[#66748B] dark:text-[#94A3B8] max-w-2xl">
                  NEXUS delivers turnkey managed IT infrastructure, hybrid-cloud migrations, and bespoke software solutions designed to adhere strictly to UAE data sovereignty guidelines, UAE Central Bank compliance, and DIFC standards.
                </p>
              </NexusCard>

              {/* Small Text, Eyebrows & Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF] block mb-2">
                    Eyebrow Label
                  </span>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#1677FF] dark:text-[#39B9FF]">
                    INFRASTRUCTURE DIVISION
                  </div>
                  <span className="text-[11px] text-[#66748B] dark:text-slate-400 block mt-2">
                    Unboxed text with tracking, never wrapped in pill badges
                  </span>
                </NexusCard>

                <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF] block mb-2">
                    Small Text / Captions
                  </span>
                  <div className="text-sm text-[#66748B] dark:text-[#94A3B8]">
                    Last updated March 2026 · UAE In-Country Storage
                  </div>
                  <span className="text-[11px] text-[#66748B] dark:text-slate-400 block mt-2">
                    Metadata and secondary footnotes
                  </span>
                </NexusCard>

                <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                  <span className="text-xs font-mono font-semibold text-[#1677FF] dark:text-[#39B9FF] block mb-2">
                    Tabular Figures / Code
                  </span>
                  <div className="font-mono text-sm tabular-nums text-[#07142F] dark:text-white font-semibold">
                    AED 45,000 · 99.98% SLA · 14.2 ms
                  </div>
                  <span className="text-[11px] text-[#66748B] dark:text-slate-400 block mt-2">
                    Monospace numbers for vertical metric alignment
                  </span>
                </NexusCard>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: VISUAL LANGUAGE & GRIDS
           ======================================================== */}
        {activeTab === 'visuals' && (
          <div className="space-y-12">
            <NexusSectionHeader
              eyebrow="Architectural Identity"
              title="Visual Language Patterns"
              description="A calibrated system of thin technical lines, subtle grids, data-flow animation pulses, architectural geometry, soft blue lighting, and controlled glass effects."
              dark={previewMode === 'dark'}
            />

            {/* Grid Patterns & Architectural Corner Brackets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-lg border border-[#DCE6F0] bg-white text-[#07142F] nexus-grid-light nexus-corner-bracket relative">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1677FF] block mb-2">
                  01. Light Architectural Grid
                </span>
                <h4 className="text-lg font-bold mb-2">32px Precision Matrix (Light)</h4>
                <p className="text-xs text-[#66748B] leading-relaxed mb-4">
                  Subtle 1px hairlines at 0.6 opacity providing engineering structure across clean white surfaces without overpowering the content.
                </p>
                <div className="p-3 bg-[#F5F8FC] rounded border border-[#DCE6F0] text-xs font-mono text-[#07142F]">
                  .nexus-grid-light + .nexus-corner-bracket
                </div>
              </div>

              <div className="p-8 rounded-lg border border-white/10 bg-[#07142F] text-white nexus-grid-dark nexus-corner-bracket relative">
                <span className="text-xs font-mono uppercase tracking-wider text-[#39B9FF] block mb-2">
                  02. Dark Technology Grid
                </span>
                <h4 className="text-lg font-bold mb-2">32px Precision Matrix (Dark)</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Constructed with faint #DCE6F0/0.05 lines over deep #07142F navy, evoking mission-critical operations consoles.
                </p>
                <div className="p-3 bg-[#0B2144] rounded border border-white/10 text-xs font-mono text-white">
                  .nexus-grid-dark + .nexus-corner-bracket
                </div>
              </div>
            </div>

            {/* Data-flow Pattern & Soft Blue Lighting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1677FF] dark:text-[#39B9FF] block mb-2">
                  03. Data-Flow Line Pulse
                </span>
                <h4 className="text-base font-bold mb-2">Controlled Ambient Data Flow</h4>
                <p className="text-xs text-[#66748B] dark:text-slate-400 mb-4">
                  A subtle 4-second linear shimmer across hairline borders indicating active system readiness.
                </p>

                <div className="h-10 w-full rounded border border-[#DCE6F0] dark:border-white/10 bg-[#F5F8FC] dark:bg-[#07142F] nexus-dataflow-h flex items-center px-4">
                  <span className="text-xs font-mono text-[#1677FF] dark:text-[#39B9FF]">
                    DATA_FLOW_VERIFIED // AED-DUBAI-DC01
                  </span>
                </div>
              </NexusCard>

              <NexusCard surface={previewMode === 'dark' ? 'deep' : 'white'} padding="md">
                <span className="text-xs font-mono uppercase tracking-wider text-[#1677FF] dark:text-[#39B9FF] block mb-2">
                  04. Soft Blue Lighting (Glow)
                </span>
                <h4 className="text-base font-bold mb-2">Ambient Tech Illumination</h4>
                <p className="text-xs text-[#66748B] dark:text-slate-400 mb-4">
                  Controlled radial glow (rgba(22, 119, 255, 0.18)) focused at action anchors. Zero harsh neon.
                </p>

                <div className="p-4 rounded-md bg-[#07142F] text-white border border-white/15 nexus-glow-soft flex items-center justify-between">
                  <span className="text-xs font-semibold">High-Intent Decision Surface</span>
                  <NexusButton variant="primary" size="sm">
                    Verified Action
                  </NexusButton>
                </div>
              </NexusCard>
            </div>

            {/* Controlled Glass Effects */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg nexus-glass-light nexus-depth-2">
                <span className="text-xs font-mono font-bold uppercase text-[#1677FF] block mb-1">
                  Controlled Glass (Light)
                </span>
                <h4 className="text-sm font-bold text-[#07142F] mb-1">rgba(255, 255, 255, 0.90) + 12px Blur</h4>
                <p className="text-xs text-[#66748B]">
                  Used for sticky navigation bars, floating action ribbons, and dropdown sheets with a crisp 1px hairline border.
                </p>
              </div>

              <div className="p-6 rounded-lg nexus-glass-dark nexus-depth-2 text-white">
                <span className="text-xs font-mono font-bold uppercase text-[#39B9FF] block mb-1">
                  Controlled Glass (Dark)
                </span>
                <h4 className="text-sm font-bold text-white mb-1">rgba(7, 20, 47, 0.85) + 14px Blur</h4>
                <p className="text-xs text-slate-300">
                  Used on dark technology surfaces for overlays, architecture specs, and navigation chrome.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: REUSABLE COMPONENTS
           ======================================================== */}
        {activeTab === 'components' && (
          <div className="space-y-16">
            <NexusSectionHeader
              eyebrow="UI Components"
              title="Enterprise Component Library"
              description="Production-ready components engineered with consistent 8px spatial rhythm, strict single-line action constraints, accessibility attributes, and domain-authentic UAE styling."
              dark={previewMode === 'dark'}
            />

            {/* 1. BUTTONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  1. Buttons (NexusButton)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Single-line, 8px math, 6 variants
                </span>
              </div>

              <div className="p-6 rounded-lg border border-[#DCE6F0] dark:border-white/10 bg-white dark:bg-[#0B2144] space-y-6">
                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-3">Variants</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <NexusButton variant="primary">Primary Electric</NexusButton>
                    <NexusButton variant="secondary">Secondary Deep</NexusButton>
                    <NexusButton variant="outline">Technical Outline</NexusButton>
                    <NexusButton variant="darkOutline">Dark Navy Outline</NexusButton>
                    <NexusButton variant="cyan">Cyan Highlight</NexusButton>
                    <NexusButton variant="ghost">Ghost Action</NexusButton>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-3">Sizes (sm / md / lg)</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <NexusButton variant="primary" size="sm">Small (32px)</NexusButton>
                    <NexusButton variant="primary" size="md">Medium (40px)</NexusButton>
                    <NexusButton variant="primary" size="lg">Large (48px)</NexusButton>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-3">Interactive States</span>
                  <div className="flex flex-wrap items-center gap-3">
                    <NexusButton variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      With Icon
                    </NexusButton>
                    <NexusButton variant="primary" isLoading>
                      Loading State
                    </NexusButton>
                    <NexusButton variant="primary" disabled>
                      Disabled State
                    </NexusButton>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. TAGS & BADGES (ZERO-PILL DISCIPLINE) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  2. Tags & Badges (Zero-Pill Discipline)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Clean unboxed text & subtle hairline tags
                </span>
              </div>

              <div className="p-6 rounded-lg border border-[#DCE6F0] dark:border-white/10 bg-white dark:bg-[#0B2144] space-y-6">
                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-3">
                    A. Clean Unboxed Metadata (Mandatory for Informational Text)
                  </span>
                  <NexusMetadata
                    items={[
                      'Dubai Internet City',
                      'Enterprise SLA 99.98%',
                      'ISO 27001 Aligned',
                      'Published March 2026'
                    ]}
                    dark={previewMode === 'dark'}
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-3">
                    B. Status Badges (Hairline 4px Radius with Operational Dot)
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <NexusBadge variant="status" statusDot="success">UAE Systems Operational</NexusBadge>
                    <NexusBadge variant="status" statusDot="info">Cloud Migration Active</NexusBadge>
                    <NexusBadge variant="status" statusDot="warning">Scheduled Maintenance Window</NexusBadge>
                    <NexusBadge variant="electric">Electric Accent</NexusBadge>
                    <NexusBadge variant="cyan">Cyan Highlight</NexusBadge>
                    <NexusBadge variant="dark">Dark Navy Surface</NexusBadge>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-3">
                    C. Interactive Filter Controls (Functional Clickable Buttons)
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <NexusFilterTag active count={12}>All Solutions</NexusFilterTag>
                    <NexusFilterTag count={5}>Cloud & Data</NexusFilterTag>
                    <NexusFilterTag count={4}>Cyber Defense</NexusFilterTag>
                    <NexusFilterTag count={3}>AI Automation</NexusFilterTag>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SERVICE CARD DEMO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  3. Service Cards (NexusServiceCard)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Human editorial index, unboxed deliverables
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NexusServiceCard
                  index="01"
                  title="IT Infrastructure & Security"
                  description="High-availability network architecture, structured cabling, biometric access, and enterprise server governance for Dubai headquarters."
                  icon={<Server className="w-5 h-5" />}
                  capabilities={[
                    'Enterprise firewall & perimeter defense',
                    'CCTV, biometric & access control integration',
                    'On-premise & hybrid cloud SAN storage',
                    '24/7 dedicated Dubai NOC monitoring'
                  ]}
                  dark={previewMode === 'dark'}
                />

                <NexusServiceCard
                  index="02"
                  title="Custom Software & Web Engineering"
                  description="Bespoke enterprise applications, client portals, workflow engines, and mission-critical web platforms designed for GCC business logic."
                  icon={<Code className="w-5 h-5" />}
                  capabilities={[
                    'High-scale React, TypeScript & Node.js stacks',
                    'ERP & CRM custom integrations',
                    'Multi-tenant UAE client portal architecture',
                    'REST & GraphQL enterprise API gateways'
                  ]}
                  dark={previewMode === 'dark'}
                />

                <NexusServiceCard
                  index="03"
                  title="AI & Workflow Automation"
                  description="Automated business pipelines, intelligent document processing, and generative AI workflows built on compliant enterprise models."
                  icon={<Cpu className="w-5 h-5" />}
                  capabilities={[
                    'Bilingual Arabic/English automated pipelines',
                    'WhatsApp business automation gateways',
                    'Invoice & trade document auto-extraction',
                    'Custom LLM fine-tuning on company data'
                  ]}
                  dark={previewMode === 'dark'}
                />
              </div>
            </div>

            {/* 4. SOLUTION CARD DEMO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  4. Solution Cards (NexusSolutionCard)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Architectural geometry, measured outcomes
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NexusSolutionCard
                  category="Cloud & Data Sovereignty"
                  title="UAE Sovereign Hybrid Cloud"
                  highlightMetric="100% In-Country Residency"
                  summary="Architected for organizations requiring compliant in-country data storage across UAE data centers with multi-region failover and AES-256 encryption."
                  outcomes={[
                    { label: 'Uptime SLA', value: '99.99%' },
                    { label: 'RPO / RTO', value: '< 5 Mins' }
                  ]}
                  tags={['UAE Data Law', 'DIFC Ready', 'Zero-Trust', 'Multi-AZ']}
                  dark={previewMode === 'dark'}
                />

                <NexusSolutionCard
                  category="Cybersecurity & Defense"
                  title="Enterprise 24/7 Managed SOC"
                  highlightMetric="< 12 Min Mean Incident Triage"
                  summary="Continuous threat monitoring, automated endpoint quarantine, and proactive vulnerability auditing tailored for GCC mid-market and enterprise."
                  outcomes={[
                    { label: 'Threat Mitigation', value: '99.8%' },
                    { label: 'Compliance Audit', value: 'Quarterly' }
                  ]}
                  tags={['NESA Aligned', 'SIEM / SOAR', 'Penetration Testing', 'Dubai NOC']}
                  dark={previewMode === 'dark'}
                />
              </div>
            </div>

            {/* 5. INDUSTRY CARD DEMO */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  5. Industry Cards (NexusIndustryCard)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Tailored UAE & GCC regulatory verticals
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <NexusIndustryCard
                  sector="Banking, Finance & FinTech"
                  regulatoryStandard="DIFC & ADGM Ready"
                  description="High-security transactional systems, payment gateway integration, and automated regulatory reporting for Dubai financial institutions."
                  highlights={[
                    'PCI-DSS Tier 1 compliant architectures',
                    'KYC & AML automated verification engines',
                    'Encrypted ledger auditing'
                  ]}
                  icon={<Building2 className="w-6 h-6" />}
                  dark={previewMode === 'dark'}
                />

                <NexusIndustryCard
                  sector="Logistics & Free Zones"
                  regulatoryStandard="JAFZA & DWC Compliant"
                  description="Real-time freight telemetry, warehouse ERP sync, customs manifest automation, and resilient IoT edge compute."
                  highlights={[
                    'Port customs API integrations',
                    'High-availability warehouse Wi-Fi meshes',
                    'Cold-chain IoT telemetry monitors'
                  ]}
                  icon={<Layers className="w-6 h-6" />}
                  dark={previewMode === 'dark'}
                />

                <NexusIndustryCard
                  sector="Government & Semi-Government"
                  regulatoryStandard="UAE Cyber Security Council Aligned"
                  description="Digitized citizen workflows, sovereign cloud integration, and enterprise-grade resilience for public sector initiatives."
                  highlights={[
                    'UAE PASS single sign-on integration',
                    'Zero-trust network segregation',
                    'National cybersecurity framework compliance'
                  ]}
                  icon={<Shield className="w-6 h-6" />}
                  dark={previewMode === 'dark'}
                />
              </div>
            </div>

            {/* 6. FORMS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  6. Forms (NexusInput, Textarea, Select, FormGroup)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Clean hairlines, validation states, accessible focus
                </span>
              </div>

              <div className="p-8 rounded-lg border border-[#DCE6F0] dark:border-white/10 bg-white dark:bg-[#0B2144] max-w-2xl">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <NexusFormGroup
                    label="Corporate Email Address"
                    hint="Must be your official organization domain"
                    required
                    dark={previewMode === 'dark'}
                  >
                    <NexusInput
                      type="email"
                      placeholder="name@company.ae"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      leftIcon={<Mail className="w-4 h-4" />}
                      dark={previewMode === 'dark'}
                    />
                  </NexusFormGroup>

                  <NexusFormGroup
                    label="Service Capability Required"
                    dark={previewMode === 'dark'}
                  >
                    <NexusSelect
                      value={testProject}
                      onChange={(e) => setTestProject(e.target.value)}
                      options={[
                        { value: 'cloud', label: 'UAE Sovereign Cloud & Migration' },
                        { value: 'software', label: 'Custom Enterprise Software Engineering' },
                        { value: 'infra', label: 'Managed IT Infrastructure & Security' },
                        { value: 'ai', label: 'AI Workflow Automation & Chatbots' }
                      ]}
                      dark={previewMode === 'dark'}
                    />
                  </NexusFormGroup>

                  <NexusFormGroup
                    label="Technical Requirements Overview"
                    hint="Provide high-level architecture scope or timeline"
                    dark={previewMode === 'dark'}
                  >
                    <NexusTextarea
                      rows={3}
                      placeholder="Detail your infrastructure parameters, user count, or compliance needs..."
                      dark={previewMode === 'dark'}
                    />
                  </NexusFormGroup>

                  <div className="pt-2 flex items-center justify-between">
                    <NexusButton variant="primary" type="submit">
                      Submit Technical Request
                    </NexusButton>
                    {formSubmitted && (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Validated & Routed to Dubai NOC
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* 7. IMAGE CONTAINERS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  7. Image Containers (NexusImageContainer)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Architectural frames, corner brackets, zero-broken-image fallback
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-2">
                    Resilient Styled SVG Fallback Container (Zero Broken Images)
                  </span>
                  <NexusImageContainer
                    alt="Dubai High-Availability Server Infrastructure"
                    aspectRatio="16:9"
                    technicalLabel="NEXUS DC01 · DUBAI"
                    caption="Architectural fallback frame when remote media is unbundled"
                    dark={previewMode === 'dark'}
                  />
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-2">
                    4:3 Technical Frame with Corner Brackets
                  </span>
                  <NexusImageContainer
                    alt="Network Operations Center Console"
                    aspectRatio="4:3"
                    technicalLabel="NOC TELEMETRY"
                    caption="Precision 4:3 ratio for feature grids & solution highlights"
                    dark={previewMode === 'dark'}
                  />
                </div>
              </div>
            </div>

            {/* 8. CALL TO ACTION (CTA) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  8. Call To Action Blocks (NexusCTA)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  Dark Navy & Clean Light variants
                </span>
              </div>

              <div className="space-y-8">
                {/* Dark Navy Variant */}
                <NexusCTA
                  variant="darkNavy"
                  title="Schedule a Strategic IT Architecture Discovery"
                  description="Meet our senior technology partners in Dubai or remotely across the GCC. We analyze your infrastructure roadmap and deliver transparent, execution-focused solutions."
                  primaryActionLabel="Schedule Technical Discovery"
                  secondaryActionLabel="Call Dubai Team"
                />

                {/* Clean Light Variant */}
                <NexusCTA
                  variant="lightClean"
                  title="Plan Your 2026 GCC Technology Budget"
                  description="Use our transparent project estimator to model cost benchmarks for custom software, cloud migrations, and ongoing enterprise IT management."
                  primaryActionLabel="Open Project Estimator"
                  secondaryActionLabel="Request Rate Card"
                />
              </div>
            </div>

            {/* 9. NAVBAR & FOOTER SPECIFICATION */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#DCE6F0] dark:border-white/10">
                <h3 className="text-base font-bold text-[#07142F] dark:text-white">
                  9. Top Bar & Footer (NexusNavbar & NexusFooter)
                </h3>
                <span className="text-xs font-mono text-[#66748B] dark:text-slate-400">
                  One-row 3-zone contract & Corporate Dubai footer
                </span>
              </div>

              <div className="border border-[#DCE6F0] dark:border-white/10 rounded-lg overflow-hidden space-y-8 bg-[#F5F8FC] dark:bg-[#07142F] p-4 sm:p-6">
                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-2">
                    Top Bar Navbar Component Preview
                  </span>
                  <div className="border border-[#DCE6F0] rounded-lg overflow-hidden">
                    <NexusNavbar dark={previewMode === 'dark'} />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#66748B] dark:text-slate-400 block mb-2">
                    Corporate Dubai Footer Component Preview
                  </span>
                  <div className="border border-[#DCE6F0] rounded-lg overflow-hidden">
                    <NexusFooter dark={previewMode === 'dark'} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
