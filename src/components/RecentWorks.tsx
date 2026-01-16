

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { RECENT_WORKS } from '../constants';
import { X, Maximize2 } from 'lucide-react';

const RecentWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mouse movement for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPct = (clientX / innerWidth) - 0.5;
    const yPct = (clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] w-full overflow-hidden bg-transparent py-20"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="text-center relative z-20 mb-12 pointer-events-none">
        <h2 className="text-sm font-mono text-secondary tracking-widest uppercase mb-2">Interactive Gallery</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
          Recent <span className="text-primary text-glow">Creations</span>
        </h3>
        <p className="text-stone-400 text-sm mt-4">
          Drag works to explore. Hover (2s) to expand.
        </p>
      </div>

      <div className="relative w-full h-[120vh] max-w-7xl mx-auto">
        {RECENT_WORKS.map((img, index) => (
          <DraggableWork
            key={index}
            src={img}
            index={index}
            containerRef={containerRef}
            onExpand={() => setSelectedImage(img)}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-10 h-10" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Full Screen Work"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface DraggableWorkProps {
  src: string;
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
  onExpand: () => void;
  mouseX: any;
  mouseY: any;
}

const DraggableWork: React.FC<DraggableWorkProps> = ({ src, index, containerRef, onExpand, mouseX, mouseY }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial scattered positions (hardcoded specific "random" feel to avoid overlap)
  const positions = [
    { top: '5%', left: '10%', rotate: -5 },
    { top: '15%', left: '60%', rotate: 5 },
    { top: '35%', left: '25%', rotate: -3 },
    { top: '45%', left: '70%', rotate: 4 },
    { top: '65%', left: '15%', rotate: -6 },
    { top: '75%', left: '55%', rotate: 3 },
    { top: '10%', left: '40%', rotate: 2 },
    { top: '55%', left: '45%', rotate: -4 },
    { top: '25%', left: '80%', rotate: 6 },
    { top: '80%', left: '30%', rotate: -2 },
    { top: '85%', left: '75%', rotate: 5 },
  ];
  // Fallback if more images than positions
  const pos = positions[index % positions.length];

  // Parallax Effect
  // Different layers move at different speeds based on index
  const depth = 20 + (index % 5) * 10;
  const x = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-depth, depth]);

  // Smooth out the movement
  const physics = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(x, physics);
  const smoothY = useSpring(y, physics);

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Start 2s timer for full screen
    timeoutRef.current = setTimeout(() => {
      onExpand();
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragMomentum={true}
      style={{
        top: pos.top,
        left: pos.left,
        x: smoothX,
        y: smoothY,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, zIndex: 50, rotate: 0, transition: { duration: 0.3 } }}
      whileDrag={{ scale: 1.15, zIndex: 100, cursor: 'grabbing' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="absolute w-48 md:w-64 cursor-grab touch-none"
    >
      <div className={`relative rounded-xl overflow-hidden shadow-2xl border-2 transition-colors duration-300 ${isHovered ? 'border-primary' : 'border-white/10'
        } bg-charcoal`}>
        {/* Progress Bar for 2s Hold */}
        {isHovered && (
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 h-1 bg-primary z-20"
          />
        )}

        <img
          src={src}
          alt="Portfolio Work"
          className="w-full h-auto object-cover pointer-events-none" // prevent img drag, let div drag
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex items-center gap-2 text-white text-xs font-bold">
            <Maximize2 className="w-3 h-3" />
            <span>Hold to Expand</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentWorks;


