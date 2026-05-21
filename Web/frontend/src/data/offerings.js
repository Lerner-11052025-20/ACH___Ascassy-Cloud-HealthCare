// Ascassy ecosystem offerings — extends the current ascassy.com service set
// and repositions them as connected layers of one cloud healthcare ecosystem.
import { ShieldCheck, Truck, FileText, Activity, Pill, HeartPulse } from 'lucide-react';

export const offerings = [
  {
    icon: ShieldCheck,
    eyebrow: 'Identity Layer',
    title: 'ABHA Integrated e-Healthcare Platform',
    description:
      'India-aligned telehealth and digital identity direction designed to support connected healthcare access.',
    to: '/healthcare-cloud',
    ctaLabel: 'Talk to Us',
    accent: 'brand',
  },
  {
    icon: Truck,
    eyebrow: 'Access Layer',
    title: 'Dense Discounted Pharmacy Channel',
    description:
      'Pharmacy affordability and access at the heart of the Ascassy ecosystem — bridging consumers and pharmacy operations.',
    to: '/pharmapos',
    ctaLabel: 'Explore PharmaPOS',
    accent: 'teal',
  },
  {
    icon: FileText,
    eyebrow: 'Clinical Layer',
    title: 'ABHA-Powered EHR for Doctors',
    description:
      'Cloud-aligned clinical record direction designed around ABHA standards for doctors and clinics.',
    to: '/healthcare-cloud',
    ctaLabel: 'Contact Us',
    accent: 'navy',
  },
  {
    icon: Activity,
    eyebrow: 'Care Layer',
    title: 'Remote Monitoring Solutions',
    description:
      'Connected-care direction for healthcare workflows that extend beyond the clinic.',
    to: '/healthcare-cloud',
    ctaLabel: 'Contact Us',
    accent: 'cloud',
  },
];

export const productBridges = [
  {
    icon: Pill,
    eyebrow: 'Flagship Product',
    title: 'Ascassy PharmaPOS',
    description:
      'A modern cloud-ready POS designed for pharmaceutical retailers — billing, inventory, batch & expiry, GST, suppliers, customers, staff access, and reports.',
    to: '/pharmapos',
    ctaLabel: 'Explore PharmaPOS',
    accent: 'brand',
  },
  {
    icon: HeartPulse,
    eyebrow: 'Service Brand',
    title: 'Ascassy CureInsights',
    description:
      'Cloud-first access to telehealth coordination, pharmacy support, pathology, imaging, reports, and prescriptions.',
    to: '/cureinsights',
    ctaLabel: 'Discover CureInsights',
    accent: 'teal',
  },
];
