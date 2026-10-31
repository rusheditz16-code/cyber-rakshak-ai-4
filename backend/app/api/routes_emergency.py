import json
from pathlib import Path
from fastapi import APIRouter
from app.models.schemas import IncidentReportRequest, ComplaintResponse
from app.core.complaint_generator import ComplaintGenerator

router = APIRouter(prefix="/api/emergency", tags=["Golden Hour Emergency"])
BANK_DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "bank_directory.json"

@router.get("/banks")
def get_bank_directory():
    """Returns directory of rural Gujarat bank freeze hotlines and SMS syntaxes."""
    if not BANK_DATA_PATH.exists():
        return []
    with open(BANK_DATA_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

@router.post("/generate-complaint", response_model=ComplaintResponse)
def generate_complaint(report: IncidentReportRequest):
    """
    Generates a formal bilingual complaint letter ready for submission at
    Gram Panchayat e-Gram centers, cybercrime.gov.in, or local police station.
    """
    return ComplaintGenerator.generate(report)
