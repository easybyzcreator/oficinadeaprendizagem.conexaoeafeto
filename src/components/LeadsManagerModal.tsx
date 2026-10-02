import React, { useState } from 'react';
import { X, Download, Trash2, Search, Users, Phone, Mail, Calendar, Check, FileSpreadsheet } from 'lucide-react';
import { Lead } from '../types';
import { exportLeadsToCSV } from '../utils/leadStorage';

interface LeadsManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onClearLeads: () => void;
}

export const LeadsManagerModal: React.FC<LeadsManagerModalProps> = ({
  isOpen,
  onClose,
  leads,
  onClearLeads,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterWorkshop, setFilterWorkshop] = useState('');

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.parentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.childName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm);

    const matchesWorkshop = !filterWorkshop || lead.workshop === filterWorkshop;

    return matchesSearch && matchesWorkshop;
  });

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todo o histórico de leads? Esta ação não pode ser desfeita.')) {
      onClearLeads();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl border border-gray-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FA4E74]/15 text-[#FA4E74] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#606060]">
                Painel de Inscrições & Leads Capturados
              </h3>
              <p className="text-xs text-gray-400">
                Acesso exclusivo das organizadoras ({leads.length} inscrições registradas)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {leads.length > 0 && (
              <button
                onClick={() => exportLeadsToCSV(leads)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#56C45F]/15 hover:bg-[#56C45F]/25 text-[#1E6E27] border border-[#56C45F]/30 text-xs font-bold transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#56C45F]" />
                Baixar Planilha Excel (.csv)
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="py-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por responsável, criança ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#606060] focus:outline-none focus:border-[#FA4E74]"
            />
          </div>

          <select
            value={filterWorkshop}
            onChange={(e) => setFilterWorkshop(e.target.value)}
            className="py-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#606060] focus:outline-none focus:border-[#FA4E74]"
          >
            <option value="">Todas as oficinas</option>
            <option value="Ateliê da Coordenação">Ateliê da Coordenação</option>
            <option value="Letrar">Letrar</option>
            <option value="Numerar">Numerar</option>
            <option value="Ateliê das Estratégias">Ateliê das Estratégias</option>
            <option value="Ateliê da Expressão">Ateliê da Expressão</option>
            <option value="ConViver">ConViver</option>
          </select>
        </div>

        {/* Leads Table / List */}
        <div className="flex-1 overflow-y-auto py-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Nenhuma inscrição encontrada</p>
              <p className="text-xs mt-1">As inscrições enviadas pelo formulário aparecerão aqui instantaneamente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 hover:border-[#FA4E74]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[#606060]">
                        {lead.childName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] text-gray-500">
                        {lead.childAge} {lead.childAge.includes('ano') ? '' : 'anos'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FA4E74]/15 text-[#FA4E74] font-semibold text-[11px]">
                        {lead.workshop}
                      </span>
                    </div>

                    <div className="text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                      <span>Responsável: <strong className="text-[#606060]">{lead.parentName}</strong></span>
                      <span className="flex items-center gap-1 font-semibold text-[#606060]">
                        <Phone className="w-3 h-3 text-[#56C45F]" />
                        <span>{lead.phone}</span>
                      </span>
                      {lead.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {lead.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(lead.createdAt).toLocaleDateString('pt-BR')} ({lead.preferredShift})
                      </span>
                    </div>

                    {lead.notes && (
                      <p className="mt-2 text-gray-600 bg-white p-2 rounded-lg border border-gray-100 text-[11px] italic">
                        "{lead.notes}"
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Inscrição Registrada
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
          {leads.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar dados
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-[#606060] rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
