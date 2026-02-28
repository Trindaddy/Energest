// src/pages/RecomendacoesIA/RecomendacoesIA.jsx
import React, { useState } from "react";
import { iaRecommendations } from "../../services/mockData";
import SimuladorIAReal from "../../components/ui/SimuladorIAReal";

const RecomendacoesIA = () => {
  // Estados para controlar os botões e os fluxos de cada card
  const [statusCards, setStatusCards] = useState({});
  const [toastConfig, setToastConfig] = useState(null); // { texto: '', tipo: 'sucesso' | 'info' | 'erro' }
  const [showJustificativa, setShowJustificativa] = useState({}); // { id: boolean }
  const [textoJustificativa, setTextoJustificativa] = useState({}); // { id: string }

  // Função Auxiliar para disparar o Toast
  const showToast = (texto, tipo = "sucesso") => {
    setToastConfig({ texto, tipo });
    setTimeout(() => setToastConfig(null), 4000);
  };

  // 1. Fluxo de Aprovação
  const handleAprovar = (id, equipamento) => {
    setStatusCards((prev) => ({ ...prev, [id]: "loading" }));
    setShowJustificativa((prev) => ({ ...prev, [id]: false }));

    setTimeout(() => {
      setStatusCards((prev) => ({ ...prev, [id]: "success" }));
      showToast(`Ação aprovada para: ${equipamento}`, "sucesso");
    }, 1000);
  };

  // 2. Fluxo de Recalcular (Repensar)
  const handleRecalcular = (id, equipamento) => {
    setStatusCards((prev) => ({ ...prev, [id]: "recalculating" }));
    setShowJustificativa((prev) => ({ ...prev, [id]: false }));

    setTimeout(() => {
      setStatusCards((prev) => ({ ...prev, [id]: "idle" }));
      showToast(
        `Modelo da IA reajustado para ${equipamento}. Parâmetros atualizados.`,
        "info",
      );
    }, 1800);
  };

  // 3. Fluxo de Recusa
  const toggleJustificativa = (id) => {
    setShowJustificativa((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const confirmarRecusa = (id, equipamento) => {
    if (!textoJustificativa[id] || textoJustificativa[id].length < 5) {
      alert(
        "Por favor, insira uma justificação técnica para treinar o modelo.",
      );
      return;
    }

    setStatusCards((prev) => ({ ...prev, [id]: "refused" }));
    setShowJustificativa((prev) => ({ ...prev, [id]: false }));
    showToast(`Recomendação recusada. Feedback enviado à IA.`, "erro");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        position: "relative",
      }}
    >
      {/* Cabeçalho da Secção */}
      <div className="animate-fade-in">
        <h2
          style={{
            color: "var(--text-main)",
            fontSize: "24px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: "var(--primary-light)" }}
          >
            auto_awesome
          </span>
          Central de Decisões Preditivas
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
          Análise de impacto, aprovação de ações e recolha de feedback para o
          modelo.
        </p>
      </div>

      {/* Lista de Recomendações */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {iaRecommendations.map((rec, index) => {
          const statusAtual = statusCards[rec.id] || "idle";
          const isRefused = statusAtual === "refused";
          const isSuccess = statusAtual === "success";

          return (
            <div
              key={rec.id}
              className={`animate-fade-in delay-${index + 1}`}
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "12px",
                border: `1px solid ${isSuccess ? "#10B981" : isRefused ? "var(--bg-border)" : rec.prioridade === "Alta" ? "var(--danger)" : "var(--warning)"}`,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                transition: "all 0.3s ease",
                opacity: isRefused ? 0.6 : 1, // Fica meio transparente se for recusado
              }}
            >
              {/* Topo do Cartão */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        color: isRefused
                          ? "var(--text-muted)"
                          : "var(--text-main)",
                        fontSize: "20px",
                        textDecoration: isRefused ? "line-through" : "none",
                      }}
                    >
                      {rec.equipamento}
                    </h3>

                    {/* Badge Dinâmico */}
                    {isSuccess ? (
                      <span
                        style={{
                          backgroundColor: "rgba(16, 185, 129, 0.1)",
                          color: "#10B981",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "1px solid #10B981",
                        }}
                      >
                        Resolvido
                      </span>
                    ) : isRefused ? (
                      <span
                        style={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "var(--text-muted)",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: "1px solid var(--bg-border)",
                        }}
                      >
                        Ignorado (Feedback Guardado)
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor:
                            rec.prioridade === "Alta"
                              ? "rgba(255, 61, 61, 0.1)"
                              : "rgba(255, 224, 200, 0.1)",
                          color:
                            rec.prioridade === "Alta"
                              ? "var(--danger)"
                              : "var(--warning)",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          border: `1px solid ${rec.prioridade === "Alta" ? "var(--danger)" : "var(--warning)"}`,
                        }}
                      >
                        Prioridade {rec.prioridade}
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      color: "var(--primary-light)",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {rec.categoria}
                  </p>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  ID: {rec.id}
                </span>
              </div>

              {/* Diagnóstico da IA */}
              <div
                style={{
                  backgroundColor: "var(--bg-main)",
                  padding: "16px",
                  borderRadius: "8px",
                  borderLeft: `4px solid ${isSuccess ? "#10B981" : isRefused ? "var(--text-muted)" : "var(--primary)"}`,
                }}
              >
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "14px",
                    marginBottom: "4px",
                  }}
                >
                  <strong>Diagnóstico da IA:</strong>
                </p>
                <p style={{ color: "var(--text-main)", fontSize: "15px" }}>
                  {rec.ia_diagnostico}
                </p>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "14px",
                    marginTop: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <strong>Ação Sugerida:</strong>
                </p>
                <p style={{ color: "var(--text-main)", fontSize: "15px" }}>
                  {rec.acao_sugerida}
                </p>
              </div>

              {/* Simulador WHAT-IF */}
              {!isRefused && (
                <div style={{ marginTop: "8px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(74, 157, 156, 0.1)",
                        border: "1px solid var(--primary)",
                        padding: "16px",
                        borderRadius: "8px",
                        opacity: isSuccess ? 1 : 0.8,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "12px",
                          color: "var(--primary-light)",
                        }}
                      >
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                        <strong>Se Aplicar a Ação</strong>
                      </div>
                      {rec.what_if.aplicar_custo ? (
                        <p style={{ color: "var(--text-main)" }}>
                          Custo Estimado:{" "}
                          <strong style={{ color: "var(--primary-light)" }}>
                            R$ {rec.what_if.aplicar_custo}
                          </strong>
                        </p>
                      ) : (
                        <p style={{ color: "var(--text-main)" }}>
                          Economia Diária:{" "}
                          <strong style={{ color: "var(--primary-light)" }}>
                            R$ {rec.what_if.aplicar_economia}
                          </strong>
                        </p>
                      )}
                    </div>

                    <div
                      style={{
                        backgroundColor: "rgba(255, 61, 61, 0.1)",
                        border: "1px solid var(--danger)",
                        padding: "16px",
                        borderRadius: "8px",
                        opacity: isSuccess ? 0.3 : 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "12px",
                          color: "var(--danger)",
                        }}
                      >
                        <span className="material-symbols-outlined">
                          warning
                        </span>
                        <strong>Se Ignorar o Alerta</strong>
                      </div>
                      {rec.what_if.ignorar_custo ? (
                        <p style={{ color: "var(--text-main)" }}>
                          Risco Financeiro:{" "}
                          <strong style={{ color: "var(--danger)" }}>
                            R$ {rec.what_if.ignorar_custo}
                          </strong>
                        </p>
                      ) : (
                        <p style={{ color: "var(--text-main)" }}>
                          Desperdício Mensal:{" "}
                          <strong style={{ color: "var(--danger)" }}>
                            R$ {rec.what_if.ignorar_desperdicio}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* === CAIXA DE JUSTIFICAÇÃO (Mostra se clicar em Recusar) === */}
              {showJustificativa[rec.id] && (
                <div
                  className="animate-fade-in"
                  style={{
                    backgroundColor: "var(--bg-main)",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px dashed var(--danger)",
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    Motivo da Recusa (Ajuda a treinar o modelo de Machine
                    Learning):
                  </p>
                  <textarea
                    rows="2"
                    placeholder="Ex: Produção prioritária neste turno..."
                    onChange={(e) =>
                      setTextoJustificativa((prev) => ({
                        ...prev,
                        [rec.id]: e.target.value,
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--bg-border)",
                      color: "var(--text-main)",
                      outline: "none",
                      resize: "none",
                    }}
                  ></textarea>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                      marginTop: "12px",
                    }}
                  >
                    <button
                      onClick={() => toggleJustificativa(rec.id)}
                      style={{
                        padding: "8px 16px",
                        background: "transparent",
                        color: "var(--text-muted)",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => confirmarRecusa(rec.id, rec.equipamento)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "var(--danger)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Confirmar Recusa
                    </button>
                  </div>
                </div>
              )}

              {/* === BOTÕES DE AÇÃO INTERATIVOS === */}
              {statusAtual !== "success" &&
                statusAtual !== "refused" &&
                !showJustificativa[rec.id] && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "16px",
                      marginTop: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Botão Recusar (Vermelho / Secundário) */}
                    <button
                      onClick={() => toggleJustificativa(rec.id)}
                      style={{
                        background: "transparent",
                        color: "var(--danger)",
                        border: "1px solid var(--danger)",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "0.2s",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "18px" }}
                      >
                        block
                      </span>{" "}
                      Recusar
                    </button>

                    {/* Botão Recalcular (Teal / Secundário) */}
                    <button
                      onClick={() => handleRecalcular(rec.id, rec.equipamento)}
                      disabled={statusAtual === "recalculating"}
                      style={{
                        background: "transparent",
                        color: "var(--primary-light)",
                        border: "1px solid var(--primary-light)",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor:
                          statusAtual === "recalculating"
                            ? "not-allowed"
                            : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "0.2s",
                      }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "18px",
                          animation:
                            statusAtual === "recalculating"
                              ? "spin 1s linear infinite"
                              : "none",
                        }}
                      >
                        {statusAtual === "recalculating"
                          ? "sync"
                          : "model_training"}
                      </span>
                      {statusAtual === "recalculating"
                        ? "A Avaliar..."
                        : "Recalcular IA"}
                    </button>

                    {/* Botão Aprovar (Teal / Primário) */}
                    <button
                      onClick={() => handleAprovar(rec.id, rec.equipamento)}
                      disabled={statusAtual === "loading"}
                      style={{
                        backgroundColor:
                          statusAtual === "loading"
                            ? "var(--bg-border)"
                            : "var(--primary-dark)",
                        color: "var(--text-main)",
                        border: "none",
                        padding: "10px 24px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor:
                          statusAtual === "loading" ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "0.2s",
                      }}
                    >
                      {statusAtual === "loading" ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "20px",
                              animation: "spin 1s linear infinite",
                            }}
                          >
                            sync
                          </span>{" "}
                          Processando...
                        </>
                      ) : (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "20px" }}
                          >
                            task_alt
                          </span>{" "}
                          Aprovar Recomendação
                        </>
                      )}
                    </button>
                  </div>
                )}
            </div>
          );
        })}
      </div>

      {/* NOVO: SIMULADOR REAL AO VIVO */}
      <SimuladorIAReal />
      
      {/* COMPONENTE TOAST DINÂMICO */}

      {toastConfig && (
        <div
          className="animate-fade-in"
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            backgroundColor:
              toastConfig.tipo === "sucesso"
                ? "#10B981"
                : toastConfig.tipo === "erro"
                  ? "#354656"
                  : "var(--primary-dark)",
            color: "#ffffff",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 9999,
            fontWeight: "500",
            borderLeft: `4px solid ${toastConfig.tipo === "erro" ? "var(--danger)" : "#fff"}`,
          }}
        >
          <span className="material-symbols-outlined">
            {toastConfig.tipo === "sucesso"
              ? "check_circle"
              : toastConfig.tipo === "erro"
                ? "feedback"
                : "model_training"}
          </span>
          {toastConfig.texto}
        </div>
      )}

      {/* CSS inline para o giro dos ícones */}
      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default RecomendacoesIA;
