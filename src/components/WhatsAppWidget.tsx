import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'callback'>('whatsapp');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [callbackRequested, setCallbackRequested] = useState(false);

  const defaultPrompts = [
    "Hello Nexus! I need an IT & Software quotation for my business in Dubai.",
    "Hi, I want to explore AI automation solutions for our operations.",
    "Looking for a cybersecurity & cloud infrastructure partner in UAE.",
    "Can we book an in-person discovery meeting in Dubai?"
  ];

  const handleSendWhatsApp = (customText?: string) => {
    const textToSend = customText || message || "Hello Nexus IT Services! I'd like to discuss a project in Dubai.";
    const encoded = encodeURIComponent(textToSend);
    
    // Automatically record & forward via OpenWA Gateway
    fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `💬 *Website Chat Lead:*\n${textToSend}`,
        phone: '+971 52 6367221',
        source: 'Website Floating Widget'
      })
    }).catch(() => {});

    window.open(`https://wa.me/971526367221?text=${encoded}`, '_blank');
  };

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setCallbackRequested(true);

    // Send immediate high-priority alert to owner WhatsApp (+971 52 6367221)
    fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `⚡ *URGENT 15-MIN CALLBACK REQUEST*\n━━━━━━━━━━━━━━━━━━━━\n📞 *Client Phone:* ${phone}\n📍 *Source:* Website Floating Widget\n⏱️ *Timestamp:* ${new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai' })} GST`,
        phone: '+971 52 6367221',
        source: 'Emergency Callback Request'
      })
    }).catch(() => {});

    setTimeout(() => {
      setCallbackRequested(false);
      setIsOpen(false);
      setPhone('');
    }, 3000);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-3 sm:mb-4 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans text-slate-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0046AF] to-blue-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-base">
                      N
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-300 border-2 border-[#0046AF] rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm flex items-center gap-1.5">
                      Nexus IT Dubai Support
                      <span className="text-[10px] bg-white/20 text-blue-100 px-1.5 py-0.5 rounded font-mono">GST</span>
                    </h4>
                    <p className="text-xs text-blue-100">Typically replies within 10 mins</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="grid grid-cols-2 gap-1 mt-3 bg-black/20 p-1 rounded-xl text-xs font-medium">
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'whatsapp' ? 'bg-white text-[#0046AF] shadow-xs font-semibold' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Chat
                </button>
                <button
                  onClick={() => setActiveTab('callback')}
                  className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'callback' ? 'bg-white text-[#0046AF] shadow-xs font-semibold' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Request Callback
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 bg-slate-50 min-h-[220px]">
              {activeTab === 'whatsapp' ? (
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-200/80 shadow-xs text-xs text-slate-700 leading-relaxed">
                    مرحباً! Welcome to <strong>Nexus IT Services Dubai</strong>. How can we assist your technology goals today? Select a quick inquiry or write directly:
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Quick Inquiries</p>
                    {defaultPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendWhatsApp(prompt)}
                        className="w-full text-left text-xs bg-white hover:bg-blue-50 hover:text-[#0046AF] hover:border-blue-300 p-2 rounded-lg border border-slate-200 transition-all text-slate-600 block shadow-2xs"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendWhatsApp()}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0046AF]"
                    />
                    <button
                      onClick={() => handleSendWhatsApp()}
                      className="bg-[#0046AF] hover:bg-[#00388C] text-white p-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {callbackRequested ? (
                    <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-[#0046AF]">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h5 className="font-semibold text-sm text-slate-800">Callback Requested!</h5>
                      <p className="text-xs text-slate-500 max-w-[200px]">
                        Our senior tech advisor in Dubai will call you within 15 minutes during GST hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestCallback} className="space-y-3 pt-1">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Leave your UAE or international contact number and our Dubai engineering consultants will ring you right back.
                      </p>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 mb-1 block">Your Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="+971 50 123 4567"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0046AF]"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Operating Hours: Mon - Fri, 9 AM - 6 PM GST</span>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-[#0046AF] hover:bg-[#00388C] text-white font-medium py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Call Me Back
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Bottom trust footer */}
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#0046AF]" /> Dubai Internet City, UAE
              </span>
              <span className="text-[#0046AF] font-semibold">100% Confidential</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-gradient-to-tr from-[#0046AF] to-blue-600 hover:from-[#00388C] hover:to-[#0046AF] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(0,70,175,0.35)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
        aria-label="Contact via WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-400 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white/20" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-xs pl-0 group-hover:pl-2">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
