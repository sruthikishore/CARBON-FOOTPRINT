import pandas as pd
import joblib

# Load trained model
model = joblib.load("ml/carbon_model.pkl")

# Load feature columns used during training
model_columns = joblib.load("ml/model_columns.pkl")


def predict_emission(input_data):

    # Convert input dictionary to dataframe
    df = pd.DataFrame([input_data])

    # Convert categorical values to dummy variables
    df = pd.get_dummies(df)

    # Align columns with training data
    df = df.reindex(columns=model_columns, fill_value=0)

    # Predict carbon emission
    prediction = model.predict(df)

    return prediction[0]

