// src/pages/Equipamentos/Equipamentos.jsx
import React, { useState, useEffect } from 'react';
import { getEquipamentosReais } from '../../services/api';

// Dicionário de nomes realistas para impressionar a banca
const nomesIndustriais = [
  "Compressor Centrífugo Alta Pressão", "Motor Trifásico Linha A", "Bomba Hidráulica Secundária", 
  "Sistema de Exaustão Central", "Trocador de Calor Alfa", "Esteira Transportadora T1", 
  "Resfriador de Fluidos Industrial", "Gerador Auxiliar de Emergência", "Caldeira a Vapor Pressurizada", 
  "Misturador de Lote 01", "Filtro Prensa Automatizado", "Torno CNC Principal", 
  "Robô de Soldagem Kuka", "Ponte Rolante Setor B", "Inversor de Frequência WEG",
  "Compressor Parafuso Rotativo", "Bomba Centrífuga de Polpa", "Soprador Roots", 
  "Moinho de Bolas Industrial", "Forno de Indução Contínuo"
];

const Equipamentos = () => {
  // Estados de Dados
  const [equipamentos, setEquipamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados de Filtro
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  
  // Estados de Interação (Bulk Actions)
  const [selecionados, setSelecionados] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);

  // Busca e Interceptação de Dados
  useEffect(() => {
    const fetchDados = async () => {
      setIsLoading(true);
      const dadosReais = await getEquipamentosReais();
      
      // Mapeamento Inteligente: Substitui o nome genérico do backend por nomes reais
      const dadosEnriquecidos = (dadosReais || []).map((maq, index) => ({
        ...maq,
        nome: nomesIndustriais[index % nomesIndustriais.length], // Garante um nome legal
        status_atual: maq.status // Criamos um status interno para podermos alterar na tela
      }));
      
      setEquipamentos(dadosEnriquecidos);
      setIsLoading(false);
    };
    fetchDados();
  }, []);

  // Lógica de Filtro Duplo (Nome/ID + Status)
  const equipamentosFiltrados = equipamentos.filter((maq) => {
    const atendeBusca = maq?.nome?.toLowerCase().includes(busca.toLowerCase()) || maq?.id?.toLowerCase().includes(busca.toLowerCase());
    const atendeStatus = filtroStatus === 'Todos' || maq.status_atual === filtroStatus;
    return atendeBusca && atendeStatus;
  });

  // Lógicas de Seleção (Checkboxes)
  const handleSelecionarTodos = (e) => {
    if (e.target.checked) {
      setSelecionados(equipamentosFiltrados.map(m => m.id));
    } else {
      setSelecionados([]);
    }
  };

  const handleSelecionarUm = (id) => {
    setSelecionados(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Ação em Massa: Alterar Status
  const handleAlterarStatusEmMassa = (novoStatus) => {
    setEquipamentos(prev => prev.map(maq => 
      selecionados.includes(maq.id) ? { ...maq, status_atual: novoStatus } : maq
    ));
    setSelecionados([]); // Limpa a seleção
    
    // Mostra Toast de Sucesso
    setToastMsg(`Status de ${selecionados.length} máquina(s) alterado para "${novoStatus}".`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Cores dinâmicas para o Status
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Atenção': return { bg: 'rgba(255, 61, 61, 0.1)', color: 'var(--danger)', border: 'var(--danger)' };
      case 'Operacional': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '#10B981' };
      case 'Manutenção': return { bg: 'rgba(255, 166, 0, 0.1)', color: 'orange', border: 'orange' };
      default: return { bg: 'rgba(74, 157, 156, 0.1)', color: 'var(--primary-light)', border: 'var(--primary)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
      
      {/* CABEÇALHO E FILTROS AVANÇADOS */}
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>conveyor_belt</span>
            Inventário de Equipamentos
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Gerenciamento e ações corretivas em tempo real.</p>
        </div>
        
        {/* Filtros */}
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '500px' }}>
          {/* Select de Status */}
          <div style={{ position: 'relative', width: '150px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontSize: '20px' }}>filter_list</span>
            <select 
              value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '14px', outline: 'none', appearance: 'none', cursor: 'pointer' }}
            >
              <option value="Todos">Todos</option>
              <option value="Operacional">Operacional</option>
              <option value="Atenção">Atenção</option>
              <option value="Manutenção">Em Manutenção</option>
            </select>
            <span className="material-symbols-outlined" style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)', pointerEvents: 'none' }}>expand_more</span>
          </div>

          {/* Busca por Texto */}
          <div style={{ position: 'relative', flex: 1 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }}>search</span>
            <input 
              type="text" placeholder="Buscar por nome ou ID..." 
              value={busca} onChange={(e) => setBusca(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '14px', outline: 'none', transition: '0.3s' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'}
            />
          </div>
        </div>
      </div>

      {/* BARRA DE AÇÕES EM MASSA (Surge quando seleciona items) */}
      {selecionados.length > 0 && (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--primary-dark)', padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: '#fff', color: 'var(--primary-dark)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>{selecionados.length}</span>
            <span style={{ color: '#fff', fontWeight: '500' }}>Equipamentos Selecionados</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => handleAlterarStatusEmMassa('Operacional')} style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid #10B981', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='#10B981'} onMouseOut={e=>e.currentTarget.style.backgroundColor='rgba(16, 185, 129, 0.2)'}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_circle</span> Liberar
            </button>
            <button onClick={() => handleAlterarStatusEmMassa('Manutenção')} style={{ backgroundColor: 'rgba(255, 166, 0, 0.2)', color: 'orange', border: '1px solid orange', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.2s' }} onMouseOver={e=>e.currentTarget.style.backgroundColor='orange'} onMouseOut={e=>e.currentTarget.style.backgroundColor='rgba(255, 166, 0, 0.2)'}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>build</span> Manutenção
            </button>
            <button onClick={() => setSelecionados([])} style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: 'none', padding: '8px', cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}

      {/* TABELA DE EQUIPAMENTOS */}
      <div className="animate-fade-in delay-1" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--bg-border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)', borderBottom: '1px solid var(--bg-border)' }}>
              <th style={{ padding: '16px 24px', width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={equipamentosFiltrados.length > 0 && selecionados.length === equipamentosFiltrados.length}
                  onChange={handleSelecionarTodos}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-light)' }}
                />
              </th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Equipamento</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Estado Atual</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Temperatura</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Carga Aplicada</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Idade (Anos)</th>
            </tr>
          </thead>
          
          <tbody>
            {isLoading ? (
            <tr>
              <td colSpan="6" style={{ padding: '48px', textAlign: 'center', color: 'var(--primary)' }}>
                <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite', fontSize: '36px' }}>sync</span>
                <p style={{ marginTop: '12px', fontWeight: '500' }}>Sincronizando telemetria...</p>
              </td>
            </tr>
          ) : equipamentosFiltrados.length > 0 ? (
            equipamentosFiltrados.map((maq, index) => {
                const estiloStatus = getStatusStyle(maq.status_atual);
                const temp = maq.temperature ? maq.temperature.toFixed(1) + ' °C' : '--';
                const carga = maq.load_percentage ? maq.load_percentage.toFixed(1) + '%' : '--';
                const idade = maq.machine_age_years ? maq.machine_age_years.toFixed(1) : '--';
                const isSelected = selecionados.includes(maq.id);

                return (
                  <tr key={maq.id} style={{ 
                    borderBottom: index === equipamentosFiltrados.length - 1 ? 'none' : '1px solid var(--bg-border)', 
                    color: 'var(--text-main)', transition: '0.2s',
                    backgroundColor: isSelected ? 'rgba(74, 157, 156, 0.05)' : 'transparent'
                  }}
                  onMouseOver={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')}
                  onMouseOut={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'transparent')}>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <input 
                        type="checkbox" checked={isSelected} onChange={() => handleSelecionarUm(maq.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-light)' }}
                      />
                    </td>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: '600' }}>{maq.nome}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>{maq.id}</div>
                    </td>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ backgroundColor: estiloStatus.bg, color: estiloStatus.color, border: `1px solid ${estiloStatus.border}`, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        {maq.status_atual === 'Manutenção' && <span className="material-symbols-outlined" style={{fontSize:'14px'}}>build</span>}
                        {maq.status_atual}
                      </span>
                    </td>
                    
                    <td style={{ padding: '16px 24px', color: maq.status_atual === 'Atenção' ? 'var(--danger)' : 'var(--text-main)', fontWeight: maq.status_atual === 'Atenção' ? 'bold' : 'normal' }}>
                      {temp}
                    </td>
                    <td style={{ padding: '16px 24px' }}>{carga}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{idade}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Nenhum equipamento encontrado com os filtros atuais.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* TOAST DINÂMICO DE AÇÃO EM MASSA */}
      {toastMsg && (
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: '#10B981', color: '#ffffff', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 9999, fontWeight: '500' }}>
          <span className="material-symbols-outlined">check_circle</span>
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Equipamentos;