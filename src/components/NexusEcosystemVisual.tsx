import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Network, Cloud, Shield, Code, Cpu, 
  Workflow, BarChart3, Megaphone, Sparkles, Activity
} from 'lucide-react';

interface EcosystemNode {
  id: string;
  name: string;
  shortName: string;
  category: string;
  metric: string;
  icon: React.ElementType;
  x: number; // percentage in 0-100 space
  y: number; // percentage in 0-100 space
  connections: string[]; // IDs of other connected nodes
}

const NODES: EcosystemNode[] = [
  {
    id: 'infra',
    name: 'IT Infrastructure',
    shortName: 'IT Infra',
    category: 'FOUNDATION',
    metric: '99.98% High Availability',
    icon: Server,
    x: 18,
    y: 72,
    connections: ['networking', 'cloud', 'cybersecurity']
  },
  {
    id: 'networking',
    name: 'Networking',
    shortName: 'Network',
    category: 'CONNECTIVITY',
    metric: 'Low-Latency Mesh',
    icon: Network,
    x: 28,
    y: 88,
    connections: ['infra', 'cloud', 'analytics']
  },
  {
    id: 'cloud',
    name: 'Cloud',
    shortName: 'Cloud',
    category: 'RESIDENCY',
    metric: 'UAE Sovereign Multi-Region',
    icon: Cloud,
    x: 12,
    y: 44,
    connections: ['infra', 'cybersecurity', 'software']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    shortName: 'Security',
    category: 'DEFENSE',
    metric: 'Zero-Trust Perimeter',
    icon: Shield,
    x: 22,
    y: 18,
    connections: ['cloud', 'software', 'infra']
  },
  {
    id: 'software',
    name: 'Software',
    shortName: 'Software',
    category: 'ENGINEERING',
    metric: 'Bespoke Enterprise Apps',
    icon: Code,
    x: 74,
    y: 16,
    connections: ['cybersecurity', 'ai', 'digital']
  },
  {
    id: 'ai',
    name: 'AI',
    shortName: 'AI Intelligence',
    category: 'INTELLIGENCE',
    metric: 'Bilingual LLM Pipelines',
    icon: Cpu,
    x: 88,
    y: 40,
    connections: ['software', 'automation', 'analytics']
  },
  {
    id: 'automation',
    name: 'Automation',
    shortName: 'Automation',
    category: 'WORKFLOWS',
    metric: 'Zero-Touch Business Ops',
    icon: Workflow,
    x: 82,
    y: 72,
    connections: ['ai', 'analytics', 'digital']
  },
  {
    id: 'analytics',
    name: 'Analytics',
    shortName: 'Analytics',
    category: 'TELEMETRY',
    metric: 'Real-Time Insights',
    icon: BarChart3,
    x: 52,
    y: 90,
    connections: ['networking', 'automation', 'digital']
  },
  {
    id: 'digital',
    name: 'Digital Marketing',
    shortName: 'Marketing',
    category: 'GROWTH',
    metric: 'Omnichannel Conversion',
    icon: Megaphone,
    x: 70,
    y: 92,
    connections: ['automation', 'software', 'analytics']
  }
];

