// Application route tree. All marketing pages + legal pages + 404.
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import OfferingsPage from '../pages/OfferingsPage.jsx';
import PharmaPOSPage from '../pages/PharmaPOSPage.jsx';
import ForPharmaciesPage from '../pages/ForPharmaciesPage.jsx';
import HealthcareCloudPage from '../pages/HealthcareCloudPage.jsx';
import CureInsightsPage from '../pages/CureInsightsPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.jsx';
import TermsPage from '../pages/TermsPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function AppRoutes() {
  return (
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
  );
}
