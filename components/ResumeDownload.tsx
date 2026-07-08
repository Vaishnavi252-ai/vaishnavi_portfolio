'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ArrowDownToLine } from 'lucide-react';

export default function ResumeDownload() {
  const [hovered, setHovered] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <motion.div
      className="fixed top-5 left-5 z-50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      <motion.a
        href="/VAISHNAVI MISAL RESUME.pdf"
        download="VAISHNAVI MISAL RESUME.pdf"
        onClick={handleDownload}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex items-center gap-2 rounded-full cursor-pointer overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '8px 16px 8px 10px',
          textDecoration: 'none',
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Shimmer effect */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <div className="relative w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
        >
          <AnimatePresence mode="wait">
            {downloading ? (
              <motion.div
                key="downloading"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <ArrowDownToLine size={12} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <FileText size={12} className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full border border-white/40 animate-ping opacity-50" />
        </div>

        {/* Label */}
        <motion.span
          className="text-xs font-medium text-white/80 whitespace-nowrap"
          animate={{ color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.8)' }}
        >
          {downloading ? 'Downloading…' : 'Resume'}
        </motion.span>

        {/* Download icon */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <Download size={11} className="text-white/70" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-0 top-full mt-2 px-3 py-1.5 rounded-lg text-xs text-white whitespace-nowrap pointer-events-none"
            style={{
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
          >
            Download CV — PDF
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
