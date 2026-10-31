import hashlib
import asyncio
from pathlib import Path
from typing import Optional
import edge_tts

AUDIO_CACHE_DIR = Path(__file__).resolve().parent.parent.parent / "audio_cache"
AUDIO_CACHE_DIR.mkdir(parents=True, exist_ok=True)

class SpeechService:
    """
    Synthesizes Gujarati natural voice speech using edge-tts.
    Provides audio caching to deliver instantaneous voice playback for rural citizens.
    """
    DEFAULT_VOICE = "gu-IN-DhwaniNeural"  # Clear, natural Gujarati female voice
    MALE_VOICE = "gu-IN-NiranjanNeural"

    @classmethod
    async def generate_speech_async(cls, text: str, voice: Optional[str] = None) -> Optional[str]:
        if not text or not text.strip():
            return None
            
        selected_voice = voice or cls.DEFAULT_VOICE
        # Create a hash for the audio filename
        text_hash = hashlib.md5((selected_voice + "_" + text.strip()).encode("utf-8")).hexdigest()
        audio_filename = f"audio_{text_hash}.mp3"
        audio_filepath = AUDIO_CACHE_DIR / audio_filename

        # If already cached, return immediately
        if audio_filepath.exists() and audio_filepath.stat().st_size > 0:
            return f"/api/audio/{audio_filename}"

        try:
            communicate = edge_tts.Communicate(text, selected_voice)
            await communicate.save(str(audio_filepath))
            return f"/api/audio/{audio_filename}"
        except Exception as e:
            print(f"[SpeechService] TTS Generation failed: {e}")
            return None

    @classmethod
    def get_audio_file(cls, filename: str) -> Optional[Path]:
        filepath = AUDIO_CACHE_DIR / filename
        if filepath.exists():
            return filepath
        return None
