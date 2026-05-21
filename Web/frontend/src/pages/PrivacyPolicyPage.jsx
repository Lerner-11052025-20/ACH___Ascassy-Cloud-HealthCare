// Privacy Policy page — clean, structured, trust-building.
// IMPORTANT: Final legal wording must be reviewed by a qualified legal advisor before production.
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import { contactDetails, brand } from '../data/site.js';

const lastUpdated = '2026-05-21';

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper
      title="Privacy Policy — Ascassy Cloud Healthcare"
      description="How Ascassy Cloud Healthcare handles website inquiry and contact data."
    >
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${brand.full} handles the limited information collected through this website.`}
        badgeTone="navy"
      />
      <SectionWrapper tone="white">
        <Container size="narrow">
          <div className="rounded-card border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <strong className="font-semibold">Note:</strong> This privacy policy is provided as a clean
            starting template. Final legal wording must be reviewed by a qualified legal advisor before
            production deployment.
          </div>

          <p className="mt-6 text-sm text-ink-500">Last updated: {lastUpdated}</p>

          <div className="prose prose-slate mt-8 max-w-none text-ink-700 [&_h2]:font-display [&_h2]:text-navy-900 [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1.5 [&_a]:font-semibold [&_a]:text-brand-700 [&_a:hover]:underline">
            <h2>1. Scope</h2>
            <p>
              This Privacy Policy applies to the {brand.domain} marketing website. It does not cover any
              future product applications (such as a logged-in PharmaPOS application), which will be
              governed by their own privacy documentation when launched.
            </p>

            <h2>2. Information We Collect</h2>
            <p>The website collects only the limited information you choose to share:</p>
            <ul>
              <li>Contact form data — name, email, phone (optional), organization (optional), inquiry type, message, and preferred contact time.</li>
              <li>Demo request data — the same fields, used to schedule a personalized product demo.</li>
              <li>Basic website usage information if analytics is added in the future (with clear disclosure in this policy at that time).</li>
            </ul>
            <p>
              We do not collect sensitive personal health information through this website. We do not
              collect patient records, prescriptions, or medical data through this website.
            </p>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To respond to your inquiry, partnership request, or demo request.</li>
              <li>To follow up on conversations you have initiated with the Ascassy team.</li>
              <li>To maintain a clean record of legitimate inquiries for the duration needed to serve you.</li>
            </ul>
            <p>We do not sell your information. We do not add you to marketing lists without your consent.</p>

            <h2>4. Third Parties</h2>
            <p>
              Submissions may pass through a transactional email delivery service (such as an SMTP
              provider) used solely to deliver your inquiry to the Ascassy team. We do not share your
              information with third parties for advertising purposes.
            </p>

            <h2>5. Your Responsibilities</h2>
            <p>
              Please share only the information needed to respond to your inquiry. Do not include
              sensitive medical records, prescriptions, or third-party patient data in inquiry messages.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              You may request a copy of the information you have shared, or request its deletion, by
              contacting us at the email address below.
            </p>

            <h2>7. Changes to this Policy</h2>
            <p>
              We may update this policy as the website and Ascassy product surface evolve. Updates will
              be reflected on this page with a revised "Last updated" date.
            </p>

            <h2>8. Contact</h2>
            <p>
              Questions about this policy can be sent to{' '}
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
