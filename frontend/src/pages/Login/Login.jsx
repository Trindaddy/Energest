// src/pages/Login/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEntrar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula o tempo de verificação no banco de dados
    setTimeout(() => {
      setIsLoading(false);
      onLogin(); // Chama a função para liberar o acesso ao sistema
    }, 1200);
  };

  return (
    <div style={{
      height: '100vh', width: '100vw', backgroundColor: 'var(--bg-main)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Efeito de luz de fundo para dar um toque "Energia" */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%', width: '50%', height: '50%',
        background: 'radial-gradient(circle, rgba(74, 157, 156, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)'
      }}></div>

      <div className="animate-fade-in" style={{
        backgroundColor: 'var(--bg-card)', padding: '48px', borderRadius: '16px',
        border: '1px solid var(--bg-border)', width: '100%', maxWidth: '420px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 1
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(74, 157, 156, 0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)', marginBottom: '16px'
          }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)', fontSize: '36px' }}>bolt</span>
          </div>
          <h1 style={{ color: 'var(--text-main)', fontSize: '28px', fontWeight: '800' }}>EnerGest</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>Plataforma de IA Industrial</p>
        </div>

        <form onSubmit={handleEntrar} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Email Corporativo</label>
            <input type="email" defaultValue="gestor@industria.com" required style={{
              width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '15px', outline: 'none'
            }} />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px', fontWeight: '500' }}>Senha de Acesso</label>
            <input type="password" defaultValue="123456" required style={{
              width: '100%', padding: '14px', borderRadius: '8px', backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '15px', outline: 'none'
            }} />
          </div>
          
          <button type="submit" disabled={isLoading} style={{
            marginTop: '12px', padding: '14px', borderRadius: '8px',
            background: isLoading ? 'var(--bg-border)' : 'linear-gradient(90deg, var(--primary-dark) 0%, var(--primary) 100%)',
            color: 'var(--text-main)', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s',
            boxShadow: isLoading ? 'none' : '0 10px 20px -10px var(--primary)'
          }}>
            {isLoading ? <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span> : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;