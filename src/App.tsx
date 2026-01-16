import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import RecentWorks from './components/RecentWorks';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Testimonials from './components/Testimonials';
import ContactFooter from './components/ContactFooter';
import NoiseOverlay from './components/ui/NoiseOverlay';
import FluidCursor from './components/ui/FluidCursor';

// Animated interactive background blobs
const LiquidBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 50 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // Calculate offset from center, divided to reduce movement scale
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / 30);
      mouseY.set((e.clientY - centerY) / 30);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  // Inverse transformations for parallax depth
  const xInverse = useTransform(x, (val) => -val);
  const yInverse = useTransform(y, (val) => -val);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Blob 1 - Follows mouse slightly */}
      <motion.div
        style={{ x, y }}
        className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"
      />
      {/* Blob 2 - Moves opposite to mouse */}
      <motion.div
        style={{ x: xInverse, y: yInverse }}
        className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"
      />
      {/* Blob 3 - Static but animating */}
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000" />
    </div>
  );
};

function App() {
  return (
    <div className="relative min-h-screen bg-transparent text-stone-300 selection:bg-primary selection:text-white font-sans cursor-none">
      <LiquidBackground />
      <FluidCursor />
      <NoiseOverlay />

      <Navbar />

      <main className="relative z-10">
        <Hero />

        {/* Adds visual separation/breathing room */}
        <div className="space-y-4">
          <Expertise />
          <div id="recent-works">
            <RecentWorks />
          </div>
          <Projects />
          <Journey />
          <Testimonials />
        </div>

        <ContactFooter />
      </main>
    </div>
  );
}

export default App;
