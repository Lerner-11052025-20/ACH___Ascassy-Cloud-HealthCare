// Contact / Book Demo page — primary conversion endpoint.
// Frontend form only here; backend wiring lives in Web/backend (Phase 8).
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import Button from '../components/ui/Button.jsx';
import FormInput from '../components/ui/FormInput.jsx';
import FormTextarea from '../components/ui/FormTextarea.jsx';
import FormSelect from '../components/ui/FormSelect.jsx';
import PharmaPOSPreview from '../components/ui/PharmaPOSPreview.jsx';
import { contactDetails } from '../data/site.js';

// Configure the backend base URL via VITE_API_BASE_URL; falls back to local dev port.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const INQUIRY_OPTIONS = [
  { value: '', label: 'Select inquiry type', disabled: true },
  { value: 'demo', label: 'Book a Demo' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'support', label: 'Support' },
];

export default function ContactPage() {
  const [params] = useSearchParams();
  const initialType = params.get('type') || '';
  const initialInquiryType = useMemo(() => {
    if (initialType === 'demo') return 'demo';
    if (initialType === 'partner') return 'partnership';
    return '';
  }, [initialType]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: initialInquiryType,
    message: '',
    preferredContactTime: '',
    consent: false,
    // Honeypot — must remain empty. Hidden visually; bots fill it; backend rejects it.
    company_website: '',
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'submitting', message: '' });
    try {
      const isDemo = form.inquiryType === 'demo';
      const endpoint = isDemo ? '/api/demo' : '/api/contact';
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Unable to submit your inquiry. Please try again.');
      }
      setStatus({
        state: 'success',
        message: "Thanks for reaching out. The Ascassy team will get back to you soon.",
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        organization: '',
        inquiryType: '',
        message: '',
        preferredContactTime: '',
        consent: false,
        company_website: '',
      });
    } catch (err) {
      setStatus({
        state: 'error',
        message:
          err?.message ||
          `Something went wrong. Please try again or email us at ${contactDetails.email}.`,
      });
    }
  }

  return (
    <PageWrapper
      title="Contact / Book a Demo — Ascassy"
      description="Talk to the Ascassy team about PharmaPOS demos, partnerships, healthcare cloud collaboration, or general inquiries."
    >
      <PageHero
        eyebrow="Contact / Book a Demo"
        title="Let's build smarter healthcare workflows together."
        description="Reach out to Ascassy for product demos, partnerships, pharmacy POS inquiries, or healthcare cloud collaboration."
        badgeTone="brand"
        visual={
          <PharmaPOSPreview
            tabs={['settings', 'users', 'billing']}
            defaultTab="settings"
            size="compact"
          />
        }
      />

      <SectionWrapper tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="Tell Us About You"
                title="Share a few details — we'll get back to you."
                description="We'll use your details only to respond to your inquiry. No spam, no marketing lists."
              />

              <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2" noValidate>
                {/* Honeypot — visually hidden, off-screen, ignored by humans, filled by bots. */}
                <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
                  <label htmlFor="company_website">Company Website</label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company_website}
                    onChange={(e) => update('company_website', e.target.value)}
                  />
                </div>
                <FormInput
                  id="name"
                  label="Full Name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                <FormInput
                  id="phone"
                  label="Phone"
                  type="tel"
                  autoComplete="tel"
                  hint="Optional — useful for faster contact."
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
                <FormInput
                  id="organization"
                  label="Organization / Pharmacy Name"
                  autoComplete="organization"
                  value={form.organization}
                  onChange={(e) => update('organization', e.target.value)}
                />
                <FormSelect
                  id="inquiryType"
                  label="Inquiry Type"
                  required
                  options={INQUIRY_OPTIONS}
                  value={form.inquiryType}
                  onChange={(e) => update('inquiryType', e.target.value)}
                  className="sm:col-span-2"
                />
                <FormTextarea
                  id="message"
                  label="Message"
                  required
                  placeholder="Tell us what you're looking for, and the Ascassy team will get back to you."
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="sm:col-span-2"
                />
                <FormInput
                  id="preferredContactTime"
                  label="Preferred Contact Time"
                  hint="Optional — e.g. Weekday mornings IST."
                  value={form.preferredContactTime}
                  onChange={(e) => update('preferredContactTime', e.target.value)}
                  className="sm:col-span-2"
                />

                <label className="flex items-start gap-3 text-sm text-ink-700 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update('consent', e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
                    required
                  />
                  <span>
                    I agree to be contacted by Ascassy regarding my inquiry. See our{' '}
                    <a href="/privacy-policy" className="font-semibold text-brand-700 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {status.state === 'success' ? (
                  <div className="flex items-start gap-3 rounded-card border border-teal-200 bg-teal-50 p-4 text-sm text-teal-800 sm:col-span-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
                    <span>{status.message}</span>
                  </div>
                ) : null}
                {status.state === 'error' ? (
                  <div className="flex items-start gap-3 rounded-card border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:col-span-2">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <span>{status.message}</span>
                  </div>
                ) : null}

                <div className="sm:col-span-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    disabled={status.state === 'submitting'}
                  >
                    {status.state === 'submitting' ? 'Sending…' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Contact details + trust */}
            <aside className="lg:col-span-5">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="rounded-card border border-ink-100 bg-white p-6 shadow-card sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-navy-900">Reach Us Directly</h3>
                  <ul className="mt-5 flex flex-col gap-4 text-sm text-ink-700">
                    <li className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-4 w-4 text-brand-600" aria-hidden="true" />
                      <a href={`mailto:${contactDetails.email}`} className="hover:text-brand-700">
                        {contactDetails.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 text-brand-600" aria-hidden="true" />
                      <a href={`tel:${contactDetails.phone.replace(/\s/g, '')}`} className="hover:text-brand-700">
                        {contactDetails.phone}
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-brand-600" aria-hidden="true" />
                      <span>{contactDetails.address}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-4 w-4 text-brand-600" aria-hidden="true" />
                      <span>{contactDetails.hours}</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-card border border-ink-100 bg-ink-50/60 p-6 sm:p-8">
                  <h3 className="font-display text-lg font-semibold text-navy-900">Inquiry Types</h3>
                  <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-700">
                    <li><span className="font-semibold text-navy-900">Demo:</span> Walk through PharmaPOS or the Ascassy ecosystem with our team.</li>
                    <li><span className="font-semibold text-navy-900">Partnership:</span> Healthcare partners, integrators, ecosystem builders.</li>
                    <li><span className="font-semibold text-navy-900">General:</span> Questions, conversations, exploratory chats.</li>
                    <li><span className="font-semibold text-navy-900">Support:</span> Existing customer or pilot support.</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
