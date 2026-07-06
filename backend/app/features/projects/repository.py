from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.projects.models import Project


class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, project: Project) -> Project:
        self.db.add(project)
        self.db.flush()
        self.db.refresh(project)
        return project

    def get_by_id(self, project_id: UUID) -> Project | None:
        stmt = select(Project).where(Project.id == project_id)
        return self.db.scalar(stmt)

    def get_all_by_user(self, user_id: UUID) -> list[Project]:
        stmt = (
            select(Project)
            .where(Project.user_id == user_id)
            .order_by(Project.created_at.desc())
        )
        return list(self.db.scalars(stmt))

    def delete(self, project: Project) -> None:
        self.db.delete(project)