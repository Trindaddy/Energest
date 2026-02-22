// src/components/ui/KpiCard.jsx
import React from 'react';

const KpiCard = ({ titulo, valor, icone, corDestaque }) => {
  return (
    <div style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid var(--bg-border)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)' // Dá uma ligeira profundidade
    }}>
      {/* Círculo com o ícone */}
      <div style={{
        backgroundColor: 'var(--bg-main)',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${corDestaque}`
      }}>
        <span className="material-symbols-outlined" style={{ color: corDestaque, fontSize: '32px' }}>
          {icone}
        </span>
      </div>
      
      {/* Texto e Valor */}
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
          {titulo}
        </p>
        <h3 style={{ color: 'var(--text-main)', fontSize: '28px', fontWeight: 'bold' }}>
          {valor}
        </h3>
      </div>
    </div>
  );
};

export default KpiCard;