import React, { useState } from 'react';
import { X, FileSpreadsheet, Copy, Check, ExternalLink, Sparkles, HelpCircle } from 'lucide-react';
import { getStoredWebhookUrl, saveStoredWebhookUrl } from '../utils/leadStorage';

interface PlanilhaGuiaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanilhaGuiaModal: React.FC<PlanilhaGuiaModalProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState(getStoredWebhookUrl());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleSaveWebhook = () => {
    saveStoredWebhookUrl(webhookUrl);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const scriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Se for a primeira linha, cria o cabeçalho
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "ID", 
        "Data/Hora", 
        "Responsável", 
        "Criança", 
        "Idade", 
        "Telefone", 
        "E-mail", 
        "Oficina", 
        "Turno", 
        "Observações"
      ]);
    }
    
    // Adiciona a inscrição
    sheet.appendRow([
      data.id || "",
      data.data || new Date().toLocaleString("pt-BR"),
      data.responsavel || "",
      data.crianca || "",
      data.idade || "",
      data.telefone || "",
      data.email || "",
      data.oficina || "",
      data.turno || "",
      data.observacoes || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#56C45F]/15 text-[#1E6E27] flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-[#56C45F]" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#606060]">
                Como Conectar a Planilha (Excel / Google Sheets)
              </h3>
              <p className="text-xs text-gray-500">
                Duas maneiras simples de receber e gerenciar todas as inscrições
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 text-xs sm:text-[13px] text-[#606060] pr-1">
          {/* Opção 1: Direto */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#D8B08C]/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#56C45F] text-white font-extrabold text-[10px] uppercase">
                Opção 1 (Imediata)
              </span>
              <h4 className="font-bold text-[#606060] text-sm">
                Baixar Planilha Excel com 1 Clique
              </h4>
            </div>
            <p className="text-xs text-[#606060]/90 leading-relaxed mb-2">
              Todas as inscrições feitas no site ficam salvas no sistema. Você pode clicar no botão <strong>"Exportar Planilha Excel"</strong> a qualquer momento no <em>Painel de Inscritos</em> (no rodapé da página) e baixar o arquivo <code>.csv</code> que abre diretamente no <strong>Microsoft Excel</strong>, Google Planilhas ou no celular.
            </p>
          </div>

          {/* Opção 2: Automática via Google Sheets */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#68C9EA]/40 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#68C9EA] text-white font-extrabold text-[10px] uppercase">
                Opção 2 (Em Tempo Real)
              </span>
              <h4 className="font-bold text-[#606060] text-sm">
                Sincronizar Automaticamente no Google Sheets
              </h4>
            </div>

            <p className="text-xs text-[#606060]/90 leading-relaxed">
              Siga os 4 passos abaixo para que cada pré-inscrição enviada caia automaticamente como uma nova linha na sua planilha online:
            </p>

            <ol className="space-y-3 pl-4 list-decimal text-xs text-[#606060]/90">
              <li>
                <strong>Crie uma nova planilha:</strong> Abra o <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-[#FA4E74] underline font-bold inline-flex items-center gap-0.5">Google Sheets <ExternalLink className="w-3 h-3" /></a> e nomeie como <em>"Inscrições Oficina de Aprendizagem"</em>.
              </li>
              <li>
                <strong>Abra o Apps Script:</strong> No menu superior da planilha, clique em <strong>Extensões &gt; Apps Script</strong>.
              </li>
              <li>
                <strong>Cole este código:</strong> Apague o conteúdo existente lá e cole o código abaixo:
                <div className="mt-2 relative">
                  <pre className="p-3 bg-gray-900 text-gray-100 rounded-xl text-[11px] overflow-x-auto font-mono max-h-36">
                    {scriptCode}
                  </pre>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="absolute top-2 right-2 px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-[#56C45F]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>
              </li>
              <li>
                <strong>Implantar como App da Web:</strong> Clique no botão azul <strong>Implantar &gt; Nova Implantação</strong>.
                <ul className="list-disc pl-4 mt-1 text-[11px] text-gray-500 space-y-0.5">
                  <li>Selecione o tipo: <em>App da Web</em>.</li>
                  <li>Em <em>"Quem pode acessar"</em>, selecione: <strong>Qualquer pessoa</strong>.</li>
                  <li>Clique em <em>Implantar</em> e autorize o acesso com sua conta Google.</li>
                  <li>Copie o link gerado (URL do App da Web).</li>
                </ul>
              </li>
            </ol>

            {/* Input da Webhook URL */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <label className="block text-xs font-bold text-[#606060]">
                Cole a URL do App da Web / Planilha abaixo:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-[#606060] focus:outline-none focus:border-[#FA4E74]"
                />
                <button
                  type="button"
                  onClick={handleSaveWebhook}
                  className="px-4 py-2 bg-[#56C45F] hover:bg-[#46a84e] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Salvar Conexão
                </button>
              </div>
              {savedSuccess && (
                <p className="text-[11px] text-[#1E6E27] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  URL da planilha salva com sucesso! Os novos cadastros serão sincronizados automaticamente.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#606060] rounded-xl transition-colors cursor-pointer"
          >
            Entendi / Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
