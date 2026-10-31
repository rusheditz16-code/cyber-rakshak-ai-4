import json
from pathlib import Path
from fastapi import APIRouter

router = APIRouter(prefix="/api/awareness", tags=["Awareness Hub"])
AWARENESS_FILE = Path(__file__).resolve().parent.parent / "data" / "awareness_stories.json"

@router.get("/content")
def get_awareness_content():
    """Returns rural cyber safety golden rules, audio stories, and quizzes in Gujarati."""
    if not AWARENESS_FILE.exists():
        return {"golden_rules": [], "audio_stories": [], "quiz_questions": []}
    with open(AWARENESS_FILE, "r", encoding="utf-8") as f:
        return json.load(f)
