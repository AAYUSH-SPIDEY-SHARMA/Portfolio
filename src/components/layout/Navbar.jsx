import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Wall', path: '/wall' },
  { name: 'Contact', path: '/contact' },
];

const LOGO_CLICKS_TO_UNLOCK = 5;
const LOGO_CLICK_RESET_MS = 1500;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showWebAnim, setShowWebAnim] = useState(false);
  const location = useLocation();

  const logoClicks = useRef(0);
  const logoTimer = useRef(null);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location.pathname]);

  // Clear the pending logo-streak timer if the navbar goes away mid-streak.
  useEffect(() => () => clearTimeout(logoTimer.current), []);

  // Mobile menu: lock scroll, close on Escape, and hand focus to the panel.
  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileOpen]);

  const handleLogoClick = (e) => {
    logoClicks.current += 1;

    // A streak has to be quick — otherwise ordinary navigation over a session
    // would eventually trip the egg by accident.
    clearTimeout(logoTimer.current);
    logoTimer.current = setTimeout(() => { logoClicks.current = 0; }, LOGO_CLICK_RESET_MS);

    if (logoClicks.current >= LOGO_CLICKS_TO_UNLOCK) {
      e.preventDefault();
      logoClicks.current = 0;
      setShowWebAnim(true);
      setTimeout(() => setShowWebAnim(false), 2000);
    }
  };

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[var(--max-width)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="relative">
              <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center group-hover:shadow-[var(--glow-purple)] transition-shadow duration-300">
                  <span className="text-white font-bold text-sm font-display">AS</span>
                </span>
                <span className="font-mono text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors hidden sm:block">
                  <span className="text-[var(--primary)]">&lt;</span>
                  aayush
                  <span className="text-[var(--primary)]"> /&gt;</span>
                </span>
                <span className="sr-only">Aayush Sharma — home</span>
              </Link>

              <AnimatePresence>
                {showWebAnim && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 20, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none z-[-1]"
                    aria-hidden="true"
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <line
                          key={angle}
                          x1="50" y1="50"
                          x2={50 + 50 * Math.cos((angle * Math.PI) / 180)}
                          y2={50 + 50 * Math.sin((angle * Math.PI) / 180)}
                          stroke="var(--primary)" strokeWidth="1" opacity="0.6"
                        />
                      ))}
                      <circle cx="50" cy="50" r="20" fill="none" stroke="var(--primary)" strokeWidth="0.5" opacity="0.4" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="0.5" opacity="0.4" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      aria-current={isActive ? 'page' : undefined}
                      className={`relative block px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'text-[var(--text-accent)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              onClick={() => setIsMobileOpen((open) => !open)}
              className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              id="mobile-menu"
              ref={panelRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-[var(--bg-secondary)] border-l border-[var(--border-default)] p-6 pt-20"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="absolute bottom-8 left-6 right-6">
                <p className="text-xs text-[var(--text-muted)] font-mono">&lt;aayush sharma /&gt;</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">M.Sc AI/ML @ IIIT Lucknow</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
