import enum
from sqlalchemy import Enum, ForeignKey, Text, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base
from app.database.mixins import TimestampMixin, UUIDMixin

class GenerationType(str, enum.Enum):
    script = "script"
    voice = "voice"
    video = "video"
class GenerationProvider(str, enum.Enum):
    mock = "mock"
    gemini = "gemini"
    openai = "openai"
    elevenlabs = "elevenlabs"
    runway = "runway"

class GenerationStatus(str, enum.Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"


class Generation(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "generations"

    type: Mapped[GenerationType] = mapped_column(
        Enum(GenerationType)
    )

    status: Mapped[GenerationStatus] = mapped_column(
        Enum(GenerationStatus),
        default=GenerationStatus.completed,
    )

    content: Mapped[str] = mapped_column(Text)

    provider: Mapped[GenerationProvider] = mapped_column(default="gemini")
    instruction: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )
    project_id = mapped_column(
        ForeignKey("projects.id", ondelete="CASCADE"),
        nullable=False,
    )

    project = relationship(
        "Project",
        back_populates="generations",
    )
