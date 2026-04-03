from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from sqlalchemy.sql import func
from sqlalchemy import DateTime


# ------------------
# USER TABLE
# ------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))
    location = Column(String(100))

    activities = relationship("Activity", back_populates="user")
    goals = relationship("Goal", back_populates="user")


# ------------------
# ACTIVITY TABLE
# ------------------
class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    vehicle_type = Column(String(50))
    vehicle_km_month = Column(Float)
    flight_frequency = Column(String(50))

    energy_source = Column(String(50))
    energy_efficiency = Column(Boolean)
    tv_pc_hours = Column(Float)
    internet_hours = Column(Float)

    diet = Column(String(50))
    grocery_bill = Column(Float)
    cooking_method = Column(String(50))

    waste_level = Column(String(20))
    recycling = Column(String(20))

    screen_time = Column(Float)
    shower_frequency = Column(String(20))

    total_emission = Column(Float, default = 0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="activities")


# ------------------
# GOAL TABLE
# ------------------
class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)

    goal_description = Column(String(255))
    target_reduction = Column(Float)
    progress_percentage = Column(Float)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="goals")