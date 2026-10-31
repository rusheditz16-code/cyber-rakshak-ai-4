// Client-side fallback dataset ensuring Netlify works with Zero Downtime

export const FALLBACK_BANKS = [
  {
    "bank_code": "BOB",
    "bank_name_gu": "બેંક ઓફ બરોડા (Bank of Baroda)",
    "bank_name_en": "Bank of Baroda",
    "toll_free_helpline": "18005700",
    "cyber_fraud_number": "18002584455",
    "sms_block_syntax": "BLOCK <Last 4 digits of Card>",
    "sms_target_number": "8422009988",
    "upi_block_steps_gu": "BOB M-Connect Plus એપમાં જઈ UPI સર્વિસ ડિસેબલ કરો અથવા 18005700 પર ડાયલ કરી 1 દબાવો.",
    "is_primary_rural_bank": true
  },
  {
    "bank_code": "SGB",
    "bank_name_gu": "સૌરાષ્ટ્ર ગ્રામીણ બેંક (Saurashtra Gramin Bank)",
    "bank_name_en": "Saurashtra Gramin Bank",
    "toll_free_helpline": "18002330200",
    "cyber_fraud_number": "02812482421",
    "sms_block_syntax": "BLOCK CARD <Account Number>",
    "sms_target_number": "9223008080",
    "upi_block_steps_gu": "તમારા ગામના બેંક મિત્ર અથવા શાખા પ્રબંધકનો સંપર્ક કરો અને તાત્કાલિક ડેબિટ ફ્રીઝ કરાવો.",
    "is_primary_rural_bank": true
  },
  {
    "bank_code": "SBI",
    "bank_name_gu": "સ્ટેટ બેંક ઓફ ઇન્ડિયા (State Bank of India)",
    "bank_name_en": "State Bank of India",
    "toll_free_helpline": "18001234",
    "cyber_fraud_number": "1800111109",
    "sms_block_syntax": "BLOCK <Last 4 digits of Card>",
    "sms_target_number": "567676",
    "upi_block_steps_gu": "YONO એપ અથવા ટોલ ફ્રી નંબર 18001234 પર કોલ કરીને તરત નેટબેન્કિંગ અને કાર્ડ બ્લોક કરો.",
    "is_primary_rural_bank": true
  },
  {
    "bank_code": "UBI",
    "bank_name_gu": "યુનિયન બેંક ઓફ ઇન્ડિયા (Union Bank of India)",
    "bank_name_en": "Union Bank of India",
    "toll_free_helpline": "1800222244",
    "cyber_fraud_number": "18002082244",
    "sms_block_syntax": "UBLOCK <Last 4 digits of Card>",
    "sms_target_number": "9223008486",
    "upi_block_steps_gu": "યુનિયન બેંક હેલ્પલાઇન 1800222244 પર કોલ કરી તરત કાર્ડ હોલ્ટ કરાવો.",
    "is_primary_rural_bank": false
  }
];

