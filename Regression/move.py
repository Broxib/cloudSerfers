import pandas as pd
import numpy as np
from sklearn.linear_model import Ridge
from sklearn.preprocessing import MinMaxScaler

# Load the data from a csv file
data = pd.read_csv('heater_data.csv')

# Prepare the input data (features) and output data (labels)
X = data[['d_temp', 'a_temp']].values
y = data[['h_time', 'Heat_Level']].values

# Normalize the input data
scaler = MinMaxScaler()
X = scaler.fit_transform(X)

# Use Ridge regression with L2 regularization and alpha=1
model = Ridge(alpha=1)
model.fit(X, y)

# Test the model with some example inputs
desired_temp = 28.0
current_temp = 21.0
X_test = scaler.transform(np.array([[desired_temp, current_temp]]))
y_pred = model.predict(X_test)

# Clip the predicted heating level between 0 and 5
predicted_heat_level = int(np.clip(y_pred[0][1], 0, 5))

# Print the predicted results
print(f'For a desired temperature of {desired_temp} and a current temperature of {current_temp}:')
print(f'Estimated heating time: {y_pred[0][0]}')
print(f'Estimated heating level: {predicted_heat_level}')
