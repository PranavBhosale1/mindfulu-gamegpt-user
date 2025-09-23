# /assessment_engine/backend/router.py

import os
import json
from fastapi import APIRouter, HTTPException
from typing import List

from .service import AssessmentService
from .schemas import UserDemographics, SubmissionPayload, AvailableAssessment

router = APIRouter(
    prefix="/assessment",
    tags=["Assessment Engine"]
)
assessment_service = AssessmentService()

@router.get("/list", response_model=List[AvailableAssessment])
def list_available_assessments():
    """Scans the templates directory and returns a list of available assessments."""
    try:
        templates_dir = assessment_service.templates_dir
        assessment_list = []
        for filename in os.listdir(templates_dir):
            if filename.endswith(".json"):
                assessment_id = filename.replace(".json", "")
                with open(os.path.join(templates_dir, filename), 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    assessment_list.append({
                        "id": assessment_id,
                        "name": data.get("assessmentName", "Unnamed Assessment")
                    })
        return assessment_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list assessments: {e}")

@router.post("/start/{assessment_id}")
def start_assessment_endpoint(assessment_id: str, demographics: UserDemographics):
    """Initializes an assessment, personalizes questions, and sends them to the client."""
    try:
        return assessment_service.start_assessment(assessment_id, demographics.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/submit/{assessment_id}")
def submit_assessment_endpoint(assessment_id: str, submission: SubmissionPayload):
    """Receives user answers and demographics, scores them, and generates a final report."""
    try:
        user_demographics = submission.demographics.model_dump()
        return assessment_service.process_submission(assessment_id, submission.model_dump(), user_demographics)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))