export const FALLBACK_METRICS = {
  "district": "Botad (બોટાદ)",
  "total_talukas": 4,
  "total_villagers_reached": 18450,
  "total_scams_blocked": 184,
  "estimated_money_saved_inr": 2480000.0,
  "high_risk_alerts_active": 45,
  "golden_hour_success_rate": "89.4%",
  "taluka_breakdown": [
    {
      "taluka_id": "BOTAD_HQ",
      "taluka_name_gu": "બોટાદ (મુખ્ય મથક)",
      "taluka_name_en": "Botad",
      "gram_panchayats_count": 52,
      "egram_centers": 52,
      "population_approx": 285000,
      "scam_reports_this_month": 42,
      "high_risk_alerts": 8,
      "top_scam_category": "ELECTRICITY_BILL",
      "risk_index": "MEDIUM"
    },
    {
      "taluka_id": "GADHADA",
      "taluka_name_gu": "ગઢડા",
      "taluka_name_en": "Gadhada",
      "gram_panchayats_count": 74,
      "egram_centers": 74,
      "population_approx": 210000,
      "scam_reports_this_month": 68,
      "high_risk_alerts": 19,
      "top_scam_category": "PM_KISAN_SUBSIDY",
      "risk_index": "HIGH"
    },
    {
      "taluka_id": "BARWALA",
      "taluka_name_gu": "બરવાળા",
      "taluka_name_en": "Barwala",
      "gram_panchayats_count": 31,
      "egram_centers": 31,
      "population_approx": 98000,
      "scam_reports_this_month": 23,
      "high_risk_alerts": 4,
      "top_scam_category": "BANK_KYC_BLOCKED",
      "risk_index": "LOW"
    },
    {
      "taluka_id": "RANPUR",
      "taluka_name_gu": "રાણપુર",
      "taluka_name_en": "Ranpur",
      "gram_panchayats_count": 35,
      "egram_centers": 35,
      "population_approx": 105000,
      "scam_reports_this_month": 51,
      "high_risk_alerts": 14,
      "top_scam_category": "INSTANT_LOAN_APP",
      "risk_index": "HIGH"
    }
  ],
  "recent_advisories": [
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
};

export const FALLBACK_AWARENESS = {
  "golden_rules": [
    {
      "id": "RULE-1",
      "title_gu": "સોનેરી નિયમ ૧: ક્યારેય કોઈને OTP કે પિન ન આપવો",
      "desc_gu": "કોઈ પણ બેંક, અધિકારી કે સરકારી કર્મચારી ક્યારેય ફોન પર ઓટીપી કે પાસવર્ડ માંગતા નથી."
    },
    {
      "id": "RULE-2",
      "title_gu": "સોનેરી નિયમ ૨: પૈસા લેવા માટે ક્યારેય પિન કે QR કોડ સ્કેન ન કરવો",
      "desc_gu": "જો કોઈ કહે કે 'આ ક્યુઆર કોડ સ્કેન કરો અને પિન નાખો એટલે તમારા ખાતામાં ₹૨૫,૦૦૦ જમા થશે' તો તે છેતરપિંડી છે."
    },
    {
      "id": "RULE-3",
      "title_gu": "સોનેરી નિયમ ૩: અજાણી લિંક કે APK ફાઈલ ડાઉનલોડ ન કરવી",
      "desc_gu": "વોટ્સએપ પર આવતી કોઈ પણ .apk ફાઈલ વાસ્તવમાં જાસૂસી સોફ્ટવેર હોય છે."
    },
    {
      "id": "RULE-4",
      "title_gu": "સોનેરી નિયમ ૪: છેતરપિંડી થાય તો 'ગોલ્ડન અવર' માં ૧૯૩૦ પર કોલ કરવો",
      "desc_gu": "જો ખાતામાંથી પૈસા કપાઈ જાય તો ગભરાયા વગર પહેલા ૨ કલાકમાં જ ૧૯૩૦ હેલ્પલાઇન પર કોલ કરવો."
    }
  ],
  "audio_stories": [
    {
      "id": "STORY-1",
      "title_gu": "વાર્તા: રમણભાઈ અને રાત્રે લાઈટ બિલનો નકલી ફોન",
      "character": "રમણભાઈ (બરવાળાના ખેડૂત)",
      "script_gu": "એક દિવસ રાત્રે ૮ વાગ્યે બરવાળાના રમણભાઈને ફોન આવ્યો: 'કાકા, હું PGVCL માંથી બોલું છું, તમારું બિલ બાકી છે એટલે ૯ વાગ્યે લાઈટ કપાશે. બચવું હોય તો આ લિંક પર ₹૧૦ ભરી દો.' રમણભાઈએ સાયબર આસિસ્ટન્ટમાં ચેક કર્યું. આસિસ્ટન્ટે તરત જ ચેતવણી આપી કે આ છેતરપિંડી છે! રમણભાઈના ૫૦ હજાર બચી ગયા!",
      "moral_gu": "લાઈટ બિલની ધમકીથી ક્યારેય ડરવું નહીં, હંમેશા સત્તાવાર કચેરીએ તપાસ કરવી."
    },
    {
      "id": "STORY-2",
      "title_gu": "વાર્તા: શાંતાબેન અને ૨૫ લાખની લોટરીનો વોટ્સએપ મેસેજ",
      "character": "શાંતાબેન (ગઢડા સખી મંડળના સભ્ય)",
      "script_gu": "ગઢડાના શાંતાબેનને વોટ્સએપ પર એક ચમકતો ફોટો આવ્યો: 'મુબારક હો! તમે કૌન બનેગા કરોડપતિમાં ૨૫ લાખ જીતી ગયા છો. પ્રોસેસિંગ ફી ₹૫૦૦૦ જમા કરો.' શાંતાબેને ચેક કર્યું તો આસિસ્ટન્ટે કહ્યું: 'જે લોટરી તમે ક્યારેય લીધી નથી તેમાં જીતી ન શકાય.'",
      "moral_gu": "કોઈ વગર મહેનતે મફતમાં લાખો રૂપિયા આપતું નથી. લાલચ એ છેતરપિંડીનો દરવાજો છે."
    }
  ],
  "quiz_questions": [
    {
      "id": "Q1",
      "question_gu": "જો કોઈ વ્યક્તિ ફોન પર કહે કે 'હું બેંક મેનેજર છું, ખાતું ચાલુ રાખવા OTP આપો', તો તમારે શું કરવું જોઈએ?",
      "options_gu": [
        "તરત જ OTP આપી દેવો",
        "ક્યારેય OTP ન આપવો અને ફોન કાપી નાખવો",
        "પાસબુકનો ફોટો મોકલવો"
      ],
      "correct_index": 1,
      "explanation_gu": "સાચો જવાબ! બેંક ક્યારેય કોઈ પણ ગ્રાહક પાસે ફોન પર OTP માંગતી નથી."
    },
    {
      "id": "Q2",
      "question_gu": "કોઈ વ્યક્તિ તરફથી પૈસા મેળવવા માટે શું Google Pay કે PhonePe નો UPI પિન નાખવો પડે?",
      "options_gu": [
        "હા, પૈસા લેવા પિન નાખવો પડે",
        "ના! પૈસા મેળવવા ક્યારેય UPI પિન નાખવો પડતો નથી",
        "માત્ર સરકારી યોજનામાં જ નાખવો પડે"
      ],
      "correct_index": 1,
      "explanation_gu": "સાચો જવાબ! સોનેરી નિયમ યાદ રાખો: પિન નાખવાથી હંમેશા પૈસા ખાતામાંથી કપાય છે, ક્યારેય જમા થતા નથી."
    },
    {
      "id": "Q3",
      "question_gu": "જો ઓનલાઈન છેતરપિંડીથી તમારા બેંક ખાતામાંથી પૈસા કપાઈ જાય, તો સૌથી પહેલા ક્યા નંબર પર કોલ કરવો?",
      "options_gu": [
        "૧૯૩૦ (1930) સાયબર હેલ્પલાઇન",
        "૧૦૮ (108)",
        "કોઈને ન કહેવું અને રાહ જોવી"
      ],
      "correct_index": 0,
      "explanation_gu": "સાચો જવાબ! ૧૯૩૦ રાષ્ટ્રીય સાયબર હેલ્પલાઇન છે, જેમાં ગોલ્ડન અવરમાં ફોન કરવાથી પૈસા બ્લોક થઈ જાય છે."
    }
  ]
};

// Client-side scam analyzer fallback for static hosting
export function analyzeScamClient(text, taluka, hasLostMoney, lostAmount) {
  const lower = text.toLowerCase();
  
  // Mask PII
  const cleanText = text
    .replace(/\b[2-9]{1}[0-9]{3}[\s\-]?[0-9]{4}[\s\-]?[0-9]{4}\b/g, '[આધાર નંબર સુરક્ષિત]')
    .replace(/(?:\+91[\s\-]?)?(?:\b[6-9][0-9]{4}[\s\-]?[0-9]{5}\b)/g, '[મોબાઈલ નંબર સુરક્ષિત]');

  let scam_name_gu = "કોઈ સીધું જોખમ મળ્યું નથી";
  let scam_name_en = "Safe / Unknown";
  let risk_level = "SAFE";
  let risk_color = "GREEN";
  let confidence_score = 88;
  let warning_gu = "ક્યારેય કોઈને તમારો OTP કે પાસવર્ડ આપવો નહીં.";
  let action_plan_gu = "૧. કોઈ અજાણી વ્યક્તિના કહેવાથી પૈસા ટ્રાન્સફર ન કરો.\n૨. શંકા જણાય તો ૧૯૩૦ પર સંપર્ક કરો.";

  if (lower.includes("લાઈટ") || lower.includes("વીજળી") || lower.includes("pgvcl") || lower.includes("બિલ") || lower.includes(".apk")) {
    scam_name_gu = "વીજળી બિલ કનેક્શન કાપવાનો ફ્રોડ (PGVCL / UGVCL)";
    scam_name_en = "Electricity Disconnection Scam";
    risk_level = "HIGH";
    risk_color = "RED";
    confidence_score = 96;
    warning_gu = "સાવધાન: PGVCL ક્યારેય રાત્રે લાઈટ કાપતી નથી અને કોઈ અધિકારી અંગત નંબર પરથી ફોન કરીને પૈસા કે OTP માંગતા નથી.";
    action_plan_gu = "૧. આપેલા કોઈપણ નંબર પર ફોન ન કરો.\n૨. કોઈપણ APK ફાઈલ ડાઉનલોડ ન કરો.\n૩. અધિકૃત ટોલ-ફ્રી નંબર ૧૯૧૨૨ પર જ સંપર્ક કરો.";
  } else if (lower.includes("કિસાન") || lower.includes("હપ્તો") || lower.includes("2000") || lower.includes("સહાય")) {
    scam_name_gu = "પીએમ કિસાન / ખેડૂત સહાય નકલી લિંક ફ્રોડ";
    scam_name_en = "Fake PM-Kisan Subsidy Link";
    risk_level = "HIGH";
    risk_color = "RED";
    confidence_score = 94;
    warning_gu = "સાવધાન: સરકારી સહાય હંમેશા તમારા બેંક ખાતામાં DBT દ્વારા સીધી જમા થાય છે. વોટ્સએપ લિંક પર પૈસા મળતા નથી.";
    action_plan_gu = "૧. લિંક પર ક્લિક કરી આધાર નંબર કે ઓટીપી આપશો નહીં.\n૨. તમારા ગામના e-Gram કેન્દ્ર પર જઈને જ તપાસ કરો.";
  } else if (lower.includes("kyc") || lower.includes("ઓટીપી") || lower.includes("બ્લોક") || lower.includes("મેનેજર")) {
    scam_name_gu = "નકલી બેંક KYC / ખાતું બ્લોક થવાની ધમકી";
    scam_name_en = "Fake Bank KYC / Account Blocked Call";
    risk_level = "HIGH";
    risk_color = "RED";
    confidence_score = 98;
    warning_gu = "સાવધાન: કોઈ પણ બેંક કે મેનેજર ક્યારેય ગ્રાહક પાસે ફોન પર પાસવર્ડ કે OTP માંગતા નથી.";
    action_plan_gu = "૧. ફોન તરત જ કાપી નાખો.\n૨. કોઈને પણ ૬ આંકડાનો OTP આપશો નહીં.\n૩. તમારી બેંક શાખાએ રૂબરૂ જઈ તપાસ કરો.";
  } else if (lower.includes("લોટરી") || lower.includes("ઇનામ") || lower.includes("25 લાખ") || lower.includes("kbc")) {
    scam_name_gu = "નકલી KBC / લોટરી / કાર જીતવાનો ફ્રોડ";
    scam_name_en = "Fake Lottery Scam";
    risk_level = "HIGH";
    risk_color = "RED";
    confidence_score = 92;
    warning_gu = "સાવધાન: જે લોટરીમાં તમે ક્યારેય ભાગ નથી લીધો, તેમાં જીતી શકાય નહીં. ઇનામ મેળવવા ક્યારેય પૈસા ભરવાના હોતા નથી.";
    action_plan_gu = "૧. એક પણ રૂપિયો ટ્રાન્સફર કરશો નહીં.\n૨. તે વોટ્સએપ નંબરને તરત બ્લોક કરો.";
  }

  const golden_hour_triggered = hasLostMoney || (lostAmount && lostAmount > 0);

  return {
    risk_level,
    risk_color,
    confidence_score,
    scam_name_gu,
    scam_name_en,
    explanation_gu: "સાયબર ગુનેગારો ગ્રામીણ નાગરિકોને ડરાવીને અથવા લાલચ આપીને છેતરવાનો પ્રયાસ કરે છે.",
    warning_gu,
    action_plan_gu,
    audio_url: null,
    speech_text: `${warning_gu} ${action_plan_gu}`,
    privacy_audit: {
      is_sanitized: cleanText !== text,
      redacted_items_count: cleanText !== text ? 1 : 0,
      redacted_types: ["PHONE/AADHAAR"],
      clean_text: cleanText
    },
    golden_hour_triggered
  };
}
