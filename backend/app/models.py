from sqlalchemy import Column, Integer, String, Float, ForeignKey
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

    transport_type = Column(String(50))
    distance_per_week = Column(Float)
    fuel_type = Column(String(50))

    electricity_usage = Column(Float)

    flights_per_year = Column(Integer)
    shopping_frequency = Column(String(50))
    waste_generated = Column(Float)

    diet_type = Column(String(50))

    total_emission = Column(Float)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))

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