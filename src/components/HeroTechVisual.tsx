import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, Shield, Bot, Cpu, Activity, CheckCircle2, 
  Terminal, Globe, Sparkles, MessageCircle, ArrowUpRight, 
  Zap, RefreshCw, Lock, Radio, Database, ChevronRight, Play, Check,
  Binoculars
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="M6 20V4l12 16V4" />
  </svg>
);

interface CapabilityTab {
  id: 'cloud' | 'security' | 'ai' | 'sla';
  name: string;
  shortName: string;
  icon: React.ElementType;
  badge: string;
  title: string;
  subtitle: string;
  heroHighlight: string;
  metrics: { label: string; value: string; change?: string; color: string }[];
  tags: string[];
}

const TABS: CapabilityTab[] = [
  {
    id: 'cloud',
    name: 'Nexus Business OS',
    shortName: 'Nexus OS',
    icon: NIcon,
    badge: 'AWS & Azure UAE North Sovereign Clusters',
    title: 'Zero-Latency Sovereign Cloud & High-Performance Compute',
    subtitle: 'Strict in-country data residency complying with UAE Federal Decree-Law No. 45. Multi-zone active-active failover with sub-2ms latency to Dubai financial hubs.',
    heroHighlight: 'Sovereign UAE Hosting • DIFC & Downtown Low-Latency Interconnect',
    metrics: [
      { label: 'Latency to Downtown DXB', value: '1.4 ms', change: '-45% vs EU', color: 'text-blue-400' },
      { label: 'Uptime SLA Guarantee', value: '99.99%', change: 'Financial-grade', color: 'text-cyan-400' },
      { label: 'GCC Edge Nodes', value: '18 Active', change: 'Dubai • Abu Dhabi • Riyadh', color: 'text-sky-300' }
    ],
    tags: ['AWS me-central-1', 'Azure UAE North', 'Multi-AZ Failover', 'BGP Anycast', 'TDRA Certified']
  },
  {
    id: 'security',
    name: 'FlowOS',
    shortName: 'FlowOS',
    icon: Binoculars,
    badge: 'ISO 27001 & UAE TDRA Certified Protocol',
    title: 'Continuous Threat Defense & Sovereign Data Encryption',
    subtitle: 'Military-grade AES-256 GCM encryption at rest and in transit. Automated SIEM monitoring with 24/7 AI-driven behavioral threat detection and rapid isolation.',
    heroHighlight: '0 Security Breaches Since Inception • Automated Penetration Audits',
    metrics: [
      { label: 'Active Threat Mitigation', value: '100%', change: '0 Exploits Allowed', color: 'text-blue-400' },
      { label: 'Mean Time to Detect (MTTD)', value: '< 2.1s', change: 'Instant AI isolation', color: 'text-cyan-400' },
      { label: 'Compliance Index', value: '100 / 100', change: 'TDRA & ISO 27001', color: 'text-sky-300' }
    ],
    tags: ['Zero-Trust Architecture', 'AES-256 GCM', 'SOC 2 Type II', 'DDoS Shield', 'Automated Penetration']
  },
  {
    id: 'ai',
    name: 'Agentify Biz',
    shortName: 'Agentify Biz',
    icon: Bot,
    badge: 'Bilingual Arabic & English Neural Stack',
    title: 'Custom Enterprise LLMs & Omnichannel WhatsApp Cloud',
    subtitle: 'Purpose-engineered bilingual AI agents integrated with your ERP, CRM, and trade documentation. Automate client onboarding, KYC validation, and support with human precision.',
    heroHighlight: '45% Operational Overhead Saved • Native Arabic RTL Understanding',
    metrics: [
      { label: 'Avg AI Response Speed', value: '0.6s', change: '48 tokens/sec', color: 'text-blue-400' },
      { label: 'Arabic & English Accuracy', value: '99.2%', change: 'Domain-tuned', color: 'text-cyan-400' },
      { label: 'Admin Workload Cut', value: '45% Saved', change: 'Automated sync', color: 'text-sky-300' }
    ],
    tags: ['WhatsApp Cloud API', 'Arabic RTL NLP', 'ERP/CRM Connectors', 'Document OCR', 'Fine-Tuned Models']
  },
  {
    id: 'sla',
    name: 'Nexus AI',
    shortName: 'Nexus AI',
    icon: Cpu,
    badge: 'Radiance ONE Command Center • Dubai Creek',
    title: 'Under 15-Minute Guaranteed On-Site Dubai Dispatch',
    subtitle: 'Senior certified network engineers ready for instant emergency deployment across Downtown, DIFC, Business Bay, and Dubai Marina. Proactive 24/7 telemetry monitoring.',
    heroHighlight: 'Under 15-Minute Rapid On-Site Arrival • 24/7/365 NOC Monitoring',
    metrics: [
      { label: 'Downtown DXB Arrival', value: '< 15 Min', change: 'Guaranteed dispatch', color: 'text-blue-400' },
      { label: 'First-Call Resolution Rate', value: '94.8%', change: 'Tier-3 engineers', color: 'text-cyan-400' },
      { label: 'Monitoring Telemetry', value: '24/7/365', change: 'Sub-second polling', color: 'text-sky-300' }
    ],
    tags: ['Rigga Al Buteen Hub', 'Dedicated Account Lead', '24/7 NOC', 'Hardware Hot-Swap', 'Quarterly Audits']
  }
];

