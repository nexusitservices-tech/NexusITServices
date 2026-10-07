/**
 * NEXUS IT Services — Unified Visual Design System
 * 
 * Brand Positioning: "Technology. Simplified. Delivered."
 * Target Market: UAE & GCC Enterprise Technology & Business Solutions
 * Character: Enterprise Technology + Premium Consulting + Modern SaaS + UAE Corporate Sophistication
 */

export const NEXUS_BRAND = {
  name: 'NEXUS IT Services',
  shortName: 'NEXUS',
  tagline: 'Technology. Simplified. Delivered.',
  positioning: 'Enterprise technology and business solutions company serving UAE and GCC businesses.',
  region: 'Dubai, Abu Dhabi & GCC',
  headquarters: 'Radiance ONE Business Center, Rigga Al Buteen, Dubai, UAE',
  phone: '+971 52 6367221',
  email: 'nexus.itservices06@gmail.com',
  coreValues: [
    'Enterprise technology',
    'Reliability',
    'Technical expertise',
    'Business understanding',
    'Innovation',
    'Security',
    'Modern UAE professionalism',
    'Long-term partnership'
  ] as const
};

export const NEXUS_COLORS = {
  // Primary Palette
  primary: {
    navy: '#07142F',         // NEXUS Navy (Dominant dark technology anchor)
    deepBlue: '#0B2144',     // Deep Blue (Structural dark cards, secondary surface)
    electricBlue: '#1677FF', // Electric Blue (Primary interactive accent, CTAs, links)
    cyan: '#39B9FF'          // Cyan (Precise highlight, data points, subtle ambient accents)
  },
  // Supporting Palette
  supporting: {
    lightBg: '#F5F8FC',      // Light Background (Clean corporate canvas)
    white: '#FFFFFF',        // White (Card surfaces, crisp reading planes)
    secondaryText: '#66748B',// Secondary Text (High-contrast muted body & metadata)
    border: '#DCE6F0'        // Borders (Thin architectural hairline dividers)
  },
  // Dark Surface Accents
  darkSurface: {
    base: '#07142F',
    elevated: '#0B2144',
    border: 'rgba(220, 230, 240, 0.12)',
    textMuted: '#94A3B8',
    textSecondary: '#CBD5E1'
  }
} as const;

/**
 * 8px-based Spacing System
 * Multiples of 8px for vertical rhythm, grid gutters, and component padding
 */
export const NEXUS_SPACING = {
  xs: '8px',    // space-1 (p-2, gap-2)
  sm: '16px',   // space-2 (p-4, gap-4)
  md: '24px',   // space-3 (p-6, gap-6)
  lg: '32px',   // space-4 (p-8, gap-8)
  xl: '40px',   // space-5 (p-10, gap-10)
  '2xl': '48px',// space-6 (p-12, gap-12)
  '3xl': '64px',// space-8 (p-16, gap-16)
  '4xl': '80px',// space-10 (p-20, gap-20)
  '5xl': '96px' // space-12 (p-24, gap-24)
} as const;

/**
 * Standard Typographic Hierarchy
 * Built with geometric/neo-grotesk letterforms (Inter / Satoshi)
 */
export const NEXUS_TYPOGRAPHY = {
  // Display Heading: Marquee marketing, hero statements, major anchor numbers
  display: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#07142F] leading-[1.08]',
  displayDark: 'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]',

  // H1: Primary page title, core proposition
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#07142F] leading-[1.14]',
  h1Dark: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.14]',

  // H2: Major section headers, pillar introductions
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#07142F] leading-[1.2]',
  h2Dark: 'text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-[1.2]',

  // H3: Feature cards, solution titles, modal headers
  h3: 'text-lg sm:text-xl font-semibold text-[#07142F] leading-[1.3]',
  h3Dark: 'text-lg sm:text-xl font-semibold text-white leading-[1.3]',

  // Body: Core explanatory prose, measure 65-75ch
  body: 'text-base leading-relaxed text-[#66748B]',
  bodyDark: 'text-base leading-relaxed text-[#94A3B8]',

  // Small Text: Captions, helper notes, footer links, secondary stats
  small: 'text-sm leading-normal text-[#66748B]',
  smallDark: 'text-sm leading-normal text-[#94A3B8]',

  // Eyebrow Label: Technical domain category, section kickers (No pill enclosure, unboxed)
  eyebrow: 'text-xs font-semibold uppercase tracking-wider text-[#1677FF]',
  eyebrowDark: 'text-xs font-semibold uppercase tracking-wider text-[#39B9FF]',

  // Button Typography: Single-line action labels
  button: 'text-sm font-semibold tracking-wide whitespace-nowrap',

  // Tabular Numerals / Code: Metrics, latency, financial values, dates
  tabular: 'font-mono tabular-nums tracking-tight'
} as const;

/**
 * Visual Language Principles & Class Presets
 */
export const NEXUS_VISUALS = {
  // Hairline borders
  hairline: 'border border-[#DCE6F0]',
  hairlineDark: 'border border-[rgba(220,230,240,0.12)]',
  hairlineTop: 'border-t border-[#DCE6F0]',
  hairlineBottom: 'border-b border-[#DCE6F0]',

  // Controlled Glass
  glassLight: 'bg-white/90 backdrop-blur-md border border-[#DCE6F0]',
  glassDark: 'bg-[#07142F]/85 backdrop-blur-md border border-[rgba(220,230,240,0.12)]',

  // Subtle Depth
  cardShadow: 'shadow-[0_2px_12px_rgba(7,20,47,0.04)]',
  cardShadowHover: 'hover:shadow-[0_8px_24px_rgba(7,20,47,0.08)] transition-all duration-300',
  dropdownShadow: 'shadow-[0_12px_32px_rgba(7,20,47,0.12)]',

  // Soft Ambient Blue Lighting (Non-neon)
  ambientGlow: 'relative before:absolute before:inset-0 before:bg-radial-gradient before:pointer-events-none',
  softBlueGlow: 'shadow-[0_0_32px_-8px_rgba(22,119,255,0.18)]'
} as const;
