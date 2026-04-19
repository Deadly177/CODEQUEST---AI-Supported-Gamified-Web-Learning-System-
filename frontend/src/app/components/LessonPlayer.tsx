import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Bot, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Sparkles, Trophy, X, Zap } from 'lucide-react';
import type { LessonDefinition, LessonStep } from '../lessonTypes';

interface LessonPlayerProps {
  lesson: LessonDefinition;
  onComplete: (xpEarned: number) => void | Promise<void>;
  onBack: () => void;
  userStats?: {
    name: string;
    streak: number;
    totalPoints: number;
  };
  leaderboardEntries?: {
    rank: number;
    name: string;
    xp: number;
    level: number;
    avatar: string;
  }[];
  onExplainRequest?: (prompt: string) => void;
  onQuizEvaluated?: (result: {
    question: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }) => void;
}

function normalizeMarkup(value: string) {
  return value.replace(/\s+/g, ' ').trim().toLowerCase();
}

function getLessonStorageKey(lessonId: string) {
  return `codequest_lesson_state:v4:${lessonId}`;
}

function getChipWidth(value: string) {
  const typed = value.trim();
  if (!typed) {
    // Keep all empty blanks visually identical so answer length is not revealed.
    return '2.2rem';
  }

  return `${Math.max(2.2, typed.length * 0.72 + 1.1)}rem`;
}

function buildChipKey(value: string, index: number) {
  return `${value}::${index}`;
}

