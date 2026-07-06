from fastapi import FastAPI

app = FastAPI(
    title="Lumora API",
    version="1.0.0",
)


@app.get("/")
def root():
    return {"message": "Lumora API is running"}