/**
 * Nexus IT Services FZ-LLC — Site Navigation & Content Configuration
 */

export const nav = [
  {
    label: 'Solutions',
    href: '/solutions',
    mega: 'solutions',
    pillars: [
      {
        number: 'PILLAR 01',
        title: 'Cloud & Sovereign IT',
        href: '/solutions/it-services',
        services: [
          { label: 'Sovereign Cloud Hosting', href: '/solutions/it-services' },
          { label: 'Zero-Trust Cybersecurity', href: '/solutions/it-services' },
          { label: 'Structured Cabling & Wi-Fi 6', href: '/solutions/it-services' },
          { label: '24/7 Monitoring & NOC', href: '/solutions/it-services' },
        ],
      },
      {
        number: 'PILLAR 02',
        title: 'Custom Software & Web',
        href: '/solutions/software-development',
        services: [
          { label: 'Enterprise Web Platforms', href: '/solutions/software-development' },
          { label: 'Bespoke ERP & CRM Systems', href: '/solutions/software-development' },
          { label: 'iOS & Android Mobile Apps', href: '/solutions/software-development' },
          { label: 'UAE Payment Gateways', href: '/solutions/software-development' },
        ],
      },
      {
        number: 'PILLAR 03',
        title: 'AI & Autonomous Workflows',
        href: '/solutions/ai-automation',
        services: [
          { label: 'WhatsApp Business API Bots', href: '/solutions/ai-automation' },
          { label: 'Bilingual Arabic LLM Copilots', href: '/solutions/ai-automation' },
          { label: 'Document & Invoice OCR', href: '/solutions/ai-automation' },
          { label: 'Enterprise Knowledge RAG', href: '/solutions/ai-automation' },
        ],
      },
      {
        number: 'PILLAR 04',
        title: 'Creative Media & Advisory',
        href: '/solutions/creative-services',
        services: [
          { label: 'Cinema 4K Commercials', href: '/solutions/creative-services' },
          { label: '3D CGI Product Renders', href: '/solutions/creative-services' },
          { label: 'Brand Identity Systems', href: '/solutions/creative-services' },
          { label: 'Fractional CTO Leadership', href: '/solutions/consulting' },
        ],
      },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const siteMeta = {
  name: 'Nexus IT Services FZ-LLC',
  tagline: 'Technology. Simplified. Delivered.',
  phone: '+971 4 260 0000',
  phoneHref: 'tel:+97142600000',
  email: 'nexus.itservices06@gmail.com',
  address: 'Radiance ONE Business Center 9th floor, Dubai Creek Car parking, Rigga Al Buteen, Dubai, UAE',
};
