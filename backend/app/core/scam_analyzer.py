import json
from pathlib import Path
from typing import Dict, Any, Optional
from app.core.privacy_shield import PrivacyShield
from app.core.pattern_engine import pattern_engine
from app.core.speech_service import SpeechService
from app.models.schemas import ScamCheckRequest, ScamCheckResponse, PrivacyAuditInfo

BANK_DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "bank_directory.json"

class ScamAnalyzer:
    def __init__(self):
        self.banks = self._load_banks()

    def _load_banks(self):
        if not BANK_DATA_PATH.exists():
            return []
        try:
            with open(BANK_DATA_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    async def analyze(self, req: ScamCheckRequest) -> ScamCheckResponse:
        # Step 1: Zero-Knowledge Privacy Sanitization
        sanitized_text, redacted_types, redacted_count = PrivacyShield.sanitize(req.text)
        
        privacy_audit = PrivacyAuditInfo(
            is_sanitized=redacted_count > 0,
            redacted_items_count=redacted_count,
            redacted_types=redacted_types,
            clean_text=sanitized_text
        )

        # Step 2: Check Scam Signature Patterns
        pattern_match = pattern_engine.match(sanitized_text)

        # Step 3: Determine Risk & Gujarati Explanations
        if pattern_match:
            risk_level = pattern_match.get("risk_level", "HIGH")
            risk_color = "RED" if risk_level == "HIGH" else "AMBER"
            confidence_score = pattern_match.get("match_strength", 85)
            scam_category = pattern_match.get("category")
            scam_name_gu = pattern_match.get("name_gu")
            scam_name_en = pattern_match.get("name_en")
            explanation_gu = pattern_match.get("description_gu")
            warning_gu = pattern_match.get("warning_gu")
            action_plan_gu = pattern_match.get("action_plan_gu")
        else:
            # Check for generic urgency and financial triggers
            lower_txt = sanitized_text.lower()
            urgent_words = ["urgent", "તાત્કાલિક", "જલ્દી", "blocked", "બંધ થશે", "છેલ્લી તક", "કાપી નાખવામાં આવશે"]
            money_words = ["રૂપિયા", "₹", "rs", "ટ્રાન્સફર", "transfer", "ઇનામ", "prize", "lottery"]
            
            has_urgency = any(w in lower_txt for w in urgent_words)
            has_money = any(w in lower_txt for w in money_words)

            if has_urgency and has_money:
                risk_level = "MEDIUM"
                risk_color = "AMBER"
                confidence_score = 65
                scam_category = "SUSPICIOUS_URGENCY"
                scam_name_gu = "શંકાસ્પદ ઉતાવળ અને પૈસાની માંગણી"
                scam_name_en = "Suspicious Urgency & Financial Demand"
                explanation_gu = "આ મેસેજમાં ખૂબ ઉતાવળ કરાવવામાં આવી રહી છે. સાયબર ચોરો હંમેશા લોકોને વિચારવાનો સમય આપ્યા વગર ઉતાવળે નિર્ણય લેવડાવવાનો પ્રયત્ન કરે છે."
                warning_gu = "સાવચેત રહો: કોઈ પણ અજાણી વ્યક્તિના કહેવાથી પૈસા ટ્રાન્સફર કરશો નહીં કે OTP આપશો નહીં."
                action_plan_gu = "૧. કોઈ પણ ઉતાવળિયો નિર્ણય ન લો.\n૨. તમારા નજીકના e-Gram કેન્દ્ર અથવા વિશ્વાસપાત્ર વ્યક્તિ પાસે મેસેજ વંચાવો."
            else:
                risk_level = "SAFE"
                risk_color = "GREEN"
                confidence_score = 90
                scam_category = "SAFE_OR_UNKNOWN"
                scam_name_gu = "કોઈ સીધું જોખમ જણાયું નથી"
                scam_name_en = "No Immediate Threat Detected"
                explanation_gu = "આ મેસેજમાં હાલ જાણીતી કોઈ છેતરપિંડીની પેટર્ન જોવા મળી નથી."
                warning_gu = "તેમ છતાં હંમેશા યાદ રાખો: કોઈને પણ તમારો બેંક પાસવર્ડ કે OTP આપવો નહીં."
                action_plan_gu = "૧. જો કોઈ વ્યક્તિ પૈસા માંગે તો ચકાસણી કર્યા વગર ન આપો.\n૨. શંકા જણાય તો ૧૯૩૦ પર પૂછપરછ કરી શકો છો."

        # Step 4: Golden Hour Emergency Toolkit Activation
        golden_hour_triggered = req.has_lost_money or (req.lost_amount and req.lost_amount > 0)
        emergency_guidance = None

        if golden_hour_triggered:
            risk_level = "HIGH"
            risk_color = "RED"
            emergency_guidance = {
                "helpline": "1930",
                "helpline_name_gu": "રાષ્ટ્રીય સાયબર ક્રાઈમ હેલ્પલાઇન ૧૯૩૦",
                "message_gu": "ગોલ્ડન અવર સક્રિય! તમારા ખાતામાંથી પૈસા કપાયા હોવાથી તરત જ ૧૯૩૦ પર કોલ કરો અથવા નીચે તમારી બેંક પસંદ કરી કાર્ડ ફ્રીઝ કરો.",
                "banks": self.banks
            }

        # Step 5: Generate Spoken Audio in Gujarati
        # We craft a concise, comforting voice summary for the citizen
        if risk_level == "HIGH":
            voice_script = f"ધ્યાન આપો! આ મેસેજ અથવા કોલ એક ગંભીર છેતરપિંડી છે. {warning_gu} {action_plan_gu}"
        elif risk_level == "MEDIUM":
            voice_script = f"સાવચેત રહો! આ મેસેજ શંકાસ્પદ છે. {explanation_gu} {warning_gu}"
        else:
            voice_script = f"આ મેસેજમાં કોઈ સીધું જોખમ મળ્યું નથી. પરંતુ ક્યારેય કોઈને ઓટીપી કે પાસવર્ડ આપશો નહીં."

        if golden_hour_triggered:
            voice_script = f"તાત્કાલિક પગલું ભરો! તમારા ખાતામાંથી પૈસા કપાયા છે. હવે એક પણ મિનિટ બગાડ્યા વગર તરત ૧૯૩૦ પર ફોન કરો અને તમારું બેંક કાર્ડ બ્લોક કરાવો."

        audio_url = await SpeechService.generate_speech_async(voice_script)

        return ScamCheckResponse(
            risk_level=risk_level,
            risk_color=risk_color,
            confidence_score=confidence_score,
            scam_category=scam_category,
            scam_name_gu=scam_name_gu,
            scam_name_en=scam_name_en,
            explanation_gu=explanation_gu,
            warning_gu=warning_gu,
            action_plan_gu=action_plan_gu,
            audio_url=audio_url,
            privacy_audit=privacy_audit,
            golden_hour_triggered=golden_hour_triggered,
            emergency_guidance=emergency_guidance
        )

scam_analyzer = ScamAnalyzer()
