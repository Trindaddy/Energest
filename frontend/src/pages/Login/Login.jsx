// src/pages/Login/Login.jsx
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEntrar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'var(--bg-main)', overflow: 'hidden' }}>
      
      {/* LADO ESQUERDO: Branding e Value Proposition */}
      <div style={{ 
        flex: 1, 
        position: 'relative', 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '64px',
        background: 'linear-gradient(135deg, var(--bg-main) 0%, var(--primary-dark) 100%)',
        overflow: 'hidden'
      }} className="hide-mobile">
        {/* Efeitos decorativos ao fundo */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.3, borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', background: '#10B981', filter: 'blur(120px)', opacity: 0.2, borderRadius: '50%' }}></div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '500px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
              <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '32px' }}>bolt</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', letterSpacing: '-1px' }}>EnerGest.</h1>
          </div>
          
          <h2 style={{ color: '#fff', fontSize: '42px', fontWeight: '700', lineHeight: '1.2', marginBottom: '24px' }}>
            Inteligência Artificial para o chão de fábrica.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: '1.6' }}>
            Transforme dados em decisões. Monitore, preveja falhas e reduza custos operacionais em tempo real com o nosso motor preditivo avançado.
          </p>
        </div>
      </div>

      {/* LADO DIREITO: Formulário de Login Minimalista */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'var(--bg-main)',
        padding: '32px'
      }}>
        <div className="animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
          
          {/* Logo mobile */}
          <div className="show-mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', justifyContent: 'center' }}>
             <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)', fontSize: '36px' }}>bolt</span>
             <h1 style={{ color: 'var(--text-main)', fontSize: '28px', fontWeight: '800' }}>EnerGest</h1>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ color: 'var(--text-main)', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Bem-vindo de volta</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Insira suas credenciais para acessar a planta.</p>
          </div>

          <form onSubmit={handleEntrar} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-main)', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>Email Corporativo</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)', fontSize: '20px' }}>mail</span>
                <input type="email" defaultValue="gestor@industria.com" required style={{
                  width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ color: 'var(--text-main)', fontSize: '13px', fontWeight: '600' }}>Senha de Acesso</label>
                <span style={{ color: 'var(--primary)', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}>Esqueceu a senha?</span>
              </div>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)', fontSize: '20px' }}>lock</span>
                <input type="password" defaultValue="123456" required style={{
                  width: '100%', padding: '14px 14px 14px 48px', borderRadius: '12px', backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '15px', outline: 'none', transition: 'all 0.3s'
                }} 
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'}
                />
              </div>
            </div>
            
            <button type="submit" disabled={isLoading} style={{
              marginTop: '8px', padding: '16px', borderRadius: '12px',
              backgroundColor: isLoading ? 'var(--bg-border)' : 'var(--text-main)',
              color: isLoading ? 'var(--text-muted)' : 'var(--bg-main)', 
              fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s',
              boxShadow: isLoading ? 'none' : '0 8px 20px rgba(255,255,255,0.1)'
            }}>
              {isLoading ? <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span> : 'Acessar Painel'}
              {!isLoading && <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 899px) { .hide-mobile { display: none !important; } }
        @media (min-width: 900px) { .show-mobile-only { display: none !important; } }
      `}</style>
    </div>
  );
};

export default Login;