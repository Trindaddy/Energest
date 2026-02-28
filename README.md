# ⚡ EnerGest - Inteligência Artificial para o Chão de Fábrica

O **EnerGest** é uma plataforma Full-Stack de gestão de energia e monitoramento preditivo industrial. Criado para resolver o desafio de alto consumo e paradas inesperadas em indústrias, o sistema une telemetria simulada em tempo real com um motor de **Machine Learning (Scikit-Learn)** para entregar decisões acionáveis, e não apenas gráficos bonitos.

---

## 🎯 O que o sistema faz?
O sistema atua como o "Cérebro" do gestor de planta:
1. **Monitora:** Exibe o consumo de energia da fábrica pulsando em tempo real.
2. **Controla:** Permite intervenção humana (ações em massa) no maquinário.
3. **Prevê:** A IA analisa dados físicos (temperatura, carga, idade) e prevê o consumo exato da máquina.
4. **Recomenda:** O modelo gera insights dinâmicos, sugerindo mudanças de parâmetros que geram economia financeira direta (What-If Analysis).

---

## 📊 Dicionário de Indicadores (Legendas do Sistema)

Para facilitar a navegação do usuário, o sistema é dividido nos seguintes KPIs e Gráficos principais:

* **Consumo Atual (kWh):** A carga total de energia que a planta está puxando da rede neste exato segundo. Oscila dinamicamente baseada no uso real.
* **Meta Diária (kWh):** O limite teto de consumo estabelecido para evitar multas de ultrapassagem de demanda com a concessionária.
* **Economia Acumulada:** O montante financeiro em Reais (R$) salvo ao longo do mês graças à aprovação das recomendações da IA.
* **Status da Planta:** Diagnóstico geral. Ficará em "Atenção" se o consumo atual se aproximar do limite crítico.
* **Consumo vs Custo Diário:** Gráfico de linhas que cruza o volume de energia gasto com o custo da tarifa variando ao longo do dia (Horário de Ponta vs Fora de Ponta).
* **Distribuição de Carga:** Gráfico de rosca demonstrando quais setores (Ex: Refrigeração, Produção, Iluminação) são os maiores "vilões" de consumo.

---

## 🔄 Fluxo de Funcionamento (Por baixo dos panos)

Para entender como a mágica acontece, aqui está o ciclo de vida do nosso dado:

1. **Geração e Treino (Python):** O backend lê uma base com 500 históricos de máquinas e treina um modelo de Regressão Linear. O "cérebro" é salvo no arquivo `model.pkl`.
2. **Telemetria (FastAPI):** O backend expõe rotas que servem dados das máquinas ativas.
3. **Consumo Front-end (React/Vite):** O painel solicita esses dados e aplica filtros de UX (Glassmorphism, Nomenclaturas Reais).
4. **Ação Preditiva:** O usuário insere parâmetros de uma máquina estressada no simulador e o React envia isso em JSON para o FastAPI.
5. **A Resposta:** O Python processa os dados no `model.pkl` em milissegundos, devolvendo a previsão de consumo exata para o usuário evitar uma quebra ou multa energética.

---

## 🚀 Como rodar o sistema localmente (Play)

Siga os passos abaixo para subir a aplicação completa na sua máquina:

### 1. Subindo o Back-end (Inteligência Artificial)
Abra o seu terminal, navegue até a pasta `backend` e execute:

```bash
# 1. Instale as dependências do Python
pip install fastapi uvicorn pandas scikit-learn pydantic joblib

# 2. Gere os dados e crie o modelo (Cérebro da IA)
python fix_ia.py

# 3. Ligue o servidor FastAPI
uvicorn app.main:app --reload

O servidor ficará rodando em http://127.0.0.1:8000.

2. Subindo o Front-end (Interface React)
Abra um novo terminal, navegue até a pasta raiz do front-end (energest-front) e execute:

Bash
# 1. Instale as dependências do Node (Vite, Recharts, etc)
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
O sistema abrirá automaticamente no seu navegador em http://localhost:5173.

Nota para testes: Acesse a aba "Recomendações IA" e brinque com o Simulador ao Vivo para ver a comunicação com o motor de Machine Learning operando em tempo real!
