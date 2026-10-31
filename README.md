# બોટાદ સાયબર રક્ષક AI (Botad Cyber Rakshak AI)
### Gujarati-language AI Assistant for Cyber-Fraud Awareness, Scam Checking and Reporting for Rural Citizens
**Problem ID:** PS000196  
**Target Organization:** District Development Office (DDO) - Botad, Gujarat  
**Sector:** Cyber Security & Data Privacy  

---

## 🌟 Project Overview
In rural Gujarat (specifically Botad district's talukas: **Botad, Gadhada, Barwala, and Ranpur**), smartphones and UPI payments have arrived faster than digital cybersecurity awareness. Rural citizens, farmers, women self-help groups (SHGs), and senior citizens are heavily targeted by financial cyber scams:
1. **PGVCL Electricity Disconnection threats**
2. **Fake PM-Kisan / Khedut Sahay subsidy links**
3. **Fake Bank KYC block calls**
4. **Illegal Instant Loan app blackmail**
5. **Fake KBC / Lottery forwards**

**Botad Cyber Rakshak AI** bridges the literacy divide through a **Voice-First, High-Contrast Gujarati AI Assistant** with **Zero-Knowledge Privacy Shielding** and a **1-Tap "Golden Hour" Emergency Response Toolkit**.

---

## 🚀 Key Modules & Capabilities

### 1. Voice-First Scam Verification Engine (સ્કેમ ચકાસણી)
* **Audio Input & Speech-to-Text:** Large pulsing microphone button enables illiterate citizens to speak in colloquial Gujarati/Kathiyawadi.
* **Instant Risk Meter:** High-contrast traffic light verdict (🔴 જોખમી / 🟡 સાવચેત રહો / 🟢 સુરક્ષિત).
* **Spoken Gujarati Audio Explanation:** Integrated neural voice synthesis (`gu-IN-DhwaniNeural`) reads the warning and safety advice aloud.

### 2. Zero-Knowledge Privacy Shield (ડેટા ગોપનીયતા)
* Conforms with the **DPDP Act 2023** data minimization mandate: *"The tool must not collect more personal data than needed."*
* Automatically masks on-the-fly:
  * 12-digit Aadhaar numbers ➔ `[આધાર નંબર સુરક્ષિત]`
  * 10-digit mobile numbers ➔ `[મોબાઈલ નંબર સુરક્ષિત]`
  * Bank Account numbers ➔ `[બેંક ખાતું સુરક્ષિત]`
  * OTPs / PINs ➔ `[OTP સુરક્ષિત]`
  * PAN cards ➔ `[પાન કાર્ડ સુરક્ષિત]`

### 3. Emergency "Golden Hour" Action Kit (ગોલ્ડન અવર મદદ)
* **1-Tap 1930 Call:** Immediate dialer shortcut to the National Cybercrime Reporting Helpline.
* **Rural Bank Freeze Directory:**
  * **Bank of Baroda (BoB):** 1-tap SMS syntax `BLOCK <Last 4 digits>` to `8422009988`.
  * **Saurashtra Gramin Bank (SGB):** Direct rural helpline & SMS freeze.
  * **State Bank of India (SBI):** 1-tap SMS to `567676`.
  * **Union Bank & Central Bank:** Direct freeze numbers.
* **Automated Complaint Generator:** Auto-generates formal bilingual (Gujarati & English) complaint letters ready to print or submit at the local e-Gram center or police station.

### 4. Conversational Voicebot & Awareness Hub (સહાયક અને જાગૃતિ)
* Answers rural cyber safety questions in simple Gujarati.
* 4 Golden Cyber Rules.
* Rural audio case studies (Ramanbhai & Shantaben).
* Interactive 3-question village cyber safety quiz with instant feedback.

### 5. DDO Botad Administrative Dashboard (વહીવટી ડેશબોર્ડ)
* Taluka-level threat hotspots across **Botad, Gadhada, Barwala, and Ranpur**.
* KPI metrics: Citizens reached, estimated funds saved during Golden Hour, active high-risk alerts.
* **Dynamic Scam Pattern Manager:** DDO administration can inject newly emerging scam signatures instantly without code re-deployment.
* **One-Click Advisory Broadcast Generator:** Pushes urgent advisories to Gram Panchayat WhatsApp groups and e-Gram bulletin boards.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS (v4), Lucide Icons |
| **Voice / Speech** | Web Speech API (STT), Microsoft Edge Neural TTS (`gu-IN-DhwaniNeural`) |
| **Backend API** | Python 3.15, FastAPI, Uvicorn, Pydantic |
| **Privacy Engine** | Regex PII Masking & Stream Sanitation |
| **Database/Storage** | Dynamic JSON Pattern Store, Audio Disk Cache |

---

## 🏃 How to Run the Project

### Option A: One-Click Quickstart (Windows)
Double-click `run_project.bat` in the root folder. It starts both the FastAPI backend and Vite frontend automatically!

### Option B: Manual Terminal Execution

#### 1. Start Backend:
```powershell
cd "d:\AI FOR CYBER CRIME\backend"
python run_backend.py
```
Backend runs at: **http://127.0.0.1:8000** (Swagger API Docs at `/docs`)

#### 2. Start Frontend:
```powershell
cd "d:\AI FOR CYBER CRIME\frontend"
npm.cmd run dev
```
Frontend runs at: **http://localhost:5173**

---

## 🎤 Hackathon 2-Minute Presentation Pitch Script
1. **The Hook:** *"Judges, when a farmer in Botad gets an SMS at 9 PM saying 'Your light bill is unpaid, power will be cut tonight', he panics and calls the scammer. Within 5 minutes, his crop money is stolen."*
2. **The Bottleneck:** *"Current portals are in English, text-dense, and villagers lose the critical 2-hour Golden Hour."*
3. **The Live Demo:**
   * Tap the **Microphone** and say: *"મને લાઈટ બિલ કપાઈ જવાનો મેસેજ આયો છે."*
   * Show that **Aadhaar/Phone is masked automatically** (Zero-Knowledge Privacy Shield).
   * Show the **Voice explanation in Gujarati** playing aloud.
   * Click **1-Tap 1930 / Bank Freeze** to show immediate card blockage.
   * Switch to the **DDO Botad Dashboard** to show taluka-level threat analytics.
4. **The Impact:** *"This protects rural wealth, complies with DPDP Act 2023 data minimization, and empowers e-Gram operators across Gujarat."*
