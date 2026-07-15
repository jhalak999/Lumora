from uuid import UUID
from sqlalchemy.orm import Session
from app.features.generation.models import Generation
from app.features.generation.repository import GenerationRepository
from app.features.generation.schemas import GenerationCreate

class GenerationService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = GenerationRepository(db)

    def create_generation(
        self,
        project_id: UUID,
        data: GenerationCreate,
    ) -> Generation:

        generation = Generation(
            project_id=project_id,
            type=data.type,
            content=data.content,
            provider=data.provider,
            instruction=data.instruction,
        )
        self.repository.create(generation)
        self.db.commit()
        self.db.refresh(generation)
        return generation

    def latest_generation(
        self,
        project_id: UUID,
    ):
        return self.repository.latest(project_id)
    
    def list_generations(
        self,
        project_id: UUID,
    ):
        return self.repository.get_all_by_project(project_id)
    
    def restore_generation(
        self,
        generation_id: UUID,
    ):
        generation = self.db.get(
            Generation,
            generation_id,
        )
        if generation is None:
            return None
        restored = Generation(
            project_id=generation.project_id,
            type=generation.type,
            content=generation.content,
            provider=generation.provider,
            instruction=f"Restored: {generation.instruction}",
        )
        self.repository.create(restored)
        self.db.commit()
        self.db.refresh(restored)
        return restored