import React from 'react';
import { Palette, Brain, Heart, Sparkles, Camera, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SPECIALISTS, BRAND } from '../data/workshopsData';
import { StoredImages } from '../utils/imageStorage';

interface EspecialistasProps {
  images: StoredImages;
  onOpenImageModal: () => void;
}

export const Especialistas: React.FC<EspecialistasProps> = ({
  images,
  onOpenImageModal,
}) => {
  const adrianaUrl =
    images.adrianaPhoto || 'https://i.ibb.co/CpYWBP0v/dri.png';
  const fabrineUrl =
    images.fabrinePhoto ||
    'https://i.ibb.co/k68p8rwS/patitour-2026-06-25-T112823-542.png';
  const duoUrl =
    images.duoPhoto ||
    'https://i.ibb.co/RkVkXqrb/patitour-2026-09-30-T141101-234.png';

  return (
    <section id="especialistas" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FA4E74]/10 text-[#FA4E74] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Corpo Docente & Coordenação
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#606060] tracking-tight mb-4">
            Quem conduz a oficina?
          </h2>
          <p className="text-sm sm:text-base text-[#606060]/85">
            Conheça as especialistas dedicadas a transformar a jornada de aprendizagem do seu filho com acolhimento, ciência e propósito.
          </p>
        </motion.div>

        {/* Specialists Duo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-16">
          
          {/* Adriana Bueno Marques Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl border border-[#8D72A8]/30 flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Photo & Badge */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                <div
                  className="relative group/avatar cursor-pointer"
                  onClick={onOpenImageModal}
                  title="Foto de Adriana Bueno Marques. Clique para alterar se desejar."
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-3 border-white ring-4 ring-[#8D72A8]/30 shadow-md bg-[#FAF8F5] transition-transform duration-300 group-hover/avatar:scale-105">
                    <img
                      src={adrianaUrl}
                      alt="Adriana Bueno Marques"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenImageModal();
                    }}
                    className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-white text-[#8D72A8] border border-gray-200 shadow-sm hover:bg-[#FAF8F5] transition-colors"
                    title="Adicionar ou alterar foto de Adriana"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#8D72A8]/15 text-[#8D72A8] uppercase tracking-wider mb-2">
                    Especialista
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#606060] group-hover:text-[#8D72A8] transition-colors">
                    Adriana Bueno Marques
                  </h3>
                  <p className="text-xs sm:text-[13px] font-semibold text-[#D4AF37] mt-1 leading-snug">
                    Neuropsicopedagoga, Arteterapeuta e Especialista em Alfabetização
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-[#606060]/90 leading-relaxed mb-6">
                {SPECIALISTS[0].bio}
              </p>

              {/* Specialties tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                {SPECIALISTS[0].specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#606060] border border-gray-200 group-hover:border-[#8D72A8]/30 transition-colors"
                  >
                    <Check className="w-2.5 h-2.5 text-[#8D72A8]" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fabrine Fernandes Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-xl border border-[#68C9EA]/40 flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Photo & Badge */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                <div
                  className="relative group/avatar cursor-pointer"
                  onClick={onOpenImageModal}
                  title="Foto de Fabrine Fernandes. Clique para alterar se desejar."
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-3 border-white ring-4 ring-[#68C9EA]/30 shadow-md bg-[#FAF8F5] transition-transform duration-300 group-hover/avatar:scale-105">
                    <img
                      src={fabrineUrl}
                      alt="Fabrine Fernandes"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenImageModal();
                    }}
                    className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-white text-[#1F6785] border border-gray-200 shadow-sm hover:bg-[#FAF8F5] transition-colors"
                    title="Adicionar ou alterar foto de Fabrine"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-center sm:text-left flex-1">
                  <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#68C9EA]/20 text-[#1F6785] uppercase tracking-wider mb-2">
                    Especialista
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#606060] group-hover:text-[#1F6785] transition-colors">
                    Fabrine Fernandes
                  </h3>
                  <p className="text-xs sm:text-[13px] font-semibold text-[#D4AF37] mt-1 leading-snug">
                    Neuropsicopedagoga e Psicopedagoga Especialista em Educação Inclusiva
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-[#606060]/90 leading-relaxed mb-6">
                {SPECIALISTS[1].bio}
              </p>

              {/* Specialties tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                {SPECIALISTS[1].specialties.map((spec, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#606060] border border-gray-200 group-hover:border-[#68C9EA]/40 transition-colors"
                  >
                    <Check className="w-2.5 h-2.5 text-[#68C9EA]" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Nossa Parceria Highlight Block with Photo Together in Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-7 sm:p-10 border border-[#D8B08C]/40 shadow-sm hover:shadow-lg transition-all relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-[#FA4E74]/5 pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-7 relative z-10">
            {/* Foto juntas em destaque */}
            <div className="relative group shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-[#D4AF37] ring-4 ring-[#D4AF37]/20 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src={duoUrl}
                  alt="Adriana Bueno Marques e Fabrine Fernandes Juntas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#FA4E74] text-white p-2 rounded-full shadow-md">
                <Heart className="w-4 h-4 fill-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FA4E74]/10 text-[#FA4E74] text-xs font-bold uppercase tracking-wider mb-2">
                <Heart className="w-3 h-3 fill-[#FA4E74]" />
                Propósito Compartilhado
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#606060] mb-3">
                Nossa parceria
              </h3>
              <p className="text-xs sm:text-[14px] text-[#606060]/90 leading-relaxed mb-4">
                {BRAND.partnership}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <span>✨ Condução compartilhada simultânea nos 4 encontros da oficina</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
