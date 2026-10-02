import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Check, RefreshCw, Heart } from 'lucide-react';
import { StoredImages, saveStoredImages, DEFAULT_IMAGES } from '../utils/imageStorage';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: StoredImages;
  onUpdateImages: (updated: StoredImages) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  images,
  onUpdateImages,
}) => {
  const [currentImages, setCurrentImages] = useState<StoredImages>(images);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof StoredImages
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Por favor, selecione uma imagem com menos de 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updated = { ...currentImages, [field]: base64 };
        setCurrentImages(updated);
        saveStoredImages(updated);
        onUpdateImages(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetField = (field: keyof StoredImages) => {
    const defaultVal = DEFAULT_IMAGES[field];
    const updated = { ...currentImages, [field]: defaultVal };
    setCurrentImages(updated);
    saveStoredImages(updated);
    onUpdateImages(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#D8B08C]/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-[#606060] font-heading">
              Espaço de Imagens & Fotos
            </h3>
            <p className="text-xs text-[#606060]/80">
              Personalize o logo e as fotos de Adriana e Fabrine (juntas e individuais)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {savedSuccess && (
          <div className="my-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            Foto atualizada com sucesso no cabeçalho e na página!
          </div>
        )}

        <div className="space-y-5 py-4">
          {/* 1. Imagem de Topo (Aquarela e Materiais de Arte) */}
          <div className="p-4 rounded-2xl border-2 border-[#68C9EA]/40 bg-gradient-to-r from-sky-50/40 via-white to-amber-50/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#68C9EA]" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#68C9EA]">
                    Topo Artístico da Página
                  </span>
                  <h4 className="font-bold text-sm text-[#606060]">
                    Materiais de Arte & Aquarela
                  </h4>
                </div>
              </div>
              {currentImages.headerBannerPhoto && (
                <button
                  onClick={() => handleResetField('headerBannerPhoto')}
                  className="text-xs text-gray-500 hover:text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Restaurar padrão
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 h-16 rounded-2xl border-2 border-[#68C9EA]/40 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                {currentImages.headerBannerPhoto ? (
                  <img
                    src={currentImages.headerBannerPhoto}
                    alt="Topo personalizado"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] font-semibold text-[#68C9EA] text-center px-1">
                    Aquarela Padrão
                  </span>
                )}
              </div>

              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#68C9EA]/50 hover:bg-[#FAF8F5] text-xs font-medium text-[#606060] rounded-xl cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#68C9EA]" />
                  Alterar banner do topo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'headerBannerPhoto')}
                  />
                </label>
                <p className="text-[11px] text-gray-500 mt-1">
                  Foto de aquarela ou materiais de arte no topo da página.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Foto de Adriana e Fabrine Juntas (Destaque Canto Abaixo e Parceria) */}
          <div className="p-4 rounded-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-r from-amber-50/40 via-white to-rose-50/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FA4E74] fill-[#FA4E74]" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Destaque de Adriana & Fabrine
                  </span>
                  <h4 className="font-bold text-sm text-[#606060]">
                    Foto de Adriana & Fabrine Juntas
                  </h4>
                </div>
              </div>
              <button
                onClick={() => handleResetField('duoPhoto')}
                className="text-xs text-gray-500 hover:text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Restaurar
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-[#D4AF37] bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                <img
                  src={
                    currentImages.duoPhoto ||
                    'https://i.ibb.co/RkVkXqrb/patitour-2026-09-30-T141101-234.png'
                  }
                  alt="Adriana e Fabrine juntas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#D4AF37] hover:bg-[#FAF8F5] text-xs font-medium text-[#606060] rounded-xl cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Alterar foto da dupla
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'duoPhoto')}
                  />
                </label>
                <p className="text-[11px] text-gray-500 mt-1">
                  Exibida no canto do cabeçalho com moldura de pincelada e na seção de parceria.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Adriana Bueno Marques (Individual) */}
          <div className="p-4 rounded-2xl border border-gray-100 bg-[#FAF8F5]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8D72A8]">
                  Bloco das Especialistas
                </span>
                <h4 className="font-semibold text-sm text-[#606060]">
                  Foto de Adriana Bueno Marques
                </h4>
              </div>
              <button
                onClick={() => handleResetField('adrianaPhoto')}
                className="text-xs text-gray-500 hover:text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Restaurar
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-[#8D72A8]/40 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                <img
                  src={
                    currentImages.adrianaPhoto ||
                    'https://i.ibb.co/CpYWBP0v/dri.png'
                  }
                  alt="Adriana preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#8D72A8]/40 hover:bg-[#FAF8F5] text-xs font-medium text-[#606060] rounded-xl cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#8D72A8]" />
                  Alterar foto de Adriana
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'adrianaPhoto')}
                  />
                </label>
                <p className="text-[11px] text-gray-400 mt-1">
                  Exibida no card individual de Adriana.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Fabrine Fernandes (Individual) */}
          <div className="p-4 rounded-2xl border border-gray-100 bg-[#FAF8F5]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#68C9EA]">
                  Bloco das Especialistas
                </span>
                <h4 className="font-semibold text-sm text-[#606060]">
                  Foto de Fabrine Fernandes
                </h4>
              </div>
              <button
                onClick={() => handleResetField('fabrinePhoto')}
                className="text-xs text-gray-500 hover:text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Restaurar
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-[#68C9EA]/50 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                <img
                  src={
                    currentImages.fabrinePhoto ||
                    'https://i.ibb.co/k68p8rwS/patitour-2026-06-25-T112823-542.png'
                  }
                  alt="Fabrine preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#68C9EA]/50 hover:bg-[#FAF8F5] text-xs font-medium text-[#606060] rounded-xl cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#68C9EA]" />
                  Alterar foto de Fabrine
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'fabrinePhoto')}
                  />
                </label>
                <p className="text-[11px] text-gray-400 mt-1">
                  Exibida no card individual de Fabrine.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Logo do Evento */}
          <div className="p-4 rounded-2xl border border-gray-100 bg-[#FAF8F5]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FA4E74]">
                  Identidade Visual
                </span>
                <h4 className="font-semibold text-sm text-[#606060]">
                  Logo do Evento
                </h4>
              </div>
              {currentImages.eventLogo && (
                <button
                  onClick={() => handleResetField('eventLogo')}
                  className="text-xs text-gray-500 hover:text-red-500 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Restaurar padrão
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl border border-dashed border-[#D8B08C] bg-white flex items-center justify-center overflow-hidden shrink-0">
                {currentImages.eventLogo ? (
                  <img
                    src={currentImages.eventLogo}
                    alt="Logo preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="w-6 h-6 text-[#D8B08C] mx-auto mb-1" />
                    <span className="text-[9px] text-gray-400">Padrão</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-[#D8B08C] hover:bg-[#FAF8F5] text-xs font-medium text-[#606060] rounded-xl cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-[#FA4E74]" />
                  Enviar arquivo do Logo (PNG/JPG)
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'eventLogo')}
                  />
                </label>
                <p className="text-[11px] text-gray-400 mt-1">
                  Recomendado: arquivo PNG transparente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#FA4E74] hover:bg-[#e43e64] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            Concluir & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
