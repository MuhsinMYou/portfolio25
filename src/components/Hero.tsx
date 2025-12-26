import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 800], [1, 1.2]);
  const yImage = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const yText = useTransform(scrollY, [0, 500], [0, -100]);

  // Text Animation Variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVars: Variants = {
    hidden: { y: 100, opacity: 0, rotateX: -80 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const titleText = "MUHSIN";

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[130vh] w-full overflow-hidden"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">

        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div style={{ scale, y: yImage }} className="w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-50 mix-blend-screen"
            >
              <source src={`${import.meta.env.BASE_URL}hero-video.mp4`} type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Content Container - Glass */}
        <motion.div
          style={{ y: yText, opacity }}
          className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-end h-full pb-12 text-center"
        >
          {/* Main Typography */}
          <div className="flex flex-col items-center space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="liquid-glass w-fit px-5 py-1.5 rounded-full mb-2 border border-secondary/20 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="font-mono text-secondary text-xs tracking-widest uppercase relative z-10">Hello, I am</span>
            </motion.div>

            {/* Staggered Text Reveal */}
            <motion.div
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="font-display font-bold tracking-tighter leading-[0.9] flex flex-col items-center"
            >
              {/* First Line */}
              <div className="flex overflow-hidden text-6xl md:text-8xl lg:text-9xl text-white mb-1 relative group cursor-default">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {titleText}
                </div>
                {titleText.split("").map((char, index) => (
                  <motion.span key={index} variants={letterVars} className="inline-block group-hover:text-white/10 transition-colors duration-500">
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="font-mono text-primary text-xs md:text-sm tracking-widest uppercase mb-2"
            >
              Creative Technologist | AI Enthusiast
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-2 max-w-3xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group">
                <span className="bg-gradient-to-r from-white to-stone-400 bg-clip-text text-transparent group-hover:text-glow transition-all duration-300">Crafting Digital Experiences That Matter.</span>
              </h3>
              <p className="text-lg text-stone-300 font-light leading-relaxed mx-auto max-w-xl">
                Blending creativity and technology to craft impactful digital experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex gap-5 mt-6"
            >
              <SocialLink href="https://github.com/MuhsinMYou" icon={Github} />
              <SocialLink href="https://linkedin.com/in/muhsinponpara" icon={Linkedin} />
              <SocialLink href="https://instagram.com/muhhs.in" icon={Instagram} />
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="liquid-glass p-4 rounded-full hover:bg-white/10 hover:text-primary transition-all duration-300 group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
  </a>
);

export default Hero;