from fastapi import APIRouter
from ml.predict import predict_emission

router = APIRouter()


@router.post("/predict")
def predict_activity(data: dict):

    emission = predict_emission(data)

    return {
        "predicted_emission": emission
    }