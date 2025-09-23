# /assessment_engine/backend/schemas.py

from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class UserDemographics(BaseModel):
    age: int = Field(..., gt=14, lt=100)
    gender: str
    status: str

class Answer(BaseModel):
    questionId: str
    selectedValue: Any

class SubmissionPayload(BaseModel):
    userId: str
    responses: List[Answer]
    demographics: UserDemographics

class AvailableAssessment(BaseModel):
    id: str
    name: str