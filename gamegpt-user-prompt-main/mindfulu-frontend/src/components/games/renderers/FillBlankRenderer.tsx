import React, { useState } from 'react';
import { GameSchema, GameState, GameResults, FillBlankContent, BlankItem } from '@/types/game-schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle2, X, Lightbulb, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FillBlankRendererProps {
  gameSchema: GameSchema;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onComplete: (results: GameResults) => void;
}

export const FillBlankRenderer: React.FC<FillBlankRendererProps> = ({
  gameSchema,
  gameState,
  setGameState,
  onComplete
}) => {
  const content = gameSchema.content as FillBlankContent;
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [answersSubmitted, setAnswersSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Helper to namespace blank state by passage to avoid collisions
  const keyFor = (passageId: string | number, blankId: string) => `${String(passageId)}::${blankId}`;

  const calculateScore = () => {
    let correctCount = 0;
    let totalBlanks = 0;
    
    content.passages.forEach(passage => {
      passage.blanks.forEach(blank => {
        totalBlanks++;
        const k = keyFor(passage.id, blank.id);
        if (answers[k]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase().trim()) {
          correctCount++;
        }
      });
    });
    
    return Math.floor((correctCount / totalBlanks) * gameSchema.scoring.maxScore);
  };

  const getTotalBlanks = () => {
    return content.passages.reduce((total, passage) => total + passage.blanks.length, 0);
  };

  const getCorrectAnswers = () => {
    let correctCount = 0;
    content.passages.forEach(passage => {
      passage.blanks.forEach(blank => {
        const k = keyFor(passage.id, blank.id);
        if (answers[k]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase().trim()) {
          correctCount++;
        }
      });
    });
    return correctCount;
  };

  const handleAnswerChange = (passageId: string | number, blankId: string, value: string) => {
    const k = keyFor(passageId, blankId);
    const newAnswers = { ...answers, [k]: value };
    setAnswers(newAnswers);
    
    // Find the blank to check if answer is correct
    const blank = content.passages
      .flatMap(passage => passage.blanks)
      .find(b => b.id === blankId);
    
    if (blank && value.trim()) {
      const isCorrect = value.toLowerCase().trim() === blank.correctAnswer.toLowerCase().trim();
      if (isCorrect) {
        toast({
          title: "Correct! 🎉",
          description: `Great job! "${blank.correctAnswer}" is the right answer.`,
          duration: 2000,
        });
      }
    }
    
    const newScore = calculateScore();
    setScore(newScore);
    setGameState(prev => ({ ...prev, score: newScore }));
  };

  const toggleHint = (passageId: string | number, blankId: string) => {
    const k = keyFor(passageId, blankId);
    setShowHints(prev => ({ ...prev, [k]: !prev[k] }));
  };

  const handleComplete = () => {
    const finalScore = calculateScore();
    const correctCount = getCorrectAnswers();
    const totalBlanks = getTotalBlanks();
    
    setIsComplete(true);
    setShowResults(true);
    
    // Show completion toast
    if (correctCount === totalBlanks) {
      toast({
        title: "Perfect Score! 🎉",
        description: `Congratulations! You got all ${totalBlanks} answers correct!`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Game Complete! 📚",
        description: `You got ${correctCount} out of ${totalBlanks} answers correct.`,
        duration: 3000,
      });
    }
    
    const results: GameResults = {
      score: finalScore,
      maxScore: gameSchema.scoring.maxScore,
      timeSpent: Math.floor((Date.now() - gameState.startTime) / 1000),
      correctAnswers: correctCount,
      totalQuestions: totalBlanks,
      accuracy: (correctCount / totalBlanks) * 100
    };
    
    setTimeout(() => onComplete(results), 3000);
  };

  const handleSubmitAnswers = () => {
    // Reveal correctness and lock inputs for review, but don't finalize the game yet
    setAnswersSubmitted(true);
    const newScore = calculateScore();
    setScore(newScore);
    setGameState(prev => ({ ...prev, score: newScore }));
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowHints({});
    setIsComplete(false);
    setAnswersSubmitted(false);
    setScore(0);
    setShowResults(false);
    setGameState(prev => ({ ...prev, score: 0 }));
  };

  const isBlankCorrect = (passageId: string | number, blank: BlankItem) => {
    const k = keyFor(passageId, blank.id);
    return answers[k]?.toLowerCase().trim() === blank.correctAnswer.toLowerCase().trim();
  };

  const allBlanksAnswered = () => {
    return content.passages.every(passage =>
      passage.blanks.every(blank => {
        const k = keyFor(passage.id, blank.id);
        return (answers[k]?.trim().length || 0) > 0;
      })
    );
  };

  const renderPassageWithBlanks = (passage: any) => {
    let text = passage.text;
    
    // Convert positions to numbers if they come as strings and sort
    const blanks = passage.blanks.map((blank: BlankItem) => ({
      ...blank,
      position: typeof blank.position === 'string' ? parseInt(blank.position, 10) : blank.position
    })).sort((a: BlankItem, b: BlankItem) => {
      const posA = typeof a.position === 'number' ? a.position : parseInt(String(a.position), 10);
      const posB = typeof b.position === 'number' ? b.position : parseInt(String(b.position), 10);
      return posA - posB;
    });
    
    // Debug: Log the passage structure to understand the data
    console.log('Passage text:', text);
    console.log('Blanks:', blanks.map(b => ({ id: b.id, position: b.position, answer: b.correctAnswer })));
    
    // First, try to detect if the text uses placeholder patterns
    const placeholderPatterns = [
      /\[BLANK\d+\]/gi,     // [BLANK1], [BLANK2], etc.
      /\{BLANK\d+\}/gi,     // {BLANK1}, {BLANK2}, etc.
      /\[blank\d+\]/gi,     // [blank1], [blank2], etc.
      /\{blank\d+\}/gi,     // {blank1}, {blank2}, etc.
      /____+/g,             // ____
      /___+/g,              // ___
      /__+/g,               // __
      /\(\s*\)/g,           // ( )
      /\[\s*\]/g            // [ ]
    ];
    
    let hasPlaceholders = false;
    let placeholderCount = 0;
    let detectedPattern = null;
    
    for (const pattern of placeholderPatterns) {
      const matches = text.match(pattern);
      if (matches && matches.length > 0) {
        hasPlaceholders = true;
        placeholderCount = matches.length;
        detectedPattern = pattern;
        console.log('Detected pattern:', pattern, 'matches:', matches);
        break;
      }
    }
    
    if (hasPlaceholders && placeholderCount === blanks.length) {
      // Use placeholder replacement approach
      let result = text;
      
      // For numbered placeholders like [BLANK1], [BLANK2], we need to map them correctly
      const parts = [];
      
      // Find the pattern that matches
      let matchingPattern = null;
      for (const pattern of placeholderPatterns) {
        const testPattern = new RegExp(pattern.source, pattern.flags);
        if (testPattern.test(result)) {
          matchingPattern = pattern;
          break;
        }
      }
      
      if (matchingPattern) {
        // Create a fresh regex instance for splitting
        const splitPattern = new RegExp(matchingPattern.source, matchingPattern.flags);
        
        // Find all matches first
        const matches = Array.from(text.matchAll(new RegExp(matchingPattern.source, 'g')));
        
        let lastIndex = 0;
        let passageBlankIndex = 0; // Use passage-specific blank index
        
        matches.forEach((match: RegExpMatchArray, index) => {
          const matchStart = match.index ?? 0;
          
          // Add text before this placeholder
          if (matchStart > lastIndex) {
            const textBefore = text.substring(lastIndex, matchStart);
            if (textBefore) {
              parts.push(<span key={`text-${passage.id}-${index}`}>{textBefore}</span>);
            }
          }
          
          // Add blank for this placeholder - use passage-specific blanks only
          if (passageBlankIndex < blanks.length) {
            const blank = blanks[passageBlankIndex];
            const isCorrect = isBlankCorrect(passage.id, blank);
            const inputClassName = showResults 
              ? isCorrect 
                ? 'border-green-500 bg-green-50' 
                : 'border-red-500 bg-red-50'
              : 'border-border';

            parts.push(
              <span key={`blank-${passage.id}-${blank.id}`} className="inline-block relative mx-1 my-1">
                <Input
                  value={answers[keyFor(passage.id, blank.id)] || ''}
                  onChange={(e) => handleAnswerChange(passage.id, blank.id, e.target.value)}
                  disabled={answersSubmitted || isComplete}
                  placeholder="____"
                  className={`w-28 h-8 text-center text-sm ${inputClassName}`}
                />
                {showResults && !isCorrect && (
                  <span className="absolute -bottom-7 left-0 text-xs text-red-600 whitespace-nowrap bg-white px-1 rounded z-10">
                    Answer: {blank.correctAnswer}
                  </span>
                )}
              </span>
            );
            passageBlankIndex++; // Increment passage-specific index
          }
          
          lastIndex = matchStart + (match[0]?.length || 0);
        });
        
        // Add remaining text after the last placeholder
        if (lastIndex < text.length) {
          const remainingText = text.substring(lastIndex);
          if (remainingText) {
            parts.push(<span key={`text-end-${passage.id}`}>{remainingText}</span>);
          }
        }
      }
      
      return parts;
    } else {
      // Fallback: Use position-based approach, but more carefully
      const result = [];
      let currentPosition = 0;
      
      // Sort blanks by position ascending (passage-specific)
      const sortedBlanks = [...blanks].sort((a, b) => {
        const posA = typeof a.position === 'number' ? a.position : parseInt(String(a.position), 10);
        const posB = typeof b.position === 'number' ? b.position : parseInt(String(b.position), 10);
        return posA - posB;
      });
      
      sortedBlanks.forEach((blank, index) => {
        const blankPosition = typeof blank.position === 'number' ? blank.position : parseInt(String(blank.position), 10);
        
        // Add text before this blank
        if (blankPosition > currentPosition) {
          const textBefore = text.substring(currentPosition, blankPosition);
          if (textBefore) {
            result.push(
              <span key={`text-${passage.id}-${index}`}>{textBefore}</span>
            );
          }
        }
        
        // Add the blank input
        const isCorrect = isBlankCorrect(passage.id, blank);
        const inputClassName = showResults 
          ? isCorrect 
            ? 'border-green-500 bg-green-50' 
            : 'border-red-500 bg-red-50'
          : 'border-border';

        result.push(
          <span key={`blank-${passage.id}-${blank.id}`} className="inline-block relative mx-1 my-1">
            <Input
              value={answers[keyFor(passage.id, blank.id)] || ''}
              onChange={(e) => handleAnswerChange(passage.id, blank.id, e.target.value)}
              disabled={answersSubmitted || isComplete}
              placeholder="____"
              className={`w-28 h-8 text-center text-sm ${inputClassName}`}
            />
            {showResults && !isCorrect && (
              <span className="absolute -bottom-7 left-0 text-xs text-red-600 whitespace-nowrap bg-white px-1 rounded z-10">
                Answer: {blank.correctAnswer}
              </span>
            )}
          </span>
        );
        
        currentPosition = blankPosition;
      });
      
      // Add remaining text after the last blank
      if (currentPosition < text.length) {
        const textAfter = text.substring(currentPosition);
        if (textAfter) {
          result.push(
            <span key={`text-end-${passage.id}`}>{textAfter}</span>
          );
        }
      }
      
      return result;
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="pb-4">
          
          <p className="text-muted-foreground text-sm leading-relaxed">{content.instructions}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="px-3 py-1">
                  Score: {answersSubmitted || isComplete ? score : '--'}/{gameSchema.scoring.maxScore}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Answered: {Object.keys(answers).filter(key => answers[key]?.trim()).length}/{getTotalBlanks()}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Correct: {answersSubmitted || isComplete ? getCorrectAnswers() : '--'}/{getTotalBlanks()}
                </Badge>
              </div>
            <Button variant="outline" size="sm" onClick={handleReset} className="shrink-0">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          <Progress value={(Object.keys(answers).filter(key => answers[key]?.trim()).length / getTotalBlanks()) * 100} className="h-3" />
        </CardContent>
      </Card>
      {/* Passages */}
      {content.passages.map((passage, passageIndex) => (
        <Card key={passage.id} className="border-2 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">Passage {passageIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Passage Text with Blanks */}
            <div className="leading-relaxed text-foreground p-6 bg-muted rounded-lg relative min-h-[100px]">
              {renderPassageWithBlanks(passage)}
            </div>

            {/* Blanks List */}
            <div className="space-y-4 pt-4">
              <h4 className="font-semibold text-base">Fill in the blanks:</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {passage.blanks.map((blank, blankIndex) => {
                  const isCorrect = isBlankCorrect(passage.id, blank);
                  return (
                    <div
                      key={blank.id}
                      className={`p-6 rounded-lg border-2 transition-all min-h-[200px] ${
                        showResults
                          ? isCorrect 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-red-500 bg-red-50'
                          : 'border-border bg-background'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          Blank #{blankIndex + 1}
                        </Badge>
                        {showResults && (
                          <>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600" />
                            ) : (
                              <X className="w-5 h-5 text-red-600" />
                            )}
                          </>
                        )}
                      </div>

                      <div className="space-y-4">
                        {blank.options ? (
                          <div className="space-y-2">
                            <p className="text-sm font-medium mb-3">Choose the correct answer:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {blank.options.map((option, optionIndex) => {
                                const isSelected = (answers[keyFor(passage.id, blank.id)] || '') === option;
                                const isCorrectOption = option === blank.correctAnswer;
                                return (
                                  <button
                                    key={optionIndex}
                                    onClick={() => handleAnswerChange(passage.id, blank.id, option)}
                                    disabled={answersSubmitted || isComplete}
                                    className={`p-2 text-sm rounded border-2 transition-all ${
                                      isSelected
                                        ? showResults
                                          ? isCorrectOption
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-red-500 bg-red-50'
                                          : 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                    } ${isComplete ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                  >
                                    {option}
                                    {showResults && isSelected && !isCorrectOption && (
                                      <X className="w-3 h-3 inline-block ml-1 text-red-600" />
                                    )}
                                    {showResults && isSelected && isCorrectOption && (
                                      <CheckCircle2 className="w-3 h-3 inline-block ml-1 text-green-600" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-sm font-medium">Type your answer:</p>
                            <Input
                              value={answers[keyFor(passage.id, blank.id)] || ''}
                              onChange={(e) => handleAnswerChange(passage.id, blank.id, e.target.value)}
                              disabled={answersSubmitted || isComplete}
                              placeholder="Enter your answer..."
                              className={`h-10 ${showResults 
                                ? isCorrect 
                                  ? 'border-green-500 bg-green-50' 
                                  : 'border-red-500 bg-red-50'
                                : ''
                              }`}
                            />
                          </div>
                        )}

                        {/* Hint */}
                        {blank.hint && (
                          <div className="space-y-3 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleHint(passage.id, blank.id)}
                              className="text-xs h-8"
                            >
                              {showHints[keyFor(passage.id, blank.id)] ? <EyeOff className="w-3 h-3 mr-2" /> : <Eye className="w-3 h-3 mr-2" />}
                              {showHints[keyFor(passage.id, blank.id)] ? 'Hide' : 'Show'} Hint
                            </Button>
                            {showHints[keyFor(passage.id, blank.id)] && (
                              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                                <p className="text-blue-800 text-sm flex items-start gap-2">
                                  <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                                  <span>{blank.hint}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Show correct answer if wrong */}
                        {showResults && !isCorrect && (
                          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg mt-3">
                            <p className="text-red-800 text-sm">
                              <strong>Correct answer:</strong> {blank.correctAnswer}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Completion Button */}
      {/* Two-step flow: first check answers, then complete to finalize */}
      {!isComplete && !answersSubmitted && allBlanksAnswered() && (
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6 text-center">
            <Button 
              onClick={handleSubmitAnswers}
              className="w-full h-12 text-lg font-semibold"
            >
              Check Answers
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Submit your answers to reveal correctness. You can review before completing.
            </p>
          </CardContent>
        </Card>
      )}

      {!isComplete && answersSubmitted && (
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6 text-center">
            <Button 
              onClick={handleComplete}
              className="w-full h-12 text-lg font-semibold"
            >
              Complete Fill in the Blanks
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Finish the game and see your final score
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {showResults && (
        <Card className={`border-2 shadow-lg ${getCorrectAnswers() === getTotalBlanks() ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
          <CardContent className="p-8 text-center">
            <h3 className={`text-2xl font-bold mb-4 ${getCorrectAnswers() === getTotalBlanks() ? 'text-green-800' : 'text-orange-800'}`}>
              {getCorrectAnswers() === getTotalBlanks() ? 'Perfect Completion!' : 'Good Work!'}
            </h3>
            <p className={`mb-6 text-base ${getCorrectAnswers() === getTotalBlanks() ? 'text-green-700' : 'text-orange-700'}`}>
              You got {getCorrectAnswers()} out of {getTotalBlanks()} blanks correct.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-white rounded-lg p-4 border-2 border-white/50">
                <div className="font-semibold text-sm text-muted-foreground">Score</div>
                <div className="text-2xl font-bold text-primary mt-1">{score}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-white/50">
                <div className="font-semibold text-sm text-muted-foreground">Correct</div>
                <div className="text-2xl font-bold mt-1">{getCorrectAnswers()}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-white/50">
                <div className="font-semibold text-sm text-muted-foreground">Accuracy</div>
                <div className="text-2xl font-bold mt-1">{Math.round((getCorrectAnswers() / getTotalBlanks()) * 100)}%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FillBlankRenderer;