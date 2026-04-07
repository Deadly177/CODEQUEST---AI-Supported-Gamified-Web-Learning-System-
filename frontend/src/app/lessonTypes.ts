export type LessonStep =
  | {
      type: 'intro';
      data: string;
      secondaryText?: string;
      accentText?: string;
    }
  | {
      type: 'text';
      data: string;
      secondaryText?: string;
    }
  | {
      type: 'browser-demo';
      data: string;
      secondaryText?: string;
      browserTitle: string;
      maskedWord: string;
      revealWord: string;
      choices: string[];
      correctChoice: string;
      imageUrl?: string;
      imageAlt?: string;
      successTitle?: string;
      previewHint?: string;
    }
  | {
      type: 'browser-preview';
      data: string;
      secondaryText?: string;
      browserTitle: string;
      previewHint?: string;
      previewHtml: string;
    }
  | {
      type: 'code';
      data: string;
      code: string;
    }
  | {
      type: 'quiz';
      data: string;
      options: string[];
      correctAnswer: number;
    }
  | {
      type: 'interactive';
      data: string;
      initialCode?: string;
      expectedCode: string[];
      previewTitle?: string;
      solvedPreviewHtml?: string;
      helperText?: string;
      placeholder?: string;
      successMessage?: string;
      mode?: 'editor' | 'fill-blanks';
      templateParts?: string[];
      blankAnswers?: string[];
      blankPlaceholders?: string[];
      promptChips?: string[];
    };

export type LessonDefinition = {
  id: string;
  title: string;
  content: LessonStep[];
  xpReward: number;
};
