// src/pages/RecomendacoesIA/RecomendacoesIA.jsx
import React from 'react';
import { iaRecommendations } from '../../services/mockData';

const RecomendacoesIA = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Cabeçalho da Secção */}
      <div>
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
        {iaRecommendations.map((rec) => (
          <div key={rec.id} style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: `1px solid ${rec.prioridade === 'Alta' ? 'var(--danger)' : 'var(--warning)'}`,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            
            {/* Topo do Cartão: Equipamento e Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ color: 'var(--text-main)', fontSize: '20px' }}>{rec.equipamento}</h3>
                  <span style={{
                    backgroundColor: rec.prioridade === 'Alta' ? 'rgba(255, 61, 61, 0.1)' : 'rgba(255, 224, 200, 0.1)',
                    color: rec.prioridade === 'Alta' ? 'var(--danger)' : 'var(--warning)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: `1px solid ${rec.prioridade === 'Alta' ? 'var(--danger)' : 'var(--warning)'}`
                  }}>
                    Prioridade {rec.prioridade}
                  </span>
                </div>
                <p style={{ color: 'var(--primary-light)', fontSize: '14px', fontWeight: '500' }}>{rec.categoria}</p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>ID: {rec.id}</span>
            </div>

            {/* Diagnóstico da IA (Explicabilidade / XAI) */}
            <div style={{ backgroundColor: 'var(--bg-main)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}><strong>Diagnóstico da IA:</strong></p>
              <p style={{ color: 'var(--text-main)', fontSize: '15px' }}>{rec.ia_diagnostico}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px', marginBottom: '4px' }}><strong>Ação Sugerida:</strong></p>
              <p style={{ color: 'var(--text-main)', fontSize: '15px' }}>{rec.acao_sugerida}</p>
            </div>

            {/* O Simulador WHAT-IF (O Diferencial do Hackathon) */}
            <div style={{ marginTop: '8px' }}>
              <h4 style={{ color: 'var(--text-main)', fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined">compare_arrows</span>
                Simulação de Cenários (What-If)
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                
                {/* Cenário 1: Aplicar (Verde/Teal) */}
                <div style={{ backgroundColor: 'rgba(74, 157, 156, 0.1)', border: '1px solid var(--primary)', padding: '16px', borderRadius: '8px' }}>
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

                {/* Cenário 2: Ignorar (Vermelho/Alerta) */}
                <div style={{ backgroundColor: 'rgba(255, 61, 61, 0.1)', border: '1px solid var(--danger)', padding: '16px', borderRadius: '8px' }}>
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

            {/* Botão de Ação */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button style={{
                backgroundColor: 'var(--primary-dark)',
                color: 'var(--text-main)',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-dark)'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>task_alt</span>
                Aprovar Recomendação
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacoesIA;