// src/App.jsx
import React from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard'; // Importamos a página aqui

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          
          {/* Agora inserimos diretamente o componente Dashboard */}
          <Dashboard />

        </main>
      </div>
    </div>
  );
}

export default App;