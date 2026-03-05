from pydantic import BaseModel, EmailStr


# -------- USER SCHEMAS --------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    location: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

    # -------- ACTIVITY SCHEMA --------
class ActivityCreate(BaseModel):
    transport_type: str
    distance_per_week: float
    fuel_type: str
    electricity_usage: float
    flights_per_year: int
    shopping_frequency: str
    waste_generated: float
    diet_type: str