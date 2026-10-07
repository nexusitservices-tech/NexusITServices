import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, Plus, Filter, MoreHorizontal, Building2, Mail, 
  Phone, ExternalLink, X, Check, ShieldCheck 
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  status: 'Active' | 'Lead' | 'Churned';
  owner: string;
  value: string;
  trn: string;
  location: string;
}

const INITIAL_COMPANIES: Company[] = [
  { id: 'ORG-101', name: 'Acme Corp FZ-LLC', industry: 'Manufacturing & Export', status: 'Active', owner: 'Sarah J.', value: 'AED 450,000', trn: '100492817200003', location: 'Dubai Internet City' },
  { id: 'ORG-102', name: 'Globex Middle East', industry: 'Logistics & Supply Chain', status: 'Lead', owner: 'Ahmed M.', value: 'AED 120,000', trn: '100223948500003', location: 'Jebel Ali Free Zone' },
  { id: 'ORG-103', name: 'Stark Industries DXB', industry: 'Enterprise Software & ERP', status: 'Active', owner: 'Sarah J.', value: 'AED 1.2M', trn: '100889271600003', location: 'Downtown Dubai' },
  { id: 'ORG-104', name: 'Wayne Capital DIFC', industry: 'Fintech & Asset Management', status: 'Active', owner: 'John D.', value: 'AED 850,000', trn: '100551928300003', location: 'DIFC Gate Precinct' },
  { id: 'ORG-105', name: 'Initech Gulf LLC', industry: 'IT & Cloud Services', status: 'Churned', owner: 'Mike R.', value: 'AED 0', trn: '100993827100003', location: 'Business Bay' }
];

export default function CRM() {
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Lead' | 'Churned'>('All');
  
  // Add Org Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newStatus, setNewStatus] = useState<'Active' | 'Lead'>('Active');
  const [newValue, setNewValue] = useState('');
  const [newLocation, setNewLocation] = useState('Dubai');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAddOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newOrg: Company = {
      id: `ORG-${100 + companies.length + 1}`,
      name: newName,
      industry: newIndustry || 'Technology Services',
      status: newStatus,
      owner: 'Solutions Team',
      value: newValue ? `AED ${newValue}` : 'AED 50,000',
      trn: `100${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      location: newLocation
    };

    setCompanies([newOrg, ...companies]);
    setIsAddOpen(false);
    setNewName('');
    setNewIndustry('');
    setNewValue('');
  };

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.industry.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">CRM & Client Organizations</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              UAE Entities
            </span>
          </div>
          <p className="text-sm text-slate-400">Manage client accounts, registered TRNs, contract value, and account executives.</p>
        </div>
        <Button 
          onClick={() => setIsAddOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Organization
        </Button>
      </div>

      <Card className="bg-[#090C10] border-white/10 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0D1117]">
          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
            {(['All', 'Active', 'Lead', 'Churned'] as const).map((s) => (
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

          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, TRNs, or domains..." 
              className="pl-10 bg-black/50 border-white/10 text-white text-xs placeholder:text-slate-500 font-mono"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] font-mono text-slate-400 uppercase bg-[#0D1117] border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Organization & TRN</th>
                  <th className="px-6 py-3.5 font-medium">Status</th>
                  <th className="px-6 py-3.5 font-medium">Industry & Location</th>
                  <th className="px-6 py-3.5 font-medium">Account Owner</th>
                  <th className="px-6 py-3.5 font-medium text-right">Lifetime Contract Value</th>
                  <th className="px-6 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                          <div>
                            <Skeleton className="h-4 w-32 mb-1.5" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Skeleton className="h-5 w-16 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-6 h-6 rounded-full shrink-0" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </td>
                      <td className="px-6 py-4 flex justify-end"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  ))
                ) : (
                  filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-2">
                              {company.name}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                              <span className="text-emerald-400 font-bold">{company.id}</span> • TRN: {company.trn}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${
                          company.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          company.status === 'Lead' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-300 font-medium">{company.industry}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{company.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 font-mono">
                            {company.owner.charAt(0)}
                          </div>
                          <span className="text-slate-300">{company.owner}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">
                        {company.value}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Organization Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#090C10] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#0D1117]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Add UAE Organization</h3>
              </div>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddOrg} className="p-6 space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Company / Entity Legal Name *</label>
                <Input 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Al Futtaim Digital LLC"
                  required
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Industry</label>
                  <Input 
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    placeholder="e.g. Retail & Logistics"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select 
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-[#0D1117] border border-white/10 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Active">Active Client</option>
                    <option value="Lead">Pipeline Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Contract / Retainer (AED)</label>
                  <Input 
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="e.g. 180,000"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">UAE Jurisdiction</label>
                  <Input 
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. DIFC / DIC"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Auto-generates FTA VAT 5% compliant profile and corporate portal link.</span>
              </div>

              <div className="pt-3 flex justify-end gap-2.5">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddOpen(false)}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold"
                >
                  Save Organization
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
