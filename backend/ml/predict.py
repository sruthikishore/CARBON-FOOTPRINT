import pandas as pd
import joblib
import numpy as np

model = joblib.load("ml/carbon_model.pkl")
columns = joblib.load("ml/model_columns.pkl")

def preprocess_input(data):
    return np.array([[
        data.vehicle_km_month,
        data.tv_pc_hours,
        data.internet_hours,
        data.grocery_bill,
        1 if data.energy_efficiency else 0,
        1 if data.recycling == "yes" else 0,
        data.screen_time
    ]])

def predict_emission(data):
    try:
        features = np.array([[
            data.vehicle_km_month or 0,
            data.tv_pc_hours or 0,
            data.internet_hours or 0,
            1 if data.diet == "non-vegetarian" else 0,
            1 if data.waste_level == "high" else 0
        ]])

        prediction = model.predict(features)[0]
        return float(prediction)

    except Exception as e:
        print("ML prediction error:", e)
        return None