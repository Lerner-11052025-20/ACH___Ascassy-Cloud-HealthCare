// Single source of truth for site-wide navigation, brand, and contact metadata.
// Consumed by Navbar, MobileNavbar, Footer, and contact-related sections.

export const brand = {
  name: 'Ascassy',
  full: 'Ascassy Cloud Healthcare',
  tagline: 'Cloud Healthcare Infrastructure for Modern India',
  legalEntity: 'Ascassy Cloud Healthcare Pvt Ltd',
  domain: 'ascassy.com',
};

export const primaryNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Offerings', to: '/offerings' },
  { label: 'PharmaPOS', to: '/pharmapos' },
  { label: 'CureInsights', to: '/cureinsights' },
  { label: 'Contact', to: '/contact' },
];

export const primaryCTA = {
  label: 'Book a Demo',
  to: '/contact?type=demo',
};

export const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Ascassy', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Products',
    links: [
      { label: 'Ascassy PharmaPOS', to: '/pharmapos' },
      { label: 'Ascassy CureInsights', to: '/cureinsights' },
    ],
  },
  {
    heading: 'Healthcare Ecosystem',
    links: [
      { label: 'Offerings', to: '/offerings' },
      { label: 'Healthcare Cloud', to: '/healthcare-cloud' },
      { label: 'For Pharmacies', to: '/for-pharmacies' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
    ],
  },
];

export const contactDetails = {
  email: 'hello@ascassy.com',
  phone: '+91 00000 00000',
  address: 'Ascassy Cloud Healthcare Pvt Ltd, India',
  hours: 'Mon – Sat, 10:00 – 19:00 IST',
};

// Categories served — only real-world segments (no fake client logos).
export const categoriesServed = [
  'Pharmacies',
  'Pharmacy Chains',
  'Clinics',
  'Healthcare Teams',
  'Healthcare Startups',
];
