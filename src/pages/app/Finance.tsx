import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, Plus, Filter, FileText, CheckCircle2, Download, 
  ExternalLink, DollarSign, Printer, X, MessageSquare, 
  Building, Check, ArrowRight, ShieldCheck, Sparkles 
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

interface InvoiceLineItem {
  description: string;
  qty: number;
  rateAed: number;
}

interface Invoice {
  id: string;
  client: string;
  clientTrn?: string;
  amount: string;
  subtotalAed: number;
  vatAed: number;
  totalAed: number;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Issued' | 'Overdue' | 'Draft';
  items: InvoiceLineItem[];
}

const INITIAL_INVOICES: Invoice[] = [
  { 
    id: 'INV-2026-105', 
    client: 'Acme Corp FZ-LLC', 
    clientTrn: '100492817200003',
    amount: 'AED 13,125.00', 
    subtotalAed: 12500,
    vatAed: 625,
    totalAed: 13125,
    date: '2026-09-01', 
    dueDate: '2026-09-15',
    status: 'Overdue',
    items: [
      { description: 'AWS me-central-1 UAE Dedicated Cloud Infrastructure (Monthly Retainer)', qty: 1, rateAed: 9500 },
      { description: 'Zero-Trust Endpoint Security Monitoring & 24/7 NOC Telemetry', qty: 1, rateAed: 3000 }
    ]
  },
  { 
    id: 'INV-2026-106', 
    client: 'Globex Middle East', 
    clientTrn: '100223948500003',
    amount: 'AED 4,410.00', 
    subtotalAed: 4200,
    vatAed: 210,
    totalAed: 4410,
    date: '2026-09-05', 
    dueDate: '2026-09-20',
    status: 'Paid',
    items: [
      { description: 'WhatsApp Business API Inbound AI Assistant & Webhook Maintenance', qty: 1, rateAed: 4200 }
    ]
  },
  { 
    id: 'INV-2026-107', 
    client: 'Stark Industries DXB', 
    clientTrn: '100889271600003',
    amount: 'AED 157,500.00', 
    subtotalAed: 150000,
    vatAed: 7500,
    totalAed: 157500,
    date: '2026-09-06', 
    dueDate: '2026-09-30',
    status: 'Issued',
    items: [
      { description: 'Custom ERP & Logistics Platform (Sprint Milestone 2: Procurement & Customs Engine)', qty: 1, rateAed: 150000 }
    ]
  },
  { 
    id: 'INV-2026-108', 
    client: 'Wayne Capital DIFC', 
    clientTrn: '100551928300003',
    amount: 'AED 47,250.00', 
    subtotalAed: 45000,
    vatAed: 2250,
    totalAed: 47250,
    date: '2026-09-06', 
    dueDate: '2026-09-21',
    status: 'Draft',
    items: [
      { description: 'DIFC Gateway Security Audit & ISO 27001 Certification Prep', qty: 1, rateAed: 45000 }
    ]
  },
  { 
    id: 'INV-2026-109', 
    client: 'Initech Gulf LLC', 
    clientTrn: '100993827100003',
    amount: 'AED 2,625.00', 
    subtotalAed: 2500,
    vatAed: 125,
    totalAed: 2625,
    date: '2026-09-07', 
    dueDate: '2026-09-22',
    status: 'Paid',
    items: [
      { description: 'Workstation Lifecycle Hardware Maintenance (Business Bay Office)', qty: 1, rateAed: 2500 }
    ]
  }
];

