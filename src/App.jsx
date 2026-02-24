// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import RecomendacoesIA from './pages/RecomendacoesIA/RecomendacoesIA';
import Equipamentos from './pages/Equipamentos/Equipamentos';
import Login from './pages/Login/Login'; // <-- Novo import

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Começa deslogado
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  // Função para fazer Logout (Sair)
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard'); // Reseta a página para quando voltar
  };

  const handlePageChange = (pageId) => {
    if (pageId === currentPage) return; 
    setIsLoading(true); 
    setCurrentPage(pageId); 
    setTimeout(() => { setIsLoading(false); }, 500);
  };

  // Se não estiver autenticado, trava na tela de Login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    if (isLoading) {
      return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className="spinner"></div>
          <p className="animate-pulse" style={{ color: 'var(--primary)', marginTop: '20px', fontSize: '16px', fontWeight: '500' }}>Sincronizando...</p>
        </div>
      );
    }
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'ia': return <RecomendacoesIA />;
      case 'equipamentos': return <Equipamentos />;
      // A tela de configurações será implementada na Fase 3, por enquanto cai no default
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      {/* Passamos o handleLogout para a Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={handlePageChange} onLogout={handleLogout} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Passamos o handleLogout para o Header também */}
        <Header onLogout={handleLogout} onOpenConfig={() => handlePageChange('configuracoes')} />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;