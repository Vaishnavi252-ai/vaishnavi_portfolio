'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'languages', label: 'Languages', sym: '{ }', skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },

  { id: 'frontend', label: 'Frontend', sym: '◈', skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'React', 'Next.js', 'Framer Motion'] },

  { id: 'backend', label: 'Backend', sym: '⌬', skills: ['Node.js', 'Express.js', 'FastAPI', 'Django', 'REST APIs', 'GraphQL'] },

  { id: 'database', label: 'Databases', sym: '⊡', skills: ['MongoDB', 'MySQL', 'SQLite', 'Supabase', 'Firebase'] },

  { id: 'ai', label: 'AI / ML', sym: '◎', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'OpenAI API', 'Pandas'] },

  { id: 'tools', label: 'Tools', sym: '⧉', skills: ['Git', 'GitHub', 'Docker', 'AWS', 'Vercel', 'Linux', 'Figma'] },
];
const SKILL_BARS = [
  { name: 'Python', percentage: 90, color: '#14b8a6' },
  { name: 'JavaScript', percentage: 88, color: '#2dd4bf' },
  { name: 'React', percentage: 85, color: '#14b8a6' },
  { name: 'Node.js', percentage: 82, color: '#2dd4bf' },
  { name: 'Next.js', percentage: 80, color: '#14b8a6' },
  { name: 'TypeScript', percentage: 78, color: '#2dd4bf' },
  { name: 'Express.js', percentage: 76, color: '#14b8a6' },
  { name: 'MongoDB', percentage: 75, color: '#2dd4bf' },
  { name: 'Tailwind CSS', percentage: 80, color: '#14b8a6' },
  { name: 'SQL', percentage: 72, color: '#2dd4bf' }
];

export default function Skills() {
  const [active, setActive] = useState<string>('languages'); // First card open by default
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section id="skills" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#050505' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20,184,166,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-20">
          <motion.div className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.4)' }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>Technical Expertise</span>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.4)' }} />
          </motion.div>
          <motion.h2 className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Crafted with the <span className="teal-text">right tools.</span>
          </motion.h2>
        </div>

        {/* Skill Progress Bars */}
        <motion.div className="mb-12"
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.9 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILL_BARS.map((skill, i) => (
              <motion.div key={skill.name} className="group"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-white">{skill.name}</span>
                  <span className="text-xs font-mono" style={{ color: 'rgba(20,184,166,0.7)' }}>{skill.percentage}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${skill.color}, rgba(20,184,166,0.6))` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.percentage}%` } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Cards */}
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9 }}>
          {CATEGORIES.map((cat, i) => {
            const isActive = active === cat.id;
            return (
              <motion.div key={cat.id} className="relative cursor-pointer select-none rounded-2xl overflow-hidden"
                onClick={() => setActive(isActive ? '' : cat.id)}
                initial={{ opacity: 0, y:20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.7 }}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                style={{
                  border: `1px solid ${isActive ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  background: isActive ? 'rgba(20,184,166,0.08)' : 'rgba(255,255,255,0.02)',
                  transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  boxShadow: isActive ? '0 8px 32px rgba(20,184,166,0.12)' : '0 1px 4px rgba(0,0,0,0.2)',
                }}>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-mono" style={{ color: isActive ? '#14b8a6' : 'rgba(255,255,255,0.25)' }}>{cat.sym}</span>
                    <motion.span animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.25 }}
                      style={{ color: isActive ? '#14b8a6' : 'rgba(255,255,255,0.2)' }} className="text-lg font-thin leading-none">+</motion.span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: isActive ? '#2dd4bf' : 'rgba(255,255,255,0.8)' }}>{cat.label}</h3>
                  <p className="text-xs" style={{ color: isActive ? 'rgba(20,184,166,0.6)' : 'rgba(255,255,255,0.3)' }}>{cat.skills.length} technologies</p>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                      <div className="px-5 pb-5 pt-1 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid rgba(20,184,166,0.12)' }}>
                        {cat.skills.map((skill, si) => (
                          <motion.span key={skill} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: si * 0.05 }}
                            className="px-2.5 py-1 text-xs font-medium rounded-full glass-teal" style={{ color: '#2dd4bf' }}>
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.p className="text-center mt-8 text-xs font-mono" style={{ color: 'rgba(20,184,166,0.3)' }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
          Click a category to explore technologies
        </motion.p>
      </div>
    </section>
  );
}
