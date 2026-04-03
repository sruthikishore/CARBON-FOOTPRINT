from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas
from app.auth import get_current_user
from ml.predict import predict_emission
from ml.suggestion import get_ai_suggestion

from app.schemas import ActivityCreate
from app.models import Activity

router = APIRouter()


@router.post("/")
def create_activity(
    data: ActivityCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    predicted = predict_emission(data)

    if predicted is not None:
        total_emission = predicted
    else:
        transport = (data.vehicle_km_month or 0) * 0.02  # realistic value
        electricity = ((data.tv_pc_hours or 0) + (data.internet_hours or 0)) * 0.1
        waste = 5 if data.waste_level == "high" else 2

        total_emission = transport + electricity + waste

    # 💾 Save to DB
    new_activity = Activity(
        user_id=user.id,
        total_emission=total_emission,   # ✅ FIXED
        **data.dict()
    )

    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)

    # 🤖 AI Suggestion
    try:
        suggestion = get_ai_suggestion(data.dict(), total_emission)
    except Exception as e:
        print("Suggestion error:", e)
        suggestion = "Suggestions unavailable"

    return {
        "emission": total_emission,
        "suggestion": suggestion,
        "message": "Activity saved successfully"
    }

@router.get("/history")
def get_activity_history(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    activities = db.query(models.Activity).filter(
        models.Activity.user_id == user.id
    ).all()

    return [
        {
            "date": a.created_at,
            "transport": a.vehicle_km_month,
            "electricity": a.tv_pc_hours,
            "emission": a.total_emission
        }
        for a in activities
    ]