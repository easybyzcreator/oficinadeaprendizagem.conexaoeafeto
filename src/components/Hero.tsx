import React, { useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Camera,
  CheckCircle2,
  Brain,
  Palette,
  ShieldCheck,
  Activity,
  Smile,
  MapPin,
  Users,
  Calendar,
  Clock,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BRAND } from '../data/workshopsData';
import { StoredImages } from '../utils/imageStorage';
import watercolorTopUrl from '../assets/images/watercolor_palette_top_1789069243337.jpg';
import { InteractiveWatercolorBanner } from './InteractiveWatercolorBanner';

interface HeroProps {
  images: StoredImages;
  onOpenImageModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ images, onOpenImageModal }) => {
  const duoUrl =
    images.duoPhoto ||
    'https://i.ibb.co/RkVkXqrb/patitour-2026-09-30-T141101-234.png';

  const bannerUrl = images.headerBannerPhoto || watercolorTopUrl;

  const heroRef = useRef<HTMLDivElement>(null);

  // =========================================================
  // SCROLLYTELLING ENGINE: Smooth upward elevation of solid card
  // =========================================================
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Content card upward elevation & overlap (subindo perfeitamente sobre a aquarela fixa)
  const contentY = useTransform(scrollYProgress, [0, 0.45], [90, -70]);
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [0.96, 1]);

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative overflow-visible pt-4 pb-20 sm:pt-6 sm:pb-32 bg-[#FAF8F5] min-h-[170vh] sm:min-h-[185vh]"
    >
      {/* Background ambient watercolor glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-6 w-96 h-96 rounded-full bg-[#68C9EA]/10 blur-3xl" />
        <div className="absolute top-1/2 right-6 w-96 h-96 rounded-full bg-[#FA4E74]/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-80 rounded-full bg-[#F9DC3F]/12 blur-3xl" />
      </div>

      {/* ========================================================= */}
      {/* 1. STICKY PINNED WATERCOLOR BANNER (Fixo / Estático)      */}
      {/* Mobile: 100% largura total da tela sem bordas laterais    */}
      {/* ========================================================= */}
      <div
        className="sticky top-14 sm:top-18 z-10 w-full max-w-6xl mx-auto px-0 sm:px-6 lg:px-8"
      >
        <div className="relative bg-white rounded-none sm:rounded-[40px] shadow-lg border-y sm:border border-[#D8B08C]/40 overflow-hidden">
          <InteractiveWatercolorBanner
            bannerUrl={bannerUrl}
            onOpenImageModal={onOpenImageModal}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. OVERLAPPING CONTENT POSTER (Sobreposição do Texto)     */}
      {/* Fundo 100% Opaco no Card do Texto e Sombra Elegante       */}
      {/* ========================================================= */}
      <motion.div
        style={{
          y: contentY,
          scale: contentScale,
        }}
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-28 md:-mt-36 will-change-transform"
      >
        <div
          className="relative bg-white rounded-[32px] sm:rounded-[40px] border-2 border-[#D4AF37]/60 px-6 sm:px-10 lg:px-14 pt-8 pb-12 sm:pb-16 transition-all duration-300 shadow-2xl"
        >
          {/* Top Highlight Schedule / Batch Banner */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-5 py-2 rounded-2xl bg-[#F9DC3F]/25 border border-[#D4AF37]/50 shadow-2xs text-[#606060]">
              <Calendar className="w-4 h-4 text-[#E28738]" />
              <span className="font-heading text-xs sm:text-sm font-extrabold tracking-wide uppercase">
                Turma aberta • Vagas reduzidas
              </span>
            </div>
          </div>

          {/* Main Centered / Editorial Title (Fundo 100% Branco Sólido e Sombra Elegante) */}
          <div className="text-center max-w-4xl mx-auto mb-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D8B08C]/35 shadow-xl">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black leading-[1.15] tracking-tight text-[#FA4E74]">
              OFICINA DE APRENDIZAGEM
            </h1>

            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#8D72A8] mt-2 tracking-tight">
              Neuropsicopedagógica e Arteterapêutica
            </h2>

            <p className="font-heading text-base sm:text-xl font-bold text-[#E28738] mt-3">
              {BRAND.tagline}
            </p>

            {/* Informações da Turma: Data, Tempo de Duração e Valor Total (Discreto, abaixo do subtítulo) */}
            <div className="mt-4 pt-3.5 border-t border-[#D8B08C]/25 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#606060]/90">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#E28738]" />
                <span><strong>Data:</strong> início 21/11</span>
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#8D72A8]" />
                <span><strong>Tempo de duração:</strong> 1 hora e 30 minutos</span>
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="font-bold text-[#1E6E27] text-sm">R$</span>
                <span><strong>VALOR TOTAL:</strong> 300,00</span>
              </span>
            </div>
          </div>

          {/* Statement */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <p className="text-base sm:text-lg italic font-medium text-[#606060]/95 leading-relaxed bg-[#FAF8F5]/85 py-3.5 px-6 rounded-2xl border border-[#D8B08C]/30">
              &ldquo;Uma oficina que une alfabetização afetiva, arte e neurociência para desbloquear a leitura e a escrita de forma leve, sem pressão e sem rótulos.&rdquo;
            </p>
          </div>

          {/* Core Developmental Pillars (Socioemocionais e Psicomotoras) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            {/* Pillar: Socioemocionais */}
            <div className="bg-gradient-to-b from-[#FA4E74]/10 to-white p-4 sm:p-5 rounded-2xl border border-[#FA4E74]/35 shadow-2xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FA4E74]/15 text-[#FA4E74] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-5 h-5 fill-[#FA4E74]" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#606060] leading-snug">
                  Habilidades Socioemocionais
                </h4>
                <p className="text-xs text-[#606060]/85 mt-1 leading-relaxed">
                  Conhecendo as emoções, empatia, escuta acolhedora e aprender a expressar-se através da arte.
                </p>
              </div>
            </div>

            {/* Pillar: Psicomotor */}
            <div className="bg-gradient-to-b from-[#56C45F]/10 to-white p-4 sm:p-5 rounded-2xl border border-[#56C45F]/35 shadow-2xs flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#56C45F]/15 text-[#1E6E27] flex items-center justify-center shrink-0 mt-0.5">
                <Palette className="w-5 h-5 text-[#56C45F]" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#606060] leading-snug">
                  Psicomotor
                </h4>
                <p className="text-xs text-[#606060]/85 mt-1 leading-relaxed">
                  Coordenação motora, aprendendo a pegar no lápis, pincel, explorar movimentos que ensinam através da arte.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons (100% Inscrição no Site) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#oficinas"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FA4E74] hover:bg-[#e43e64] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all text-center flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Quero Conhecer a Oficina</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#inscricao"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#56C45F] hover:bg-[#46a84e] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Garantir Vaga na Inscrição</span>
            </motion.a>
          </div>

          {/* ========================================================= */}
          {/* 3. BOTTOM SECTION: Info on Left + Duo Photo on RIGHT      */}
          {/* ========================================================= */}
          <div className="pt-8 border-t border-[#D8B08C]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Side: Logistics and Methodological highlights */}
            <div className="lg:col-span-7 relative">
              <svg
                className="absolute -left-6 -bottom-6 w-48 h-48 text-[#FA4E74]/15 pointer-events-none -z-10"
                viewBox="0 0 200 200"
                fill="currentColor"
              >
                <path d="M50 80 Q30 50 60 30 Q90 10 120 40 Q150 70 140 100 Q130 130 100 150 Q70 170 40 140 Q10 110 50 80 Z" />
                <circle cx="165" cy="50" r="8" />
                <circle cx="170" cy="120" r="6" />
                <circle cx="35" cy="165" r="9" />
                <circle cx="20" cy="40" r="5" />
              </svg>

              <div className="space-y-3.5 text-left">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#606060]">
                  <div className="w-7 h-7 rounded-lg bg-[#FA4E74]/15 text-[#FA4E74] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>
                    <strong className="text-[#606060]">Local:</strong> Atendimento Clínico Presencial Acolhedor
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#606060]">
                  <div className="w-7 h-7 rounded-lg bg-[#56C45F]/15 text-[#1E6E27] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>
                    <strong className="text-[#606060]">Formato:</strong> Grupos Reduzidos (4 a 6 crianças) com Devolutiva aos Pais
                  </span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#606060]">
                  <div className="w-7 h-7 rounded-lg bg-[#68C9EA]/20 text-[#1F6785] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>
                    <strong className="text-[#606060]">Metodologia:</strong> Neurociência Aplicada e Expressão Artística
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side: Circular Photo of Adriana & Fabrine */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="relative group cursor-pointer inline-block" onClick={onOpenImageModal}>
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full text-[#E28738] overflow-visible pointer-events-none"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="92"
                      fill="none"
                      stroke="#FA4E74"
                      strokeWidth="5"
                      strokeOpacity="0.4"
                      strokeDasharray="18 10 30 14"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="88"
                      fill="none"
                      stroke="#E28738"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="95 12 110 8 70 15"
                      className="transform -rotate-15 origin-center transition-all duration-500 group-hover:stroke-[#FA4E74]"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="82"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="3.5"
                      strokeOpacity="0.65"
                      strokeDasharray="40 20 60 15"
                    />
                  </svg>

                  <div className="w-32 h-32 sm:w-38 sm:h-38 rounded-full overflow-hidden shadow-md bg-white border-2 border-white relative z-10 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={duoUrl}
                      alt="Adriana Bueno Marques e Fabrine Fernandes"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 right-2 z-20 p-2 rounded-full bg-white shadow-md border border-[#D4AF37] text-[#606060]">
                    <Camera className="w-4 h-4 text-[#FA4E74]" />
                  </span>
                </div>

                <div className="mt-2.5">
                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#606060] leading-snug group-hover:text-[#FA4E74] transition-colors">
                    Adriana Bueno Marques & Fabrine Fernandes
                  </h4>
                  <p className="text-xs font-semibold text-[#8D72A8] leading-tight mt-0.5">
                    Neuropsicopedagoga & Arteterapeuta
                  </p>
                  <p className="text-[11px] font-medium text-[#D8B08C] leading-tight mt-0.5">
                    Condução Clínica Compartilhada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pedagogical Pillars Breakdown Below the Overlap Poster */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#FA4E74]/35 shadow-xs text-center flex flex-col items-center">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#FA4E74] mb-1.5">
              Socioemocional
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#606060]/90 leading-relaxed">
              Conhecendo as emoções, empatia, escuta acolhedora e aprender a expressar-se através da arte
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#56C45F]/35 shadow-xs text-center flex flex-col items-center">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#56C45F] mb-1.5">
              Psicomotor
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#606060]/90 leading-relaxed">
              Coordenação motora, aprendendo a pegar no lápis, pincel, explorar movimentos que ensinam através da arte
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
