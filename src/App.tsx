/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import MarketingLayout from '@/layouts/MarketingLayout';
import Home from '@/pages/marketing/Home';

// Lazy-load secondary marketing pages for rapid mobile load speed
const About = lazy(() => import('@/pages/marketing/About'));
const Services = lazy(() => import('@/pages/marketing/Services'));
const Solutions = lazy(() => import('@/pages/marketing/Solutions'));
const SolutionDetail = lazy(() => import('@/pages/marketing/SolutionDetail'));
const Contact = lazy(() => import('@/pages/marketing/Contact'));
const Portal = lazy(() => import('@/pages/marketing/Portal'));
const Privacy = lazy(() => import('@/pages/marketing/Privacy'));
const Terms = lazy(() => import('@/pages/marketing/Terms'));
const CaseStudies = lazy(() => import('@/pages/marketing/CaseStudies'));
const Careers = lazy(() => import('@/pages/marketing/Careers'));
const FAQ = lazy(() => import('@/pages/marketing/FAQ'));
const Estimator = lazy(() => import('@/pages/marketing/Estimator'));
const ITServicesPage = lazy(() => import('@/pages/marketing/ITServicesPage'));
const SoftwareDevelopmentPage = lazy(() => import('@/pages/marketing/SoftwareDevelopmentPage'));
const Industries = lazy(() => import('@/pages/marketing/Industries'));
const HowWeWork = lazy(() => import('@/pages/marketing/HowWeWork'));
const Insights = lazy(() => import('@/pages/marketing/Insights'));
const DesignSystemShowcase = lazy(() => import('@/pages/marketing/DesignSystemShowcase'));

// Lazy-load Auth Layout & Pages
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const Login = lazy(() => import('@/pages/auth/Login'));

// Lazy-load App/Dashboard Layout & Admin Modules
const AppLayout = lazy(() => import('@/layouts/AppLayout'));
const Dashboard = lazy(() => import('@/pages/app/Dashboard'));
const CRM = lazy(() => import('@/pages/app/CRM'));
const Tickets = lazy(() => import('@/pages/app/Tickets'));
const Finance = lazy(() => import('@/pages/app/Finance'));
const Projects = lazy(() => import('@/pages/app/Projects'));
const Documents = lazy(() => import('@/pages/app/Documents'));
const AI = lazy(() => import('@/pages/app/AI'));
const Settings = lazy(() => import('@/pages/app/Settings'));
const WhatsAppGateway = lazy(() => import('@/pages/app/WhatsAppGateway'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function PageSuspenseFallback() {
  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-slate-200 border-t-[#0046AF] rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageSuspenseFallback />}>
        <Routes>
          {/* Marketing Site */}
          <Route path="/" element={<MarketingLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:slug" element={<SolutionDetail />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:slug" element={<SolutionDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="portal" element={<Portal />} />
            <Route path="admin" element={<Portal />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="case-studies" element={<CaseStudies />} />
            <Route path="portfolio" element={<CaseStudies />} />
            <Route path="careers" element={<Careers />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="estimator" element={<Estimator />} />
            <Route path="it-services" element={<ITServicesPage />} />
            <Route path="software-development" element={<SoftwareDevelopmentPage />} />
            <Route path="industries" element={<Industries />} />
            <Route path="how-we-work" element={<HowWeWork />} />
            <Route path="insights" element={<Insights />} />
            <Route path="whatsapp-gateway" element={<WhatsAppGateway />} />
            <Route path="design-system" element={<DesignSystemShowcase />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>
          
          {/* Application / OS */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="crm" element={<CRM />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="finance" element={<Finance />} />
            <Route path="documents" element={<Documents />} />
            <Route path="ai" element={<AI />} />
            <Route path="settings" element={<Settings />} />
            <Route path="whatsapp" element={<WhatsAppGateway />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
