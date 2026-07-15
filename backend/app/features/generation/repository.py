from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.features.generation.models import Generation

class GenerationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, generation: Generation) -> Generation:
        self.db.add(generation)
        self.db.flush()
        self.db.refresh(generation)
        return generation

    def get_by_project(
        self,
        project_id: UUID,
    ) -> list[Generation]:
        stmt = (
            select(Generation)
            .where(Generation.project_id == project_id)
            .order_by(Generation.created_at.desc())
        )
        return list(self.db.scalars(stmt))

    def latest(
        self,
        project_id: UUID,
    ) -> Generation | None:
        stmt = (
            select(Generation)
            .where(Generation.project_id == project_id)
            .order_by(Generation.created_at.desc())
            .limit(1)
        )
        return self.db.scalar(stmt)
    
    def get_all_by_project(
        self,
        project_id: UUID,
    ) -> list[Generation]:
        stmt = (
            select(Generation)
            .where(Generation.project_id == project_id)
            .order_by(Generation.created_at.desc())
        )
        return list(self.db.scalars(stmt))