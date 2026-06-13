'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Award } from 'lucide-react';

const CERTS = [
  {
    id: 1,
    title: 'Oracle Generative AI Professional',
    issuer: 'Oracle',
    date: 'Oct 2025',
    logo: 'ORA',
    credential: 'https://drive.google.com/file/d/19cqxE73EUAKG4J_9qK3l9A_kM1Vw2ltC/view?usp=drive_link',
    category: 'AI/ML'
  },
  {
    id: 2,
    title: 'Software Engineering Virtual Internship',
    issuer: 'Accenture',
    date: 'Jun 2025',
    logo: 'ACC',
    credential: 'https://drive.google.com/file/d/1wmlxyKK51p1xieRxzyJLAt5LOL1CnI90/view?usp=drive_link',
    category: 'Software Engineering'
  },
  {
    id: 3,
    title: 'AI Agents Using Python',
    issuer: 'Professional Experience Certificate',
    date: '2025',
    logo: 'AI',
    credential: 'https://drive.google.com/file/d/1z8jP2CILn35q1bAoy5oHaa_uWsyQqaps/view?usp=drive_link',
    category: 'AI/ML'
  },
  {
    id: 4,
    title: 'Advanced Python',
    issuer: 'Simplilearn',
    date: 'Jun 2025',
    logo: 'SPY',
    credential: 'https://drive.google.com/file/d/1hRMKNh03brZVEZHTQbJQEMoT4TSd0rLp/view?usp=drive_link',
    category: 'Programming'
  },
  {
    id: 5,
    title: 'Frontend Development Skill Test Certification',
    issuer: 'Professional Assessment',
    date: 'May 2025',
    logo: 'FED',
    credential: 'https://drive.google.com/file/d/1b33ciQQDS3c08SR2Z3ZVZ2vyPh6pw4LD/view?usp=drive_link',
    category: 'Frontend'
  },
  {
    id: 6,
    title: 'Software Development Virtual Internship',
    issuer: 'Citi',
    date: 'Jan 2025',
    logo: 'CITI',
    credential: 'https://drive.google.com/file/d/1Jpvc1cdHbeQnGC4q316y73aZ_8CFkDcc/view?usp=drive_link',
    category: 'Software Development'
  },
  {
    id: 7,
    title: 'Software Development Virtual Internship',
    issuer: 'City of Moreton Bay',
    date: 'Jun 2025',
    logo: 'CMB',
    credential: 'https://drive.google.com/file/d/1X5AJmJahv-FGKsgbx39vHVdtcmb4qhE2/view?usp=drive_link',
    category: 'Software Development'
  },
  {
    id: 8,
    title: '3 Week Python Course',
    issuer: 'GeeksforGeeks',
    date: '2025',
    logo: 'GFG',
    credential: 'https://drive.google.com/file/d/1LJst44g_p4x8kkSHWQ_GS63pmZyHnMhG/view?usp=drive_link',
    category: 'Programming'
  }
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="certifications" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#050505' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.8) 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-16">
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.5)' }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>Certifications</span>
          </motion.div>
          <motion.h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Credentials &<br /><span className="teal-text">Recognition.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map((cert, i) => (
            <motion.div key={cert.id}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
              className="group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 glass-card"
              whileHover={{ y: -4 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(20,184,166,0.04)'; el.style.borderColor = 'rgba(20,184,166,0.15)'; el.style.boxShadow = '0 12px 40px rgba(20,184,166,0.06)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.boxShadow = 'none'; }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold glass-teal" style={{ color: '#14b8a6' }}>
                  {cert.logo}
                </div>
                <a href={cert.credential}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px]" style={{ color: 'rgba(20,184,166,0.6)' }}>
                  View <ExternalLink size={9} />
                </a>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1 leading-snug">{cert.title}</h4>
              <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>{cert.issuer}</p>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full" style={{ background: 'rgba(20,184,166,0.08)', color: 'rgba(20,184,166,0.7)', border: '1px solid rgba(20,184,166,0.12)' }}>
                  {cert.category}
                </span>
                <span className="text-[10px] font-mono" style={{ color: 'rgba(20,184,166,0.4)' }}>{cert.date}</span>
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.05), transparent)' }} />
            </motion.div>
          ))}
        </div>

        <motion.div className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          <Award size={14} style={{ color: 'rgba(20,184,166,0.5)' }} />
          <span className="text-xs font-mono" style={{ color: 'rgba(20,184,166,0.4)' }}>8 verified certifications</span>
        </motion.div>
      </div>
    </section>
  );
}
