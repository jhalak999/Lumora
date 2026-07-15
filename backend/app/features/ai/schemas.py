from pydantic import BaseModel
from uuid import UUID


class ScriptGenerateRequest(BaseModel):
    project_id: UUID
    prompt: str


class ScriptGenerateResponse(BaseModel):
    id: UUID
    script: str

class ScriptEditRequest(BaseModel):
    project_id: UUID
    script: str
    instruction: str

class ScriptEditResponse(BaseModel):
    id: UUID
    script: str