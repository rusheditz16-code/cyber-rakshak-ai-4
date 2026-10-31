import json
import re
from pathlib import Path
from typing import Dict, Any, List, Optional

DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "scam_patterns.json"

class PatternEngine:
    def __init__(self, data_file: Path = DATA_PATH):
        self.data_file = data_file
        self.patterns = self._load_patterns()

    def _load_patterns(self) -> List[Dict[str, Any]]:
        if not self.data_file.exists():
            return []
        try:
            with open(self.data_file, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def reload(self):
        self.patterns = self._load_patterns()

    def add_pattern(self, new_pattern: Dict[str, Any]) -> bool:
        """Dynamically add a new scam pattern from DDO Admin"""
        self.patterns.insert(0, new_pattern)
        try:
            with open(self.data_file, "w", encoding="utf-8") as f:
                json.dump(self.patterns, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"Error saving pattern: {e}")
            return False

    def match(self, text: str) -> Optional[Dict[str, Any]]:
        """
        Scans text for known scam patterns and returns the highest matching signature.
        """
        text_lower = text.lower()
        best_match = None
        max_matches = 0

        # Check for suspicious URLs or APKs
        has_apk = bool(re.search(r'\b[\w\-]+\.apk\b', text_lower) or ".apk" in text_lower)
        has_suspicious_tld = bool(re.search(r'\bhttps?://[^\s]+(?:\.xyz|\.top|\.club|\.online|\.buzz|\.icu|\.cc|\.work)\b', text_lower))
        has_generic_link = bool(re.search(r'https?://[^\s]+', text_lower) or "bit.ly" in text_lower or "tinyurl" in text_lower)

        for pattern in self.patterns:
            matches_count = 0
            
            # Check Gujarati keywords
            for kw in pattern.get("keywords_gu", []):
                if kw.lower() in text_lower:
                    matches_count += 2  # Gujarati keywords have higher weight
            
            # Check English/Gujlish keywords
            for kw in pattern.get("keywords_en", []):
                if kw.lower() in text_lower:
                    matches_count += 1

            if matches_count > max_matches:
                max_matches = matches_count
                best_match = pattern

        if best_match and max_matches >= 2:
            result = dict(best_match)
            result["match_strength"] = min(100, max_matches * 25)
            if has_apk:
                result["has_apk"] = True
                result["match_strength"] = min(100, result["match_strength"] + 20)
            if has_suspicious_tld:
                result["has_suspicious_tld"] = True
                result["match_strength"] = min(100, result["match_strength"] + 20)
            return result

        # If has APK or suspicious link, trigger high risk even without specific category
        if has_apk or has_suspicious_tld:
            return {
                "id": "SCAM-GENERIC-LINK-APK",
                "category": "MALICIOUS_LINK_OR_APK",
                "name_gu": "જોખમી એપ્લિકેશન (.APK) અથવા નકલી લિંક",
                "name_en": "Malicious APK or Phishing Link Detected",
                "risk_level": "HIGH",
                "description_gu": "આ મેસેજમાં અજાણી APK ફાઈલ અથવા શંકાસ્પદ લિંક છે જે તમારા મોબાઈલમાંથી બેંકિંગ પાસવર્ડ અને OTP ચોરી શકે છે.",
                "warning_gu": "સાવધાન: વોટ્સએપ પર આવતી કોઈ પણ APK ફાઇલ ક્યારેય ઇન્સ્ટોલ કરશો નહીં.",
                "action_plan_gu": "૧. ફાઈલ ડાઉનલોડ કરશો નહીં.\n૨. લિંક પર ક્લિક ન કરો અને મેસેજ ડિલીટ કરો.",
                "recommended_action": "DO_NOT_INSTALL",
                "severity_score": 95,
                "match_strength": 90,
                "has_apk": has_apk,
                "has_suspicious_tld": has_suspicious_tld
            }

        return None

pattern_engine = PatternEngine()
