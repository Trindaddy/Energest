// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import RecomendacoesIA from './pages/RecomendacoesIA/RecomendacoesIA';
import Equipamentos from './pages/Equipamentos/Equipamentos';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'ia': return <RecomendacoesIA />;
      case 'equipamentos': return <Equipamentos />;
      default: return <Dashboard />;
    }
  };

  return (
    // Removido o 100vw que causava scroll lateral e adicionado overflow: hidden geral
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        
        {/* Agora APENAS esta área rola para baixo (overflowY: auto) e sem scroll lateral */}
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {renderPage()}
        </main>
      </div>
      
    </div>
  );
}

export default App;