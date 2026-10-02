import { Lead } from '../types';

const LEADS_STORAGE_KEY = 'oficinas_terapeuticas_leads_v1';
const DEFAULT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx62zL4_ZCqHy4tO9ttnptNSyqDAD3CNjzE5WZPv10enT5z9pqYeSBHD9nF81-D-wTa/exec';

export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load leads from localStorage', err);
  }
  return [];
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const newLead: Lead = {
    ...lead,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };

  try {
    const current = getStoredLeads();
    const updated = [newLead, ...current];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save lead', err);
  }

  return newLead;
}

export function getStoredWebhookUrl(): string {
  try {
    return localStorage.getItem('sheets_webhook_url') || DEFAULT_WEBHOOK_URL;
  } catch {
    return DEFAULT_WEBHOOK_URL;
  }
}

export function saveStoredWebhookUrl(url: string) {
  try {
    localStorage.setItem('sheets_webhook_url', url.trim());
  } catch (e) {
    console.error('Error saving webhook url', e);
  }
}

export async function sendLeadToWebhook(lead: Lead): Promise<boolean> {
  const url = getStoredWebhookUrl();
  if (!url) return false;
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: lead.id,
        data: new Date(lead.createdAt).toLocaleString('pt-BR'),
        responsavel: lead.parentName,
        crianca: lead.childName,
        idade: lead.childAge,
        telefone: lead.phone,
        email: lead.email,
        oficina: lead.workshop,
        turno: lead.preferredShift,
        observacoes: lead.notes,
      }),
    });
    return true;
  } catch (err) {
    console.error('Failed to trigger webhook', err);
    return false;
  }
}

export function exportLeadsToCSV(leads: Lead[]) {
  if (!leads.length) return;
  
  const headers = [
    'ID',
    'Data/Hora',
    'Responsável',
    'Criança',
    'Idade',
    'Telefone (Celular)',
    'E-mail',
    'Programa / Oficina',
    'Turno de Preferência',
    'Observações / Desafios',
  ];

  const rows = leads.map(l => [
    l.id,
    new Date(l.createdAt).toLocaleString('pt-BR'),
    `"${(l.parentName || '').replace(/"/g, '""')}"`,
    `"${(l.childName || '').replace(/"/g, '""')}"`,
    l.childAge,
    `"${l.phone}"`,
    `"${l.email}"`,
    `"${(l.workshop || '').replace(/"/g, '""')}"`,
    `"${(l.preferredShift || '').replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `inscricoes_oficina_aprendizagem_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
