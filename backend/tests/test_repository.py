from app.core.security import hash_password
from app.database.session import SessionLocal
from app.features.auth.repository import AuthRepository


def main():
    db = SessionLocal()

    repo = AuthRepository(db)

    user = repo.create(
        email="test@test.com",
        username="jhalak",
        full_name="Jhalak Gupta",
        password_hash=hash_password("Password123!"),
    )

    print(user.id)
    print(user.email)

    db.close()


if __name__ == "__main__":
    main()