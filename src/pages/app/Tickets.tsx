import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, Plus, Filter, MessageSquare, Clock, AlertCircle, 
  CheckCircle2, X, Send, User, Shield, Server, Activity, 
  ExternalLink, ChevronRight, AlertTriangle, ArrowRight, RefreshCw
} from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  client: string;
  category: 'Cloud Infrastructure' | 'Zero-Trust Security' | 'AI & WhatsApp' | 'Software & ERP' | 'General IT';
  priority: 'Critical' | 'High' | 'Normal' | 'Low';
  status: 'Open' | 'In Progress' | 'Waiting' | 'Resolved';
  assignee: string;
  updated: string;
  createdMinutesAgo: number;
  slaLimitMinutes: number;
  description: string;
  messages: { sender: string; time: string; text: string; isStaff: boolean }[];
}

const INITIAL_TICKETS: Ticket[] = [
  { 
    id: 'T-2049', 
    subject: 'Server latency spike in AWS me-central-1 UAE cluster', 
    client: 'Acme Corp FZ-LLC', 
    category: 'Cloud Infrastructure',
    priority: 'Critical', 
    status: 'In Progress', 
    assignee: 'Sarah J. (Senior DevOps)', 
    updated: '4m ago',
    createdMinutesAgo: 6,
    slaLimitMinutes: 15,
    description: 'BGP edge gateway reporting packet delay between Dubai Internet City office and AWS UAE North primary instance. Automated failover standing by.',
    messages: [
      { sender: 'Client (Alex K.)', time: '6m ago', text: 'We are noticing sub-second lag on the trading terminal connecting to UAE North.', isStaff: false },
      { sender: 'Nexus NOC (Sarah J.)', time: '4m ago', text: 'Acknowledged under 15-minute SLA guarantee. Rerouting traffic through secondary direct fiber link.', isStaff: true }
    ]
  },
  { 
    id: 'T-2048', 
    subject: 'WhatsApp Cloud API webhook timeout on high inbound load', 
    client: 'Globex Middle East', 
    category: 'AI & WhatsApp',
    priority: 'High', 
    status: 'In Progress', 
    assignee: 'Ahmed M. (AI Engineer)', 
    updated: '25m ago',
    createdMinutesAgo: 40,
    slaLimitMinutes: 60,
    description: 'During a marketing campaign, webhook received 450 requests/sec. Auto-scaling ECS container pool handled 98% of queries; 2% retried.',
    messages: [
      { sender: 'Client (Noor S.)', time: '40m ago', text: 'Customers reported slight delay in automated Arabic quotation responses.', isStaff: false },
      { sender: 'Ahmed M.', time: '25m ago', text: 'Allocated additional Redis caching cluster. Response time stabilized at 0.52s.', isStaff: true }
    ]
  },
  { 
    id: 'T-2047', 
    subject: 'Database backup verification failed on AUH secondary replica', 
    client: 'Initech Gulf', 
    category: 'Cloud Infrastructure',
    priority: 'High', 
    status: 'Open', 
    assignee: 'Unassigned', 
    updated: '1h ago',
    createdMinutesAgo: 65,
    slaLimitMinutes: 120,
    description: 'Scheduled midnight snapshot checksum mismatch on Postgres cluster replica in Abu Dhabi. Primary replica intact and operational.',
    messages: [
      { sender: 'Automated Telemetry', time: '1h ago', text: 'Snapshot checksum warning on node auh-db-rep02.', isStaff: true }
    ]
  },
  { 
    id: 'T-2046', 
    subject: 'Microsoft 365 executive email security configuration update', 
    client: 'Stark Industries DXB', 
    category: 'Zero-Trust Security',
    priority: 'Low', 
    status: 'Resolved', 
    assignee: 'Sarah J.', 
    updated: '1d ago',
    createdMinutesAgo: 1440,
    slaLimitMinutes: 480,
    description: 'Configured DKIM, SPF, and DMARC enforcement records complying with TDRA UAE enterprise guidelines.',
    messages: [
      { sender: 'Client', time: '1d ago', text: 'Please enforce strict DMARC policy for @starkdxb.ae.', isStaff: false },
      { sender: 'Sarah J.', time: '1d ago', text: 'Enforced and verified with 100% compliance test score.', isStaff: true }
    ]
  },
  { 
    id: 'T-2045', 
    subject: 'DIFC Gateway zero-trust VPN client access credential renewal', 
    client: 'Wayne Capital', 
    category: 'Zero-Trust Security',
    priority: 'Normal', 
    status: 'Waiting', 
    assignee: 'John D.', 
    updated: '2d ago',
    createdMinutesAgo: 2880,
    slaLimitMinutes: 240,
    description: 'Issued updated hardware token 2FA certs for 14 associates in the DIFC Gate Precinct branch.',
    messages: [
      { sender: 'Client', time: '2d ago', text: 'Certificates received, distributing to staff today.', isStaff: false }
    ]
  }
];

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Open' | 'Critical' | 'Resolved'>('All');
  
  // Modals & Drawers
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Form State for New Ticket
  const [newSubject, setNewSubject] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newCategory, setNewCategory] = useState<Ticket['category']>('Cloud Infrastructure');
  const [newPriority, setNewPriority] = useState<Ticket['priority']>('High');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter === 'Open') return t.status === 'Open' || t.status === 'In Progress';
    if (statusFilter === 'Critical') return t.priority === 'Critical';
    if (statusFilter === 'Resolved') return t.status === 'Resolved';
    return true;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newClient.trim()) return;

    const newId = `T-${2050 + tickets.length}`;
    const createdTicket: Ticket = {
      id: newId,
      subject: newSubject,
      client: newClient,
      category: newCategory,
      priority: newPriority,
      status: 'Open',
      assignee: 'Nexus Triage Team',
      updated: 'Just now',
      createdMinutesAgo: 0,
      slaLimitMinutes: newPriority === 'Critical' ? 15 : newPriority === 'High' ? 60 : 240,
      description: newDescription || 'Standard client incident logged via portal.',
      messages: [
        { sender: `Client (${newClient})`, time: 'Just now', text: newDescription || newSubject, isStaff: false }
      ]
    };

    setTickets([createdTicket, ...tickets]);
    setIsNewTicketOpen(false);
    setNewSubject('');
    setNewClient('');
    setNewDescription('');
    setSelectedTicket(createdTicket);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const updated = {
      ...selectedTicket,
      updated: 'Just now',
      messages: [
        ...selectedTicket.messages,
        { sender: 'Nexus Staff (Dubai HQ)', time: 'Just now', text: replyText, isStaff: true }
      ]
    };

    setTickets(tickets.map(t => t.id === updated.id ? updated : t));
    setSelectedTicket(updated);
    setReplyText('');
  };

  const handleUpdateStatus = (ticketId: string, newStatus: Ticket['status']) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: newStatus, updated: 'Just now' };
      }
      return t;
    }));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus, updated: 'Just now' });
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-100">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Client Support & SLA Telemetry</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              15-Min Dubai SLA Active
            </span>
          </div>
          <p className="text-sm text-slate-400">Manage real-time incidents, response timers, and technician dispatches.</p>
        </div>
        
        <Button 
          onClick={() => setIsNewTicketOpen(true)}
          className="bg-gradient-to-r from-[#0046AF] to-blue-700 hover:from-blue-700 hover:to-[#0046AF] text-white font-semibold shadow-xs"
        >
          <Plus className="w-4 h-4 mr-2" /> New Support Ticket
        </Button>
      </div>

      {/* KPI & Filter Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'All Tickets', count: tickets.length, filterKey: 'All' as const, color: 'text-white' },
          { label: 'Active In Progress', count: tickets.filter(t => t.status === 'In Progress' || t.status === 'Open').length, filterKey: 'Open' as const, color: 'text-cyan-400' },
          { label: 'Critical (SLA Watch)', count: tickets.filter(t => t.priority === 'Critical').length, filterKey: 'Critical' as const, color: 'text-rose-400' },
          { label: 'Resolved Tickets', count: tickets.filter(t => t.status === 'Resolved').length, filterKey: 'Resolved' as const, color: 'text-emerald-400' },
        ].map((tab, i) => {
          const isSelected = statusFilter === tab.filterKey;
          return (
            <div 
              key={i} 
              onClick={() => setStatusFilter(tab.filterKey)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'bg-[#0E131A] border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30' 
                  : 'bg-[#0A0D12] border-white/10 hover:border-white/20 hover:bg-[#0E131A]'
              }`}
            >
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-8 w-12" />
                </>
              ) : (
                <>
                  <div className="text-xs font-mono text-slate-400 mb-1">{tab.label}</div>
                  <div className={`text-2xl font-bold font-mono ${tab.color}`}>{tab.count}</div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Tickets Table & Command Interface */}
      <Card className="bg-[#090C10] border-white/10 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0D1117]">
          
          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
            {(['All', 'Open', 'Critical', 'Resolved'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === s 
                    ? 'bg-emerald-600 text-white font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, client or issue..." 
              className="pl-9 bg-black/50 border-white/10 text-white text-xs placeholder:text-slate-500"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-5 w-3/4 max-w-[300px] mb-2" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))
            ) : filteredTickets.length === 0 ? (
              <div className="p-12 text-center text-slate-400 font-mono text-sm">
                No tickets matching current filters.
              </div>
            ) : (
              filteredTickets.map((ticket) => {
                // Calculate SLA Remaining time
                const minutesLeft = Math.max(0, ticket.slaLimitMinutes - ticket.createdMinutesAgo);
                const isUrgent = ticket.priority === 'Critical' && ticket.status !== 'Resolved';

                return (
                  <div 
                    key={ticket.id} 
                    onClick={() => setSelectedTicket(ticket)}
                    className="p-4 sm:p-5 hover:bg-white/5 transition-all flex flex-col sm:flex-row gap-4 sm:items-center justify-between cursor-pointer group border-l-2 border-transparent hover:border-emerald-500"
                  >
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                        ticket.priority === 'Critical'
                          ? 'bg-rose-950/40 border-rose-500/30 text-rose-400'
                          : ticket.priority === 'High'
                          ? 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                          : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                      }`}>
                        {ticket.priority === 'Critical' ? (
                          <AlertTriangle className="w-5 h-5 animate-pulse" />
                        ) : (
                          <Server className="w-5 h-5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-emerald-400 font-semibold">{ticket.id}</span>
                          <span className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors truncate">
                            {ticket.subject}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
                          <span className="text-slate-300 font-sans">{ticket.client}</span>
                          <span>•</span>
                          <span className="text-slate-400">{ticket.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-slate-400">
                            <Clock className="w-3 h-3" /> {ticket.updated}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side telemetry & status badges */}
                    <div className="flex items-center gap-4 shrink-0 sm:self-center pl-13 sm:pl-0">
                      
                      {/* Live SLA Countdown Badge */}
                      {ticket.status !== 'Resolved' && (
                        <div className="hidden md:flex flex-col items-end text-right font-mono">
                          <span className="text-[10px] text-slate-500 uppercase">SLA Window</span>
                          <span className={`text-xs font-bold ${isUrgent ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                            {minutesLeft > 0 ? `${minutesLeft}m remaining` : 'Breached SLA'}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                          ticket.priority === 'Critical'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 font-bold'
                            : ticket.priority === 'High'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-slate-800 text-slate-300 border-white/10'
                        }`}>
                          {ticket.priority}
                        </span>

                        <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                          ticket.status === 'Resolved'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                            : ticket.status === 'In Progress'
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 font-semibold'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}>
                          {ticket.status}
                        </span>

                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Ticket Detail Command Drawer / Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0B0F14] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 bg-[#0E131A] border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {selectedTicket.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{selectedTicket.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{selectedTicket.subject}</h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">Client: {selectedTicket.client} • Assigned: {selectedTicket.assignee}</p>
              </div>

              <button 
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
              
              {/* Telemetry Bar inside Drawer */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/40 border border-white/5 font-mono text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Priority</span>
                  <span className={`font-bold ${selectedTicket.priority === 'Critical' ? 'text-rose-400' : 'text-slate-200'}`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">SLA Target</span>
                  <span className="text-emerald-400 font-bold">{selectedTicket.slaLimitMinutes} Mins</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Status</span>
                  <span className="text-cyan-400 font-bold">{selectedTicket.status}</span>
                </div>
              </div>

              {/* Status Switcher Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Change Status:</span>
                {(['Open', 'In Progress', 'Waiting', 'Resolved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(selectedTicket.id, st)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      selectedTicket.status === st
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-[#0E131A] border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">Incident Overview</span>
                <p className="text-slate-300 leading-relaxed">{selectedTicket.description}</p>
              </div>

              {/* Communication Thread */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                  Incident Timeline & Live Updates ({selectedTicket.messages.length})
                </span>
                
                <div className="space-y-2.5">
                  {selectedTicket.messages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-2xl border ${
                        msg.isStaff 
                          ? 'bg-emerald-950/20 border-emerald-500/20 ml-4' 
                          : 'bg-black/40 border-white/5 mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                        <span className={msg.isStaff ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                          {msg.sender}
                        </span>
                        <span className="text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Post Reply Footer */}
            <form onSubmit={handlePostReply} className="p-4 bg-[#0E131A] border-t border-white/10 flex gap-2">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Post update or technician response..."
                className="bg-black/50 border-white/10 text-white text-xs placeholder:text-slate-500"
              />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4">
                <Send className="w-3.5 h-3.5 mr-1.5" /> Send
              </Button>
            </form>

          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0B0F14] border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
            
            <div className="p-6 bg-[#0E131A] border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Create New Support Ticket</h3>
                <p className="text-xs text-slate-400">Direct dispatch to Dubai Tier-3 engineering lead.</p>
              </div>
              <button 
                onClick={() => setIsNewTicketOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="p-6 space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Client / Company Name *</label>
                <Input
                  required
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="e.g. Al Futtaim Group FZ-LLC"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Issue Subject *</label>
                <Input
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="Brief summary of the issue..."
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Service Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Zero-Trust Security">Zero-Trust Security</option>
                    <option value="AI & WhatsApp">AI & WhatsApp</option>
                    <option value="Software & ERP">Software & ERP</option>
                    <option value="General IT">General IT</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Severity & SLA</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="Critical">Critical (&lt;15 min SLA)</option>
                    <option value="High">High (&lt;60 min SLA)</option>
                    <option value="Normal">Normal (&lt;4 hrs SLA)</option>
                    <option value="Low">Low (&lt;24 hrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Incident Details & Symptoms</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Provide affected IP addresses, error logs or user symptoms..."
                  className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder:text-slate-500 font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 font-sans">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsNewTicketOpen(false)}
                  className="border-white/10 text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#0046AF] to-blue-700 hover:from-blue-700 hover:to-[#0046AF] text-white"
                >
                  Submit Incident
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
