import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  HelpCircle,
  Menu,
  Activity,
  ChevronDown,
  X,
  Send,
  Lock,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { 
  getPortalSession, 
  isPortalApproved, 
  clearPortalSession, 
  loginAsAdmin, 
  PortalSession 
} from '@/lib/portalAuth';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [portalApproved, setPortalApproved] = useState(isPortalApproved());
  const [currentSession, setCurrentSession] = useState<PortalSession | null>(getPortalSession());
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setPortalApproved(isPortalApproved());
      setCurrentSession(getPortalSession());
    };
    checkAuth();
    window.addEventListener('portal-auth-changed', checkAuth);
    return () => window.removeEventListener('portal-auth-changed', checkAuth);
  }, [location.pathname]);

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { name: 'CRM', href: '/app/crm', icon: Users },
    { name: 'Projects', href: '/app/projects', icon: Briefcase },
    { name: 'Support Tickets', href: '/app/tickets', icon: Activity },
    { name: 'Finance', href: '/app/finance', icon: CreditCard },
    { name: 'Documents', href: '/app/documents', icon: FileText },
    { name: 'WhatsApp Gateway', href: '/app/whatsapp', icon: MessageSquare },
  ];

  const handleLogout = () => {
    clearPortalSession();
    setPortalApproved(false);
    navigate('/portal?tab=request');
  };

  const isActive = (path: string) => {
    if (path === '/app' && location.pathname === '/app') return true;
    if (path !== '/app' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/10 bg-[#090C10]">
        <Link to="/app" className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#0046AF] rounded-xl flex items-center justify-center shadow-xs">
            <span className="text-[10px] font-black text-white font-mono leading-none">NX</span>
          </div>
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight text-sm">Nexus Portal</span>
              <span className="text-[10px] text-blue-400 font-mono">UAE Enterprise OS</span>
            </div>
          )}
        </Link>
        {sidebarOpen && !mobileMenuOpen && (
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}
        {mobileMenuOpen && (
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="md:hidden text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close sidebar menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto bg-[#090C10] flex flex-col py-5 px-3 gap-1">
        <div className="mb-3 px-3">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {(sidebarOpen || mobileMenuOpen) ? 'Navigation' : '•••'}
          </div>
        </div>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer",
              isActive(item.href)
                ? "bg-[#0046AF]/20 text-blue-300 border border-blue-500/30 shadow-2xs font-bold"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-100",
              (!sidebarOpen && !mobileMenuOpen) && "justify-center px-0"
            )}
            title={(!sidebarOpen && !mobileMenuOpen) ? item.name : undefined}
          >
            <item.icon className={cn("w-4 h-4 shrink-0", (sidebarOpen || mobileMenuOpen) ? "mr-3" : "mr-0", isActive(item.href) ? "text-blue-400" : "text-slate-400")} />
            {(sidebarOpen || mobileMenuOpen) && item.name}
          </Link>
        ))}

        <div className="mt-6 mb-2 px-3">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            {(sidebarOpen || mobileMenuOpen) ? 'Quick Access' : '•••'}
          </div>
        </div>

        <Link
          to="/"
          className={cn(
            "flex items-center rounded-xl px-3.5 py-2 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors cursor-pointer",
            (!sidebarOpen && !mobileMenuOpen) && "justify-center px-0"
          )}
          title={(!sidebarOpen && !mobileMenuOpen) ? 'Return to Public Site' : undefined}
        >
          <Activity className={cn("w-4 h-4 shrink-0 text-blue-400", (sidebarOpen || mobileMenuOpen) ? "mr-3" : "mr-0")} />
          {(sidebarOpen || mobileMenuOpen) && 'Public Website'}
        </Link>
      </div>

      <div className="p-3 bg-[#090C10] border-t border-white/10 flex flex-col gap-1">
        <Link
          to="/app/settings"
          className={cn(
            "flex items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer",
            (!sidebarOpen && !mobileMenuOpen) && "justify-center px-0"
          )}
        >
          <Settings className={cn("w-4 h-4 shrink-0", (sidebarOpen || mobileMenuOpen) ? "mr-3" : "mr-0")} />
          {(sidebarOpen || mobileMenuOpen) && 'Settings'}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center rounded-xl px-3 py-2 text-xs font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer text-left w-full",
            (!sidebarOpen && !mobileMenuOpen) && "justify-center px-0"
          )}
        >
          <Lock className={cn("w-4 h-4 shrink-0", (sidebarOpen || mobileMenuOpen) ? "mr-3" : "mr-0")} />
          {(sidebarOpen || mobileMenuOpen) && 'Lock & Log out'}
        </button>
      </div>
    </>
  );

  // If user does not have an approved portal session, lock access and require signup request
  if (!portalApproved) {
    return (
      <div className="min-h-screen bg-[#070A0E] text-white flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-lg bg-[#090C10] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0046AF]/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider inline-block">
              Client Portal Access Locked
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Enterprise Clearance Required
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Access to the Nexus Client Portal & Telemetry OS is strictly gated. Each user must submit an Account Signup Request which is reviewed by our administration before access is granted.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate('/portal?tab=request')}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Fill Account Signup Request Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/portal?tab=status')}
              className="w-full py-3 px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Check Request Status or Sign In</span>
            </button>

            <button
              onClick={() => navigate('/portal?tab=admin')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Review & Approval Console</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <Link to="/" className="hover:text-white transition-colors">
              ← Return to Nexus Tech Homepage
            </Link>
            <button
              onClick={() => {
                loginAsAdmin();
                setPortalApproved(true);
                setCurrentSession(getPortalSession());
              }}
              className="text-[#0046AF] hover:text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>1-Click Admin Demo Unlock</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A0E] flex font-sans dark text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r border-white/10 transition-all duration-300 z-20 bg-[#090C10]",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-[#090C10] border-r border-white/10 transform transition-transform duration-300 md:hidden flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header in Once UI Fluid Clear Dark Theme */}
        <header className="h-16 bg-[#090C10]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-5 z-10 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            {!sidebarOpen && (
              <button 
                className="hidden md:block text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            )}
            
            {/* Global Search */}
            <div className="max-w-md w-full hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search commands, clients, tickets... (Cmd+K)" 
                  className="w-full bg-[#0D1117] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF] transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Copilot Pill (Once UI Style) */}
            <button 
              onClick={() => setCopilotOpen(!copilotOpen)}
              className={cn(
                "relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer",
                copilotOpen 
                  ? "bg-[#0046AF] border-blue-500 text-white shadow-md shadow-blue-900/40" 
                  : "bg-[#0046AF]/15 border-blue-500/30 text-blue-300 hover:bg-[#0046AF]/25"
              )}
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>
            
            <div className="h-6 w-px bg-white/10 mx-1"></div>
            
            <button className="text-slate-400 hover:text-white relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#090C10]"></span>
            </button>
            
            <div className="flex items-center gap-2 pl-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-white leading-tight">
                  {currentSession?.fullName || 'Enterprise Client'}
                </span>
                <span className="text-[10px] text-blue-400 font-mono truncate max-w-[140px]">
                  {currentSession?.company || 'Nexus Portal'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Lock Portal & Log out"
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Lock Portal</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#070A0E] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Persistent AI Copilot Panel in Once UI Style */}
      <aside 
        className={cn(
          "border-l border-white/10 bg-[#090C10] flex flex-col transition-all duration-300 z-20 shrink-0",
          copilotOpen ? "w-80 md:w-96 translate-x-0" : "w-0 overflow-hidden border-none -translate-x-full absolute right-0 top-16 bottom-0 opacity-0"
        )}
      >
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-4 shrink-0 bg-[#0D1117]">
          <div className="flex items-center gap-2 text-blue-400">
            <Bot className="w-5 h-5" />
            <span className="font-bold text-white text-sm">Nexus Copilot (Gemini)</span>
          </div>
          <button onClick={() => setCopilotOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0046AF]/15 border border-blue-500/30 flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="font-bold text-white text-sm mb-1">Dubai IT Copilot</h4>
            <p className="text-xs text-slate-400 px-4">Instant answers for UAE Cloud SLA, active tickets, or FTA VAT invoices.</p>
          </div>

          {/* Interactive Chat Stream */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-end">
              <div className="bg-[#0046AF]/30 border border-blue-500/40 rounded-2xl rounded-tr-none px-3.5 py-2 text-xs text-blue-200 max-w-[85%]">
                Show status of active incident T-2049.
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0046AF] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-[#0D1117] border border-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-slate-300 space-y-2">
                <p>Incident <strong>#T-2049</strong> (Server latency in AWS me-central-1) is <strong>In Progress</strong> with Tier-3 DevOps (Sarah J.).</p>
                <div className="p-2 rounded-xl bg-black/40 border border-blue-500/30 text-[11px] font-mono text-blue-300">
                  ⚡ Guaranteed SLA: 9 mins remaining. Secondary fiber link active.
                </div>
                <Link to="/app/tickets" className="text-blue-400 font-bold hover:underline inline-block">
                  Open Incident in Command Console →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-[#0D1117]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask Copilot about projects, invoices, tickets..." 
              className="w-full bg-[#070A0E] border border-white/10 rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF] font-mono"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#0046AF] hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-1 mt-2.5">
            <span className="text-[10px] text-slate-500 font-mono">UAE Sovereignty Protected • On-Prem/VPC Secure</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
