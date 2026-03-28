import { useState } from 'react';
import { CheckCircle, XCircle, Star } from 'lucide-react';

interface QuizProps {
  lesson: {
    id: string;
    title: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
    xpReward: number;
  };
  onComplete: (score: number, xpEarned: number) => void;
}

export function Quiz({ lesson, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = lesson.questions[currentQuestion];
  const isLastQuestion = currentQuestion === lesson.questions.length - 1;

  const handleAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, selectedAnswer]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = selectedAnswer === question.correctAnswer ? score + 1 : score;
      const percentage = (finalScore / lesson.questions.length) * 100;
      const xpEarned = Math.round((percentage / 100) * lesson.xpReward);
      onComplete(percentage, xpEarned);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20 p-6 md:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl text-white">{lesson.title}</h2>
          <span className="flex items-center gap-1 text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
            <Star className="w-5 h-5 fill-yellow-400" />
            {lesson.xpReward} XP
          </span>
        </div>
        <div className="flex gap-2">
          {lesson.questions.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index < currentQuestion
                  ? 'bg-green-500 shadow-lg shadow-green-500/50'
                  : index === currentQuestion
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="text-slate-400 text-sm mb-2">
          Question {currentQuestion + 1} of {lesson.questions.length}
        </p>
        <h3 className="text-xl mb-6 text-white">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect
                    ? 'border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20'
                    : showIncorrect
                    ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                    : isSelected
                    ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                    : 'border-slate-700 bg-slate-800 hover:border-cyan-500/50'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white">{option}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-400">
          Score: <span className="text-cyan-400">{score} / {lesson.questions.length}</span>
        </div>
        
        {!showFeedback ? (
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}