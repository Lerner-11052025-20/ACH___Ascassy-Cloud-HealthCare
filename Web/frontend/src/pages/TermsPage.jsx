// Terms & Conditions page — clean, structured, trust-building.
// IMPORTANT: Final legal wording must be reviewed by a qualified legal advisor before production.
import PageWrapper from '../components/layout/PageWrapper.jsx';
import SectionWrapper from '../components/layout/SectionWrapper.jsx';
import PageHero from '../components/layout/PageHero.jsx';
import Container from '../components/common/Container.jsx';
import { contactDetails, brand } from '../data/site.js';

const lastUpdated = '2026-05-21';

export default function TermsPage() {
  return (
    <PageWrapper
      title="Terms & Conditions — Ascassy Cloud Healthcare"
      description="Terms governing the use of the Ascassy Cloud Healthcare marketing website."
    >
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description={`Terms governing the use of the ${brand.domain} marketing website.`}
        badgeTone="navy"
      />
      <SectionWrapper tone="white">
        <Container size="narrow">
          <div className="rounded-card border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <strong className="font-semibold">Note:</strong> These terms are provided as a clean starting
            template. Final legal wording must be reviewed by a qualified legal advisor before production
            deployment.
          </div>

          <p className="mt-6 text-sm text-ink-500">Last updated: {lastUpdated}</p>

          <div className="prose prose-slate mt-8 max-w-none text-ink-700 [&_h2]:font-display [&_h2]:text-navy-900 [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1.5 [&_a]:font-semibold [&_a]:text-brand-700 [&_a:hover]:underline">
            <h2>1. Website Use</h2>
            <p>
              By accessing {brand.domain}, you agree to use the website lawfully and in line with these
              terms. The website is intended for informational, demonstration, and inquiry purposes.
            </p>

            <h2>2. Content Ownership</h2>
            <p>
              All website content — text, layouts, imagery, illustrations, and product mockups — is the
              property of {brand.full}, unless explicitly attributed otherwise. You may not republish or
              redistribute website content without written permission.
            </p>

            <h2>3. No Medical Advice</h2>
            <p>
              Nothing on this website constitutes medical advice, diagnosis, or treatment. Ascassy
              services, including any direction around AI analytics, telehealth coordination, or
              healthcare workflows, are not a substitute for the judgment of qualified medical
              professionals.
            </p>

            <h2>4. Product Direction</h2>
            <p>
              Some content describes the direction of Ascassy products and the broader cloud healthcare
              ecosystem. Forward-looking descriptions reflect intent and roadmap, not delivered or
              guaranteed capability at any specific point in time.
            </p>

            <h2>5. External Links</h2>
            <p>
              The website may link to external resources. Ascassy is not responsible for the content,
              practices, or accuracy of third-party websites.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the extent permitted by law, {brand.full} is not liable for any indirect or consequential
              loss arising from the use of this website. The website is provided "as is" without
              warranties of any kind.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We may update these terms as the website and Ascassy product surface evolve. Updates will
              be reflected on this page with a revised "Last updated" date.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These terms shall be governed by applicable Indian law. Final governing-law wording will
              be set by qualified legal counsel before production deployment.
            </p>

            <h2>9. Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
            </p>
          </div>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
