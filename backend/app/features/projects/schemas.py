from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.features.projects.models import ProjectStatus


class ProjectCreate(BaseModel):
    title: str
    niche: str
    language: str = "English"
    platform: str = "YouTube"


class ProjectUpdate(BaseModel):
    title: str | None = None
    niche: str | None = None
    language: str | None = None
    platform: str | None = None
    status: ProjectStatus | None = None


class ProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    title: str
    niche: str
    language: str
    platform: str
    status: ProjectStatus
    user_id: UUID
    created_at: datetime
    updated_at: datetime