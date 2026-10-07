import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck, Shield, Award, Scale, ChevronRight, CheckCircle2 } from 'lucide-react';
import { MorphBlock } from '@/components/ui/MorphBlock';

export default function Terms() {
  return (
    <div className="w-full bg-[#F8FAFC] text-slate-900 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Terms of Service</span>
        </div>
      </div>

      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <MorphBlock>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Dubai Commercial Terms & Master Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Terms of Service & SLAs
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            These Terms govern the engagement, provision of technology services, software development, cloud hosting, and advisory solutions provided by Nexus IT Services FZ-LLC to corporate clients.
          </p>
          <div className="mt-4 text-xs font-mono text-slate-500">
            Governing Law: Emirate of Dubai & Federal Laws of the UAE • Effective Date: September 2026
          </div>
        </MorphBlock>
      </section>

      {/* Terms Body */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-12 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
              Company Status & Engagement
            </h2>
            <p className="mb-3">
              Nexus IT Services FZ-LLC is a limited liability company incorporated in Dubai, United Arab Emirates (Commercial License No. 1048291-DXB). 
            </p>
            <p>
              By accessing this website, submitting an inquiry, or signing an individual Statement of Work (SOW), you confirm that you have the corporate authority to bind your organization to these Terms.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
              Intellectual Property & 100% Client Ownership
            </h2>
            <p className="mb-3">
              Unless explicitly specified as a subscription license, all custom software code, application architectures, visual brand assets, and database schemas developed specifically for the client transfer <strong>100% to the client upon settlement of final milestone invoice</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Vendor Lock-In Policy</span>
              </div>
              <p>
                Clients receive full administrative Git repository rights, deployment container images, and documentation upon project handover.
              </p>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">3</span>
              Service Level Agreements (SLAs) & On-Site Support
            </h2>
            <p className="mb-3">
              For contracted enterprise managed services and sovereign cloud hosting:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2 text-slate-600">
              <li><strong>Cloud Uptime:</strong> Guaranteed 99.95% to 99.99% monthly availability for sovereign cloud clusters, backed by financial credits in case of breach.</li>
              <li><strong>Emergency Dispatch:</strong> Guaranteed 15-minute emergency engineer mobilization for critical infrastructure incidents in Downtown Dubai, DIFC, and Dubai Silicon Oasis.</li>
              <li><strong>NOC Coverage:</strong> Continuous 24/7/365 network operations monitoring with proactive security alerting.</li>
            </ul>
          </div>

          <hr className="border-slate-200" />

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">4</span>
              Fees, Commercial Currency & UAE VAT
            </h2>
            <p className="mb-3">
              All commercial proposals and milestone billings are denominated in United Arab Emirates Dirham (AED), with US Dollar (USD) billing options available for international entities.
            </p>
            <p>
              Invoices are subject to 5% UAE Value Added Tax (VAT) in accordance with Federal Decree-Law No. 8 of 2017 on Value Added Tax, unless an eligible export of services exemption applies under statutory regulations.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">5</span>
              Dispute Resolution & Dubai Courts Jurisdiction
            </h2>
            <p className="mb-3">
              These Terms and any contractual disputes shall be governed by and construed in accordance with the substantive laws of the Emirate of Dubai and the Federal Laws of the United Arab Emirates.
            </p>
            <p>
              Parties submit to the exclusive jurisdiction of the competent Dubai Courts, or where designated in an enterprise SOW, the Courts of the Dubai International Financial Centre (DIFC).
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
