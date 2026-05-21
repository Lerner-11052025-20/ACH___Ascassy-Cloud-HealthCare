// Footer — multi-column trust + navigation layer, mobile-collapsible.
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../common/Container.jsx';
import Button from '../ui/Button.jsx';
import Logo from './Logo.jsx';
import { brand, footerColumns, contactDetails, primaryCTA } from '../../data/site.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-12 overflow-hidden bg-navy-900 text-ink-200">
      {/* subtle top gradient accent */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand + tagline + CTA */}
          <div className="lg:col-span-4">
            <div className="[&_a]:!text-white">
              <Logo variant="light" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">
              Building cloud healthcare infrastructure for modern India — pharmacies, doctors, clinics, patients,
              and connected digital health workflows in one ecosystem.
            </p>
            <div className="mt-6">
              <Button to={primaryCTA.to} variant="primary" size="md">
                {primaryCTA.label}
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                  {col.heading}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-ink-300 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-300">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-brand-400" aria-hidden="true" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-white">
                  {contactDetails.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-brand-400" aria-hidden="true" />
                <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {contactDetails.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-400" aria-hidden="true" />
                <span>{contactDetails.address}</span>
              </li>
              <li className="text-xs text-ink-500">{contactDetails.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.legalEntity}. All rights reserved.
          </p>
          <p className="text-ink-500">
            {brand.full} · {brand.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
