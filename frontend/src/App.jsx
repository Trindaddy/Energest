// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import RecomendacoesIA from './pages/RecomendacoesIA/RecomendacoesIA';
import Equipamentos from './pages/Equipamentos/Equipamentos';
import Login from './pages/Login/Login';

function App() {
  // Clean Architecture: Controle de Autenticação do Usuário
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Se não estiver logado, trava o usuário na tela de Login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'ia': return <RecomendacoesIA />;
      case 'equipamentos': return <Equipamentos />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
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