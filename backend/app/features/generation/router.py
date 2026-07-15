from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.features.generation.schemas import GenerationResponse
from app.features.generation.service import GenerationService
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.projects.service import ProjectService

router = APIRouter(
    prefix="/api/v1/projects",
    tags=["Generations"],
)


@router.get(
    "/{project_id}/generations/latest",
    response_model=GenerationResponse | None,
)
def get_latest_generation(
    project_id: UUID,
    db: Session = Depends(get_db),
):
    service = GenerationService(db)

    generation = service.latest_generation(project_id)

    if generation is None:
        return None

    return generation

@router.get(
    "/{project_id}/generations",
    response_model=list[GenerationResponse],
)
def list_generations(
    project_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ProjectService(db).get_project(
        project_id,
        current_user,
    )

    service = GenerationService(db)

    return service.list_generations(project_id)

@router.post(
    "/generations/{generation_id}/restore",
    response_model=GenerationResponse,
)
def restore_generation(
    generation_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = GenerationService(db)

    generation = service.restore_generation(
        generation_id,
    )

    if generation is None:
        raise HTTPException(
            status_code=404,
            detail="Generation not found.",
        )

    return generation