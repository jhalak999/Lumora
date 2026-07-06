from fastapi import FastAPI

from app.core.config import settings
from app.features.auth.router import router as auth_router

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)

app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def root():
    return {
        "message": "Welcome to Lumora API 🚀",
        "docs": "/docs",
    }