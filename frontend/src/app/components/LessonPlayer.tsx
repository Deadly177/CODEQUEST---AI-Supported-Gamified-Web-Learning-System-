import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Bot, Check, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, Sparkles, Trophy, X, Zap } from 'lucide-react';
import type { Monaco } from '@monaco-editor/react';
import type { LessonDefinition, LessonStep } from '../lessonTypes';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

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

function parseCssRules(value: string) {
  const normalized = value.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
  const rules = new Map<string, Map<string, string>>();
  let match: RegExpExecArray | null;

  while ((match = ruleRegex.exec(normalized)) !== null) {
    const selector = match[1].trim().replace(/\s+/g, ' ').toLowerCase();
    const body = match[2];
    const declarations = new Map<string, string>();

    for (const rawDeclaration of body.split(';')) {
      const declaration = rawDeclaration.trim();
      if (!declaration) continue;

      const colonIndex = declaration.indexOf(':');
      if (colonIndex === -1) {
        return null;
      }

      const property = declaration.slice(0, colonIndex).trim().toLowerCase();
      const propertyValue = declaration.slice(colonIndex + 1).trim().replace(/\s+/g, ' ').toLowerCase();
      declarations.set(property, propertyValue);
    }

    rules.set(selector, declarations);
  }

  return rules.size > 0 ? rules : null;
}

function cssSnippetMatches(input: string, expected: string) {
  const inputRules = parseCssRules(input);
  const expectedRules = parseCssRules(expected);

  if (!inputRules || !expectedRules) {
    return false;
  }

  for (const [selector, expectedDeclarations] of expectedRules.entries()) {
    const inputDeclarations = inputRules.get(selector);
    if (!inputDeclarations) {
      return false;
    }

    for (const [property, expectedValue] of expectedDeclarations.entries()) {
      if (inputDeclarations.get(property) !== expectedValue) {
        return false;
      }
    }
  }

  return true;
}

function getLessonStorageKey(lessonId: string) {
  return `codequest_lesson_state:v4:${lessonId}`;
}

function getLessonStateSignature(lesson: LessonDefinition) {
  return JSON.stringify(
    lesson.content.map((step) => ({
      type: step.type,
      mode: step.type === 'interactive' ? step.mode ?? 'editor' : null,
      data: step.data,
      blankAnswersLength: step.type === 'interactive' ? step.blankAnswers?.length ?? 0 : 0,
      promptChipsLength: step.type === 'interactive' ? step.promptChips?.length ?? 0 : 0,
      primaryTemplatePartsLength:
        step.type === 'interactive' && step.mode === 'fill-blanks'
          ? step.primaryTemplateParts?.length ?? step.templateParts?.length ?? 0
          : 0,
      secondaryTemplatePartsLength:
        step.type === 'interactive' && step.mode === 'fill-blanks'
          ? step.secondaryTemplateParts?.length ?? step.templateParts?.length ?? 0
          : 0,
      expectedCode: step.type === 'interactive' ? step.expectedCode : null,
      options: step.type === 'quiz' ? step.options : null
    }))
  );
}

