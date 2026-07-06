from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.features.auth.schemas import UserCreate
from uuid import UUID

class AuthRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        return self.db.scalar(stmt)

    def get_by_username(self, username: str) -> User | None:
        stmt = select(User).where(User.username == username)
        return self.db.scalar(stmt)

    def get_by_id(self, user_id: str | UUID) -> User | None:

        if isinstance(user_id, str):
            user_id = UUID(user_id)

        stmt = select(User).where(User.id == user_id)

        return self.db.scalar(stmt)

    def create(
        self,
        *,
        email: str,
        username: str,
        full_name: str | None,
        password_hash: str,
    ) -> User:
        user = User(
            email=email,
            username=username,
            full_name=full_name,
            password_hash=password_hash,
        )

        self.db.add(user)
        self.db.flush()
        self.db.refresh(user)

        return user