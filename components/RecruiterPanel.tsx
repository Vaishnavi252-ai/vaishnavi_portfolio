'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Briefcase, Code2, Award, Mail, Phone, Linkedin, Github, User } from 'lucide-react';

const QUICK_STATS = [
  { value: '5+', label: 'Projects Built' },
  { value: '30+', label: 'Technologies' },
  { value: '8', label: 'Certifications' },
  { value: '7.52', label: 'Current GPA' },
];

const SKILLS_PREVIEW = ['Python', 'React', 'Next.js', 'Node.js', 'FastAPI', 'TailwindCSS', 'MongoDB', 'MySQL', 'TensorFlow', 'Git'];

const EXPERIENCE_PREVIEW = [
  
  {
    role: 'AI/ML Research Contributor',
    org: 'Bharat College of Engineering',
    duration: 'Jan 2025 – Apr 2026'
  },
  {
    role: 'Frontend Developer Intern',
    org: 'InternPro',
    duration: 'Jun 2025 – Aug 2025'
  },
  {
    role: 'Freelancer',
    org: 'Self-Employed',
    duration: '2025'
  }

];

const CERTS_PREVIEW = [
  'Oracle Generative AI Professional',
  'AI Agents Using Python',
  'Frontend Development Skill Test Certification',
];

export default function RecruiterPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button className="fixed top-5 right-5 z-50"
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} aria-label="Open Recruiter Panel">
        <motion.div className="relative flex items-center gap-2 px-3 py-2 rounded-full glass-teal"
          whileHover={{ background: 'rgba(20,184,166,0.15)', borderColor: 'rgba(20,184,166,0.35)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.25)' }}>
            <User size={13} style={{ color: '#14b8a6' }} />
          </div>
          <span className="text-xs font-medium hidden sm:block pr-1" style={{ color: 'rgba(20,184,166,0.85)' }}>Recruiter View</span>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#14b8a6' }}>
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#14b8a6', opacity: 0.75 }} />
          </span>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm overflow-y-auto"
              style={{ background: 'rgba(10,10,10,0.98)', backdropFilter: 'blur(32px)', borderLeft: '1px solid rgba(20,184,166,0.15)', boxShadow: '-24px 0 80px rgba(20,184,166,0.08)' }}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}>

              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5"
                style={{ background: 'rgba(10,10,10,0.9)', borderBottom: '1px solid rgba(20,184,166,0.1)', backdropFilter: 'blur(16px)' }}>
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: 'rgba(20,184,166,0.6)' }}>Recruiter Dashboard</p>
                  <h2 className="text-sm font-semibold text-white">Vaishnavi Misal</h2>
                </div>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors glass-teal">
                  <X size={15} style={{ color: '#14b8a6' }} />
                </button>
              </div>

              <div className="px-6 pb-8 space-y-6 pt-4">
                {/* Availability */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl glass-teal"
                  style={{ background: 'rgba(20,184,166,0.08)' }}>
                  <span className="relative flex w-2 h-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#14b8a6' }} />
                    <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#14b8a6', opacity: 0.5 }} />
                  </span>
                  <span className="text-xs font-medium" style={{ color: '#14b8a6' }}>Available for Opportunities</span>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_STATS.map(({ value, label }) => (
                    <div key={label} className="p-3 rounded-xl text-center glass-card">
                      <p className="text-lg font-bold" style={{ color: '#14b8a6' }}>{value}</p>
                      <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <Section icon={<User size={13} />} title="Summary">
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    Computer Science Engineering student at Bharat College of Engineering with a strong passion for Full Stack and AI-powered application development.
                  </p>
                </Section>

                <Section icon={<GraduationCap size={13} />} title="Education">
                  <div className="space-y-3">
                    <EduItem degree="BE Computer Science" inst="Bharat College of Engineering" detail="GPA: 7.52 · Current" />
                    <EduItem degree="HSC Science" inst="B.N. Bandodkar College" detail="Higher Secondary" />
                  </div>
                </Section>

                <Section icon={<Code2 size={13} />} title="Key Skills">
                  <div className="flex flex-wrap gap-1.5">
                    {SKILLS_PREVIEW.map(s => (
                      <span key={s} className="px-2.5 py-1 text-xs font-medium rounded-full glass-teal"
                        style={{ color: 'rgba(20,184,166,0.8)' }}>{s}</span>
                    ))}
                  </div>
                </Section>

                <Section icon={<Briefcase size={13} />} title="Experience">
                  <div className="space-y-3">
                    {EXPERIENCE_PREVIEW.map(e => (
                      <div key={e.role} className="flex items-start gap-3">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#14b8a6' }} />
                        <div>
                          <p className="text-sm font-medium text-white">{e.role}</p>
                          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{e.org} · {e.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section icon={<Award size={13} />} title="Certifications">
                  <ul className="space-y-2">
                    {CERTS_PREVIEW.map(c => (
                      <li key={c} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(20,184,166,0.5)' }} />{c}
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section icon={<Mail size={13} />} title="Contact">
                  <div className="space-y-2.5">
                    <ContactRow icon={<Mail size={13} />} label="vaishnavimisal878@gmail.com" href="mailto:vaishnavimisal878@gmail.com" />
                    <ContactRow icon={<Phone size={13} />} label="+91 9321785285" href="tel:+91 932178525" />
                    <ContactRow icon={<Linkedin size={13} />} label="linkedin.com/in/vaishnavimisal" href="https://www.linkedin.com/in/vaishnavi-misal-2bbb01291" />
                    <ContactRow icon={<Github size={13} />} label="github.com/vaishnavimisal" href="https://github.com/Vaishnavi252-ai" />
                  </div>
                </Section>

                <a href="/Vaishnavi_Misal_Resume.pdf" download className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#0a0a0a' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(20,184,166,0.4)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                  Download Resume
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: 'rgba(20,184,166,0.6)' }}>{icon}</span>
        <h3 className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(20,184,166,0.5)' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function EduItem({ degree, inst, detail }: { degree: string; inst: string; detail: string }) {
  return (
    <div className="p-3 rounded-xl glass-card">
      <p className="text-sm font-semibold text-white">{degree}</p>
      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{inst}</p>
      <p className="text-xs mt-1" style={{ color: 'rgba(20,184,166,0.6)' }}>{detail}</p>
    </div>
  );
}

function ContactRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-2.5 text-sm transition-colors group"
      style={{ color: 'rgba(255,255,255,0.6)' }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#14b8a6'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)'; }}>
      <span style={{ color: 'rgba(20,184,166,0.6)' }}>{icon}</span>
      {label}
    </a>
  );
}
