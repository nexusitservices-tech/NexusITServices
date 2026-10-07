import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowUpRight, 
  ArrowDownRight,
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Bot,
  Activity,
  CreditCard,
  Briefcase,
  Server,
  Cpu,
  Wifi,
  Plus,
  ShieldCheck,
  FileText,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: 'Total Revenue (Q3 2026)', 
      value: 'AED 2.45M', 
      change: '+14.2%', 
      trend: 'up',
      icon: CreditCard,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    { 
      title: 'Active Projects in Sprint', 
      value: '24', 
      change: '+4 new', 
      trend: 'up',
      icon: Briefcase,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    },
    { 
      title: 'Open Support Tickets', 
      value: '5', 
      change: '-3 resolved', 
      trend: 'down',
      icon: Activity,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    { 
      title: 'SLA Breach Rate (Year-to-Date)', 
      value: '0.00%', 
      change: '100% compliant', 
      trend: 'up',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-100">
      
      {/* Top Welcome & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Client Portal & Project Telemetry</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              UAE Grid Live
            </span>
          </div>
          <p className="text-sm text-slate-400">Welcome back. Operational telemetry across Dubai HQ and sovereign cloud regions.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/app/finance">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 text-xs">
              <FileText className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> Generate Tax Invoice
            </Button>
          </Link>
          <Link to="/app/tickets">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-xs">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Ticket
            </Button>
          </Link>
        </div>
      </div>

      {/* Critical SLA Incident Banner if any urgent ticket active */}
      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(244,63,94,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-400">INCIDENT T-2049 IN PROGRESS</span>
              <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full">
                SLA Guarantee: 9m Remaining
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Server latency spike in AWS me-central-1 UAE cluster. Tier-3 DevOps team rerouting traffic.
            </p>
          </div>
        </div>

        <Link to="/app/tickets" className="shrink-0 self-end sm:self-center">
          <Button size="sm" className="bg-rose-600 hover:bg-rose-500 text-white text-xs">
            Open Command Console <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Top 4 Stat KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-[#090C10] border-white/10 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl border ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center text-xs font-mono font-semibold ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {stat.change}
                  {stat.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />}
                </div>
              </div>
              <div>
                {isLoading ? (
                  <Skeleton className="h-8 w-24 mb-2" />
                ) : (
                  <div className="text-2xl font-black font-mono text-white tracking-tight">{stat.value}</div>
                )}
                <div className="text-xs text-slate-400 mt-1">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Sovereign Cloud Telemetry Bar */}
      <Card className="bg-[#090C10] border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 bg-[#0D1117] border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              UAE In-Country Sovereign Infrastructure Telemetry
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              AWS me-central-1: 1.2ms
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Azure UAE North: 1.4ms</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">TDRA Compliant</span>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Primary Core Load</span>
                <span className="text-emerald-400 font-bold">28.4%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28.4%' }} />
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">32 vCPU Auto-Scaled Nodes</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Memory Allocation</span>
                <span className="text-cyan-400 font-bold">64.2 GB / 128 GB</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '50.1%' }} />
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">Redis In-Memory Cache Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">BGP Edge Latency</span>
                <span className="text-emerald-400 font-bold">&lt; 1.3 ms</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '15%' }} />
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">Direct Du & Etisalat Peering</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Container Uptime</span>
                <span className="text-emerald-400 font-bold">99.994%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.9%' }} />
              </div>
              <span className="text-[10px] text-slate-500 font-mono block">Zero unhandled crash loops</span>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Main Grid: Projects & Tickets vs AI Copilot & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Projects Telemetry */}
          <Card className="bg-[#090C10] border-white/10 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-white/5">
              <div className="space-y-1">
                <CardTitle className="text-white text-base">Active Projects & Sprint Telemetry</CardTitle>
                <CardDescription className="text-xs">Live milestone tracking across Dubai engineering teams.</CardDescription>
              </div>
              <Button variant="link" className="text-emerald-400 p-0 text-xs" asChild>
                <Link to="/app/projects">View all projects →</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-[11px] font-mono text-slate-400 uppercase bg-[#0D1117] border-b border-white/5">
                    <tr>
                      <th className="px-4 py-3 font-medium">Project Name</th>
                      <th className="px-4 py-3 font-medium">Client</th>
                      <th className="px-4 py-3 font-medium">SLA State</th>
                      <th className="px-4 py-3 font-medium text-right">Sprint Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: 'Sovereign Cloud Migration Phase 2', client: 'Acme Corp FZ-LLC', status: 'On Track', progress: 85, color: 'bg-emerald-500' },
                      { name: 'Custom ERP & Logistics Engine', client: 'Stark Industries DXB', status: 'Sprint Milestone 2', progress: 60, color: 'bg-cyan-500' },
                      { name: 'WhatsApp Bilingual AI Support Bot', client: 'Globex Middle East', status: 'Final Testing', progress: 95, color: 'bg-emerald-500' },
                      { name: 'DIFC Gateway Zero-Trust Security Audit', client: 'Wayne Capital DIFC', status: 'On Track', progress: 70, color: 'bg-emerald-500' }
                    ].map((project, i) => (
                      <tr key={i} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3.5 font-medium text-white">{project.name}</td>
                        <td className="px-4 py-3.5 text-slate-400">{project.client}</td>
                        <td className="px-4 py-3.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {project.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-2.5 font-mono">
                            <span className="text-slate-300 w-8 text-right">{project.progress}%</span>
                            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${project.color}`}
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Active Support Tickets Summary */}
          <Card className="bg-[#090C10] border-white/10 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-white/5">
              <div className="space-y-1">
                <CardTitle className="text-white text-base">Active Client Support Tickets</CardTitle>
                <CardDescription className="text-xs">Immediate incidents with guaranteed response timers.</CardDescription>
              </div>
              <Button variant="link" className="text-emerald-400 p-0 text-xs" asChild>
                <Link to="/app/tickets">Manage all tickets →</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { id: 'T-2049', subject: 'Server latency spike in AWS me-central-1 UAE cluster', client: 'Acme Corp', priority: 'Critical', status: 'In Progress', time: '4m ago' },
                { id: 'T-2048', subject: 'WhatsApp Cloud API webhook timeout on high inbound load', client: 'Globex Inc', priority: 'High', status: 'In Progress', time: '25m ago' },
                { id: 'T-2047', subject: 'Database backup verification failed on AUH secondary replica', client: 'Initech', priority: 'High', status: 'Open', time: '1h ago' }
              ].map((t, i) => (
                <Link 
                  key={i} 
                  to="/app/tickets"
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-xl border border-white/5 bg-[#0E131A] hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      t.priority === 'Critical' ? 'bg-rose-400 animate-pulse' : 'bg-amber-400'
                    }`} />
                    <div>
                      <div className="font-semibold text-white text-xs group-hover:text-emerald-300 transition-colors">
                        {t.subject}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        <span className="text-emerald-400">{t.id}</span> • {t.client} • {t.time}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      {t.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {t.status}
                    </span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar: AI Briefing & Activity */}
        <div className="space-y-6">
          
          {/* AI Copilot Briefing */}
          <Card className="bg-[#090C10] border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full pointer-events-none" />
            <CardHeader className="pb-3 border-b border-white/5">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Bot className="w-4 h-4" />
                <span className="font-mono text-xs font-bold uppercase">Nexus Autonomous Copilot</span>
              </div>
              <CardTitle className="text-white text-base">Executive Operations Briefing</CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
              <p>Good day. All 5 engineering disciplines operating within standard Dubai SLA thresholds.</p>
              
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-2 font-mono text-[11px]">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Invoice INV-2026-105 for Acme Corp is overdue (AED 13,125). Automated reminder ready.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Ticket T-2049 has active 15-minute SLA timer remaining: 9 minutes.</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2 font-mono">
                <Link to="/app/finance" className="w-full">
                  <Button size="sm" variant="outline" className="w-full text-xs border-white/10 text-slate-200 hover:bg-white/5">
                    View Invoices
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="bg-[#090C10] border-white/10 shadow-md">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-white text-base">Recent Incident & Audit Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                {[
                  { user: 'Sarah J. (NOC)', action: 'switched BGP fiber link on', target: '#T-2049', time: '4m ago' },
                  { user: 'Automated FTA', action: 'generated UAE tax invoice', target: 'INV-2026-107', time: '1h ago' },
                  { user: 'Ahmed M.', action: 'scaled ECS container cluster for', target: 'Globex Inc', time: '25m ago' },
                  { user: 'Security Bot', action: 'verified zero-trust handshake for', target: 'Wayne Capital', time: '2h ago' }
                ].map((act, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
                    <div className="text-slate-300">
                      <span className="font-bold text-white">{act.user}</span> {act.action}{' '}
                      <span className="font-mono text-emerald-400 font-semibold">{act.target}</span>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
