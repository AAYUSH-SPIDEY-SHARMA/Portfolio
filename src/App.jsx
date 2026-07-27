import { Suspense, useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import ErrorBoundary from './components/layout/ErrorBoundary';
import PreLoader from './components/animations/PreLoader';
import EasterEggsSystem from './components/layout/EasterEggsSystem';
import ChatOrb from './components/chatbot/ChatOrb';

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="dot-pulse flex gap-2">
      <span className="w-3 h-3 rounded-full bg-[var(--primary)]" />
      <span className="w-3 h-3 rounded-full bg-[var(--secondary)]" />
      <span className="w-3 h-3 rounded-full bg-[var(--accent-coral)]" />
    </div>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(
    () => sessionStorage.getItem('preloader-seen') === 'true'
  );

  const handlePreloaderComplete = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      {/* PreLoader — first visit of the session only */}
      {!isLoaded && <PreLoader onComplete={handlePreloaderComplete} />}

      <EasterEggsSystem />

      <div
        className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <a href="#main" className="skip-link">Skip to content</a>

        <ScrollProgress />
        <Navbar />

        {/*
          Pages animate in via PageWrapper. There is deliberately no
          AnimatePresence exit animation here: with a data router, an exiting
          subtree still reads the *current* RouterContext, so <Outlet/> inside a
          retained child renders the incoming page — the previous wrapper
          animated the wrong thing and, because the key sat on <Outlet/> rather
          than on AnimatePresence's direct child, never ran at all.
        */}
        <main id="main" tabIndex={-1}>
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>

        <Footer />
        <ChatOrb />
      </div>
    </>
  );
}

export default App;
