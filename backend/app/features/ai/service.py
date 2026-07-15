from sqlalchemy.orm import Session
from app.features.generation.models import GenerationType
from app.features.generation.schemas import GenerationCreate
from app.features.generation.service import GenerationService
from uuid import UUID
from openai import OpenAI
from app.core.config import settings
from fastapi import HTTPException
import traceback
class AIService:
    def __init__(self, db: Session):
        self.generation_service = GenerationService(db)

        self.client = OpenAI(
            api_key=settings.openrouter_api_key,
            base_url="https://openrouter.ai/api/v1",
        )

    def generate_script(
        self,
        project_id: UUID,
        prompt: str,
    ):
        try:
            response = self.client.chat.completions.create(
                model=settings.default_model,
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are an expert scriptwriter. "
                            "Always produce engaging, high-retention scripts."
                        ),
                    },
                    {
                        "role": "user",
                        "content": f"""
            Project Prompt:
            {prompt}
            Return only the finished script.
            """,
                    },
                ],
                temperature=0.8,
            )
            script = response.choices[0].message.content or ""
        except Exception as e:
            print(f"Gemini unavailable: {e}")
            script = f"""
        Hook:
        Imagine if AI wrote your next viral video.
        Body:
        This is a fallback response because the AI provider is temporarily unavailable.
        Prompt:
        {prompt}
        CTA:
        Try again in a minute.
        """
        generation = self.generation_service.create_generation(
            project_id=project_id,
            data=GenerationCreate(
                type=GenerationType.script,
                content=script,
                provider="openai",
                instruction="Initial Generation",
            ),
        )
        return generation

    def edit_script(
        self,
        project_id: UUID,
        script: str,
        instruction: str,
    ):
        response = self.client.chat.completions.create(
            model=settings.default_model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert YouTube Shorts editor. "
                        "Improve scripts while keeping them engaging, "
                        "high-retention and natural."
                    ),
                },
                {
                    "role": "user",
                    "content": f"""
    Current Script:
    {script}
    Editing Instruction:
    {instruction}
    Rewrite the script according to the instruction.
    Return ONLY the edited script.
    """,
                },
            ],
            temperature=0.7,
        )
        edited_script = (
            response.choices[0].message.content
            or script
        )
        generation = self.generation_service.create_generation(
            project_id=project_id,
            data=GenerationCreate(
                type=GenerationType.script,
                content=edited_script,
                provider="openai",
                instruction=instruction,
            ),
        )
        return generation