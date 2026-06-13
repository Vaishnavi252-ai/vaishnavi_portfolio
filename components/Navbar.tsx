'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 60));

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(en => { if (en.isIntersecting) setActiveSection(en.target.id); }),
      { rootMargin: '-40% 0px -50% 0px' },
    );
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href.replace('#', ''));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center"
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}>
        <motion.div className="mx-auto mt-4 w-auto"
          animate={scrolled
            ? { background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(24px)', boxShadow: '0 2px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.12)', borderColor: 'rgba(20,184,166,0.15)' }
            : { background: 'rgba(5,5,5,0.55)', backdropFilter: 'blur(16px)', boxShadow: '0 2px 24px rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.07)' }
          }
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ border: '1px solid', borderRadius: '40px', padding: '8px 20px' }}>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-0.5">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '');
              return (
                <li key={label}>
                  <a href={href} onClick={e => handleNavClick(e, href)}
                    className="relative px-4 py-2 text-sm font-medium rounded-full block transition-colors duration-300"
                    style={{ color: isActive ? '#2dd4bf' : 'rgba(255,255,255,0.5)' }}>
                    {label}
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.3)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button className="md:hidden flex items-center justify-center w-8 h-8" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <AnimatePresence mode="wait">
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={18} className="text-teal-400" /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={18} className="text-white/70" /></motion.span>
              }
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.div className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden"
              style={{ background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(32px)', borderLeft: '1px solid rgba(20,184,166,0.12)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}>
              <div className="flex flex-col h-full pt-24 pb-8 px-8">
                <nav className="flex flex-col gap-1">
                  {NAV_ITEMS.map(({ label, href }, i) => {
                    const isActive = activeSection === href.replace('#', '');
                    return (
                      <motion.a key={label} href={href} onClick={e => handleNavClick(e, href)}
                        className="flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all"
                        style={{ color: isActive ? '#2dd4bf' : 'rgba(255,255,255,0.45)', background: isActive ? 'rgba(20,184,166,0.08)' : 'transparent', border: isActive ? '1px solid rgba(20,184,166,0.2)' : '1px solid transparent' }}
                        initial={{ x: 32, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.06 }}>
                        <span className="mr-3 text-xs font-mono text-teal-500/30">0{i + 1}</span>
                        {label}
                      </motion.a>
                    );
                  })}
                </nav>
                <div className="mt-auto">
                  <p className="text-xs text-teal-500/30 font-mono">VAISHNAVI MISAL</p>
                  <p className="text-xs text-white/15 mt-1">Full Stack AI Engineer</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
