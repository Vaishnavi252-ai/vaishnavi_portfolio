'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 5, suffix: '+', label: 'Projects Built', sublabel: 'Full-stack & AI' },
  { value: 30, suffix: '+', label: 'Technologies', sublabel: 'Languages, Frameworks, Tools' },
  { value: 6.89, suffix: '', label: 'CGPA', sublabel: 'Bharat College of Engineering' },
  { value: 100, suffix: '%', label: 'Passion', sublabel: 'Building impactful products' },
];

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const t = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      setCount(current);
      if (step >= steps) clearInterval(t);
    }, duration / steps);
    return () => clearInterval(t);
  }, [inView, target]);

  return (
    <span>
      {isDecimal ? count.toFixed(2) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function Numbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ background: '#0f172a' }}>
      {/* Decorative teal line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.4), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.2), transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl group glass-card transition-all duration-300"
              initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ y: -4 }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(20,184,166,0.05)'; el.style.borderColor = 'rgba(20,184,166,0.2)'; el.style.boxShadow = '0 8px 32px rgba(20,184,166,0.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.boxShadow = 'none'; }}>
              {/* Teal corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-2xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.2), transparent 60%)' }} />
              </div>

              <div className="font-heading text-[clamp(2rem,5vw,3rem)] font-bold mb-2"
                style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>

              <p className="text-sm font-semibold text-white mb-1">{stat.label}</p>
              <p className="text-xs text-white/30">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
