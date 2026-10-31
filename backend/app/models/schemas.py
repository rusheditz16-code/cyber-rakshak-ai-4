from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class ScamCheckRequest(BaseModel):
    text: str = Field(..., description="Message text, call description or transcription in Gujarati/English/Gujlish")
    source_type: Optional[str] = Field("SMS", description="SMS, WHATSAPP, CALL, URL, QR, APK")
    taluka: Optional[str] = Field("BOTAD_HQ", description="Taluka origin: BOTAD_HQ, GADHADA, BARWALA, RANPUR")
    has_lost_money: Optional[bool] = Field(False, description="Whether money has already been deducted")
    lost_amount: Optional[float] = Field(0.0, description="Amount lost in INR if any")

class PrivacyAuditInfo(BaseModel):
    is_sanitized: bool
    redacted_items_count: int
    redacted_types: List[str]
    clean_text: str

class ScamCheckResponse(BaseModel):
    risk_level: str  # HIGH, MEDIUM, SAFE
    risk_color: str  # RED, AMBER, GREEN
    confidence_score: int # 0 to 100
    scam_category: Optional[str] = None
    scam_name_gu: str
    scam_name_en: str
    explanation_gu: str
    warning_gu: str
    action_plan_gu: str
    audio_url: Optional[str] = None
    privacy_audit: PrivacyAuditInfo
    golden_hour_triggered: bool = False
    emergency_guidance: Optional[Dict[str, Any]] = None

class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "gu"
    taluka: Optional[str] = "BOTAD_HQ"

class ChatResponse(BaseModel):
    reply_gu: str
    reply_en: str
    audio_url: Optional[str] = None
    suggested_actions: List[str] = []

class IncidentReportRequest(BaseModel):
    citizen_name: Optional[str] = "અનામી નાગરિક"
    contact_number: Optional[str] = ""
    taluka: str
    village: Optional[str] = ""
    incident_type: str
    description: str
    suspect_phone: Optional[str] = ""
    suspect_url_or_upi: Optional[str] = ""
    amount_lost: Optional[float] = 0.0
    bank_name: Optional[str] = ""
    transaction_ref: Optional[str] = ""

class ComplaintResponse(BaseModel):
    complaint_id: str
    generated_at: str
    letter_gu: str
    letter_en: str
    submission_steps_gu: List[str]
    helpline_number: str = "1930"

class NewPatternRequest(BaseModel):
    category: str
    name_gu: str
    name_en: str
    risk_level: str
    keywords_gu: List[str]
    keywords_en: List[str]
    description_gu: str
    warning_gu: str
    action_plan_gu: str
    severity_score: int = 90

class AdvisoryBroadcastRequest(BaseModel):
    target_taluka: str  # ALL or specific taluka ID
    title_gu: str
    message_gu: str
    severity: str = "HIGH"
