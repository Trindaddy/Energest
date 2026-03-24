// src/components/ui/KpiCard.jsx
import React from 'react';

// Clean Code: Valores default previnem erros de undefined se a API falhar ou atrasar
const KpiCard = ({ titulo = 'Indicador', valor = '-', icone = 'analytics', corDestaque = 'var(--primary-light)' }) => {
  return (
    <div className="glow-card" style={{
      background: 'linear-gradient(145deg, var(--bg-card) 0%, var(--bg-main) 100%)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid var(--bg-border)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      cursor: 'default',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}>
      {/* Círculo do Ícone com Brilho Dinâmico */}
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: '68px',
        height: '68px',
        borderRadius: '16px', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${corDestaque}`,
        boxShadow: `inset 0 0 15px ${corDestaque}33`
      }}>
        <span className="material-symbols-outlined" style={{ color: corDestaque, fontSize: '36px' }}>
          {icone}
        </span>
      </div>
      
      {/* Textos semânticos */}
      <div>
        <h4 style={{ 
          color: 'var(--text-muted)', 
          fontSize: '13px', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          marginBottom: '6px',
          fontWeight: '600' 
        }}>
          {titulo}
        </h4>
        <h3 style={{ 
          color: 'var(--text-main)', 
          fontSize: '32px', 
          fontWeight: '800', 
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          margin: 0 // Reseta margens não intencionais
        }}>
          {valor}
        </h3>
      </div>
    </div>
  );
};

export default KpiCard;