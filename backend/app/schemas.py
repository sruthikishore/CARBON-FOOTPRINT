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
    vehicle_type: str
    vehicle_km_month: float
    flight_frequency: str

    energy_source: str
    energy_efficiency: bool
    tv_pc_hours: float
    internet_hours: float

    diet: str
    grocery_bill: float
    cooking_method: str

    waste_level: str
    recycling: str

    screen_time: float
    shower_frequency: str