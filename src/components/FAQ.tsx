import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Para quais idades a oficina é recomendada?',
    answer:
      'A Oficina de Aprendizagem atende crianças em fase de desenvolvimento e aprimoramento da pré-escrita, alfabetização e raciocínio lógico, organizadas criteriosamente em pequenos grupos com vagas reduzidas para garantir afinidade, acolhimento e máxima eficácia pedagógica e terapêutica.',
  },
  {
    question: 'Por que a oficina é conduzida por duas especialistas simultaneamente?',
    answer:
      'A atuação conjunta de Adriana Bueno Marques (Arteterapia e Neuropsicopedagogia) e Fabrine Fernandes (Psicopedagogia e Educação Inclusiva) assegura um olhar 360° para cada criança. Enquanto uma especialista conduz a vivência prática, a outra acompanha minúcias do comportamento, coordenação motora, interação e regulação emocional.',
  },
  {
    question: 'Qual é a duração total e frequência dos encontros?',
    answer:
      'A oficina tem a duração de 4 semanas, com 4 encontros presenciais aos sábados, com tempo de duração de 1 hora e 30 minutos por encontro. Essa estrutura permite o aprofundamento das vivências lúdicas sem sobrecarregar a rotina da criança e da família.',
  },
  {
    question: 'Como os pais recebem o retorno sobre o desenvolvimento da criança?',
    answer:
      'Na Semana 4 (Integrar e Celebrar), é realizada a socialização das conquistas e uma devolutiva orientadora às famílias, com recomendações práticas para a continuidade do estímulo cognitivo, pedagógico e emocional em casa e na escola.',
  },
  {
    question: 'Os materiais pedagógicos e artísticos já estão inclusos?',
    answer:
      'Sim! Todos os materiais arteterapêuticos, folhas de psicomotricidade fina, pincéis, tintas, jogos estruturados e recursos lúdicos utilizados durante a oficina estão totalmente inclusos no programa.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#D8B08C]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#68C9EA]/15 text-[#1F6785] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire Suas Dúvidas
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#606060] tracking-tight mb-3">
            Perguntas Frequentes das Famílias
          </h2>
          <p className="text-xs sm:text-sm text-[#606060]/80">
            Tudo o que você precisa saber para tomar a melhor decisão para seu filho(a).
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-heading text-xs sm:text-sm font-bold text-[#606060]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#FA4E74]/15 text-[#FA4E74]' : 'text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-[13px] text-[#606060]/85 leading-relaxed border-t border-gray-100 mt-1 animate-in fade-in duration-150">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