function rebuildCompletedSteps(count: number, maxIndex: number) {
  const cappedCount = Math.max(0, Math.min(count, maxIndex + 1));
  return Array.from({ length: cappedCount }).reduce<Record<number, true>>((acc, _, index) => {
    acc[index] = true;
    return acc;
  }, {});
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

function fillTemplateParts(parts: string[] | undefined, values: string[]) {
  return (parts ?? ['']).map((part, index) => `${part}${values[index] ?? ''}`).join('');
}

function mergeHtmlWithCss(html: string, css: string) {
  const stylesheetLinkRegex = /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'][^"']+["'][^>]*>/i;
  const styleTag = `<style>\n${css}\n</style>`;

  if (stylesheetLinkRegex.test(html)) {
    return html.replace(stylesheetLinkRegex, styleTag);
  }

  if (html.includes('</head>')) {
    return html.replace('</head>', `${styleTag}\n</head>`);
  }

  return `${styleTag}\n${html}`;
}

function buildInteractivePreviewDocument(step: LessonStep & { type: 'interactive' }, currentCode: string, blankValues: string[]) {
  if (step.mode !== 'fill-blanks') {
    return step.solvedPreviewHtml ?? currentCode ?? '<!DOCTYPE html><html><body></body></html>';
  }

  const editableTab = step.activeCodeTab ?? 'primary';
  const primaryContent =
    editableTab === 'primary'
      ? fillTemplateParts(step.primaryTemplateParts ?? step.templateParts, blankValues)
      : step.primaryTemplateParts?.join('') ?? step.templateParts?.join('') ?? '';
  const secondaryContent =
    editableTab === 'secondary'
      ? fillTemplateParts(step.secondaryTemplateParts ?? step.templateParts, blankValues)
      : step.secondaryCode ?? step.secondaryTemplateParts?.join('') ?? '';

  if (primaryContent && secondaryContent) {
    return mergeHtmlWithCss(primaryContent, secondaryContent);
  }

  const combinedFallback = primaryContent || secondaryContent || currentCode || '<!DOCTYPE html><html><body></body></html>';
  return step.solvedPreviewHtml ?? combinedFallback;
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

function renderHtmlCodeText(text: string, keyPrefix: string) {
  const tagRegex = /(<\/?)([a-zA-Z0-9-]+)([^>]*?)(\/?>)/g;
  const attrRegex = /([:@a-zA-Z0-9-]+)(=)("[^"]*"|'[^']*')?/g;

  return text.split('\n').map((line, lineIndex, lines) => {
    const pieces: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        pieces.push(
          <span key={`${keyPrefix}-text-${lineIndex}-${lastIndex}`} className="text-[#f3f6ff]">
            {line.slice(lastIndex, match.index)}
          </span>
        );
      }

      const [, open, tagName, attrs, close] = match;
      pieces.push(
        <span key={`${keyPrefix}-open-${lineIndex}-${match.index}`} className="text-[#89b4ff]">
          {open}
        </span>
      );
      pieces.push(
        <span key={`${keyPrefix}-tag-${lineIndex}-${match.index}`} className="text-[#61afef]">
          {tagName}
        </span>
      );

      let attrLastIndex = 0;
      let attrMatch: RegExpExecArray | null;
      while ((attrMatch = attrRegex.exec(attrs)) !== null) {
        if (attrMatch.index > attrLastIndex) {
          pieces.push(
            <span key={`${keyPrefix}-attr-space-${lineIndex}-${match.index}-${attrLastIndex}`} className="text-[#c8d2f0]">
              {attrs.slice(attrLastIndex, attrMatch.index)}
            </span>
          );
        }
        const [, attrName, equals, attrValue = ''] = attrMatch;
        pieces.push(
          <span key={`${keyPrefix}-attr-name-${lineIndex}-${match.index}-${attrMatch.index}`} className="text-[#7dcfff]">
            {attrName}
          </span>
        );
        pieces.push(
          <span key={`${keyPrefix}-attr-equals-${lineIndex}-${match.index}-${attrMatch.index}`} className="text-[#c8d2f0]">
            {equals}
          </span>
        );
        if (attrValue) {
          pieces.push(
            <span key={`${keyPrefix}-attr-value-${lineIndex}-${match.index}-${attrMatch.index}`} className="text-[#f6ad55]">
              {attrValue}
            </span>
          );
        }
        attrLastIndex = attrMatch.index + attrMatch[0].length;
      }

      if (attrs.length > attrLastIndex) {
        pieces.push(
          <span key={`${keyPrefix}-attr-tail-${lineIndex}-${match.index}`} className="text-[#c8d2f0]">
            {attrs.slice(attrLastIndex)}
          </span>
        );
      }

      pieces.push(
        <span key={`${keyPrefix}-close-${lineIndex}-${match.index}`} className="text-[#89b4ff]">
          {close}
        </span>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      pieces.push(
        <span key={`${keyPrefix}-tail-${lineIndex}`} className="text-[#f3f6ff]">
          {line.slice(lastIndex)}
        </span>
      );
    }

    return (
      <span key={`${keyPrefix}-line-${lineIndex}`}>
        {pieces}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    );
  });
}

function renderCssCodeText(text: string, keyPrefix: string) {
  return text.split('\n').map((line, lineIndex, lines) => {
    const tokens = line.split(/(\s+|[{}:;])/g).filter((token) => token.length > 0);

    return (
      <span key={`${keyPrefix}-line-${lineIndex}`}>
        {tokens.map((token, tokenIndex) => {
          if (/^\s+$/.test(token)) {
            return <span key={`${keyPrefix}-space-${lineIndex}-${tokenIndex}`}>{token}</span>;
          }

          let className = 'text-[#f3f6ff]';

          if (/^[{}:;]$/.test(token)) {
            className = 'text-[#c8d2f0]';
          } else if (/^\d+(px|em|rem|%)?$/.test(token)) {
            className = 'text-[#c792ea]';
          } else if (/^(img|body|p|h1|h2|h3|h4|button)$/.test(token)) {
            className = 'text-[#f6ad55]';
          } else if (/^(border|radius|width|height|font-size|background-color|color)$/.test(token)) {
            className = 'text-[#7dcfff]';
          } else if (/^solid$/.test(token)) {
            className = 'text-[#c3e88d]';
          }

          return (
            <span key={`${keyPrefix}-token-${lineIndex}-${tokenIndex}`} className={className}>
              {token}
            </span>
          );
        })}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    );
  });
}

function renderConsoleText(text: string, keyPrefix: string) {
  return text.split('\n').map((line, lineIndex, lines) => (
    <span key={`${keyPrefix}-line-${lineIndex}`}>
      <span className="text-[#f3f6ff]">{line || ' '}</span>
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

function configureMonaco(monaco: Monaco) {
  monaco.editor.defineTheme('codequest-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'tag', foreground: '5DB0FF' },
      { token: 'attribute.name', foreground: '7DCFFF' },
      { token: 'attribute.value', foreground: 'F6AD55' },
      { token: 'number', foreground: 'C792EA' },
      { token: 'string', foreground: 'F6AD55' }
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#E5EEFF',
      'editorLineNumber.foreground': '#6F7AA8',
      'editorLineNumber.activeForeground': '#D7E1FF',
      'editorCursor.foreground': '#9bb0ff',
      'editor.selectionBackground': '#2A355A',
      'editor.inactiveSelectionBackground': '#212A45',
      'editorSuggestWidget.background': '#1A1F2B',
      'editorSuggestWidget.border': '#2A355A',
      'editorSuggestWidget.foreground': '#E5EEFF',
      'editorSuggestWidget.selectedBackground': '#0F4C75',
      'editorHoverWidget.background': '#1A1F2B',
      'editorHoverWidget.border': '#2A355A'
    }
  });
}

function MonacoLoadingShell({ height = '19rem' }: { height?: string }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117]"
      style={{ height }}
    >
      <div className="flex h-full items-center justify-center text-sm text-slate-400">
        Loading editor...
      </div>
    </div>
  );
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
  const lessonStateSignature = useMemo(() => getLessonStateSignature(lesson), [lesson]);
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
    step.type === 'code' || (step.type === 'interactive' && (step.mode === 'fill-blanks' || step.secondaryCodeTitle))
      ? visibleCodeTabByStep[currentStep] ?? step.activeCodeTab ?? 'primary'
      : 'primary';
  const editableCodeTab =
    step.type === 'interactive'
      ? step.mode === 'fill-blanks' || step.secondaryCodeTitle
        ? step.activeCodeTab ?? 'primary'
        : 'primary'
      : 'primary';
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
  const interactivePreviewDocument = step.type === 'interactive'
    ? buildInteractivePreviewDocument(step, currentCode, currentBlankValues)
    : '<!DOCTYPE html><html><body></body></html>';
  const hasSecondaryEditorTab = step.type === 'interactive' && step.mode !== 'fill-blanks' && Boolean(step.secondaryCodeTitle);
  const editorOptions = useMemo(
    () => ({
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'off' as const,
      fontSize: 18,
      lineHeight: 30,
      fontFamily: 'JetBrains Mono, Fira Code, Menlo, Monaco, Consolas, monospace',
      padding: { top: 18, bottom: 18 },
      roundedSelection: false,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      quickSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: 'smart' as const,
      tabSize: 2,
      automaticLayout: true,
      contextmenu: false,
      bracketPairColorization: { enabled: true },
      guides: {
        indentation: true,
        bracketPairs: true
      }
    }),
    []
  );

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
        lessonStateSignature?: string;
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

      if (saved.lessonStateSignature !== lessonStateSignature) {
        const savedCompletedCount = Object.keys(saved.completedSteps ?? {}).length;
        const restoredCompletedSteps = rebuildCompletedSteps(savedCompletedCount, lesson.content.length - 1);
        const restoredCurrentStep = Math.max(0, Math.min(savedCompletedCount, lesson.content.length - 1));
        const restoredFurthestStep = Math.max(
          restoredCurrentStep,
          Math.min(savedCompletedCount, lesson.content.length - 1)
        );

        setCurrentStep(restoredCurrentStep);
        setFurthestStep(restoredFurthestStep);
        setCompletedSteps(restoredCompletedSteps);
        setCodeByStep({});
        setBlankValuesByStep({});
        setActiveBlankByStep({});
        setChipAssignmentsByStep({});
        setBrowserChoices({});
        setRevealedCodePreviewByStep({});
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowCompletionScreen(false);
        setCompletionStage('xp');
        setIsClaimingReward(false);
        return;
      }

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
  }, [lesson.id, lesson.content.length, lessonStateSignature]);

  useEffect(() => {
    const payload = {
      lessonStateSignature,
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
  }, [activeBlankByStep, blankValuesByStep, browserChoices, chipAssignmentsByStep, codeByStep, completedSteps, currentStep, furthestStep, lesson.id, lessonStateSignature, revealedCodePreviewByStep]);

  const interactiveSolved = useMemo(() => {
    if (step.type !== 'interactive') {
      return false;
    }

    if (step.mode !== 'fill-blanks' && step.secondaryCodeTitle === 'style.css') {
      return step.expectedCode.every((snippet) => cssSnippetMatches(currentCode, snippet));
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

    if (step.type === 'code' && (step.previewHtml || step.solvedConsoleOutput) && !revealedCodePreviewByStep[currentStep]) {
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
        lessonStateSignature,
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
              {current.illustration === 'padding-box-model' ? (
                <div className="relative">
                  <div className="absolute inset-0 rounded-[2rem] bg-[#94aaff]/16 blur-[60px]" />
                  <div className="relative rounded-[2rem] bg-[#d9dceb] p-8 shadow-[0_28px_60px_rgba(12,16,38,0.2)]">
                    <div className="relative rounded-[1.25rem] bg-[#6a6ea7] px-7 py-8">
                      <span className="absolute -right-8 -top-8 font-['Space_Grotesk'] text-[2.8rem] font-bold tracking-tight text-[#2c3157]">
                        M
                      </span>
                      <span className="absolute right-2 top-1 font-['Space_Grotesk'] text-[2.8rem] font-bold tracking-tight text-white">
                        B
                      </span>
                      <div className="relative rounded-[1rem] bg-[#eff0f7] px-8 py-7">
                        <span className="absolute right-3 top-2 font-['Space_Grotesk'] text-[2.8rem] font-bold tracking-tight text-[#ff5d79]">
                          P
                        </span>
                        <div className="rounded-[0.85rem] border-[4px] border-dashed border-[#a5abd1] px-7 py-4">
                          <span className="font-['Space_Grotesk'] text-[3rem] font-bold tracking-tight text-[#2c3157]">C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : current.illustration === 'padding-clockwise' ? (
                <div className="relative">
                  <div className="absolute inset-0 rounded-[2rem] bg-[#5ba0ff]/18 blur-[70px]" />
                  <div className="relative flex items-center justify-center">
                    <div className="relative h-[17rem] w-[19rem]">
                      <div className="absolute left-[3.6rem] top-[3.9rem] h-[10.2rem] w-[11.8rem] rounded-[1.4rem] bg-[#fff0bf] shadow-[0_28px_50px_rgba(13,16,34,0.18)]">
                        <div className="absolute left-[1.45rem] top-[4.2rem] h-[4rem] w-[3.4rem] rounded-t-[2rem] bg-[#ffcd1f]" />
                        <div className="absolute left-[4.05rem] top-[2.5rem] h-[2.05rem] w-[2.05rem] rounded-full bg-[#ffcd1f]" />
                        <div className="absolute left-[4.2rem] top-[2.2rem] h-[6.25rem] w-[5.7rem] rotate-45 rounded-[1rem] bg-[#ffcd1f]" />
                        <div className="absolute bottom-0 left-0 h-[3.75rem] w-full bg-[#ffcd1f]" />
                      </div>

                      <div className="absolute left-[7.9rem] top-[1.5rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-[#4391ff] font-['Space_Grotesk'] text-[1.9rem] font-bold text-white shadow-[0_10px_24px_rgba(67,145,255,0.35)]">
                        1
                      </div>
                      <div className="absolute right-[0.9rem] top-[6.2rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-[#4391ff] font-['Space_Grotesk'] text-[1.9rem] font-bold text-white shadow-[0_10px_24px_rgba(67,145,255,0.35)]">
                        2
                      </div>
                      <div className="absolute bottom-[0.95rem] left-[7.95rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-[#4391ff] font-['Space_Grotesk'] text-[1.9rem] font-bold text-white shadow-[0_10px_24px_rgba(67,145,255,0.35)]">
                        3
                      </div>
                      <div className="absolute left-[1rem] top-[6.15rem] flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full bg-[#4391ff] font-['Space_Grotesk'] text-[1.9rem] font-bold text-white shadow-[0_10px_24px_rgba(67,145,255,0.35)]">
                        4
                      </div>

                      <div className="absolute left-[11.1rem] top-[1.95rem] h-[0.45rem] w-[3.85rem] rounded-full bg-[#4391ff]" />
                      <div className="absolute left-[14.45rem] top-[1.95rem] h-[2rem] w-[2rem] rotate-45 border-b-[0.45rem] border-r-[0.45rem] border-[#4391ff]" />

                      <div className="absolute right-[1.55rem] top-[9rem] h-[3.75rem] w-[0.45rem] rounded-full bg-[#4391ff]" />
                      <div className="absolute right-[3.05rem] top-[11.7rem] h-[2rem] w-[2rem] rotate-45 border-b-[0.45rem] border-r-[0.45rem] border-[#4391ff]" />

                      <div className="absolute left-[4.25rem] bottom-[1.65rem] h-[0.45rem] w-[3.8rem] rounded-full bg-[#4391ff]" />
                      <div className="absolute left-[8.2rem] bottom-[0.95rem] h-[2rem] w-[2rem] rotate-45 border-b-[0.45rem] border-r-[0.45rem] border-[#4391ff]" />

                      <div className="absolute left-[2.1rem] top-[9.1rem] h-[3.75rem] w-[0.45rem] rounded-full bg-[#4391ff]" />
                      <div className="absolute left-[1.25rem] top-[10.6rem] h-[2rem] w-[2rem] rotate-45 border-l-[0.45rem] border-t-[0.45rem] border-[#4391ff]" />
                    </div>
                  </div>
                </div>
              ) : current.illustration === 'boolean-true' ? (
                <div className="relative h-[18rem] w-[22rem]">
                  <div className="absolute inset-x-8 bottom-8 h-[8.7rem] rounded-[1.35rem] bg-[#e2b417] shadow-[0_26px_45px_rgba(12,16,38,0.24)]" />
                  <div className="absolute bottom-[8.15rem] left-6 h-[4.6rem] w-[8.8rem] skew-x-[-22deg] rounded-[1.1rem] bg-[#f1c51e] shadow-[0_18px_35px_rgba(12,16,38,0.16)]" />
                  <div className="absolute bottom-[8.15rem] right-[5.7rem] h-[4.6rem] w-[8.8rem] skew-x-[22deg] rounded-[1.1rem] bg-[#f1c51e] shadow-[0_18px_35px_rgba(12,16,38,0.16)]" />
                  <div className="absolute bottom-[8.15rem] left-[9.8rem] h-[8.7rem] w-5 bg-[#d5a915]" />

                  <div className="absolute left-[10.3rem] top-0 flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-[#76dc66] shadow-[inset_-18px_0_0_rgba(42,130,47,0.25),0_18px_36px_rgba(12,16,38,0.2)]">
                    <Check className="h-[4.2rem] w-[4.2rem] stroke-[4] text-white" />
                  </div>

                  <div className="absolute left-[2.4rem] top-[2.3rem] h-[1.3rem] w-[4.6rem]">
                    <div className="absolute left-[1.65rem] top-0 h-full w-[1.3rem] bg-[#ffd84d]" />
                    <div className="absolute left-0 top-[0.45rem] h-[0.45rem] w-full bg-[#ffd84d]" />
                  </div>

                  <div className="absolute bottom-7 right-0 h-[14.5rem] w-[12.8rem]">
                    <div className="absolute left-[0.65rem] top-[0.9rem] h-[11.4rem] w-[11.4rem] rounded-[3.2rem] bg-[#eef0ff]" />
                    <div className="absolute left-[1.8rem] top-[2.15rem] h-[7.75rem] w-[9.2rem] rounded-[2.25rem] border-[0.75rem] border-[#aeb6d7] bg-[#25294f]">
                      <div className="absolute left-[1.7rem] top-[2rem] h-[1.55rem] w-[1.55rem] rounded-t-full bg-[#18c7f3]" />
                      <div className="absolute right-[1.7rem] top-[2rem] h-[1.55rem] w-[1.55rem] rounded-t-full bg-[#18c7f3]" />
                      <div className="absolute bottom-[1.6rem] left-[3.1rem] h-[1.25rem] w-[3.6rem] rounded-b-[0.25rem] bg-[#18c7f3]" />
                    </div>
                    <div className="absolute bottom-0 left-[3.3rem] h-[3rem] w-[4.15rem] rounded-[1rem] bg-[#aeb6d7]" />
                    <div className="absolute bottom-0 right-[0.8rem] h-[3rem] w-[4.15rem] rounded-[1rem] bg-[#aeb6d7]" />
                    <div className="absolute bottom-[3.7rem] left-[7.1rem] flex gap-2">
                      <span className="h-4 w-4 rounded-full bg-[#aeb6d7]" />
                      <span className="h-4 w-4 rounded-full bg-[#aeb6d7]" />
                      <span className="h-3.5 w-3.5 rounded-full bg-[#5cfd80]" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 scale-125 rounded-full bg-[#94aaff]/14 blur-[70px]" />
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-[#94aaff]/15 bg-[#161b24] shadow-[0_0_40px_rgba(148,170,255,0.12)]">
                    <Bot className="h-24 w-24 text-[#8ea2ff]" />
                  </div>
                </div>
              )}
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
      const showCodePreview = Boolean((current.previewHtml || current.solvedConsoleOutput) && revealedCodePreviewByStep[currentStep]);
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
                  {current.previewTitle ?? (current.solvedConsoleOutput ? 'Console output' : 'Browser')}
                </div>
                {current.solvedConsoleOutput ? (
                  <div className="h-[24rem] overflow-auto bg-[rgba(49,51,92,0.88)] p-5 font-mono text-[1.05rem] leading-8">
                    <pre className="whitespace-pre-wrap text-[#f3f6ff]">
                      <code>{renderConsoleText(current.solvedConsoleOutput, 'code-console')}</code>
                    </pre>
                  </div>
                ) : (
                  <iframe
                    title={current.previewTitle ?? 'Browser'}
                    sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                    srcDoc={current.previewHtml}
                    className="h-[24rem] w-full bg-white"
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      );
    }

    if (current.type === 'interactive') {
      if (current.mode === 'fill-blanks') {
        const useMonacoLikeBlankEditor = current.editorStyle !== 'default';
        const visibleTemplateLineCount = Math.max(1, visibleTemplateParts.join('').split('\n').length);
        const isEditableVisibleTab = currentVisibleCodeTab === editableCodeTab;
        const visibleLanguage = currentVisibleCodeTab === 'secondary' ? 'css' : 'html';
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
                  {useMonacoLikeBlankEditor && !isEditableVisibleTab ? (
                    <Suspense fallback={<MonacoLoadingShell height="21rem" />}>
                      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117]">
                        <MonacoEditor
                          beforeMount={configureMonaco}
                          theme="codequest-dark"
                          height="21rem"
                          defaultLanguage={visibleLanguage}
                          language={visibleLanguage}
                          path={`lesson-${lesson.id}-step-${currentStep}-fill-${currentVisibleCodeTab}.${visibleLanguage}`}
                          value={visibleTemplateParts.join('')}
                          options={{
                            ...editorOptions,
                            readOnly: true,
                            domReadOnly: true
                          }}
                        />
                      </div>
                    </Suspense>
                  ) : (
                    <div className={`h-[19rem] rounded-2xl border border-white/5 bg-[#0d1117] font-mono text-sm leading-6 text-slate-100 sm:h-[21rem] sm:text-[15px] sm:leading-6 ${useMonacoLikeBlankEditor ? 'overflow-hidden p-0' : 'p-4 sm:p-4'}`}>
                      <div className={`lesson-code-scrollbar h-full overflow-x-auto overflow-y-auto ${useMonacoLikeBlankEditor ? '' : 'pr-2'}`}>
                        {useMonacoLikeBlankEditor ? (
                          <div className="flex min-w-max text-[14px] leading-[1.8] sm:text-[15px]">
                            <div className="select-none border-r border-white/5 bg-[#10151d] px-4 py-5 text-right text-[#6f7aa8]">
                              {Array.from({ length: visibleTemplateLineCount }, (_, index) => (
                                <div key={`line-number-${index + 1}`} className="h-[32px]">
                                  {index + 1}
                                </div>
                              ))}
                            </div>
                            <div className="whitespace-pre-wrap break-words px-5 py-5">
                              {visibleTemplateParts.map((part, index) => (
                                <span key={`template-${index}`}>
                                  {currentVisibleCodeTab === 'secondary'
                                    ? renderCssCodeText(part, `css-part-${index}`)
                                    : renderHtmlCodeText(part, `html-part-${index}`)}
                                  {isEditableVisibleTab && index < (current.blankAnswers?.length ?? 0) ? (
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
                                          : 'border-[#5cfd80]/45 bg-[#1f4d33] text-[#d8ffe4] focus:border-[#7dff9a]/65 focus:bg-[#25603f] focus:ring-[#5cfd80]/25'
                                      }`}
                                    />
                                  ) : null}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : (
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
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {showFeedback && interactiveSolved && (
                <div className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                  <div className="border-b border-white/5 bg-[#151a21] px-4 py-2.5 text-xs font-semibold text-slate-100 sm:px-5 sm:py-3 sm:text-sm">
                    {current.previewTitle ?? (current.solvedConsoleOutput ? 'Console output' : 'Browser')}
                  </div>
                  {current.solvedConsoleOutput ? (
                    <div className="h-[19rem] overflow-auto bg-[rgba(49,51,92,0.88)] p-5 font-mono text-[1.05rem] leading-8 sm:h-[21rem]">
                      <pre className="whitespace-pre-wrap text-[#f3f6ff]">
                        <code>{renderConsoleText(current.solvedConsoleOutput, 'interactive-console-fill')}</code>
                      </pre>
                    </div>
                  ) : (
                    <iframe
                      title="Live Preview"
                      sandbox="allow-scripts"
                      srcDoc={interactivePreviewDocument}
                      className="h-[19rem] w-full bg-white sm:h-[21rem]"
                    />
                  )}
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
                {!hasSecondaryEditorTab || currentVisibleCodeTab === 'secondary' ? (
                  <Suspense fallback={<MonacoLoadingShell height="19rem" />}>
                    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117]">
                      <MonacoEditor
                        beforeMount={configureMonaco}
                        theme="codequest-dark"
                        height="19rem"
                        defaultLanguage={hasSecondaryEditorTab ? 'css' : 'html'}
                        language={hasSecondaryEditorTab ? 'css' : 'html'}
                        path={`lesson-${lesson.id}-step-${currentStep}.${hasSecondaryEditorTab ? 'css' : 'html'}`}
                        value={currentCode}
                        onChange={(value) => {
                          setCodeByStep((prev) => ({
                            ...prev,
                            [currentStep]: value ?? ''
                          }));
                          setShowFeedback(false);
                        }}
                        options={{
                          ...editorOptions,
                          readOnly: false
                        }}
                      />
                    </div>
                  </Suspense>
                ) : (
                  <Suspense fallback={<MonacoLoadingShell height="19rem" />}>
                    <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0d1117]">
                      <MonacoEditor
                        beforeMount={configureMonaco}
                        theme="codequest-dark"
                        height="19rem"
                        defaultLanguage="html"
                        language="html"
                        path={`lesson-${lesson.id}-step-${currentStep}.html`}
                        value={current.code ?? ''}
                        options={{
                          ...editorOptions,
                          readOnly: true,
                          domReadOnly: true
                        }}
                      />
                    </div>
                  </Suspense>
                )}
              </div>
            </div>

            {showFeedback && interactiveSolved && (
              <div className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                <div className="border-b border-white/5 bg-[#151a21] px-5 py-3 text-sm font-semibold text-slate-100">
                  {current.previewTitle ?? (current.solvedConsoleOutput ? 'Console output' : 'Browser')}
                </div>
                {current.solvedConsoleOutput ? (
                  <div className="h-[16rem] overflow-auto bg-[rgba(49,51,92,0.88)] p-5 font-mono text-[1.05rem] leading-8">
                    <pre className="whitespace-pre-wrap text-[#f3f6ff]">
                      <code>{renderConsoleText(current.solvedConsoleOutput, 'interactive-console-editor')}</code>
                    </pre>
                  </div>
                ) : (
                  <iframe
                    title="Live Preview"
                    sandbox="allow-scripts"
                    srcDoc={(current.solvedPreviewHtml ?? currentCode) || '<!DOCTYPE html><html><body></body></html>'}
                    className="h-[16rem] w-full bg-white"
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-col items-center gap-4">
            <div className="min-h-[1.25rem]">
              {current.helperText && !showFeedback && <p className="text-center text-sm text-[#a8abb3]">{current.helperText}</p>}
              {showFeedback && !interactiveSolved && (
                <p className="mt-2 text-center text-sm text-rose-300">
                  Not quite yet. Match the target code and try again.
                </p>
              )}
            </div>
            {current.mode !== 'editor' && current.showExpectedCode !== false && (
              <div className="rounded-full border border-[#94aaff]/20 bg-[#94aaff]/10 px-4 py-2 font-mono text-sm text-[#94aaff]">
                {current.expectedCode[0]}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-3xl">
        <p className="mb-8 text-center text-lg leading-relaxed text-white sm:text-xl">{renderHighlightedText(current.data)}</p>
        {(current.code ||
          (showFeedback && selectedAnswer === current.correctAnswer && (current.solvedPreviewHtml || current.solvedConsoleOutput))) && (
          <div
            className={`mb-6 grid gap-6 ${
              showFeedback && selectedAnswer === current.correctAnswer && (current.solvedPreviewHtml || current.solvedConsoleOutput)
                ? 'lg:grid-cols-[1.2fr_0.72fr]'
                : 'grid-cols-1'
            }`}
          >
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

            {showFeedback && selectedAnswer === current.correctAnswer && current.solvedConsoleOutput && (
              <div className="self-start overflow-hidden rounded-[1.5rem] border border-white/5 bg-[rgba(21,26,33,0.68)] shadow-[0_20px_40px_rgba(0,0,0,0.24)] backdrop-blur-[20px]">
                <div className="border-b border-white/5 bg-[#151a21] px-5 py-3 text-sm font-semibold text-slate-100">
                  {current.previewTitle ?? 'Console output'}
                </div>
                <div className="h-[16rem] overflow-auto bg-[rgba(49,51,92,0.88)] p-5 font-mono text-[1.05rem] leading-8">
                  <pre className="whitespace-pre-wrap text-[#f3f6ff]">
                    <code>{renderConsoleText(current.solvedConsoleOutput, 'quiz-console')}</code>
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

  const canContinueReviewedStep = Boolean(completedSteps[currentStep]) || currentStep < furthestStep;

  const primaryAction = () => {
    if (canContinueReviewedStep) {
      return {
        label: isLastStep ? 'Complete Lesson' : 'Continue',
        disabled: false,
        onClick: handleHeaderNext
      };
    }

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
      label: step.type === 'code' && step.actionLabel ? step.actionLabel : isLastStep ? 'Complete Lesson' : 'Continue',
      disabled: false,
      onClick: handleNext
    };
  };

  const action = primaryAction();
  const showExplainPrompt =
    (step.type === 'quiz' && showFeedback && selectedAnswer === step.correctAnswer) ||
    (step.type === 'interactive' && showFeedback && interactiveSolved) ||
    (step.type === 'browser-demo' && showFeedback && browserSolved) ||
    (step.type === 'code' && Boolean(step.solvedConsoleOutput && revealedCodePreviewByStep[currentStep]));

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

    if (step.type === 'code') {
      return `Explain this code result simply. Lesson: ${lesson.title}. Step: ${step.data}. Code: ${step.code}. Output: ${step.solvedConsoleOutput ?? 'No output'}.`;
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
