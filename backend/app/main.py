
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
import app.models 
from app.routes import auth_routes
from app.routes import activity_routes
from app.routes import dashboard_routes 
from app.routes import prediction_routes
from app.routes import suggestions_routes


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

app.include_router(auth_routes.router, prefix="/api/auth", tags=["Auth"])
app.include_router(activity_routes.router, prefix="/api/activity", tags=["Activity"])
app.include_router(dashboard_routes.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(prediction_routes.router, prefix="/api/predict", tags=["Prediction"])
app.include_router(suggestions_routes.router, prefix="/api/suggestions", tags=["Suggestions"])

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}