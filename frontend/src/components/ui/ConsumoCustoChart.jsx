// src/components/ui/ConsumoCustoChart.jsx
import React from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend 
} from 'recharts';

// Clean Architecture: Componente Burro (Dumb Component). 
// Ele não busca dados, apenas recebe "data" via props e os renderiza.
const ConsumoCustoChart = ({ data }) => {
  
  // Tratamento de Erro Defensivo
  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '350px', color: 'var(--text-muted)' }}>
        <span className="material-symbols-outlined" style={{ marginRight: '8px' }}>monitoring</span>
        Aguardando telemetria...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '350px' }}>
      {/* minWidth={0} minHeight={0} resolve os alertas do Recharts na árvore DOM */}
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#354656" vertical={false} />
          <XAxis dataKey="hora" stroke="#e0e0e0" tick={{ fill: '#e0e0e0' }} />
          <YAxis yAxisId="left" stroke="#afffff" tick={{ fill: '#afffff' }} />
          <YAxis yAxisId="right" orientation="right" stroke="#FF3D3D" tick={{ fill: '#FF3D3D' }} />
          
          <Tooltip 
            contentStyle={{ backgroundColor: '#1d2e3d', borderColor: '#354656', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="consumo_kwh" 
            name="Consumo (kWh)"
            stroke="#afffff" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#0D1F2D', stroke: '#afffff', strokeWidth: 2 }} 
            activeDot={{ r: 6, fill: '#afffff' }} 
          />
          
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="custo_brl" 
            name="Custo (R$)"
            stroke="#FF3D3D" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#0D1F2D', stroke: '#FF3D3D', strokeWidth: 2 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConsumoCustoChart;