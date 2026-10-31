import re
from typing import Tuple, List

class PrivacyShield:
    """
    On-device / In-flight Zero-Knowledge Privacy Redaction Engine.
    Ensures that citizen's sensitive Personally Identifiable Information (PII)
    such as Aadhaar, Mobile, Bank Account, and OTP is masked before processing.
    """
    
    # 12-digit Aadhaar pattern (with spaces, hyphens, or continuous)
    AADHAAR_REGEX = re.compile(r'\b[2-9]{1}[0-9]{3}[\s\-]?[0-9]{4}[\s\-]?[0-9]{4}\b')
    
    # Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9 (with optional +91 or 0)
    MOBILE_REGEX = re.compile(r'(?:\+91[\s\-]?)?(?:\b[6-9][0-9]{4}[\s\-]?[0-9]{5}\b)')
    
    # Indian PAN card (5 letters, 4 digits, 1 letter)
    PAN_REGEX = re.compile(r'\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b', re.IGNORECASE)
    
    # 4 to 6 digit OTP codes preceded by OTP / Code / PIN
    OTP_REGEX = re.compile(r'\b(?:OTP|ઓટીપી|code|કોડ|પિન|pin|password|પાસવર્ડ)(?:\s+(?:is|છે|નંબર))?[\s:]*([0-9]{4,6})\b', re.IGNORECASE)

    # Bank Account numbers: Either explicitly labeled or 11 to 18 continuous digits
    BANK_EXPLICIT_REGEX = re.compile(r'\b(?:A/C|Acct|Account|ખાતા\s*નંબર|ખાતું)[\s:]*([0-9]{9,18})\b', re.IGNORECASE)
    BANK_LONG_DIGITS_REGEX = re.compile(r'\b[0-9]{11,18}\b')

    @classmethod
    def sanitize(cls, text: str) -> Tuple[str, List[str], int]:
        """
        Sanitizes input text by redacting all PII.
        Returns:
            sanitized_text (str)
            redacted_types (List[str])
            redacted_count (int)
        """
        redacted_types = []
        redacted_count = 0
        clean_text = text

        # 1. Mask Aadhaar (12 digits)
        aadhaar_matches = cls.AADHAAR_REGEX.findall(clean_text)
        if aadhaar_matches:
            redacted_types.append("AADHAAR")
            redacted_count += len(aadhaar_matches)
            clean_text = cls.AADHAAR_REGEX.sub("[આધાર નંબર સુરક્ષિત]", clean_text)

        # 2. Mask OTP (4 to 6 digits with label)
        def replace_otp(match):
            nonlocal redacted_count
            redacted_count += 1
            full_match = match.group(0)
            code = match.group(1)
            return full_match.replace(code, "[OTP સુરક્ષિત]")

        if cls.OTP_REGEX.search(clean_text):
            if "OTP" not in redacted_types:
                redacted_types.append("OTP")
            clean_text = cls.OTP_REGEX.sub(replace_otp, clean_text)

        # 3. Mask Explicit Bank Account
        if cls.BANK_EXPLICIT_REGEX.search(clean_text):
            if "BANK_ACCOUNT" not in redacted_types:
                redacted_types.append("BANK_ACCOUNT")
            def replace_explicit_bank(match):
                nonlocal redacted_count
                redacted_count += 1
                return match.group(0).replace(match.group(1), "[બેંક ખાતું સુરક્ષિત]")
            clean_text = cls.BANK_EXPLICIT_REGEX.sub(replace_explicit_bank, clean_text)

        # 4. Mask Mobile Numbers (10 digits starting with 6-9)
        mobile_matches = cls.MOBILE_REGEX.findall(clean_text)
        if mobile_matches:
            redacted_types.append("PHONE_NUMBER")
            redacted_count += len(mobile_matches)
            clean_text = cls.MOBILE_REGEX.sub("[મોબાઈલ નંબર સુરક્ષિત]", clean_text)

        # 5. Mask long unclassified bank numbers (11-18 digits)
        long_matches = cls.BANK_LONG_DIGITS_REGEX.findall(clean_text)
        if long_matches:
            if "BANK_ACCOUNT" not in redacted_types:
                redacted_types.append("BANK_ACCOUNT")
            redacted_count += len(long_matches)
            clean_text = cls.BANK_LONG_DIGITS_REGEX.sub("[બેંક ખાતું સુરક્ષિત]", clean_text)

        # 6. Mask PAN Card
        pan_matches = cls.PAN_REGEX.findall(clean_text)
        if pan_matches:
            redacted_types.append("PAN_CARD")
            redacted_count += len(pan_matches)
            clean_text = cls.PAN_REGEX.sub("[પાન કાર્ડ સુરક્ષિત]", clean_text)

        return clean_text, redacted_types, redacted_count
