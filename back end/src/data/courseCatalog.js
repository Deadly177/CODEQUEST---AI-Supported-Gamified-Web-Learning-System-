import { htmlCourse, htmlSections } from './courses/html.js';

export const POINTS_PER_LEVEL = 250;

export const courses = [
  htmlCourse,
  {
    id: 'css',
    title: 'CSS',
    description: 'Style your websites beautifully. Learn selectors, layouts, animations, and responsive design.',
    totalLessons: 8,
    icon: 'css',
    color: 'bg-gradient-to-br from-blue-500 to-indigo-600'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Bring your websites to life. Learn variables, functions, DOM manipulation, and modern ES6+ features.',
    totalLessons: 27,
    icon: 'javascript',
    color: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
  },
  {
    id: 'react',
    title: 'React',
    description: 'Build powerful user interfaces with components. Learn hooks, state management, and modern React patterns.',
    totalLessons: 28,
    icon: 'html',
    color: 'bg-gradient-to-br from-cyan-400 to-blue-500'
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    description: 'Add type safety to JavaScript. Master interfaces, types, generics, and build scalable applications.',
    totalLessons: 22,
    icon: 'css',
    color: 'bg-gradient-to-br from-blue-600 to-indigo-700'
  }
];

export const courseSections = {
  html: htmlSections,
  css: [
    {
      id: 'css-intro',
      number: 1,
      title: 'Intro to CSS',
      icon: '🎨',
      lessons: [
        { id: 'css-1', number: 1, title: 'Stylesheet and Basic Selectors', type: 'learn', xpReward: 45 },
        { id: 'css-2', number: 2, title: 'Styling Text', type: 'learn', xpReward: 45 },
        { id: 'css-3', number: 3, title: 'Setting Size and Borders', type: 'learn', xpReward: 45 },
        { id: 'css-4', number: 4, title: 'CSS Basics 1', type: 'practice', xpReward: 75 },
        { id: 'css-5', number: 5, title: 'Building with the Box Model', type: 'learn', xpReward: 50 },
        { id: 'css-6', number: 6, title: 'Adding Padding with One Line', type: 'learn', xpReward: 50 },
        { id: 'css-7', number: 7, title: 'Styling Corners with One Line', type: 'learn', xpReward: 50 },
        { id: 'css-8', number: 8, title: 'CSS Basics 2', type: 'practice', xpReward: 80 }
      ]
    }
  ],
  javascript: [
    {
      id: 'js-basics',
      number: 1,
      title: 'JavaScript Basics',
      icon: '📝',
      lessons: [
        { id: 'js-1', number: 1, title: 'Creating Variables', type: 'learn', xpReward: 50 },
        { id: 'js-2', number: 2, title: 'Using Variables', type: 'learn', xpReward: 50 },
        { id: 'js-3', number: 3, title: 'Using True and False', type: 'learn', xpReward: 50 },
        { id: 'js-4', number: 4, title: 'Checking Number Equality', type: 'learn', xpReward: 50 },
        { id: 'js-5', number: 5, title: 'JavaScript Basics', type: 'practice', xpReward: 75 }
      ]
    },
    {
      id: 'types',
      number: 2,
      title: 'Types and Comparisons',
      icon: '🔢',
      lessons: [
        { id: 'js-6', number: 1, title: 'Understanding Data Types', type: 'learn', xpReward: 50 },
        { id: 'js-7', number: 2, title: 'Type Conversion', type: 'learn', xpReward: 50 },
        { id: 'js-8', number: 3, title: 'Comparison Operators', type: 'learn', xpReward: 50 },
        { id: 'js-9', number: 4, title: 'Logical Operators', type: 'learn', xpReward: 50 },
        { id: 'js-10', number: 5, title: 'Strict vs Loose Equality', type: 'learn', xpReward: 50 },
        { id: 'js-11', number: 6, title: 'Types Challenge', type: 'practice', xpReward: 75 }
      ]
    },
    {
      id: 'conditionals',
      number: 3,
      title: 'Conditionals',
      icon: '🔀',
      lessons: [
        { id: 'js-12', number: 1, title: 'If Statements', type: 'learn', xpReward: 50 },
        { id: 'js-13', number: 2, title: 'Else Statements', type: 'learn', xpReward: 50 },
        { id: 'js-14', number: 3, title: 'Else If', type: 'learn', xpReward: 50 },
        { id: 'js-15', number: 4, title: 'Switch Statements', type: 'learn', xpReward: 50 },
        { id: 'js-16', number: 5, title: 'Conditionals Practice', type: 'practice', xpReward: 75 }
      ]
    },
    {
      id: 'loops',
      number: 4,
      title: 'Loops',
      icon: '🔄',
      lessons: [
        { id: 'js-17', number: 1, title: 'While Loops', type: 'learn', xpReward: 50 },
        { id: 'js-18', number: 2, title: 'For Loops', type: 'learn', xpReward: 50 },
        { id: 'js-19', number: 3, title: 'Loop Control', type: 'learn', xpReward: 50 },
        { id: 'js-20', number: 4, title: 'Nested Loops', type: 'learn', xpReward: 50 },
        { id: 'js-21', number: 5, title: 'Loops Challenge', type: 'practice', xpReward: 75 }
      ]
    },
    {
      id: 'functions',
      number: 5,
      title: 'Functions',
      icon: '⚙️',
      lessons: [
        { id: 'js-22', number: 1, title: 'Creating Functions', type: 'learn', xpReward: 50 },
        { id: 'js-23', number: 2, title: 'Function Parameters', type: 'learn', xpReward: 50 },
        { id: 'js-24', number: 3, title: 'Return Values', type: 'learn', xpReward: 50 },
        { id: 'js-25', number: 4, title: 'Arrow Functions', type: 'learn', xpReward: 50 },
        { id: 'js-26', number: 5, title: 'Callback Functions', type: 'learn', xpReward: 50 },
        { id: 'js-27', number: 6, title: 'Functions Practice', type: 'practice', xpReward: 75 }
      ]
    }
  ]
};

