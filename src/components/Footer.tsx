import React from 'react';
import { Heart, Sparkles, Shield, Lock } from 'lucide-react';
import { BRAND } from '../data/workshopsData';

interface FooterProps {
  onOpenLeadsModal: () => void;
  onOpenImageModal: () => void;
  leadsCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLeadsModal,
  onOpenImageModal,
  leadsCount,
}) => {
  return (
    <footer className="bg-[#606060] text-white pt-14 pb-12 border-t border-[#D8B08C]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#FA4E74] flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white tracking-tight">
                  Oficina de <span className="text-[#FA4E74]">Aprendizagem</span>
                </span>
                <span className="block text-[10px] text-white/70 tracking-wider uppercase font-semibold">
                  Neuropsicopedagogia & Arteterapia
                </span>
              </div>
            </div>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Desenvolvimento cognitivo, emocional e social infantil com afeto, ciência e propósito. Conduzido por Adriana Bueno Marques e Fabrine Fernandes.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#F9DC3F] italic">
              "{BRAND.slogan}"
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F9DC3F]">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <a href="#inicio" className="hover:text-[#FA4E74] transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-[#FA4E74] transition-colors">
                  Diferenciais das Oficinas
                </a>
              </li>
              <li>
                <a href="#oficinas" className="hover:text-[#FA4E74] transition-colors">
                  A Oficina de Aprendizagem
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-[#FA4E74] transition-colors">
                  Ciclo de 4 Semanas
                </a>
              </li>
              <li>
                <a href="#especialistas" className="hover:text-[#FA4E74] transition-colors">
                  Adriana & Fabrine
                </a>
              </li>
              <li>
                <a href="#inscricao" className="hover:text-[#FA4E74] transition-colors">
                  Pré-Inscrição de Alunos
                </a>
              </li>
            </ul>
          </div>

          {/* Especialistas & Coordenação */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#68C9EA]">
              Especialistas Responsáveis
            </h4>
            <div className="text-xs text-white/80 space-y-2">
              <div>
                <p className="font-bold text-white">Adriana Bueno Marques</p>
                <p className="text-[11px] text-white/70">Neuropsicopedagoga, Arteterapeuta e Esp. em Alfabetização</p>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="font-bold text-white">Fabrine Fernandes</p>
                <p className="text-[11px] text-white/70">Neuropsicopedagoga e Psicopedagoga Esp. em Educação Inclusiva</p>
              </div>
            </div>

            <div className="pt-3">
              <a
                href="#inscricao"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FA4E74] hover:bg-[#e43e64] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Garantir Vaga na Inscrição</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/60">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Oficina de Aprendizagem. Todos os direitos reservados. Feito com</span>
            <Heart className="w-3 h-3 text-[#FA4E74] fill-[#FA4E74]" />
            <span>para o desenvolvimento infantil.</span>
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLeadsModal}
              className="hover:text-white underline transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#F9DC3F]" />
              Painel de Inscritos ({leadsCount})
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
