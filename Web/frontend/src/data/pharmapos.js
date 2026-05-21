// PharmaPOS content — features, pain points, and FAQ.
// Consumed by Home (preview), PharmaPOS (full), For Pharmacies (subset).
import {
  Receipt,
  Search,
  Package,
  Layers,
  AlertTriangle,
  FileText,
  Truck,
  Users,
  Shield,
  LineChart,
  LayoutDashboard,
  Clock,
} from 'lucide-react';

export const pharmaposFeatures = [
  {
    icon: Receipt,
    title: 'Fast Billing',
    description: 'Bill customers in seconds with a clean, fast counter experience designed for real pharmacy speed.',
    accent: 'brand',
  },
  {
    icon: Search,
    title: 'Medicine Search',
    description: 'Find any SKU instantly across your pharmacy catalogue with smart, forgiving search.',
    accent: 'cloud',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Real-time stock visibility — know what is available, what is low, and what needs attention.',
    accent: 'teal',
  },
  {
    icon: Layers,
    title: 'Batch Tracking',
    description: 'Track every batch with confidence to reduce dispensing errors and improve compliance.',
    accent: 'brand',
  },
  {
    icon: AlertTriangle,
    title: 'Expiry Tracking',
    description: 'Catch expiring stock before it costs you, with batch-level visibility and alerts.',
    accent: 'teal',
  },
  {
    icon: FileText,
    title: 'GST Invoice Support',
    description: 'Generate clean, GST-compliant invoices automatically — no more spreadsheet workarounds.',
    accent: 'cloud',
  },
  {
    icon: Truck,
    title: 'Supplier & Purchase',
    description: 'Organize suppliers and purchase records for cleaner books and stronger control.',
    accent: 'brand',
  },
  {
    icon: Users,
    title: 'Customer History',
    description: 'Capture customer purchase history for stronger relationships and better retention.',
    accent: 'teal',
  },
  {
    icon: Shield,
    title: 'Staff Roles',
    description: 'Role-based access for safer operations — give staff what they need, protect what they don’t.',
    accent: 'navy',
  },
  {
    icon: LineChart,
    title: 'Reports & Analytics',
    description: 'Run your pharmacy on data, not guesses — sales, stock, and operations insights for owners.',
    accent: 'brand',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard Insights',
    description: 'One dashboard for your entire pharmacy — see how the shop is performing today.',
    accent: 'cloud',
  },
  {
    icon: Clock,
    title: 'Cloud-Ready Growth',
    description: 'Built cloud-first, ready to support multi-store growth as your pharmacy expands.',
    accent: 'teal',
  },
];

// First 4 features used in the Home preview block (lightweight surface).
export const pharmaposHomePreviewFeatures = pharmaposFeatures.slice(0, 4);

export const pharmaposPainPoints = [
  {
    icon: Receipt,
    title: 'Slow manual billing',
    description: 'Paper bills slow your counter and frustrate customers during peak hours.',
  },
  {
    icon: Package,
    title: 'Stock that doesn’t match shelves',
    description: 'Books say one thing, shelves say another — and lost sales follow.',
  },
  {
    icon: AlertTriangle,
    title: 'Silent expiry losses',
    description: 'Expired medicine is money walking out of your shop, unnoticed.',
  },
  {
    icon: FileText,
    title: 'GST stress at month-end',
    description: 'GST-compliant invoicing should not be a manual project every month.',
  },
  {
    icon: LineChart,
    title: 'Running on instinct, not data',
    description: 'Owners deserve a clear view of sales, stock, and trends — not guesswork.',
  },
  {
    icon: Shield,
    title: 'Staff accountability gaps',
    description: 'Without role-based access, accountability blurs and risk rises.',
  },
];

export const pharmaposBenefits = [
  {
    icon: Receipt,
    title: 'Faster counter operations',
    description: 'Shorter queues, fewer errors, calmer staff.',
  },
  {
    icon: Package,
    title: 'Cleaner inventory reality',
    description: 'Stock visibility that matches the shelf in real time.',
  },
  {
    icon: AlertTriangle,
    title: 'Stopped expiry leaks',
    description: 'Catch expiring stock early and keep margins healthy.',
  },
  {
    icon: LineChart,
    title: 'Owner-grade clarity',
    description: 'Run the pharmacy on numbers, not guesswork.',
  },
];

export const pharmaposBeforeAfter = [
  { before: 'Manual paper bills, slow counter', after: 'Fast, accurate digital billing' },
  { before: 'Stock confusion, frequent mismatches', after: 'Real-time stock visibility' },
  { before: 'Expiry surprises, silent losses', after: 'Batch- and expiry-level alerts' },
  { before: 'GST stress at month-end', after: 'GST-compliant invoices, automatically' },
  { before: 'Unclear staff access, blurred accountability', after: 'Role-based staff access' },
  { before: 'No reports, no business clarity', after: 'Sales, stock, and operations insights' },
];

export const pharmaposFAQ = [
  {
    question: 'What is Ascassy PharmaPOS?',
    answer:
      'PharmaPOS is a cloud-ready pharmacy retail POS designed for pharmaceutical retailers. It supports billing, inventory, batch & expiry, GST invoicing, suppliers, customers, staff access, and operations reports.',
  },
  {
    question: 'Who is PharmaPOS for?',
    answer:
      'PharmaPOS is built for pharmacy owners, retailers, and chains who want modern, cloud-ready pharmacy operations — not just billing software.',
  },
  {
    question: 'Does PharmaPOS support inventory and expiry tracking?',
    answer:
      'Yes. PharmaPOS offers real-time inventory visibility, batch tracking, and expiry-level visibility designed to help reduce avoidable losses.',
  },
  {
    question: 'Can pharmacy owners view reports?',
    answer:
      'Yes. Owners can view sales, inventory, and operations reports to understand how their pharmacy is performing — without guesswork.',
  },
  {
    question: 'How can I request a demo?',
    answer:
      'Click "Book a Demo" anywhere on the website. Our team will reach out to walk you through PharmaPOS in a personalized session.',
  },
];