export const courseLessonTracks = {
  css: {
    'css-1': {
      label: 'Stylesheet Track',
      lessons: [
        { id: 'css-track-1', number: 1, title: 'Stylesheet Setup', type: 'learn', xpReward: 45 },
        { id: 'css-track-2', number: 2, title: 'Basic CSS Rules', type: 'learn', xpReward: 45 },
        { id: 'css-track-3', number: 3, title: 'Class Selectors', type: 'learn', xpReward: 45 },
        { id: 'css-track-4', number: 4, title: 'Selector Practice', type: 'practice', xpReward: 75 }
      ]
    },
    'css-3': {
      label: 'Sizing Track',
      lessons: [
        { id: 'css-track-5', number: 1, title: 'Height and Width', type: 'learn', xpReward: 45 },
        { id: 'css-track-6', number: 2, title: 'Borders', type: 'learn', xpReward: 45 }
      ]
    }
  },
  javascript: {
    'js-1': {
      label: 'Variables Track',
      lessons: [
        { id: 'js-track-1', number: 1, title: 'What Variables Do', type: 'learn', xpReward: 50 },
        { id: 'js-track-2', number: 2, title: 'Creating String Variables', type: 'learn', xpReward: 50 },
        { id: 'js-track-3', number: 3, title: 'Creating Number Variables', type: 'learn', xpReward: 50 },
        { id: 'js-track-4', number: 4, title: 'Boolean Variables Practice', type: 'learn', xpReward: 50 }
      ]
    },
    'js-2': {
      label: 'Using Variables Track',
      lessons: [
        { id: 'js-2-track-1', number: 1, title: 'Reading Variables', type: 'learn', xpReward: 50 },
        { id: 'js-2-track-2', number: 2, title: 'Console Output', type: 'learn', xpReward: 50 },
        { id: 'js-2-track-3', number: 3, title: 'Using Variables Practice', type: 'learn', xpReward: 50 }
      ]
    }
  }
};

const lessonAliases = {};

export function getCourseCatalog() {
  return courses;
}

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId) ?? null;
}

export function getSectionsByCourseId(courseId) {
  return courseSections[courseId] ?? [];
}

export function getLessonTracksByCourseId(courseId) {
  return courseLessonTracks[courseId] ?? {};
}

export function normalizeLessonId(lessonId) {
  return lessonAliases[lessonId] ?? lessonId;
}

export function findLesson(lessonId) {
  const normalizedLessonId = normalizeLessonId(lessonId);

  for (const [courseId, sections] of Object.entries(courseSections)) {
    for (const section of sections) {
      const lesson = section.lessons.find((entry) => entry.id === normalizedLessonId);
      if (lesson) {
        return { courseId, sectionId: section.id, lesson };
      }
    }
  }

  for (const [courseId, tracksByLessonId] of Object.entries(courseLessonTracks)) {
    for (const [parentLessonId, track] of Object.entries(tracksByLessonId)) {
      const lesson = track.lessons.find((entry) => entry.id === normalizedLessonId);
      if (lesson) {
        return { courseId, sectionId: `${parentLessonId}-track`, parentLessonId, lesson };
      }
    }
  }

  return null;
}
