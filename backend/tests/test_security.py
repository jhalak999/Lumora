from app.core.security import (
    create_access_token,
    decode_token,
    hash_password,
    verify_password,
)


def main():
    password = "Password123!"

    hashed = hash_password(password)

    print("Password:", password)
    print("Hash:", hashed)

    print("Verify:", verify_password(password, hashed))

    token = create_access_token("test-user-id")

    print("\nToken:\n")
    print(token)

    payload = decode_token(token)

    print("\nPayload:")
    print(payload)


if __name__ == "__main__":
    main()