from fastapi import APIRouter
from .schemas import (
    ScriptGenerateRequest,
    ScriptGenerateResponse,
    ScriptEditRequest,
    ScriptEditResponse,
)
from .service import AIService
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.projects.service import ProjectService
router = APIRouter(
    prefix="/api/v1/ai",
    tags=["AI"],
)

@router.post(
    "/generate-script",
    response_model=ScriptGenerateResponse,
)
def generate_script(
    data: ScriptGenerateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verify the project exists and belongs to the current user
    ProjectService(db).get_project(
        data.project_id,
        current_user,
    )

    service = AIService(db)

    generation = service.generate_script(
        project_id=data.project_id,
        prompt=data.prompt,
    )

    return ScriptGenerateResponse(
        id=generation.id,
        script=generation.content,
    )

@router.post(
    "/edit-script",
    response_model=ScriptEditResponse,
)
def edit_script(
    data: ScriptEditRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Verify the project exists and belongs to the current user
    ProjectService(db).get_project(
        data.project_id,
        current_user,
    )

    service = AIService(db)

    generation = service.edit_script(
        project_id=data.project_id,
        script=data.script,
        instruction=data.instruction,
    )

    return ScriptEditResponse(
        id=generation.id,
        script=generation.content,
    )