export const NexusEcosystemVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth mouse parallax effect for depth
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({
      x: xRatio * 16, // max 16px parallax
      y: yRatio * 16
    });
  };

  const activeNode = NODES.find(n => n.id === activeNodeId) || null;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMouseOffset({ x: 0, y: 0 });
        setActiveNodeId(null);
      }}
      className="relative w-full aspect-square max-w-[540px] lg:max-w-[590px] mx-auto select-none overflow-visible"
      aria-label="NEXUS Living Business Technology Ecosystem Diagram"
    >
      {/* 1. Atmospheric Ambient Blue Lighting Layer */}
      <div 
        className="absolute inset-0 rounded-full bg-radial from-[#1677FF]/14 via-[#39B9FF]/6 to-transparent blur-3xl pointer-events-none transform -translate-z-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px, 0)`
        }}
      />

      {/* 2. Architectural Coordinate Grid Lines & Concentric Tech Orbits */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle line grid pattern */}
          <pattern id="nexus-tech-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#DCE6F0" strokeWidth="0.2" opacity="0.6" />
          </pattern>

          {/* Linear gradient for flowing data lines */}
          <linearGradient id="nexus-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1677FF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#39B9FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1677FF" stopOpacity="0.4" />
          </linearGradient>

          <filter id="nexus-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Grid Backdrop */}
        <rect width="100" height="100" fill="url(#nexus-tech-grid)" opacity="0.35" />

        {/* Concentric Architectural Rings */}
        <circle cx="50" cy="50" r="16" fill="none" stroke="#DCE6F0" strokeWidth="0.3" strokeDasharray="1 1.5" opacity="0.8" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#DCE6F0" strokeWidth="0.3" opacity="0.5" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#DCE6F0" strokeWidth="0.25" strokeDasharray="1.5 2" opacity="0.4" />

        {/* Coordinate Axis Hairlines */}
        <line x1="50" y1="4" x2="50" y2="96" stroke="#DCE6F0" strokeWidth="0.2" strokeDasharray="2 3" opacity="0.5" />
        <line x1="4" y1="50" x2="96" y2="50" stroke="#DCE6F0" strokeWidth="0.2" strokeDasharray="2 3" opacity="0.5" />

        {/* Connected Data Pathways between Nodes */}
        {NODES.map((node) => (
          <g key={`pathways-${node.id}`}>
            {/* Primary Radial Conduit: Center (50, 50) to Node */}
            <path
              d={`M 50 50 Q ${(50 + node.x) / 2} ${(50 + node.y) / 2} ${node.x} ${node.y}`}
              fill="none"
              stroke={activeNodeId === node.id ? '#1677FF' : '#DCE6F0'}
              strokeWidth={activeNodeId === node.id ? '0.7' : '0.35'}
              strokeDasharray={activeNodeId === node.id ? 'none' : '1.5 1.5'}
              className="transition-all duration-300"
            />

            {/* Dynamic Animated Pulse along Active/All Conduits */}
            <path
              d={`M 50 50 Q ${(50 + node.x) / 2} ${(50 + node.y) / 2} ${node.x} ${node.y}`}
              fill="none"
              stroke="#39B9FF"
              strokeWidth={activeNodeId === node.id ? '0.9' : '0.4'}
              strokeDasharray="3 9"
              className="nexus-conduit-flow"
              opacity={activeNodeId === node.id ? '1' : '0.6'}
            />
          </g>
        ))}

        {/* Peripheral Inter-Node Conduits (Mesh Architecture) */}
        <path d="M 18 72 L 28 88 L 52 90 L 70 92 L 82 72 L 88 40 L 74 16 L 22 18 L 12 44 Z" fill="none" stroke="#1677FF" strokeWidth="0.2" opacity="0.2" />
        <path d="M 22 18 L 74 16" fill="none" stroke="#1677FF" strokeWidth="0.3" strokeDasharray="1 2" opacity="0.3" />
        <path d="M 12 44 L 88 40" fill="none" stroke="#1677FF" strokeWidth="0.25" strokeDasharray="1 3" opacity="0.25" />
      </svg>

      {/* 3. PARALLAX CONTAINER FOR FOREGROUND NODES */}
      <div 
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
        }}
      >
        {/* ========================================================
            CENTRAL NEXUS CORE NODE
           ======================================================== */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ width: '84px', height: '84px' }}
        >
          {/* Subtle Outer Pulsing Wave */}
          <div className="absolute -inset-3 rounded-full border border-[#1677FF]/30 animate-ping opacity-25 pointer-events-none" />
          <div className="absolute -inset-1.5 rounded-full border border-[#39B9FF]/40 pointer-events-none" />

          {/* Central Core Surface */}
          <div className="relative w-full h-full rounded-full bg-[#07142F] text-white border-2 border-[#1677FF] shadow-[0_0_24px_rgba(22,119,255,0.4)] flex flex-col items-center justify-center p-2 group transition-transform duration-300 hover:scale-105">
            {/* Ambient inner soft blue glow */}
            <div className="absolute inset-0 rounded-full bg-radial from-[#1677FF]/30 to-transparent pointer-events-none" />
            
            {/* NEXUS Monogram Brand Mark */}
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39B9FF] animate-pulse" />
              <span className="font-black text-sm tracking-widest text-white leading-none">
                NEXUS
              </span>
            </div>
            <span className="text-[8px] font-mono tracking-wider text-[#39B9FF] mt-1 font-semibold uppercase">
              CORE ENGINE
            </span>
            <div className="text-[7px] text-slate-300 font-mono mt-0.5">
              ACTIVE
            </div>
          </div>
        </div>

        {/* ========================================================
            PERIPHERAL ECOSYSTEM DOMAIN NODES
           ======================================================== */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isActive = activeNodeId === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`
              }}
              onMouseEnter={() => setActiveNodeId(node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group"
            >
              {/* Outer Glow on Hover */}
              <div 
                className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                  isActive 
                    ? 'bg-[#1677FF]/25 blur-md opacity-100' 
                    : 'bg-transparent opacity-0 group-hover:opacity-60 group-hover:bg-[#1677FF]/15'
                }`} 
              />

              {/* Node Architectural Pill / Tag */}
              <div 
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#07142F] text-white border-[#1677FF] shadow-[0_4px_16px_rgba(22,119,255,0.3)] scale-105' 
                    : 'bg-white/95 text-[#07142F] border-[#DCE6F0] shadow-2xs hover:border-[#1677FF] hover:bg-white'
                }`}
              >
                {/* Technical Icon Frame */}
                <div 
                  className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                    isActive 
                      ? 'bg-[#1677FF] border-[#39B9FF] text-white' 
                      : 'bg-[#F5F8FC] border-[#DCE6F0] text-[#1677FF] group-hover:bg-[#1677FF] group-hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Node Label Text */}
                <div className="flex flex-col text-left leading-none">
                  <span className={`text-[11px] font-bold tracking-tight whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-[#07142F]'
                  }`}>
                    {node.shortName}
                  </span>
                  <span className={`text-[8px] font-mono uppercase tracking-wider mt-0.5 whitespace-nowrap ${
                    isActive ? 'text-[#39B9FF]' : 'text-[#66748B]'
                  }`}>
                    {node.category}
                  </span>
                </div>

                {/* Active Live Status Dot */}
                <span 
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isActive ? 'bg-[#39B9FF] animate-pulse' : 'bg-[#1677FF]/40 group-hover:bg-[#1677FF]'
                  }`} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Active Node Detail Overlay Badge (Context Window) */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] z-30 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeNode ? (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="px-4 py-2.5 rounded-lg bg-[#07142F]/95 backdrop-blur-md border border-[#1677FF]/40 text-white shadow-[0_8px_24px_rgba(7,20,47,0.25)] flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#39B9FF] animate-ping" />
                <div>
                  <span className="font-bold text-white tracking-wide">{activeNode.name}</span>
                  <span className="text-[#94A3B8] text-[11px] ml-2">· {activeNode.category}</span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-[#39B9FF] font-semibold whitespace-nowrap">
                {activeNode.metric}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="default-telemetry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-3.5 py-1.5 rounded-md bg-white/90 backdrop-blur-sm border border-[#DCE6F0] text-[#66748B] text-[11px] flex items-center justify-between gap-2 shadow-2xs"
            >
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#1677FF]" />
                <span className="font-medium">Interactive Ecosystem Map</span>
              </span>
              <span className="font-mono text-[10px] text-[#1677FF] font-semibold">
                9 Integrated Domains Active
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Embedded CSS for SVG Conduit Flow Animation */}
      <style>{`
        @keyframes nexusConduitDash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .nexus-conduit-flow {
          animation: nexusConduitDash 2.4s linear infinite;
        }
      `}</style>
    </div>
  );
};
