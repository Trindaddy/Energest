// src/services/api.js
import { kpiData, chartData, iaRecommendations, equipamentosData } from './mockData';

// ==========================================
// CONFIGURAÇÃO DA API
// ==========================================
// Amiga do Back-end: Mude USE_MOCK para 'false' quando sua API estiver rodando!
const USE_MOCK = true; 

// Coloque a URL da sua API local aqui (ex: http://127.0.0.1:5000/api)
const BASE_URL = 'http://localhost:5000/api'; 
// ==========================================

/**
 * Função genérica para lidar com as requisições
 */
async function fetchFromApi(endpoint, mockFallback) {
  if (USE_MOCK) {
    // Simula um pequeno atraso de rede (delay de 500ms) para parecer real
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockFallback), 500);
    });
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    // Em caso de erro na API real, cai de volta para o mock para o painel não quebrar na apresentação
    console.warn("Retornando dados mockados como fallback de segurança.");
    return mockFallback;
  }
}

// ==========================================
// ENDPOINTS DO SISTEMA
// ==========================================

export const getDashboardKpis = () => {
  return fetchFromApi('/dashboard/kpis', kpiData);
};

export const getConsumoHistorico = () => {
  return fetchFromApi('/dashboard/grafico-consumo', chartData);
};

export const getRecomendacoesIA = () => {
  return fetchFromApi('/ia/recomendacoes', iaRecommendations);
};

export const getEquipamentos = () => {
  return fetchFromApi('/equipamentos/lista', equipamentosData);
};

// Exemplo de uma rota POST (quando o usuário clica em "Aprovar Recomendação")
export const aprovarRecomendacao = async (idRecomendacao) => {
  if (USE_MOCK) {
    console.log(`[MOCK] Recomendação ${idRecomendacao} aprovada com sucesso!`);
    return { status: 'sucesso', mensagem: 'Ação aplicada e equipamentos notificados.' };
  }

  const response = await fetch(`${BASE_URL}/ia/aprovar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: idRecomendacao })
  });
  return response.json();
};