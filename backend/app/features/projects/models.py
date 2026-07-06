import enum

from sqlalchemy import Enum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.database.mixins import TimestampMixin, UUIDMixin


class ProjectStatus(str, enum.Enum):
    draft = "draft"
    generating = "generating"
    completed = "completed"
    failed = "failed"


class Project(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "projects"

    title: Mapped[str] = mapped_column(String(255))
    niche: Mapped[str] = mapped_column(String(100))
    language: Mapped[str] = mapped_column(String(50), default="English")
    platform: Mapped[str] = mapped_column(String(50), default="YouTube")

    status: Mapped[ProjectStatus] = mapped_column(
        Enum(ProjectStatus),
        default=ProjectStatus.draft,
    )

    user_id = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
    )

    user = relationship(
        "User",
        back_populates="projects",
    )