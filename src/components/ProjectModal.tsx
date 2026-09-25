import React from 'react';
import { X, ExternalLink, Sparkles, Layers, Box, CheckCircle2 } from 'lucide-react';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  description?: string;
  software?: string[];
  deliverables?: string[];
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#111111] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[44px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-3 text-xs sm:text-sm tracking-widest text-[#D7E2EA]/60 uppercase">
            <span>Project {project.number}</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase text-[#D7E2EA] tracking-tight">
            {project.name}
          </h3>
        </div>

        {/* Visual Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video md:aspect-auto">
            <img
              src={project.images.col2}
              alt={`${project.name} main view`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.images.col1Top}
                alt={`${project.name} preview 1`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} preview 2`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Tech Stack & Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          <div>
            <h4 className="text-xs uppercase font-medium tracking-widest text-white/50 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#B600A8]" />
              Production Pipeline
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Cinema 4D', 'Octane Render', 'Unreal Engine 5', 'ZBrush', 'After Effects'].map(
                (tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#D7E2EA]"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-medium tracking-widest text-white/50 mb-3 flex items-center gap-2">
              <Box className="w-4 h-4 text-[#7621B0]" />
              Deliverables
            </h4>
            <ul className="text-xs space-y-1.5 text-white/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>8K Key Visual Renderings & Assets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>60fps Procedural Animation Loop</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Interactive WebGL 3D Model Package</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-xs sm:text-sm hover:bg-white/10 transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Close Overview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
