// Healthcare ecosystem layers — consumed by Home and Healthcare Cloud pages.
import { Cloud, Pill, Stethoscope, HeartPulse, Users, Building2 } from 'lucide-react';

export const ecosystemLayers = [
  {
    icon: Cloud,
    title: 'Cloud Healthcare Foundation',
    description:
      'Cloud-first infrastructure designed to support modern healthcare operations across pharmacies, doctors, clinics, and patients.',
    accent: 'cloud',
  },
  {
    icon: Pill,
    title: 'Pharmacy Retail Layer',
    description:
      'PharmaPOS — pharmacy retail infrastructure for billing, inventory, batch & expiry, GST, suppliers, customers, staff, and reports.',
    accent: 'brand',
  },
  {
    icon: Stethoscope,
    title: 'Doctor / Clinic Layer',
    description:
      'Direction for ABHA-aligned clinical workflows that connect doctor and clinic operations with the broader cloud ecosystem.',
    accent: 'teal',
  },
  {
    icon: HeartPulse,
    title: 'Patient / Service Layer',
    description:
      'CureInsights — cloud-first access to telehealth coordination, pharmacy support, pathology, imaging, and reports.',
    accent: 'navy',
  },
];

export const whyAscassy = [
  {
    icon: Cloud,
    title: 'Built for cloud healthcare, not retrofitted',
    description:
      'Ascassy is designed from the ground up as a cloud platform for modern healthcare operations.',
  },
  {
    icon: Pill,
    title: 'Pharmacy-first product depth',
    description:
      'PharmaPOS is a real pharmacy operations product — billing, inventory, expiry, GST, suppliers, and reports.',
  },
  {
    icon: Building2,
    title: 'Ecosystem, not a single tool',
    description:
      'Healthcare needs connected systems. Ascassy is a layered ecosystem, not a one-trick app.',
  },
  {
    icon: Users,
    title: 'Designed for real Indian healthcare context',
    description:
      'India-aware language, GST literacy, ABHA alignment, and an honest, healthcare-grade voice.',
  },
];
