from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.features.projects.models import Project
from app.features.projects.repository import ProjectRepository
from app.features.projects.schemas import (
    ProjectCreate,
    ProjectUpdate,
)


class ProjectService:
    def __init__(self, db: Session):
        self.db = db
        self.repository = ProjectRepository(db)

    def create_project(
        self,
        data: ProjectCreate,
        user: User,
    ) -> Project:

        project = Project(
            title=data.title,
            niche=data.niche,
            language=data.language,
            platform=data.platform,
            user_id=user.id,
        )

        self.repository.create(project)

        self.db.commit()
        self.db.refresh(project)

        return project

    def list_projects(self, user: User):
        return self.repository.get_all_by_user(user.id)

    def get_project(
        self,
        project_id: UUID,
        user: User,
    ) -> Project:

        project = self.repository.get_by_id(project_id)

        if not project or project.user_id != user.id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found",
            )

        return project

    def delete_project(
        self,
        project_id: UUID,
        user: User,
    ):

        project = self.get_project(project_id, user)

        self.repository.delete(project)

        self.db.commit()

    def update_project(
        self,
        project_id: UUID,
        data: ProjectUpdate,
        user: User,
    ) -> Project:

        project = self.get_project(project_id, user)

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(project, key, value)

        self.db.commit()
        self.db.refresh(project)

        return project