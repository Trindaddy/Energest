// src/components/layout/Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { nome: 'Dashboard', icone: 'dashboard', ativo: true },
    { nome: 'Recomendações IA', icone: 'memory', ativo: false },
    { nome: 'Equipamentos', icone: 'conveyor_belt', ativo: false },
    { nome: 'Configurações', icone: 'settings', ativo: false },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--bg-border)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)', fontSize: '32px' }}>
          bolt
        </span>
        <h2 style={{ color: 'var(--primary-light)', fontSize: '24px', fontWeight: 'bold' }}>EnerGest</h2>
      </div>

      {/* Links do Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item, index) => (
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: item.ativo ? 'var(--primary-dark)' : 'transparent',
              color: item.ativo ? 'var(--text-main)' : 'var(--text-muted)',
              transition: 'background 0.2s'
            }}
          >
            <span className="material-symbols-outlined">{item.icone}</span>
            <span style={{ fontSize: '15px', fontWeight: item.ativo ? '600' : '400' }}>
              {item.nome}
            </span>
          </div>
        ))}
      </nav>

      {/* Botão de Logout no fundo */}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--danger)', cursor: 'pointer', padding: '12px 16px' }}>
        <span className="material-symbols-outlined">logout</span>
        <span style={{ fontWeight: '500' }}>Sair do Sistema</span>
      </div>
    </aside>
  );
};

export default Sidebar;