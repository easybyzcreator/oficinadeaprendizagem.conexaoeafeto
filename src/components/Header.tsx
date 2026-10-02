import React, { useState, useEffect } from 'react';
import { Sparkles, Camera, Menu, X, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { StoredImages } from '../utils/imageStorage';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  images: StoredImages;
  onOpenImageModal: () => void;
  onOpenLeadsModal: () => void;
  leadsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  images,
  onOpenImageModal,
  onOpenLeadsModal,
  leadsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'A Oficina', href: '#oficinas' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Especialistas', href: '#especialistas' },
    { label: 'Diferenciais', href: '#diferenciais' },
  ];

  const duoPhotoUrl =
    images.duoPhoto ||
    'https://i.ibb.co/RkVkXqrb/patitour-2026-09-30-T141101-234.png';

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar (Morphs away smoothly on scroll) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#606060] text-white text-[11px] px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2 overflow-hidden py-1.5"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FA4E74]" />
            <span>Conexões que transformam. Afeto que ensina. Conhecimento que desenvolve.</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F9DC3F]" />
            {leadsCount > 0 && (
              <button
                onClick={onOpenLeadsModal}
                className="ml-3 underline hover:text-[#F9DC3F] text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
              >
                Painel de Inscritos ({leadsCount})
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================= */}
      {/* Scroll-Morph Dynamic Header Capsule                     */}
      {/* ======================================================= */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 transition-all duration-400">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className={`mx-auto transition-all duration-400 relative overflow-hidden ${
            isScrolled
              ? 'max-w-6xl xl:max-w-7xl bg-white/95 backdrop-blur-md shadow-xl border-2 border-[#D4AF37]/50 rounded-full px-5 sm:px-8 py-2.5'
              : 'max-w-7xl bg-white/95 backdrop-blur-xs border-b border-[#D8B08C]/30 rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-3.5 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* 1. LOGO & BRAND */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#top"
                className="group relative flex items-center gap-2.5 p-1 rounded-xl hover:bg-[#FAF8F5] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`rounded-2xl bg-gradient-to-tr from-[#FA4E74] via-[#E58B92] to-[#F9DC3F] p-0.5 shadow-xs transition-all duration-300 ${
                      isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                    }`}
                  >
                    <div className="w-full h-full bg-white rounded-[13px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#FA4E74]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 leading-none">
                      <span
                        className={`font-heading font-extrabold text-[#606060] tracking-tight transition-all duration-300 ${
                          isScrolled ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
                        }`}
                      >
                        Oficina de <span className="text-[#FA4E74]">Aprendizagem</span>
                      </span>
                    </div>
                    {!isScrolled && (
                      <span className="block text-[9px] font-semibold text-[#8D72A8] uppercase tracking-wider mt-0.5">
                        Neuropsicopedagogia & Arte
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </div>

            {/* 2. NAVEGAÇÃO DESKTOP (Arejada e com Espaçamento Amplo) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs xl:text-[13px] font-bold text-[#606060] hover:text-[#FA4E74] transition-colors py-1.5 px-3 rounded-full hover:bg-[#FAF8F5] whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* 3. AÇÕES / BOTOES */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <PWAInstallButton variant="header" />

              <a
                href="#inscricao"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FA4E74] hover:bg-[#e43e64] text-white font-extrabold text-xs transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 px-5 py-2 whitespace-nowrap"
              >
                <span>Garantir Vaga</span>
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-full text-[#606060] hover:bg-gray-100 cursor-pointer"
                aria-label="Abrir menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Reading progress bar at bottom of the morph capsule */}
          {isScrolled && (
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="absolute bottom-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#FA4E74] via-[#F9DC3F] to-[#56C45F]"
            />
          )}
        </motion.div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-md border-b border-gray-200 px-4 pt-3 pb-6 shadow-xl space-y-4"
          >
            {/* Mobile Duo Spotlight */}
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenImageModal();
              }}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-rose-50 border border-[#D4AF37]/50 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-xs shrink-0">
                <img
                  src={duoPhotoUrl}
                  alt="Adriana e Fabrine"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-extrabold text-[#606060]">Adriana & Fabrine</p>
                <p className="text-[10px] text-[#8D72A8]">Especialistas do Evento</p>
              </div>
              <Camera className="w-4 h-4 text-[#FA4E74]" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-medium text-[#606060] hover:bg-[#FAF8F5] hover:text-[#FA4E74] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <PWAInstallButton variant="drawer" />

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadsModal();
                }}
                className="w-full py-2 px-3 text-xs text-center font-medium bg-gray-100 hover:bg-gray-200 text-[#606060] rounded-xl transition-colors cursor-pointer"
              >
                Painel de Inscrições Recebidas ({leadsCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
