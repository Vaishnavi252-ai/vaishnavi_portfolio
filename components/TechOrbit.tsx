'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TECHS = [
  { label: 'React', orbit: 110, duration: 14, start: 0 },
  { label: 'Python', orbit: 110, duration: 14, start: 60 },
  { label: 'Next.js', orbit: 110, duration: 14, start: 120 },
  { label: 'Node.js', orbit: 110, duration: 14, start: 180 },
  { label: 'MongoDB', orbit: 110, duration: 14, start: 240 },
  { label: 'JavaScript', orbit: 110, duration: 14, start: 300 },
  { label: 'SQL', orbit: 168, duration: 22, start: 30 },
  { label: 'FastAPI', orbit: 168, duration: 22, start: 80 },
  { label: 'TailwindCSS', orbit: 168, duration: 22, start: 140 },
  { label: 'Git', orbit: 168, duration: 22, start: 200 },
  { label: 'Docker', orbit: 168, duration: 22, start: 260 },
  { label: 'TypeScript', orbit: 168, duration: 22, start: 320 },
];

export default function TechOrbit() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Top/bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #050505, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, #0f172a, transparent)' }} />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p className="text-xs font-mono tracking-[0.25em] uppercase text-teal-500/50 mb-16"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7 }}>
          Technology Orbit
        </motion.p>

        {/* Orbit arena */}
        <motion.div className="relative flex items-center justify-center"
          style={{ width: 380, height: 380 }}
          initial={{ opacity: 0, scale: 0.85 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>

          {/* Orbit rings */}
          {[110, 168].map(r => (
            <div key={r} className="absolute rounded-full pointer-events-none"
              style={{ width: r * 2 + 44, height: r * 2 + 44, border: '1px solid rgba(20,184,166,0.08)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          ))}

          {/* Teal glow center */}
          <div className="absolute rounded-full pointer-events-none"
            style={{ width: 120, height: 120, background: 'radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

          {/* Center label */}
          <motion.div className="relative z-10 flex flex-col items-center gap-1"
            initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center glass-teal teal-glow">
              <span className="font-heading text-xs font-bold text-teal-400 text-center leading-tight">VM</span>
            </div>
          </motion.div>

          {/* Orbiting tech items */}
          {TECHS.map((tech, i) => {
            const rad = (tech.start * Math.PI) / 180;
            const x = Math.cos(rad) * tech.orbit;
            const y = Math.sin(rad) * tech.orbit;
            return (
              <motion.div key={tech.label}
                className="absolute"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.5, type: 'spring' }}>
                <motion.div
                  className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap cursor-default"
                  style={{ background: 'rgba(20,184,166,0.07)', border: '1px solid rgba(20,184,166,0.2)', color: 'rgba(20,184,166,0.8)', backdropFilter: 'blur(8px)' }}
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  whileHover={{ scale: 1.15, background: 'rgba(20,184,166,0.15)' }}>
                  {/* Framer Motion can crash when animating composite style strings like boxShadow/borderColor. */}
                  {tech.label}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p className="mt-16 text-xs text-white/20 font-mono tracking-wider"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          30+ technologies in arsenal
        </motion.p>
      </div>
    </section>
  );
}
