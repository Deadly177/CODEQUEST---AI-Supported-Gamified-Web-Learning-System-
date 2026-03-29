import { useState } from 'react';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

interface LessonPlayerProps {
  lesson: {
    id: string;
    title: string;
    content: {
      type: 'text' | 'code' | 'quiz';
      data: string;
      code?: string;
      options?: string[];
      correctAnswer?: number;
    }[];
    xpReward: number;
  };
  onComplete: (xpEarned: number) => void;
  onBack: () => void;
  onQuizEvaluated?: (result: {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }) => void;
}

export function LessonPlayer({ lesson, onComplete, onBack, onQuizEvaluated }: LessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const step = lesson.content[currentStep];
  const isLastStep = currentStep === lesson.content.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(lesson.xpReward);
    } else {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    if (step.type === 'quiz' && step.options && typeof step.correctAnswer === 'number') {
      onQuizEvaluated?.({
        question: step.data,
        selectedAnswer: step.options[selectedAnswer] ?? 'Unknown',
        correctAnswer: step.options[step.correctAnswer] ?? 'Unknown',
        isCorrect: selectedAnswer === step.correctAnswer
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to course
      </button>

      <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-8 shadow-2xl shadow-cyan-500/20">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-white">{lesson.title}</h2>
            <span className="flex items-center gap-2 text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
              <Sparkles className="w-4 h-4" />
              +{lesson.xpReward} XP
            </span>
          </div>
          
          {/* Progress */}
          <div className="flex gap-1">
            {lesson.content.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {step.type === 'text' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-300 leading-relaxed">{step.data}</p>
            </div>
          )}

          {step.type === 'code' && (
            <div>
              <p className="text-lg text-slate-300 mb-4">{step.data}</p>
              <div className="bg-slate-950 border border-cyan-500/20 rounded-lg p-6 overflow-x-auto">
                <pre className="text-cyan-400">
                  <code>{step.code}</code>
                </pre>
              </div>
            </div>
          )}

          {step.type === 'quiz' && (
            <div>
              <p className="text-lg text-white mb-6">{step.data}</p>
              <div className="space-y-3">
                {step.options?.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === step.correctAnswer;
                  const showCorrect = showFeedback && isCorrect;
                  const showIncorrect = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => !showFeedback && setSelectedAnswer(index)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? 'border-green-500 bg-green-500/10'
                          : showIncorrect
                          ? 'border-red-500 bg-red-500/10'
                          : isSelected
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-slate-700 bg-slate-800 hover:border-cyan-500/50'
                      } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{option}</span>
                        {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={`mt-4 p-4 rounded-lg ${
                  selectedAnswer === step.correctAnswer
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <p className={`text-sm ${
                    selectedAnswer === step.correctAnswer ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAnswer === step.correctAnswer
                      ? '✓ Correct! Well done!'
                      : '✗ Not quite. Try again next time!'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">
            Step {currentStep + 1} of {lesson.content.length}
          </span>

          {step.type === 'quiz' && !showFeedback ? (
            <button
              onClick={handleQuizSubmit}
              disabled={selectedAnswer === null}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30"
            >
              {isLastStep ? 'Complete Lesson' : 'Continue'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
