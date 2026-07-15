from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.features.auth.router import router as auth_router
from app.features.projects.router import router as projects_router
from app.features.ai.router import router as ai_router
from app.features.generation.router import router as generation_router
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(projects_router)
app.include_router(ai_router)
app.include_router(generation_router)
@app.get("/")
def root():
    return {
        "message": "Welcome to Lumora API 🚀",
        "docs": "/docs",
    }