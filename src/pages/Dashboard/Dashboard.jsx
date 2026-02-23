// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import ConsumoCustoChart from '../../components/ui/ConsumoCustoChart'; 
import { kpiData } from '../../services/mockData';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Grelha de KPIs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
        <div className="animate-fade-in delay-1">
          <KpiCard 
            titulo="Consumo Atual" 
            valor={`${kpiData.consumo_atual_kwh} kWh`} 
            icone="bolt" 
            corDestaque="var(--primary-light)" 
          />
        </div>
        <div className="animate-fade-in delay-2">
          <KpiCard 
            titulo="Meta Diária" 
            valor={`${kpiData.meta_diaria_kwh} kWh`} 
            icone="flag" 
            corDestaque="var(--primary)" 
          />
        </div>
        <div className="animate-fade-in delay-3">
          <KpiCard 
            titulo="Economia Acumulada" 
            valor={`R$ ${kpiData.economia_acumulada_mes_brl}`} 
            icone="savings" 
            corDestaque="var(--primary-dark)" 
          />
        </div>
        <div className="animate-fade-in delay-4">
          <KpiCard 
            titulo="Status da Planta" 
            valor={kpiData.status_planta} 
            icone="warning" 
            corDestaque="var(--warning)" 
          />
        </div>
      </div> {/* <-- AQUI ESTAVA FALTANDO FECHAR A DIV DA GRELHA! */}

      {/* Área do Gráfico */}
      <div className="animate-fade-in delay-4" style={{ /* Aproveitei e coloquei a animação aqui também! */
        backgroundColor: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--bg-border)',
        height: '450px', 
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: 'var(--text-main)', fontSize: '20px', marginBottom: '4px' }}>
            Consumo vs Custo Diário
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Monitorização de impacto financeiro em horário de ponta
          </p>
        </div>
        
        {/* Renderizando o componente do gráfico */}
        <div style={{ flex: 1 }}>
          <ConsumoCustoChart />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;