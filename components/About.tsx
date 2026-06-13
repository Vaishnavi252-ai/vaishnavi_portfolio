'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Cpu, Globe, Lightbulb } from 'lucide-react';

const AIModel3D = dynamic(() => import('./AIModel3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[200px]" style={{ background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.08), transparent 70%)' }} />,
});

const PILLARS = [
  { icon: <Cpu size={15} />, title: 'AI Engineering', desc: 'Building intelligent systems that learn, adapt, and create real-world impact.' },
  { icon: <Globe size={15} />, title: 'Full Stack Web', desc: 'End-to-end product development from backend APIs to polished interfaces.' },
  { icon: <Lightbulb size={15} />, title: 'Problem Solving', desc: 'Approaching complex challenges with analytical thinking and creative solutions.' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Model animates in from left side when scrolling into view
  const modelX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const modelOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="about" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#0f172a' }}>
      {/* Teal accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(20,184,166,0.3), transparent)' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.8) 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <motion.div className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.5)' }} />
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>About Me</span>
            </motion.div>

            <motion.h2 className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <span className="text-white">Building the future,</span>
              <br />
              <span className="teal-text">one line at a time.</span>
            </motion.h2>

            <motion.div className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9 }}>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.75' }}>
                I am a Computer Science Engineering student with a deep curiosity about how software can intersect with artificial intelligence to create transformative experiences.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: '1.75' }}>
                Whether architecting scalable backends, building intuitive frontends, or training models that solve real problems — I approach every challenge as an opportunity to ship something meaningful.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-3"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.9 }}>
              {PILLARS.map(({ icon, title, desc }) => (
                <div key={title} className="p-4 rounded-2xl glass-card group transition-all duration-300 cursor-default"
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(20,184,166,0.06)'; el.style.borderColor = 'rgba(20,184,166,0.2)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                  <div className="text-teal-500 mb-2">{icon}</div>
                  <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — visual card + AI Model */}
          <motion.div className="relative order-2 lg:order-2"
            style={{ height: 'clamp(350px, 50vh, 550px)' }}
            initial={{ opacity: 0, x: 48 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {/* AI Model - floats above the card */}
            <motion.div
              className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 w-full"
              style={{
                height: 'clamp(200px, 25vh, 280px)',
                x: modelX,
                opacity: modelOpacity,
              }}
            >
              <AIModel3D style={{ width: '100%', height: '100%', minHeight: '200px' }} />
            </motion.div>

            {/* Card */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden glass-card teal-glow mt-20">
              {/* Inner glow */}
              <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20,184,166,0.08) 0%, transparent 70%)' }} />
              {/* Code-style decorative text */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 py-8 font-mono">
                {[
                  { color: 'rgba(20,184,166,0.7)', text: 'const vaishnavi = {' },
                  { color: 'rgba(255,255,255,0.35)', text: '  role: "Full Stack AI Eng.",' },
                  { color: 'rgba(255,255,255,0.35)', text: '  skills: ["React", "Python",' },
                  { color: 'rgba(255,255,255,0.35)', text: '    "Node.js", "TensorFlow"],' },
                  { color: 'rgba(20,184,166,0.5)', text: '  gpa: 7.52,' },
                  { color: 'rgba(255,255,255,0.35)', text: '  available: true,' },
                  { color: 'rgba(20,184,166,0.5)', text: '  building: "impactful" +' },
                  { color: 'rgba(20,184,166,0.5)', text: '    " products"' },
                  { color: 'rgba(20,184,166,0.7)', text: '}' },
                ].map((line, i) => (
                  <motion.p key={i} className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: line.color }}
                    initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}>
                    {line.text}
                  </motion.p>
                ))}
              </div>
              {/* Teal corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(20,184,166,0.15), transparent 70%)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
