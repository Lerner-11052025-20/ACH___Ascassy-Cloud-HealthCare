// 404 — graceful fallback with a way back home.
import Container from '../components/common/Container.jsx';
import Button from '../components/ui/Button.jsx';
import PageWrapper from '../components/layout/PageWrapper.jsx';

export default function NotFoundPage() {
  return (
    <PageWrapper
      title="Page not found — Ascassy Cloud Healthcare"
      description="The page you are looking for does not exist."
    >
      <section className="flex min-h-[60vh] items-center bg-gradient-to-b from-brand-50/40 to-white">
        <Container className="text-center">
          <span className="inline-flex items-center justify-center rounded-pill bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700">
            404
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            We couldn’t find that page.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-fg-muted sm:text-lg">
            The link may be outdated or the page may have moved. Let’s get you back to the Ascassy ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/" variant="primary" size="lg">Back to Home</Button>
            <Button to="/pharmapos" variant="outline" size="lg">Explore PharmaPOS</Button>
          </div>
        </Container>
      </section>
    </PageWrapper>
  );
}
