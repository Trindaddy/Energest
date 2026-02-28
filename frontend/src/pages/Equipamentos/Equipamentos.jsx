// src/pages/Equipamentos/Equipamentos.jsx
import React, { useState, useEffect } from 'react';
import { getEquipamentosReais } from '../../services/api';

const Equipamentos = () => {
  const [busca, setBusca] = useState('');
  const [equipamentos, setEquipamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados da API real quando a página carrega
  useEffect(() => {
    const fetchDados = async () => {
      setIsLoading(true);
      const dadosReais = await getEquipamentosReais();
      setEquipamentos(dadosReais || []); // Garante que seja um array mesmo se der erro
      setIsLoading(false);
    };
    fetchDados();
  }, []);

  // Filtro de Busca Inteligente
  const equipamentosFiltrados = equipamentos.filter((maq) => 
    maq?.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    maq?.id?.toLowerCase().includes(busca.toLowerCase())
  );

  // Sistema de Cores Dinâmico para o Status Real
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Atenção': 
        return { bg: 'rgba(255, 61, 61, 0.1)', color: 'var(--danger)', border: 'var(--danger)' };
      case 'Operacional': 
        return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '#10B981' };
      default: 
        return { bg: 'rgba(74, 157, 156, 0.1)', color: 'var(--primary-light)', border: 'var(--primary)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Cabeçalho com Barra de Pesquisa */}
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>conveyor_belt</span>
            Inventário de Equipamentos (Ao Vivo)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
            Dados sincronizados em tempo real com o motor de Machine Learning.
          </p>
        </div>
        
        {/* Componente de Busca (Funcional) */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
          <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }}>search</span>
          <input 
            type="text" 
            placeholder="Buscar por nome ou ID..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ 
              width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', 
              backgroundColor: 'var(--bg-card)', border: '1px solid var(--bg-border)', 
              color: 'var(--text-main)', fontSize: '14px', outline: 'none', transition: '0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'}
          />
        </div>
      </div>

      {/* Tabela de Dados Reais */}
      <div className="animate-fade-in delay-1" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--bg-border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)', borderBottom: '1px solid var(--bg-border)' }}>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Equipamento</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Estado</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Temperatura</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Carga Aplicada</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Horas Operação</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Idade (Anos)</th>
            </tr>
          </thead>
          
          <tbody>
            {isLoading ? (
            <tr>
              <td colSpan="6" style={{ padding: '48px', textAlign: 'center', color: 'var(--primary)' }}>
                <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite', fontSize: '36px' }}>sync</span>
                <p style={{ marginTop: '12px', fontWeight: '500' }}>Sincronizando telemetria com a API FastAPI...</p>
              </td>
            </tr>
          ) : equipamentosFiltrados.length > 0 ? (
            equipamentosFiltrados.map((maq, index) => {
                const estiloStatus = getStatusStyle(maq.status);
                
                // Formatação segura dos números reais vindos do Python
                const temp = maq.temperature ? maq.temperature.toFixed(1) + ' °C' : '--';
                const carga = maq.load_percentage ? maq.load_percentage.toFixed(1) + '%' : '--';
                const horas = maq.operating_hours ? Math.floor(maq.operating_hours) + 'h' : '--';
                const idade = maq.machine_age_years ? maq.machine_age_years.toFixed(1) : '--';

                return (
                  <tr key={maq.id} style={{ borderBottom: index === equipamentosFiltrados.length - 1 ? 'none' : '1px solid var(--bg-border)', color: 'var(--text-main)', transition: '0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: '600' }}>{maq.nome}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>{maq.id}</div>
                    </td>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ backgroundColor: estiloStatus.bg, color: estiloStatus.color, border: `1px solid ${estiloStatus.border}`, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                        {maq.status}
                      </span>
                    </td>
                    
                    <td style={{ padding: '16px 24px', color: maq.status === 'Atenção' ? 'var(--danger)' : 'var(--text-main)', fontWeight: maq.status === 'Atenção' ? 'bold' : 'normal' }}>
                      {temp}
                    </td>
                    
                    <td style={{ padding: '16px 24px' }}>{carga}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{horas}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{idade}</td>
                  
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Nenhum equipamento encontrado na base de dados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Equipamentos;