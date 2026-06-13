'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const LINKS = [
  {
    icon: <Linkedin size={15} />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vaishnavimisal',
  },
  {
    icon: <Github size={15} />,
    label: 'GitHub',
    href: 'https://github.com/Vaishnavi252-ai',
  },
  {
    icon: <Mail size={15} />,
    label: 'Email',
    href: 'mailto:vaishnavimisal878@gmail.com',
  },
  {
    icon: <Phone size={15} />,
    label: 'Phone',
    href: 'tel:+91 9321785285',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative py-16 overflow-hidden"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(20,184,166,0.1)' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.8) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Left — name + tagline */}
          <div>
            <p className="text-sm font-semibold tracking-tight mb-1" style={{ color: '#14b8a6' }}>
              Vaishnavi Misal
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Aspiring Full Stack AI Engineer
            </p>
          </div>

          {/* Center — social links */}
          <div className="flex items-center gap-2">
            {LINKS.map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all duration-200"
                style={{ color: 'rgba(20,184,166,0.5)', background: 'transparent' }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#14b8a6';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(20,184,166,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(20,184,166,0.5)';
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }}
                aria-label={label}
              >
                {icon}
                <span className="hidden sm:block">{label}</span>
              </motion.a>
            ))}
          </div>

          {/* Right — back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs transition-colors duration-200"
            style={{ color: 'rgba(20,184,166,0.4)' }}
            whileHover={{ scale: 1.04 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#14b8a6';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(20,184,166,0.4)';
            }}
          >
            Back to top
            <ArrowUpRight size={12} />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(20,184,166,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            &copy; {new Date().getFullYear()} Vaishnavi Misal. All rights reserved.
          </p>
          <p className="text-xs font-mono" style={{ color: 'rgba(20,184,166,0.3)' }}>
            Built with Next.js · Framer Motion · Three.js
          </p>
        </div>
      </div>
    </footer>
  );
}
