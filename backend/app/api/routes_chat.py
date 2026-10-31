from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse
from app.core.speech_service import SpeechService
from app.core.privacy_shield import PrivacyShield

router = APIRouter(prefix="/api", tags=["Chatbot"])

FAQ_KNOWLEDGE_BASE = [
    {
        "keywords": ["otp", "ઓટીપી", "બેંક", "મેનેજર", "પાસવર્ડ"],
        "reply_gu": "નમસ્તે કાકા/બેન. સોનેરી નિયમ યાદ રાખો: કોઈ પણ બેંક કે સરકારી અધિકારી ક્યારેય ફોન પર OTP કે પાસવર્ડ માંગતા નથી. જો કોઈ માંગે તો તે છેતરપિંડી છે, તરત ફોન કાપી નાખો.",
        "reply_en": "Remember the golden rule: No bank or government official ever asks for OTP or passwords over a phone call. If anyone asks, it is 100% fraud.",
        "actions": ["ફોન કાપી નાખો", "કોઈને OTP ન આપવો"]
    },
    {
        "keywords": ["લાઈટ બિલ", "વીજળી", "pgvcl", "કનેક્શન", "કાપી નાખશે"],
        "reply_gu": "ગભરાશો નહીં. પીજીવીસીએલ ક્યારેય રાત્રે લાઈટ કાપવા માટે અંગત નંબર પરથી મેસેજ કે ફોન કરતી નથી. કોઈ અજાણી લિંક કે APK ફાઈલ ડાઉનલોડ કરશો નહીં. અધિકૃત ટોલ ફ્રી ૧૯૧૨૨ પર જ સંપર્ક કરો.",
        "reply_en": "Do not panic. PGVCL never sends messages from personal mobile numbers threatening to disconnect power at night. Do not download any APK.",
        "actions": ["19122 પર પૂછપરછ કરો", "APK ઇન્સ્ટોલ ન કરવી"]
    },
    {
        "keywords": ["પીએમ કિસાન", "સહાય", "2000", "હપ્તો", "ખેડૂત"],
        "reply_gu": "પીએમ કિસાન યોજનાના પૈસા સરકાર સીધા તમારા બેંક ખાતામાં DBT થી જમા કરે છે. વોટ્સએપ પર આવતી કોઈ પણ લિંક પર ક્લિક કરીને આધાર નંબર નાખશો નહીં. તમારા ગામના e-Gram કેન્દ્ર પર જઈને જ સ્ટેટસ ચેક કરો.",
        "reply_en": "Government PM-Kisan subsidy is credited directly via DBT to your bank account. Never enter Aadhaar on random WhatsApp links. Check status only at your village e-Gram center.",
        "actions": ["e-Gram કેન્દ્ર પર જાઓ", "pmkisan.gov.in તપાસો"]
    },
    {
        "keywords": ["લોટરી", "25 લાખ", "ઇનામ", "કાર", "જીત્યા"],
        "reply_gu": "આ ૧૦૦% ખોટું છે! જે લોટરી કે હરીફાઈમાં તમે ક્યારેય ભાગ જ નથી લીધો, તેમાં પૈસા જીતી શકાય નહીં. ઇનામ લેવા માટે ક્યારેય કોઈને પ્રોસેસિંગ ફી કે ટેક્સના નામે પૈસા મોકલશો નહીં.",
        "reply_en": "This is 100% fake! You cannot win a lottery you never entered. Never transfer processing fees or taxes to claim a prize.",
        "actions": ["નંબર બ્લોક કરો", "પૈસા ન મોકલો"]
    },
    {
        "keywords": ["પૈસા કપાઈ ગયા", "રૂપિયા ગયા", "ચોરી", "ફ્રોડ થયો"],
        "reply_gu": "તાત્કાલિક ગોલ્ડન અવર પગલું ભરો! ૧ મિનિટ પણ બગાડ્યા વગર ૧૯૩૦ પર કોલ કરો જેથી પોલીસ તમારા પૈસા સ્કેમરના ખાતામાં સીલ કરી શકે. સાથે તમારી બેંકમાં ફોન કરી એટીએમ કાર્ડ અને ખાતું ફ્રીઝ કરાવો.",
        "reply_en": "Act immediately within the Golden Hour! Dial 1930 without delay so the police can freeze the stolen money, and block your ATM card.",
        "actions": ["1930 ડાયલ કરો", "બેંક કાર્ડ ફ્રીઝ કરો"]
    }
]

@router.post("/chat", response_model=ChatResponse)
async def chat_assistant(req: ChatRequest):
    # Sanitize user query
    clean_msg, _, _ = PrivacyShield.sanitize(req.message)
    clean_lower = clean_msg.lower()

    # Find closest match from knowledge base
    matched_entry = None
    for item in FAQ_KNOWLEDGE_BASE:
        for kw in item["keywords"]:
            if kw in clean_lower:
                matched_entry = item
                break
        if matched_entry:
            break

    if matched_entry:
        reply_gu = matched_entry["reply_gu"]
        reply_en = matched_entry["reply_en"]
        actions = matched_entry["actions"]
    else:
        reply_gu = "હું તમારો બોટાદ સાયબર રક્ષક મિત્ર છું. તમે મને કોઈપણ શંકાસ્પદ મેસેજ, ફોન કોલ, લાઈટ બિલ કે સરકારી યોજનાની લિંક વિશે પૂછી શકો છો. યાદ રાખો: ક્યારેય કોઈને OTP કે બેંક પાસવર્ડ આપવો નહીં."
        reply_en = "I am your Botad Cyber Guard Assistant. You can ask me about any suspicious SMS, call, power bill or scheme link. Remember: Never share OTP or passwords."
        actions = ["1930 હેલ્પલાઇન", "સ્કેમ ચકાસો"]

    audio_url = await SpeechService.generate_speech_async(reply_gu)

    return ChatResponse(
        reply_gu=reply_gu,
        reply_en=reply_en,
        audio_url=audio_url,
        suggested_actions=actions
    )
