import sys
import os
from pathlib import Path

# Ensure backend directory is in sys.path for Vercel and local runs
BACKEND_DIR = Path(__file__).resolve().parent.parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes_check import router as check_router
from app.api.routes_chat import router as chat_router
from app.api.routes_emergency import router as emergency_router
from app.api.routes_admin import router as admin_router
from app.api.routes_awareness import router as awareness_router
from app.core.speech_service import AUDIO_CACHE_DIR, SpeechService

app = FastAPI(
    title="DDO Botad Gujarati Cyber Assistant API",
    description="Gujarati-language AI assistant for rural cyber fraud awareness, scam checking, and Golden Hour emergency reporting.",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(check_router)
app.include_router(chat_router)
app.include_router(emergency_router)
app.include_router(admin_router)
app.include_router(awareness_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "HEALTHY",
        "district": "Botad, Gujarat",
        "service": "Gujarati Cyber Fraud AI Assistant",
        "version": "1.0.0"
    }

@app.get("/api/audio/{filename}")
def serve_audio(filename: str):
    """Streams synthesized Gujarati neural voice audio files."""
    audio_file = SpeechService.get_audio_file(filename)
    if not audio_file or not audio_file.exists():
        raise HTTPException(status_code=404, detail="Audio file not found or expired.")
    return FileResponse(str(audio_file), media_type="audio/mpeg")

# Mount built frontend static files if available (Single-URL Deployment)
FRONTEND_DIST = Path(__file__).resolve().parent.parent.parent / "frontend" / "dist"

if FRONTEND_DIST.exists():
    app.mount("/assets", StaticFiles(directory=str(FRONTEND_DIST / "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_frontend_spa(full_path: str):
        # Allow API routes to be handled by routers
        if full_path.startswith("api"):
            raise HTTPException(status_code=404, detail="API route not found")
        # Check if direct file exists in dist (e.g. favicon.svg)
        file_path = FRONTEND_DIST / full_path
        if file_path.is_file():
            return FileResponse(str(file_path))
        # Otherwise serve index.html for React SPA client routing
        return FileResponse(str(FRONTEND_DIST / "index.html"))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)
