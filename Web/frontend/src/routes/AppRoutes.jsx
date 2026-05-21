// Application route tree. Home is eagerly loaded for the first-paint experience;
// every other page is split into its own chunk via React.lazy and resolved through
// Suspense to keep the initial JS bundle small.
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import Loading from '../components/common/Loading.jsx';

const AboutPage = lazy(() => import('../pages/AboutPage.jsx'));
const OfferingsPage = lazy(() => import('../pages/OfferingsPage.jsx'));
const PharmaPOSPage = lazy(() => import('../pages/PharmaPOSPage.jsx'));
const ForPharmaciesPage = lazy(() => import('../pages/ForPharmaciesPage.jsx'));
const HealthcareCloudPage = lazy(() => import('../pages/HealthcareCloudPage.jsx'));
const CureInsightsPage = lazy(() => import('../pages/CureInsightsPage.jsx'));
const ContactPage = lazy(() => import('../pages/ContactPage.jsx'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage.jsx'));
const TermsPage = lazy(() => import('../pages/TermsPage.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/offerings" element={<OfferingsPage />} />
        <Route path="/pharmapos" element={<PharmaPOSPage />} />
        <Route path="/for-pharmacies" element={<ForPharmaciesPage />} />
        <Route path="/healthcare-cloud" element={<HealthcareCloudPage />} />
        <Route path="/cureinsights" element={<CureInsightsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
