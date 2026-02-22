import React from 'react';
import './index.css';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar Lateral */}
      <aside style={{ 
        width: '250px', 
        backgroundColor: 'var(--bg-card)', 
        borderRight: '1px solid var(--bg-border)',
        padding: '20px'
      }}>
        <h2 style={{ color: 'var(--color-primary-light)', marginBottom: '30px' }}>⚡ EnerGest</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>📊 Dashboard</a>
          <a href="#" style={{ color: 'var(--color-warning)', textDecoration: 'none' }}>🧠 Recomendações IA</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>⚙️ Equipamentos</a>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main style={{ flex: 1, padding: '30px' }}>
        <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between' }}>
          <h1>Visão Geral da Planta</h1>
          <div style={{ color: 'var(--color-primary-light)' }}>Olá, Gestor</div>
        </header>
        
        {/* Aqui entrarão os Cards e Gráficos */}
        <div style={{ 
          border: '2px dashed var(--bg-border)', 
          height: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-muted)'
        }}>
          Área de trabalho: Vamos colocar os KPIs e o Gráfico aqui!
        </div>

      </main>
    </div>
  );
}

export default App;