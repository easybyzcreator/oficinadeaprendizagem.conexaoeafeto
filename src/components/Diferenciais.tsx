import React from 'react';
import { Users2, Sparkles, HeartHandshake, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { DIFFERENTIALS } from '../data/workshopsData';

export const Diferenciais: React.FC = () => {
  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'Users':
        return <Users2 className="w-6 h-6" style={{ color }} />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" style={{ color }} />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" style={{ color }} />;
      case 'GraduationCap':
      default:
        return <GraduationCap className="w-6 h-6" style={{ color }} />;
    }
  };

  return (
    <section id="diferenciais" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FA4E74] bg-[#FA4E74]/10 px-3.5 py-1.5 rounded-full mb-3">
            Nossa Proposta de Valor
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#606060] tracking-tight mb-4">
            O que torna a nossa oficina especial?
          </h2>
          <p className="text-sm sm:text-base text-[#606060]/80">
            A integração entre afeto, ciência e arte aplicada ao desenvolvimento integral de cada criança.
          </p>
        </motion.div>

        {/* 4 Differentials Cards Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-[#FAF8F5] border border-[#D8B08C]/30 hover:border-[#FA4E74]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-default"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  {getIcon(item.iconName, item.color)}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-gray-400">0{index + 1}</span>
                  <div className="h-px flex-1 bg-[#D8B08C]/30" />
                </div>

                <h3 className="font-heading text-lg font-bold text-[#606060] mb-3 group-hover:text-[#FA4E74] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-[#606060]/85 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-400">
                  Diferencial Exclusivo
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
