import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building, Phone, Calendar, ArrowRight, MessageSquare, ShieldCheck, Check, ExternalLink, Navigation, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DubaiOfficeLocation() {
  const [gstTime, setGstTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'map' | 'photo'>('map');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Gulf Standard Time is UTC+4
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setGstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-10 sm:py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Col: High-Res Dubai HQ Photography / Google Map Embed with Interactive Overlays (6 Cols) */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full overflow-hidden bg-slate-950 group flex flex-col justify-between">
              
              {activeTab === 'photo' ? (
                <>
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85"
                    alt="Radiance ONE Business Center Rigga Al Buteen Nexus IT Services Dubai HQ"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                </>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-slate-900">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.2426262544336!2d55.312678576196944!3d25.262422377669054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d07b5472b05%3A0xc151cdcb4c09549c!2sNexus%20IT%20Services!5e0!3m2!1sen!2sae!4v1790169261594!5m2!1sen!2sae" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Nexus IT Services Dubai Office Map"
                    className="w-full h-full object-cover filter contrast-[1.02]"
                  />
                </div>
              )}
              
              {/* Floating Top Badge with View Mode Switcher */}
              <div className="relative z-10 p-3 sm:p-5 flex items-center justify-between text-white gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-[11px] sm:text-xs font-semibold border border-slate-700/80 shadow-xs">
                  <span className="text-sm">🇦🇪</span>
                  <span>Rigga Al Buteen, Dubai • UAE HQ</span>
                </span>

                {/* Switcher tabs */}
                <div className="flex items-center bg-slate-900/90 backdrop-blur-md p-1 rounded-full border border-slate-700/80 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('map')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'map' ? 'bg-[#0046AF] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    <span>Live Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('photo')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeTab === 'photo' ? 'bg-[#0046AF] text-white shadow-xs' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Photo</span>
                  </button>
                </div>
              </div>

              {/* Bottom Card on Left Col: Real-Time GST Clock & Coordinates */}
              <div className="relative z-10 m-3 sm:m-5 bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                    CURRENT TIME IN DUBAI (GST • GMT+4)
                  </span>
                  <div className="text-lg sm:text-xl font-bold font-mono text-blue-400 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{gstTime || '10:00:00 AM'}</span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-300">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block">
                    VERIFIED LOCATION
                  </span>
                  <span className="font-mono text-blue-300 text-[11px] sm:text-xs">25.2624° N, 55.3127° E</span>
                </div>
              </div>

            </div>

            {/* Right Col: Office Info, Meeting Booking & Fast Track (6 Cols) */}
            <div className="lg:col-span-6 p-5 sm:p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0046AF] text-xs font-bold mb-3 sm:mb-4 border border-blue-100">
                  <Building className="w-3.5 h-3.5" />
                  <span>Physical Presence & Direct Accountability</span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                  Meet Our Solutions Architects in Dubai
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  We believe high-stakes enterprise projects require personal accountability. Our leadership team and senior engineers operate directly from Dubai, ready to meet at your corporate premises or our Radiance ONE Business Center offices.
                </p>

                {/* Locations list */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[#0046AF]" />
                      <span>Headquarters: Radiance ONE Business Center</span>
                    </h4>
                    <p className="text-xs text-slate-600 ml-6 leading-relaxed">
                      9th floor, Dubai Creek Car parking, Rigga Al Buteen, Dubai, UAE
                    </p>
                    <div className="ml-6 mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>Tel: +971 52 6367221</span>
                      <span>•</span>
                      <span>Email: info@nexus.ae.org</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2 mb-1">
                      <Building className="w-4 h-4 text-[#0046AF]" />
                      <span>Technology & R&D Hub: Dubai Internet City (DIC)</span>
                    </h4>
                    <p className="text-xs text-slate-600 ml-6 leading-relaxed">
                      Building 3, Dubai Internet City, Dubai, United Arab Emirates
                    </p>
                  </div>
                </div>

                {/* Trust Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0046AF]" />
                    <span>Free on-site discovery in Dubai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0046AF]" />
                    <span>Same-day NDAs signed locally</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0046AF]" />
                    <span>Direct GST phone hotline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#0046AF]" />
                    <span>DED Commercial License verified</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <Link to="/contact" className="w-full sm:w-auto flex-1">
                  <button className="w-full bg-[#0046AF] hover:bg-[#00388C] text-white font-bold py-3.5 px-6 rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Book In-Person Meeting</span>
                  </button>
                </Link>

                <a
                  href="https://wa.me/971526367221?text=Hello%20Nexus%20IT%20Dubai%2C%20I%20would%20like%20to%20schedule%20an%20in-person%20meeting%20at%20our%20Dubai%20office."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <button className="w-full bg-blue-50 hover:bg-blue-100 text-[#0046AF] border border-blue-200 font-semibold py-3.5 px-6 rounded-full text-xs transition-all flex items-center justify-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#0046AF]" />
                    <span>WhatsApp Direct</span>
                  </button>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
