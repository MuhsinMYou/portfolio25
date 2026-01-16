import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Github, Linkedin, Heart } from 'lucide-react';

const ContactFooter: React.FC = () => {
  return (
    <footer id="contact" className="bg-transparent pt-24 pb-8 px-6 md:px-12 lg:px-24 border-t border-white/5">

      {/* Main CTA */}
      <div className="flex flex-col items-center text-center space-y-8 mb-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
        >
          Ready to build <br /> something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">extraordinary?</span>
        </motion.h2>

        <motion.a
          href="mailto:contact@muhsin.dev"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center px-8 py-4 bg-[#8B5E3C] text-white font-bold text-lg rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all"
        >
          <span className="relative z-10 flex items-center gap-2">
            Let's Talk <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </motion.a>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10">

        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h4 className="text-xl font-bold text-white mb-2">MUHSIN M. YOU</h4>
          <p className="text-slate-500 text-sm">Crafting the digital future.</p>
        </div>

        <div className="flex space-x-6 mb-6 md:mb-0">
          <FooterSocialLink href="https://github.com/MuhsinMYou" icon={Github} />
          <FooterSocialLink href="https://linkedin.com/in/muhsinponpara" icon={Linkedin} />
          <FooterSocialLink href="https://instagram.com/muhhs.in" icon={Instagram} />
        </div>

        <div className="text-slate-600 text-sm flex items-center gap-1">
          <span>&copy; 2025. Designed & Developed with</span>
          <Heart className="w-3 h-3 text-red-500 fill-current" />
        </div>

      </div>
    </footer>
  );
};

const FooterSocialLink = ({ href, icon: Icon }: { href: string, icon: React.ElementType }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
    <Icon className="w-5 h-5" />
  </a>
)

export default ContactFooter;