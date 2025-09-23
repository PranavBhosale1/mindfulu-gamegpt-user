# /assessment_engine/backend/service.py

import os
import json
import logging
from typing import Dict, Any, List
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    logger.info("GEMINI_API_KEY loaded successfully. AI personalization enabled.")
else:
    logger.warning("GEMINI_API_KEY not found. AI personalization will be disabled.")

class AssessmentService:
    def __init__(self, templates_dir: str = "backend/templates"):
        self.templates_dir = templates_dir
        self.generation_config = genai.GenerationConfig(temperature=0.0)
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash', generation_config=self.generation_config) if GEMINI_API_KEY else None

    def _load_template(self, assessment_id: str) -> Dict[str, Any]:
        template_path = os.path.join(self.templates_dir, f"{assessment_id}.json")
        try:
            with open(template_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            raise ValueError(f"Assessment '{assessment_id}' does not exist.")
        except json.JSONDecodeError:
            raise ValueError(f"Invalid format for assessment '{assessment_id}'.")

    def _get_age_group(self, age: int) -> str:
        if age <= 17: return "Teenager (School-going)"
        elif 18 <= age <= 22: return "Young Adult (College-going)"
        else: return "Young Professional"

    def _get_batch_personalized_questions(self, questions_to_personalize: List[Dict[str, Any]], user_demographics: Dict[str, Any]) -> Dict[str, str]:
        if not self.gemini_model or not questions_to_personalize:
            logger.info(f"AI personalization skipped. Model available: {self.gemini_model is not None}, Questions to personalize: {len(questions_to_personalize)}")
            return {}

        logger.info(f"Starting AI personalization for {len(questions_to_personalize)} questions")

        prompt_context = {
            "age": user_demographics.get("age"),
            "gender": user_demographics.get("gender"),
            "age_group_context": self._get_age_group(user_demographics.get("age", 18))
        }

        prompt = f"""
You are a highly precise AI model acting as a clinical data processor. Your primary directive is to populate a `{{{{example}}}}` placeholder in a series of clinical questions with culturally relevant context for Indian youth. Precision and adherence to the original text are paramount.

---
**NON-NEGOTIABLE CONSTRAINTS:**

1.  **DO NOT ALTER THE BASE QUESTION:** You MUST NOT alter, rephrase, or add to the base question text in any way. The original text is clinically validated and must remain identical. Your only modification is filling the `{{{{example}}}}` placeholder.
2.  **USE THE PROVIDED CONTEXT:** Use the `ai_context_guide` provided for each question to inform your examples. Generate 1 or 2 concise, age-appropriate examples that fit the theme and user demographics. The final phrase must be under 15 words.
3.  **JSON-ONLY OUTPUT:** Your entire response MUST be a single, valid JSON object and nothing else. Do not include explanations, apologies, or markdown formatting.
4.  **CULTURALLY RELEVANT:** Make examples relevant to Indian youth culture and the user's age group context.

---
**EXAMPLES:**

For a 17-year-old student with theme "Social Connection":
- Input: "That you are 'in tune' with the people around you (for example, {{{{example}}}})?"
- Output: "That you are 'in tune' with the people around you (for example, understanding your classmates' feelings during exams)?"

For a 20-year-old college student with theme "Missing Connection":  
- Input: "That you lack companionship (for example, {{{{example}}}})?"
- Output: "That you lack companionship (for example, eating alone in the hostel mess)?"

---
**TASK:**

**User Demographics:**
{json.dumps(prompt_context)}

**Question Templates to Personalize:**
{json.dumps(questions_to_personalize)}

**Required Output (single JSON object):**"""

        try:
            logger.info("Sending request to Gemini AI...")
            response = self.gemini_model.generate_content(prompt)
            response_text = response.text.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:-3].strip()
            personalized_results = json.loads(response_text)
            logger.info(f"AI personalization successful. Generated {len(personalized_results)} personalized questions")
            return personalized_results
        except Exception as e:
            logger.error(f"Gemini batch API call or parsing failed: {e}. Falling back for all questions.")
            return {}

    def start_assessment(self, assessment_id: str, user_demographics: Dict[str, Any]) -> Dict[str, Any]:
        template = self._load_template(assessment_id)
        all_questions = template.get("questions", [])

        questions_to_personalize = []
        static_questions_map = {}
        for q in all_questions:
            if "ai_context_guide" in q and "text_template" in q:
                questions_to_personalize.append({"questionId": q["questionId"], "text_template": q["text_template"], "ai_context_guide": q["ai_context_guide"]})
            elif "text_static" in q:
                static_questions_map[q["questionId"]] = q["text_static"]
            else:
                static_questions_map[q["questionId"]] = q.get("text_template", "Question text unavailable.")

        personalized_map = self._get_batch_personalized_questions(questions_to_personalize, user_demographics)

        final_question_list = []
        for q in all_questions:
            q_id = q["questionId"]
            # Try personalized text first, then static text, then fallback processing
            text = personalized_map.get(q_id, static_questions_map.get(q_id))
            if text is None:
                # If no personalized or static text, use fallback examples from ai_context_guide
                template_text = q.get("text_template", "")
                ai_guide = q.get("ai_context_guide", {})
                
                if "examples" in ai_guide:
                    # New format: use the first example from the examples string
                    fallback_example = ai_guide["examples"].split(", ")[0]
                    text = template_text.replace("{{example}}", fallback_example)
                elif "student_focus" in ai_guide:
                    # Old format: use student_focus as fallback
                    fallback_example = ai_guide["student_focus"]
                    text = template_text.replace("{{example}}", fallback_example)
                else:
                    # Remove the entire placeholder phrase including surrounding text
                    text = template_text.replace(" (for example, {{example}})?", "?")
                    text = text.replace(" (like {{example}})?", "?")
                    text = text.replace("{{example}}", "")
            final_question_list.append({"questionId": q_id, "text": text, "answerOptions": q.get("answerOptions") or template.get("answerOptions")})

        return {
            "assessmentId": template.get("assessmentId"),
            "assessmentName": template.get("assessmentName"),
            "instructions": template.get("instructions"),
            "timeframe_instruction": template.get("timeframe_instruction"),
            "questions": final_question_list,
            "additional_screening_questions": template.get("additional_screening_questions", [])
        }

    def _calculate_score(self, template: Dict[str, Any], responses: List[Dict[str, Any]]) -> int:
        reverse_scored_ids = {q['questionId'] for q in template.get("questions", []) if q.get("is_reverse_scored")}
        total_score = 0
        answer_options = template.get("answerOptions", [])
        # For reverse scoring, use the maximum value + 1 (e.g., if scale is 0-3, use 4)
        max_value = max([option.get("value", 0) for option in answer_options]) if answer_options else 3
        REVERSE_SCORE_CONSTANT = max_value + 1

        for response in responses:
            question_id = response.get("questionId")
            original_value = int(response.get("selectedValue", 0))
            if question_id in reverse_scored_ids:
                total_score += REVERSE_SCORE_CONSTANT - original_value
            else:
                total_score += original_value
        return total_score

    def _get_interpretation_band(self, template: Dict[str, Any], score: int) -> Dict[str, Any]:
        for band in template.get("scoring_bands", []):
            if band["min"] <= score <= band["max"]:
                return band
        return {"interpretation": "Undetermined", "severity": "Unknown"}

    def _check_escalation_conditions(self, responses: List[Dict[str, Any]]) -> Dict[str, Any]:
        for response in responses:
            if response.get("questionId") == "q9" and response.get("selectedValue", 0) > 0:
                return {"isRequired": True, "note": "Your answer about self-harm suggests it is important to talk to someone immediately. Please reach out to a professional or a helpline."}
        return {"isRequired": False, "note": None}
    
    def _get_personalized_recommendations(self, template: Dict[str, Any], interpretation_band: Dict[str, Any], user_demographics: Dict[str, Any]) -> List[str]:
        severity = interpretation_band.get("severity", "Minimal")
        context_key = self._get_age_group(user_demographics.get("age", 18))
        recommendations = template.get("recommendation_templates", {}).get(severity, {})
        return recommendations.get(context_key, recommendations.get("default", ["Please consider speaking to a professional for guidance."]))

    def process_submission(self, assessment_id: str, submission_payload: Dict[str, Any], user_demographics: Dict[str, Any]) -> Dict[str, Any]:
        template = self._load_template(assessment_id)
        responses = submission_payload.get("responses", [])
        score = self._calculate_score(template, responses)
        interpretation_band = self._get_interpretation_band(template, score)
        escalation = self._check_escalation_conditions(responses)
        recommendations = self._get_personalized_recommendations(template, interpretation_band, user_demographics)

        return {
            "reportId": f"rep_{assessment_id}_{submission_payload.get('userId')}",
            "userId": submission_payload.get("userId"),
            "assessmentId": assessment_id,
            "rawScore": score,
            "interpretation": interpretation_band.get("interpretation"),
            "severity": interpretation_band.get("severity"),
            "personalizedSummary": f"Based on your responses, your score of {score} suggests a {interpretation_band.get('severity', 'Unknown').lower()} level of symptoms.",
            "personalizedRecommendations": recommendations,
            "escalation": escalation
        }