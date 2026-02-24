// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import RecomendacoesIA from './pages/RecomendacoesIA/RecomendacoesIA';
import Equipamentos from './pages/Equipamentos/Equipamentos';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true); // Começa carregando a aplicação

  // Simula o tempo de rede inicial
  useEffect(() => {
    setTimeout(() => { setIsLoading(false); }, 800);
  }, []);

  // Função que intercepta o clique no menu para simular o carregamento
  const handlePageChange = (pageId) => {
    if (pageId === currentPage) return; // Não faz nada se clicar na mesma aba
    setIsLoading(true); // Liga o spinner
    setCurrentPage(pageId); // Muda a rota por trás
    
    // Desliga o spinner após 500ms simulando a busca na API
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const renderPage = () => {
    // Se estiver carregando, mostra o Skeleton/Spinner global
    if (isLoading) {
      return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div className="spinner"></div>
          <p className="animate-pulse" style={{ color: 'var(--primary)', marginTop: '20px', fontSize: '16px', fontWeight: '500' }}>
            {currentPage === 'ia' ? 'Analisando dados com Motor de IA...' : 'Sincronizando com a planta...'}
          </p>
        </div>
      );
    }

    // Se não estiver carregando, mostra a página normal
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'ia': return <RecomendacoesIA />;
      case 'equipamentos': return <Equipamentos />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      
      {/* Passamos o handlePageChange em vez do setCurrentPage direto */}
      <Sidebar currentPage={currentPage} setCurrentPage={handlePageChange} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {renderPage()}
        </main>
      </div>
      
    </div>
  );
}

export default App;