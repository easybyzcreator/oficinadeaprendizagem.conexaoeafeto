import React from 'react';
import { Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND } from '../data/workshopsData';

export const ChamadaFinal: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white to-[#FAF8F5]">
      {/* Delicate background shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full pointer-events-none -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#FA4E74]/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#68C9EA]/15 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-60 h-60 rounded-full bg-[#F9DC3F]/15 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Slogan Pill with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D8B08C]/40 shadow-xs mb-6"
        >
          <Heart className="w-3.5 h-3.5 text-[#FA4E74] fill-[#FA4E74]" />
          <span className="text-xs font-bold text-[#606060] tracking-wide">
            {BRAND.slogan}
          </span>
        </motion.div>

        {/* Heading with Motion */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#606060] tracking-tight leading-tight max-w-3xl mx-auto mb-6"
        >
          {BRAND.finalCallHeading}
        </motion.h2>

        {/* Description with Motion */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-xl text-[#606060]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          {BRAND.finalCallDescription}
        </motion.p>

        {/* Action Button: Garantir vaga no site */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#inscricao"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#FA4E74] hover:bg-[#e43e64] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>Garantir Vaga na Oficina de Aprendizagem</span>
          </motion.a>
        </motion.div>

        {/* Highlights summary with Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-3 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-[#56C45F] shrink-0 mt-0.5" />
            <p className="text-xs text-[#606060]">
              <strong>Turmas acolhedoras:</strong> grupos reduzidos com atenção integral.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-3 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-[#68C9EA] shrink-0 mt-0.5" />
            <p className="text-xs text-[#606060]">
              <strong>Condução dupla:</strong> Adriana e Fabrine juntas em cada encontro.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-3 transition-all"
          >
            <CheckCircle2 className="w-4 h-4 text-[#FA4E74] shrink-0 mt-0.5" />
            <p className="text-xs text-[#606060]">
              <strong>Devolutiva aos pais:</strong> orientação para a continuidade em casa.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
