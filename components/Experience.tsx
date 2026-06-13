'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight, ExternalLink  } from 'lucide-react';


const TIMELINE = [
    {
  id: 1,
  role: "AI/ML Research Contributor",
  company: "Bharat College of Engineering",
  type: "Academic Research",
  duration: "Jan 2025 — Apr 2026",
  location: "Mumbai, Maharashtra",
  status: "completed",

  verification: {
  label: "View Research Paper",
  link: "https://drive.google.com/file/d/1BWzKPbGpWlzORCHmLkcSVkCAa66W9GPS/view?usp=drive_link"
},

  achievements: [
    "Co-authored a research paper on a Multimodal Deepfake Detection System leveraging audio-visual feature fusion and deep learning techniques",
    "Developed and evaluated deepfake detection models using multimodal datasets for enhanced manipulation detection accuracy",
    "Implemented a sentiment analysis pipeline achieving 91% accuracy on a student feedback dataset",
    "Mentored 3 teammates on machine learning fundamentals and research methodologies"
  ],

  stack: ["Python", "TensorFlow", "PyTorch", "HuggingFace", "SQLite"]
},

  {
    id: 2,
    role: "Frontend Developer Intern",
    company: "InternPro",
    type: "Internship",
    duration: "6weeks",
    location: "Mumbai, India · Remote",
    status: "completed",
    verification: {
  label: "View",
  link: "https://drive.google.com/file/d/10LTTywNWjMqbLPUH6_whbG3v_WPC4lfM/view?usp=drive_link"
},
    achievements: [
      "Developed responsive and interactive user interfaces using React.js and Tailwind CSS",
      "Collaborated with backend developers to ensure seamless website functionality and performance",
      "Built reusable UI components by converting design wireframes into production-ready code",
      "Integrated AI-powered features using OpenAI API and improved user experience across devices"
    ],
    stack: [
      "React.js",
      "JavaScript",
      "Tailwind CSS",
      "OpenAI API",
      "AI Agent",
      "Web Responsiveness"
    ]
  },

  {
    id: 3,
    role: "Freelancer",
    company: "Self-Employed",
    type: "Freelance",
    duration: "2025",
    location: "Remote",
    status: "completed",
    achievements: [
      "Contributed to the development of 2 client web projects using JavaScript and React",
      "Implemented responsive UI components and interactive frontend features",
      "Collaborated with project stakeholders to deliver requested functionality",
      "Assisted in debugging, testing, and optimizing application performance"
    ],
    stack: [
      "JavaScript",
      "React",
      "HTML",
      "CSS",
      "Git"
    ]
  }
];


export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="experience" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#0f172a' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.5)' }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>Experience</span>
          </motion.div>
          <motion.h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Where I&apos;ve<br /><span className="teal-text">made an impact.</span>
          </motion.h2>
        </div>

        <div className="relative">
          <motion.div className="absolute left-5 top-0 bottom-0 w-px timeline-teal"
            initial={{ scaleY: 0, originY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ delay: 0.3, duration: 1.4 }} />
          <div className="space-y-10 pl-14">
            {TIMELINE.map((item, i) => (
              <motion.div key={item.id} className="relative"
                initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.18, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <div className="absolute -left-[52px] top-5">
                  <motion.div className="w-3 h-3 rounded-full"
                    style={{
                      background: item.status === 'current' ? '#14b8a6' : 'rgba(20,184,166,0.3)',
                      border: '2px solid #0f172a',
                      boxShadow: item.status === 'current' ? '0 0 0 2px rgba(20,184,166,0.3), 0 0 14px rgba(20,184,166,0.4)' : 'none',
                    }}
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.18, type: 'spring' }} />
                  {item.status === 'current' && (
                    <motion.div className="absolute inset-0 rounded-full" style={{ background: 'rgba(20,184,166,0.3)' }}
                      animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  )}
                </div>
                <div className="rounded-2xl p-6 transition-all duration-300 glass-card"
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(20,184,166,0.04)'; el.style.borderColor = 'rgba(20,184,166,0.15)'; el.style.boxShadow = '0 8px 40px rgba(20,184,166,0.06)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.boxShadow = 'none'; }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-xl flex-shrink-0" style={{ background: item.status === 'current' ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${item.status === 'current' ? 'rgba(20,184,166,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
                        <Briefcase size={14} style={{ color: item.status === 'current' ? '#14b8a6' : 'rgba(255,255,255,0.4)' }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{item.role}</h3>
                        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.company}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full flex-shrink-0 glass-teal"
                      style={{ color: item.status === 'current' ? '#14b8a6' : 'rgba(20,184,166,0.6)' }}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-5 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    <span className="flex items-center gap-1.5"><Calendar size={11} />{item.duration}</span>
                    <span>{item.location}</span>
                  </div>
                  <ul className="space-y-2.5 mb-5">
                    {item.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <ChevronRight size={13} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(20,184,166,0.5)' }} />{a}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mb-4">
  {item.stack.map(s => (
    <span
      key={s}
      className="px-2 py-0.5 text-xs rounded-md"
      style={{
        background: 'rgba(20,184,166,0.08)',
        color: 'rgba(20,184,166,0.7)',
        border: '1px solid rgba(20,184,166,0.12)'
      }}
    >
      {s}
    </span>
  ))}
</div>

{item.verification && (
  <a
    href={item.verification.link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
    style={{
      background: 'rgba(20,184,166,0.08)',
      color: '#14b8a6',
      border: '1px solid rgba(20,184,166,0.2)'
    }}
  >
    {item.verification.label}
    <ExternalLink size={14} />
  </a>
)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