function renderHighlightedText(text: string) {
  return text.split('\n').map((line, lineIndex) => (
    <span key={`line-${lineIndex}`}>
      {line.split(/(`[^`]+`)/g).map((part, partIndex) => {
        const isHighlighted = part.startsWith('`') && part.endsWith('`');
        const content = isHighlighted ? part.slice(1, -1) : part;

        return isHighlighted ? (
          <span
            key={`part-${lineIndex}-${partIndex}`}
            className="rounded-lg bg-[#94aaff]/14 px-2 py-0.5 font-semibold text-[#d8e0ff]"
          >
            {content}
          </span>
        ) : (
          <span key={`part-${lineIndex}-${partIndex}`}>{content}</span>
        );
      })}
      {lineIndex < text.split('\n').length - 1 ? <br /> : null}
    </span>
  ));
}

function isHtmlLikeSnippet(value: string) {
  const trimmed = value.trim();
  return /^<\/?[a-zA-Z][^>]*>$/.test(trimmed);
}

function renderCodeText(text: string, keyPrefix: string) {
  const tagRegex = /(<\/?[^>\n]+>)/g;

  return text.split('\n').map((line, lineIndex, lines) => (
    <span key={`${keyPrefix}-line-${lineIndex}`}>
      {line.split(tagRegex).filter(Boolean).map((part, partIndex) =>
        isHtmlLikeSnippet(part) ? (
          <span key={`${keyPrefix}-tag-${lineIndex}-${partIndex}`} className="text-[#8eb8ff]">
            {part}
          </span>
        ) : (
          <span key={`${keyPrefix}-text-${lineIndex}-${partIndex}`} className="text-[#f3f6ff]">
            {part}
          </span>
        )
      )}
      {lineIndex < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function getBlankSpacingClass(previousPart: string, nextPart: string) {
  const prevChar = previousPart.slice(-1);
  const nextChar = nextPart.charAt(0);

  const needsLeftSpace = prevChar !== '' && prevChar !== '\n' && !/\s/.test(prevChar);
  const needsRightSpace = nextChar !== '' && nextChar !== '\n' && !/\s/.test(nextChar);

  if (needsLeftSpace && needsRightSpace) {
    return 'mx-2';
  }

  if (needsLeftSpace) {
    return 'ml-2 mr-1';
  }

  if (needsRightSpace) {
    return 'ml-1 mr-2';
  }

  return 'mx-1';
}

export function LessonPlayer({
  lesson,
  onComplete,
  onBack,
  userStats,
  leaderboardEntries = [],
  onExplainRequest,
  onQuizEvaluated
}: LessonPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [codeByStep, setCodeByStep] = useState<Record<number, string>>({});
  const [blankValuesByStep, setBlankValuesByStep] = useState<Record<number, string[]>>({});
  const [activeBlankByStep, setActiveBlankByStep] = useState<Record<number, number>>({});
  const [chipAssignmentsByStep, setChipAssignmentsByStep] = useState<Record<number, (string | null)[]>>({});
  const [visibleCodeTabByStep, setVisibleCodeTabByStep] = useState<Record<number, 'primary' | 'secondary' | 'preview'>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, true>>({});
  const [browserChoices, setBrowserChoices] = useState<Record<number, string>>({});
  const [revealedCodePreviewByStep, setRevealedCodePreviewByStep] = useState<Record<number, true>>({});
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [completionStage, setCompletionStage] = useState<'xp' | 'momentum'>('xp');
  const [isClaimingReward, setIsClaimingReward] = useState(false);

  const completionSnapshot = useMemo(() => {
    const projectedXp = (userStats?.totalPoints ?? 0) + lesson.xpReward;
    const currentUserName = userStats?.name ?? 'You';
    const existingEntry = leaderboardEntries.find((entry) => entry.name.toLowerCase() === currentUserName.toLowerCase());
    const otherEntries = leaderboardEntries.filter((entry) => entry.name.toLowerCase() !== currentUserName.toLowerCase());

    const projectedEntries = [
      ...otherEntries,
      {
        rank: existingEntry?.rank ?? leaderboardEntries.length + 1,
        name: currentUserName,
        xp: projectedXp,
        level: existingEntry?.level ?? Math.floor(projectedXp / 250) + 1,
        avatar: existingEntry?.avatar ?? currentUserName.charAt(0).toUpperCase()
      }
    ]
      .sort((left, right) => {
        if (right.xp !== left.xp) {
          return right.xp - left.xp;
        }
        return left.name.localeCompare(right.name);
      })
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    const userIndex = projectedEntries.findIndex((entry) => entry.name.toLowerCase() === currentUserName.toLowerCase());
    const projectedRank = userIndex >= 0 ? projectedEntries[userIndex].rank : null;
    const currentRank = existingEntry?.rank ?? null;
    const rankImproved = projectedRank !== null && currentRank !== null ? projectedRank < currentRank : false;

    let visibleEntries = projectedEntries.slice(Math.max(0, userIndex - 1), Math.min(projectedEntries.length, userIndex + 2));
    if (visibleEntries.length < 3) {
      visibleEntries = projectedEntries.slice(0, Math.min(3, projectedEntries.length));
    }

    return {
      projectedXp,
      currentUserName,
      projectedRank,
      currentRank,
      rankImproved,
      visibleEntries,
      streak: userStats?.streak ?? 0
    };
  }, [leaderboardEntries, lesson.xpReward, userStats]);

  const step = lesson.content[currentStep];
  const currentVisibleCodeTab =
    (step.type === 'interactive' && step.mode === 'fill-blanks') || step.type === 'code'
      ? visibleCodeTabByStep[currentStep] ?? step.activeCodeTab ?? 'primary'
      : 'primary';
  const editableCodeTab =
    step.type === 'interactive' && step.mode === 'fill-blanks' ? step.activeCodeTab ?? 'primary' : 'primary';
  const editableTemplateParts =
    step.type === 'interactive' && step.mode === 'fill-blanks'
      ? editableCodeTab === 'secondary'
        ? step.secondaryTemplateParts ?? step.templateParts ?? ['']
        : step.primaryTemplateParts ?? step.templateParts ?? ['']
      : [''];
  const visibleTemplateParts =
    step.type === 'interactive' && step.mode === 'fill-blanks'
      ? currentVisibleCodeTab === 'secondary'
        ? step.secondaryTemplateParts ?? (editableCodeTab === 'secondary' ? step.templateParts : [''])
        : step.primaryTemplateParts ?? (editableCodeTab === 'primary' ? step.templateParts : [''])
      : [''];
  const isLastStep = currentStep === lesson.content.length - 1;
  const currentBlankValues = step.type === 'interactive'
    ? blankValuesByStep[currentStep] ?? step.blankAnswers?.map(() => '') ?? []
    : [];
  const currentCode = step.type === 'interactive'
    ? step.mode === 'fill-blanks'
      ? editableTemplateParts
          .map((part, index) => `${part}${currentBlankValues[index] ?? ''}`)
          .join('')
      : codeByStep[currentStep] ?? step.initialCode ?? ''
    : '';
  const currentBrowserChoice = step.type === 'browser-demo' ? browserChoices[currentStep] ?? '' : '';

  const gatedStepIndices = useMemo(
    () => lesson.content.flatMap((item, index) => (item.type === 'quiz' || item.type === 'interactive' || item.type === 'browser-demo' ? [index] : [])),
    [lesson.content]
  );

  const xpPerGate = gatedStepIndices.length > 0 ? Math.max(5, Math.floor(lesson.xpReward / gatedStepIndices.length)) : lesson.xpReward;
  const earnedXp = Object.keys(completedSteps).length * xpPerGate;
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(getLessonStorageKey(lesson.id));
      if (!raw) {
        return;
      }

      const saved = JSON.parse(raw) as {
        currentStep?: number;
        furthestStep?: number;
        completedSteps?: Record<number, true>;
        codeByStep?: Record<number, string>;
        blankValuesByStep?: Record<number, string[]>;
        activeBlankByStep?: Record<number, number>;
        chipAssignmentsByStep?: Record<number, (string | null)[]>;
        browserChoices?: Record<number, string>;
        revealedCodePreviewByStep?: Record<number, true>;
      };

      setCurrentStep(Math.max(0, Math.min(saved.currentStep ?? 0, lesson.content.length - 1)));
      setFurthestStep(Math.max(0, Math.min(saved.furthestStep ?? 0, lesson.content.length - 1)));
      setCompletedSteps(saved.completedSteps ?? {});
      setCodeByStep(saved.codeByStep ?? {});
      setBlankValuesByStep(saved.blankValuesByStep ?? {});
      setActiveBlankByStep(saved.activeBlankByStep ?? {});
      setChipAssignmentsByStep(saved.chipAssignmentsByStep ?? {});
      setBrowserChoices(saved.browserChoices ?? {});
      setRevealedCodePreviewByStep(saved.revealedCodePreviewByStep ?? {});
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowCompletionScreen(false);
      setCompletionStage('xp');
      setIsClaimingReward(false);
    } catch {
      window.localStorage.removeItem(getLessonStorageKey(lesson.id));
    }
  }, [lesson.id, lesson.content.length]);

  useEffect(() => {
    const payload = {
      currentStep,
      furthestStep,
      completedSteps,
      codeByStep,
      blankValuesByStep,
      activeBlankByStep,
      chipAssignmentsByStep,
      browserChoices,
      revealedCodePreviewByStep
    };

    window.localStorage.setItem(getLessonStorageKey(lesson.id), JSON.stringify(payload));
  }, [activeBlankByStep, blankValuesByStep, browserChoices, chipAssignmentsByStep, codeByStep, completedSteps, currentStep, furthestStep, lesson.id, revealedCodePreviewByStep]);

  const interactiveSolved = useMemo(() => {
    if (step.type !== 'interactive') {
      return false;
    }

    const normalizedInput = normalizeMarkup(currentCode);
    return step.expectedCode.every((snippet) => normalizedInput.includes(normalizeMarkup(snippet)));
  }, [currentCode, step]);

  const browserSolved = step.type === 'browser-demo'
    ? currentBrowserChoice === step.correctChoice
    : false;

  const canAdvanceCurrentStep = () => {
    if (completedSteps[currentStep]) {
      return true;
    }

    if (step.type === 'intro' || step.type === 'text' || step.type === 'browser-preview') {
      return true;
    }

    if (step.type === 'code') {
      return true;
    }

    if (step.type === 'interactive') {
      return showFeedback && interactiveSolved;
    }

    if (step.type === 'browser-demo') {
      return showFeedback && browserSolved;
    }

    return showFeedback && selectedAnswer === step.correctAnswer;
  };

  const markStepComplete = () => {
    setCompletedSteps((prev) => (prev[currentStep] ? prev : { ...prev, [currentStep]: true }));
  };

  const unlockNextStep = () => {
    if (currentStep < lesson.content.length - 1) {
      setFurthestStep((prev) => Math.max(prev, currentStep + 1));
    }
  };

  const handleNext = () => {
    if (!canAdvanceCurrentStep()) {
      return;
    }

    if (step.type === 'code' && step.previewHtml && !revealedCodePreviewByStep[currentStep]) {
      setRevealedCodePreviewByStep((prev) => ({
        ...prev,
        [currentStep]: true
      }));
      markStepComplete();
      unlockNextStep();
      return;
    }

    if (step.type === 'quiz' || step.type === 'interactive' || step.type === 'browser-demo' || step.type === 'code') {
      markStepComplete();
    }

    if (isLastStep) {
      setCompletionStage('xp');
      setShowCompletionScreen(true);
      return;
    }

    unlockNextStep();
    setCurrentStep((value) => value + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleRewardClaim = async () => {
    if (completionStage === 'xp') {
      setCompletionStage('momentum');
      return;
    }

    if (isClaimingReward) {
      return;
    }

    setIsClaimingReward(true);

    try {
      const completedLessonState = {
        currentStep: 0,
        furthestStep: Math.max(0, lesson.content.length - 1),
        completedSteps,
        codeByStep,
        blankValuesByStep,
        activeBlankByStep,
        chipAssignmentsByStep,
        browserChoices,
        revealedCodePreviewByStep
      };

      window.localStorage.setItem(getLessonStorageKey(lesson.id), JSON.stringify(completedLessonState));
      await onComplete(lesson.xpReward);
    } finally {
      setIsClaimingReward(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      return;
    }

    setCurrentStep((value) => value - 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleHeaderNext = () => {
    if (currentStep < furthestStep) {
      setCurrentStep((value) => value + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      return;
    }

    if (canAdvanceCurrentStep()) {
      handleNext();
    }
  };

  const handleHeaderStepJump = (stepIndex: number) => {
    if (stepIndex > furthestStep) {
      return;
    }

    setCurrentStep(stepIndex);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer === null || step.type !== 'quiz') {
      return;
    }

    setShowFeedback(true);

    if (selectedAnswer === step.correctAnswer) {
      markStepComplete();
      unlockNextStep();
    }

    onQuizEvaluated?.({
      question: step.data,
      selectedAnswer: step.options[selectedAnswer] ?? 'Unknown',
      correctAnswer: step.options[step.correctAnswer] ?? 'Unknown',
      isCorrect: selectedAnswer === step.correctAnswer
    });
  };

  const handleInteractiveCheck = () => {
    setShowFeedback(true);

    if (interactiveSolved) {
      markStepComplete();
      unlockNextStep();
    }
  };

  const handleBlankValueChange = (blankIndex: number, value: string) => {
    if (step.type !== 'interactive' || step.mode !== 'fill-blanks') {
      return;
    }

    setBlankValuesByStep((prev) => {
      const existing = prev[currentStep] ?? step.blankAnswers?.map(() => '') ?? [];
      const next = [...existing];
      next[blankIndex] = value;
      return {
        ...prev,
        [currentStep]: next
      };
    });
    setChipAssignmentsByStep((prev) => {
      const existing = prev[currentStep] ?? step.blankAnswers?.map(() => null) ?? [];
      const next = [...existing];
      next[blankIndex] = null;
      return {
        ...prev,
        [currentStep]: next
      };
    });
    const blankCount = step.blankAnswers?.length ?? 0;
    const nextBlankIndex = value.trim() && blankIndex < blankCount - 1 ? blankIndex + 1 : blankIndex;
    setActiveBlankByStep((prev) => ({
      ...prev,
      [currentStep]: nextBlankIndex
    }));
    setShowFeedback(false);
  };

  const handlePromptChipClick = (chip: string, chipKey: string) => {
    if (step.type !== 'interactive' || step.mode !== 'fill-blanks') {
      return;
    }

    const currentBlanks = blankValuesByStep[currentStep] ?? step.blankAnswers?.map(() => '') ?? [];
    const currentAssignments = chipAssignmentsByStep[currentStep] ?? step.blankAnswers?.map(() => null) ?? [];
    const preferredBlank = activeBlankByStep[currentStep];
    const firstEmptyBlank = currentBlanks.findIndex((value) => !value.trim());
    const targetBlank = preferredBlank ?? (firstEmptyBlank >= 0 ? firstEmptyBlank : 0);

    setBlankValuesByStep((prev) => {
      const existing = prev[currentStep] ?? step.blankAnswers?.map(() => '') ?? [];
      const next = [...existing];
      next[targetBlank] = chip;
      return {
        ...prev,
        [currentStep]: next
      };
    });
    setChipAssignmentsByStep((prev) => {
      const existing = prev[currentStep] ?? step.blankAnswers?.map(() => null) ?? [];
      const next = [...existing];
      next[targetBlank] = chipKey;
      return {
        ...prev,
        [currentStep]: next
      };
    });

    const blankCount = step.blankAnswers?.length ?? 0;
    const nextBlankIndex = targetBlank < blankCount - 1 ? targetBlank + 1 : targetBlank;
    setActiveBlankByStep((prev) => ({
      ...prev,
      [currentStep]: nextBlankIndex
    }));
    setShowFeedback(false);
  };

  const handleBlankDelete = () => {
    if (step.type !== 'interactive' || step.mode !== 'fill-blanks') {
      return;
    }

    const currentBlanks = blankValuesByStep[currentStep] ?? step.blankAnswers?.map(() => '') ?? [];
    const currentAssignments = chipAssignmentsByStep[currentStep] ?? step.blankAnswers?.map(() => null) ?? [];
    const preferredBlank = activeBlankByStep[currentStep];

    let targetBlank =
      preferredBlank !== undefined && (currentBlanks[preferredBlank] ?? '').trim()
        ? preferredBlank
        : -1;

    if (targetBlank === -1) {
      targetBlank = [...currentBlanks]
        .map((value, index) => ({ value, index }))
        .reverse()
        .find((item) => item.value.trim())?.index ?? -1;
    }

    if (targetBlank === -1) {
      return;
    }

    setBlankValuesByStep((prev) => {
      const existing = prev[currentStep] ?? step.blankAnswers?.map(() => '') ?? [];
      const next = [...existing];
      next[targetBlank] = '';
      return {
        ...prev,
        [currentStep]: next
      };
    });

    setChipAssignmentsByStep((prev) => {
      const existing = prev[currentStep] ?? step.blankAnswers?.map(() => null) ?? [];
      const next = [...existing];
      next[targetBlank] = null;
      return {
        ...prev,
        [currentStep]: next
      };
    });

    setActiveBlankByStep((prev) => ({
      ...prev,
      [currentStep]: targetBlank
    }));
    setShowFeedback(false);
  };

  const handleBrowserChoice = (choice: string) => {
    if (step.type !== 'browser-demo') {
      return;
    }

    setBrowserChoices((prev) => ({
      ...prev,
      [currentStep]: choice
    }));
    setShowFeedback(true);

    if (choice === step.correctChoice) {
      markStepComplete();
      unlockNextStep();
    }
  };

  const renderStep = (current: LessonStep) => {
    if (current.type === 'intro') {
      return (
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/5 bg-[linear-gradient(135deg,rgba(21,26,33,0.88),rgba(24,30,38,0.94))] shadow-[0_24px_60px_rgba(0,0,0,0.42)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_35%,rgba(148,170,255,0.1),transparent_28%),radial-gradient(circle_at_78%_70%,rgba(92,253,128,0.04),transparent_24%)]" />
          <div className="grid md:grid-cols-2">
            <div className="relative flex flex-col items-center justify-center border-r border-white/5 bg-[#20262f]/35 p-14">
              <div className="relative">
                <div className="absolute inset-0 scale-125 rounded-full bg-[#94aaff]/14 blur-[70px]" />
                <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-[#94aaff]/15 bg-[#161b24] shadow-[0_0_40px_rgba(148,170,255,0.12)]">
                  <Bot className="h-24 w-24 text-[#8ea2ff]" />
                </div>
              </div>
              <div className="mt-8 flex gap-3">
                <span className="rounded-full bg-[#94aaff]/12 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#94aaff]">
                  Level 01
                </span>
                <span className="rounded-full bg-[#5cfd80]/12 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#5cfd80]">
                  Active Quest
                </span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col justify-center p-14">
              <div className="mb-7">
                <h2 className="mb-3 font-['Space_Grotesk'] text-5xl font-bold tracking-tight text-[#f1f3fc]">Welcome!</h2>
                <div className="h-1.5 w-16 rounded-full bg-[#94aaff]" />
              </div>

              <div className="space-y-6">
                <p className="text-[1.15rem] leading-relaxed text-[#f1f3fc]/82">{renderHighlightedText(current.data)}</p>
                {current.secondaryText && (
                  <p className="text-base italic leading-relaxed text-[#f1f3fc]/55">
                    {current.secondaryText}{' '}
                    {current.accentText ? <span className="font-bold text-[#94aaff]">{current.accentText}</span> : null}
                  </p>
                )}
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0e14] bg-[#1b2028]">
                    <span className="text-xs font-bold text-[#94aaff]">H</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0e14] bg-[#1b2028]">
                    <span className="text-xs font-bold text-[#5cfd80]">C</span>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a0e14] bg-[#1b2028]">
                    <span className="text-xs font-bold text-[#ffbd5c]">J</span>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f1f3fc]/40">+ 3 More Modules</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (current.type === 'browser-demo') {
      return (
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <p className="mb-5 max-w-3xl text-center text-sm leading-relaxed text-white sm:text-base">{renderHighlightedText(current.data)}</p>
          {current.secondaryText && (
            <p className="mb-5 max-w-3xl text-center text-sm leading-6 text-slate-300">{current.secondaryText}</p>
          )}

          <div className="w-full max-w-[32rem] overflow-hidden rounded-[1.25rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-[20px]">
            <div className="flex items-center justify-between border-b border-white/5 bg-[#151a21] px-5 py-3 text-sm font-semibold text-[#f1f3fc]">
              <span>Browser</span>
              <span className="text-xs text-[#94aaff]">{current.previewHint ?? 'Interactive preview'}</span>
            </div>
            <div className="flex min-h-[9.75rem] flex-col items-center justify-start bg-[#20262f] px-4 py-4 text-slate-200">
              <h3 className="text-lg font-bold text-white">{current.browserTitle}</h3>
              <div className="mt-2 text-2xl font-bold tracking-[0.18em] text-[#f1f3fc]">
                {browserSolved ? current.revealWord : current.maskedWord}
              </div>

              {browserSolved && (
                <>
                  <p className="mt-2 text-xl font-bold text-emerald-400">{current.successTitle ?? 'Correct!'}</p>
                  {current.imageUrl && (
                    <img
                      src={current.imageUrl}
                      alt={current.imageAlt ?? current.revealWord}
                      className="mt-2 h-16 w-16 rounded-lg border-2 border-white object-cover shadow-md"
                    />
                  )}
                </>
              )}

              <div className="mt-3 flex items-center gap-2">
                {current.choices.map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => handleBrowserChoice(choice)}
                    className={`h-10 w-10 rounded-lg text-base font-semibold transition-all ${
                      currentBrowserChoice === choice
                        ? browserSolved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-500 text-white'
                        : 'bg-[#1b2028] text-white hover:bg-[#262c36]'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {showFeedback && !browserSolved && (
            <p className="mt-5 text-sm text-rose-300">That choice is not correct. Try another letter.</p>
          )}
        </div>
      );
    }

    if (current.type === 'browser-preview') {
      return (
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <p className="mb-4 max-w-3xl text-center text-base leading-relaxed text-white sm:text-lg">{renderHighlightedText(current.data)}</p>
          {current.secondaryText && (
            <p className="mb-4 max-w-3xl text-center text-sm leading-6 text-slate-300 sm:text-base">{current.secondaryText}</p>
          )}

          <div className="w-full max-w-[42rem] overflow-hidden rounded-[1.5rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-[20px]">
            <div className="flex items-center justify-between border-b border-white/3 bg-[#151a21] px-7 py-5 text-lg font-semibold text-[#f1f3fc]">
              <span>{current.browserTitle}</span>
              <span className="text-sm text-[#94aaff]">{current.previewHint ?? 'Preview'}</span>
            </div>
            <iframe
              title={current.browserTitle}
              sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
              srcDoc={current.previewHtml}
              className="h-[19rem] w-full bg-white sm:h-[23rem]"
            />
          </div>
        </div>
      );
    }

    if (current.type === 'text') {
      return (
        <div className="mx-auto flex min-h-[18rem] max-w-4xl flex-col items-center justify-center text-center">
          <p className="text-base leading-relaxed text-white sm:text-lg">{renderHighlightedText(current.data)}</p>
          {current.secondaryText && (
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">{current.secondaryText}</p>
          )}
        </div>
      );
    }

    if (current.type === 'code') {
      const visibleCode = currentVisibleCodeTab === 'secondary' && current.secondaryCode ? current.secondaryCode : current.code;
      const showCodePreview = Boolean(current.previewHtml && revealedCodePreviewByStep[currentStep]);
      return (
        <div className="mx-auto flex max-w-6xl flex-col justify-center">
          <p className="mb-7 text-center text-base leading-relaxed text-white sm:text-lg">{renderHighlightedText(current.data)}</p>
          <div className={`grid gap-6 ${showCodePreview ? 'lg:grid-cols-[1.2fr_0.72fr]' : 'grid-cols-1'}`}>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
              <div className="border-b border-white/5 bg-[#151a21] px-4 py-2.5 sm:px-6 sm:py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCodeTabByStep((prev) => ({
                        ...prev,
                        [currentStep]: 'primary'
                      }))
                    }
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                      currentVisibleCodeTab === 'primary' ? 'bg-[#262d4d] text-slate-100' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {current.codeTitle ?? 'index.html'}
                  </button>
                  {current.secondaryCodeTitle && current.secondaryCode && (
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCodeTabByStep((prev) => ({
                          ...prev,
                          [currentStep]: 'secondary'
                        }))
                      }
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                        currentVisibleCodeTab === 'secondary' ? 'bg-[#262d4d] text-slate-100' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {current.secondaryCodeTitle}
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-6 text-[#94aaff] sm:text-base sm:leading-7">
                  <code>{renderCodeText(visibleCode, 'code-step')}</code>
                </pre>
              </div>
            </div>

            {showCodePreview ? (
              <div className="self-start overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                <div className="border-b border-white/5 bg-[#151a21] px-4 py-2.5 text-xs font-semibold text-slate-100 sm:px-5 sm:py-3 sm:text-sm">
                  {current.previewTitle ?? 'Browser'}
                </div>
                <iframe
                  title={current.previewTitle ?? 'Browser'}
                  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                  srcDoc={current.previewHtml}
                  className="h-[24rem] w-full bg-white"
                />
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    if (current.type === 'interactive') {
      if (current.mode === 'fill-blanks') {
        return (
          <div className="mx-auto flex max-w-5xl flex-col">
            <p className="mb-4 text-center text-[15px] leading-relaxed text-white sm:text-lg">{renderHighlightedText(current.data)}</p>

            <div className={`grid gap-6 ${showFeedback && interactiveSolved ? 'lg:grid-cols-[1.2fr_0.72fr]' : 'lg:grid-cols-1'}`}>
              <div className={`overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px] ${showFeedback && interactiveSolved ? '' : 'mx-auto w-full max-w-[920px]'}`}>
                <div className="flex items-center justify-between border-b border-white/5 bg-[#151a21] px-4 py-2.5 sm:px-6 sm:py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCodeTabByStep((prev) => ({
                          ...prev,
                          [currentStep]: 'primary'
                        }))
                      }
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                        currentVisibleCodeTab === 'primary' ? 'bg-[#262d4d] text-slate-100' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {current.codeTitle ?? 'index.html'}
                    </button>
                    {current.secondaryCodeTitle && (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleCodeTabByStep((prev) => ({
                            ...prev,
                            [currentStep]: 'secondary'
                          }))
                        }
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
                          currentVisibleCodeTab === 'secondary' ? 'bg-[#262d4d] text-slate-100' : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {current.secondaryCodeTitle}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleBlankDelete}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0d1117] px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:text-white sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs"
                      aria-label="Clear blank"
                    >
                      <X className="h-3.5 w-3.5" />
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBlankValuesByStep((prev) => ({
                          ...prev,
                          [currentStep]: current.blankAnswers?.map(() => '') ?? []
                        }));
                        setChipAssignmentsByStep((prev) => ({
                          ...prev,
                          [currentStep]: current.blankAnswers?.map(() => null) ?? []
                        }));
                        setActiveBlankByStep((prev) => ({
                          ...prev,
                          [currentStep]: 0
                        }));
                        setShowFeedback(false);
                      }}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0d1117] px-2.5 py-1 text-[11px] text-slate-300 transition-colors hover:text-white sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset
                    </button>
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="h-[19rem] rounded-2xl border border-white/5 bg-[#0d1117] p-4 font-mono text-sm leading-6 text-slate-100 sm:h-[21rem] sm:p-4 sm:text-[15px] sm:leading-6">
                    <div className="lesson-code-scrollbar h-full overflow-x-auto overflow-y-auto pr-2">
                      <div className="min-w-max whitespace-pre-wrap break-words text-[14px] leading-[1.4] text-[#94aaff] sm:text-[15px] sm:leading-[1.45]">
                        {visibleTemplateParts.map((part, index) => (
                          <span key={`template-${index}`}>
                            {renderCodeText(part, `part-${index}`)}
                            {currentVisibleCodeTab === editableCodeTab && index < (current.blankAnswers?.length ?? 0) ? (
                              <input
                                value={currentBlankValues[index] ?? ''}
                                onChange={(event) => handleBlankValueChange(index, event.target.value)}
                                onFocus={() =>
                                  setActiveBlankByStep((prev) => ({
                                    ...prev,
                                    [currentStep]: index
                                  }))
                                }
                                placeholder=""
                                style={{ width: getChipWidth(currentBlankValues[index] ?? '') }}
                                className={`${getBlankSpacingClass(part, visibleTemplateParts[index + 1] ?? '')} inline-block h-7 rounded-[0.75rem] border px-2 py-0.5 align-middle text-center text-[11px] font-semibold outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 focus:ring-2 sm:h-8 sm:rounded-[0.8rem] sm:text-xs ${
                                  !(currentBlankValues[index] ?? '').trim()
                                    ? 'border-[#9bb0ff]/45 bg-[#4c4a86] text-[#d8ddff] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(119,147,255,0.18)] focus:border-[#b7c7ff]/70 focus:bg-[#5a58a0] focus:ring-[#9bb0ff]/25'
                                    : isHtmlLikeSnippet(currentBlankValues[index] ?? '') || ['<', '>', '/', 'h1', 'h2', 'h3', 'h4', 'button', 'strong', 'em', 'br', 'p'].includes((currentBlankValues[index] ?? '').trim())
                                    ? 'border-[#66d9ff]/35 bg-[#24536a] text-[#d9f6ff] focus:border-[#66d9ff]/55 focus:bg-[#2b627d] focus:ring-[#66d9ff]/20'
                                    : 'border-[#94aaff]/35 bg-[#5a5898] text-white focus:border-[#b5c4ff]/55 focus:bg-[#6461aa] focus:ring-[#94aaff]/18'
                                }`}
                              />
                            ) : null}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showFeedback && interactiveSolved && (
                <div className="self-start overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                  <div className="border-b border-white/5 bg-[#151a21] px-4 py-2.5 text-xs font-semibold text-slate-100 sm:px-5 sm:py-3 sm:text-sm">
                    {current.previewTitle ?? 'Browser'}
                  </div>
                  <iframe
                    title="Live Preview"
                    sandbox="allow-scripts"
                    srcDoc={current.solvedPreviewHtml ?? currentCode ?? '<!DOCTYPE html><html><body></body></html>'}
                    className="h-[16rem] w-full bg-white"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="min-h-[1.25rem]">
                {current.helperText && !showFeedback && <p className="text-center text-sm text-[#a8abb3]">{current.helperText}</p>}
                {showFeedback && !interactiveSolved && (
                  <p className="mt-2 text-center text-sm text-rose-300">
                    Not quite yet. Fill the blank correctly and try again.
                  </p>
                )}
              </div>
              <div className="flex max-w-[920px] flex-wrap items-center justify-center gap-2 sm:gap-3">
                {(current.promptChips ?? []).map((chip, index) => {
                  const chipKey = buildChipKey(chip, index);
                  const isUsed = (chipAssignmentsByStep[currentStep] ?? []).includes(chipKey);

                  return (
                    <button
                      key={chipKey}
                      type="button"
                      onClick={() => handlePromptChipClick(chip, chipKey)}
                      className={`rounded-full border px-2.5 py-1.5 font-mono text-[10px] transition-all sm:px-3 sm:text-[11px] ${
                        isUsed
                          ? 'border-[#5cfd80]/45 bg-[#5cfd80]/18 text-[#b9ffcb] shadow-[0_0_0_1px_rgba(92,253,128,0.16)]'
                          : 'border-[#94aaff]/20 bg-[#94aaff]/10 text-[#94aaff] hover:border-[#94aaff]/35 hover:bg-[#94aaff]/15'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="mx-auto flex max-w-6xl flex-col">
          <p className="mb-5 text-center text-base leading-relaxed text-white sm:text-lg">{renderHighlightedText(current.data)}</p>

          <div className={`grid gap-6 ${showFeedback && interactiveSolved ? 'lg:grid-cols-[1.2fr_0.72fr]' : 'lg:grid-cols-1'}`}>
            <div className={`overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px] ${showFeedback && interactiveSolved ? '' : 'mx-auto w-full max-w-3xl'}`}>
              <div className="flex items-center justify-between border-b border-white/5 bg-[#151a21] px-6 py-3">
                <p className="text-sm font-semibold text-slate-100">index.html</p>
                <button
                  type="button"
                  onClick={() => {
                    setCodeByStep((prev) => ({
                      ...prev,
                      [currentStep]: current.initialCode ?? ''
                    }));
                    setShowFeedback(false);
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1117] px-3 py-1.5 text-xs text-slate-300 transition-colors hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
              <div className="p-6">
                <textarea
                  value={currentCode}
                  onChange={(event) => {
                    setCodeByStep((prev) => ({
                      ...prev,
                      [currentStep]: event.target.value
                    }));
                    setShowFeedback(false);
                  }}
                  spellCheck={false}
                  placeholder={current.placeholder ?? '<button>Like</button>'}
                  className="min-h-[12rem] w-full resize-none rounded-2xl border border-white/5 bg-[#0d1117] p-5 font-mono text-base leading-7 text-slate-100 outline-none transition-colors placeholder:text-[#94aaff]/25 focus:border-[#94aaff]/30"
                />
              </div>
            </div>

            {showFeedback && interactiveSolved && (
              <div className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                <div className="border-b border-white/5 bg-[#151a21] px-5 py-3 text-sm font-semibold text-slate-100">
                  {current.previewTitle ?? 'Browser'}
                </div>
                <iframe
                  title="Live Preview"
                  sandbox="allow-scripts"
                  srcDoc={currentCode || '<!DOCTYPE html><html><body></body></html>'}
                  className="h-[16rem] w-full bg-white"
                />
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col items-center gap-4">
            <div className="min-h-[1.25rem]">
              {current.helperText && !showFeedback && <p className="text-center text-sm text-[#a8abb3]">{current.helperText}</p>}
              {showFeedback && !interactiveSolved && (
                <p className="mt-2 text-center text-sm text-rose-300">
                  Not quite yet. Match the target HTML and try again.
                </p>
              )}
            </div>
            <div className="rounded-full border border-[#94aaff]/20 bg-[#94aaff]/10 px-4 py-2 font-mono text-sm text-[#94aaff]">
              {current.expectedCode[0]}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-3xl">
        <p className="mb-8 text-center text-lg leading-relaxed text-white sm:text-xl">{renderHighlightedText(current.data)}</p>
        {(current.code || (showFeedback && selectedAnswer === current.correctAnswer && current.solvedPreviewHtml)) && (
          <div className={`mb-6 grid gap-6 ${showFeedback && selectedAnswer === current.correctAnswer && current.solvedPreviewHtml ? 'lg:grid-cols-[1.2fr_0.72fr]' : 'grid-cols-1'}`}>
            {current.code && (
              <div className="overflow-hidden rounded-[1.5rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_20px_40px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                <div className="border-b border-white/5 bg-[#151a21] px-6 py-4 text-sm font-semibold text-slate-100">
                  {current.codeTitle ?? 'index.html'}
                </div>
                <div className="p-6">
                  <pre className="overflow-x-auto whitespace-pre-wrap text-base leading-7 text-[#94aaff]">
                    <code>{renderCodeText(current.code, 'quiz-code')}</code>
                  </pre>
                </div>
              </div>
            )}

            {showFeedback && selectedAnswer === current.correctAnswer && current.solvedPreviewHtml && (
              <div className="self-start overflow-hidden rounded-[1.5rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_20px_40px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                <div className="border-b border-white/5 bg-[#151a21] px-5 py-3 text-sm font-semibold text-slate-100">
                  {current.previewTitle ?? 'Browser'}
                </div>
                <iframe
                  title={current.previewTitle ?? 'Browser'}
                  sandbox="allow-scripts"
                  srcDoc={current.solvedPreviewHtml}
                  className="h-[16rem] w-full bg-white"
                />
              </div>
            )}
          </div>
        )}
        <div className="space-y-3">
          {current.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === current.correctAnswer;
            const showCorrect = showFeedback && isCorrect;
            const showIncorrect = showFeedback && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showFeedback && setSelectedAnswer(index)}
                disabled={showFeedback}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition-all ${
                  showCorrect
                    ? 'border-green-400/50 bg-green-500/10'
                    : showIncorrect
                    ? 'border-red-400/50 bg-red-500/10'
                    : isSelected
                    ? 'border-[#94aaff]/50 bg-[#94aaff]/10'
                    : 'border-[#6f8fff]/35 bg-[linear-gradient(180deg,rgba(27,36,54,0.92),rgba(14,20,33,0.92))] shadow-[inset_0_1px_0_rgba(165,188,255,0.18)] hover:border-[#9eb7ff]/55'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base text-white sm:text-lg">{renderHighlightedText(option)}</span>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-300" />}
                </div>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className={`mt-5 rounded-2xl border px-5 py-4 ${
            selectedAnswer === current.correctAnswer
              ? 'border-green-400/40 bg-green-500/10'
              : 'border-red-400/40 bg-red-500/10'
          }`}>
            <p className={`text-sm ${selectedAnswer === current.correctAnswer ? 'text-green-300' : 'text-red-300'}`}>
              {selectedAnswer === current.correctAnswer ? 'Correct! Well done.' : 'Not quite. Try again next time.'}
            </p>
          </div>
        )}
      </div>
    );
  };

  const primaryAction = () => {
    if (step.type === 'quiz') {
      return showFeedback
        ? {
            label: isLastStep ? 'Complete Lesson' : 'Continue',
            disabled: selectedAnswer !== step.correctAnswer,
            onClick: handleNext
          }
        : {
            label: 'Check',
            disabled: selectedAnswer === null,
            onClick: handleQuizSubmit
          };
    }

    if (step.type === 'interactive') {
      return showFeedback
        ? {
            label: isLastStep ? 'Complete Lesson' : 'Continue',
            disabled: !interactiveSolved,
            onClick: handleNext
          }
        : {
            label: 'Check',
            disabled: !currentCode.trim(),
            onClick: handleInteractiveCheck
          };
    }

    if (step.type === 'browser-demo') {
      return {
        label: isLastStep ? 'Complete Lesson' : 'Continue',
        disabled: !browserSolved,
        onClick: handleNext
      };
    }

    return {
      label: isLastStep ? 'Complete Lesson' : 'Continue',
      disabled: false,
      onClick: handleNext
    };
  };

  const action = primaryAction();
  const showExplainPrompt =
    (step.type === 'quiz' && showFeedback && selectedAnswer === step.correctAnswer) ||
    (step.type === 'interactive' && showFeedback && interactiveSolved) ||
    (step.type === 'browser-demo' && showFeedback && browserSolved);

  const explainPrompt = (() => {
    if (step.type === 'quiz') {
      return `Explain why the correct answer for this question is "${step.options[step.correctAnswer]}". Question: ${step.data}`;
    }

    if (step.type === 'interactive') {
      return `Explain this solved lesson step simply. Lesson: ${lesson.title}. Step: ${step.data}. Correct code: ${step.expectedCode.join(' ')}`;
    }

    if (step.type === 'browser-demo') {
      return `Explain this browser demo simply. Lesson: ${lesson.title}. Step: ${step.data}. Correct choice: ${step.correctChoice}.`;
    }

    return `Explain this lesson step simply: ${lesson.title}`;
  })();

  if (showCompletionScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#151a21_0%,#10141b_100%)] px-6 py-16 text-[#f1f3fc]">
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          {completionStage === 'xp' ? (
            <>
              <div className="relative mb-8 flex h-64 w-64 items-center justify-center">
                <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 220 220" aria-hidden="true">
                  <circle cx="110" cy="110" r="88" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
                  <circle
                    cx="110"
                    cy="110"
                    r="88"
                    fill="none"
                    stroke="#5cfd80"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="552.92"
                    strokeDashoffset="92"
                  />
                </svg>
                <div className="flex h-36 w-36 items-center justify-center rounded-[2rem] border border-[#94aaff]/20 bg-[rgba(21,26,33,0.75)] shadow-[0_0_40px_rgba(148,170,255,0.12)]">
                  <CheckCircle2 className="h-16 w-16 text-[#94aaff]" />
                </div>
              </div>

              <p className="mb-3 font-['Space_Grotesk'] text-lg font-bold text-[#94aaff]">{lesson.xpReward} / {lesson.xpReward} XP</p>
              <h1 className="mb-3 font-['Space_Grotesk'] text-5xl font-black tracking-tight text-white">Lesson conquered!</h1>
              <p className="mb-10 max-w-2xl text-lg text-[#a8abb3]">Great job finishing this lesson. Collect your XP reward to keep going.</p>

              <div className="mb-10 flex items-center gap-4 rounded-[1.5rem] border border-[#5cfd80]/20 bg-[#5cfd80]/10 px-7 py-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5cfd80]/18 text-[#5cfd80]">
                  <Zap className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#5cfd80]">Earned</p>
                  <p className="font-['Space_Grotesk'] text-3xl font-black text-white">+{lesson.xpReward} XP</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-10 w-full max-w-3xl rounded-[2rem] border border-[#5cfd80]/20 bg-[#5cfd80]/10 px-6 py-7 text-left shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[#5cfd80]/18 text-[#5cfd80]">
                    <Trophy className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#aab6ff]">Position Boost</p>
                    <h2 className="font-['Space_Grotesk'] text-3xl font-black text-[#e8fff0]">
                      {completionSnapshot.projectedRank !== null
                        ? `You are projected at #${completionSnapshot.projectedRank}!`
                        : "You're strengthening your position!"}
                    </h2>
                  </div>
                </div>

                <p className="mb-6 max-w-2xl text-base leading-7 text-[#c1c6db]">
                  {completionSnapshot.rankImproved
                    ? `This lesson would move you up from #${completionSnapshot.currentRank} to #${completionSnapshot.projectedRank}.`
                    : `This lesson pushes your total to ${completionSnapshot.projectedXp} XP and helps you keep your place on the leaderboard.`}
                </p>

                <div className="mb-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-4">
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#aab6ff]">Current Streak</p>
                    <p className="font-['Space_Grotesk'] text-3xl font-black text-white">{completionSnapshot.streak} day{completionSnapshot.streak === 1 ? '' : 's'}</p>
                  </div>
                  <div className="rounded-[1.35rem] border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-4">
                    <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-[#aab6ff]">Projected Total XP</p>
                    <p className="font-['Space_Grotesk'] text-3xl font-black text-white">{completionSnapshot.projectedXp}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.04)] p-4">
                  <div className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-[rgba(16,20,27,0.3)]">
                    {completionSnapshot.visibleEntries.map((entry) => {
                      const isCurrentUser = entry.name.toLowerCase() === completionSnapshot.currentUserName.toLowerCase();
                      const avatarLabel = (entry.avatar || entry.name.charAt(0)).slice(0, 2).toUpperCase();

                      return (
                        <div
                          key={`${entry.rank}-${entry.name}`}
                          className={`flex items-center justify-between px-4 py-3 text-sm ${
                            isCurrentUser ? 'bg-[#94aaff]/18 text-white' : 'text-[#d7d9e7]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 text-left font-black text-white">{entry.rank}</span>
                            <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${isCurrentUser ? 'bg-[#c08b5f] text-[#1d1206]' : 'bg-[#25382d] text-[#f1f3fc]'}`}>
                              {avatarLabel}
                            </span>
                            <span className="font-semibold">{isCurrentUser ? 'You' : entry.name}</span>
                          </div>
                          <div className="flex items-center gap-2 font-black text-white">
                            <Zap className="h-4 w-4 text-[#ffd95e]" />
                            <span>{entry.xp}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="button"
            onClick={handleRewardClaim}
            disabled={isClaimingReward}
            className="rounded-[1.35rem] bg-[#5cfd80] px-10 py-5 font-['Space_Grotesk'] text-xl font-black text-[#005d22] shadow-[0_20px_50px_rgba(92,253,128,0.25)] transition-all hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
          >
            {isClaimingReward ? 'Saving...' : completionStage === 'xp' ? 'Continue' : 'Get reward'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,#151a21_0%,#10141b_100%)]">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden text-sm font-medium sm:inline">Back to course</span>
        </button>

        <div className="flex w-full max-w-5xl items-center gap-3 px-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#151a21] text-slate-200 transition-all hover:border-[#94aaff]/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-1 items-center gap-2">
            {lesson.content.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleHeaderStepJump(index)}
                disabled={index > furthestStep}
                className={`h-2 flex-1 rounded-full transition-all ${
                  index <= currentStep ? 'bg-gradient-to-r from-[#94aaff] to-[#6c8cff]' : 'bg-white/8'
                } ${index <= furthestStep ? 'cursor-pointer hover:opacity-85' : 'cursor-not-allowed'}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleHeaderNext}
            disabled={currentStep === lesson.content.length - 1 ? !canAdvanceCurrentStep() : !(currentStep < furthestStep || canAdvanceCurrentStep())}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#151a21] text-slate-200 transition-all hover:border-[#94aaff]/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#94aaff]/20 bg-[#94aaff]/10 px-3 py-1.5 text-sm text-[#94aaff]">
          <Sparkles className="h-4 w-4 text-[#ffbd5c]" />
          {Math.min(earnedXp, lesson.xpReward)}/{lesson.xpReward} XP
        </div>
      </div>

      <div className={`min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8 ${step.type === 'intro' ? 'flex items-center justify-center' : ''}`}>
        {renderStep(step)}
      </div>

      <div className="flex items-end justify-between border-t border-white/5 px-6 py-4 sm:px-8">
        <div className="min-h-[56px] pl-20 text-slate-300">
          {showExplainPrompt ? (
              <div className="space-y-2">
                <div className="inline-flex rounded-2xl border border-[#5cfd80]/20 bg-[#182129] px-5 py-3 text-sm font-semibold text-[#8cff9d]">
                  Lesson solved. Good job!
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-[#1a1f28] px-5 py-3">
                  <div>
                    <p className="text-sm font-medium text-white">Do you want me to explain?</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onExplainRequest?.(explainPrompt)}
                    className="flex items-center gap-2 rounded-xl border border-[#94aaff]/20 bg-[#94aaff]/10 px-4 py-2 text-xs font-bold text-[#d8e0ff] transition-all hover:border-[#94aaff]/35 hover:bg-[#94aaff]/16"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#94aaff]" />
                    Explain
                  </button>
                </div>
              </div>
          ) : (
            <div />
          )}
        </div>

        <button
          onClick={action.onClick}
          disabled={action.disabled}
          className="rounded-2xl bg-gradient-to-r from-[#94aaff] to-[#3367ff] px-6 py-3 text-base font-semibold text-[#001b61] shadow-[0_18px_40px_rgba(148,170,255,0.24)] transition-all hover:from-[#a7b9ff] hover:to-[#4d7dff] disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:text-lg"
        >
          {action.label}
        </button>
      </div>
    </div>
  );
}
