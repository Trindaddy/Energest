// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import ConsumoCustoChart from '../../components/ui/ConsumoCustoChart'; // <-- Importamos o gráfico
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
        <KpiCard 
          titulo="Consumo Atual" 
          valor={`${kpiData.consumo_atual_kwh} kWh`} 
          icone="bolt" 
          corDestaque="var(--primary-light)" 
        />
        <KpiCard 
          titulo="Meta Diária" 
          valor={`${kpiData.meta_diaria_kwh} kWh`} 
          icone="flag" 
          corDestaque="var(--primary)" 
        />
        <KpiCard 
          titulo="Economia Acumulada" 
          valor={`R$ ${kpiData.economia_acumulada_mes_brl}`} 
          icone="savings" 
          corDestaque="var(--primary-dark)" 
        />
        <KpiCard 
          titulo="Status da Planta" 
          valor={kpiData.status_planta} 
          icone="warning" 
          corDestaque="var(--warning)" 
        />
      </div>

      {/* Área do Gráfico */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--bg-border)',
        height: '450px', // Altura fixa para o gráfico respirar
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