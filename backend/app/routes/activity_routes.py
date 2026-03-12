from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.auth import get_current_user
from ml.predict import predict_emission

router = APIRouter()


@router.post("/")
def create_activity(
    activity: schemas.ActivityCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    input_data = {
    "transport_type": activity.transport_type,
    "distance_per_week": activity.distance_per_week,
    "fuel_type": activity.fuel_type,
    "electricity_usage": activity.electricity_usage,
    "flights_per_year": activity.flights_per_year,
    "shopping_frequency": activity.shopping_frequency,
    "waste_generated": activity.waste_generated,
    "diet_type": activity.diet_type
}

    total_emission = predict_emission(input_data)

    new_activity = models.Activity(
        transport_type=activity.transport_type,
        distance_per_week=activity.distance_per_week,
        fuel_type=activity.fuel_type,
        electricity_usage=activity.electricity_usage,
        flights_per_year=activity.flights_per_year,
        shopping_frequency=activity.shopping_frequency,
        waste_generated=activity.waste_generated,
        diet_type=activity.diet_type,
        total_emission=total_emission,
        user_id=current_user.id
    )

    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)

    return {
        "message": "Activity saved successfully",
        "total_emission": total_emission
    }

@router.get("/history")
def get_activity_history(db: Session = Depends(get_db)):
    activities = db.query(models.Activity).all()
    return activities