'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const FEATURED = {

  name: 'Skillora',
  status: 'In Progress',

  tagline: 'Learn. Teach. Earn. Grow Together.',

  description:
    'Skillora is a SaaS-level peer-to-peer learning ecosystem that connects learners, mentors, and organizations through live mentorship, AI-powered career tools, communities, resource sharing, skill tracking, and marketplace learning experiences. Users can learn from experts, become mentors themselves, conduct live classrooms, build professional portfolios, track progress, and monetize their expertise within a single platform.',

  image: '/Skillora.png',

  metrics: [
    { value: '15+', label: 'Core Modules Built' },
    { value: '50+', label: 'REST API Endpoints' },
    { value: '7', label: 'Development Sprints Completed' },
    { value: '100%', label: 'Full Stack TypeScript' },
  ],

  stack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'MongoDB',
    'JWT Authentication',
    'Socket.io',
    'WebRTC',
    'Zustand',
    'React Query'
  ],

  challenges: [
    'Built role-based architecture supporting Learners, Mentors, Organizations, and Admins',
    'Implemented secure JWT authentication with onboarding and profile completion flow',
    'Developed mentor discovery, booking, live classroom, and session management system',
    'Created real-time classroom foundation using Socket.io and WebRTC',
    'Designed payment, subscription, marketplace, and mentor monetization architecture',
    'Integrated AI-powered modules including Career Twin, AI Mentor, Resume Review, Roadmap Generator, and Match Engine',
    'Built scalable community, resource sharing, portfolio, and progress tracking systems'
  ],

  github: 'https://github.com/Vaishnavi252-ai/Skillora',
  live: '#'

};

