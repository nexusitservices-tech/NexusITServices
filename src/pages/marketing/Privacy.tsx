import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, Globe, CheckCircle2, ChevronRight, Building2 } from 'lucide-react';
import { MorphBlock } from '@/components/ui/MorphBlock';

export default function Privacy() {
  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <MorphBlock>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>UAE Federal Decree-Law No. 45 on Personal Data Protection (PDPL)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Privacy Policy & Data Sovereignty
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Nexus IT Services FZ-LLC ("Nexus", "we", "our", or "us") is dedicated to protecting client confidential data, enterprise source code, and personal information in full alignment with the statutory laws of Dubai and the United Arab Emirates.
          </p>
          <div className="mt-4 text-xs font-mono text-slate-500">
            Last Updated: September 2026 • Registered Entity: Nexus IT Services FZ-LLC, Dubai, UAE
          </div>
        </MorphBlock>
      </section>

      {/* Policy Content Sections */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
              Statutory Basis & Scope
            </h2>
            <p className="mb-3">
              This Privacy Policy explains how Nexus IT Services collects, processes, and protects your information when you visit our website, consult with our solutions architects, or engage our cloud, software, AI, or creative engineering services.
            </p>
            <p>
              We adhere strictly to <strong>UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection</strong>, relevant Dubai International Financial Centre (DIFC) Data Protection Laws, and guidelines issued by the Telecommunications and Digital Government Regulatory Authority (TDRA).
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
              In-Country UAE Data Residency
            </h2>
            <p className="mb-3">
              Unless explicitly contracted otherwise for global redundancy, all customer communications, technical specifications, and managed database records are stored in sovereign cloud facilities located physically within the United Arab Emirates (including AWS me-central-1 in the UAE and Microsoft Azure UAE North in Dubai).
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Public Model Training Guarantee</span>
              </div>
              <p>
                Proprietary client code, documents uploaded for AI analysis, and operational database records are never used to train public machine learning foundation models.
              </p>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">3</span>
              Information We Collect
            </h2>
            <p className="mb-3">When you interact with our platform or submit inquiries, we may collect:</p>
            <ul className="list-disc list-inside space-y-1.5 ml-2 text-slate-600">
              <li><strong>Contact Identification:</strong> Full name, corporate email address, contact phone number, and job title.</li>
              <li><strong>Corporate Metadata:</strong> Company name, industry vertical, and trade license jurisdiction.</li>
              <li><strong>Project Specifications:</strong> Technical scopes, timeline targets, budget estimates, and architecture requests.</li>
              <li><strong>Telemetry & Security Logs:</strong> IP address, device user-agent, and interaction timestamps for DDoS prevention and threat intelligence.</li>
            </ul>
          </div>

          <hr className="border-slate-200" />

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">4</span>
              Zero-Trust Security & Encryption
            </h2>
            <p className="mb-3">
              We employ enterprise-grade security controls including TLS 1.3 encryption in transit, AES-256 encryption at rest, multi-factor authentication for administrative access, and continuous automated vulnerability scanning.
            </p>
            <p>
              Access to client environments is strictly granted on a least-privilege, need-to-know basis and audited via immutable access logs.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">5</span>
              Data Subject Rights & Contact
            </h2>
            <p className="mb-3">
              Under UAE Federal Decree-Law No. 45, you possess rights to access, correct, restrict processing, or request permanent deletion of your personal data.
            </p>
            <p className="mb-4">
              To exercise these rights or submit a privacy inquiry, please direct correspondence to our Data Protection Officer:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
              <div>Entity: Nexus IT Services FZ-LLC</div>
              <div>Attention: Data Protection & Legal Compliance Officer</div>
              <div>Email: info@nexus.ae.org / legal@nexus.ae.org</div>
              <div>Office: Radiance ONE Business Center 9th floor, Dubai Creek Car parking, Rigga Al Buteen, Dubai, UAE</div>
              <div>Hotline: +971 52 6367221</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
