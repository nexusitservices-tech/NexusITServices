import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Plus, Filter, FileText, Folder, MoreVertical, Download, Lock } from 'lucide-react';

export default function Documents() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const documents = [
    { id: 'DOC-101', name: 'Acme_Corp_MSA_2026.pdf', type: 'PDF', size: '2.4 MB', owner: 'Sarah J.', updated: '2 hours ago', secure: true },
    { id: 'DOC-102', name: 'Q3_Architecture_Review.docx', type: 'Word', size: '1.1 MB', owner: 'Ahmed M.', updated: '1 day ago', secure: false },
    { id: 'DOC-103', name: 'Stark_Ind_Network_Topology.png', type: 'Image', size: '4.8 MB', owner: 'System', updated: '2 days ago', secure: true },
    { id: 'DOC-104', name: 'Employee_Onboarding_SOP.pdf', type: 'PDF', size: '850 KB', owner: 'HR', updated: '1 week ago', secure: false },
    { id: 'DOC-105', name: 'Wayne_Ent_Proposal_v2.pdf', type: 'PDF', size: '3.2 MB', owner: 'John D.', updated: '1 week ago', secure: true }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Documents</h1>
          <p className="text-sm text-slate-400">Secure file storage, contracts, and knowledge base.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-[color:var(--color-nexus-border)] text-white hover:bg-white/5">
            <Folder className="w-4 h-4 mr-2" /> New Folder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white">
            <Plus className="w-4 h-4 mr-2" /> Upload Files
          </Button>
        </div>
      </div>

      <Card className="bg-[color:var(--color-nexus-surface)] border-[color:var(--color-nexus-border)] flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-[color:var(--color-nexus-border)] flex flex-col sm:flex-row gap-4 shrink-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search documents and contents..." 
              className="pl-9 bg-[color:var(--color-nexus-ink)] border-[color:var(--color-nexus-border)] text-white"
            />
          </div>
          <Button variant="outline" className="border-[color:var(--color-nexus-border)] text-white hover:bg-white/5">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </div>
        
        <CardContent className="p-0 flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-[color:var(--color-nexus-ink)] border-b border-[color:var(--color-nexus-border)] sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">Owner</th>
                <th className="px-6 py-4 font-medium">Last Modified</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-nexus-border)]">
              {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-5 h-5 rounded shrink-0" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="w-5 h-5 rounded-full shrink-0" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : (
                <>
                  {/* Folder Row Mock */}
                  <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Folder className="w-5 h-5 text-blue-400" fill="currentColor" fillOpacity={0.2} />
                        <span className="font-medium text-white">Client Contracts</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">--</td>
                    <td className="px-6 py-4 text-slate-400">System</td>
                    <td className="px-6 py-4 text-slate-400">1 hour ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Folder className="w-5 h-5 text-blue-400" fill="currentColor" fillOpacity={0.2} />
                        <span className="font-medium text-white">Project Deliverables</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">--</td>
                    <td className="px-6 py-4 text-slate-400">System</td>
                    <td className="px-6 py-4 text-slate-400">Yesterday</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  {/* File Rows */}
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-200 group-hover:text-blue-400 transition-colors">{doc.name}</span>
                            {doc.secure && <Lock className="w-3 h-3 text-green-500" title="Secure Document" />}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{doc.size}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-300">
                            {doc.owner.charAt(0)}
                          </div>
                          <span className="text-slate-300">{doc.owner}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{doc.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/10">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
