import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  User,
  Heart,
  Phone,
  Mail,
  HelpCircle,
  Clock,
  FileText,
  ArrowRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { saveLead, sendLeadToWebhook } from '../utils/leadStorage';
import { Lead } from '../types';
import { PlanilhaGuiaModal } from './PlanilhaGuiaModal';

interface InscricaoLeadFormProps {
  selectedWorkshop?: string;
  onLeadCaptured: () => void;
  onOpenLeadsModal: () => void;
  leadsCount: number;
}

export const InscricaoLeadForm: React.FC<InscricaoLeadFormProps> = ({
  selectedWorkshop,
  onLeadCaptured,
  onOpenLeadsModal,
  leadsCount,
}) => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [workshop, setWorkshop] = useState(
    selectedWorkshop || 'Oficina Ler, Escrever e Contar...'
  );
  const [preferredShift, setPreferredShift] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [missingFields, setMissingFields] = useState<{ label: string; fieldId: string }[]>([]);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);

  // Sync when selectedWorkshop changes
  useEffect(() => {
    if (selectedWorkshop) {
      setWorkshop(selectedWorkshop);
    }
  }, [selectedWorkshop]);

  // Format phone number with Brazilian mask
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const handleFormSubmit = async () => {
    const missing: { label: string; fieldId: string }[] = [];

    if (!parentName.trim()) {
      missing.push({ label: 'Nome do Responsável', fieldId: 'field-parentName' });
    }
    if (!childName.trim()) {
      missing.push({ label: 'Nome da Criança', fieldId: 'field-childName' });
    }
    if (!childAge.trim()) {
      missing.push({ label: 'Idade da Criança', fieldId: 'field-childAge' });
    }
    if (phone.replace(/\D/g, '').length < 10) {
      missing.push({ label: 'Telefone para Contato (com DDD)', fieldId: 'field-phone' });
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      missing.push({ label: 'E-mail do Responsável', fieldId: 'field-email' });
    }
    if (!preferredShift) {
      missing.push({ label: 'Horário de Preferência aos Sábados', fieldId: 'field-shift' });
    }

    // Se faltar algum item, exibe o pop-up indicando exatamente o que preencher
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowValidationModal(true);
      return;
    }

    setIsSubmitting(true);

    const newLead = saveLead({
      parentName: parentName.trim(),
      childName: childName.trim(),
      childAge: childAge.trim() || 'Não informada',
      phone: phone.trim(),
      email: email.trim(),
      workshop: workshop || 'Oficina Ler, Escrever e Contar...',
      preferredShift,
      notes: notes.trim(),
    });

    onLeadCaptured();

    // Sincroniza com o Webhook / Planilha caso configurado
    try {
      await sendLeadToWebhook(newLead);
    } catch (err) {
      console.warn('Webhook sync error', err);
    }

    setSubmittedLead(newLead);
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleReset = () => {
    setParentName('');
    setChildName('');
    setChildAge('');
    setPhone('');
    setEmail('');
    setPreferredShift('');
    setNotes('');
    setShowSuccessModal(false);
  };

  return (
    <section id="inscricao" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#56C45F]/15 text-[#1E6E27] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Vagas Limitadas • Encontros aos Sábados
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#606060] tracking-tight mb-4">
            Faça a Pré-Inscrição na Oficina de Aprendizagem
          </h2>
          <p className="text-sm sm:text-base text-[#606060]/85">
            Preencha os dados abaixo para receber todas as informações sobre horários e garantir a vaga na <strong>Oficina Ler, Escrever e Contar...</strong>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          
          {/* Left Context / Benefits Card with Motion */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#FAF8F5] rounded-3xl p-7 border border-[#D8B08C]/30 shadow-xs hover:shadow-md transition-shadow">
              <h3 className="font-heading text-lg font-bold text-[#606060] mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FA4E74]" />
                Como funciona a inscrição?
              </h3>
              
              <ul className="space-y-4 text-xs sm:text-[13px] text-[#606060]/90">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#FA4E74]/15 text-[#FA4E74] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-[#606060] block">Envio dos dados:</strong>
                    Você preenche o formulário ao lado com as informações da criança.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#68C9EA]/20 text-[#1F6785] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-[#606060] block">Contato das Especialistas:</strong>
                    Adriana ou Fabrine entram em contato diretamente para tirar dúvidas e alinhar o perfil da turma.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#56C45F]/20 text-[#1E6E27] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-[#606060] block">Confirmação e boas-vindas:</strong>
                    Confirmação da matrícula com envio das orientações da Semana 1 da oficina.
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-gray-200/70">
                <p className="text-xs text-[#606060]/80 italic">
                  "O acolhimento e a escuta da família começam desde o primeiro contato."
                </p>
              </div>
            </div>

            {/* Discreet Lead Counter & Panel for Organizers */}
            {leadsCount > 0 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onOpenLeadsModal}
                  className="text-xs text-[#606060]/70 hover:text-[#FA4E74] underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Ver inscrições registradas ({leadsCount})
                </button>
              </div>
            )}
          </motion.div>

          {/* Right Lead Capture Form with Motion */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#FAF8F5] rounded-3xl p-7 sm:p-9 border border-[#D8B08C]/40 shadow-md hover:shadow-xl transition-shadow"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit();
              }}
              className="space-y-4"
            >
              {/* Responsável e Criança */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-parentName" className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#FA4E74]" />
                    Nome do Responsável *
                  </label>
                  <input
                    id="field-parentName"
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Ex: Mariana Silva"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#606060] placeholder:text-gray-400 focus:outline-none focus:border-[#FA4E74] focus:ring-1 focus:ring-[#FA4E74] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="field-childName" className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#E58B92]" />
                    Nome da Criança *
                  </label>
                  <input
                    id="field-childName"
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Ex: Pedro Silva"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#606060] placeholder:text-gray-400 focus:outline-none focus:border-[#FA4E74] focus:ring-1 focus:ring-[#FA4E74] transition-all"
                  />
                </div>
              </div>

              {/* Idade e Telefone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="field-childAge" className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#68C9EA]" />
                    Idade da Criança *
                  </label>
                  <input
                    id="field-childAge"
                    type="text"
                    required
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    placeholder="Ex: 7 anos"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#606060] placeholder:text-gray-400 focus:outline-none focus:border-[#FA4E74] focus:ring-1 focus:ring-[#FA4E74] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="field-phone" className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#56C45F]" />
                    Telefone para Contato (com DDD) *
                  </label>
                  <input
                    id="field-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 98765-4321"
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#606060] placeholder:text-gray-400 focus:outline-none focus:border-[#FA4E74] focus:ring-1 focus:ring-[#FA4E74] transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="field-email" className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#8D72A8]" />
                    E-mail do Responsável *
                  </span>
                </label>
                <input
                  id="field-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#606060] placeholder:text-gray-400 focus:outline-none focus:border-[#FA4E74] focus:ring-1 focus:ring-[#FA4E74] transition-all"
                />
              </div>

              {/* Oficina Selecionada (Única) */}
              <div className="p-3.5 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border border-[#FA4E74]/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FA4E74] text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FA4E74] block">
                      Oficina de Aprendizagem
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#606060]">
                      Oficina Ler, Escrever e Contar...
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-[#1E6E27] bg-[#56C45F]/15 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Vagas Abertas
                </span>
              </div>

              {/* Turno de Preferência */}
              <div id="field-shift" className="scroll-mt-8">
                <label className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Horário de Preferência aos Sábados *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Sábado Manhã', 'Sábado Tarde', 'Qualquer Horário'].map((shift) => (
                    <button
                      key={shift}
                      type="button"
                      onClick={() => setPreferredShift(shift)}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        preferredShift === shift
                          ? 'bg-[#FA4E74] text-white border-[#FA4E74] shadow-xs ring-2 ring-[#FA4E74]/25'
                          : 'bg-white text-[#606060] border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {shift}
                    </button>
                  ))}
                </div>
              </div>

              {/* Observações e desafios */}
              <div>
                <label className="block text-xs font-bold text-[#606060] mb-1.5 flex items-center justify-between">
                  <span>Alguma dificuldade, desafio ou necessidade específica que gostaria de compartilhar?</span>
                  <span className="text-[10px] text-gray-400 font-normal">Opcional</span>
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Dificuldade na coordenação motora fina, timidez para se expressar, desafios de leitura ou escrita..."
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#606060] placeholder:text-gray-400 focus:outline-none focus:border-[#FA4E74] focus:ring-1 focus:ring-[#FA4E74] transition-all resize-none"
                />
              </div>

              {/* Action Button: Inscrição 100% no site */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-[#FA4E74] hover:bg-[#e43e64] text-white text-sm font-extrabold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registrando Inscrição...' : 'Confirmar Inscrição na Oficina'}</span>
                </motion.button>
              </div>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                🔒 Seus dados estão seguros e serão sincronizados diretamente com a coordenação da oficina.
              </p>
            </form>
          </motion.div>

        </div>

      </div>

      {/* Pop-up Modal de Aviso de Campos Não Preenchidos */}
      <AnimatePresence>
        {showValidationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-2 border-[#FA4E74]/30 text-center relative"
            >
              <button
                type="button"
                onClick={() => setShowValidationModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3.5 border border-amber-200 shadow-2xs">
                <AlertCircle className="w-7 h-7 text-amber-600" />
              </div>

              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#606060] mb-2">
                Quase lá! Faltam alguns dados
              </h3>
              <p className="text-xs sm:text-sm text-[#606060]/85 mb-4 leading-relaxed">
                Para podermos registrar a sua inscrição, é necessário preencher os seguintes campos:
              </p>

              <div className="bg-[#FAF8F5] rounded-2xl p-4 text-left border border-[#D8B08C]/30 mb-5 space-y-2.5">
                {missingFields.map((field, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-[#FA4E74]">
                    <span className="w-2 h-2 rounded-full bg-[#FA4E74] shrink-0" />
                    <span>{field.label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  const targetId = missingFields[0]?.fieldId;
                  setShowValidationModal(false);
                  if (targetId) {
                    setTimeout(() => {
                      const el = document.getElementById(targetId);
                      if (el) {
                        el.focus();
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }
                }}
                className="w-full py-3.5 px-4 bg-[#FA4E74] hover:bg-[#e43e64] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Entendido, preencher agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      {showSuccessModal && submittedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl border border-[#56C45F]/30 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#56C45F]/15 text-[#56C45F] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-[#56C45F]" />
            </div>

            <h3 className="font-heading text-xl font-bold text-[#606060] mb-2">
              Inscrição Registrada com Sucesso!
            </h3>
            <p className="text-xs text-[#606060]/85 mb-6 leading-relaxed">
              Obrigado, <strong>{submittedLead.parentName}</strong>! A pré-inscrição de <strong>{submittedLead.childName}</strong> na <strong>Oficina de Aprendizagem</strong> foi gravada na base com sucesso.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-100 text-left text-xs text-[#606060] space-y-1.5 mb-6">
              <p>• <strong>Programa:</strong> {submittedLead.workshop}</p>
              <p>• <strong>Horário preferido:</strong> {submittedLead.preferredShift}</p>
              <p>• <strong>Telefone de contato:</strong> {submittedLead.phone}</p>
              <p className="text-[11px] text-[#1E6E27] font-semibold pt-1 border-t border-gray-100">
                ✅ Dados registrados com sucesso. Entraremos em contato para confirmar sua vaga!
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleReset}
                className="w-full py-3 px-4 bg-[#FA4E74] hover:bg-[#e43e64] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Concluir e Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal Tutorial de Conexão com Planilha */}
      <PlanilhaGuiaModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
      />
    </section>
  );
};
