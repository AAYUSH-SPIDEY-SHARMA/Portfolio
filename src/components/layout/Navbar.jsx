import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cld, ASSETS } from '../../lib/images';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Wall', path: '/wall' },
  { name: 'Contact', path: '/contact' },
];

const LOGO_CLICKS_TO_UNLOCK = 5;
const LOGO_CLICK_RESET_MS = 1500;

/**
 * Routes whose hero is full-bleed artwork.
 *
 * On these the bar stays transparent and switches to light type over a soft
 * scrim; everywhere else the pages are light, so the normal theme colours are
 * the legible choice.
 */
const ARTWORK_HERO_ROUTES = ['/', '/hidden'];

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

  const overArtwork = ARTWORK_HERO_ROUTES.includes(location.pathname) && !isScrolled;

  return (
    <>
      <nav
        aria-label="Main"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
      >
        {/* Scrim: lets the artwork read through while keeping light type legible
            over both the pale left of the painting and its dark right. */}
        {overArtwork && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,12,22,0.62) 0%, rgba(10,12,22,0.30) 60%, transparent 100%)',
            }}
          />
        )}

        <div className="relative max-w-[var(--max-width)] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="relative">
              <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2.5 group">
                <img
                  src={cld(ASSETS.spiderMark, { width: 96 })}
                  alt=""
                  aria-hidden="true"
                  width={28}
                  height={32}
                  decoding="async"
                  className="h-8 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]"
                  style={{
                    filter: overArtwork
                      ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))'
                      : 'drop-shadow(0 1px 3px rgba(0,0,0,0.25))',
                  }}
                />
                <span
                  className={`font-display text-xl font-bold italic tracking-wide transition-colors duration-300 hidden sm:block ${
                    overArtwork ? 'text-white' : 'text-[var(--text-primary)]'
                  }`}
                  style={
                    overArtwork
                      ? { textShadow: '0 1px 10px rgba(0,0,0,0.55)' }
                      : undefined
                  }
                >
                  SPIDEY
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
                        overArtwork
                          ? isActive
                            ? 'text-white'
                            : 'text-white/80 hover:text-white'
                          : isActive
                            ? 'text-[var(--text-accent)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                      style={overArtwork ? { textShadow: '0 1px 8px rgba(0,0,0,0.6)' } : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className={`absolute inset-0 rounded-lg border ${
                            overArtwork
                              ? 'bg-white/15 border-white/30'
                              : 'bg-[var(--primary)]/10 border-[var(--primary)]/20'
                          }`}
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
              className={`lg:hidden p-2 transition-colors ${
                overArtwork
                  ? 'text-white/90 hover:text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
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
                <p className="font-display text-base font-bold italic tracking-wide text-[var(--text-primary)]">Aayush Sharma</p>
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
