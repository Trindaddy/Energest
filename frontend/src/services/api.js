// src/services/api.js
import { kpiData, chartData, iaRecommendations, equipamentosData } from './mockData';

// ==========================================
// CONFIGURAÇÃO DE AMBIENTE (ENV)
// ==========================================
// CHAVE DE OURO: Mude para 'false' para ligar o React no Python!
const USE_MOCK = false; 

const BASE_URL = 'http://127.0.0.1:8000'; // Porta padrão do FastAPI
// ==========================================

/**
 * Função Core de Fetch com Fallback de Segurança (Resiliência)
 * Se o Back-end cair na hora do Pitch, o Front-end assume os mocks automaticamente.
 */
async function fetchFromApi(endpoint, mockFallback) {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFallback), 600); // Delay simulando latência de rede
    });
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`[API ERROR] Falha ao comunicar com ${endpoint}:`, error);
    console.warn("🛡️ Ativando Fallback Mode: Retornando dados em cache para não quebrar a UI.");
    return mockFallback;
  }
}

// ==========================================
// ROTAS DO SISTEMA (ENDPOINTS)
// ==========================================

export const getDashboardKpis = () => fetchFromApi('/api/dashboard/kpis', kpiData);

export const getConsumoHistorico = () => fetchFromApi('/api/dashboard/grafico-consumo', chartData);

export const getRecomendacoesIA = () => fetchFromApi('/api/ia/recomendacoes', iaRecommendations);

export const getEquipamentos = () => fetchFromApi('/api/equipamentos/lista', equipamentosData);

export const aprovarRecomendacao = async (idRecomendacao) => {
  if (USE_MOCK) {
    console.log(`[AUDITORIA] Ação de correção ${idRecomendacao} enviada ao CLP da máquina.`);
    return { status: 'sucesso', mensagem: 'Ação aplicada via rede industrial.' };
  }

  const response = await fetch(`${BASE_URL}/api/ia/aprovar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: idRecomendacao })
  });
  return response.json();
};