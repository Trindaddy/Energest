// src/components/layout/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 32px',
      backgroundColor: 'var(--bg-main)',
      borderBottom: '1px solid var(--bg-border)'
    }}>
      {/* Título da secção atual */}
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-main)', marginBottom: '4px' }}>
          Visão Geral da Planta
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Monitorização em tempo real e análises preditivas
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Ícone de Notificações com alerta ativo */}
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--text-muted)', fontSize: '28px' }}>
            notifications
          </span>
          {/* Ponto vermelho indicando que a IA detetou algo */}
          <span style={{
            position: 'absolute',
            top: '0',
            right: '2px',
            width: '10px',
            height: '10px',
            backgroundColor: 'var(--danger)',
            borderRadius: '50%',
            border: '2px solid var(--bg-main)'
          }}></span>
        </div>

        {/* Bloco de Perfil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '500' }}>Gestor Industrial</div>
            <div style={{ color: 'var(--primary)', fontSize: '12px' }}>Administrador</div>
          </div>
          {/* Avatar Circular */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--primary-dark)'
          }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;