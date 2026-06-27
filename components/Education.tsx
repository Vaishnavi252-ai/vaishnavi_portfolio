'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const TIMELINE = [
  {
    id: 1, degree: 'Bachelor of Engineering', field: 'Computer Science Engineering in Artificail Intelligence and Machine Learning [AIML]',
    institution: 'Mumbai Universiy | Bharat College of Engineering ', period: '2022 — 2026',
    detail: 'CGPA: 6.89', status: 'Graduated',
    highlights: ['Artificial Intelligence & ML', 'Deep Learning', 'Web Technologies', 'Database Management Systems', 'Data Structures & Agorithms'],
  },
  {
    id: 2, degree: 'Higher Secondary Certificate', field: 'Science (PCM)',
    institution: 'B.N. Bandodkar College of Science', period: '2020 — 2022',
    detail: 'HSC Board', status: 'completed',
    highlights: ['Physics, Chemistry, Mathematics', 'Computer Science'],
  },
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section id="education" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#111827' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.6) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.5)' }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>Education</span>
          </motion.div>
          <motion.h2 className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <span className="text-white">Academic</span><br />
            <span className="teal-text">Foundation.</span>
          </motion.h2>
        </div>

        <div className="relative">
          <motion.div className="absolute left-6 top-0 bottom-0 w-px timeline-teal"
            initial={{ scaleY: 0, originY: 0 }} animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 1.2 }} />

          <div className="space-y-10 pl-16">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.id} className="relative"
                initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="absolute -left-[52px] top-4">
                  <motion.div className="w-3 h-3 rounded-full"
                    style={{
                      background: item.status === 'Graduated' ? '#14b8a6' : 'rgba(20,184,166,0.3)',
                      border: '2px solid #111827',
                      boxShadow: item.status === 'Graduated' ? '0 0 0 2px rgba(20,184,166,0.3), 0 0 14px rgba(20,184,166,0.4)' : 'none',
                    }}
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.2, type: 'spring' }} />
                  {item.status === 'current' && (
                    <motion.div className="absolute inset-0 rounded-full" style={{ background: 'rgba(20,184,166,0.3)' }}
                      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                  )}
                </div>

                <div className="p-6 rounded-2xl glass-card transition-all duration-300 group"
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(20,184,166,0.04)'; el.style.borderColor = 'rgba(20,184,166,0.2)'; el.style.boxShadow = '0 8px 32px rgba(20,184,166,0.08)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.boxShadow = 'none'; }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-xl flex-shrink-0" style={{ background: item.status === 'current' ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${item.status === 'current' ? 'rgba(20,184,166,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
                        <GraduationCap size={15} style={{ color: item.status === 'current' ? '#14b8a6' : 'rgba(255,255,255,0.4)' }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{item.degree}</h3>
                        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.field}</p>
                      </div>
                    </div>
                    {item.status === 'current' && (
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full glass-teal" style={{ color: '#14b8a6' }}>Current</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span className="flex items-center gap-1.5"><Calendar size={12} />{item.period}</span>
                    <span className="flex items-center gap-1.5"><Award size={12} />{item.detail}</span>
                  </div>
                  <p className="text-sm mb-4 font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.institution}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map(h => (
                      <span key={h} className="px-2.5 py-1 text-xs rounded-lg" style={{ background: 'rgba(20,184,166,0.06)', color: 'rgba(20,184,166,0.7)', border: '1px solid rgba(20,184,166,0.15)' }}>{h}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
