import React, { useState } from 'react';
import { Download, Smartphone, X, Share, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'header' | 'drawer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside standalone app, do not show install CTA
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'drawer') {
      return (
        <button
          onClick={install}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 border border-[#D4AF37]/50 text-[#FA4E74] font-bold text-xs hover:bg-rose-100/60 transition-all shadow-2xs cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#FA4E74]" />
          <span>Instalar App da Oficina</span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        title="Instalar aplicativo Oficina de Aprendizagem"
        className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D8B08C]/40 text-[#606060] hover:text-[#FA4E74] hover:border-[#FA4E74]/40 font-bold text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer"
      >
        <Smartphone className="w-3.5 h-3.5 text-[#FA4E74]" />
        <span>Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        {variant === 'drawer' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 border border-[#D4AF37]/50 text-[#FA4E74] font-bold text-xs hover:bg-rose-100/60 transition-all shadow-2xs cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-[#FA4E74]" />
            <span>Instalar no iPhone / iPad</span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            title="Instalar no iPhone"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D8B08C]/40 text-[#606060] hover:text-[#FA4E74] hover:border-[#FA4E74]/40 font-bold text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#FA4E74]" />
            <span>Instalar no iPhone</span>
          </button>
        )}

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-2 border-[#FA4E74]/30 text-center relative">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl overflow-hidden mx-auto mb-3 border-2 border-[#D4AF37] shadow-xs">
                <img
                  src="https://i.ibb.co/sYZVGfh/patitour-2026-09-30-T175240-786.png"
                  alt="Oficina de Aprendizagem"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-heading text-lg font-bold text-[#606060] mb-2">
                Instalar no iPhone / iPad
              </h3>
              <p className="text-xs text-[#606060]/85 mb-4 leading-relaxed">
                Adicione a <strong>Oficina de Aprendizagem</strong> à sua tela de início para acesso rápido e direto:
              </p>

              <div className="bg-[#FAF8F5] rounded-2xl p-4 text-left border border-[#D8B08C]/30 mb-5 space-y-3 text-xs text-[#606060]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4" />
                  </div>
                  <span>1. Toque no botão <strong>Compartilhar</strong> na barra do Safari.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-[#FA4E74] flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <span>2. Role para baixo e toque em <strong>Adicionar à Tela de Início</strong>.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-3 px-4 bg-[#FA4E74] hover:bg-[#e43e64] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
