'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Numbers from '@/components/Numbers';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Footer from '@/components/Footer';
import RecruiterPanel from '@/components/RecruiterPanel';
import ResumeDownload from '@/components/ResumeDownload';
import SocialLinks from '@/components/SocialLinks';

const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const PreLoader = dynamic(() => import('@/components/PreLoader'), { ssr: false });
const CursorGlow = dynamic(() => import('@/components/CursorGlow'), { ssr: false });

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('vm-portfolio-loaded');
    if (seen) { setShowLoader(false); setLoaderDone(true); }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem('vm-portfolio-loaded', '1');
    setLoaderDone(true);
    setTimeout(() => setShowLoader(false), 800);
  };

  const { scrollY } = useScroll();
  const heroH = typeof window !== 'undefined' ? window.innerHeight : 900;
  const bridgeOpacity = useTransform(scrollY, [heroH * 0.55, heroH * 1.05], [0, 1]);

  return (
    <>
      <CursorGlow />

      {showLoader && <PreLoader onComplete={handleLoaderComplete} />}

      {/* Scroll-driven background transition */}
      <motion.div aria-hidden className="fixed inset-0 pointer-events-none"
        style={{ background: '#0f172a', opacity: bridgeOpacity, zIndex: 0 }} />

      <motion.div className="relative" style={{ zIndex: 1 }}
        initial={{ opacity: 0 }} animate={{ opacity: loaderDone ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <Navbar />
        <ResumeDownload />
        <RecruiterPanel />
        <SocialLinks />

        <div ref={heroRef}><Hero /></div>
        <About />
        <Numbers />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}
