import { useState, useCallback } from 'react';
import * as api from '../services/api';
import { Assessment, FinalReport, UserDemographics, SubmissionPayload } from '../types/assessment';

export const useAssessment = () => {
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [report, setReport] = useState<FinalReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDemographics, setUserDemographics] = useState<UserDemographics | null>(null);

  const startAssessment = useCallback(async (demographics: UserDemographics) => {
    if (!assessmentId) {
      console.error("startAssessment called without an assessmentId.");
      return;
    }
    try {
      setIsLoading(true);
      setUserDemographics(demographics);
      setAssessment(null);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setReport(null);
      const assessmentData = await api.startAssessment(assessmentId, demographics);
      setAssessment(assessmentData);
    } catch (error) {
      console.error('Error starting assessment:', error);
    } finally {
      setIsLoading(false);
    }
  }, [assessmentId]);

  const handleAnswer = useCallback(async (questionId: string, value: any) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    const isLastQuestion = currentQuestionIndex === (assessment?.questions.length ?? 0) - 1;
    if (isLastQuestion) {
      if (!userDemographics || !assessmentId) {
        console.error('Cannot submit: Missing demographics or assessmentId.');
        return;
      }
      try {
        setIsLoading(true);
        const submissionPayload: SubmissionPayload = {
          userId: userDemographics.userId,
          responses: Object.entries(newAnswers).map(([qId, val]) => ({ questionId: qId, selectedValue: val })),
          demographics: userDemographics,
        };
        const finalReport = await api.submitAssessment(assessmentId, submissionPayload);
        setReport(finalReport);
      } catch (error) {
        console.error('Error submitting assessment:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [answers, currentQuestionIndex, assessment, assessmentId, userDemographics]);

  const resetAssessment = useCallback(() => {
    setAssessmentId(null);
    setAssessment(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setReport(null);
    setIsLoading(false);
    setUserDemographics(null);
  }, []);

  return {
    assessment,
    report,
    isLoading,
    startAssessment,
    handleAnswer,
    setAssessmentId,
    resetAssessment,
    currentQuestion: assessment?.questions[currentQuestionIndex],
    currentQuestionIndex,
    totalQuestions: assessment?.questions.length ?? 0,
  };
};