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
  { hora: "08:00", consumo_kwh: 120, custo_brl: 60.00 },
  { hora: "10:00", consumo_kwh: 280, custo_brl: 140.00 },
  { hora: "12:00", consumo_kwh: 250, custo_brl: 125.00 },
  { hora: "14:00", consumo_kwh: 310, custo_brl: 155.00 },
  { hora: "16:00", consumo_kwh: 320, custo_brl: 160.00 },
  { hora: "18:00", consumo_kwh: 480, custo_brl: 450.00 }, // Pico de Tarifa
  { hora: "20:00", consumo_kwh: 210, custo_brl: 180.00 } 
];

export const iaRecommendations = [
  {
    id: "REC-8902",
    equipamento: "Motor Principal - Linha 1",
    categoria: "Manutenção Preditiva",
    prioridade: "Alta",
    ia_diagnostico: "Aumento de 18% na temperatura (78ºC) e vibração anômala harmônica.",
    acao_sugerida: "Pausar operação por 45 min para lubrificação e troca de rolamento (Eixo B).",
    what_if: {
      aplicar_custo: 450.00,
      ignorar_custo: 15000.00,
      risco_ignorar: "87% (Falha Iminente)"
    }
  },
  {
    id: "REC-8903",
    equipamento: "Sistema de Exaustão Central",
    categoria: "Eficiência Energética",
    prioridade: "Média",
    ia_diagnostico: "Equipamento operando a 100% de carga rotórica durante horário de ponta.",
    acao_sugerida: "Injetar comando PID para reduzir carga rotórica para 60% entre 18h e 21h.",
    what_if: {
      aplicar_economia: 120.50,
      ignorar_desperdicio: 3615.00,
      risco_ignorar: "Baixo (Apenas Financeiro)"
    }
  }
];

export const equipamentosData = [
  { id: "MOT-001", nome: "Motor Principal - Linha 1", tipo: "Motor Trifásico", status: "Crítico", temperatura: "78ºC", vibracao: "Alta (5.2 mm/s)", ultima_manutencao: "10/01/2026" },
  { id: "COMP-023", nome: "Compressor Central", tipo: "Compressor Parafuso", status: "Operacional", temperatura: "45ºC", vibracao: "Normal (1.1 mm/s)", ultima_manutencao: "15/02/2026" },
  { id: "BMB-012", nome: "Bomba de Recirculação A", tipo: "Bomba Centrífuga", status: "Operacional", temperatura: "38ºC", vibracao: "Normal (0.5 mm/s)", ultima_manutencao: "02/03/2026" },
  { id: "EXA-005", nome: "Sistema de Exaustão Central", tipo: "Exaustor", status: "Atenção", temperatura: "65ºC", vibracao: "Média (3.0 mm/s)", ultima_manutencao: "05/11/2025" },
  { id: "TRF-099", nome: "Transformador Secundário", tipo: "Trafo a Seco", status: "Operacional", temperatura: "52ºC", vibracao: "Nula", ultima_manutencao: "20/08/2025" },
  { id: "MOT-002", nome: "Motor Secundário - Linha 2", tipo: "Motor Trifásico", status: "Operacional", temperatura: "42ºC", vibracao: "Normal (0.8 mm/s)", ultima_manutencao: "20/01/2026" }
];