// src/services/mockData.js

export const kpiData = {
  consumo_atual_kwh: 450.2,
  meta_diaria_kwh: 500.0,
  economia_acumulada_mes_brl: 3450.75,
  status_planta: "Atenção Requerida",
  equipamentos_ativos: 42,
  equipamentos_alerta: 2
};

export const chartData = [
  { hora: "14:00", consumo_kwh: 310, custo_brl: 155.00 },
  { hora: "15:00", consumo_kwh: 315, custo_brl: 157.50 },
  { hora: "16:00", consumo_kwh: 320, custo_brl: 160.00 },
  { hora: "17:00", consumo_kwh: 305, custo_brl: 290.00 }, 
  { hora: "18:00", consumo_kwh: 300, custo_brl: 450.00 } 
];

export const iaRecommendations = [
  {
    id: "REC-001",
    equipamento: "Motor Principal - Linha 1",
    categoria: "Manutenção Preditiva",
    prioridade: "Alta",
    ia_diagnostico: "Aumento de 18% na temperatura e vibração anômala.",
    acao_sugerida: "Pausar operação por 45 min para lubrificação e troca de rolamento.",
    what_if: {
      aplicar_custo: 450.00,
      ignorar_custo: 15000.00,
      risco_ignorar: "87%"
    }
  },
  {
    id: "REC-002",
    equipamento: "Sistema de Exaustão",
    categoria: "Eficiência Energética",
    prioridade: "Média",
    ia_diagnostico: "Equipamento operando a 100% durante horário de ponta.",
    acao_sugerida: "Reduzir carga para 60% entre 18h e 21h.",
    what_if: {
      aplicar_economia: 120.50,
      ignorar_desperdicio: 3615.00,
      risco_ignorar: "Baixo"
    }
  }
];