// /assessment_engine/frontend/types/assessment.ts

export interface AnswerOption {
  text: string;
  value: any;
}

export interface Question {
  questionId: string;
  text: string;
  answerOptions: AnswerOption[];
}

export interface Assessment {
  assessmentId: string;
  assessmentName: string;
  instructions: string;
  timeframe_instruction: string;
  questions: Question[];
}

export interface UserDemographics {
  userId: string;
  age: number;
  gender: string;
  status: string;
}

export interface SubmissionPayload {
  userId: string;
  responses: {
    questionId: string;
    selectedValue: any;
  }[];
  demographics: UserDemographics;
}

export interface FinalReport {
  reportId: string;
  rawScore: number;
  interpretation: string;
  severity: string;
  personalizedSummary: string;
  personalizedRecommendations: string[];
  escalation: {
    isRequired: boolean;
    note: string | null;
  };
}

export interface AvailableAssessment {
  id: string;
  name: string;
}