import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score
import joblib


data = pd.read_csv("app/models/energy_data.csv")

X = data[["energia"]]
y = data["energia"] 

# Separar treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Treinar modelo
model = LinearRegression()
model.fit(X_train, y_train)

# Avaliar
predictions = model.predict(X_test)

print("MAE:", mean_absolute_error(y_test, predictions))
print("R2:", r2_score(y_test, predictions))

# Salvar modelo
joblib.dump(model, "model.pkl")

print(" Modelo treinado e salvo com sucesso!")

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib


data = pd.read_csv("energy_data.csv")

# 2. Definir Features (X) e Alvo (y)
features = ["temperature", "load_percentage", "operating_hours", "maintenance_status", "machine_age_years"]
X = data[features]
y = data["energy_consumption_kwh"]

# 3. Treinar
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)

# 4 Salvar
joblib.dump(model, "model.pkl")
print("✅ Passo 2: Modelo 'model.pkl' treinado e salvo!")