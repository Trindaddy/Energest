// src/components/layout/Sidebar.jsx
import React from 'react';

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
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
    }}>
      
      {/* TOPO: Logo e Navegação */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)', fontSize: '32px' }}>bolt</span>
          <h2 style={{ color: 'var(--primary-light)', fontSize: '24px', fontWeight: 'bold', letterSpacing: '0.5px', margin: 0 }}>EnerGest</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => {
            const ativo = currentPage === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                  borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: ativo ? 'var(--primary-dark)' : 'transparent',
                  color: ativo ? 'var(--text-main)' : 'var(--text-muted)',
                  borderLeft: ativo ? '4px solid var(--primary-light)' : '4px solid transparent',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseOver={(e) => !ativo && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
                onMouseOut={(e) => !ativo && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span className="material-symbols-outlined">{item.icone}</span>
                <span style={{ fontSize: '15px', fontWeight: ativo ? '600' : '400' }}>{item.nome}</span>
              </div>
            )
          })}
        </nav>
      </div>

      {/* RODAPÉ: Status Corporativo do Sistema */}
      <div style={{ 
        padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.2)', 
        border: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', gap: '12px' 
      }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%', position: 'absolute' }}></span>
          <span style={{ width: '16px', height: '16px', backgroundColor: '#10B981', borderRadius: '50%', opacity: '0.4', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></span>
        </div>
        <div>
          <p style={{ color: 'var(--text-main)', fontSize: '12px', fontWeight: '600', margin: 0 }}>FastAPI Conectada</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', margin: 0, marginTop: '2px' }}>Build v1.0.0</p>
        </div>
        
        {/* Animação CSS inline para o ping (Pulsar) do botão verde */}
        <style>{`
          @keyframes ping {
            75%, 100% { transform: scale(2.5); opacity: 0; }
          }
        `}</style>
      </div>

    </aside>
  );
};

export default Sidebar;