from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from app.features.generation.models import (
    GenerationStatus,
    GenerationType,
)

class GenerationCreate(BaseModel):
    type: GenerationType
    content: str
    provider: str = "openai"
    instruction: str | None = None


class GenerationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    type: GenerationType
    status: GenerationStatus
    content: str
    provider: str
    instruction: str | None
    project_id: UUID
    created_at: datetime
    updated_at: datetime