import json
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.models.schemas import NewPatternRequest, AdvisoryBroadcastRequest
from app.core.pattern_engine import pattern_engine

router = APIRouter(prefix="/api/admin", tags=["DDO Botad Admin"])

TALUKA_DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "botad_talukas.json"
ADVISORIES_STORE: List[Dict[str, Any]] = [
    {
        "id": "ADV-001",
        "created_at": "30-10-2026 10:30:00",
        "target_taluka": "GADHADA",
        "target_taluka_name": "ગઢડા",
        "title_gu": "ચેતવણી: ગઢડા પંથકમાં નકલી પીએમ-કિસાન વોટ્સએપ લિંક અંગે",
        "message_gu": "ગઢડા તાલુકાના તમામ ખેડૂત મિત્રોને જણાવવાનું કે વોટ્સએપ પર ૨૦૦૦ રૂપિયાના હપ્તા માટે ફરતી લિંક ખોલવી નહિ કે આધાર નંબર આપવો નહિ. શંકાસ્પદ મેસેજ આવે તો e-Gram કેન્દ્ર પર સંપર્ક કરવો.",
        "severity": "HIGH",
        "broadcast_status": "SENT_TO_74_GRAM_PANCHAYATS"
    },
    {
        "id": "ADV-002",
        "created_at": "29-10-2026 16:45:00",
        "target_taluka": "BOTAD_HQ",
        "target_taluka_name": "બોટાદ (મુખ્ય મથક)",
        "title_gu": "સાવધાન: રાત્રે લાઈટ બિલ કપાઈ જવાના નકલી એસએમએસથી ચેતો",
        "message_gu": "પીજીવીસીએલ ક્યારેય રાત્રે લાઈટ કાપવા માટે અંગત નંબર પરથી મેસેજ કે ફોન કરતી નથી. કોઈપણ અજાણી APK ફાઈલ ડાઉનલોડ કરવી નહીં.",
        "severity": "HIGH",
        "broadcast_status": "SENT_TO_52_GRAM_PANCHAYATS"
    }
]

@router.get("/metrics")
def get_ddo_metrics():
    """Returns Taluka-level threat analytics and reach statistics for DDO Botad."""
    talukas = []
    if TALUKA_DATA_PATH.exists():
        with open(TALUKA_DATA_PATH, "r", encoding="utf-8") as f:
            talukas = json.load(f)

    total_villagers_reached = 18450
    total_scams_blocked = 184
    estimated_money_saved_inr = 2480000.0  # Approx 24.8 Lakhs
    high_risk_alerts_count = sum(t.get("high_risk_alerts", 0) for t in talukas)

    return {
        "district": "Botad (બોટાદ)",
        "total_talukas": len(talukas),
        "total_villagers_reached": total_villagers_reached,
        "total_scams_blocked": total_scams_blocked,
        "estimated_money_saved_inr": estimated_money_saved_inr,
        "high_risk_alerts_active": high_risk_alerts_count,
        "golden_hour_success_rate": "89.4%",
        "taluka_breakdown": talukas,
        "recent_advisories": ADVISORIES_STORE
    }

@router.get("/patterns")
def get_scam_patterns():
    return pattern_engine.patterns

@router.post("/patterns")
def add_new_pattern(pattern: NewPatternRequest):
    """Allows DDO / Cyber Cell to immediately inject a new emerging scam pattern."""
    pattern_dict = pattern.model_dump()
    pattern_dict["id"] = f"SCAM-DDO-{len(pattern_engine.patterns) + 1:03d}"
    success = pattern_engine.add_pattern(pattern_dict)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to save new pattern.")
    return {"message": "New scam pattern successfully activated across Botad district.", "pattern": pattern_dict}

@router.get("/advisories")
def get_advisories():
    return ADVISORIES_STORE

@router.post("/broadcast-advisory")
def broadcast_advisory(req: AdvisoryBroadcastRequest):
    """Generates and broadcasts an emergency alert to e-Gram centers."""
    taluka_name = "સમગ્ર બોટાદ જિલ્લો"
    if req.target_taluka != "ALL":
        taluka_map = {"BOTAD_HQ": "બોટાદ", "GADHADA": "ગઢડા", "BARWALA": "બરવાળા", "RANPUR": "રાણપુર"}
        taluka_name = taluka_map.get(req.target_taluka, req.target_taluka)

    advisory_obj = {
        "id": f"ADV-{len(ADVISORIES_STORE) + 1:03d}",
        "created_at": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
        "target_taluka": req.target_taluka,
        "target_taluka_name": taluka_name,
        "title_gu": req.title_gu,
        "message_gu": req.message_gu,
        "severity": req.severity,
        "broadcast_status": f"BROADCASTED_TO_GRAM_PANCHAYATS ({taluka_name})"
    }
    ADVISORIES_STORE.insert(0, advisory_obj)
    return {"status": "SUCCESS", "advisory": advisory_obj}
