import { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Achievements } from './components/Achievements';
import { Leaderboard } from './components/Leaderboard';
import { CourseSelection } from './components/CourseSelection';
import { CourseView } from './components/CourseView';
import { LessonPlayer } from './components/LessonPlayer';
import { LessonsOverview } from './components/LessonsOverview';
import { AuthScreen } from './components/AuthScreen';
import { UserSettings } from './components/UserSettings';
import { StudyAssistant } from './components/StudyAssistant';
import { Performance } from './components/Performance';
import { DashboardAssistant } from './components/DashboardAssistant';
import { htmlCourseDetail, htmlLessonContent } from './courses/html';
import { cssCourseDetail, cssLessonContent } from './courses/css';
import { javascriptLessonContent } from './courses/javascript';
import type { LessonDefinition } from './lessonTypes';
import {
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Code2,
  GraduationCap,
  Grid2x2,
  LibraryBig,
  LogOut,
  Palette,
  Settings,
  Trophy,
  Zap
} from 'lucide-react';

type View = 'home' | 'learn' | 'lessons' | 'frontend-path' | 'course-view' | 'lesson' | 'assistant' | 'achievements' | 'leaderboard' | 'performance' | 'settings';

type UserStats = {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  totalPoints: number;
  badges: string[];
};

type CourseSummary = {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  icon: 'html' | 'css' | 'javascript' | 'backend';
  color: string;
};

type CourseDetail = {
  course: {
    id: string;
    title: string;
    description: string;
    totalLessons: number;
  };
  sections: {
    id: string;
    number: number;
    title: string;
    progress: string;
    description?: string;
    icon?: string;
    lessons: {
      id: string;
      number: number;
      title: string;
      type: 'learn' | 'practice';
      completed: boolean;
      locked: boolean;
      xpReward: number;
    }[];
  }[];
  lessonTracks?: Record<string, {
    label: string;
    lessons: {
      id: string;
      number: number;
      title: string;
      type: 'learn' | 'practice';
      completed: boolean;
      locked: boolean;
      xpReward: number;
    }[];
  }>;
  certificate: {
    progress: number;
    total: number;
    completedLessons: number;
  };
};

type LeaderboardEntry = {
  rank: number;
  name: string;
  xp: number;
  level: number;
  avatar: string;
};

type AuthUser = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
};

type QuizInsight = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
} | null;

const defaultUserStats: UserStats = {
  name: 'Learner',
  level: 1,
  xp: 0,
  xpToNextLevel: 250,
  streak: 0,
  totalPoints: 0,
  badges: []
};

const seededCourses: CourseSummary[] = [
  {
    id: 'html',
    title: 'HTML',
    description: 'Learn the building blocks of web pages. Master HTML tags, structure, and semantic elements.',
    progress: 15,
    totalLessons: 20,
    completedLessons: 3,
    icon: 'html',
    color: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Style your websites beautifully. Learn selectors, layouts, animations, and responsive design.',
    progress: 15,
    totalLessons: 25,
    completedLessons: 4,
    icon: 'css',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Bring your websites to life. Learn variables, functions, DOM manipulation, and modern ES6+ features.',
    progress: 15,
    totalLessons: 30,
    completedLessons: 5,
    icon: 'javascript',
    color: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  },
  {
    id: 'react',
    title: 'React',
    description: 'Build powerful user interfaces with components. Learn hooks, state management, and modern React patterns.',
    progress: 0,
    totalLessons: 28,
    completedLessons: 0,
    icon: 'html',
    color: 'bg-gradient-to-br from-cyan-400 to-blue-500'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Add type safety to JavaScript. Master interfaces, types, generics, and build scalable applications.',
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    icon: 'css',
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700'
  },
  {
    id: 'nodejs',
    title: 'Node.js',
    description: 'Build backend services, REST APIs, and server-side apps with JavaScript.',
    progress: 0,
    totalLessons: 24,
    completedLessons: 0,
    icon: 'backend',
    color: 'bg-gradient-to-br from-green-500 to-emerald-700'
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Learn backend scripting, automation, and API development with Python.',
    progress: 0,
    totalLessons: 26,
    completedLessons: 0,
    icon: 'backend',
    color: 'bg-gradient-to-br from-sky-500 to-blue-700'
  },
  {
    id: 'sql',
    title: 'SQL',
    description: 'Work with relational databases, queries, joins, and data modeling.',
    progress: 0,
    totalLessons: 18,
    completedLessons: 0,
    icon: 'backend',
    color: 'bg-gradient-to-br from-violet-500 to-purple-700'
  },
  {
    id: 'apis',
    title: 'API Development',
    description: 'Design and build scalable APIs, authentication flows, and integrations.',
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    icon: 'backend',
    color: 'bg-gradient-to-br from-teal-500 to-cyan-700'
  }
];

