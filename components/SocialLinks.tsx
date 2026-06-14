'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

const LINKS = [
  { icon: <Linkedin size={15} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaishnavi-misal-2bbb01291' },
  { icon: <Github size={15} />, label: 'GitHub', href: 'https://github.com/Vaishnavi252-ai' },
  { icon: <Code2 size={15} />, label: 'CodePen', href: 'https://codepen.io/Vaishnavi252-ai' },
  { icon: <Mail size={15} />, label: 'Email', href: 'mailto:vaishnavimisal@email.com' },
];

export default function SocialLinks() {
  return (
    <motion.div className="fixed left-5 bottom-0 z-40 hidden lg:flex flex-col items-center gap-3"
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2, duration: 0.8 }}>
      {LINKS.map(({ icon, label, href }, i) => (
        <motion.a key={label} href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-250 glass-teal"
          style={{ color: 'rgba(20,184,166,0.6)' }}
          whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1 + i * 0.1 }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(20,184,166,0.15)'; el.style.borderColor = 'rgba(20,184,166,0.35)'; el.style.color = '#14b8a6'; el.style.boxShadow = '0 0 12px rgba(20,184,166,0.25)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(20,184,166,0.06)'; el.style.borderColor = 'rgba(20,184,166,0.2)'; el.style.color = 'rgba(20,184,166,0.6)'; el.style.boxShadow = 'none'; }}>
          {icon}
          <span className="absolute left-full ml-3 px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(20,184,166,0.12)', color: '#14b8a6', backdropFilter: 'blur(8px)', border: '1px solid rgba(20,184,166,0.2)' }}>
            {label}
          </span>
        </motion.a>
      ))}
      <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, rgba(20,184,166,0.4), transparent)' }} />
    </motion.div>
  );
}
