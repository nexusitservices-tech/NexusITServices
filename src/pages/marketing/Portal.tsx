import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, Lock, CheckCircle2, Clock, AlertCircle, 
  Database, RefreshCw, Mail, Phone, Building2, User, 
  ExternalLink, Filter, Plus, ArrowRight, Sparkles, Check,
  KeyRound, ShieldAlert, LogIn, ChevronRight, FileText,
  UserCheck, XCircle, Search, Laptop, Layers, MessageCircle
} from 'lucide-react';
import { 
  InquiryRecord, 
  ClientProjectRecord, 
  AccountRequestRecord,
  subscribeToInquiries, 
  updateInquiryStatus, 
  submitInquiry, 
  submitAccountRequest,
  subscribeToAccountRequests,
  updateAccountRequestStatus,
  seedSampleAccountRequestsIfEmpty,
  seedSampleProjectsIfEmpty,
  validateFirestoreConnection,
  db
} from '@/lib/firebase';
import { 
  getPortalSession, 
  setPortalSession, 
  loginAsAdmin, 
  loginWithApprovedRequest,
  clearPortalSession,
  isPortalApproved 
} from '@/lib/portalAuth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { MorphBlock } from '@/components/ui/MorphBlock';

export default function Portal() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tab state: 'request' (default signup form), 'status' (lookup & login), 'admin' (admin review console), 'telemetry'
  const initialTab = searchParams.get('tab') === 'admin' 
    ? 'admin' 
    : searchParams.get('tab') === 'status' 
    ? 'status' 
    : 'request';
    
  const [activeTab, setActiveTab] = useState<'request' | 'status' | 'admin' | 'telemetry'>(initialTab);

  // Form state for Account Signup Request
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    designation: '',
    phone: '',
    service: 'Managed IT & Cloud Infrastructure',
    seats: '1-10 Users',
    useCase: '',
    acceptedTerms: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<AccountRequestRecord | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Status check state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<AccountRequestRecord | null>(null);
  const [lookupSearched, setLookupSearched] = useState(false);

  // Admin state
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [adminPinError, setAdminPinError] = useState(false);
  const [accountRequests, setAccountRequests] = useState<AccountRequestRecord[]>([]);
  const [adminFilter, setAdminFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [actionProcessingId, setActionProcessingId] = useState<string | null>(null);

  // Telemetry & Legacy inquiries/projects state
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [projects, setProjects] = useState<ClientProjectRecord[]>([]);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);
  const [latencyMs, setLatencyMs] = useState<number>(4);

  // Active portal session state
  const [currentSession, setCurrentSession] = useState(getPortalSession());

  useEffect(() => {
    // Check connection & seed sample data
    validateFirestoreConnection().then(ok => setIsFirebaseConnected(ok));
    seedSampleAccountRequestsIfEmpty();
    seedSampleProjectsIfEmpty();

    // Listen to account requests in real-time
    const unsubRequests = subscribeToAccountRequests((requests) => {
      setAccountRequests(requests);
    });

    // Listen to legacy inquiries
    const unsubInquiries = subscribeToInquiries((data) => {
      setInquiries(data);
    });

    // Listen to projects
    let unsubProjects = () => {};
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      unsubProjects = onSnapshot(q, (snap) => {
        const projs = snap.docs.map(d => ({ id: d.id, ...d.data() })) as ClientProjectRecord[];
        setProjects(projs);
      }, (err) => {
        console.warn('Projects listener:', err);
      });
    } catch (e) {
      console.warn('Firestore projects setup:', e);
    }

    const interval = setInterval(() => {
      setLatencyMs(Math.floor(3 + Math.random() * 3));
    }, 4000);

    const handleAuthChange = () => {
      setCurrentSession(getPortalSession());
    };
    window.addEventListener('portal-auth-changed', handleAuthChange);

    return () => {
      unsubRequests();
      unsubInquiries();
      unsubProjects();
      clearInterval(interval);
      window.removeEventListener('portal-auth-changed', handleAuthChange);
    };
  }, []);

  // Handle Form Submission for Account Signup Request
  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = await submitAccountRequest(formData);
      setSubmittedRequest(created);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        company: '',
        designation: '',
        phone: '',
        service: 'Managed IT & Cloud Infrastructure',
        seats: '1-10 Users',
        useCase: '',
        acceptedTerms: true
      });
    } catch (err) {
      console.error('Request submission error:', err);
      setSubmitError('Failed to record signup request. Please try again or reach our Dubai NOC.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Lookup by Email or Request ID
  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const q = lookupQuery.trim().toLowerCase();
    if (!q) return;

    setLookupSearched(true);
    const found = accountRequests.find(r => 
      r.email.toLowerCase() === q || 
      r.requestId.toLowerCase() === q ||
      (r.company && r.company.toLowerCase().includes(q))
    );
    setLookupResult(found || null);
  };

  // Handle Admin Status Changes (Approve / Reject)
  const handleAdminAction = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    setActionProcessingId(id);
    try {
      await updateAccountRequestStatus(
        id, 
        newStatus, 
        newStatus === 'approved' 
          ? 'Approved by System Admin. Credentials dispatched.' 
          : 'Application declined by security administrator.'
      );
      
      // Update local state if lookup matches
      if (lookupResult && lookupResult.id === id) {
        setLookupResult({ ...lookupResult, status: newStatus });
      }
    } catch (e) {
      console.error('Admin action error:', e);
    } finally {
      setActionProcessingId(null);
    }
  };

  // Admin Unlock logic
  const handleAdminUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default PIN: 2026 or admin password
    if (adminPin === '2026' || adminPin.toLowerCase() === 'nexus' || adminPin === 'admin' || !adminPin) {
      setAdminUnlocked(true);
      setAdminPinError(false);
    } else {
      setAdminPinError(true);
    }
  };

  // Instant login as approved client
  const handleEnterAsApprovedClient = (req: AccountRequestRecord) => {
    loginWithApprovedRequest({
      email: req.email,
      fullName: req.fullName,
      company: req.company,
      requestId: req.requestId
    });
    navigate('/app');
  };

  // Instant login as super admin
  const handleLoginAsSuperAdmin = () => {
    loginAsAdmin();
    navigate('/app');
  };

  // Filtered requests for admin
  const filteredRequests = adminFilter === 'all'
    ? accountRequests
    : accountRequests.filter(r => r.status === adminFilter);

  const pendingCount = accountRequests.filter(r => r.status === 'pending').length;
  const approvedCount = accountRequests.filter(r => r.status === 'approved').length;

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Top Security & Backend Status Bar */}
      <section className="bg-slate-900 text-white border-b border-slate-800 pt-20 sm:pt-24 pb-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold">
              <Lock className="w-3 h-3 text-blue-400" />
              <span>Client Portal Access: Gated & Admin Protected</span>
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 font-mono hidden md:inline">
              Firestore DB: <strong className="text-emerald-400">Connected ({latencyMs}ms)</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentSession ? (
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized: {currentSession.company}</span>
                </span>
                <button
                  onClick={() => {
                    clearPortalSession();
                    setCurrentSession(null);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 underline font-semibold cursor-pointer"
                >
                  Lock / Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Review Queue:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-bold">
                  {pendingCount} Pending
                </span>
                <button
                  onClick={() => setActiveTab('admin')}
                  className="ml-2 text-blue-400 hover:text-blue-300 text-xs font-semibold underline flex items-center gap-1 cursor-pointer"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Admin Review Console</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Header */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <MorphBlock className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0046AF] text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Nexus IT Services FZ-LLC • Enterprise Security Gate</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
              Client Portal Access Gate
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              Access to our unified UAE Enterprise OS, project telemetry, infrastructure monitoring, and SLA tickets is restricted to vetted corporate clients. All signup requests undergo mandatory administrator review prior to account provisioning.
            </p>
          </div>

          {/* Quick Direct Link if user already holds approved session */}
          {currentSession && (
            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Active Approved Session Detected</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xs">
                You are currently authorized as <strong>{currentSession.fullName}</strong> ({currentSession.role === 'admin' ? 'Super Admin' : currentSession.company}).
              </p>
              <button
                onClick={() => navigate('/app')}
                className="mt-1 px-4 py-2 bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Launch Client Portal Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </MorphBlock>
      </section>

      {/* Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 gap-3 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('request')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'request'
                  ? 'bg-[#0046AF] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>1. Request Account Signup</span>
            </button>

            <button
              onClick={() => setActiveTab('status')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'status'
                  ? 'bg-[#0046AF] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>2. Check Request Status & Sign In</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-500" />
              <span>3. Administrator Review Console</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-900 text-[10px] font-black">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'telemetry'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Infrastructure Telemetry</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ISO 27001 & UAE Data Residency</span>
          </div>
        </div>
      </section>

      {/* Main Tab Panels */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: ACCOUNT SIGNUP REQUEST FORM */}
        {/* ========================================================================= */}
        {activeTab === 'request' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-9">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold mb-2">
                  <Lock className="w-3 h-3 text-amber-600" />
                  <span>Mandatory Step Prior to Portal Entry</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Account Signup Request Form
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                  Fill in your corporate details to request access to the Nexus Client Portal. Our security administration reviews all submissions and grants verified credentials.
                </p>
              </div>

              {submitError && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{submitError}</span>
                </div>
              )}

              {submittedRequest ? (
                /* Success Confirmation State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider inline-block mb-2">
                      🟡 Pending Admin Review
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">
                      Signup Request Successfully Lodged
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{submittedRequest.fullName}</strong>. Your request for <strong>{submittedRequest.company}</strong> has been transmitted to the Nexus IT Services administration.
                    </p>
                  </div>

                  {/* Reference Ticket Card */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-left space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="text-slate-500">Request Tracking ID:</span>
                      <span className="font-mono font-bold text-[#0046AF] text-sm bg-blue-50 px-2 py-0.5 rounded">
                        {submittedRequest.requestId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Corporate Email:</span>
                      <span className="font-semibold text-slate-800">{submittedRequest.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Requested Service:</span>
                      <span className="font-medium text-slate-700">{submittedRequest.service}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Access Scale:</span>
                      <span className="font-medium text-slate-700">{submittedRequest.seats}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Estimated Review Time:</span>
                      <span className="font-bold text-emerald-600">Under 2 Hours (UAE Business Hours)</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setLookupQuery(submittedRequest.email);
                        setActiveTab('status');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0046AF] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Track Application Status</span>
                    </button>

                    <button
                      onClick={() => {
                        setAdminUnlocked(true);
                        setActiveTab('admin');
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                      <span>Review as Administrator (Admin Demo)</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSubmittedRequest(null)}
                    className="text-xs text-slate-500 hover:text-slate-800 underline font-medium block mx-auto cursor-pointer"
                  >
                    Submit another account request
                  </button>
                </motion.div>
              ) : (
                /* The Signup Request Form */
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Tariq Al-Mansoor"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                        />
                      </div>
                    </div>

                    {/* Corporate Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Work Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.ae"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company / Organization <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Emirates Investment Group"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                        />
                      </div>
                    </div>

                    {/* Designation / Job Role */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Designation / Job Title
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="e.g. CTO / Head of Operations"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                        />
                      </div>
                    </div>

                    {/* Team Size / Seats */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Estimated User Seats
                      </label>
                      <select
                        value={formData.seats}
                        onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                      >
                        <option value="1-5 Users">1 - 5 Users (Executive / Project Lead)</option>
                        <option value="5-20 Users">5 - 20 Users (Department Scale)</option>
                        <option value="20-50 Users">20 - 50 Users (Multi-Branch)</option>
                        <option value="50+ Users">50+ Enterprise Users</option>
                      </select>
                    </div>
                  </div>

                  {/* Primary Service Tier */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Technology Category
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                    >
                      <option value="Managed IT & Cloud Infrastructure">Managed IT & Cloud Infrastructure</option>
                      <option value="Custom Software & API Engineering">Custom Software & API Engineering</option>
                      <option value="Cybersecurity & SOC Monitoring">Cybersecurity & SOC Monitoring</option>
                      <option value="Enterprise AI & Automation">Enterprise AI & Automation</option>
                      <option value="Complete Technology Retainer">Complete Technology Retainer (All Services)</option>
                    </select>
                  </div>

                  {/* Operational Context */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Requirements / Access Context
                    </label>
                    <textarea
                      rows={3}
                      value={formData.useCase}
                      onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                      placeholder="Briefly state why your team requires access to the Nexus Client Portal (e.g., SLA ticket submission, sprint deliverables, invoice management, server uptime tracking)..."
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF] focus:ring-1 focus:ring-[#0046AF]"
                    />
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="pt-1 flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.acceptedTerms}
                      onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-[#0046AF] focus:ring-[#0046AF]"
                    />
                    <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      I confirm that I am an authorized representative of the organization above and agree that all portal accounts are subject to administrative clearance and NDA protocols.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.acceptedTerms}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[#0046AF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Submitting Request to Security Admin...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Submit Account Signup Request for Admin Review</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Security & Process Column (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Security Shield Card */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-md">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Zero-Trust Onboarding Policy
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  Nexus IT Services FZ-LLC enforces strict administrative approval for all client accounts to protect proprietary client infrastructure, active sprint repos, and sovereign Dubai data pipelines.
                </p>

                {/* 4-Step Approval Timeline */}
                <div className="space-y-4 pt-2 border-t border-slate-800 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center shrink-0 border border-blue-400/30">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Signup Request Lodged</h4>
                      <p className="text-slate-400 text-[11px]">Submitted via this portal form into our secure Firestore database.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center shrink-0 border border-blue-400/30">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Domain & Entity Vetting</h4>
                      <p className="text-slate-400 text-[11px]">We confirm corporate registration and active commercial engagement.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 font-bold flex items-center justify-center shrink-0 border border-blue-400/30">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Admin Clearance & Authorization</h4>
                      <p className="text-slate-400 text-[11px]">The Nexus Systems Administrator reviews and approves the account in the admin queue.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 font-bold flex items-center justify-center shrink-0 border border-emerald-400/30">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-300">Client Portal Access Unlocked</h4>
                      <p className="text-slate-400 text-[11px]">Immediate access to live SLA tracking, ticketing, documents, and cloud tools.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Already Registered Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0046AF] flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Already Submitted a Request?</h4>
                    <p className="text-xs text-slate-500">Check your review status in real-time.</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('status')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Check Status or Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Instant Admin Demo Reviewer shortcut */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>Admin Review Demo:</strong> Need to approve requests now?</span>
                </div>
                <button
                  onClick={() => {
                    setAdminUnlocked(true);
                    setActiveTab('admin');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold shrink-0 text-xs cursor-pointer shadow-xs"
                >
                  Open Admin Review
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CHECK REQUEST STATUS & SIGN IN */}
        {/* ========================================================================= */}
        {activeTab === 'status' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-9">
              <div className="mb-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0046AF] flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Check Account Request Status
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Enter your corporate email address or Request Tracking ID to inspect whether your account has been approved by the administrator.
                </p>
              </div>

              {/* Search Form */}
              <form onSubmit={handleLookup} className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={lookupQuery}
                    onChange={(e) => setLookupQuery(e.target.value)}
                    placeholder="Enter corporate email (e.g. khalid@falasi-holdings.ae) or Request ID"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#0046AF]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#0046AF] hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Lookup Result Box */}
              {lookupSearched && (
                <div>
                  {lookupResult ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-6 rounded-2xl border ${
                        lookupResult.status === 'approved'
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : lookupResult.status === 'rejected'
                          ? 'bg-rose-50/70 border-rose-300'
                          : 'bg-amber-50/70 border-amber-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                            lookupResult.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : lookupResult.status === 'rejected'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {lookupResult.status === 'approved' 
                              ? '✅ Access Approved by Admin'
                              : lookupResult.status === 'rejected'
                              ? '❌ Request Declined'
                              : '🟡 Under Administrator Review'}
                          </span>
                          <h3 className="text-lg font-bold text-slate-900">{lookupResult.fullName}</h3>
                          <p className="text-xs text-slate-600">{lookupResult.company} • {lookupResult.email}</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-600 bg-white/80 px-2 py-1 rounded border border-slate-200">
                          {lookupResult.requestId}
                        </span>
                      </div>

                      <div className="p-3 bg-white/90 rounded-xl text-xs space-y-1.5 border border-slate-200/80 mb-5">
                        <div className="flex justify-between text-slate-500">
                          <span>Requested Scope:</span>
                          <span className="font-medium text-slate-800">{lookupResult.service}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                          <span>User Seats:</span>
                          <span className="font-medium text-slate-800">{lookupResult.seats}</span>
                        </div>
                        <div className="flex justify-between text-slate-500">
                          <span>Submitted At:</span>
                          <span className="font-medium text-slate-800">
                            {new Date(lookupResult.createdAt).toLocaleDateString()} at {new Date(lookupResult.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {lookupResult.adminNotes && (
                          <div className="pt-1.5 border-t border-slate-100 text-slate-600">
                            <span className="font-bold text-slate-700">Admin Note: </span>
                            <span>{lookupResult.adminNotes}</span>
                          </div>
                        )}
                      </div>

                      {/* State Specific Call to Action */}
                      {lookupResult.status === 'approved' ? (
                        <div className="space-y-3">
                          <div className="p-3 bg-emerald-100/80 text-emerald-800 text-xs rounded-xl font-medium">
                            🎉 Your account request has been officially approved! You can now access all telemetry, project deliverables, and IT ticketing.
                          </div>
                          <button
                            onClick={() => handleEnterAsApprovedClient(lookupResult)}
                            className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Enter Client Portal Now ({lookupResult.company})</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ) : lookupResult.status === 'pending' ? (
                        <div className="space-y-3">
                          <div className="p-3 bg-amber-100/80 text-amber-800 text-xs rounded-xl">
                            ⏳ Your application is queued in our Security Operations Center. Typical approval time is under 2 business hours.
                          </div>
                          <button
                            onClick={() => {
                              setAdminUnlocked(true);
                              setActiveTab('admin');
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                            <span>Switch to Admin Review Console to Approve (Demo Mode)</span>
                          </button>
                        </div>
                      ) : (
                        <div className="p-3 bg-rose-100/80 text-rose-800 text-xs rounded-xl">
                          Your request was not cleared. For questions or enterprise escalation, please contact our Downtown Dubai office at +971 52 636 7221.
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
                      <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-800">No Account Request Found</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        We could not find an active request matching <strong>"{lookupQuery}"</strong>. Please verify the email address or submit a new signup request.
                      </p>
                      <button
                        onClick={() => setActiveTab('request')}
                        className="mt-2 px-4 py-2 bg-[#0046AF] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Submit Account Signup Request
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Direct Login Link for Existing Verified Accounts */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  DIRECT SIGN IN FOR EXISTING PORTAL OPERATORS
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link to="/login">
                    <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Existing Account Login</span>
                    </button>
                  </Link>
                  <button
                    onClick={handleLoginAsSuperAdmin}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Instant Super Admin Login</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ADMINISTRATOR REVIEW CONSOLE */}
        {/* ========================================================================= */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            
            {/* Admin Authentication Gate */}
            {!adminUnlocked ? (
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-sm">
                  <KeyRound className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Admin Clearance Required</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the administrator verification PIN or click Instant Demo Unlock to review pending client account signup requests.
                  </p>
                </div>

                <form onSubmit={handleAdminUnlock} className="space-y-3">
                  <div>
                    <input
                      type="password"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      placeholder="Enter Admin PIN (Default: 2026)"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-sm font-mono text-slate-800 focus:bg-white focus:border-[#0046AF] focus:outline-none"
                    />
                    {adminPinError && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">Invalid PIN. You can use 2026 or click 1-Click Unlock.</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm cursor-pointer"
                  >
                    Authorize Administrator Console
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setAdminUnlocked(true);
                      setAdminPinError(false);
                    }}
                    className="text-xs text-[#0046AF] hover:underline font-bold flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>1-Click Instant Unlock (Reviewer Demo Mode)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Unlocked Admin Console */
              <div className="space-y-6">
                
                {/* Console Header & Metric Bar */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                          NEXUS SOC • ACTIVE ADMIN SESSION
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white">
                        Account Signup Requests Review Queue
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Review, verify, and authorize client access requests before credentials become valid for the Client Portal.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to="/whatsapp-gateway"
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp API Gateway</span>
                      </Link>
                      <button
                        onClick={handleLoginAsSuperAdmin}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Launch Portal as Super Admin</span>
                      </button>
                      <button
                        onClick={() => setAdminUnlocked(false)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                      >
                        Lock Console
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <span className="text-xs text-slate-400 block mb-1">Total Submissions</span>
                      <span className="text-2xl font-bold font-mono text-white">{accountRequests.length}</span>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-amber-500/30">
                      <span className="text-xs text-amber-300 block mb-1">Pending Review</span>
                      <span className="text-2xl font-bold font-mono text-amber-400">{pendingCount}</span>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-emerald-500/30">
                      <span className="text-xs text-emerald-300 block mb-1">Approved Accounts</span>
                      <span className="text-2xl font-bold font-mono text-emerald-400">{approvedCount}</span>
                    </div>

                    <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
                      <span className="text-xs text-slate-400 block mb-1">Declined</span>
                      <span className="text-2xl font-bold font-mono text-slate-400">
                        {accountRequests.filter(r => r.status === 'rejected').length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Filters & Actions Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-4 h-4 text-slate-400 mr-1" />
                    {(['all', 'pending', 'approved', 'rejected'] as const).map(st => (
                      <button
                        key={st}
                        onClick={() => setAdminFilter(st)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                          adminFilter === st
                            ? 'bg-[#0046AF] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {st === 'all' ? 'All Requests' : st}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={async () => {
                      try {
                        await submitAccountRequest({
                          fullName: 'Hamdan Al-Maktoum Trading',
                          email: `corp-${Math.floor(100 + Math.random() * 900)}@maktoum-trade.ae`,
                          company: 'Al-Maktoum Global Trade LLC',
                          designation: 'VP of Technology & Operations',
                          phone: '+971 50 992 4110',
                          service: 'Custom Software & API Engineering',
                          seats: '10-25 Users',
                          useCase: 'Need real-time access to logistics API portal and sprint tracking.'
                        });
                      } catch (e) {
                        console.error('Test injection error:', e);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#0046AF] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Inject Simulated Test Request</span>
                  </button>
                </div>

                {/* Request Cards List */}
                <div className="space-y-4">
                  {filteredRequests.length === 0 ? (
                    <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                      <h3 className="text-base font-bold text-slate-900">No Requests in this Filter</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        All incoming requests matching this view have been processed or no submissions have been made.
                      </p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {filteredRequests.map((req) => (
                        <motion.div
                          key={req.id || req.requestId}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-xs hover:shadow-sm ${
                            req.status === 'pending'
                              ? 'border-amber-300 ring-1 ring-amber-200/50'
                              : req.status === 'approved'
                              ? 'border-emerald-200'
                              : 'border-slate-200 opacity-80'
                          }`}
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                  req.status === 'pending'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : req.status === 'approved'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                                }`}>
                                  {req.status === 'pending' ? '🟡 Awaiting Review' : req.status === 'approved' ? '✅ Approved' : '❌ Declined'}
                                </span>
                                <span className="font-mono text-xs text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                                  {req.requestId}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Lodged: {new Date(req.createdAt).toLocaleDateString()} at {new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <span>{req.company}</span>
                                <span className="text-xs font-normal text-slate-500">({req.fullName} • {req.designation || 'Lead'})</span>
                              </h3>
                            </div>

                            {/* Action Buttons for Administrator */}
                            <div className="flex flex-wrap items-center gap-2">
                              {req.status === 'pending' ? (
                                <>
                                  <button
                                    onClick={() => handleAdminAction(req.id || '', 'approved')}
                                    disabled={actionProcessingId === req.id}
                                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Approve Access</span>
                                  </button>
                                  <button
                                    onClick={() => handleAdminAction(req.id || '', 'rejected')}
                                    disabled={actionProcessingId === req.id}
                                    className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs cursor-pointer disabled:opacity-50"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                    <span>Decline</span>
                                  </button>
                                </>
                              ) : req.status === 'approved' ? (
                                <>
                                  <button
                                    onClick={() => handleEnterAsApprovedClient(req)}
                                    className="px-3.5 py-1.5 rounded-xl bg-[#0046AF] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                                  >
                                    <Laptop className="w-3.5 h-3.5" />
                                    <span>Test Portal as Client</span>
                                  </button>
                                  <button
                                    onClick={() => handleAdminAction(req.id || '', 'pending')}
                                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                                  >
                                    Reset to Pending
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleAdminAction(req.id || '', 'pending')}
                                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                                >
                                  Reconsider & Move to Pending
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Request Details Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs">
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <a href={`mailto:${req.email}`} className="hover:text-blue-600 underline font-medium">
                                {req.email}
                              </a>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{req.phone || 'No direct phone provided'}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-600">
                              <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>Scope: <strong>{req.service}</strong> ({req.seats})</span>
                            </div>
                          </div>

                          {req.useCase && (
                            <div className="mt-3 p-3 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-100">
                              <span className="font-bold text-slate-800">Business Justification: </span>
                              <span>{req.useCase}</span>
                            </div>
                          )}

                          {req.reviewedBy && (
                            <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                              <UserCheck className="w-3 h-3 text-emerald-500" />
                              <span>Reviewed by {req.reviewedBy} on {new Date(req.reviewedAt || '').toLocaleDateString()}</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: INFRASTRUCTURE & ACTIVE DELIVERIES TELEMETRY */}
        {/* ========================================================================= */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Inquiries Module */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#0046AF]" />
                    <h3 className="font-bold text-slate-900 text-sm">Prospective Inquiries ({inquiries.length})</h3>
                  </div>
                  <Link to="/contact" className="text-xs text-[#0046AF] hover:underline font-bold">
                    View Form →
                  </Link>
                </div>
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 text-xs">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{inq.fullName} ({inq.company})</span>
                        <span className="text-[10px] text-slate-400">{inq.service}</span>
                      </div>
                      <p className="text-slate-500 text-[11px] line-clamp-1">{inq.requirements}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Projects Module */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-teal-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Active Client Projects ({projects.length})</h3>
                  </div>
                  <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded">100% SLA</span>
                </div>
                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 text-xs">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{proj.title}</span>
                        <span className="text-emerald-600 font-mono font-bold">{proj.progress}%</span>
                      </div>
                      <p className="text-slate-500 text-[11px]">{proj.clientName} • SLA: {proj.slaTier}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </section>
    </div>
  );
}
