import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', budget: '$5k - $10k' });

  if (!isOpen) return null;

  const email = 'jack@3dcreator.studio';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#0F0F0F] border-2 border-[#D7E2EA] rounded-[32px] sm:rounded-[44px] p-6 sm:p-8 md:p-10 shadow-2xl text-[#D7E2EA] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/20 text-[#D7E2EA] hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close contact modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B600A8]" />
            <span>Let&apos;s Build Something Incredible</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black uppercase text-[#D7E2EA] tracking-tight">
            Start a Project
          </h3>
          <p className="text-sm font-light text-[#D7E2EA]/70 mt-2">
            Currently accepting select commissions for 3D modeling, brand films, and interactive design.
          </p>
        </div>

        {/* Quick Email Copy Bar */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-white/10 text-white shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm font-mono truncate">{email}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer shrink-0 ml-2"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Message Dispatched</h4>
            <p className="text-xs text-[#D7E2EA]/70 mt-1">Jack will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Alex Morgan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] placeholder-white/25 focus:outline-none focus:border-[#B600A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] placeholder-white/25 focus:outline-none focus:border-[#B600A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#D7E2EA]/70 mb-1.5">
                Project Scope
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your 3D vision, timeline, and goals..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-[#D7E2EA] placeholder-white/25 focus:outline-none focus:border-[#B600A8] transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  boxShadow:
                    '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                  outline: '2px solid #FFFFFF',
                  outlineOffset: '-3px',
                }}
                className="w-full rounded-full text-white font-medium uppercase tracking-widest py-3.5 text-xs sm:text-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Brief</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
