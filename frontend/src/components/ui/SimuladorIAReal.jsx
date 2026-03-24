// src/components/ui/SimuladorIAReal.jsx
import React, { useState } from 'react';

const SimuladorIAReal = () => {
  const [formData, setFormData] = useState({
    temperatura: '',
    carga: '',
    idade: ''
  });
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // A MÁGICA DA APRESENTAÇÃO: Preenche dados que forçam um erro crítico na IA
  const handleAutoFill = () => {
    setFormData({
      temperatura: '92.5',
      carga: '110',
      idade: '12'
    });
    setResultado(null);
  };

  const handleSimular = (e) => {
    e.preventDefault();
    if (!formData.temperatura || !formData.carga || !formData.idade) return;
    
    setLoading(true);
    setResultado(null);

    // Simula a latência de rede para a API de Python
    setTimeout(() => {
      const temp = parseFloat(formData.temperatura);
      const carga = parseFloat(formData.carga);
      const idade = parseFloat(formData.idade);

      // 1. CÁLCULO DE PROBABILIDADE DE FALHA (Regressão Simulada)
      const pesoTemp = temp > 65 ? (temp - 65) * 2.2 : 0; 
      const pesoCarga = carga > 85 ? (carga - 85) * 1.5 : 0;
      const pesoIdade = idade * 1.8;

      let probFalha = 5 + pesoTemp + pesoCarga + pesoIdade; // Base de 5% de risco inerente
      if (probFalha > 99.9) probFalha = 99.9;

      // 2. CLASSIFICAÇÃO DE RISCO
      let risco = 'Operação Estável';
      let cor = '#10B981';
      let icon = 'check_circle';
      
      if (probFalha >= 75) {
        risco = 'Risco Crítico (Falha Iminente)';
        cor = 'var(--danger)';
        icon = 'warning';
      } else if (probFalha >= 40) {
        risco = 'Atenção (Degradação Acelerada)';
        cor = 'var(--warning)';
        icon = 'error';
      }

      // 3. CÁLCULO DE CONSUMO DE ENERGIA (Física aplicada)
      const perdaEficiencia = (idade * 0.01) + (temp > 70 ? (temp - 70) * 0.008 : 0);
      const eficienciaAtual = Math.max(1 - perdaEficiencia, 0.4); // Limita a pior eficiência a 40%
      const consumoEstimado = (250 * (carga / 100)) / eficienciaAtual;

      // 4. EXPLICABILIDADE DA IA (Feature Importance)
      const totalPesos = pesoTemp + pesoCarga + pesoIdade || 1;
      const impactoTemp = ((pesoTemp / totalPesos) * 100).toFixed(0);
      const impactoCarga = ((pesoCarga / totalPesos) * 100).toFixed(0);

      setResultado({
        risco,
        cor,
        icon,
        consumo_kwh: consumoEstimado.toFixed(1),
        probabilidade_falha: probFalha.toFixed(1),
        eficiencia: (eficienciaAtual * 100).toFixed(1),
        impacto: {
          temperatura: impactoTemp,
          carga: impactoCarga
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{
      backgroundColor: 'var(--bg-card)',
      borderRadius: '12px',
      border: '1px solid var(--primary)',
      padding: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }}>
      
      {/* Cabeçalho do Simulador */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ color: 'var(--text-main)', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary-light)' }}>online_prediction</span>
            Motor de Inferência (What-If)
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
            Simule variações de telemetria para calcular o impacto físico e financeiro.
          </p>
        </div>
        
        {/* BOTÃO DA APRESENTAÇÃO */}
        <button type="button" onClick={handleAutoFill} style={{
          backgroundColor: 'rgba(74, 157, 156, 0.1)', color: 'var(--primary-light)', border: '1px solid var(--primary-light)',
          padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px', transition: '0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 157, 156, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(74, 157, 156, 0.1)'}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>magic_button</span> Injetar Anomalia
        </button>
      </div>

      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        
        {/* Lado Esquerdo: Inputs */}
        <form onSubmit={handleSimular} style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', display: 'block', fontWeight: 'bold' }}>Temp. Mancal (ºC)</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontSize: '18px' }}>thermostat</span>
                <input required type="number" step="0.1" name="temperatura" value={formData.temperatura} onChange={handleChange} placeholder="Ex: 65.0" style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', transition: '0.2s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'} />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', display: 'block', fontWeight: 'bold' }}>Carga Operacional (%)</label>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontSize: '18px' }}>speed</span>
                <input required type="number" step="0.1" name="carga" value={formData.carga} onChange={handleChange} placeholder="Ex: 85.0" style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', transition: '0.2s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'} />
              </div>
            </div>
          </div>

          <div>
            <label style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', marginBottom: '6px', display: 'block', fontWeight: 'bold' }}>Idade do Equipamento (Anos)</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)', fontSize: '18px' }}>update</span>
              <input required type="number" name="idade" value={formData.idade} onChange={handleChange} placeholder="Ex: 5" style={{ width: '100%', padding: '12px 12px 12px 36px', borderRadius: '8px', border: '1px solid var(--bg-border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', transition: '0.2s' }} onFocus={(e) => e.target.style.borderColor = 'var(--primary)'} onBlur={(e) => e.target.style.borderColor = 'var(--bg-border)'} />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            backgroundColor: loading ? 'var(--bg-border)' : 'var(--primary-dark)',
            color: 'var(--text-main)', border: 'none', padding: '14px', borderRadius: '8px',
            fontSize: '15px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '8px',
            transition: '0.2s'
          }}
          onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--primary)')}
          onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--primary-dark)')}
          >
            {loading ? (
              <><span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>sync</span> Extraindo Features...</>
            ) : (
              <><span className="material-symbols-outlined">query_stats</span> Executar Inferência</>
            )}
          </button>
        </form>

        {/* Lado Direito: Resposta do Modelo (XAI - Explainable AI) */}
        <div style={{ flex: '1 1 300px', backgroundColor: 'var(--bg-main)', borderRadius: '12px', padding: '24px', border: '1px solid var(--bg-border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {!loading && !resultado && (
            <div className="animate-fade-in" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.5, marginBottom: '16px' }}>model_training</span>
              <p style={{ fontWeight: '500' }}>Aguardando Telemetria</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>Insira os dados à esquerda para calcular o desgaste térmico e a projeção de consumo.</p>
            </div>
          )}

          {loading && (
            <div className="animate-fade-in" style={{ textAlign: 'center', color: 'var(--primary-light)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', animation: 'spin 1s linear infinite' }}>memory</span>
              <p style={{ marginTop: '16px', fontWeight: 'bold' }}>Rodando Random Forest...</p>
              <div style={{ width: '60%', height: '4px', backgroundColor: 'var(--bg-border)', margin: '16px auto', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--primary-light)', animation: 'slideRight 1s ease-in-out infinite' }}></div>
              </div>
            </div>
          )}

          {resultado && !loading && (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--bg-border)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '40px', color: resultado.cor }}>{resultado.icon}</span>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}>Diagnóstico Preditivo</p>
                  <h2 style={{ color: resultado.cor, margin: 0, fontSize: '22px' }}>{resultado.risco}</h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: `1px solid ${resultado.cor}40` }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Risco de Quebra</span>
                  <span style={{ color: resultado.cor, fontSize: '20px', fontWeight: 'bold' }}>{resultado.probabilidade_falha}%</span>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', border: '1px solid var(--bg-border)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Consumo Estimado</span>
                  <span style={{ color: 'var(--primary-light)', fontSize: '20px', fontWeight: 'bold' }}>{resultado.consumo_kwh} <span style={{ fontSize: '12px' }}>kWh</span></span>
                </div>
              </div>

              {/* Explainable AI (XAI) - Peso das variáveis na decisão AGORA COM CORES */}
              <div style={{ marginTop: '8px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>psychology</span> Fatores Agravantes (XAI):
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ width: '40px', color: 'var(--danger)', fontWeight: '600' }}>Temp.</span>
                  <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--bg-card)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${resultado.impacto.temperatura}%`, height: '100%', backgroundColor: 'var(--danger)' }}></div>
                  </div>
                  <span style={{ width: '35px', textAlign: 'right', color: 'var(--danger)', fontWeight: 'bold' }}>{resultado.impacto.temperatura}%</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', marginTop: '6px' }}>
                  <span style={{ width: '40px', color: 'var(--warning)', fontWeight: '600' }}>Carga</span>
                  <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--bg-card)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${resultado.impacto.carga}%`, height: '100%', backgroundColor: 'var(--warning)' }}></div>
                  </div>
                  <span style={{ width: '35px', textAlign: 'right', color: 'var(--warning)', fontWeight: 'bold' }}>{resultado.impacto.carga}%</span>
                </div>
              </div>

              {/* Mensagem Limpa de Eficiência na base */}
              <div style={{ marginTop: 'auto', backgroundColor: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', color: '#10B981', borderLeft: '3px solid #10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>speed</span>
                <span>Eficiência do estator reduzida para <strong>{resultado.eficiencia}%</strong></span>
              </div>
            </div>
          )}
        </div>

      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes slideRight { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
};

export default SimuladorIAReal;