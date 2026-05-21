// App shell — mounts the layout and route tree.
import AppRoutes from './routes/AppRoutes.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import MobileStickyCTA from './components/layout/MobileStickyCTA.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas text-ink-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
