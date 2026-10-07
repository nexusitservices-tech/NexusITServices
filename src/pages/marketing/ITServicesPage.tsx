import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, Wrench, Shield, HardDrive, Wifi, Cloud, ShieldCheck, 
  CheckCircle2, ArrowRight, Activity, Cpu, Layers, Lock, RefreshCw, 
  AlertCircle, Check, ChevronDown, Monitor, Laptop, Printer, 
  Building2, Users, Network, Database, HelpCircle, Clock, 
  PhoneCall, Sparkles, TrendingUp, Settings, Eye, Zap, 
  Radio, CheckSquare, ShoppingBag, Utensils, Home, Stethoscope, 
  Truck, Briefcase, Rocket, ArrowUpRight, ShieldAlert, FileCode2
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { MorphBlock } from '@/components/ui/MorphBlock';
import { Typewriter } from '@/components/ui/Typewriter';

export default function ITServicesPage() {
  const { formatPrice } = useCurrency();
  const [activeArchLayer, setActiveArchLayer] = useState<'devices' | 'network' | 'cloud' | 'security' | 'systems'>('network');
  const [activeProblem, setActiveProblem] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTechCategory, setActiveTechCategory] = useState<string>('infrastructure');

  // Quick navigation anchor scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { label: 'Overview', id: 'services-overview' },
    { label: 'On-Site Support', id: 'onsite-support' },
    { label: 'Architecture', id: 'infrastructure-arch' },
    { label: 'Security', id: 'security-architecture' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Managed IT', id: 'managed-it' },
    { label: 'Support Models', id: 'support-models' },
    { label: 'Continuity', id: 'business-continuity' },
    { label: 'FAQ', id: 'faq-section' },
  ];

  // 02. Immediate Value Proposition Cards
  const valueCards = [
    {
      icon: Wrench,
      action: 'Fix',
      title: 'Diagnose & Resolve',
      desc: 'Diagnose and resolve technical problems before they disrupt your business operations.',
      accent: 'border-blue-200 bg-blue-50/50 text-blue-700'
    },
    {
      icon: Settings,
      action: 'Install',
      title: 'Deploy & Configure',
      desc: 'Deploy and configure the devices, systems, networks, and infrastructure your team needs.',
      accent: 'border-blue-200 bg-blue-50/50 text-[#0046AF]'
    },
    {
      icon: Shield,
      action: 'Protect',
      title: 'Strengthen & Defend',
      desc: 'Strengthen devices, networks, systems, and data with practical security controls.',
      accent: 'border-indigo-200 bg-indigo-50/50 text-indigo-700'
    },
    {
      icon: TrendingUp,
      action: 'Maintain',
      title: 'Monitor & Optimize',
      desc: 'Keep technology healthy through proactive maintenance, monitoring, updates, and ongoing support.',
      accent: 'border-amber-200 bg-amber-50/50 text-amber-700'
    }
  ];

  // 03. IT Services Overview (8 items)
  const servicesList = [
    {
      num: '01',
      title: 'IT Support & Helpdesk',
      icon: Monitor,
      desc: 'Rapid desktop, laptop, and user support to keep everyday staff workflow uninterrupted.',
      points: [
        'Technical troubleshooting',
        'Desktop and laptop support',
        'Software issues & license setup',
        'User support & onboarding',
        'Remote assistance (15-min SLA)',
        'On-site technical dispatch'
      ]
    },
    {
      num: '02',
      title: 'On-Site Technical Services',
      icon: Wrench,
      desc: 'Hands-on technicians deployed to your Dubai or UAE office for physical setup and troubleshooting.',
      points: [
        'Equipment installation',
        'Workstation setup & ergonomic cabling',
        'Printer and peripheral setup',
        'Hardware diagnostics & repair',
        'Office technology deployment',
        'Equipment relocation & moving',
        'Preventive scheduled maintenance'
      ]
    },
    {
      num: '03',
      title: 'Network Infrastructure',
      icon: Wifi,
      desc: 'High-speed, enterprise-grade wired and wireless connectivity engineered for zero dead zones.',
      points: [
        'LAN / Wi-Fi 6 & 7 design',
        'Router and switch configuration',
        'Network troubleshooting & QoS',
        'Enterprise access point tuning',
        'VLAN network segmentation',
        'Connectivity optimization (du/Etisalat)',
        'Structured infrastructure planning'
      ]
    },
    {
      num: '04',
      title: 'Hardware & Device Management',
      icon: Laptop,
      desc: 'Complete lifecycle control over your computer fleet, mobile endpoints, and office peripherals.',
      points: [
        'Computer diagnostics & repair',
        'Hardware upgrades (RAM/NVMe)',
        'Device configuration & MDM',
        'Hardware replacement sourcing',
        'Asset inventory tracking',
        'Device lifecycle management',
        'Fleet performance optimization'
      ]
    },
    {
      num: '05',
      title: 'Server & Infrastructure',
      icon: Server,
      desc: 'On-premises racks, hybrid clusters, and storage arrays engineered for maximum stability.',
      points: [
        'Server deployment & racking',
        'Server administration (Windows/Linux)',
        'Storage arrays (SAN/NAS)',
        'Local backup infrastructure',
        'User & Active Directory access',
        'Proactive infrastructure monitoring',
        'Firmware updates & system care'
      ]
    },
    {
      num: '06',
      title: 'Cloud Services',
      icon: Cloud,
      desc: 'Sovereign cloud migration and SaaS operations meeting UAE local data residency regulations.',
      points: [
        'Cloud setup & architecture',
        'Zero-downtime cloud migration',
        'AWS (me-central-1) & Azure North',
        'Business email (M365 / Google)',
        'Secure cloud storage & sync',
        'Geo-redundant cloud backup',
        'Cloud IAM access management'
      ]
    },
    {
      num: '07',
      title: 'Cybersecurity',
      icon: ShieldCheck,
      desc: 'Multi-layered protection shielding your endpoints, network perimeter, and business communications.',
      points: [
        'Security posture assessments',
        'Endpoint protection (EDR/XDR)',
        'Granular role-based access control',
        'Network firewall hardening',
        'Operating system hardening',
        'Incident recovery planning',
        '24/7 security threat monitoring'
      ]
    },
    {
      num: '08',
      title: 'Business Continuity & Backup',
      icon: HardDrive,
      desc: 'Bulletproof disaster recovery guaranteeing your business resumes operations without data loss.',
      points: [
        'Automated immutable data backup',
        'Continuous backup verification',
        'Disaster recovery runbooks (RPO < 5m)',
        'Business continuity protocols',
        'High-availability system redundancy',
        'Emergency failover execution'
      ]
    }
  ];

  // 04. On-site table
  const onsiteMatrix = [
    { action: 'Fix', items: ['Computers', 'Printers', 'Connectivity', 'Software Crashes'] },
    { action: 'Install', items: ['Workstations', 'Networks & Wi-Fi', 'Servers & Racks', 'Office Equipment'] },
    { action: 'Maintain', items: ['Devices & Laptops', 'Network Switches', 'Core Systems', 'IT Infrastructure'] },
    { action: 'Upgrade', items: ['RAM Memory', 'NVMe SSD Storage', 'Hardware Parts', 'Legacy Equipment'] }
  ];

  // 07. Powerful Tech Stack
  const techCategories: Record<string, { label: string; desc: string; items: string[] }> = {
    infrastructure: {
      label: 'Infrastructure',
      desc: 'Server hardware, power conditioning, and workstation equipment.',
      items: ['Dell PowerEdge', 'HP Enterprise (HPE)', 'Synology NAS', 'APC Smart-UPS', 'Supermicro', 'Lenovo ThinkSystem']
    },
    networking: {
      label: 'Networking',
      desc: 'Enterprise switches, gateways, and high-density Wi-Fi networks.',
      items: ['Cisco Meraki', 'Ubiquiti UniFi', 'Fortinet FortiGate', 'MikroTik RouterOS', 'Aruba Networks', 'TP-Link Omada']
    },
    cloud: {
      label: 'Cloud & SaaS',
      desc: 'UAE-compliant sovereign cloud, collaboration suites, and directory services.',
      items: ['AWS UAE (me-central-1)', 'Microsoft Azure UAE North', 'Microsoft 365', 'Google Workspace', 'Cloudflare CDN', 'Wasabi S3']
    },
    cybersecurity: {
      label: 'Cybersecurity',
      desc: 'Zero-trust network access, EDR endpoints, and multi-factor defense.',
      items: ['CrowdStrike Falcon', 'SentinelOne', 'Bitdefender GravityZone', 'Cloudflare Zero Trust', 'Duo MFA', 'Sophos Intercept X']
    },
    systems: {
      label: 'Business Systems',
      desc: 'Operating environments, identity directories, and client management.',
      items: ['Microsoft Entra ID (Azure AD)', 'Windows 11 Enterprise', 'Apple macOS & Jamf Pro', 'Linux (Ubuntu/RHEL)', 'Intune MDM']
    },
    monitoring: {
      label: 'Monitoring & Backup',
      desc: 'Proactive telemetry alerts and immutable disaster recovery tools.',
      items: ['Veeam Backup & Replication', 'Datto SaaS Protection', 'Zabbix Infrastructure', 'PRTG Network Monitor', 'Acronis Cyber Protect']
    }
  };

  // 09. Support Models
  const supportModels = [
    {
      name: 'On-Demand',
      tagline: 'Technical assistance when something goes wrong.',
      bestFor: 'Small businesses with occasional IT requirements.',
      sla: 'Standard dispatch (2–4 hours)',
      bullets: ['Pay-as-you-go hourly or fixed quote', 'Emergency remote assistance', 'Physical dispatch upon request', 'No monthly minimum commitments']
    },
    {
      name: 'Scheduled',
      tagline: 'Regular technician visits and planned maintenance.',
      bestFor: 'Businesses that need consistent hands-on support.',
      sla: 'Weekly or bi-weekly dedicated visits',
      bullets: ['Scheduled on-site technician hours', 'Preventive hardware health checks', 'Printer and network tune-ups', 'Staff desk support session']
    },
    {
      name: 'Dedicated',
      tagline: 'Reserved technical support capacity for your business.',
      bestFor: 'Growing businesses with frequent technical requirements.',
      sla: 'Priority SLA (15–30 min response)',
      bullets: ['Dedicated primary engineer assigned', 'Pre-allocated monthly hours', 'Direct WhatsApp & phone hotline', 'Quarterly hardware audit']
    },
    {
      name: 'Managed IT',
      tagline: 'NEXUS takes ongoing responsibility for your IT environment.',
      bestFor: 'Businesses that want an accountable long-term technology partner.',
      sla: '24/7/365 Monitoring & Instant SLA',
      featured: true,
      bullets: ['Unlimited remote & on-site support', 'Proactive 24/7 endpoint monitoring', 'Automated security patch management', 'Comprehensive cloud and backup governance', 'Quarterly vCIO strategic planning']
    }
  ];

  // 10. How We Work
  const workflowSteps = [
    { step: '01', title: 'Assess', desc: 'Understand your physical infrastructure, devices, users, systems, and current pain points through a non-invasive audit.' },
    { step: '02', title: 'Diagnose', desc: 'Identify the structural root cause of instability rather than simply treating recurring surface symptoms.' },
    { step: '03', title: 'Recommend', desc: 'Define the clear technical remedy, priorities, transparent milestone costs in AED, and an executable implementation roadmap.' },
    { step: '04', title: 'Deploy', desc: 'Install, configure, repair, migrate, secure, or upgrade the approved technology without business downtime.' },
    { step: '05', title: 'Support', desc: 'Continuously monitor, maintain, optimize, and improve your technology environment as your company scales.' }
  ];

  // 11. IT Problems We Solve
  const problemsWeSolve = [
    {
      quote: '“Our computers are slow.”',
      solution: 'Hardware & Performance Diagnostics',
      detail: 'We benchmark disk I/O, background daemon loads, RAM saturation, and OS bloat, upgrading storage to high-speed NVMe and replacing bottleneck components.'
    },
    {
      quote: '“The Wi-Fi keeps dropping.”',
      solution: 'Network Assessment & Troubleshooting',
      detail: 'We perform RF spectral analysis to detect interference, optimize channel overlap, deploy commercial-grade mesh APs, and prioritize critical video/VoIP bandwidth.'
    },
    {
      quote: '“We need to set up a new office.”',
      solution: 'Turnkey IT Infrastructure Deployment',
      detail: 'From Cat6A structured cabling and server rack installation to ISP coordination (du/Etisalat), printer setup, and workstation onboarding ready for day one.'
    },
    {
      quote: '“Our printer isn’t working.”',
      solution: 'Peripheral Troubleshooting & Print Server Setup',
      detail: 'Driver conflict resolution, network IP reservation, centralized print server spooling, and direct scanner-to-email/cloud folder configuration.'
    },
    {
      quote: '“We need better security.”',
      solution: 'Security Assessment & System Hardening',
      detail: 'Deployment of endpoint protection, zero-trust network policies, multi-factor authentication (MFA), email phishing filters, and UAE data residency compliance.'
    },
    {
      quote: '“Our systems aren’t connected.”',
      solution: 'Business System Integration',
      detail: 'Unifying fragmented local databases, cloud drives, ERP portals, and user directories into single sign-on (SSO) with synchronized access control.'
    },
    {
      quote: '“We need someone to manage our IT.”',
      solution: 'Fully Managed IT Services (MSP)',
      detail: 'Complete operational offloading: 24/7 monitoring, automated patching, unlimited helpdesk support for your employees, and proactive quarterly advisory.'
    },
    {
      quote: '“We’re moving offices.”',
      solution: 'IT Relocation & Safe Deployment',
      detail: 'Careful de-racking, secure transport, cable re-mapping, ISP cutover management, and full workstation re-testing before your staff arrives.'
    }
  ];

  // 13. Industries
  const industries = [
    { icon: ShoppingBag, title: 'Retail & E-Commerce', desc: 'High-availability POS systems, thermal receipt printers, guest Wi-Fi isolation, warehouse scanners, and payment gateway security.' },
    { icon: Utensils, title: 'Hospitality', desc: 'Guest-facing Wi-Fi portals, kitchen display systems, digital signage, PMS integration, and resilient 24/7 connectivity.' },
    { icon: Home, title: 'Real Estate', desc: 'High-performance workstations for 3D walkthroughs, CRM integration, secure cloud document repositories, and remote agent connectivity.' },
    { icon: Stethoscope, title: 'Healthcare & Clinics', desc: 'HIPAA and UAE health data compliance, biometric access control, medical device isolation, and secure patient record retention.' },
    { icon: Truck, title: 'Logistics & Trade', desc: 'Ruggedized barcode handhelds, warehouse Wi-Fi coverage, automated labeling systems, and multi-branch VPN connectivity.' },
    { icon: Briefcase, title: 'Professional Services', desc: 'Zero-trust legal and financial workstations, Microsoft 365 encryption, secure client portals, and rapid remote user support.' },
    { icon: Rocket, title: 'Startups & Scaleups', desc: 'Lean, cloud-native foundation without heavy server capex, automated employee laptop onboarding, and scalable SaaS posture.' }
  ];

  // 14. Comparison Table
  const comparisonRows = [
    { dimension: 'Focus', traditional: 'Fix problems when they break', nexus: 'Prevent problems before they disrupt' },
    { dimension: 'Perspective', traditional: 'Device-focused (repairing a box)', nexus: 'Business-focused (protecting operations)' },
    { dimension: 'Posture', traditional: 'Reactive support (waiting for your call)', nexus: 'Proactive monitoring (24/7 automated alerts)' },
    { dimension: 'Relationships', traditional: 'Multiple fragmented vendors', nexus: 'One accountable technology partner' },
    { dimension: 'Scope', traditional: 'Hardware repairs only', nexus: 'Hardware + Network + Cloud + Software' },
    { dimension: 'Mindset', traditional: 'IT viewed as an unpredictable cost', nexus: 'IT engineered as business infrastructure' },
    { dimension: 'Horizon', traditional: 'Short-term emergency patches', nexus: 'Long-term technology scaling & roadmap' }
  ];

  // 17. FAQ items
  const faqs = [
    {
      q: 'Do you provide on-site IT support?',
      a: 'Yes. NEXUS provides physical hands-on technical assistance across Dubai, Abu Dhabi, and the Northern Emirates. Our engineers can assist with hardware installation, troubleshooting, scheduled maintenance, upgrades, and complete office technology deployment.'
    },
    {
      q: 'Can you support small businesses without an internal IT team?',
      a: 'Yes. In fact, many of our clients rely on NEXUS as their complete outsourced IT department. We offer on-demand, scheduled, dedicated, or fully managed IT agreements tailored precisely to your operational scale and budget.'
    },
    {
      q: 'Do you repair computers and hardware?',
      a: 'NEXUS diagnoses and resolves all supported computer, laptop, and server hardware and software faults. For components requiring physical hardware replacement (such as replacement logic boards, screens, or memory), replacement and third-party part costs are quoted transparently case by case.'
    },
    {
      q: 'Can you set up a complete new office?',
      a: 'Absolutely. We handle turnkey office setups: structured Cat6A data cabling, server rack assembly, high-speed Wi-Fi 6 access points, ISP cutover (du/Etisalat), printer/scanner deployment, workstation assembly, Microsoft 365 licensing, and endpoint security.'
    },
    {
      q: 'Do you provide cybersecurity and compliance services?',
      a: 'Yes. NEXUS provides practical, multi-layered security services including vulnerability assessments, endpoint threat protection (EDR), role-based access control, firewall hardening, encrypted automated backups, and alignment with UAE TDRA & DESC data regulations.'
    },
    {
      q: 'Can you manage our IT on an ongoing monthly basis?',
      a: 'Yes. Our Managed IT Services (MSP) tier provides predictable, fixed-cost monthly agreements with 24/7 network monitoring, proactive maintenance, software patch governance, and unlimited helpdesk support for your employees.'
    }
  ];

  return (
    <div id="it-services-page" className="flex flex-col items-center w-full overflow-hidden bg-[#F8FAFC]">
      
      {/* Quick Navigation Sticky Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 lg:top-20 z-30 shadow-2xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 shrink-0">IT Index:</span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <Link to="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xs transition-all flex items-center gap-1.5 cursor-pointer">
                <span>Get IT Support</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 01. HERO — IT That Keeps Your Business Moving */}
      <section className="w-full relative pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Eyebrow, Headline, Supporting Copy, CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <MorphBlock>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>NEXUS IT SERVICES</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Reliable IT.<br />
                <span className="text-blue-600">Secure Infrastructure.</span><br />
                <span className="text-slate-600 font-semibold text-2xl sm:text-4xl">Zero Unnecessary Complexity.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                NEXUS provides practical IT services that keep your business technology reliable, secure, connected, and ready to scale — from everyday technical support and office equipment to networks, cloud infrastructure, cybersecurity, and ongoing IT management.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link to="/contact?service=it-services">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer">
                    <span>Get IT Support</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <button 
                  onClick={() => scrollToSection('services-overview')}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 px-6 py-3.5 rounded-full font-semibold transition-all text-sm cursor-pointer"
                >
                  Explore IT Services
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0046AF]" />
                  <span>15-Min Rapid SLA Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>On-Site Across UAE</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>TDRA & DESC Compliant</span>
                </div>
              </div>
            </MorphBlock>
          </div>

          {/* Right Column: Hero Visual — Interactive Office Technology Ecosystem */}
          <div className="lg:col-span-6">
            <MorphBlock delay={0.15}>
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-md relative overflow-hidden">
                {/* Header of Visual */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-blue-600 font-bold tracking-wider block">Connected Office Ecosystem</span>
                    <h3 className="text-base font-bold text-slate-900">Active Operational Topology</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0046AF] text-xs font-semibold border border-blue-100">
                    <span className="w-2 h-2 rounded-full bg-[#0046AF] animate-ping"></span>
                    <span>All Systems Operational</span>
                  </div>
                </div>

                {/* Interactive Node Flow: Users → Devices → Network → Cloud → Applications → Data */}
                <div className="space-y-3 relative">
                  {[
                    { node: 'Users', icon: Users, status: '150+ Authenticated', detail: 'Single Sign-On (Entra ID) & MFA active', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { node: 'Devices', icon: Laptop, status: 'Workstations & Peripherals', detail: 'Managed laptops, workstations, POS, printers', color: 'text-[#0046AF]', bg: 'bg-blue-50' },
                    { node: 'Network', icon: Wifi, status: 'Wi-Fi 6 & 10G LAN', detail: 'FortiGate isolated VLANs, zero packet drop', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { node: 'Cloud', icon: Cloud, status: 'AWS me-central-1 / Azure', detail: 'UAE sovereign residency, sub-2ms latency', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { node: 'Applications', icon: Layers, status: 'M365, ERP & Web Apps', detail: 'High-availability operational software stack', color: 'text-purple-600', bg: 'bg-purple-50' },
                    { node: 'Data', icon: Database, status: 'Encrypted & Redundant', detail: 'Continuous immutable backup (RPO < 5m)', color: 'text-[#0046AF]', bg: 'bg-blue-50' }
                  ].map((item, idx, arr) => (
                    <div key={idx} className="relative">
                      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/90 border border-slate-200/80 transition-all">
                        <div className="flex items-center gap-3.5">
                          <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 shadow-2xs`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900">{item.node}</span>
                              <span className="text-[10px] font-mono text-slate-400 font-medium">Stage 0{idx + 1}</span>
                            </div>
                            <p className="text-xs text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-block text-[11px] font-bold text-[#0046AF] bg-blue-100/60 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                            {item.status}
                          </span>
                        </div>
                      </div>
                      
                      {/* Connection Line Indicator */}
                      {idx < arr.length - 1 && (
                        <div className="h-2 w-0.5 bg-blue-300 mx-auto my-0.5"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Telemetry Banner */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>DXB Latency: &lt;1.4ms</span>
                  <span>Health: 100% OK</span>
                  <span>Backups: Synchronized</span>
                </div>
              </div>
            </MorphBlock>
          </div>

        </div>
      </section>

      {/* 02. IMMEDIATE VALUE PROPOSITION — Your Technology Should Work. We Make Sure It Does. */}
      <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Immediate Value Proposition</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Your Technology Should Work. We Make Sure It Does.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            A comprehensive operational approach designed so your business spends zero time fighting technology friction.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card, i) => (
            <MorphBlock key={i} delay={i * 0.08} enableHover>
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border ${card.accent}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{card.action}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                  <span>Proactive Standard</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0046AF]" />
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* 03. IT SERVICES OVERVIEW — Complete IT Support for the Modern Workplace */}
      <section id="services-overview" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Core Service Catalog</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Complete IT Support for the Modern Workplace
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              From responsive local desktop helpdesk to enterprise cloud infrastructure, each service is delivered with fixed SLA accountability.
            </p>
          </div>
          <Link to="/contact?service=it-services">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0">
              <span>Book Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </MorphBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((srv, idx) => (
            <MorphBlock key={idx} delay={idx * 0.05} enableHover>
              <div className="bg-white/10 backdrop-blur-lg p-6 sm:p-7 rounded-3xl border border-white/20 hover:border-white/40 hover:bg-white/[0.14] shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,70,175,0.14)] transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-[#0046AF] group-hover:text-white transition-colors">
                      <srv.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">{srv.num}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0046AF] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-5">
                    {srv.desc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {srv.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    to="/contact" 
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-[10px] font-mono text-slate-400">SLA Active</span>
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* 04. ON-SITE IT SUPPORT — When Technology Needs a Technician, We're There. */}
      <section id="onsite-support" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <MorphBlock>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0046AF] text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Physical Workplace Support</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  When Technology Needs a Technician, We're There.
                </h2>

                <p className="text-slate-600 text-base leading-relaxed">
                  From a new workstation that needs to be installed to an office network that suddenly stops working, NEXUS provides hands-on technical support where your business needs it.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Unlike remote-only call centers, our Dubai-based field team arrives with diagnostic kits, replacement cabling, switches, and backup gear ready to restore operations immediately.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link to="/contact?type=technician">
                    <button className="bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white px-7 py-3.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-sm cursor-pointer">
                      <span>Request a Technician</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                    <Clock className="w-4 h-4 text-[#0046AF]" />
                    <span>Downtown / DIFC / DSO Rapid Dispatch</span>
                  </div>
                </div>
              </MorphBlock>
            </div>

            {/* Matrix Table */}
            <div className="lg:col-span-7">
              <MorphBlock delay={0.1}>
                <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4">
                    <h3 className="text-base font-bold text-slate-900">On-Site Capability Matrix</h3>
                    <span className="text-xs font-mono text-slate-500">Dubai & UAE Wide</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {onsiteMatrix.map((col, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-3 pb-2 border-b border-slate-100">
                          {col.action}
                        </div>
                        <ul className="space-y-2">
                          {col.items.map((it, itIdx) => (
                            <li key={itIdx} className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                    <span>Includes preventive physical thermal checks & cable tidy</span>
                    <span className="font-bold text-blue-600">Certified Engineers</span>
                  </div>
                </div>
              </MorphBlock>
            </div>

          </div>
        </div>
      </section>

      {/* 05. INFRASTRUCTURE ARCHITECTURE — Build the Technology Foundation Your Business Depends On */}
      <section id="infrastructure-arch" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Systems Architecture</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Build the Technology Foundation Your Business Depends On.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Technology is an interdependent stack. Click any layer below to inspect how NEXUS structures reliability.
          </p>
        </MorphBlock>

        {/* Interactive Architecture Diagram */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          {/* Header tier */}
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>YOUR CORE BUSINESS OPERATIONS</span>
            </div>
          </div>

          {/* 3 Middle Pillars: Devices, Network, Cloud */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <button
              onClick={() => setActiveArchLayer('devices')}
              className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                activeArchLayer === 'devices' 
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Laptop className={`w-5 h-5 ${activeArchLayer === 'devices' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Layer 01</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">DEVICES</h4>
              <p className="text-xs text-slate-500 mt-1">Computers, laptops, printers, POS systems and workplace tech.</p>
            </button>

            <button
              onClick={() => setActiveArchLayer('network')}
              className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                activeArchLayer === 'network' 
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Wifi className={`w-5 h-5 ${activeArchLayer === 'network' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Layer 02</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">NETWORK</h4>
              <p className="text-xs text-slate-500 mt-1">Wi-Fi, LAN, routers, switches and business connectivity.</p>
            </button>

            <button
              onClick={() => setActiveArchLayer('cloud')}
              className={`p-5 rounded-2xl text-left transition-all border cursor-pointer ${
                activeArchLayer === 'cloud' 
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Cloud className={`w-5 h-5 ${activeArchLayer === 'cloud' ? 'text-blue-600' : 'text-slate-500'}`} />
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Layer 03</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">CLOUD</h4>
              <p className="text-xs text-slate-500 mt-1">Applications, storage, email, infrastructure and cloud backups.</p>
            </button>
          </div>

          {/* Sub-layers: Business Systems & Data & Security */}
          <div className="space-y-4 pt-2">
            <button
              onClick={() => setActiveArchLayer('systems')}
              className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
                activeArchLayer === 'systems' 
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className={`w-5 h-5 ${activeArchLayer === 'systems' ? 'text-blue-600' : 'text-slate-500'}`} />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">BUSINESS SYSTEMS</h4>
                  <p className="text-xs text-slate-500">The software and business platforms your team depends on daily.</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600">Inspect Layer</span>
            </button>

            <button
              onClick={() => setActiveArchLayer('security')}
              className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
                activeArchLayer === 'security' 
                  ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className={`w-5 h-5 ${activeArchLayer === 'security' ? 'text-blue-600' : 'text-slate-500'}`} />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">DATA & SECURITY</h4>
                  <p className="text-xs text-slate-500">Access control, zero-trust protection, monitoring and immutable recovery.</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600">Inspect Layer</span>
            </button>
          </div>

          {/* Selected Layer Detailed Inspector */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">Selected Architecture Layer</span>
              <h4 className="text-lg font-bold text-white capitalize mt-0.5">{activeArchLayer} Layer Specs</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {activeArchLayer === 'devices' && 'Provisioning, deployment, MDM policies, automated driver updates, and hardware lifecycle replacement.'}
                {activeArchLayer === 'network' && 'VLAN isolation for guests and IoT, dual-WAN failover, bandwidth shaping, and 99.99% local throughput.'}
                {activeArchLayer === 'cloud' && 'Sovereign UAE hosting on AWS me-central-1 and Azure UAE North, Microsoft 365 tenant governance, and zero-loss email sync.'}
                {activeArchLayer === 'systems' && 'ERP/CRM integration, single sign-on (SSO), Active Directory group policies, and license compliance.'}
                {activeArchLayer === 'security' && 'Immutable backups (3-2-1 rule), AES-256 encryption at rest, endpoint EDR, and annual penetration testing.'}
              </p>
            </div>
            <Link to="/contact">
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-full whitespace-nowrap transition-all cursor-pointer">
                Review Your Architecture
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 06. SECURE BY ARCHITECTURE — Secure. Isolated. Controlled. */}
      <section id="security-architecture" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-wider text-indigo-600 uppercase mb-2">Zero-Trust Framework</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Secure. Isolated. Controlled.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Secure, isolated, and controlled technology environments designed to protect systems, data, and critical business operations.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <MorphBlock delay={0.05}>
              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Access Control</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Give users and systems only the access they require. Enforce principle of least privilege, strict role separation, and conditional MFA across all endpoints.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-mono text-indigo-600 font-semibold">
                  Least-Privilege RBAC
                </div>
              </div>
            </MorphBlock>

            <MorphBlock delay={0.1}>
              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100">
                    <Network className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Network Segmentation</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Separate critical resources to reduce unnecessary exposure. Internal accounting, guest Wi-Fi, and IoT smart devices operate on quarantined VLANs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-mono text-blue-600 font-semibold">
                  Quarantined VLAN Isolation
                </div>
              </div>
            </MorphBlock>

            <MorphBlock delay={0.15}>
              <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0046AF] flex items-center justify-center mb-6 border border-blue-100">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Protection & Recovery</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Protect infrastructure and data while preparing for disruption. Next-generation EDR stops malware, while air-gapped backups guarantee rapid restore.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs font-mono text-[#0046AF] font-semibold">
                  Immutable Air-Gapped Snapshots
                </div>
              </div>
            </MorphBlock>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/contact?service=security">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-full font-bold shadow-sm transition-all text-sm cursor-pointer">
                Discuss IT Security
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 07. POWERFUL TECH STACK — Technology That Works Together */}
      <section id="tech-stack" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Enterprise Standards</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Technology That Works Together.
          </h2>
          <blockquote className="text-base sm:text-xl font-medium text-slate-800 italic bg-blue-50/60 border-l-4 border-blue-600 p-4 rounded-r-2xl max-w-2xl mx-auto">
            “We don't choose technology because it's popular. We choose it because it's right for the problem.”
          </blockquote>
        </MorphBlock>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {Object.entries(techCategories).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveTechCategory(key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTechCategory === key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Active Tech Stack Grid */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-2xs max-w-4xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">{techCategories[activeTechCategory].label}</h3>
            <p className="text-xs text-slate-500">{techCategories[activeTechCategory].desc}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {techCategories[activeTechCategory].items.map((tech, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-slate-800">{tech}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>Vendor-certified deployments across Cisco, Microsoft, Fortinet, AWS, and Veeam.</span>
            <Link to="/contact" className="text-blue-600 font-bold hover:underline flex items-center gap-1">
              <span>Request Stack Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 08. MANAGED IT SERVICES — Stop Waiting for IT Problems to Happen */}
      <section id="managed-it" className="w-full py-16 sm:py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MorphBlock className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Highest-Resilience Operating Model</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Stop Waiting for IT Problems to Happen.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Instead of calling a technician every time something breaks, businesses can have NEXUS continuously support, monitor, and safeguard their technology environment.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-12">
            {[
              { title: 'Monitor', icon: Activity, desc: 'Identify issues before they become major disruptions through 24/7 background telemetry.' },
              { title: 'Maintain', icon: RefreshCw, desc: 'Keep systems, devices, and infrastructure updated, patched, and performing at peak.' },
              { title: 'Protect', icon: ShieldCheck, desc: 'Apply appropriate security and access controls to prevent breaches and data loss.' },
              { title: 'Support', icon: PhoneCall, desc: 'Give employees immediate access to friendly technical assistance when they need it.' },
              { title: 'Improve', icon: TrendingUp, desc: 'Continuously identify opportunities to optimize and modernize the technology environment.' }
            ].map((pillar, i) => (
              <MorphBlock key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full flex flex-col justify-between hover:bg-white/10 transition-all">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/30">
                      <pillar.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/10 text-[11px] font-mono text-blue-400">
                    Continuous Active
                  </div>
                </div>
              </MorphBlock>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact?service=managed-it">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all text-sm cursor-pointer">
                Explore Managed IT
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 09. SUPPORT MODELS — IT Support That Fits Your Business */}
      <section id="support-models" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Engagement Flexibility</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            IT Support That Fits Your Business
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose the engagement model that matches your operational scale, budget, and internal capabilities.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportModels.map((m, idx) => (
            <MorphBlock key={idx} delay={idx * 0.08} enableHover>
              <div className={`p-6 sm:p-7 rounded-3xl border h-full flex flex-col justify-between transition-all ${
                m.featured 
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div>
                  {m.featured && (
                    <span className="inline-block px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider mb-3">
                      Most Recommended
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{m.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 min-h-[32px]">{m.tagline}</p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-0.5">Best For:</span>
                    <span className="text-xs font-semibold text-slate-700">{m.bestFor}</span>
                  </div>

                  <div className="mb-4 text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{m.sla}</span>
                  </div>

                  <ul className="space-y-2 pt-3 border-t border-slate-100">
                    {m.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link to="/contact">
                    <button className={`w-full py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      m.featured
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}>
                      Select {m.name}
                    </button>
                  </Link>
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* 10. HOW WE WORK — Structured 5-Step IT Process */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Our Operating Method</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              How We Work
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Adapted specifically for IT: a disciplined diagnostic progression that treats root causes, not just visible symptoms.
            </p>
          </MorphBlock>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6">
            {workflowSteps.map((st, i) => (
              <MorphBlock key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm mb-4 border border-blue-100">
                      {st.step}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{st.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] font-mono text-slate-400">
                    Phase 0{i + 1}
                  </div>
                </div>
              </MorphBlock>
            ))}
          </div>
        </div>
      </section>

      {/* 11. IT PROBLEMS WE SOLVE — Something Not Working? */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-amber-600 uppercase mb-2">Immediate User Recognition</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Something Not Working?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Tell us your symptom. We match it to the exact engineering solution without forcing you through complex technical taxonomies.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {problemsWeSolve.map((item, idx) => (
            <MorphBlock key={idx} delay={idx * 0.04}>
              <div 
                onClick={() => setActiveProblem(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  activeProblem === idx 
                    ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500/20' 
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-base font-bold text-slate-900">{item.quote}</h3>
                  <span className="text-xs font-bold text-blue-600 shrink-0">→ {item.solution}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{item.detail}</p>
                <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                  <span>Fast-Track Resolution</span>
                  <Link to="/contact" className="text-blue-600 hover:underline flex items-center gap-1">
                    <span>Resolve Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* 12. BUSINESS CONTINUITY — Keep Working When Technology Doesn't */}
      <section id="business-continuity" className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <MorphBlock>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Disaster Recovery & Resilience</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Keep Working When Technology Doesn't.
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Technology failures are inevitable. Extended downtime doesn't have to be.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed">
                  NEXUS protects UAE enterprises through systematic air-gapped snapshots, rapid automated failover, and comprehensive runbooks that allow operations to continue even during hardware casualties or internet blackouts.
                </p>

                <div className="pt-2">
                  <Link to="/contact?service=business-continuity">
                    <button className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-full font-bold shadow-sm transition-all flex items-center gap-2 text-sm cursor-pointer">
                      <span>Assess Your IT Resilience</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </MorphBlock>
            </div>

            <div className="lg:col-span-6">
              <MorphBlock delay={0.1}>
                <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-3xl border border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Core Resilience Capabilities</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'Backup strategies (3-2-1 rule)',
                      'Continuous backup verification',
                      'Redundant network infrastructure',
                      'Real-time uptime monitoring',
                      'Detailed system documentation',
                      'Disaster recovery planning',
                      'Business continuity runbooks'
                    ].map((cap, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0046AF] shrink-0" />
                        <span className="text-xs font-semibold text-slate-800">{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#0046AF] flex items-center justify-between">
                    <span>Guaranteed Recovery Point Objective: &lt; 5 Minutes</span>
                    <span className="font-mono font-bold">100% Data Integrity</span>
                  </div>
                </div>
              </MorphBlock>
            </div>

          </div>
        </div>
      </section>

      {/* 13. INDUSTRIES — IT Support Built Around Your Business */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Industry Specialization</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            IT Support Built Around Your Business
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Tailored device policies, connectivity architectures, and software integrations for UAE operating sectors.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {industries.map((ind, i) => (
            <MorphBlock key={i} delay={i * 0.05} enableHover>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                    <ind.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{ind.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                  <span>Sector Template</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* 14. NEXUS VS. TRADITIONAL IT SUPPORT — Model Comparison */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <MorphBlock className="text-center mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">The Partnership Difference</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              More Than a Break-Fix Technician
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              A model comparison showing how NEXUS elevates IT from a reactive cost center to a dependable growth driver.
            </p>
          </MorphBlock>

          <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-12 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider py-4 px-6">
              <div className="col-span-4">Strategic Dimension</div>
              <div className="col-span-4 text-slate-400">Traditional Approach</div>
              <div className="col-span-4 text-blue-400">NEXUS Approach</div>
            </div>

            <div className="divide-y divide-slate-100 bg-white">
              {comparisonRows.map((row, i) => (
                <div key={i} className="grid grid-cols-12 py-4 px-6 text-xs items-center hover:bg-slate-50 transition-colors">
                  <div className="col-span-4 font-bold text-slate-900">{row.dimension}</div>
                  <div className="col-span-4 text-slate-500">{row.traditional}</div>
                  <div className="col-span-4 font-semibold text-[#0046AF] flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#0046AF] shrink-0" />
                    <span>{row.nexus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 15. WHY NEXUS — One Technology Partner. More Connected IT. */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Strategic Strengths</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            One Technology Partner. More Connected IT.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Engineered specifically to solve the multi-vendor friction that holds back UAE businesses.
          </p>
        </MorphBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              title: 'Hands-On Support',
              desc: 'Technical assistance when your business needs someone physically there in your Dubai or UAE office.'
            },
            {
              title: 'Business-Aware IT',
              desc: 'Technology decisions aligned with how your business actually operates and generates revenue.'
            },
            {
              title: 'Security-Minded',
              desc: 'Security considerations built directly into all devices, networks, and sovereign cloud infrastructure.'
            },
            {
              title: 'Scalable Infrastructure',
              desc: 'Technology designed to evolve cleanly as your team expands across the GCC without major capex overhauls.'
            },
            {
              title: 'Connected Services',
              desc: 'IT connects naturally with NEXUS custom software, AI, automation, creative, and consulting teams.'
            }
          ].map((item, i) => (
            <MorphBlock key={i} delay={i * 0.08} enableHover>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold text-xs border border-blue-100">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-mono text-[#0046AF] font-bold">
                  Guaranteed Standard
                </div>
              </div>
            </MorphBlock>
          ))}
        </div>
      </section>

      {/* 16. CROSS-SELL / NEXUS ECOSYSTEM — Your IT Doesn't Exist in Isolation */}
      <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#F8FAFC] to-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MorphBlock className="mb-10">
            <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Cross-Capability Multiplier</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Your IT Doesn't Exist in Isolation.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              When your IT infrastructure needs more than maintenance, NEXUS can extend the solution — from custom software and automation to cloud architecture, AI, cybersecurity, and business technology consulting.
            </p>
          </MorphBlock>

          {/* Connected Hub Diagram */}
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm relative mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Left Column: Creative */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Discipline 04</span>
                <h4 className="text-base font-bold text-slate-900">Creative & Multimedia</h4>
                <p className="text-xs text-slate-500 mt-1">Branding, 4K production & digital assets</p>
              </div>

              {/* Center Column: Top AI, Center NEXUS IT, Bottom Consulting */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Discipline 03</span>
                  <h4 className="text-base font-bold text-slate-900">AI & Automation</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Bilingual chatbots & automated workflows</p>
                </div>

                <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-md ring-4 ring-blue-100">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-200 font-bold block">Foundation Core</span>
                  <h3 className="text-xl font-extrabold">NEXUS IT</h3>
                  <p className="text-xs text-blue-100 mt-1">Workplace Infrastructure & Support</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Discipline 05</span>
                  <h4 className="text-base font-bold text-slate-900">Consulting & Strategy</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fractional CTO & digital transformation</p>
                </div>
              </div>

              {/* Right Column: Software */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Discipline 02</span>
                <h4 className="text-base font-bold text-slate-900">Custom Software</h4>
                <p className="text-xs text-slate-500 mt-1">Bespoke ERP, web portals & mobile apps</p>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/services">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-3 rounded-full font-bold text-xs transition-all cursor-pointer">
                Explore The Entire NEXUS Ecosystem
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 17. FAQ — Frequently Asked Questions */}
      <section id="faq-section" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-slate-200">
        <MorphBlock className="text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2">Common Inquiries</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base">
            Clear, straightforward answers about how NEXUS delivers IT support and infrastructure management.
          </p>
        </MorphBlock>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === i ? 'rotate-180 text-blue-600' : ''}`} />
              </button>
              {activeFaq === i && (
                <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 18. FINAL CTA — Your Technology Shouldn't Slow Your Business Down */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <MorphBlock className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          {/* Microcopy Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-6 border border-blue-400/30">
            <span>On-site support • Infrastructure • Cloud • Security • Managed IT</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Your Technology Shouldn't Slow Your Business Down.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Let's build an IT environment that works reliably today — and is ready for tomorrow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact?service=it-support">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all text-sm cursor-pointer flex items-center gap-2">
                <span>Get IT Support</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to="/contact?type=specialist">
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold transition-all text-sm cursor-pointer">
                Talk to an IT Specialist
              </button>
            </Link>
          </div>
        </MorphBlock>
      </section>

    </div>
  );
}
