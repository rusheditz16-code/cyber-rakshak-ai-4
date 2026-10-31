import uuid
from datetime import datetime
from app.models.schemas import IncidentReportRequest, ComplaintResponse
from app.core.privacy_shield import PrivacyShield

class ComplaintGenerator:
    @classmethod
    def generate(cls, report: IncidentReportRequest) -> ComplaintResponse:
        complaint_id = f"BOTAD-{uuid.uuid4().hex[:8].upper()}"
        now_str = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

        # Sanitize sensitive numbers if entered in description
        clean_desc, _, _ = PrivacyShield.sanitize(report.description)

        letter_gu = f"""
પ્રતિ,
માનનીય પોલીસ સબ ઇન્સ્પેક્ટરશ્રી / સાયબર ક્રાઈમ સેલ,
જિલ્લા પોલીસ અધિક્ષકની કચેરી - બોટાદ, ગુજરાત.

વિષય: સાયબર છેતરપિંડી અંગે તાત્કાલિક ફરિયાદ અને કાનૂની કાર્યવાહી કરવા બાબત.
સંદર્ભ આઈડી: {complaint_id}
તારીખ: {now_str}

માનનીય સાહેબ,

હું નીચે સહી કરનાર {report.citizen_name}, રહેવાસી ગામ: {report.village or 'બોટાદ જિલ્લો'}, તાલુકો: {report.taluka}, આપ સાહેબને નમ્રપણે અરજી કરું છું કે મારી સાથે સાયબર ક્રાઈમ હેઠળ છેતરપિંડી થયેલ છે.

બનાવની વિગત:
૧. છેતરપિંડીનો પ્રકાર: {report.incident_type}
૨. બનાવની તારીખ/સમય: {now_str}
૩. શંકાસ્પદ વ્યક્તિનો ફોન નંબર: {report.suspect_phone or 'ઉલ્લેખ નથી'}
૪. શંકાસ્પદ લિંક અથવા UPI આઈડી: {report.suspect_url_or_upi or 'ઉલ્લેખ નથી'}
૫. ગુમાવેલ અંદાજિત રકમ: ₹{report.amount_lost or 0:,.2f}
૬. બેંકનું નામ: {report.bank_name or 'લાગુ નથી'}
૭. ટ્રાન્ઝેક્શન આઈડી / સંદર્ભ: {report.transaction_ref or 'ઉલ્લેખ નથી'}

વિગતવાર વર્ણન:
{clean_desc}

મારી નમ્ર અરજી છે કે ઉપરોક્ત શંકાસ્પદ નંબર/ખાતા સામે યોગ્ય તપાસ કરી 'ગોલ્ડન અવર' હેઠળ મારા કપાયેલા નાણાં અટકાવવા (ફ્રીઝ કરવા) અને ગુનેગારો સામે IT Act 2000 તથા BNS અન્વયે કાનૂની પગલાં લેવા વિનંતી છે.

આપનો વિશ્વાસુ,
નામ: {report.citizen_name}
સંપર્ક: {report.contact_number or '[ગોપનીય]'}
તાલુકો: {report.taluka}, જિલ્લો: બોટાદ
        """.strip()

        letter_en = f"""
To,
The Officer-in-Charge, Cyber Crime Cell,
District Police Office, Botad, Gujarat.

Subject: Formal Complaint regarding Cyber Financial Fraud.
Reference ID: {complaint_id}
Date & Time: {now_str}

Respected Sir/Madam,

I, the undersigned {report.citizen_name}, resident of Village: {report.village or 'Botad District'}, Taluka: {report.taluka}, hereby report a cyber fraud incident.

Incident Summary:
1. Incident Category: {report.incident_type}
2. Occurrence Time: {now_str}
3. Suspect Contact Number: {report.suspect_phone or 'N/A'}
4. Suspect UPI ID / Phishing URL: {report.suspect_url_or_upi or 'N/A'}
5. Financial Loss Incurred: INR {report.amount_lost or 0:,.2f}
6. Victim Bank Name: {report.bank_name or 'N/A'}
7. Transaction Reference / UTR: {report.transaction_ref or 'N/A'}

Narrative of Incident:
{clean_desc}

I request your immediate intervention to initiate fund freezing under the Golden Hour protocol on the National Cybercrime Reporting Portal (1930 / cybercrime.gov.in) and take appropriate legal action under the Information Technology Act.

Yours faithfully,
Name: {report.citizen_name}
Contact: {report.contact_number or '[Protected]'}
Taluka: {report.taluka}, Botad District, Gujarat
        """.strip()

        submission_steps_gu = [
            "૧. તરત જ રાષ્ટ્રીય સાયબર હેલ્પલાઇન ૧૯૩૦ પર ફોન કરી ફરિયાદ નોંધાવો.",
            "૨. આ ફરિયાદ પત્રની નકલ લઈ તમારા ગામના e-Gram કેન્દ્ર અથવા નજીકના પોલીસ સ્ટેશન જમા કરાવો.",
            "૩. તમારી બેંકમાં જઈ ટ્રાન્ઝેક્શન ફ્રીઝ ફોર્મ ભરો જેથી પૈસા અટકી જાય."
        ]

        return ComplaintResponse(
            complaint_id=complaint_id,
            generated_at=now_str,
            letter_gu=letter_gu,
            letter_en=letter_en,
            submission_steps_gu=submission_steps_gu,
            helpline_number="1930"
        )
