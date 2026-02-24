// src/components/layout/Header.jsx
import React, { useState, useEffect, useRef } from 'react';

const Header = ({ onLogout, onOpenConfig }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  // Ref para fechar os menus ao clicar fora (UX refinada)
  const headerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setShowNotif(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notificacoes = [
    { id: 1, texto: 'Anomalia detectada: Motor Principal (Temperatura alta).', tipo: 'critico', tempo: 'Há 5 min' },
    { id: 2, texto: 'Recomendação aplicada: Redução de carga.', tipo: 'info', tempo: 'Há 2 horas' },
    { id: 3, texto: 'Economia de R$ 120,50 atingida neste turno.', tipo: 'sucesso', tempo: 'Há 5 horas' }
  ];

  return (
    <header ref={headerRef} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 32px', backgroundColor: 'var(--bg-main)',
      borderBottom: '1px solid var(--bg-border)', position: 'relative', zIndex: 50
    }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-main)' }}>Visão Geral</h1>
        <p style={{ color: 'var(--primary)', fontSize: '14px', marginTop: '4px' }}>Monitoramento ativo por IA</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* === NOTIFICAÇÕES REFINADAS === */}
        <div style={{ position: 'relative' }}>
          <div 
            style={{ 
              cursor: 'pointer', position: 'relative', width: '40px', height: '40px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: showNotif ? 'var(--bg-card)' : 'transparent', borderRadius: '50%', transition: '0.2s'
            }} 
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
          >
            <span className="material-symbols-outlined" style={{ color: showNotif ? 'var(--primary-light)' : 'var(--text-muted)' }}>notifications</span>
            <span style={{ position: 'absolute', top: '6px', right: '8px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }}></span>
          </div>

          {showNotif && (
            <div className="dropdown-menu animate-fade-in" style={{
              position: 'absolute', top: '50px', right: '-10px', width: '340px',
              borderRadius: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}>
              <div style={{ padding: '16px', borderBottom: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ color: 'var(--text-main)', fontSize: '15px' }}>Notificações</h4>
                <span style={{ fontSize: '12px', color: 'var(--primary)', cursor: 'pointer' }}>Marcar lidas</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '300px', overflowY: 'auto' }}>
                {notificacoes.map(notif => (
                  <div key={notif.id} className="dropdown-item" style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid var(--bg-main)', cursor: 'pointer' }}>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      backgroundColor: notif.tipo === 'critico' ? 'rgba(255, 61, 61, 0.1)' : notif.tipo === 'sucesso' ? 'rgba(175, 255, 255, 0.1)' : 'rgba(74, 157, 156, 0.1)'
                    }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: notif.tipo === 'critico' ? 'var(--danger)' : notif.tipo === 'sucesso' ? 'var(--primary-light)' : 'var(--primary)' }}>
                        {notif.tipo === 'critico' ? 'warning' : notif.tipo === 'sucesso' ? 'savings' : 'info'}
                      </span>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-main)', fontSize: '13px', lineHeight: '1.4', marginBottom: '4px' }}>{notif.texto}</p>
                      <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{notif.tempo}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px', textAlign: 'center', backgroundColor: 'var(--bg-card)', cursor: 'pointer', color: 'var(--primary-light)', fontSize: '13px', fontWeight: '600' }}>
                Ver histórico completo
              </div>
            </div>
          )}
        </div>

        {/* Divisor Visual */}
        <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--bg-border)' }}></div>

        {/* === PERFIL REFINADO === */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '4px 8px', borderRadius: '30px', backgroundColor: showProfile ? 'var(--bg-card)' : 'transparent', transition: '0.2s' }} 
               onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}>
            <div className="hide-mobile" style={{ textAlign: 'right' }}>
              <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '600' }}>Eng. Silva</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Administrador</div>
            </div>
            {/* Avatar com Iniciais */}
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '16px', border: '2px solid var(--primary-light)' }}>
              ES
            </div>
            <span className="material-symbols-outlined hide-mobile" style={{ color: 'var(--text-muted)', fontSize: '20px' }}>expand_more</span>
          </div>

          {showProfile && (
            <div className="dropdown-menu animate-fade-in" style={{
              position: 'absolute', top: '55px', right: '0', width: '220px', borderRadius: '12px', overflow: 'hidden'
            }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>ES</div>
                 <div>
                    <div style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: '600' }}>Eng. Silva</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>silva@energest.com</div>
                 </div>
              </div>
              <div style={{ padding: '8px' }}>
                <div className="dropdown-item" onClick={onOpenConfig} style={{ padding: '10px 12px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--text-muted)' }}>settings</span> Configurações da Planta
                </div>
                <div className="dropdown-item" style={{ padding: '10px 12px', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--text-muted)' }}>support_agent</span> Suporte Técnico
                </div>
              </div>
              <div style={{ padding: '8px', borderTop: '1px solid var(--bg-border)' }}>
                <div className="dropdown-item" onClick={onLogout} style={{ padding: '10px 12px', color: 'var(--danger)', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', fontWeight: '500' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span> Encerrar Sessão
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;