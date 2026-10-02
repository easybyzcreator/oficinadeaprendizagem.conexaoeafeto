import React from 'react';
import { Calendar, CheckCircle2, Award, Heart, Compass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { WEEKS_CYCLE } from '../data/workshopsData';

export const ComoFunciona: React.FC = () => {
  const getWeekIcon = (week: number) => {
    switch (week) {
      case 1:
        return <Heart className="w-5 h-5 text-[#68C9EA]" />;
      case 2:
        return <Compass className="w-5 h-5 text-[#D4AF37]" />;
      case 3:
        return <Sparkles className="w-5 h-5 text-[#56C45F]" />;
      case 4:
      default:
        return <Award className="w-5 h-5 text-[#FA4E74]" />;
    }
  };

  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#56C45F]/15 text-[#1E6E27] text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            Jornada de 4 Encontros aos Sábados
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#606060] tracking-tight mb-4">
            Como funciona o ciclo da oficina?
          </h2>
          <p className="text-sm sm:text-base text-[#606060]/85">
            O ciclo da oficina foi desenhado em uma progressão pedagógica e terapêutica contínua, respeitando o ritmo e a individualidade de cada participante.
          </p>
        </motion.div>

        {/* 4 Weeks Progression Timeline with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WEEKS_CYCLE.map((cycle, idx) => (
            <motion.div
              key={cycle.week}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#FAF8F5] rounded-3xl p-6 border border-[#D8B08C]/30 hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group cursor-default"
            >
              <div>
                {/* Top Week Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider text-white shadow-xs transition-transform group-hover:scale-105"
                    style={{ backgroundColor: cycle.color }}
                  >
                    {cycle.badge}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-center transition-transform group-hover:rotate-6">
                    {getWeekIcon(cycle.week)}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-gray-400">Etapa 0{cycle.week}</span>
                  <div className="h-0.5 flex-1 bg-gray-200" />
                </div>

                <h3 className="font-heading text-lg font-bold text-[#606060] mb-3 group-hover:text-[#FA4E74] transition-colors">
                  {cycle.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#606060]/85 leading-relaxed">
                  {cycle.description}
                </p>
              </div>

              {/* Bottom detail pill */}
              <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-2 text-[11px] text-[#606060]/75">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#56C45F] shrink-0" />
                <span>Tempo de duração: 1 hora e 30 minutos</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guidance and Continuous Development Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
          className="mt-14 max-w-2xl mx-auto text-center p-5 rounded-2xl bg-[#F0F9FD] border border-[#68C9EA]/40 transition-all shadow-xs"
        >
          <p className="text-xs sm:text-sm text-[#1F6785] leading-relaxed">
            💡 <strong>Ao final do ciclo:</strong> Os pais recebem orientações personalizadas para a continuidade do estímulo cognitivo e emocional no ambiente escolar e domiciliar.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