const PROJECTS = [
  {
  id: 1,
  name: 'Vilavie Jewel Ecom Website',
  tagline: 'Modern Full-Stack Jewellery E-Commerce Platform',
  description:
    'A production-ready jewellery e-commerce application featuring secure authentication, wishlist, shopping cart, Razorpay & Cash on Delivery payments, order tracking, and a comprehensive admin dashboard for product and order management.',
  image: '/jewelwebsite.png', 
  stack: [
    'React',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'Supabase',
    'Razorpay',
    'React Query'
  ],
  github: 'https://github.com/Vaishnavi252-ai/jewelwebsite',
  live: 'https://jewelwebsite.vercel.app',
},
  {
    id: 2, name: 'DataViz Pro', tagline: 'Interactive ML model visualisation',
    description: 'Analytics dashboard that transforms complex ML datasets into interactive drill-down visualisations. Supports CSV uploads and automatic chart generation.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    stack: ['Python', 'FastAPI', 'React', 'Recharts', 'Pandas'], github: '#', live: '#',
  },
  {
  id: 3,
  name: 'Imaze',
  tagline: 'Responsive image gallery powered by the Pexels API',
  description:
    'A responsive image gallery built with HTML, CSS, and JavaScript. Features image search using the Pexels API, lightbox preview, image downloads, dark/light mode with localStorage persistence, and a fully responsive interface.This was my first JavaScript project and helped me learn DOM manipulation, API integration, asynchronous JavaScript, LocalStorage, and responsive web development.',
  image: '/imaze.png',
  stack: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'Pexels API',
    'LocalStorage'
  ],
  github: 'https://github.com/Vaishnavi252-ai/Imaze',
  live: 'https://courageous-baklava-f77bd5.netlify.app/',
},
  {
    id: 4, name: 'MindMap AI', tagline: 'AI-assisted knowledge mapping',
    description: 'Drag-and-drop mind mapping tool with an AI co-pilot that suggests connections, generates sub-topics, and helps build comprehensive knowledge graphs.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    stack: ['React', 'OpenAI API', 'TypeScript', 'Framer Motion'], github: '#', live: '#',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section id="projects" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: `radial-gradient(circle, rgba(20,184,166,0.8) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.4)' }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>Work & Projects</span>
          </motion.div>
          <motion.h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <span className="text-white">Built with intention,</span><br />
            <span className="teal-text">shipped with care.</span>
          </motion.h2>
        </div>

        {/* Featured */}
        <motion.div className="mb-20"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <div className="flex items-center gap-2 mb-5">
            <Star size={12} style={{ color: '#14b8a6' }} fill="rgba(20,184,166,0.3)" />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(20,184,166,0.6)' }}>Featured Project</span>
          </div>
          <div className="relative rounded-3xl overflow-hidden glass-card teal-glow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative overflow-hidden" style={{ minHeight: '280px' }}>
                <img src={FEATURED.image} alt={FEATURED.name} className="w-full h-full object-cover" style={{ minHeight: '280px' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,10,10,0.9) 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.35)' }} />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-white mb-2">{FEATURED.name}</h3>
                <p className="text-sm mb-4" style={{ color: 'rgba(20,184,166,0.7)' }}>{FEATURED.tagline}</p>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>{FEATURED.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {FEATURED.metrics.map(m => (
                    <div key={m.label} className="p-3 rounded-xl" style={{ background: 'rgba(20,184,166,0.06)', border: '1px solid rgba(20,184,166,0.15)' }}>
                      <p className="text-base font-bold" style={{ color: '#2dd4bf' }}>{m.value}</p>
                      <p className="text-xs" style={{ color: 'rgba(20,184,166,0.6)' }}>{m.label}</p>
                    </div>
                  ))}
                </div>
                <ul className="space-y-1.5 mb-6">
                  {FEATURED.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(20,184,166,0.5)' }} />{c}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {FEATURED.stack.map(s => (
                    <span key={s} className="px-2 py-0.5 text-xs rounded-md" style={{ background: 'rgba(20,184,166,0.08)', color: 'rgba(20,184,166,0.8)', border: '1px solid rgba(20,184,166,0.15)' }}>{s}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={FEATURED.github} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all glass-teal"
                    style={{ color: 'rgba(20,184,166,0.9)' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(20,184,166,0.15)'; el.style.borderColor = 'rgba(20,184,166,0.3)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(20,184,166,0.06)'; el.style.borderColor = 'rgba(20,184,166,0.2)'; }}>
                    <Github size={13} /> GitHub
                  </a>
                  <a href={FEATURED.live} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#0a0a0a' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(20,184,166,0.4)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}>
                    <ExternalLink size={13} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Slider */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.9 }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold" style={{ color: 'rgba(20,184,166,0.6)' }}>More Projects</h3>
            <div className="flex gap-2">
              {[{ fn: scrollPrev, can: canPrev, icon: <ChevronLeft size={15} /> }, { fn: scrollNext, can: canNext, icon: <ChevronRight size={15} /> }].map((btn, i) => (
                <button key={i} onClick={btn.fn} disabled={!btn.can}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ background: btn.can ? 'rgba(20,184,166,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${btn.can ? 'rgba(20,184,166,0.25)' : 'rgba(255,255,255,0.07)'}`, color: btn.can ? '#14b8a6' : 'rgba(255,255,255,0.2)', cursor: btn.can ? 'pointer' : 'not-allowed' }}>
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4" style={{ touchAction: 'pan-y' }}>
              {PROJECTS.map(project => (
                <div key={project.id} className="flex-none" style={{ width: 'clamp(280px, 40%, 360px)' }}>
                  <div className="rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer h-full glass-card"
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(20,184,166,0.04)'; el.style.borderColor = 'rgba(20,184,166,0.15)'; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 16px 48px rgba(20,184,166,0.08)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.background = 'rgba(255,255,255,0.02)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                    <div className="relative overflow-hidden" style={{ height: '160px' }}>
                      <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.7), transparent)' }} />
                    </div>
                    <div className="p-5">
                      <h4 className="text-sm font-bold text-white mb-1">{project.name}</h4>
                      <p className="text-xs mb-3" style={{ color: 'rgba(20,184,166,0.6)' }}>{project.tagline}</p>
                      <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.stack.slice(0, 3).map(s => (
                          <span key={s} className="px-2 py-0.5 text-[10px] rounded" style={{ background: 'rgba(20,184,166,0.08)', color: 'rgba(20,184,166,0.7)' }}>{s}</span>
                        ))}
                        {project.stack.length > 3 && <span className="px-2 py-0.5 text-[10px] rounded" style={{ color: 'rgba(20,184,166,0.5)' }}>+{project.stack.length - 3}</span>}
                      </div>
                      <div className="flex gap-2">
                        {[{ href: project.github, icon: <Github size={11} />, label: 'Code' }, { href: project.live, icon: <ExternalLink size={11} />, label: 'Demo' }].map(btn => (
                          <a key={btn.label} href={btn.href} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
                            style={{ background: 'rgba(20,184,166,0.06)', color: 'rgba(20,184,166,0.8)', border: '1px solid rgba(20,184,166,0.15)' }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(20,184,166,0.12)'; el.style.borderColor = 'rgba(20,184,166,0.25)'; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(20,184,166,0.06)'; el.style.borderColor = 'rgba(20,184,166,0.15)'; }}>
                            {btn.icon} {btn.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-5">
            {PROJECTS.map((_, i) => (
              <button key={i} onClick={() => emblaApi?.scrollTo(i)} className="rounded-full transition-all"
                style={{ width: selectedIndex === i ? '20px' : '6px', height: '6px', background: selectedIndex === i ? '#14b8a6' : 'rgba(20,184,166,0.2)' }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