const seededJavascriptDetail: CourseDetail = {
  course: {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Bring your websites to life. Learn variables, functions, DOM manipulation, and modern ES6+ features.',
    totalLessons: 30
  },
  sections: [
    {
      id: 'js-basics',
      number: 1,
      title: 'JavaScript Basics',
      progress: '0/5',
      icon: '📝',
      lessons: [
        { id: 'js-1', number: 1, title: 'Creating Variables', type: 'learn', completed: false, locked: false, xpReward: 50 },
        { id: 'js-2', number: 2, title: 'Using Variables', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-3', number: 3, title: 'Using True and False', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-4', number: 4, title: 'Checking Number Equality', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-5', number: 5, title: 'JavaScript Basics', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    },
    {
      id: 'types',
      number: 2,
      title: 'Types and Comparisons',
      progress: '0/6',
      icon: '🔢',
      lessons: [
        { id: 'js-6', number: 1, title: 'Understanding Data Types', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-7', number: 2, title: 'Type Conversion', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-8', number: 3, title: 'Comparison Operators', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-9', number: 4, title: 'Logical Operators', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-10', number: 5, title: 'Strict vs Loose Equality', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-11', number: 6, title: 'Types Challenge', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    },
    {
      id: 'conditionals',
      number: 3,
      title: 'Conditionals',
      progress: '0/5',
      icon: '🔀',
      lessons: [
        { id: 'js-12', number: 1, title: 'If Statements', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-13', number: 2, title: 'Else Statements', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-14', number: 3, title: 'Else If', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-15', number: 4, title: 'Switch Statements', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-16', number: 5, title: 'Conditionals Practice', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    },
    {
      id: 'loops',
      number: 4,
      title: 'Loops',
      progress: '0/5',
      icon: '🔄',
      lessons: [
        { id: 'js-17', number: 1, title: 'While Loops', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-18', number: 2, title: 'For Loops', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-19', number: 3, title: 'Loop Control', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-20', number: 4, title: 'Nested Loops', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-21', number: 5, title: 'Loops Challenge', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    },
    {
      id: 'functions',
      number: 5,
      title: 'Functions',
      progress: '0/6',
      icon: '⚙️',
      lessons: [
        { id: 'js-22', number: 1, title: 'Creating Functions', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-23', number: 2, title: 'Function Parameters', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-24', number: 3, title: 'Return Values', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-25', number: 4, title: 'Arrow Functions', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-26', number: 5, title: 'Callback Functions', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'js-27', number: 6, title: 'Functions Practice', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    }
  ],
  certificate: {
    progress: 0,
    total: 16,
    completedLessons: 0
  }
};

const seededHtmlDetail: CourseDetail = htmlCourseDetail;
const seededCssDetail: CourseDetail = cssCourseDetail;

function shouldUseSeededCourses(liveCourses: CourseSummary[]) {
  return liveCourses.length === 0 || !liveCourses.some((course) => course.progress > 0 || course.completedLessons > 0);
}

function mergeCourses(liveCourses: CourseSummary[]) {
  const byId = new Map(seededCourses.map((course) => [course.id, course]));

  for (const course of liveCourses) {
    byId.set(course.id, {
      ...byId.get(course.id),
      ...course
    });
  }

  return Array.from(byId.values());
}

function getFallbackCourseDetail(courseId: string): CourseDetail | null {
  if (courseId === 'html') {
    return seededHtmlDetail;
  }

  if (courseId === 'javascript') {
    return seededJavascriptDetail;
  }

  if (courseId === 'css') {
    return seededCssDetail;
  }

  const fallbackCourse = seededCourses.find((course) => course.id === courseId);
  if (!fallbackCourse) {
    return null;
  }

  return {
    course: {
      id: fallbackCourse.id,
      title: fallbackCourse.title,
      description: fallbackCourse.description,
      totalLessons: fallbackCourse.totalLessons
    },
    sections: [],
    certificate: {
      progress: fallbackCourse.progress,
      total: fallbackCourse.totalLessons,
      completedLessons: fallbackCourse.completedLessons
    }
  };
}

function mergeCourseDetailWithSeeded(courseId: string, liveDetail: CourseDetail): CourseDetail {
  const fallbackDetail = getFallbackCourseDetail(courseId);

  if (!fallbackDetail || fallbackDetail.sections.length === 0) {
    return liveDetail;
  }

  const liveSectionsById = new Map(liveDetail.sections.map((section) => [section.id, section]));
  const mergedSections = fallbackDetail.sections.map((fallbackSection) => {
    const liveSection = liveSectionsById.get(fallbackSection.id);
    if (!liveSection) {
      return fallbackSection;
    }

    const liveLessonsById = new Map(liveSection.lessons.map((lesson) => [lesson.id, lesson]));

    return {
      ...fallbackSection,
      ...liveSection,
      description: fallbackSection.description ?? liveSection.description,
      lessons: fallbackSection.lessons.map((fallbackLesson) => ({
        ...fallbackLesson,
        ...(liveLessonsById.get(fallbackLesson.id) ?? {})
      }))
    };
  });

  const extraLiveSections = liveDetail.sections.filter(
    (section) => !fallbackDetail.sections.some((fallbackSection) => fallbackSection.id === section.id)
  );

  return {
    ...liveDetail,
    course: {
      ...liveDetail.course,
      ...fallbackDetail.course
    },
    sections: [...mergedSections, ...extraLiveSections],
    certificate: {
      ...liveDetail.certificate,
      total: fallbackDetail.certificate.total
    }
  };
}

function normalizeTrackLessonId(lessonId: string) {
  const lessonAliases: Record<string, string> = {
    'css-track-1': 'css-1',
    'css-track-2': 'css-1',
    'css-track-3': 'css-1',
    'css-track-4': 'css-1',
    'css-track-5': 'css-3',
    'css-track-6': 'css-3'
  };

  return lessonAliases[lessonId] ?? lessonId;
}

function getUserTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

function parseJwt(token: string) {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const payload = parseJwt(token);
  if (!payload?.exp) {
    return false;
  }
  return payload.exp * 1000 <= Date.now();
}

function loadStoredToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  const localToken = window.localStorage.getItem('auth_token');
  if (localToken) {
    return localToken;
  }

  return window.sessionStorage.getItem('auth_token');
}

function buildAchievements(userStats: UserStats, courses: CourseSummary[]) {
  const totalCompletedLessons = courses.reduce((sum, course) => sum + course.completedLessons, 0);
  const anyCompletedCourse = courses.some((course) => course.progress === 100);

  return [
    { id: '1', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', unlocked: totalCompletedLessons >= 1 },
    { id: '2', title: 'Quick Learner', description: 'Complete 5 lessons', icon: '⚡', unlocked: totalCompletedLessons >= 5 },
    { id: '3', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', unlocked: userStats.streak >= 7 },
    { id: '4', title: 'Quiz Master', description: 'Complete 10 lessons', icon: '🎓', unlocked: totalCompletedLessons >= 10 },
    { id: '5', title: 'Persistent', description: 'Maintain a 30-day streak', icon: '💪', unlocked: userStats.streak >= 30 },
    { id: '6', title: 'Course Champion', description: 'Complete your first course', icon: '🏆', unlocked: anyCompletedCourse },
    { id: '7', title: 'Code Ninja', description: 'Complete 50 lessons', icon: '🥷', unlocked: totalCompletedLessons >= 50 },
    { id: '8', title: 'Night Owl', description: 'Complete a lesson after midnight', icon: '🦉', unlocked: false }
  ];
}

export default function App() {
  const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5001';
  const [authToken, setAuthToken] = useState<string | null>(() => loadStoredToken());
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [assistantOpenSignal, setAssistantOpenSignal] = useState(0);
  const [assistantPromptSignal, setAssistantPromptSignal] = useState<{ id: number; prompt: string } | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);
  const [courses, setCourses] = useState<CourseSummary[]>(seededCourses);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [latestQuizInsight, setLatestQuizInsight] = useState<QuizInsight>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);

  const courseIconMap = {
    html: Code2,
    css: Palette,
    javascript: Zap,
    backend: Code2
  };

  const sampleLesson: LessonDefinition = javascriptLessonContent['js-1'];

  function getLessonContent(courseId: string | null, lessonId: string | null): LessonDefinition {
    if (courseId === 'html' && lessonId && lessonId in htmlLessonContent) {
      return htmlLessonContent[lessonId as keyof typeof htmlLessonContent];
    }

    if (courseId === 'css' && lessonId && lessonId in cssLessonContent) {
      return cssLessonContent[lessonId as keyof typeof cssLessonContent];
    }

    if (courseId === 'javascript' && lessonId && lessonId in javascriptLessonContent) {
      return javascriptLessonContent[lessonId as keyof typeof javascriptLessonContent];
    }

    return {
      ...sampleLesson,
      id: lessonId ?? sampleLesson.id
    };
  }

  async function apiFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-User-Timezone': getUserTimeZone(),
        ...(init?.headers ?? {})
      }
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Request failed');
    }

    return payload as T;
  }

  async function loadAppData(token: string) {
    setIsLoadingData(true);
    setDataError(null);

    try {
      const [profilePayload, progressPayload, leaderboardPayload] = await Promise.all([
        apiFetch<{ user: AuthUser; stats: UserStats }>('/api/users/me', token),
        apiFetch<{ stats: UserStats; courses: CourseSummary[] }>('/api/progress', token),
        apiFetch<{ entries: LeaderboardEntry[] }>('/api/progress/leaderboard', token)
      ]);

      setAuthEmail(profilePayload.user.email);
      setProfile(profilePayload.user);
      setUserStats(progressPayload.stats ?? profilePayload.stats);
      setCourses(shouldUseSeededCourses(progressPayload.courses) ? seededCourses : mergeCourses(progressPayload.courses));
      setLeaderboardData(leaderboardPayload.entries);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load dashboard data';
      setDataError(message);
    } finally {
      setIsLoadingData(false);
    }
  }

  async function loadCourseDetail(token: string, courseId: string) {
    try {
      const payload = await apiFetch<CourseDetail>(`/api/progress/courses/${courseId}`, token);
      setCourseDetail(
        payload.sections.length > 0 || payload.course.id !== 'javascript'
          ? mergeCourseDetailWithSeeded(courseId, payload)
          : getFallbackCourseDetail(courseId)
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load course details';
      setDataError(message);
      setCourseDetail(getFallbackCourseDetail(courseId));
    }
  }

  const achievements = buildAchievements(userStats, courses);
  const selectedLessonMeta = courseDetail?.sections
    .flatMap((section) => section.lessons)
    .find((lesson) => lesson.id === selectedLesson);

  const activeLessonBase = getLessonContent(selectedCourse, selectedLesson ?? null);

  const activeLesson: LessonDefinition = {
    ...activeLessonBase,
    id: selectedLessonMeta?.id ?? activeLessonBase.id ?? sampleLesson.id,
    title: selectedLessonMeta?.title ?? activeLessonBase.title,
    xpReward: selectedLessonMeta?.xpReward ?? activeLessonBase.xpReward
  };

  const assistantContext = [
    `Current view: ${currentView}`,
    `Student name: ${userStats.name}`,
    selectedCourse ? `Selected course: ${selectedCourse}` : '',
    courseDetail?.course.title ? `Course title: ${courseDetail.course.title}` : '',
    courseDetail?.course.description ? `Course description: ${courseDetail.course.description}` : '',
    selectedLessonMeta?.title ? `Current lesson: ${selectedLessonMeta.title}` : '',
    currentView === 'lesson'
      ? `Lesson content: ${activeLesson.content
          .map((item) => [item.data, item.code, item.options?.join(', ')].filter(Boolean).join(' '))
          .join(' ')}`
      : '',
    latestQuizInsight
      ? `Latest quiz result: Question="${latestQuizInsight.question}" Selected="${latestQuizInsight.selectedAnswer}" Correct="${latestQuizInsight.correctAnswer}" Result=${latestQuizInsight.isCorrect ? 'correct' : 'incorrect'}`
      : ''
  ]
    .filter(Boolean)
    .join('\n');

  const assistantThreadKey = selectedLesson
    ? `lesson:${selectedLesson}`
    : selectedCourse
    ? `course:${selectedCourse}`
    : `view:${currentView}`;

  const assistantQuickPrompts = [
    'Explain this lesson',
    'Give me a practice question',
    'Summarize the topic simply',
    ...(!latestQuizInsight || latestQuizInsight.isCorrect ? [] : ['Explain my last quiz mistake'])
  ];
  const dashboardAssistantQuickPrompts = [
    'Where should I start in coding?',
    'Which language should I learn first?',
    'Explain this lesson',
    'Give me a practice question',
    'Summarize the topic simply',
    ...(!latestQuizInsight || latestQuizInsight.isCorrect ? [] : ['Explain my last quiz mistake'])
  ];
  const useCourseLayout = currentView === 'course-view' || currentView === 'lesson';
  const useLessonLayout = currentView === 'lesson';

  useEffect(() => {
    if (!authToken) {
      setAuthEmail(null);
      setProfile(null);
      setUserStats(defaultUserStats);
      setCourses(seededCourses);
      setCourseDetail(null);
      setLeaderboardData([]);
      return;
    }

    if (isTokenExpired(authToken)) {
      window.localStorage.removeItem('auth_token');
      window.sessionStorage.removeItem('auth_token');
      setAuthToken(null);
      return;
    }

    const payload = parseJwt(authToken);
    setAuthEmail(payload?.email ?? null);
    setUserStats((prev) => ({
      ...prev,
      name: payload?.name ?? payload?.email?.split('@')[0] ?? defaultUserStats.name
    }));
    void loadAppData(authToken);
  }, [authToken]);

  useEffect(() => {
    if (!authToken || !selectedCourse || currentView !== 'course-view') {
      return;
    }

    void loadCourseDetail(authToken, selectedCourse);
  }, [authToken, currentView, selectedCourse]);

  const handleStartCourse = (courseId: string) => {
    window.localStorage.setItem('codequest_recent_course', courseId);
    setSelectedCourse(courseId);
    setSelectedLesson(null);
    setCourseDetail(null);
    setLatestQuizInsight(null);
    setCurrentView('course-view');
  };

  const handleStartLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setLatestQuizInsight(null);
    setCurrentView('lesson');
  };

  const handleUpdateProfileName = async (name: string) => {
    if (!authToken) {
      return;
    }

    const payload = await apiFetch<{ user: AuthUser; stats: UserStats }>('/api/users/me', authToken, {
      method: 'PATCH',
      body: JSON.stringify({ name })
    });

    setProfile(payload.user);
    setUserStats(payload.stats);
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    if (!authToken) {
      return;
    }

    await apiFetch<{ message: string }>('/api/users/me/password', authToken, {
      method: 'PATCH',
      body: JSON.stringify({ currentPassword, newPassword })
    });
  };

  const handleLessonComplete = async (_xpEarned: number) => {
    if (!authToken || !selectedLesson) {
      return;
    }

    const progressLessonId = normalizeTrackLessonId(selectedLesson);

    setIsCompletingLesson(true);
    setDataError(null);

    try {
      const payload = await apiFetch<{
        awardedPoints: number;
        alreadyCompleted: boolean;
        stats: UserStats;
        courses: CourseSummary[];
        courseDetail: CourseDetail | null;
      }>(`/api/progress/lessons/${progressLessonId}/complete`, authToken, {
        method: 'POST'
      });

      setUserStats(payload.stats);
      setCourses(payload.courses);
      setCourseDetail(payload.courseDetail);
      const leaderboardPayload = await apiFetch<{ entries: LeaderboardEntry[] }>('/api/progress/leaderboard', authToken);
      setLeaderboardData(leaderboardPayload.entries);
      alert(
        payload.alreadyCompleted
          ? 'Lesson was already completed earlier.'
          : `Lesson complete!\nXP earned: +${payload.awardedPoints}`
      );
      setCurrentView('course-view');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save lesson progress';
      setDataError(message);
      alert(message);
    } finally {
      setIsCompletingLesson(false);
    }
  };

  if (!authToken) {
    return (
      <AuthScreen
        onSuccess={(token, remember, user) => {
          if (remember) {
            window.localStorage.setItem('auth_token', token);
            window.sessionStorage.removeItem('auth_token');
          } else {
            window.sessionStorage.setItem('auth_token', token);
            window.localStorage.removeItem('auth_token');
          }
          setAuthEmail(user.email);
          setProfile(user);
          setUserStats((prev) => ({
            ...prev,
            name: user.name
          }));
          setAuthToken(token);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] text-[#f1f3fc]">
      {!useLessonLayout && (
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-[#0f141a] py-8 shadow-2xl shadow-black/40">
        <div className="mb-10 flex items-center space-x-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#809bff]">
            <GraduationCap className="h-5 w-5 text-[#001b61]" />
          </div>
          <div>
            <h2 className="font-['Space_Grotesk'] text-sm font-black uppercase tracking-wide text-blue-500">Code Quest</h2>
            <p className="font-['Inter'] text-[10px] uppercase tracking-[0.28em] text-[#a8abb3]">
              Level {userStats.level} Learner
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className={`flex w-full items-center px-4 py-3 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-all ${
              currentView === 'home'
                ? 'border-r-4 border-[#5cfd80] bg-gradient-to-r from-[#5cfd80]/10 to-transparent text-[#5cfd80]'
                : 'text-[#f1f3fc]/50 hover:bg-[#20262f] hover:pl-6 hover:text-[#f1f3fc]'
            }`}
          >
            <Grid2x2 className="mr-3 h-4 w-4" />
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('learn')}
            className={`flex w-full items-center px-4 py-3 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-all ${
              currentView === 'learn' || currentView === 'frontend-path'
                ? 'border-r-4 border-[#5cfd80] bg-gradient-to-r from-[#5cfd80]/10 to-transparent text-[#5cfd80]'
                : 'text-[#f1f3fc]/50 hover:bg-[#20262f] hover:pl-6 hover:text-[#f1f3fc]'
            }`}
          >
            <LibraryBig className="mr-3 h-4 w-4" />
            Lessons
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('lessons')}
            className={`flex w-full items-center px-4 py-3 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-all ${
              currentView === 'lessons' || currentView === 'course-view' || currentView === 'lesson'
                ? 'border-r-4 border-[#5cfd80] bg-gradient-to-r from-[#5cfd80]/10 to-transparent text-[#5cfd80]'
                : 'text-[#f1f3fc]/50 hover:bg-[#20262f] hover:pl-6 hover:text-[#f1f3fc]'
            }`}
          >
            <Code2 className="mr-3 h-4 w-4" />
            Library
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('achievements')}
            className={`flex w-full items-center px-4 py-3 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-all ${
              currentView === 'achievements'
                ? 'border-r-4 border-[#5cfd80] bg-gradient-to-r from-[#5cfd80]/10 to-transparent text-[#5cfd80]'
                : 'text-[#f1f3fc]/50 hover:bg-[#20262f] hover:pl-6 hover:text-[#f1f3fc]'
            }`}
          >
            <Award className="mr-3 h-4 w-4" />
            Badges
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('leaderboard')}
            className={`flex w-full items-center px-4 py-3 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-all ${
              currentView === 'leaderboard'
                ? 'border-r-4 border-[#5cfd80] bg-gradient-to-r from-[#5cfd80]/10 to-transparent text-[#5cfd80]'
                : 'text-[#f1f3fc]/50 hover:bg-[#20262f] hover:pl-6 hover:text-[#f1f3fc]'
            }`}
          >
            <Trophy className="mr-3 h-4 w-4" />
            Rankings
          </button>
          <button
            type="button"
            onClick={() => setCurrentView('performance')}
            className={`flex w-full items-center px-4 py-3 font-['Space_Grotesk'] text-sm font-bold uppercase tracking-wide transition-all ${
              currentView === 'performance'
                ? 'border-r-4 border-[#5cfd80] bg-gradient-to-r from-[#5cfd80]/10 to-transparent text-[#5cfd80]'
                : 'text-[#f1f3fc]/50 hover:bg-[#20262f] hover:pl-6 hover:text-[#f1f3fc]'
            }`}
          >
            <BarChart3 className="mr-3 h-4 w-4" />
            Performance
          </button>
        </nav>

        <div className="mb-6 px-4">
          <button
            type="button"
            onClick={() => setCurrentView('assistant')}
            className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#94aaff] to-[#3367ff] py-4 text-xs font-black uppercase tracking-[0.18em] text-[#000000] transition-transform hover:scale-[1.02]"
          >
            <Bot className="h-4 w-4" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        <div className="space-y-1 border-t border-[#44484f]/20 px-4 pt-6">
          <button
            type="button"
            onClick={() => setCurrentView('settings')}
            className="flex w-full items-center px-4 py-2 font-['Space_Grotesk'] text-xs uppercase text-[#f1f3fc]/60 transition-colors hover:text-[#f1f3fc]"
          >
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </button>
          <button
            type="button"
            onClick={() => {
              window.localStorage.removeItem('auth_token');
              window.sessionStorage.removeItem('auth_token');
              setAuthToken(null);
            }}
            className="flex w-full items-center px-4 py-2 font-['Space_Grotesk'] text-xs uppercase text-[#ff6e84] transition-colors hover:text-[#d73357]"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      )}

      <main className={useLessonLayout ? 'min-h-screen overflow-hidden' : 'ml-64 min-h-screen overflow-y-auto'}>
        {!useCourseLayout && (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-[#0a0e14] px-8">
          <h1 className="font-['Space_Grotesk'] text-xl font-black uppercase tracking-tight text-blue-400">Code Quest</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center rounded-full bg-black px-4 py-1.5 ring-1 ring-[#44484f]/20">
              <Zap className="mr-2 h-4 w-4 text-[#ffbd5c]" />
              <span className="font-['Space_Grotesk'] text-sm font-bold text-[#f1f3fc]">{userStats.streak} Day Streak</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('achievements')}
                className="text-[#f1f3fc]/60 transition-colors hover:text-blue-400"
              >
                <Trophy className="h-5 w-5" />
              </button>
              <div className="h-8 w-px bg-[#44484f]/20" />
              <button
                type="button"
                onClick={() => setCurrentView('settings')}
                className="flex items-center space-x-3"
              >
                <div className="text-right">
                  <p className="text-xs font-bold text-[#f1f3fc]">{userStats.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8abb3]">Lvl {userStats.level} Learner</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-[#94aaff]/30 bg-slate-800 text-cyan-300">
                  <span className="text-sm font-semibold">{userStats.name.charAt(0).toUpperCase()}</span>
                </div>
              </button>
            </div>
          </div>
        </header>
        )}

        <div className={currentView === 'lesson' ? '' : useCourseLayout ? '' : 'mx-auto max-w-7xl px-8 py-8'}>
        {dataError && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {dataError}
          </div>
        )}

        {isLoadingData && (
          <div className="mb-6 rounded-xl border border-cyan-500/20 bg-slate-900 p-4 text-slate-300">
            Loading your profile and progress...
          </div>
        )}

        {currentView === 'learn' && (
          <CourseSelection
            courses={courses}
            onSelectCourse={handleStartCourse}
            onOpenFrontendPath={() => setCurrentView('frontend-path')}
          />
        )}

        {currentView === 'frontend-path' && (
          <CourseSelection
            courses={courses}
            onSelectCourse={handleStartCourse}
            initialTab="frontend"
            heading="Front-End Developer"
            subheading="Browse only the front-end learning path courses."
            showCareerPaths={false}
            onBack={() => setCurrentView('learn')}
          />
        )}

        {currentView === 'lessons' && (
          <LessonsOverview courses={courses} onSelectCourse={handleStartCourse} />
        )}

        {currentView === 'course-view' && selectedCourse && courseDetail && (
          <CourseView
            courseTitle={courseDetail.course.title}
            sections={courseDetail.sections}
            lessonTracks={courseDetail.lessonTracks}
            onBack={() => setCurrentView('learn')}
            onStartLesson={handleStartLesson}
            userStats={userStats}
            certificate={{
              progress: courseDetail.certificate.progress,
              total: courseDetail.certificate.total,
              completedLessons: courseDetail.certificate.completedLessons
            }}
          />
        )}

        {currentView === 'lesson' && (
          <LessonPlayer
            lesson={activeLesson}
            onComplete={handleLessonComplete}
            onBack={() => setCurrentView('course-view')}
            userStats={userStats}
            leaderboardEntries={leaderboardData}
            onExplainRequest={(prompt) => {
              setAssistantOpenSignal((value) => value + 1);
              setAssistantPromptSignal({ id: Date.now(), prompt });
            }}
            onQuizEvaluated={setLatestQuizInsight}
          />
        )}

        {currentView === 'home' && (
          <Dashboard userStats={userStats} courses={courses} onSelectCourse={handleStartCourse} />
        )}

        {currentView === 'assistant' && (
          <DashboardAssistant
            authToken={authToken}
            apiBaseUrl={apiBaseUrl}
            context={assistantContext}
            threadKey="dashboard:assistant"
            userName={userStats.name}
            courses={courses}
            quickPrompts={dashboardAssistantQuickPrompts}
          />
        )}

        {currentView === 'achievements' && (
          <Achievements achievements={achievements} userStats={userStats} courses={courses} />
        )}

        {currentView === 'leaderboard' && (
          <Leaderboard entries={leaderboardData} currentUser={userStats.name} />
        )}

        {currentView === 'performance' && (
          <Performance userStats={userStats} courses={courses} />
        )}

        {currentView === 'settings' && profile && (
          <UserSettings
            user={profile}
            onBack={() => setCurrentView('home')}
            onUpdateName={handleUpdateProfileName}
            onChangePassword={handleChangePassword}
          />
        )}

        {currentView === 'course-view' && selectedCourse && !courseDetail && !isLoadingData && (
          <div className="rounded-xl border border-cyan-500/20 bg-slate-900 p-8 text-center text-slate-300">
            Loading course details...
          </div>
        )}

        {currentView === 'lesson' && isCompletingLesson && (
          <div className="mt-6 rounded-xl border border-cyan-500/20 bg-slate-900 p-4 text-slate-300">
            Saving your lesson progress...
          </div>
        )}
        </div>
      </main>

      {currentView === 'lesson' && (
        <StudyAssistant
          authToken={authToken}
          apiBaseUrl={apiBaseUrl}
          context={assistantContext}
          threadKey={assistantThreadKey}
          quickPrompts={assistantQuickPrompts}
          openSignal={assistantOpenSignal}
          promptSignal={assistantPromptSignal}
          placement="left"
          variant="lesson"
        />
      )}
    </div>
  );
}
