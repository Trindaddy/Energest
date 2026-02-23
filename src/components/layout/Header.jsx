// src/components/layout/Header.jsx
import React, { useState } from 'react';

const Header = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificacoes = [
    { id: 1, texto: 'Anomalia detectada: Motor Principal (Temperatura alta).', tipo: 'critico', tempo: 'Agora mesmo' },
    { id: 2, texto: 'Recomendação aplicada: Redução de carga bem-sucedida.', tipo: 'info', tempo: 'Há 2 horas' },
    { id: 3, texto: 'Economia de R$ 120,50 atingida neste turno.', tipo: 'sucesso', tempo: 'Há 5 horas' }
  ];

  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 32px', backgroundColor: 'var(--bg-main)',
      borderBottom: '1px solid var(--bg-border)', position: 'relative', zIndex: 50
    }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Visão Geral da Planta
        </h1>
        <p style={{ color: 'var(--primary)', fontSize: '14px', marginTop: '4px' }}>
          Monitoramento ativo por Inteligência Artificial
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        
        {/* SINO DE NOTIFICAÇÕES */}
        <div style={{ position: 'relative' }}>
          <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}>
            <span className="material-symbols-outlined" style={{ color: showNotif ? 'var(--primary-light)' : 'var(--text-muted)', fontSize: '28px', transition: '0.2s' }}>
              notifications
            </span>
            <span style={{
              position: 'absolute', top: '0', right: '2px', width: '10px', height: '10px',
              backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--bg-main)'
            }}></span>
          </div>

          {showNotif && (
            <div className="dropdown-menu animate-fade-in" style={{
              position: 'absolute', top: '45px', right: '-10px', width: '320px',
              borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px'
            }}>
              <h4 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--bg-border)', paddingBottom: '12px', marginBottom: '8px', fontSize: '15px' }}>Alertas Recentes</h4>
              {notificacoes.map(notif => (
                <div key={notif.id} className="dropdown-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px', cursor: 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ color: notif.tipo === 'critico' ? 'var(--danger)' : notif.tipo === 'sucesso' ? 'var(--primary-light)' : 'var(--primary)', fontSize: '20px' }}>
                    {notif.tipo === 'critico' ? 'warning' : notif.tipo === 'sucesso' ? 'savings' : 'info'}
                  </span>
                  <div>
                    <p style={{ color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.4', marginBottom: '4px' }}>{notif.texto}</p>
                    <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{notif.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PERFIL */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '600' }}>Gestor Industrial</div>
              <div style={{ color: 'var(--primary)', fontSize: '12px' }}>Admin</div>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--primary-light)' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>person</span>
            </div>
          </div>

          {showProfile && (
            <div className="dropdown-menu animate-fade-in" style={{
              position: 'absolute', top: '55px', right: '0', width: '200px', borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column'
            }}>
              <div className="dropdown-item" style={{ padding: '12px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span> Configurações
              </div>
              <div className="dropdown-item" style={{ padding: '12px', color: 'var(--danger)', cursor: 'pointer', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span> Sair
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;