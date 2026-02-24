// src/pages/RecomendacoesIA/RecomendacoesIA.jsx
import React, { useState } from 'react';
import { iaRecommendations } from '../../services/mockData';

const RecomendacoesIA = () => {
  // Estado para controlar o botão de cada card individualmente
  const [statusCards, setStatusCards] = useState({});
  // Estado para controlar a notificação flutuante (Toast)
  const [toastMsg, setToastMsg] = useState(null);

  // Função que simula a requisição para a API da sua amiga
  const handleAprovar = (id, equipamento) => {
    // 1. Muda o botão clicado para "Carregando"
    setStatusCards(prev => ({ ...prev, [id]: 'loading' }));

    // 2. Simula um atraso de 1 segundo (tempo de ir no banco e voltar)
    setTimeout(() => {
      // 3. Muda o botão para "Sucesso"
      setStatusCards(prev => ({ ...prev, [id]: 'success' }));
      // 4. Mostra o aviso na tela com o nome da máquina
      setToastMsg(`✅ Comando de ajuste enviado para: ${equipamento}`);

      // 5. Some com o aviso após 3.5 segundos
      setTimeout(() => {
        setToastMsg(null);
      }, 3500);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
      
      {/* Cabeçalho da Secção */}
      <div className="animate-fade-in">
        <h2 style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>auto_awesome</span>
          Central de Ações Preditivas (What-If)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Análise de impacto financeiro e recomendações geradas pelo motor de IA.
        </p>
      </div>

      {/* Lista de Recomendações */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {iaRecommendations.map((rec, index) => {
          // Pegamos o status atual deste card específico
          const statusAtual = statusCards[rec.id] || 'idle';

          return (
            <div key={rec.id} className={`animate-fade-in delay-${index + 1}`} style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: '12px',
              border: `1px solid ${rec.prioridade === 'Alta' ? 'var(--danger)' : 'var(--warning)'}`,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'all 0.3s ease',
              // Se foi aprovado, a borda do card fica verde suave
              borderColor: statusAtual === 'success' ? '#10B981' : undefined
            }}>
              
              {/* Topo do Cartão */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ color: 'var(--text-main)', fontSize: '20px' }}>{rec.equipamento}</h3>
                    {statusAtual === 'success' ? (
                      <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #10B981' }}>
                        Resolvido
                      </span>
                    ) : (
                      <span style={{ backgroundColor: rec.prioridade === 'Alta' ? 'rgba(255, 61, 61, 0.1)' : 'rgba(255, 224, 200, 0.1)', color: rec.prioridade === 'Alta' ? 'var(--danger)' : 'var(--warning)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', border: `1px solid ${rec.prioridade === 'Alta' ? 'var(--danger)' : 'var(--warning)'}` }}>
                        Prioridade {rec.prioridade}
                      </span>
                    )}
                  </div>
                  <p style={{ color: 'var(--primary-light)', fontSize: '14px', fontWeight: '500' }}>{rec.categoria}</p>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ID: {rec.id}</span>
              </div>

              {/* Diagnóstico da IA */}
              <div style={{ backgroundColor: 'var(--bg-main)', padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${statusAtual === 'success' ? '#10B981' : 'var(--primary)'}` }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}><strong>Diagnóstico da IA:</strong></p>
                <p style={{ color: 'var(--text-main)', fontSize: '15px' }}>{rec.ia_diagnostico}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px', marginBottom: '4px' }}><strong>Ação Sugerida:</strong></p>
                <p style={{ color: 'var(--text-main)', fontSize: '15px' }}>{rec.acao_sugerida}</p>
              </div>

              {/* Simulador WHAT-IF (Responsivo) */}
              <div style={{ marginTop: '8px' }}>
                <h4 style={{ color: 'var(--text-main)', fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="material-symbols-outlined">compare_arrows</span>
                  Simulação de Cenários (What-If)
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {/* Cenário 1: Aplicar */}
                  <div style={{ backgroundColor: 'rgba(74, 157, 156, 0.1)', border: '1px solid var(--primary)', padding: '16px', borderRadius: '8px', opacity: statusAtual === 'success' ? 1 : 0.8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--primary-light)' }}>
                      <span className="material-symbols-outlined">check_circle</span>
                      <strong>Se Aplicar a Ação</strong>
                    </div>
                    {rec.what_if.aplicar_custo ? (
                      <p style={{ color: 'var(--text-main)' }}>Custo Estimado: <strong style={{ color: 'var(--primary-light)' }}>R$ {rec.what_if.aplicar_custo}</strong></p>
                    ) : (
                      <p style={{ color: 'var(--text-main)' }}>Economia Diária: <strong style={{ color: 'var(--primary-light)' }}>R$ {rec.what_if.aplicar_economia}</strong></p>
                    )}
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>Operação normalizada. Risco mitigado.</p>
                  </div>

                  {/* Cenário 2: Ignorar (Fica opaco se já foi resolvido) */}
                  <div style={{ backgroundColor: 'rgba(255, 61, 61, 0.1)', border: '1px solid var(--danger)', padding: '16px', borderRadius: '8px', opacity: statusAtual === 'success' ? 0.3 : 1, transition: 'opacity 0.5s' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--danger)' }}>
                      <span className="material-symbols-outlined">warning</span>
                      <strong>Se Ignorar o Alerta</strong>
                    </div>
                    {rec.what_if.ignorar_custo ? (
                      <p style={{ color: 'var(--text-main)' }}>Risco Financeiro: <strong style={{ color: 'var(--danger)' }}>R$ {rec.what_if.ignorar_custo}</strong></p>
                    ) : (
                      <p style={{ color: 'var(--text-main)' }}>Desperdício Mensal: <strong style={{ color: 'var(--danger)' }}>R$ {rec.what_if.ignorar_desperdicio}</strong></p>
                    )}
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>Probabilidade de Falha/Risco: <strong>{rec.what_if.risco_ignorar}</strong></p>
                  </div>
                </div>
              </div>

              {/* Botão Dinâmico de Ação */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button 
                  onClick={() => handleAprovar(rec.id, rec.equipamento)}
                  disabled={statusAtual !== 'idle'} // Desabilita se estiver carregando ou já sucesso
                  style={{
                    backgroundColor: statusAtual === 'success' ? 'rgba(16, 185, 129, 0.2)' : statusAtual === 'loading' ? 'var(--bg-border)' : 'var(--primary-dark)',
                    color: statusAtual === 'success' ? '#10B981' : 'var(--text-main)',
                    border: statusAtual === 'success' ? '1px solid #10B981' : '1px solid transparent',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: statusAtual !== 'idle' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {statusAtual === 'idle' && <><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>task_alt</span> Aprovar Recomendação</>}
                  {statusAtual === 'loading' && <><span className="material-symbols-outlined" style={{ fontSize: '20px', animation: 'spin 1s linear infinite' }}>sync</span> Processando...</>}
                  {statusAtual === 'success' && <><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>done_all</span> Ação Aplicada</>}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* COMPONENTE TOAST (Notificação Flutuante de Sucesso) */}
      {toastMsg && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          backgroundColor: '#10B981', // Verde esmeralda de sucesso
          color: '#ffffff',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 9999,
          fontWeight: '500'
        }}>
          <span className="material-symbols-outlined">send</span>
          {toastMsg}
        </div>
      )}

      {/* CSS inline apenas para a animação do ícone girando */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

    </div>
  );
};

export default RecomendacoesIA;