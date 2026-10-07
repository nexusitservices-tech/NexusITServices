import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Server, 
  Smartphone, 
  Key, 
  Copy, 
  Check, 
  Terminal, 
  Globe, 
  BellRing,
  ExternalLink,
  Zap,
  Activity,
  PhoneCall,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { 
  getWhatsAppConfig, 
  saveWhatsAppConfig, 
  checkWhatsAppStatus, 
  sendWhatsAppMessage, 
  getWhatsAppLogs, 
  getWhatsAppQrCode,
  requestWhatsAppPairingCode,
  startWhatsAppSession,
  WhatsAppGatewayConfig, 
  WhatsAppGatewayStatus, 
  WhatsAppMessageLog 
} from '@/lib/whatsappGateway';

export default function WhatsAppGateway() {
  const [config, setConfig] = useState<WhatsAppGatewayConfig>({
    gatewayUrl: 'http://localhost:2785',
    apiKey: 'nexus_openwa_secure_key_2026_dxb',
    sessionId: 'nexus-primary',
    targetNumber: '+971 52 6367221',
    autoNotifyInquiries: true,
    autoNotifyEstimator: true,
    autoNotifyCallbacks: true,
    isConfigured: true,
  });

  const [status, setStatus] = useState<WhatsAppGatewayStatus | null>(null);
  const [logs, setLogs] = useState<WhatsAppMessageLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Test sender state
  const [testMessage, setTestMessage] = useState('Hello from Nexus IT Services website! WhatsApp API Gateway is active.');
  const [testRecipient, setTestRecipient] = useState('+971 52 6367221');
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; note?: string; status?: string } | null>(null);

  // Pairing state
  const [qrData, setQrData] = useState<string | null>(null);
  const [pairingCode, setPairingCode] = useState<string | null>(null);
  const [pairingLoading, setPairingLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const interval = setInterval(refreshStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setStatusLoading(true);
    try {
      const [fetchedConfig, fetchedStatus, fetchedLogs] = await Promise.all([
        getWhatsAppConfig(),
        checkWhatsAppStatus(),
        getWhatsAppLogs(),
      ]);
      setConfig(fetchedConfig);
      setTestRecipient(fetchedConfig.targetNumber || '+971 52 6367221');
      setStatus(fetchedStatus);
      setLogs(fetchedLogs);
    } catch (err) {
      console.error('Error loading WhatsApp Gateway data:', err);
    } finally {
      setStatusLoading(false);
    }
  };

  const refreshStatus = async () => {
    setStatusLoading(true);
    try {
      const s = await checkWhatsAppStatus();
      setStatus(s);
      const l = await getWhatsAppLogs();
      setLogs(l);
    } catch (err) {
      console.error('Error refreshing status:', err);
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveWhatsAppConfig(config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      await refreshStatus();
    } catch (err) {
      console.error('Error saving config:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testMessage.trim()) return;
    setSendingTest(true);
    setTestResult(null);
    try {
      const res = await sendWhatsAppMessage(testMessage, testRecipient, 'Gateway Test Console');
      setTestResult(res);
      const updatedLogs = await getWhatsAppLogs();
      setLogs(updatedLogs);
    } catch (err: any) {
      setTestResult({ success: false, note: err.message, status: 'error' });
    } finally {
      setSendingTest(false);
    }
  };

  const handleGetQr = async () => {
    setPairingLoading(true);
    try {
      await startWhatsAppSession(config.sessionId);
      const res = await getWhatsAppQrCode();
      if (res.qr) {
        setQrData(res.qr);
      } else {
        setQrData(null);
        alert(res.message || 'Session is already connected or QR code not yet emitted by OpenWA.');
      }
    } catch (err: any) {
      alert('Error fetching QR code: ' + err.message);
    } finally {
      setPairingLoading(false);
    }
  };

  const handleRequestPairingCode = async () => {
    setPairingLoading(true);
    try {
      await startWhatsAppSession(config.sessionId);
      const res = await requestWhatsAppPairingCode(config.targetNumber);
      if (res.pairingCode) {
        setPairingCode(res.pairingCode);
      } else {
        alert(res.message || 'Could not generate pairing code. Please verify OpenWA host is running.');
      }
    } catch (err: any) {
      alert('Error requesting pairing code: ' + err.message);
    } finally {
      setPairingLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              OpenWA v0.23 Gateway (rmyndharis/OpenWA)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-[#0046AF]" />
            WhatsApp API Gateway Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Direct real-time WhatsApp integration powered by the self-hosted <a href="https://github.com/rmyndharis/OpenWA.git" target="_blank" rel="noreferrer" className="text-[#0046AF] hover:underline font-semibold">OpenWA Gateway</a>. Dispatches all website inquiries, project quotes, and alerts straight to your phone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={refreshStatus} 
            disabled={statusLoading}
            className="flex items-center gap-2 text-xs font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${statusLoading ? 'animate-spin' : ''}`} />
            Check Connection
          </Button>
          <a
            href="https://github.com/rmyndharis/OpenWA.git"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub Repository
          </a>
        </div>
      </div>

      {/* Gateway Live Status Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Status Card */}
        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            status?.online ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          }`}>
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Gateway Health</div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full ${status?.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              {status?.online ? 'Online & Ready' : 'Simulated / Standby'}
            </div>
          </div>
        </div>

        {/* WhatsApp Recipient Phone */}
        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0046AF] flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Target WhatsApp Phone</div>
            <div className="text-sm font-mono font-bold text-slate-900 mt-0.5">
              {config.targetNumber}
            </div>
          </div>
        </div>

        {/* Active Session */}
        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Session Name</div>
            <div className="text-sm font-mono font-bold text-slate-900 mt-0.5">
              {config.sessionId}
            </div>
          </div>
        </div>

        {/* Engine Type */}
        <div className="p-4 rounded-xl border bg-white shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Engine Architecture</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              Baileys Multi-Device
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Inputs & Quick Test */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Configuration & Prompts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Server className="w-5 h-5 text-[#0046AF]" />
                  OpenWA Gateway Connection Inputs
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure the endpoints to bridge your website leads directly to your WhatsApp.
                </p>
              </div>
              {saveSuccess && (
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Check className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4">
              {/* Input 1: OpenWA Host Base URL */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. OpenWA Gateway URL (Host / Server)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={config.gatewayUrl}
                    onChange={(e) => setConfig({ ...config, gatewayUrl: e.target.value })}
                    placeholder="http://localhost:2785 or https://openwa.yourdomain.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0046AF]/20 focus:border-[#0046AF]"
                    required
                  />
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Default local port is <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">http://localhost:2785</code> when running Docker, or your hosted VPS URL.
                </p>
              </div>

              {/* Input 2: Master / Operator API Key */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  2. OpenWA API Master Key
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.apiKey}
                    onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    placeholder="e.g. nexus_openwa_secure_key_2026_dxb"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0046AF]/20 focus:border-[#0046AF]"
                    required
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Passed in headers as <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">x-api-key</code> for authorization.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input 3: WhatsApp Session Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    3. WhatsApp Session Name
                  </label>
                  <input
                    type="text"
                    value={config.sessionId}
                    onChange={(e) => setConfig({ ...config, sessionId: e.target.value })}
                    placeholder="nexus-primary"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0046AF]/20 focus:border-[#0046AF]"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Internal session identifier for OpenWA multi-tenancy.
                  </p>
                </div>

                {/* Input 4: Target Destination Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    4. Your WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={config.targetNumber}
                    onChange={(e) => setConfig({ ...config, targetNumber: e.target.value })}
                    placeholder="+971 52 6367221"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0046AF]/20 focus:border-[#0046AF]"
                    required
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Auto-formatted to <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">971526367221@c.us</code>.
                  </p>
                </div>
              </div>

              {/* Automated Triggers */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  5. Automatic Dispatch Triggers
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={config.autoNotifyInquiries}
                    onChange={(e) => setConfig({ ...config, autoNotifyInquiries: e.target.checked })}
                    className="w-4 h-4 text-[#0046AF] rounded border-slate-300 focus:ring-[#0046AF]"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Website Contact Form Leads</div>
                    <div className="text-[11px] text-slate-500">Instantly forward contact form submissions with client name, company, email, phone &amp; project brief.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={config.autoNotifyEstimator}
                    onChange={(e) => setConfig({ ...config, autoNotifyEstimator: e.target.checked })}
                    className="w-4 h-4 text-[#0046AF] rounded border-slate-300 focus:ring-[#0046AF]"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Interactive Cost Estimator Quotes</div>
                    <div className="text-[11px] text-slate-500">Send instant WhatsApp summary whenever a client calculates scope in the Cost Estimator.</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={config.autoNotifyCallbacks}
                    onChange={(e) => setConfig({ ...config, autoNotifyCallbacks: e.target.checked })}
                    className="w-4 h-4 text-[#0046AF] rounded border-slate-300 focus:ring-[#0046AF]"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Emergency 15-Minute SLA Callbacks</div>
                    <div className="text-[11px] text-slate-500">High-priority alert ping directly to your phone when enterprise users request immediate dispatch.</div>
                  </div>
                </label>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-[#0046AF] hover:bg-[#003B95] text-white font-semibold py-2.5 text-sm"
                >
                  {loading ? 'Saving Settings...' : 'Save OpenWA Gateway Configuration'}
                </Button>
              </div>
            </form>
          </div>

          {/* Quick Linking: Scan QR or Pairing Code */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <QrCode className="w-5 h-5 text-[#0046AF]" />
              Link Your WhatsApp Mobile Phone
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Open WhatsApp on your physical phone (<code className="font-semibold text-slate-800">{config.targetNumber}</code>) &rarr; Settings &rarr; Linked Devices &rarr; Link a Device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGetQr}
                disabled={pairingLoading}
                className="p-4 rounded-xl border border-dashed border-slate-300 hover:border-[#0046AF] bg-slate-50 hover:bg-blue-50/50 text-left transition-all group"
              >
                <QrCode className="w-6 h-6 text-[#0046AF] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-900">Option 1: Scan QR Code</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Request and display the active WhatsApp Web QR code to scan directly.</div>
              </button>

              <button
                type="button"
                onClick={handleRequestPairingCode}
                disabled={pairingLoading}
                className="p-4 rounded-xl border border-dashed border-slate-300 hover:border-[#0046AF] bg-slate-50 hover:bg-blue-50/50 text-left transition-all group"
              >
                <Smartphone className="w-6 h-6 text-[#0046AF] mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-900">Option 2: 8-Digit Pairing Code</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Get an 8-character numeric code to enter in WhatsApp without camera.</div>
              </button>
            </div>

            {/* Display pairing code if generated */}
            {pairingCode && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-900">Your WhatsApp Pairing Code:</div>
                  <div className="text-2xl font-mono font-black text-emerald-800 tracking-wider mt-1">{pairingCode}</div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => copyToClipboard(pairingCode, 'pair')}
                  className="text-xs bg-white"
                >
                  {copiedKey === 'pair' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Code
                </Button>
              </div>
            )}

            {/* Display QR code if generated */}
            {qrData && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-xs font-bold text-slate-800 mb-2">Scan with WhatsApp:</div>
                <img src={qrData} alt="WhatsApp QR Code" className="w-48 h-48 mx-auto rounded-lg shadow-sm border border-slate-200" />
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Live Direct Test & Instructions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Test Sender Console */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Send className="w-5 h-5 text-emerald-600" />
              Send Live Test Message
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Dispatch an instant test message to verify delivery to your phone.
            </p>

            <form onSubmit={handleSendTestMessage} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recipient Number:
                </label>
                <input
                  type="text"
                  value={testRecipient}
                  onChange={(e) => setTestRecipient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message Content:
                </label>
                <textarea
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 leading-relaxed focus:bg-white focus:ring-2 focus:ring-[#0046AF]/20 focus:border-[#0046AF]"
                  required
                />
              </div>

              {/* Template shortcuts */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setTestMessage("🔥 Test Lead: Tech consultation for Dubai Fintech entity (Scope: ERP Cloud Migration, AED 75,000).")}
                  className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded transition-colors"
                >
                  Template: New Lead
                </button>
                <button
                  type="button"
                  onClick={() => setTestMessage("⚡ High-Priority SLA Alert: Enterprise Client requested 15-minute engineer callback.")}
                  className="text-[10px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded transition-colors"
                >
                  Template: SLA Ping
                </button>
              </div>

              <Button
                type="submit"
                disabled={sendingTest}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 text-xs flex items-center justify-center gap-2"
              >
                <Send className={`w-3.5 h-3.5 ${sendingTest ? 'animate-bounce' : ''}`} />
                {sendingTest ? 'Transmitting via Gateway...' : `Send to My WhatsApp (${config.targetNumber})`}
              </Button>

              {testResult && (
                <div className={`p-3 rounded-lg text-xs ${
                  testResult.success 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-600" />}
                    {testResult.success ? 'Message Dispatched!' : 'Delivery Notice'}
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed">
                    {testResult.note}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Turnkey Deployment Kit Card */}
          <div className="bg-slate-900 rounded-2xl text-slate-100 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-5 h-5 text-blue-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                1-Click Docker Hosting Kit
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Deploy your own dedicated OpenWA WhatsApp gateway container on any VPS or Docker host with one command:
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 relative">
              <code>
                git clone https://github.com/rmyndharis/OpenWA.git<br />
                cd OpenWA &amp;&amp; docker compose up -d
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard('git clone https://github.com/rmyndharis/OpenWA.git && cd OpenWA && docker compose up -d', 'cmd')}
                className="absolute right-2 top-2 p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Copy command"
              >
                {copiedKey === 'cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Full configuration files bundled in <code className="text-blue-300">/deploy/openwa/</code></span>
            </div>
          </div>
        </div>
      </div>

      {/* Outbound WhatsApp Message Dispatch Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-[#0046AF]" />
              WhatsApp Message Dispatch Logs
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              History of outbound notifications sent from website visitors to your WhatsApp.
            </p>
          </div>
          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {logs.length} Total Messages
          </span>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            No WhatsApp messages dispatched yet. Submit a contact inquiry or send a test above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Recipient</th>
                  <th className="py-2.5 px-3">Message Preview</th>
                  <th className="py-2.5 px-3 text-right">Delivery Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-800 whitespace-nowrap">
                      {log.source}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {log.recipient}
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-md truncate">
                      {log.message}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        log.status === 'delivered' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : log.status === 'simulated'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {log.status === 'delivered' ? 'Delivered' : 'Queued / Dispatched'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
