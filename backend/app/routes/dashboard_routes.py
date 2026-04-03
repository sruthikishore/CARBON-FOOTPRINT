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

    total_emission = 0
    transport = 0
    electricity = 0
    waste = 0

    for a in activities:

        # 🚗 Transport (simple logic)
        t = (a.vehicle_km_month or 0) * 0.2

        # ⚡ Electricity
        e = ((a.tv_pc_hours or 0) + (a.internet_hours or 0)) * 0.1

        # 🗑 Waste
        w = 5 if a.waste_level == "high" else 2

        total = t + e + w

        total_emission += total
        transport += t
        electricity += e
        waste += w

    breakdown = [
        {"name": "Transport", "value": round(transport, 2)},
        {"name": "Electricity", "value": round(electricity, 2)},
        {"name": "Waste", "value": round(waste, 2)},
    ]

    monthly_trend = [
        {"month": "Jan", "emission": round(total_emission * 0.8, 2)},
        {"month": "Feb", "emission": round(total_emission * 0.9, 2)},
        {"month": "Mar", "emission": round(total_emission, 2)},
    ]

    return {
        "totalEmission": round(total_emission, 2),
        "breakdown": breakdown,
        "monthlyTrend": monthly_trend
    }