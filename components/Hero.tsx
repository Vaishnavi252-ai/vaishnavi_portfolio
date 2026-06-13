'use client';

import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

const AIModel3D = dynamic(() => import('./AIModel3D'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px]" style={{ background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.08), transparent 70%)' }} />,
});

const TITLES = [
  'Full Stack AI Developer',
  'MERN Stack Developer',
  'Web Developer',
  'React.js Developer',
  'Python Developer',
  'AI/ML Engineer',
];

const ORBIT_TECHS = [
  { label: 'React', angle: 0, radius: 165 },
  { label: 'Python', angle: 45, radius: 185 },
  { label: 'Next.js', angle: 90, radius: 175 },
  { label: 'Node.js', angle: 135, radius: 190 },
  { label: 'MongoDB', angle: 180, radius: 168 },
  { label: 'TypeScript', angle: 225, radius: 178 },
  { label: 'AI/ML', angle: 270, radius: 188 },
  { label: 'FastAPI', angle: 315, radius: 172 },
];

function GlitchText({ text, trigger = false }: { text: string; trigger?: boolean }) {
  const [glitch, setGlitch] = useState(false);
  const [glitchStyle, setGlitchStyle] = useState({ clip1: '0%', clip2: '100%', offset1: -2, offset2: 2 });
  const countRef = useRef(0);

  useEffect(() => {
    // Random glitch intervals
    const glitchInterval = setInterval(() => {
      setGlitch(true);

      // Randomize glitch effect each time
      const clip1 = Math.random() * 60 + 20;
      const clip2 = clip1 + (Math.random() * 30 + 10);
      setGlitchStyle({
        clip1: `${clip1}%`,
        clip2: `${Math.min(clip2, 95)}%`,
        offset1: -(Math.random() * 3 + 1),
        offset2: Math.random() * 3 + 1,
      });

      countRef.current = 0;

      // Multiple glitch flashes
      const glitchLoop = setInterval(() => {
        countRef.current++;
        if (countRef.current < 5) {
          setGlitchStyle({
            clip1: `${Math.random() * 60 + 20}%`,
            clip2: `${Math.random() * 30 + 50}%`,
            offset1: -(Math.random() * 4 + 1),
            offset2: Math.random() * 4 + 1,
          });
        } else {
          clearInterval(glitchLoop);
          setGlitch(false);
        }
      }, 50);

      setTimeout(() => clearInterval(glitchLoop), 500);
    }, 2000 + Math.random() * 1000);

    return () => {
      clearInterval(glitchInterval);
    };
  }, []);

  // Trigger glitch on external trigger
  useEffect(() => {
    if (trigger) {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 300);
    }
  }, [trigger]);

  return (
    <span className="relative inline-block">
      {/* Main text */}
      <span
        className="relative z-10"
        style={{
          color: '#14b8a6',
          textShadow: glitch ? '3px 0 #00ffff, -3px 0 #ff00ff' : '0 0 10px rgba(20,184,166,0.3)',
          animation: glitch ? 'glitch-skew 0.2s ease infinite' : 'none',
        }}
      >
        {text}
      </span>

      {/* Cyan glitch layer */}
      {glitch && (
        <motion.span
          className="absolute top-0 left-0 font-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          style={{
            color: '#00ffff',
            clipPath: `polygon(0 ${glitchStyle.clip1}, 100% ${glitchStyle.clip1}, 100% ${glitchStyle.clip2}, 0 ${glitchStyle.clip2})`,
            transform: `translate(${glitchStyle.offset1}px, 0)`,
            textShadow: '0 0 8px #00ffff',
          }}
        >
          {text}
        </motion.span>
      )}

      {/* Magenta glitch layer */}
      {glitch && (
        <motion.span
          className="absolute top-0 left-0 font-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          style={{
            color: '#ff00ff',
            clipPath: `polygon(0 ${100 - parseInt(glitchStyle.clip2)}%, 100% ${100 - parseInt(glitchStyle.clip2)}%, 100% ${100 - parseInt(glitchStyle.clip1)}%, 0 ${100 - parseInt(glitchStyle.clip1)}%)`,
            transform: `translate(${glitchStyle.offset2}px, 0)`,
            textShadow: '0 0 8px #ff00ff',
          }}
        >
          {text}
        </motion.span>
      )}

      {/* Scanline effect */}
      {glitch && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(14,184,166,0.1) 2px, rgba(14,184,166,0.1) 4px)',
          }}
        />
      )}
    </span>
  );
}

