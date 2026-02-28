// src/pages/Equipamentos/Equipamentos.jsx
import React, { useState, useEffect } from 'react';
import { getEquipamentosReais } from '../../services/api';

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
  const [equipamentos, setEquipamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  
  const [selecionados, setSelecionados] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    const fetchDados = async () => {
      setIsLoading(true);
      const dadosReais = await getEquipamentosReais();
      
      const dadosEnriquecidos = (dadosReais || []).map((maq, index) => ({
        ...maq,
        nome: nomesIndustriais[index % nomesIndustriais.length],
        status_ia: maq.status, // O que o modelo preditivo diz (Atenção / Operacional)
        estado_humano: 'Em Uso' // O que o gestor decide (Em Uso / Manutenção)
      }));
      
      setEquipamentos(dadosEnriquecidos);
      setIsLoading(false);
    };
    fetchDados();
  }, []);

  const equipamentosFiltrados = equipamentos.filter((maq) => {
    const atendeBusca = maq?.nome?.toLowerCase().includes(busca.toLowerCase()) || maq?.id?.toLowerCase().includes(busca.toLowerCase());
    const atendeStatus = filtroStatus === 'Todos' || maq.status_ia === filtroStatus || maq.estado_humano === filtroStatus;
    return atendeBusca && atendeStatus;
  });

  const handleSelecionarTodos = (e) => {
    if (e.target.checked) setSelecionados(equipamentosFiltrados.map(m => m.id));
    else setSelecionados([]);
  };

  const handleSelecionarUm = (id) => {
    setSelecionados(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  // Ação em Massa: Altera apenas o Estado Humano, preservando o diagnóstico da IA
  const handleAlterarStatusEmMassa = (novoEstado) => {
    setEquipamentos(prev => prev.map(maq => 
      selecionados.includes(maq.id) ? { ...maq, estado_humano: novoEstado } : maq
    ));
    setSelecionados([]); 
    
    setToastMsg(`${selecionados.length} equipamento(s) movidos para "${novoEstado}".`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const getBadgeIA = (status_ia) => {
    if (status_ia === 'Atenção') return { bg: 'rgba(255, 61, 61, 0.1)', color: 'var(--danger)', border: 'var(--danger)', icon: 'warning' };
    return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '#10B981', icon: 'check_circle' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
      
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>conveyor_belt</span>
            Inventário de Equipamentos
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Gerenciamento de planta e ações corretivas.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '500px' }}>
          <div style={{ position: 'relative', width: '170px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontSize: '20px' }}>filter_list</span>
            <select 
              value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '14px', outline: 'none', appearance: 'none', cursor: 'pointer' }}
            >
              <option value="Todos">Todos os Status</option>
              <option value="Operacional">IA: Operacional</option>
              <option value="Atenção">IA: Atenção</option>
              <option value="Manutenção">Ação: Manutenção</option>
            </select>
            <span className="material-symbols-outlined" style={{ position: 'absolute', right: '12px', top: '12px', color: 'var(--text-muted)', pointerEvents: 'none' }}>expand_more</span>
          </div>

          <div style={{ position: 'relative', flex: 1 }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }}>search</span>
            <input 
              type="text" placeholder="Buscar máquina..." 
              value={busca} onChange={(e) => setBusca(e.target.value)}
              style={{ width: '100%', padding: '12px 12px 12px 44px', borderRadius: '8px', backgroundColor: 'var(--bg-card)', border: '1px solid var(--bg-border)', color: 'var(--text-main)', fontSize: '14px', outline: 'none', transition: '0.3s' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'}
            />
          </div>
        </div>
      </div>

      {selecionados.length > 0 && (
        <div className="animate-fade-in" style={{ backgroundColor: 'var(--primary-dark)', padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', border: '1px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: '#fff', color: '#000', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>{selecionados.length}</span>
            <span style={{ color: '#fff', fontWeight: '500' }}>Máquinas Selecionadas</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => handleAlterarStatusEmMassa('Em Uso')} style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10B981', border: '1px solid #10B981', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.2s' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>play_circle</span> Liberar Uso
            </button>
            <button onClick={() => handleAlterarStatusEmMassa('Manutenção')} style={{ backgroundColor: 'rgba(255, 166, 0, 0.2)', color: 'orange', border: '1px solid orange', padding: '8px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: '0.2s' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>build</span> Isolar (Manutenção)
            </button>
            <button onClick={() => setSelecionados([])} style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: 'none', padding: '8px', cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="animate-fade-in delay-1" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--bg-border)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '850px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)', borderBottom: '1px solid var(--bg-border)' }}>
              <th style={{ padding: '16px 24px', width: '40px' }}>
                <input 
                  type="checkbox" checked={equipamentosFiltrados.length > 0 && selecionados.length === equipamentosFiltrados.length}
                  onChange={handleSelecionarTodos} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-light)' }}
                />
              </th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Equipamento</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Diagnóstico IA</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Controle Operacional</th>
              <th style={{ padding: '16px 24px', fontWeight: '500' }}>Temperatura / Carga</th>
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
                const badgeIA = getBadgeIA(maq.status_ia);
                const temp = maq.temperature ? maq.temperature.toFixed(1) + ' °C' : '--';
                const carga = maq.load_percentage ? maq.load_percentage.toFixed(1) + '%' : '--';
                const idade = maq.machine_age_years ? maq.machine_age_years.toFixed(1) : '--';
                const isSelected = selecionados.includes(maq.id);

                return (
                  <tr key={maq.id} style={{ 
                    borderBottom: index === equipamentosFiltrados.length - 1 ? 'none' : '1px solid var(--bg-border)', color: 'var(--text-main)', transition: '0.2s', backgroundColor: isSelected ? 'rgba(74, 157, 156, 0.05)' : 'transparent'
                  }} onMouseOver={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)')} onMouseOut={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'transparent')}>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleSelecionarUm(maq.id)} style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--primary-light)' }} />
                    </td>
                    
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontWeight: '600' }}>{maq.nome}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>{maq.id}</div>
                    </td>
                    
                    {/* COLUNA 1: O que a IA está detectando fisicamente */}
                    <td style={{ padding: '16px 24px' }}>
                      <span title="Status baseado nos sensores via Scikit-Learn" style={{ backgroundColor: badgeIA.bg, color: badgeIA.color, border: `1px solid ${badgeIA.border}`, padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <span className="material-symbols-outlined" style={{fontSize:'14px'}}>{badgeIA.icon}</span> {maq.status_ia}
                      </span>
                    </td>
                    
                    {/* COLUNA 2: Ação humana tomada sobre a máquina */}
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ backgroundColor: maq.estado_humano === 'Manutenção' ? 'rgba(255, 166, 0, 0.1)' : 'transparent', color: maq.estado_humano === 'Manutenção' ? 'orange' : 'var(--text-muted)', border: `1px solid ${maq.estado_humano === 'Manutenção' ? 'orange' : 'var(--bg-border)'}`, padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {maq.estado_humano === 'Manutenção' ? <><span className="material-symbols-outlined" style={{fontSize:'14px'}}>build</span> Isolar / Manutenção</> : 'Em Uso Normal'}
                      </span>
                    </td>
                    
                    <td style={{ padding: '16px 24px', color: maq.status_ia === 'Atenção' ? 'var(--danger)' : 'var(--text-main)', fontWeight: maq.status_ia === 'Atenção' ? 'bold' : 'normal' }}>
                      {temp} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '12px' }}>| {carga}</span>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{idade}</td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum equipamento encontrado com os filtros atuais.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {toastMsg && (
        <div className="animate-fade-in" style={{ position: 'fixed', bottom: '32px', right: '32px', backgroundColor: '#10B981', color: '#ffffff', padding: '16px 24px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 9999, fontWeight: '500' }}>
          <span className="material-symbols-outlined">check_circle</span> {toastMsg}
        </div>
      )}
    </div>
  );
};

export default Equipamentos;
