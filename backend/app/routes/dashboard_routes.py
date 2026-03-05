from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app import models

router = APIRouter()


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):

    activities = db.query(models.Activity).filter(
        models.Activity.user_id == current_user.id
    ).all()

    if not activities:
        return {
            "totalEmission": 0,
            "breakdown": [],
            "monthlyTrend": []
        }

    total_emission = sum(a.total_emission for a in activities)

    # Simple category split (basic logic)
    breakdown = [
        {"name": "Transport", "value": sum(a.distance_per_week * 0.2 for a in activities)},
        {"name": "Electricity", "value": sum(a.electricity_usage * 0.5 for a in activities)},
        {"name": "Flights", "value": sum(a.flights_per_year * 50 for a in activities)},
        {"name": "Waste", "value": sum(a.waste_generated * 0.3 for a in activities)}
    ]

    # Mock monthly trend for now
    monthly_trend = [
        {"month": "Jan", "emission": total_emission * 0.8},
        {"month": "Feb", "emission": total_emission * 0.9},
        {"month": "Mar", "emission": total_emission}
    ]

    return {
        "totalEmission": total_emission,
        "breakdown": breakdown,
        "monthlyTrend": monthly_trend
    }