export default function HeroTechVisual() {
  const [activeTabId, setActiveTabId] = useState<'cloud' | 'security' | 'ai' | 'sla'>('cloud');
  const [isHovered, setIsHovered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [activeCluster, setActiveCluster] = useState<'dubai-primary' | 'abudhabi-secondary'>('dubai-primary');

  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];

  // Auto-rotate tabs gently unless the user is actively interacting
  useEffect(() => {
    if (isHovered || isScanning) return;
    const interval = setInterval(() => {
      setActiveTabId(prev => {
        const currentIndex = TABS.findIndex(t => t.id === prev);
        const nextIndex = (currentIndex + 1) % TABS.length;
        return TABS[nextIndex].id;
      });
    }, 7500);
    return () => clearInterval(interval);
  }, [isHovered, isScanning]);

  const handleTriggerAudit = () => {
    setIsScanning(true);
    setScanProgress(0);
    let p = 0;
    const timer = setInterval(() => {
      p += 10;
      setScanProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        setIsScanning(false);
      }
    }, 120);
  };

  return (
    <div 
      id="nexus-tech-showcase"
      className="w-full max-w-6xl mx-auto mt-8 mb-12 px-4 sm:px-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">What We Are Building</h2>
      </div>
      {/* 1. Pinterest-Inspired Floating Capsule Pill Segmented Control */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center p-1.5 rounded-full bg-[#0D1117]/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative max-w-full overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative z-10 flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer select-none ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="pinterestTabPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0046AF] via-blue-600 to-indigo-600 shadow-[0_0_24px_rgba(0,70,175,0.45)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span className="hidden md:inline">{tab.name}</span>
                  <span className="md:hidden">{tab.shortName}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Dark Obsidian Glassmorphic Showcase Canvas */}
      <div className="relative rounded-3xl bg-[#090C10] border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden">
        
        {/* Subtle Ambient Radial Glow in Top Corner */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#0046AF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Operational Telemetry Bar */}
        <div className="bg-[#0D1117] border-b border-white/5 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80"></span>
            </div>
            <div className="h-3 w-px bg-white/10"></div>
            <span className="text-slate-400 font-mono text-[11px] tracking-tight">
              nexus-dxb-prod01.uae.internal
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0046AF]"></span>
              </span>
              <span className="text-blue-300 font-medium font-mono">ALL SYSTEMS NOMINAL</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 font-mono hidden sm:inline">Dubai (GST +04:00)</span>
          </div>
        </div>

        {/* Animated Showcase Core */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10"
          >
            {/* Left Visual Interactive Simulation Card (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0E131A] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-inner relative overflow-hidden group">
              
              {/* Grid Texture Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

              {/* Header inside simulation card */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-[#0046AF]/20 border border-blue-500/30 text-blue-300 font-mono text-[10px] font-semibold tracking-wide uppercase">
                    Live Telemetry Demo
                  </span>
                  <span className="text-slate-400 text-xs font-medium">Interactive State</span>
                </div>

                {activeTab.id === 'cloud' && (
                  <div className="flex items-center gap-1.5 text-[11px] bg-black/40 p-1 rounded-lg border border-white/5">
                    <button
                      onClick={() => setActiveCluster('dubai-primary')}
                      className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                        activeCluster === 'dubai-primary' 
                          ? 'bg-[#0046AF] text-white font-bold shadow-xs' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      DXB Primary
                    </button>
                    <button
                      onClick={() => setActiveCluster('abudhabi-secondary')}
                      className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                        activeCluster === 'abudhabi-secondary' 
                          ? 'bg-[#0046AF] text-white font-bold shadow-xs' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      AUH North
                    </button>
                  </div>
                )}

                {activeTab.id === 'security' && (
                  <button
                    onClick={handleTriggerAudit}
                    disabled={isScanning}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0046AF]/25 hover:bg-[#0046AF]/40 text-blue-300 border border-blue-500/40 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin text-blue-300' : ''}`} />
                    <span>{isScanning ? 'Scanning...' : 'Run Audit'}</span>
                  </button>
                )}
              </div>

              {/* Dynamic Interactive Interactive Display Per Tab */}
              <div className="relative z-10">
                {activeTab.id === 'cloud' && (
                  <div className="space-y-4">
                    {/* Live Ping & Latency Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { dest: 'Downtown DXB', ping: activeCluster === 'dubai-primary' ? '1.2 ms' : '2.1 ms', status: 'Optimal' },
                        { dest: 'DIFC Gateway', ping: activeCluster === 'dubai-primary' ? '1.5 ms' : '2.4 ms', status: 'Direct Fiber' },
                        { dest: 'Abu Dhabi Hub', ping: activeCluster === 'dubai-primary' ? '3.8 ms' : '1.1 ms', status: 'Encrypted' },
                        { dest: 'Riyadh KSA', ping: '11.4 ms', status: 'GCC Interconnect' },
                      ].map((node, i) => (
                        <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-colors">
                          <span className="text-[10px] text-slate-400 block mb-1 font-mono uppercase">{node.dest}</span>
                          <span className="text-sm font-bold text-white font-mono block">{node.ping}</span>
                          <span className="text-[9px] text-blue-300 font-semibold block mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0046AF] inline-block"></span>
                            {node.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Live Throughput Waveform */}
                    <div className="p-4 rounded-xl bg-black/50 border border-white/5">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400 font-mono">BGP Traffic Route • Active Node: {activeCluster === 'dubai-primary' ? 'DXB-EDGE-01' : 'AUH-EDGE-02'}</span>
                        <span className="text-blue-300 font-bold font-mono">10.4 Gbps / 40 Gbps</span>
                      </div>
                      <div className="h-12 w-full flex items-end gap-1 overflow-hidden pt-2">
                        {[45, 60, 55, 75, 90, 65, 80, 70, 85, 95, 70, 60, 75, 85, 90, 65, 80, 95, 70, 85, 90, 60, 75, 90, 85, 70, 95].map((val, idx) => (
                          <div 
                            key={idx} 
                            style={{ height: `${val}%` }} 
                            className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0046AF]/40 to-blue-400 hover:to-cyan-300 transition-all duration-300"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.id === 'security' && (
                  <div className="space-y-4">
                    {/* Security Scan Banner */}
                    <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold text-white">Continuous Threat Assessment</span>
                        </div>
                        <span className="font-mono text-blue-300 text-[11px] font-bold">
                          {isScanning ? `Inspecting ${scanProgress}%` : 'Audit Passed: 0 Vulnerabilities'}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-[#0046AF] to-cyan-400 h-2 rounded-full"
                          style={{ width: `${scanProgress}%` }}
                          transition={{ ease: "easeInOut" }}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono text-[11px]">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                          <span className="text-slate-400 text-[10px] block">TDRA Law 45</span>
                          <span className="text-blue-300 font-bold">Compliant</span>
                        </div>
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                          <span className="text-slate-400 text-[10px] block">ISO 27001</span>
                          <span className="text-blue-300 font-bold">Verified</span>
                        </div>
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                          <span className="text-slate-400 text-[10px] block">Firewall State</span>
                          <span className="text-cyan-400 font-bold">Strict Drop</span>
                        </div>
                      </div>
                    </div>

                    {/* Threat Log Output */}
                    <div className="bg-black/60 rounded-xl p-3 font-mono text-[11px] border border-white/5 space-y-1 text-slate-300">
                      <p className="text-blue-300">✓ [TLS 1.3] AES-256-GCM Handshake Verified for Dubai Core</p>
                      <p className="text-slate-400">› [SIEM] Zero anomaly signatures across 1,480,210 requests</p>
                      <p className="text-cyan-400">› [WAF] Geo-blocking active for unauthorized non-GCC prefixes</p>
                    </div>
                  </div>
                )}

                {activeTab.id === 'ai' && (
                  <div className="space-y-4">
                    {/* Bilingual AI Dialogue Simulator */}
                    <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-2 text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-blue-400" />
                          <span>Nexus Bilingual Agent Core (Arabic & English)</span>
                        </span>
                        <span className="text-blue-300 text-[10px]">Active Webhook</span>
                      </div>

                      {/* Prompt 1 */}
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                        <span className="text-slate-500 text-[10px] block font-sans">Corporate Inbound WhatsApp Query:</span>
                        <p className="text-slate-200 mt-0.5">"نحتاج لنقل خوادمنا إلى سحابة الإمارات وضمان استمرارية الأعمال 99.99%"</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">("We need to migrate our servers to UAE Cloud with 99.99% continuity.")</p>
                      </div>

                      {/* AI Agent Automated Output */}
                      <div className="bg-[#0046AF]/20 p-2.5 rounded-lg border border-blue-500/30 text-blue-200">
                        <div className="flex items-center justify-between text-[10px] text-blue-300 mb-1 font-sans">
                          <span>Nexus AI Orchestrator • Auto-Generated in 0.4s</span>
                          <span>Token Speed: 52 t/s</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-200">
                          "تم توجيه طلبكم إلى مهندس الحلول السحابية في فرع دبي. سنقوم بإعداد خطة ترحيل متوافقة 100% مع لوائح TDRA خلال ساعتين عمل."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.id === 'sla' && (
                  <div className="space-y-4">
                    {/* Dubai Dispatch Map & Response Matrix */}
                    <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                          <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                          <span>Dubai Rapid Deployment Fleet</span>
                        </span>
                        <span className="text-[11px] font-mono text-blue-300 bg-[#0046AF]/20 px-2 py-0.5 rounded-full border border-blue-500/30">
                          SLA Guarantee: &lt; 15 Mins
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                        {[
                          { zone: 'Downtown Dubai', eta: '6 Mins', status: 'Direct On-Site' },
                          { zone: 'DIFC Gate Precinct', eta: '9 Mins', status: 'Immediate' },
                          { zone: 'Business Bay', eta: '11 Mins', status: 'Immediate' },
                          { zone: 'Dubai Internet City', eta: '14 Mins', status: 'Mobile Unit' },
                          { zone: 'Dubai Marina & JLT', eta: '15 Mins', status: 'Mobile Unit' },
                          { zone: 'Silicon Oasis', eta: '18 Mins', status: 'Regional NOC' },
                        ].map((item, idx) => (
                          <div key={idx} className="p-2 rounded-lg bg-black/40 border border-white/5 flex flex-col justify-between">
                            <span className="text-slate-400 text-[10px] truncate">{item.zone}</span>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-white font-bold">{item.eta}</span>
                              <span className="text-[9px] text-blue-300">{item.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom tag pill strip */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-white/5 relative z-10">
                {activeTab.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Information & Specification Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Micro Category Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0046AF]/20 border border-blue-500/30 text-blue-300 text-[11px] font-semibold mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeTab.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
                  {activeTab.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {activeTab.subtitle}
                </p>

                {/* Key Metric Blocks */}
                <div className="space-y-2.5">
                  {activeTab.metrics.map((metric, i) => (
                    <div 
                      key={i}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#0E131A] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div>
                        <span className="text-xs text-slate-400 font-medium block">{metric.label}</span>
                        {metric.change && (
                          <span className="text-[10px] text-slate-500 font-mono block mt-0.5">{metric.change}</span>
                        )}
                      </div>
                      <span className={`text-base font-bold font-mono ${metric.color}`}>
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link 
                  to="/contact" 
                  className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,70,175,0.4)] transition-all"
                >
                  <span>Book In-Person Dubai Meeting</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a 
                  href="#estimator" 
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Cost Estimator (AED)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
