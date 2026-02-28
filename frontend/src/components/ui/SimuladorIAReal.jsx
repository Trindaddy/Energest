// src/components/ui/SimuladorIAReal.jsx
import React, { useState } from "react";
import { simularPrevisaoIA } from "../../services/api";

const SimuladorIAReal = () => {
  // Estado com os mesmos nomes do BaseModel do FastAPI dela
  const [formData, setFormData] = useState({
    temperature: 65.0,
    load_percentage: 80.0,
    operating_hours: 1200.0,
    maintenance_status: 1, // 1 para OK, 0 para Precisa de Manutenção
    machine_age_years: 5.5,
  });

  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const executarIA = async () => {
    setIsLoading(true);
    setResultado(null);

    // Chama a API em Python
    const res = await simularPrevisaoIA(formData);

    setIsLoading(false);
    setResultado(res);
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "12px",
        border: "1px solid var(--primary)",
        padding: "24px",
        marginTop: "32px",
        boxShadow: "0 0 20px rgba(74, 157, 156, 0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{ color: "var(--primary-light)", fontSize: "28px" }}
        >
          science
        </span>
        <div>
          <h3 style={{ color: "var(--text-main)", fontSize: "20px" }}>
            Teste em Tempo Real (Live Machine Learning)
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            Conectado ao motor preditivo Scikit-Learn via FastAPI
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Campos de Input */}
        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Temperatura (ºC)
          </label>
          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "var(--bg-main)",
              border: "1px solid var(--bg-border)",
              color: "#fff",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Carga (%)
          </label>
          <input
            type="number"
            step="0.1"
            name="load_percentage"
            value={formData.load_percentage}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "var(--bg-main)",
              border: "1px solid var(--bg-border)",
              color: "#fff",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Horas Operação
          </label>
          <input
            type="number"
            step="1"
            name="operating_hours"
            value={formData.operating_hours}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "var(--bg-main)",
              border: "1px solid var(--bg-border)",
              color: "#fff",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Status Manutenção (1=OK, 0=Ruim)
          </label>
          <input
            type="number"
            min="0"
            max="1"
            name="maintenance_status"
            value={formData.maintenance_status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "var(--bg-main)",
              border: "1px solid var(--bg-border)",
              color: "#fff",
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              color: "var(--text-muted)",
              fontSize: "12px",
              marginBottom: "8px",
            }}
          >
            Idade Máquina (Anos)
          </label>
          <input
            type="number"
            step="0.1"
            name="machine_age_years"
            value={formData.machine_age_years}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              backgroundColor: "var(--bg-main)",
              border: "1px solid var(--bg-border)",
              color: "#fff",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <button
          onClick={executarIA}
          disabled={isLoading}
          style={{
            backgroundColor: "var(--primary-dark)",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {isLoading ? (
            <>
              <span
                className="material-symbols-outlined"
                style={{ animation: "spin 1s linear infinite" }}
              >
                sync
              </span>{" "}
              Processando Modelo...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">query_stats</span>{" "}
              Executar Previsão de Consumo
            </>
          )}
        </button>

        {/* Exibição do Resultado da API */}
        {resultado && (
          <div
            className="animate-fade-in"
            style={{
              backgroundColor: resultado.erro
                ? "rgba(255, 61, 61, 0.1)"
                : "rgba(16, 185, 129, 0.1)",
              border: `1px solid ${resultado.erro ? "var(--danger)" : "#10B981"}`,
              padding: "12px 24px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {resultado.erro ? (
              <span style={{ color: "var(--danger)", fontWeight: "500" }}>
                {resultado.erro}
              </span>
            ) : (
              <>
                <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  Previsão da IA (Consumo):
                </span>
                <span
                  style={{
                    color: "#10B981",
                    fontSize: "24px",
                    fontWeight: "800",
                  }}
                >
                  {resultado.previsao} kWh
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimuladorIAReal;