function GlitchRotatingTitle() {
  const [index, setIndex] = useState(0);
  const [triggerGlitch, setTriggerGlitch] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      // Trigger glitch before transition
      setTriggerGlitch(true);
      setIsAnimating(true);

      setTimeout(() => {
        setIndex(i => (i + 1) % TITLES.length);
        setTriggerGlitch(false);
      }, 200);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 2800);

    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-sm sm:text-base font-semibold tracking-wide absolute left-0"
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            x: isAnimating ? [0, -3, 3, -2, 2, 0] : 0,
          }}
          exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 0.3 },
            x: { duration: 0.3 }
          }}
        >
          <GlitchText text={TITLES[index]} trigger={triggerGlitch} />
        </motion.p>
      </AnimatePresence>

      {/* Ambient scanline */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.05), transparent)',
        }}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function TechOrbit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Orbit rings */}
      {[165, 185].map((r, i) => (
        <motion.div
          key={r}
          className="absolute rounded-full"
          style={{
            width: r * 2 + 50,
            height: r * 2 + 50,
            border: '1px solid rgba(20,184,166,0.1)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ))}

      {/* Center glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 100,
          height: 100,
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.15) 0%, transparent 70%)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
      />

      {/* Orbiting tech items - animate from center outward */}
      {ORBIT_TECHS.map((tech, i) => {
        const rad = (tech.angle * Math.PI) / 180;
        const x = Math.cos(rad) * tech.radius;
        const y = Math.sin(rad) * tech.radius;

        return (
          <motion.div
            key={tech.label}
            className="absolute px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap"
            style={{
              left: '50%',
              top: '50%',
              x: -30,
              y: -12,
              background: 'rgba(20,184,166,0.08)',
              border: '1px solid rgba(20,184,166,0.25)',
              color: 'rgba(20,184,166,0.85)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{
              opacity: 0,
              scale: 0,
              x: -30,
              y: -12,
            }}
            animate={{
              opacity: [0, 0.5, 1],
              scale: [0.3, 1.1, 1],
              x: x - 30,
              y: y - 12,
            }}
            transition={{
              delay: 1.2 + i * 0.12,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            {/* Glitch effect on appearance */}
            <motion.span
              animate={{
                opacity: [1, 0.8, 1],
                x: [0, i % 2 === 0 ? 1 : -1, 0],
              }}
              transition={{
                delay: 1.2 + i * 0.12 + 0.3,
                duration: 0.15,
              }}
            >
              {tech.label}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#050505' }}>
      {/* Animated grid */}
      <motion.div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: `linear-gradient(rgba(20,184,166,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.6) 1px, transparent 1px)`, backgroundSize: '64px 64px' }}
        animate={{ backgroundPosition: ['0px 0px', '64px 64px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />

      {/* Teal radial glow */}
      <div className="absolute pointer-events-none" style={{ width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(20,184,166,0.07) 0%, transparent 65%)', top: '-15%', right: '-5%' }} />
      <div className="absolute pointer-events-none" style={{ width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(20,184,166,0.04) 0%, transparent 65%)', bottom: '-10%', left: '0%' }} />

      {/* Floating particles */}
      {[...Array(16)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width: '1.5px', height: '1.5px', background: i % 3 === 0 ? 'rgba(20,184,166,0.6)' : 'rgba(255,255,255,0.3)', left: `${8 + (i * 5.7) % 84}%`, top: `${12 + (i * 7.3) % 76}%` }}
          animate={{ y: [0, -(14 + (i % 5) * 7), 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + (i % 4) * 1.3, delay: (i * 0.4) % 3, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,5,5,0.9))' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-9rem)]">

          {/* Left - AI Model */}
          <motion.div className="relative order-2 lg:order-1 flex items-center justify-center"
            style={{ height: 'clamp(400px, 50vh, 550px)' }}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
            {/* Tech orbit around model */}
            <TechOrbit />
            <AIModel3D style={{ width: '100%', height: '100%' }} />
          </motion.div>

          {/* Right - Text content */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex items-center gap-2 mb-8 w-fit">
              <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase rounded-full glass-teal" style={{ color: '#14b8a6', letterSpacing: '0.12em' }}>
                Available for opportunities
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" style={{ boxShadow: '0 0 8px rgba(20,184,166,0.9)' }} />
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="font-heading text-[clamp(2.8rem,6.5vw,5.5rem)] font-bold leading-[1.02] mb-4">
              <span className="block gradient-text-white">Vaishnavi</span>
              <span className="block teal-text">Misal</span>
            </motion.h1>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: 'rgba(20,184,166,0.5)' }} />
              <GlitchRotatingTitle />
            </motion.div>

            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base sm:text-lg max-w-lg mb-10" style={{ color: 'rgba(255,255,255,0.38)', lineHeight: '1.75' }}>
              Computer Science Engineering student passionate about building AI-powered and modern web applications that solve real problems.
            </motion.p>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-3">
              <button onClick={() => scrollTo('contact')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{ background: '#14b8a6', color: '#fff', boxShadow: '0 0 0 0 rgba(20,184,166,0)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 32px rgba(20,184,166,0.45)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 0 0 rgba(20,184,166,0)')}>
                <MessageCircle size={15} /> Contact Me
              </button>
              <button onClick={() => scrollTo('projects')}
                className="group flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 glass-teal"
                style={{ color: '#2dd4bf' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(20,184,166,0.12)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(20,184,166,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(20,184,166,0.06)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                View Projects <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Scroll hint */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mt-14">
              <div className="flex flex-col gap-1 items-center">
                <div className="w-px h-7" style={{ background: 'linear-gradient(to bottom, transparent, rgba(20,184,166,0.4))' }} />
                <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-3" style={{ background: 'rgba(20,184,166,0.4)' }} />
              </div>
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: 'rgba(20,184,166,0.3)', letterSpacing: '0.15em' }}>Scroll</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
