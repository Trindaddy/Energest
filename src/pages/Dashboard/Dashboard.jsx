// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import ConsumoCustoChart from '../../components/ui/ConsumoCustoChart'; 
import DistribuicaoConsumoChart from '../../components/ui/DistribuicaoConsumoChart'; // Import do novo gráfico
import { kpiData } from '../../services/mockData';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Grelha de KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div className="animate-fade-in delay-1"><KpiCard titulo="Consumo Atual" valor={`${kpiData.consumo_atual_kwh} kWh`} icone="bolt" corDestaque="var(--primary-light)" /></div>
        <div className="animate-fade-in delay-2"><KpiCard titulo="Meta Diária" valor={`${kpiData.meta_diaria_kwh} kWh`} icone="flag" corDestaque="var(--primary)" /></div>
        <div className="animate-fade-in delay-3"><KpiCard titulo="Economia Acumulada" valor={`R$ ${kpiData.economia_acumulada_mes_brl}`} icone="savings" corDestaque="var(--primary-dark)" /></div>
        <div className="animate-fade-in delay-4"><KpiCard titulo="Status da Planta" valor={kpiData.status_planta} icone="warning" corDestaque="var(--warning)" /></div>
      </div>

      {/* Grelha de Gráficos (Evolução visual matadora) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Gráfico 1: Linhas */}
        <div className="animate-fade-in delay-4" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', border: '1px solid var(--bg-border)', height: '420px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '18px', marginBottom: '4px' }}>Consumo vs Custo Diário</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Monitorização de impacto financeiro no horário de ponta</p>
          </div>
          <div style={{ flex: 1 }}><ConsumoCustoChart /></div>
        </div>

        {/* Gráfico 2: Rosca (Donut) */}
        <div className="animate-fade-in delay-4" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', border: '1px solid var(--bg-border)', height: '420px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: 'var(--text-main)', fontSize: '18px', marginBottom: '4px' }}>Distribuição de Carga</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Para onde vai a energia da planta industrial</p>
          </div>
          <div style={{ flex: 1 }}><DistribuicaoConsumoChart /></div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;