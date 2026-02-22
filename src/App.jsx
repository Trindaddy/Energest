// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import RecomendacoesIA from './pages/RecomendacoesIA/RecomendacoesIA';

function App() {
  // Estado que controla qual página está a ser exibida (começa no dashboard)
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Função simples para renderizar a página correta
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'ia':
        return <RecomendacoesIA />;
      case 'equipamentos':
        return <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: '50px' }}>Página de Equipamentos em Construção...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {/* Passamos o estado e a função para a Sidebar atualizar o menu */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          
          {/* Aqui chamamos a função que devolve o componente da página certa */}
          {renderPage()}

        </main>
      </div>
    </div>
  );
}

export default App;