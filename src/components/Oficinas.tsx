import React from 'react';
import {
  PencilRuler,
  BookOpenCheck,
  Calculator,
  Check,
  ArrowRight,
  Sparkles,
  Calendar,
  Users,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';
import { UNIFIED_WORKSHOP } from '../data/workshopsData';

interface OficinasProps {
  onSelectWorkshop: (workshopName: string) => void;
}

export const Oficinas: React.FC<OficinasProps> = ({ onSelectWorkshop }) => {
  const handleScrollToForm = () => {
    onSelectWorkshop(UNIFIED_WORKSHOP.name);
    const element = document.getElementById('inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'PencilRuler':
        return <PencilRuler className="w-5 h-5" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-5 h-5" />;
      case 'Calculator':
      default:
        return <Calculator className="w-5 h-5" />;
    }
  };

  return (
    <section id="oficinas" className="py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#68C9EA]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#FA4E74]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FA4E74]/10 text-[#FA4E74] text-xs font-bold uppercase tracking-wider mb-4 border border-[#FA4E74]/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Oficina de Aprendizagem</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#606060] tracking-tight mb-4">
            OFICINA LER, ESCREVER E CONTAR...
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#606060]/90 max-w-3xl mx-auto leading-relaxed">
            Uma oficina que une alfabetização afetiva, arte e neurociência para desbloquear a leitura e a escrita de forma leve, sem pressão e sem rótulos.
          </p>

          {/* Informações da Turma: Data, Tempo de Duração e Valor Total (Discreto) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#606060]/90">
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

          {/* Quick Schedule Badge */}
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-[#606060] bg-white px-5 py-2.5 rounded-2xl border border-[#D8B08C]/40 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#E28738]">
              <Calendar className="w-4 h-4" />
              <span>Aos sábados (4 encontros)</span>
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-[#FA4E74]">
              <Users className="w-4 h-4" />
              <span>Vagas reduzidas</span>
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-[#1E6E27]">
              <ShieldCheck className="w-4 h-4" />
              <span>Devolutiva aos pais</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Integrated Modules Grid (ENVOLVE, ALÉM DE, E TAMBÉM) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
          {UNIFIED_WORKSHOP.modules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.015 }}
              className="bg-white rounded-3xl p-7 shadow-xs hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative overflow-hidden group cursor-default"
              style={{
                borderTopColor: mod.tagColor,
                borderTopWidth: '4px',
              }}
            >
              {/* Water-mark glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-500"
                style={{ backgroundColor: mod.tagColor }}
              />

              <div>
                {/* Module Tag (ENVOLVE, ALÉM DE, E TAMBÉM) */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${mod.tagColor}22`,
                      color: mod.textColor,
                    }}
                  >
                    {getModuleIcon(mod.iconName)}
                    <span>{mod.tag}</span>
                  </span>
                </div>

                {/* Module Title */}
                <h3 className="font-heading text-xl font-extrabold text-[#606060] mb-3 group-hover:text-[#FA4E74] transition-colors leading-snug">
                  {mod.title}
                </h3>

                {/* Module Description */}
                <p className="text-xs sm:text-[13px] text-[#606060]/90 leading-relaxed mb-6">
                  {mod.description}
                </p>

                {/* Desenvolvemos List */}
                <div className="pt-4 border-t border-gray-100 mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 block mb-3">
                    Desenvolvemos:
                  </span>
                  <ul className="space-y-2.5">
                    {mod.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 text-xs text-[#606060] group/item">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover/item:scale-125"
                          style={{
                            backgroundColor: `${mod.tagColor}25`,
                            color: mod.textColor,
                          }}
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-semibold group-hover/item:text-[#606060]">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Module bottom pill */}
              <div className="pt-4 border-t border-gray-100">
                <span
                  className="w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
                  style={{
                    backgroundColor: `${mod.tagColor}15`,
                    color: mod.textColor,
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Integrado na Oficina</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Call to Action for the Unified Workshop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-md mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleScrollToForm}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#FA4E74] hover:bg-[#e43e64] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
          >
            <span>Quero Inscrever Meu Filho na Oficina</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
