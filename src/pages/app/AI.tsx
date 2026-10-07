import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bot, Send, User, Settings, Clock, Sparkles, FileText, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AI() {
  const [input, setInput] = useState('');
  
  const history = [
    { title: 'Acme Corp Risk Analysis', date: 'Today' },
    { title: 'Draft Project Proposal', date: 'Yesterday' },
    { title: 'Summarize T-2045 Thread', date: 'Yesterday' },
    { title: 'Q3 SLA Report Generation', date: 'Sep 1' }
  ];

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 max-w-[1600px] mx-auto">
      {/* Sidebar History */}
      <Card className="hidden md:flex flex-col w-64 shrink-0 bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)] overflow-hidden">
        <div className="p-4 border-b border-[color:var(--color-nexus-border)] flex items-center justify-between">
          <span className="font-semibold text-white">Chat History</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
            <Clock className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {history.map((item, i) => (
              <button key={i} className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors group">
                <div className="text-sm font-medium text-slate-300 group-hover:text-blue-400 truncate">{item.title}</div>
                <div className="text-xs text-slate-500">{item.date}</div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Chat Workspace */}
      <Card className="flex-1 flex flex-col bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)] overflow-hidden min-h-0 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-500/5 pointer-events-none" />
        
        {/* Chat Header */}
        <div className="h-14 border-b border-[color:var(--color-nexus-border)] flex items-center justify-between px-4 sm:px-6 shrink-0 bg-[color:var(--color-nexus-surface)] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Nexus Intelligence</div>
              <div className="text-xs text-slate-400">Context: Global Workspace</div>
            </div>
          </div>
          <Button variant="outline" className="border-[color:var(--color-nexus-border)] text-white hover:bg-white/5 h-8 text-xs">
            <Settings className="w-3.5 h-3.5 mr-2" /> Model Settings
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 relative z-10">
          {/* Welcome Message */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-medium text-white">Nexus Copilot</div>
              <div className="text-slate-300 prose prose-invert max-w-none text-sm">
                <p>Hello. I'm connected to your secure business context. How can I help you today?</p>
              </div>
              
              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2 pt-4">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors">
                  <Activity className="w-3.5 h-3.5" /> Analyze active tickets
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors">
                  <FileText className="w-3.5 h-3.5" /> Draft a proposal
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" /> Generate weekly summary
                </button>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
              <span className="text-xs font-medium text-white">AD</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-medium text-white">You</div>
              <div className="text-slate-300 text-sm">
                Generate a status summary for the Acme Corp cloud migration project.
              </div>
            </div>
          </div>

          {/* Copilot Response */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)] mt-1">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-white mb-2">Nexus Copilot</div>
              <div className="bg-[color:var(--color-nexus-ink)] border border-[color:var(--color-nexus-border)] rounded-2xl rounded-tl-none p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-slate-500 bg-black/20 p-2 rounded inline-flex">
                  <FileText className="w-3 h-3" /> Queried PRJ-101 (Acme Corp)
                </div>
                
                <h4 className="text-white font-medium mb-3">Project Status: Cloud Migration Phase 2</h4>
                <div className="space-y-4 text-sm text-slate-300">
                  <p>
                    The project is currently <strong className="text-green-400">On Track</strong> at <strong>75% completion</strong>. It is managed by Sarah J. with a target completion date of Oct 15, 2026.
                  </p>
                  
                  <div>
                    <strong className="text-white">Recent Milestones:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Database schema replication completed (Sep 5)</li>
                      <li>VPC peering established across secondary region (Sep 2)</li>
                    </ul>
                  </div>

                  <div>
                    <strong className="text-white">Active Risks / Blockers:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Ticket <a href="#" className="text-blue-400 hover:underline">#T-2049</a> (Server latency) is currently being investigated and may impact testing phase 3.</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-[color:var(--color-nexus-border)] flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs border-[color:var(--color-nexus-border)] text-white hover:bg-white/5">
                    Send to Client
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs border-[color:var(--color-nexus-border)] text-white hover:bg-white/5">
                    Save as Note
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 bg-[color:var(--color-nexus-surface)] relative z-10 shrink-0 border-t border-[color:var(--color-nexus-border)]">
          <div className="relative flex items-end gap-2 bg-[color:var(--color-nexus-ink)] border border-[color:var(--color-nexus-border)] rounded-xl p-2 focus-within:ring-1 focus-within:ring-blue-500 transition-shadow shadow-sm">
            <textarea
              className="w-full bg-transparent border-0 resize-none max-h-32 min-h-[44px] py-3 px-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
              placeholder="Ask Nexus Copilot..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="pb-1 pr-1 shrink-0">
              <Button 
                size="icon" 
                className={cn(
                  "h-10 w-10 transition-colors",
                  input.trim() ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-[color:var(--color-nexus-surface)] border border-[color:var(--color-nexus-border)] text-slate-500 cursor-not-allowed"
                )}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-center mt-3 text-xs text-slate-500">
            Nexus AI operates securely within your tenant boundaries.
          </div>
        </div>
      </Card>
    </div>
  );
}
