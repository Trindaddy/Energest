// src/components/layout/Sidebar.jsx
import React from 'react';

// Recebemos currentPage e setCurrentPage do App.jsx
const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', nome: 'Dashboard', icone: 'dashboard' },
    { id: 'ia', nome: 'Recomendações IA', icone: 'memory' },
    { id: 'equipamentos', nome: 'Equipamentos', icone: 'conveyor_belt' },
  ];

  return (
    <aside style={{
      width: '260px', height: '100vh', backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--bg-border)', padding: '24px',
      display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)', fontSize: '32px' }}>bolt</span>
        <h2 style={{ color: 'var(--primary-light)', fontSize: '24px', fontWeight: 'bold' }}>EnerGest</h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => {
          const ativo = currentPage === item.id; // Verifica se este é o menu ativo
          return (
            <div 
              key={item.id}
              onClick={() => setCurrentPage(item.id)} // Muda a página ao clicar
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: '8px', cursor: 'pointer',
                backgroundColor: ativo ? 'var(--primary-dark)' : 'transparent',
                color: ativo ? 'var(--text-main)' : 'var(--text-muted)',
                transition: 'background 0.2s'
              }}
            >
              <span className="material-symbols-outlined">{item.icone}</span>
              <span style={{ fontSize: '15px', fontWeight: ativo ? '600' : '400' }}>{item.nome}</span>
            </div>
          )
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;