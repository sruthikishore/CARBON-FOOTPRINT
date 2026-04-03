from fastapi import APIRouter
from ml.suggestion import get_ai_suggestion

router = APIRouter()


@router.post("/")
def get_suggestion(data: dict):
    try:
        suggestion = get_ai_suggestion(data["user_data"], data["question"])
        return {"suggestion": suggestion}
    except Exception as e:
        print("Suggestion error:", e)
        return {"suggestion": "Try reducing transport and electricity usage."}