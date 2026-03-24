from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import joblib
import pandas as pd
import os  # Adicione este import no topo

# 1. Cria a instância do app PRIMEIRO
app = FastAPI(title="Energy Prediction API")

# 2. Configura o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Carrega o modelo de IA
model = joblib.load("model.pkl")

# 4. Define o Schema
class EnergyData(BaseModel):
    temperature: float
    load_percentage: float
    operating_hours: float
    maintenance_status: int
    machine_age_years: float

# ==========================================
# ROTAS DA API
# ==========================================

@app.get("/api/equipamentos")
async def get_equipamentos():
    try:
        # Pega o caminho absoluto da pasta onde este arquivo main.py está
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        
        # Monta o caminho exato para o CSV (main.py está em /app, o csv em /app/models)
        csv_path = os.path.join(BASE_DIR, "models", "energy_data.csv")
        
        # Log de debug para você ver no terminal se o caminho está certo
        print(f"🔍 Tentando ler arquivo em: {csv_path}")

        if not os.path.exists(csv_path):
            return JSONResponse(
                status_code=404, 
                content={"erro": f"Arquivo não encontrado em: {csv_path}"}
            )

        df = pd.read_csv(csv_path)
        
        # Pega as últimas 20 linhas
        df_recent = df.tail(20).copy()
        
        # Cria IDs e Nomes fictícios
        df_recent['id'] = ['MAQ-' + str(i).zfill(3) for i in range(1, len(df_recent) + 1)]
        df_recent['nome'] = [f'Equipamento Industrial {i}' for i in range(1, len(df_recent) + 1)]
        
        # Mapeia o status para o Frontend entender (Atenção / Operacional)
        df_recent['status'] = df_recent['maintenance_status'].apply(
            lambda x: 'Operacional' if x == 1 else 'Atenção'
        )
        
        return JSONResponse(content=df_recent.to_dict(orient="records"))
    except Exception as e:
        print(f"❌ Erro na rota: {e}")
        return JSONResponse(status_code=500, content={"erro": str(e)})

@app.post("/predict")
async def predict(data: EnergyData):
    # Converte os dados recebidos em DataFrame para o Scikit-Learn
    input_df = pd.DataFrame([data.model_dump()])
    # Realiza a previsão
    prediction = model.predict(input_df)
    return {"previsao": round(float(prediction[0]), 2)}



# ==========================================
# INICIALIZAÇÃO
# ==========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)