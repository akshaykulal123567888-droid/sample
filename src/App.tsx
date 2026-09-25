/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactModal from './components/ContactModal';
import ProjectModal, { ProjectData } from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{ overflowX: 'clip' }}
      className="bg-[#0C0C0C] text-[#D7E2EA] font-sans min-h-screen relative selection:bg-[#B600A8] selection:text-white"
    >
      {/* Custom Circular Cursor */}
      <CustomCursor />

      {/* 1. Hero Section */}
      <HeroSection onContactClick={() => setIsContactOpen(true)} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onContactClick={() => setIsContactOpen(true)} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection onOpenProject={(proj) => setSelectedProject(proj)} />

      {/* Footer */}
      <footer className="bg-[#0C0C0C] border-t border-white/10 px-6 sm:px-10 py-12 text-[#D7E2EA] relative z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-xl font-bold uppercase tracking-wider">Jack</span>
            <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light">
              3D Creator & Visual Designer
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs uppercase tracking-wider text-[#D7E2EA]/70">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="https://artstation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              ArtStation
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
