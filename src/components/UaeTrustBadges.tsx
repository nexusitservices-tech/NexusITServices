import React from 'react';
import { Shield, Server, Award, CheckCircle2, Lock, Star } from 'lucide-react';

export default function UaeTrustBadges() {
  const credentials = [
    {
      icon: Shield,
      title: 'TDRA Data Compliant',
      desc: 'UAE Federal Decree-Law No. 45 on Personal Data Protection compliant architectures.'
    },
    {
      icon: Server,
      title: 'UAE In-Country Data Residency',
      desc: 'Local hosting nodes in AWS UAE (me-central-1) & Azure UAE North (Dubai).'
    },
    {
      icon: Lock,
      title: 'ISO 27001 Security Standard',
      desc: 'Certified enterprise cybersecurity governance, encryption, and zero-trust controls.'
    },
    {
      icon: Award,
      title: 'DED Commercial Registered',
      desc: 'Licensed UAE entity (Nexus IT Services FZ-LLC) with full legal compliance.'
    },
    {
      icon: Star,
      title: 'Google 4.9★ Rated Partner',
      desc: 'Trusted by 60+ mid-market firms and enterprises across Dubai and the GCC.'
    }
  ];

  return (
    <div className="w-full py-8 sm:py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
            Enterprise Governance & UAE Regulatory Assurance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {credentials.map((cred, i) => {
            const Icon = cred.icon;
            return (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex flex-col items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5">{cred.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{cred.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
