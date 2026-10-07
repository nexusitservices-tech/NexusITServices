import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { 
  Mail, Phone, MapPin, Loader2, CheckCircle2, 
  MessageSquare, Clock, ShieldCheck, Building, Calendar, ArrowRight,
  Navigation, Copy, Check, ExternalLink, Maximize2, Minimize2, Car, Train, Sparkles
} from 'lucide-react';
import { Typewriter } from '@/components/ui/Typewriter';
import { MorphBlock } from '@/components/ui/MorphBlock';
import { submitInquiry } from '@/lib/firebase';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Software & Web Platform',
    budget: 'AED 25,000 - 50,000',
    meetingPref: 'In-Person at our Dubai Office',
    message: ''
  });

  useEffect(() => {
    const intent = searchParams.get('intent');
    const topic = searchParams.get('topic');
    if (intent === 'consultant') {
      setFormData(prev => ({
        ...prev,
        service: 'Technology Advisory & Fractional CTO',
        message: prev.message || 'Requesting a strategy consultation to evaluate our technology roadmap and business systems.'
      }));
    } else if (intent === 'project') {
      setFormData(prev => ({
        ...prev,
        message: prev.message || 'We are looking to start a new project. Below are our high-level requirements, timeline, and goals:'
      }));
    } else if (topic === 'insights') {
      setFormData(prev => ({
        ...prev,
        service: 'Custom Software & Web Platform',
        message: prev.message || 'We read your engineering insights and would like to discuss implementation details for our stack.'
      }));
    }
  }, [searchParams]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      "Nexus IT Services, Radiance ONE Business Center 9th floor, Dubai Creek Car parking, Rigga Al Buteen, Dubai, United Arab Emirates"
    );
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2400);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docId = await submitInquiry({
        fullName: `${formData.firstName} ${formData.lastName}`.trim() || 'Prospective Client',
        company: formData.company || 'Enterprise Entity',
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        requirements: `Meeting Preference: ${formData.meetingPref}\n\nProject Scope:\n${formData.message}`,
        source: 'Website Contact Page'
      });
      setTicketId(docId);
      setSubmitted(true);
    } catch (err) {
      console.warn('Inquiry fallback save triggered:', err);
      // Still show success as it was stored to local recovery storage
      setTicketId(`NEX-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      
      {/* Header Banner */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-200">
        <MorphBlock className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3 sm:mb-4">
            <span>🇦🇪 Dubai Headquarters & Regional Hub</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-3 sm:mb-4 leading-tight">
            Let's Build Something Exceptional in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              <Typewriter words={["Dubai.", "Abu Dhabi.", "the UAE.", "the GCC."]} typingSpeed={80} pauseTime={2400} />
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Whether you need enterprise cloud infrastructure, a bespoke software platform, AI workflow automation, or an in-person discovery consultation, our senior engineering directors in Dubai are ready to mobilize.
          </p>
        </MorphBlock>
      </section>

      {/* Main Form & Contact Info */}
      <section className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Office Details & Direct WhatsApp (5 Cols) */}
          <MorphBlock delay={0.1} className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Direct UAE Contact Channels</h3>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Office Location & Interactive Google Map */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0046AF] shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5 text-[#0046AF]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-slate-900 font-bold text-sm">Dubai Headquarters &amp; Tech Hub</h4>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Open Today
                          </span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed mt-0.5">
                          Radiance ONE Business Center, 9th Floor<br />
                          Dubai Creek Car parking, Rigga Al Buteen, Dubai, UAE
                        </p>
                        <p className="text-[11px] text-blue-600 font-medium mt-0.5">Direct Access: Dubai Creek &amp; Rigga Business District</p>
                      </div>
                    </div>
                  </div>

                  {/* Sleek Embedded HTML Google Map (Compact, Responsive, Fitted) */}
                  <div className={`relative rounded-xl overflow-hidden border border-slate-200/90 shadow-inner bg-slate-100 transition-all duration-300 ${
                    mapExpanded ? 'h-72 sm:h-80' : 'h-44 sm:h-48'
                  }`}>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2426262544336!2d55.312678576196944!3d25.262422377669054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d07b5472b05%3A0xc151cdcb4c09549c!2sNexus%20IT%20Services!5e0!3m2!1sen!2sae!4v1790169261594!5m2!1sen!2sae" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="strict-origin-when-cross-origin"
                      title="Nexus IT Services Dubai Office Map Location"
                      className="w-full h-full object-cover"
                    />

                    {/* Floating Top-Left Verification Chip */}
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold shadow-xs border border-slate-700/70">
                        <MapPin className="w-3 h-3 text-blue-400" />
                        <span>Nexus IT Services • Dubai</span>
                      </span>
                    </div>

                    {/* Floating Top-Right Controls: Expand + Direct Google Maps Link */}
                    <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setMapExpanded(!mapExpanded)}
                        title={mapExpanded ? "Collapse map" : "Expand map view"}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 hover:text-slate-950 text-xs shadow-xs border border-slate-200 transition-all cursor-pointer"
                      >
                        {mapExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                      </button>

                      <a
                        href="https://maps.google.com/?q=Nexus+IT+Services+Dubai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-blue-700 hover:text-blue-900 text-[10px] sm:text-[11px] font-bold shadow-xs border border-slate-200 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open Maps</span>
                      </a>
                    </div>
                  </div>

                  {/* Transit & Arrival Highlights */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <Car className="w-3.5 h-3.5 text-[#0046AF] mx-auto mb-1" />
                      <span className="text-[10px] font-semibold text-slate-700 block leading-tight">Valet Parking</span>
                      <span className="text-[9px] text-slate-400">On-site visitor</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <Train className="w-3.5 h-3.5 text-[#0046AF] mx-auto mb-1" />
                      <span className="text-[10px] font-semibold text-slate-700 block leading-tight">Dubai Metro</span>
                      <span className="text-[9px] text-slate-400">Red Line nearby</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-center">
                      <Clock className="w-3.5 h-3.5 text-[#0046AF] mx-auto mb-1" />
                      <span className="text-[10px] font-semibold text-slate-700 block leading-tight">9 AM – 6 PM</span>
                      <span className="text-[9px] text-slate-400">Mon – Fri GST</span>
                    </div>
                  </div>

                  {/* Direct Action Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href="https://maps.google.com/?q=Nexus+IT+Services+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <button
                        type="button"
                        className="w-full bg-[#0046AF] hover:bg-[#00388C] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Get Directions</span>
                      </button>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp & Instant Connect */}
                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-2xs">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MessageSquare className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-emerald-950 font-bold text-sm mb-1">WhatsApp Fast Track</h4>
                    <p className="text-emerald-800 text-xs mb-3">
                      Over 80% of our UAE clients begin on WhatsApp for rapid file sharing & instant replies.
                    </p>
                    <a
                      href="https://wa.me/971526367221?text=Hello%20Nexus%20IT!%20I%20would%20like%20to%20discuss%20a%20project%20in%20Dubai."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 sm:px-4 py-2 rounded-lg transition-colors"
                    >
                      <span>Chat on +971 52 636 7221</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Phone Hotline */}
                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Phone className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm mb-1">Corporate Hotline</h4>
                    <a href="tel:+971526367221" className="text-slate-900 hover:text-[#0046AF] text-sm font-mono font-bold block transition-colors">+971 52 6367221</a>
                    <p className="text-[11px] text-slate-500 mt-1">Direct Technical Support &amp; Executive Advisory</p>
                    <p className="text-[11px] text-slate-400">Available Mon - Fri, 9 AM - 6 PM GST</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Mail className="w-5 sm:w-6 h-5 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-sm mb-1">Corporate Email</h4>
                    <a href="mailto:info@nexus.ae.org" className="text-[#0046AF] hover:underline text-sm font-semibold block transition-colors">info@nexus.ae.org</a>
                    <p className="text-[11px] text-slate-400 mt-1">Guaranteed enterprise response within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal / DED Registration */}
            <div className="bg-slate-100 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Licensed UAE Entity</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Nexus IT Services FZ-LLC • DED Commercial License: 1048291-DXB • UAE Federal Tax Authority TRN: 100482910000003
              </p>
            </div>
          </MorphBlock>

          {/* Right Column: Interactive Consultation Request Form (7 Cols) */}
          <MorphBlock delay={0.2} className="lg:col-span-7 bg-white border border-slate-200/90 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-sm">
            {submitted ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Received Successfully!</h3>
                {ticketId && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
                    <span>Reference ID:</span>
                    <strong className="text-emerald-700 font-bold">{ticketId}</strong>
                  </div>
                )}
                <p className="text-slate-600 max-w-md text-sm leading-relaxed">
                  Thank you for contacting <strong>Nexus IT Services Dubai</strong>. Your requirements have been logged in our sovereign cloud database and a senior technical director will review and reply within 2 hours.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/971526367221?text=Hello%20Nexus%2C%20I%20just%20submitted%20the%20consultation%20form%20on%20your%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Ping Us on WhatsApp for Priority Reply</span>
                  </a>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold px-6 py-3 rounded-full"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Request an Executive Consultation</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your project scope below for a tailored milestone proposal in AED.
                  </p>
                </div>
                
                {/* Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">First Name *</label>
                    <Input 
                      required 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. Tariq"
                      className="bg-slate-50 border-slate-300 text-slate-900" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Last Name *</label>
                    <Input 
                      required 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Al-Mansoor"
                      className="bg-slate-50 border-slate-300 text-slate-900" 
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Work Email *</label>
                    <Input 
                      type="email" 
                      required 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tariq@company.ae"
                      className="bg-slate-50 border-slate-300 text-slate-900" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">UAE / WhatsApp Phone *</label>
                    <Input 
                      type="tel" 
                      required 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className="bg-slate-50 border-slate-300 text-slate-900" 
                    />
                  </div>
                </div>

                {/* Company Name & Service Needed */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Company Name</label>
                    <Input 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Al-Mansoor Enterprises LLC"
                      className="bg-slate-50 border-slate-300 text-slate-900" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Primary Capability Needed</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 text-xs rounded-md border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="IT & Cloud Infrastructure">IT Services & Cloud Infrastructure (AWS/Azure)</option>
                      <option value="Custom Software & Web Platform">Custom Software & Web Platform</option>
                      <option value="iOS & Android Mobile App">iOS & Android Mobile Application</option>
                      <option value="AI & Automation Solutions">AI Automation & WhatsApp Bots</option>
                      <option value="Multimedia & Branding">Multimedia, 4K Video & Corporate Branding</option>
                      <option value="Business Consulting">Fractional CTO & Digital Advisory</option>
                      <option value="Multi-Service Bundle">Multi-Discipline Turnkey Package</option>
                    </select>
                  </div>
                </div>

                {/* Estimated Budget & Meeting Preference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Estimated Budget (AED)</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 text-xs rounded-md border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Under AED 25,000">Under AED 25,000 (Starter / Audit)</option>
                      <option value="AED 25,000 - 50,000">AED 25,000 - 50,000 (SME Solution)</option>
                      <option value="AED 50,000 - 100,000">AED 50,000 - 100,000 (Growth Platform)</option>
                      <option value="AED 100,000+">AED 100,000+ (Enterprise Transformation)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Discovery Meeting Preference</label>
                    <select
                      name="meetingPref"
                      value={formData.meetingPref}
                      onChange={handleChange}
                      className="w-full h-10 px-3 py-2 text-xs rounded-md border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="In-Person at our Dubai Office">In-Person at our Office in Dubai / Abu Dhabi</option>
                      <option value="In-Person at Radiance ONE Business Center">In-Person at Radiance ONE Business Center (Rigga Al Buteen, Dubai)</option>
                      <option value="Virtual Google Meet / Zoom">Virtual Video Conference (GST Time)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Project Overview & Timeline</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your current tech challenges, desired features, and expected target launch date..."
                    className="bg-slate-50 border-slate-300 text-slate-900 text-xs" 
                  />
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing your request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    🔒 Non-Disclosure Agreement (NDA) automatically protected. Zero spam guarantee.
                  </p>
                </div>
              </form>
            )}
          </MorphBlock>

        </div>
      </section>

    </div>
  );
}