export default function Finance() {
  const { formatPrice } = useCurrency();
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Issued' | 'Overdue' | 'Draft'>('All');

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New Invoice Form State
  const [newClient, setNewClient] = useState('');
  const [newClientTrn, setNewClientTrn] = useState('');
  const [newDueDate, setNewDueDate] = useState('2026-09-30');
  const [newItems, setNewItems] = useState<InvoiceLineItem[]>([
    { description: 'Cloud Infrastructure & Managed DevOps (1 Month)', qty: 1, rateAed: 12000 }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const totalOutstanding = invoices
    .filter(i => i.status === 'Issued' || i.status === 'Overdue')
    .reduce((sum, i) => sum + i.totalAed, 0);

  const totalOverdue = invoices
    .filter(i => i.status === 'Overdue')
    .reduce((sum, i) => sum + i.totalAed, 0);

  const totalPaid = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + i.totalAed, 0);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.client.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
    return true;
  });

  const handleAddItem = () => {
    setNewItems([...newItems, { description: '', qty: 1, rateAed: 0 }]);
  };

  const handleUpdateItem = (index: number, field: keyof InvoiceLineItem, val: any) => {
    const updated = [...newItems];
    updated[index] = { ...updated[index], [field]: val };
    setNewItems(updated);
  };

  const handleRemoveItem = (index: number) => {
    if (newItems.length > 1) {
      setNewItems(newItems.filter((_, i) => i !== index));
    }
  };

  // Calculate new invoice subtotal & VAT
  const calculatedSubtotal = newItems.reduce((sum, it) => sum + (it.qty * (it.rateAed || 0)), 0);
  const calculatedVat = Math.round(calculatedSubtotal * 0.05);
  const calculatedTotal = calculatedSubtotal + calculatedVat;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim() || calculatedSubtotal <= 0) return;

    const newId = `INV-2026-${110 + invoices.length}`;
    const newInvoice: Invoice = {
      id: newId,
      client: newClient,
      clientTrn: newClientTrn || '100000000000003',
      amount: `AED ${calculatedTotal.toLocaleString()}.00`,
      subtotalAed: calculatedSubtotal,
      vatAed: calculatedVat,
      totalAed: calculatedTotal,
      date: new Date().toISOString().split('T')[0],
      dueDate: newDueDate,
      status: 'Issued',
      items: newItems
    };

    setInvoices([newInvoice, ...invoices]);
    setIsCreateOpen(false);
    setSelectedInvoice(newInvoice);
    // Reset form
    setNewClient('');
    setNewClientTrn('');
    setNewItems([{ description: 'Custom Technology Services', qty: 1, rateAed: 15000 }]);
  };

  const handleMarkAsPaid = (invId: string) => {
    setInvoices(invoices.map(inv => inv.id === invId ? { ...inv, status: 'Paid' } : inv));
    if (selectedInvoice && selectedInvoice.id === invId) {
      setSelectedInvoice({ ...selectedInvoice, status: 'Paid' });
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-slate-100">
      
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Finance & UAE Tax Invoicing</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              TRN: 100293847500003
            </span>
          </div>
          <p className="text-sm text-slate-400">Manage UAE VAT-compliant billing, milestone disbursements, and invoices.</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsCreateOpen(true)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Generate Tax Invoice
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border bg-[#090C10] border-white/10 shadow-md">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Outstanding Balance</div>
          {isLoading ? <Skeleton className="h-8 w-32 mt-1" /> : (
            <div className="text-2xl font-black font-mono text-white">
              AED {totalOutstanding.toLocaleString()}
            </div>
          )}
          <span className="text-[10px] text-slate-500 mt-1 block">Includes 5% UAE VAT</span>
        </div>

        <div className="p-5 rounded-2xl border bg-[#090C10] border-white/10 shadow-md">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Overdue (Immediate Action)</div>
          {isLoading ? <Skeleton className="h-8 w-28 mt-1" /> : (
            <div className="text-2xl font-black font-mono text-rose-400">
              AED {totalOverdue.toLocaleString()}
            </div>
          )}
          <span className="text-[10px] text-rose-400/80 mt-1 block">1 Invoice past due date</span>
        </div>

        <div className="p-5 rounded-2xl border bg-[#090C10] border-white/10 shadow-md">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Collected (September 2026)</div>
          {isLoading ? <Skeleton className="h-8 w-28 mt-1" /> : (
            <div className="text-2xl font-black font-mono text-emerald-400">
              AED {totalPaid.toLocaleString()}
            </div>
          )}
          <span className="text-[10px] text-emerald-400/80 mt-1 block">Settled via FAB Wire</span>
        </div>

        <div className="p-5 rounded-2xl border bg-[#090C10] border-white/10 shadow-md">
          <div className="text-xs font-mono text-slate-400 uppercase mb-1">Active Drafts & Quotes</div>
          {isLoading ? <Skeleton className="h-8 w-16 mt-1" /> : (
            <div className="text-2xl font-black font-mono text-white">
              {invoices.filter(i => i.status === 'Draft').length}
            </div>
          )}
          <span className="text-[10px] text-slate-500 mt-1 block">Ready for issuance</span>
        </div>
      </div>

      {/* Main Invoices Table Card */}
      <Card className="bg-[#090C10] border-white/10 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0D1117]">
          
          {/* Status Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 text-xs font-mono">
            {(['All', 'Paid', 'Issued', 'Overdue', 'Draft'] as const).map((s) => (
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

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by invoice # or client..." 
              className="pl-9 bg-black/50 border-white/10 text-white text-xs placeholder:text-slate-500"
            />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs font-mono text-slate-400 uppercase bg-[#0E131A] border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-semibold">Tax Invoice #</th>
                  <th className="px-6 py-4 font-semibold">Client Organization</th>
                  <th className="px-6 py-4 font-semibold">Issued Date</th>
                  <th className="px-6 py-4 font-semibold">Due Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount (AED)</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4"><Skeleton className="h-4 w-28" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-36" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-5 w-16 rounded-full" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="h-4 w-24 ml-auto" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-12 ml-auto" /></td>
                    </tr>
                  ))
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 font-mono text-xs">
                      No invoices found matching current filter.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/5 transition-colors group cursor-pointer" onClick={() => setSelectedInvoice(inv)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-400" />
                          <span className="font-mono font-bold text-white group-hover:text-emerald-300 transition-colors">
                            {inv.id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-200 font-medium">{inv.client}</td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">{inv.date}</td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">{inv.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold'
                            : inv.status === 'Overdue'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 font-bold'
                            : inv.status === 'Issued'
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 font-semibold'
                            : 'bg-white/5 border-white/10 text-slate-300'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-white">{inv.amount}</td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedInvoice(inv)}
                            className="text-slate-400 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors" 
                            title="Preview Tax Invoice"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => handleMarkAsPaid(inv.id)}
                              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded-md border border-emerald-500/20"
                            >
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* UAE VAT TAX INVOICE VIEWER / PRINTABLE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Top Toolbar */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs font-bold">UAE Federal Tax Authority (FTA) Compliant Tax Invoice</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm"
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" /> Print / Save PDF
                </Button>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Printable Invoice Sheet */}
            <div className="p-8 sm:p-12 overflow-y-auto space-y-8 flex-1 text-slate-800">
              
              {/* Header with Bilingual Tax Invoice Title & Company Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                      NX
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-950">Nexus IT Services FZ-LLC</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Radiance ONE Business Center 9th floor<br />
                    Dubai Creek Car parking, Rigga Al Buteen, Dubai, UAE<br />
                    Email: info@nexus.ae.org • Tel: +971 52 6367221<br />
                    <strong className="text-slate-800 font-mono">Supplier TRN: 100293847500003</strong>
                  </p>
                </div>

                <div className="text-right sm:self-start">
                  <div className="text-2xl font-black text-slate-900 uppercase tracking-tight">TAX INVOICE</div>
                  <div className="text-sm font-semibold text-slate-600 font-sans">فاتورة ضريبية</div>
                  <div className="mt-2 font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 inline-block">
                    {selectedInvoice.id}
                  </div>
                </div>
              </div>

              {/* Billed To / Invoice Details Matrix */}
              <div className="grid grid-cols-2 gap-6 text-xs border-b border-slate-200 pb-6">
                <div>
                  <span className="font-mono text-slate-400 uppercase font-bold block mb-1">Customer Details / العميل</span>
                  <div className="font-bold text-sm text-slate-900">{selectedInvoice.client}</div>
                  <p className="text-slate-600 mt-0.5">United Arab Emirates</p>
                  <p className="font-mono text-slate-700 mt-1">Customer TRN: {selectedInvoice.clientTrn || 'Unregistered'}</p>
                </div>

                <div className="space-y-1 text-right font-mono">
                  <div>
                    <span className="text-slate-400 uppercase">Issue Date:</span>{' '}
                    <span className="font-bold text-slate-800">{selectedInvoice.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase">Due Date:</span>{' '}
                    <span className="font-bold text-slate-800">{selectedInvoice.dueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase">Payment Status:</span>{' '}
                    <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      selectedInvoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="space-y-4">
                <table className="w-full text-xs">
                  <thead className="border-b-2 border-slate-900 font-mono uppercase text-slate-700">
                    <tr>
                      <th className="py-2.5 text-left font-bold">Description</th>
                      <th className="py-2.5 text-center font-bold">Qty</th>
                      <th className="py-2.5 text-right font-bold">Unit Price (AED)</th>
                      <th className="py-2.5 text-right font-bold">VAT (5%)</th>
                      <th className="py-2.5 text-right font-bold">Total (AED)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedInvoice.items.map((it, idx) => {
                      const itemSubtotal = it.qty * it.rateAed;
                      const itemVat = itemSubtotal * 0.05;
                      const itemTotal = itemSubtotal + itemVat;
                      return (
                        <tr key={idx}>
                          <td className="py-3 text-slate-800 font-medium pr-4">{it.description}</td>
                          <td className="py-3 text-center text-slate-600 font-mono">{it.qty}</td>
                          <td className="py-3 text-right text-slate-600 font-mono">{it.rateAed.toLocaleString()}.00</td>
                          <td className="py-3 text-right text-slate-600 font-mono">{itemVat.toLocaleString()}.00</td>
                          <td className="py-3 text-right text-slate-900 font-bold font-mono">{itemTotal.toLocaleString()}.00</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Subtotals & VAT Totals */}
                <div className="flex justify-end pt-4">
                  <div className="w-72 space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal (Excl. VAT):</span>
                      <span className="font-bold text-slate-900">AED {selectedInvoice.subtotalAed.toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>UAE VAT (5.00%):</span>
                      <span className="font-bold text-slate-900">AED {selectedInvoice.vatAed.toLocaleString()}.00</span>
                    </div>
                    <div className="border-t-2 border-slate-900 pt-2 flex justify-between text-sm font-bold text-slate-950">
                      <span>Total Due (AED):</span>
                      <span>AED {selectedInvoice.totalAed.toLocaleString()}.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wire Remittance Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1">
                <span className="font-bold text-slate-900 block mb-1">UAE Bank Wire Transfer Instructions:</span>
                <p className="text-slate-600">Bank: Emirates NBD • Branch: Downtown Dubai Corporate</p>
                <p className="text-slate-600">Account Name: Nexus IT Services FZ-LLC</p>
                <p className="text-slate-600">IBAN: AE29 0260 0000 1234 5678 901 • SWIFT: EBILAEAD</p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* GENERATE NEW TAX INVOICE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#0B0F14] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 bg-[#0E131A] border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Generate Official UAE Tax Invoice</h3>
                <p className="text-xs text-slate-400 font-mono">FTA Compliant • Automatic 5% UAE VAT calculation.</p>
              </div>
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="p-6 overflow-y-auto space-y-5 text-xs font-mono flex-1">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">Customer / Organization Name *</label>
                  <Input
                    required
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="e.g. Al Naboodah Real Estate FZ-LLC"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Customer TRN (Optional)</label>
                  <Input
                    value={newClientTrn}
                    onChange={(e) => setNewClientTrn(e.target.value)}
                    placeholder="e.g. 100234859600003"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Payment Due Date</label>
                <Input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>

              {/* Line Items Builder */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400 font-bold uppercase text-[11px]">Invoice Line Items</label>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-emerald-400 hover:text-emerald-300 text-[11px] font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Line Item
                  </button>
                </div>

                <div className="space-y-2">
                  {newItems.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-7">
                        <Input
                          required
                          value={item.description}
                          onChange={(e) => handleUpdateItem(idx, 'description', e.target.value)}
                          placeholder="Scope of work or milestone..."
                          className="bg-black/60 border-white/10 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          min={1}
                          required
                          value={item.qty}
                          onChange={(e) => handleUpdateItem(idx, 'qty', parseInt(e.target.value) || 1)}
                          placeholder="Qty"
                          className="bg-black/60 border-white/10 text-white text-xs text-center"
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          type="number"
                          step={100}
                          required
                          value={item.rateAed || ''}
                          onChange={(e) => handleUpdateItem(idx, 'rateAed', parseFloat(e.target.value) || 0)}
                          placeholder="AED Rate"
                          className="bg-black/60 border-white/10 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        {newItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Summary */}
              <div className="p-4 rounded-2xl bg-[#0E131A] border border-white/5 space-y-1.5 font-mono text-right">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-bold">AED {calculatedSubtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>UAE 5% VAT:</span>
                  <span className="text-emerald-400 font-bold">AED {calculatedVat.toLocaleString()}.00</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
                  <span>Total Tax Invoice Amount:</span>
                  <span className="text-emerald-400">AED {calculatedTotal.toLocaleString()}.00</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 font-sans">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateOpen(false)}
                  className="border-white/10 text-slate-300 hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white"
                >
                  Issue & Preview Tax Invoice
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
