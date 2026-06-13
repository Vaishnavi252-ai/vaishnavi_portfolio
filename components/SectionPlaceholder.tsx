'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layers } from 'lucide-react';

interface Props {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  comingSoon?: boolean;
  dark?: boolean;
}

export default function SectionPlaceholder({
  id,
  label,
  title,
  subtitle,
  dark = false,
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-28 flex items-center overflow-hidden"
      style={{ background: dark ? '#0a0a0a' : '#fff', minHeight: '50vh' }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center"
        >
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-6 h-px"
              style={{ background: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            />
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}
            >
              {label}
            </span>
            <div
              className="w-6 h-px"
              style={{ background: dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
            />
          </div>

          {/* Title */}
          <h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight mb-4"
            style={{ color: dark ? '#fff' : '#0a0a0a' }}
          >
            {title}
          </h2>

          <p
            className="text-base max-w-md leading-relaxed mb-12"
            style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
          >
            {subtitle}
          </p>

          {/* Coming soon badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full"
            style={{
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
            }}
          >
            <Layers
              size={14}
              style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
            >
              Sprint 2 — Coming Next
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
