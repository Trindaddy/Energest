// src/services/api.js
const API_URL = 'http://127.0.0.1:8000';

// 1. Consumindo os dados reais do CSV do Back-end
export const getEquipamentosReais = async () => {
  try {
    const response = await fetch(`${API_URL}/api/equipamentos`);
    if (!response.ok) throw new Error('Falha ao buscar equipamentos');
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    return []; // Retorna array vazio em caso de erro para não quebrar a tela
  }
};

// 2. Conexão real com o modelo Scikit-Learn
export const simularPrevisaoIA = async (dadosMaquina) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosMaquina)
    });
    if (!response.ok) throw new Error(`Erro: ${response.status}`);
    return await response.json();
  } catch (error) {
    return { erro: "Falha na conexão com o motor Python." };
  }
};

// 3. Função UX: Simulador de Pulso IoT (Para o Dashboard parecer vivo)
// Isso substitui os mocks fixos por dados que flutuam sutilmente em tempo real
export const getLiveIoTData = (baseConsumo, baseEconomia) => {
  const oscilacaoConsumo = (Math.random() * 5 - 2.5).toFixed(1); // Oscila entre -2.5 e +2.5
  const novoConsumo = (baseConsumo + parseFloat(oscilacaoConsumo)).toFixed(1);
  
  return {
    consumo_atual_kwh: novoConsumo,
    meta_diaria_kwh: 5000,
    economia_acumulada_mes_brl: baseEconomia,
    status_planta: parseFloat(novoConsumo) > 4200 ? 'Atenção' : 'Operacional',
    timestamp: new Date().toLocaleTimeString()
  };
};