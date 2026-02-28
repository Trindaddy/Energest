from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import joblib
import pandas as pd

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

@app.post("/predict")
async def predict(data: EnergyData):
    # Converte os dados recebidos em DataFrame para o Scikit-Learn
    input_df = pd.DataFrame([data.model_dump()])
    # Realiza a previsão
    prediction = model.predict(input_df)
    return {"previsao": round(float(prediction[0]), 2)}


@app.get("/api/equipamentos")
async def get_equipamentos():
    try:
        # Lê o CSV gerado pelo modelo
        df = pd.read_csv("app/models/energy_data.csv")
        
        # Pega as últimas 20 linhas para simular os equipamentos atuais
        df_recent = df.tail(20).copy()
        
        # Cria IDs e Nomes fictícios baseados no index para a tabela
        df_recent['id'] = ['MAQ-' + str(i).zfill(3) for i in range(1, 21)]
        df_recent['nome'] = ['Equipamento Industrial ' + str(i) for i in range(1, 21)]
        df_recent['status'] = df_recent['maintenance_status'].apply(lambda x: 'Operacional' if x == 1 else 'Atenção')
        
        # Converte para dicionário e retorna
        return JSONResponse(content=df_recent.to_dict(orient="records"))
    except Exception as e:
        return {"erro": str(e)}

# ==========================================
# INICIALIZAÇÃO
# ==========================================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)