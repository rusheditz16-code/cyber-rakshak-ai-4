from fastapi import APIRouter, HTTPException
from app.models.schemas import ScamCheckRequest, ScamCheckResponse
from app.core.scam_analyzer import scam_analyzer

router = APIRouter(prefix="/api", tags=["Scam Checker"])

@router.post("/check-scam", response_model=ScamCheckResponse)
async def check_scam(req: ScamCheckRequest):
    """
    Analyzes an incoming message or call narrative.
    Applies privacy sanitization, checks patterns, generates risk score and Gujarati voice audio.
    """
    if not req.text or not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    
    result = await scam_analyzer.analyze(req)
    return result
