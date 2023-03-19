import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression
import requests
import datetime
import csv
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.preprocessing import MinMaxScaler
# Get the current time

# Load the dataset
data = pd.read_csv('data.csv')
# Prepare the data for training
X = data[['room_temperature', 'outside_temperature', 'room_size', 'time_of_day', 'season']].copy()
X['room_size'] = X['room_size'].astype(str)
y = data['desired_temperature']
# Define the column transformer to one-hot encode the categorical columns
encoder = OneHotEncoder()
transformer = ColumnTransformer(transformers=[('one_hot_encoder', encoder, [2, 3, 4])])
# Fit the column transformer on the training data
transformer.fit(X)

# Transform the training data and convert it to a pandas DataFrame
X_encoded = transformer.transform(X)
X_encoded_df = pd.DataFrame(X_encoded.toarray())

# Concatenate the encoded data with the remaining features
X_train = pd.concat([X_encoded_df, X[['room_temperature', 'outside_temperature']].reset_index(drop=True)], axis=1)

# Convert column names to string data type
X_train.columns = X_train.columns.astype(str)

# Create a Linear Regression model and fit it to the training data
model = LinearRegression()
model.fit(X_train, y)

# Room size categories
room_size_categories = {
    'single': 'A room with one single bed',
    'double': 'A room with one double bed',
    'triple': 'A room with one double bed and one single bed',
    'single studio': 'A room with a single bed and a small living area',
    'double studio': 'A room with a double bed and a small living area'
}

# Sun exposure scale
sun_exposure_scale = {
    1: 'Low sun exposure',
    2: 'Moderate sun exposure',
    3: 'High sun exposure'
}

# Ask the user for input values
room_size = input(f"Enter the size of the room ({', '.join(room_size_categories.keys())}): ")
sun_exposure = int(input(f"Enter the level of sun exposure (1-3), where:\n{sun_exposure_scale[1]} = 1\n{sun_exposure_scale[2]} = 2\n{sun_exposure_scale[3]} = 3\n"))
hours_of_sun_exposure = float(input("Enter the number of hours of sun exposure: ")) # new input for number of hours of sun exposure
# Get room temp
df = pd.read_csv("temperature.csv")
current_temperature = df.iloc[0, 0]
# get outside temp
url = f'https://api.open-meteo.com/v1/forecast?latitude=33.53&longitude=-5.11&hourly=temperature_2m&current_weather=true'
response = requests.get(url)
data = response.json()
outside_temperature = data['current_weather']['temperature']
now = datetime.datetime.now()
hour = now.hour
if hour < 12:
    time_of_day="morning"
else:
    time_of_day="afternoon"
month = now.month
if month in range(3, 6):
    season = "spring"
elif month in range(6, 9):
    season = "summer"
elif month in range(9, 12):
    season = "autumn"
else:
    season = "winter"
# open the CSV file in append mode and write the new row


# Prepare the data for prediction
X_pred = pd.DataFrame([[current_temperature, outside_temperature, room_size, time_of_day, season, hours_of_sun_exposure]], columns=['room_temperature', 'outside_temperature', 'room_size', 'time_of_day', 'season', 'hours_of_sun_exposure'])
# Transform the input data and concatenate with remaining features
X_pred_encoded = transformer.transform(X_pred)
X_pred_encoded_df = pd.DataFrame(X_pred_encoded.toarray())
X_pred_final = pd.concat([X_pred_encoded_df, X_pred[['room_temperature', 'outside_temperature']].reset_index(drop=True)], axis=1)

# Convert column names to string data type
X_pred_final.columns = X_pred_final.columns.astype(str)

# Use the trained model to predict the desired temperature
desired_temperature = model.predict(X_pred_final)

new_row = [room_size, current_temperature, outside_temperature, sun_exposure, hours_of_sun_exposure, time_of_day, season, round(desired_temperature[0], 2)]

with open('data.csv', 'a', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(new_row)
# Display the predicted temperature value
print("The desired temperature that should be displayed is: ", round(desired_temperature[0], 2))    
# Load the data from a csv filedata = pd.read_csv('heater_data.csv')
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
desired_temp = round(desired_temperature[0], 2)
current_temp = outside_temperature
X_test = scaler.transform(np.array([[desired_temp, current_temp]]))
y_pred = model.predict(X_test)
# Clip the predicted heating level between 0 and 5
predicted_heat_level = int(np.clip(y_pred[0][1], 0, 5))

# Print the predicted results
print(f'For a desired temperature of {desired_temp} and a current temperature of {current_temp}:')
print(f'Estimated heating time: {y_pred[0][0]}'+'min')
print(f'Estimated heating level: {predicted_heat_level}')
with open('prediction.csv', mode='a', newline='') as file:
    writer = csv.writer(file)
    writer.writerow([predicted_heat_level])
