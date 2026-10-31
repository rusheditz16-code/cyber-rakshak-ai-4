@echo off
title DDO Botad Cyber Assistant Launcher
echo ========================================================
echo   DDO BOTAD GUJARATI AI CYBER ASSISTANT (PS000196)
echo   Starting Backend (FastAPI) and Frontend (Vite)...
echo ========================================================

start cmd /k "echo Starting Backend on http://127.0.0.1:8000 ... && cd backend && python run_backend.py"
start cmd /k "echo Starting Frontend on http://localhost:5173 ... && cd frontend && npm.cmd run dev"

echo Both services launched!
echo Access the application in your browser at: http://localhost:5173
echo API Docs available at: http://127.0.0.1:8000/docs
pause
