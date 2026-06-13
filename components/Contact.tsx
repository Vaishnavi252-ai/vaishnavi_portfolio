'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, AlertCircle, Briefcase, Code2, Cpu, Globe } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const AVAILABILITY = [
  { icon: <Briefcase size={12} />, label: 'Internships' },
  { icon: <Globe size={12} />, label: 'Full Stack Roles' },
  { icon: <Code2 size={12} />, label: 'Frontend Roles' },
  { icon: <Cpu size={12} />, label: 'AI Engineering' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert([form]);
    setStatus(error ? 'error' : 'success');
    if (!error) setForm({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 overflow-hidden" style={{ background: '#111827' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(20,184,166,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-16">
          <motion.div className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="w-6 h-px" style={{ background: 'rgba(20,184,166,0.5)' }} />
            <span className="text-xs font-mono tracking-widest uppercase" style={{ color: '#14b8a6', opacity: 0.7 }}>Contact</span>
          </motion.div>
          <motion.h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            Let&apos;s build<br /><span className="teal-text">something great.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.9 }}>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Open to full-time roles, internships, and meaningful collaborations. If you&apos;re working on something interesting, I&apos;d love to hear about it.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: <Mail size={14} />, label: 'vaishnavimisal878@gmail.com', href: 'mailto:vaishnavimisal878@gmail.com' },
                { icon: <Phone size={14} />, label: '+91 9321785285', href: 'tel:+91 9321785285' },
                { icon: <Linkedin size={14} />, label: 'linkedin.com/in/vaishnavi-misal-2bbb01291', href: 'www.linkedin.com/in/vaishnavi-misal-2bbb01291' },
                { icon: <Github size={14} />, label: 'https://github.com/Vaishnavi252-ai', href: 'https://github.com/Vaishnavi252-ai' },
              ].map(({ icon, label, href }) => (
                <a
  key={label}
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 text-sm transition-colors"
  style={{ color: 'rgba(255,255,255,0.45)' }}
  onMouseEnter={e => {
    const el = e.currentTarget as HTMLAnchorElement;
    el.style.color = '#14b8a6';
  }}
  onMouseLeave={e => {
    const el = e.currentTarget as HTMLAnchorElement;
    el.style.color = 'rgba(255,255,255,0.45)';
  }}
>
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg glass-teal" style={{ color: '#14b8a6' }}>{icon}</span>
                  {label}
                </a>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex w-2 h-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: '#14b8a6', boxShadow: '0 0 8px rgba(20,184,166,0.7)' }} />
                  <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#14b8a6', opacity: 0.5 }} />
                </span>
                <span className="text-xs font-mono tracking-wider" style={{ color: 'rgba(20,184,166,0.6)' }}>Available for opportunities</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {AVAILABILITY.map(({ icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glass-teal" style={{ color: 'rgba(20,184,166,0.8)' }}>
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.9 }}>
            <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl p-7 glass-card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-2 font-mono tracking-wide" style={{ color: 'rgba(20,184,166,0.6)' }}>Name</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" required
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(20,184,166,0.4)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(20,184,166,0.1)'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }} />
                </div>
                <div>
                  <label className="block text-xs mb-2 font-mono tracking-wide" style={{ color: 'rgba(20,184,166,0.6)' }}>Email</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" required
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(20,184,166,0.4)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(20,184,166,0.1)'; }}
                    onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-2 font-mono tracking-wide" style={{ color: 'rgba(20,184,166,0.6)' }}>Message</label>
                <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project or opportunity..." required
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all resize-none"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', lineHeight: '1.6' }}
                  onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(20,184,166,0.4)'; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px rgba(20,184,166,0.1)'; }}
                  onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.target as HTMLTextAreaElement).style.boxShadow = 'none'; }} />
              </div>
              <button type="submit" disabled={status === 'loading' || status === 'success'}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: status === 'success' ? 'rgba(20,184,166,0.15)' : 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  color: status === 'success' ? '#14b8a6' : '#0a0a0a',
                  border: status === 'success' ? '1px solid rgba(20,184,166,0.3)' : 'none',
                  opacity: status === 'loading' ? 0.7 : 1,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}>
                <AnimatePresence mode="wait">
                  {status === 'loading' && <motion.span key="l" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="w-4 h-4 rounded-full border-2 border-teal-900/30 border-t-teal-900/80 animate-spin" />Sending...</motion.span>}
                  {status === 'success' && <motion.span key="s" className="flex items-center gap-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><CheckCircle size={15} />Message Sent!</motion.span>}
                  {status === 'error' && <motion.span key="e" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><AlertCircle size={15} />Try Again</motion.span>}
                  {status === 'idle' && <motion.span key="i" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Send size={14} />Send Message</motion.span>}
                </AnimatePresence>
              </button>
              <p className="text-center text-xs" style={{ color: 'rgba(20,184,166,0.4)' }}>Typically respond within 24 hours</p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
