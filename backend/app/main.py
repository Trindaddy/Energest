# Adicionar no app/main.py (Backend)
import pandas as pd
from fastapi.responses import JSONResponse

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