'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: 'AI ENGINE INITIALIZING...', delay: 400, color: 'rgba(20,184,166,0.5)' },
  { text: 'LOADING MODULES: REACT · NEXT.JS · PYTHON · AI', delay: 900, color: 'rgba(255,255,255,0.2)' },
  { text: 'CALIBRATING EXPERIENCE...', delay: 1600, color: 'rgba(20,184,166,0.4)' },
  { text: 'SYSTEM READY', delay: 2200, color: '#14b8a6' },
];

function TypedName({ onDone }: { onDone: () => void }) {
  const full = 'VAISHNAVI MISAL';
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (displayed.length >= full.length) { onDone(); return; }
    const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    return () => clearTimeout(t);
  }, [displayed, full, onDone]);

  return (
    <div className="flex items-baseline gap-0 font-heading">
      <span className="text-[clamp(2.2rem,6vw,4rem)] font-bold tracking-wider text-white">
        {displayed}
      </span>
      {displayed.length < full.length && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.45, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-[0.85em] ml-1 bg-teal-500 align-middle" />
      )}
    </div>
  );
}

export default function PreLoader({ onComplete }: { onComplete: () => void }) {
  const [nameDone, setNameDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [flashScreen, setFlashScreen] = useState(false);
  const [exiting, setExiting] = useState(false);

  // After name typed, show boot lines one by one
  useEffect(() => {
    if (!nameDone) return;
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(v => [...v, i]), line.delay);
    });
    // progress bar
    const interval = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(interval); return 100; } return p + 2; });
    }, 30);
    // flash + exit
    setTimeout(() => setFlashScreen(true), 2700);
    setTimeout(() => { setFlashScreen(false); setExiting(true); }, 3100);
    setTimeout(() => onComplete(), 3500);
    return () => clearInterval(interval);
  }, [nameDone, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#020202' }}
          exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>

          {/* Teal radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 70%)' }} />

          {/* Scanlines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)', backgroundSize: '100% 3px' }} />

          {/* Screen flash */}
          <AnimatePresence>
            {flashScreen && (
              <motion.div className="absolute inset-0 z-10" style={{ background: '#14b8a6' }}
                initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }} />
            )}
          </AnimatePresence>

          <div className="relative flex flex-col items-start w-full max-w-lg px-6 sm:px-0">
            {/* Left accent line */}
            <motion.div className="absolute -left-5 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #14b8a6, transparent)' }}
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, delay: 0.1 }} />

            {/* Top system label */}
            <motion.p className="text-[10px] font-mono text-teal-500/50 tracking-[0.3em] uppercase mb-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              PORTFOLIO · BOOT SEQUENCE · 2026
            </motion.p>

            {/* Main name */}
            <TypedName onDone={() => setNameDone(true)} />

            {/* Boot lines */}
            <div className="mt-8 space-y-2 font-mono min-h-[96px]">
              {BOOT_LINES.map((line, i) => (
                <AnimatePresence key={i}>
                  {visibleLines.includes(i) && (
                    <motion.div className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
                      <span className="text-teal-500/60 text-xs">›</span>
                      <span className="text-xs tracking-widest" style={{ color: line.color }}>
                        {line.text}
                        {line.text === 'SYSTEM READY' && (
                          <motion.span className="ml-2 text-teal-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: 3 }}>
                            ■
                          </motion.span>
                        )}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* Progress bar */}
            {nameDone && (
              <div className="mt-8 w-full">
                <div className="flex justify-between text-[10px] font-mono text-white/20 mb-1.5">
                  <span>LOADING</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, #0d9488, #14b8a6, #2dd4bf)', width: `${progress}%` }}
                    transition={{ duration: 0.05 }} />
                </div>
              </div>
            )}
          </div>

          {/* Bottom label */}
          <motion.p className="absolute bottom-8 text-[10px] font-mono tracking-[0.3em] uppercase text-white/10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Full Stack AI Engineer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
