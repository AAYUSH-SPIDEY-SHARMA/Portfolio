import { Suspense, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import PreLoader from './components/animations/PreLoader';
import EasterEggsSystem from './components/layout/EasterEggsSystem';
import ChatOrb from './components/chatbot/ChatOrb';

function App() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(
    () => sessionStorage.getItem('preloader-seen') === 'true'
  );

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* PreLoader — only on first visit */}
      {!isLoaded && <PreLoader onComplete={handlePreloaderComplete} />}

      {/* Global Easter Eggs */}
      <EasterEggsSystem />

      <div className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] ${!isLoaded ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <ScrollProgress />
        <Navbar />
        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="dot-pulse flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                  <span className="w-3 h-3 rounded-full bg-[var(--secondary)]" />
                  <span className="w-3 h-3 rounded-full bg-[var(--accent-coral)]" />
                </div>
              </div>
            }
          >
            <Outlet key={location.pathname} />
          </Suspense>
        </AnimatePresence>
        <Footer />
        <ChatOrb />
      </div>
    </>
  );
}

export default App;
