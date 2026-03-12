from fastapi import APIRouter
from ml.suggestion import get_ai_suggestion

router = APIRouter()


@router.post("/")
def get_suggestion(data: dict):

    user_data = data.get("user_data")
    question = data.get("question")

    suggestion = get_ai_suggestion(user_data, question)

    return {
        "suggestion": suggestion
    }