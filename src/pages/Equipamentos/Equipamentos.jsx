// src/pages/Equipamentos/Equipamentos.jsx
import React from 'react';
import { equipamentosData } from '../../services/mockData';

const Equipamentos = () => {
  
  // Função auxiliar para definir a cor do estado (Badge)
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Crítico':
        return { bg: 'rgba(255, 61, 61, 0.1)', color: 'var(--danger)', border: 'var(--danger)' };
      case 'Atenção':
        return { bg: 'rgba(255, 224, 200, 0.1)', color: 'var(--warning)', border: 'var(--warning)' };
      default:
        return { bg: 'rgba(74, 157, 156, 0.1)', color: 'var(--primary-light)', border: 'var(--primary)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Cabeçalho da Página */}
      <div>
        <h2 style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>conveyor_belt</span>
          Inventário de Equipamentos
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Monitorização de sensores, temperatura e vibração em tempo real.
        </p>
      </div>

      {/* Tabela de Equipamentos */}
      <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: '12px',
        border: '1px solid var(--bg-border)',
        overflow: 'hidden' // Garante que as bordas da tabela respeitam o arredondamento
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)', borderBottom: '1px solid var(--bg-border)' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Equipamento</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Tipo</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Estado</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Temperatura</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Vibração</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Última Manutenção</th>
            </tr>
          </thead>
          <tbody>
            {equipamentosData.map((maq, index) => {
              const estiloStatus = getStatusStyle(maq.status);
              return (
                <tr key={maq.id} style={{ 
                  borderBottom: index === equipamentosData.length - 1 ? 'none' : '1px solid var(--bg-border)',
                  color: 'var(--text-main)',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontWeight: '600' }}>{maq.nome}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>{maq.id}</div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{maq.tipo}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{
                      backgroundColor: estiloStatus.bg,
                      color: estiloStatus.color,
                      border: `1px solid ${estiloStatus.border}`,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {maq.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', color: maq.status === 'Crítico' ? 'var(--danger)' : 'var(--text-main)' }}>
                    {maq.temperatura}
                  </td>
                  <td style={{ padding: '16px 24px' }}>{maq.vibracao}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{maq.ultima_manutencao}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Equipamentos;