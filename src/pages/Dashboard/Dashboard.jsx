// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import KpiCard from '../../components/ui/KpiCard';
import { kpiData } from '../../services/mockData'; // A importar os dados falsos!

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Grelha de KPIs (Responsiva) */}
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
          titulo="Poupança Acumulada" 
          valor={`R$ ${kpiData.economia_acumulada_mes_brl}`} 
          icone="savings" 
          corDestaque="var(--primary-dark)" 
        />
        <KpiCard 
          titulo="Estado da Planta" 
          valor={kpiData.status_planta} 
          icone="warning" 
          corDestaque="var(--warning)" 
        />
      </div>

      {/* Área reservada para o Gráfico Central */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--bg-border)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '24px', fontSize: '20px' }}>
          Consumo vs Custo Diário
        </h3>
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'var(--text-muted)', 
          border: '2px dashed var(--bg-border)', 
          borderRadius: '8px' 
        }}>
          Aqui vamos instalar o Recharts e colocar o gráfico de linhas!
        </div>
      </div>

    </div>
  );
};

export default Dashboard;