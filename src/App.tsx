/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Diferenciais } from './components/Diferenciais';
import { Oficinas } from './components/Oficinas';
import { ComoFunciona } from './components/ComoFunciona';
import { Especialistas } from './components/Especialistas';
import { InscricaoLeadForm } from './components/InscricaoLeadForm';
import { FAQ } from './components/FAQ';
import { ChamadaFinal } from './components/ChamadaFinal';
import { Footer } from './components/Footer';
import { ImageUploadModal } from './components/ImageUploadModal';
import { LeadsManagerModal } from './components/LeadsManagerModal';
import { getStoredImages, StoredImages } from './utils/imageStorage';
import { getStoredLeads } from './utils/leadStorage';
import { Lead } from './types';

export default function App() {
  const [images, setImages] = useState<StoredImages>(getStoredImages);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [leads, setLeads] = useState<Lead[]>(getStoredLeads);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);

  const [selectedWorkshopForForm, setSelectedWorkshopForForm] = useState<string>('');

  const refreshLeads = () => {
    setLeads(getStoredLeads());
  };

  const handleClearLeads = () => {
    localStorage.removeItem('oficinas_terapeuticas_leads_v1');
    setLeads([]);
  };

  const handleSelectWorkshop = (workshopName: string) => {
    setSelectedWorkshopForForm(workshopName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#606060]">
      {/* Header com espaço reservado para Logo e Adriana & Fabrine */}
      <Header
        images={images}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        onOpenLeadsModal={() => setIsLeadsModalOpen(true)}
        leadsCount={leads.length}
      />

      <main className="flex-1">
        {/* Seção Hero (Topo) */}
        <Hero
          images={images}
          onOpenImageModal={() => setIsImageModalOpen(true)}
        />

        {/* Seção Diferenciais */}
        <Diferenciais />

        {/* Seção Oficinas (Formato Cards) */}
        <Oficinas onSelectWorkshop={handleSelectWorkshop} />

        {/* Seção Como funciona cada ciclo? (Semana 1 a 4) */}
        <ComoFunciona />

        {/* Seção Quem conduz as oficinas? (Especialistas & Parceria) */}
        <Especialistas
          images={images}
          onOpenImageModal={() => setIsImageModalOpen(true)}
        />

        {/* Seção de Captura de Leads e Pré-Inscrição */}
        <InscricaoLeadForm
          selectedWorkshop={selectedWorkshopForForm}
          onLeadCaptured={refreshLeads}
          onOpenLeadsModal={() => setIsLeadsModalOpen(true)}
          leadsCount={leads.length}
        />

        {/* Perguntas Frequentes */}
        <FAQ />

        {/* Chamada Final com Slogan da Marca */}
        <ChamadaFinal />
      </main>

      {/* Footer */}
      <Footer
        onOpenLeadsModal={() => setIsLeadsModalOpen(true)}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        leadsCount={leads.length}
      />

      {/* Modal de Personalização de Imagens (Logo, Adriana, Fabrine) */}
      <ImageUploadModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={images}
        onUpdateImages={(updated) => setImages(updated)}
      />

      {/* Modal de Gestão de Inscrições / Leads para as Organizadoras */}
      <LeadsManagerModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
        leads={leads}
        onClearLeads={handleClearLeads}
      />
    </div>
  );
}
