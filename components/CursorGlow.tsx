'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useSpring(0, { damping: 26, stiffness: 250 });
  const y = useSpring(0, { damping: 26, stiffness: 250 });

  useEffect(() => {
    if ('ontouchstart' in window) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); };
    const leave = () => setVisible(false);
    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave); };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      {/* Teal ambient glow */}
      <motion.div className="fixed pointer-events-none z-[100]"
        style={{
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(20,184,166,0.05) 0%, transparent 65%)',
          translateX: '-50%', translateY: '-50%',
          left: x, top: y,
        }} />
      {/* Small teal dot */}
      <motion.div className="fixed pointer-events-none z-[101] rounded-full"
        style={{
          width: '6px', height: '6px',
          background: 'rgba(20,184,166,0.7)',
          translateX: '-50%', translateY: '-50%',
          left: x, top: y,
          boxShadow: '0 0 8px rgba(20,184,166,0.5)',
        }} />
    </>
  );
}
