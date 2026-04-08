export const cssCourseDetail = {
  course: {
    id: 'css',
    title: 'CSS',
    description: 'Style your websites beautifully. Learn selectors, text styling, sizing, and core layout basics.',
    totalLessons: 8
  },
  sections: [
    {
      id: 'css-intro',
      number: 1,
      title: 'Intro to CSS',
      progress: '0/8',
      icon: '🎨',
      lessons: [
        { id: 'css-1', number: 1, title: 'Stylesheet and Basic Selectors', type: 'learn', completed: false, locked: false, xpReward: 45 },
        { id: 'css-2', number: 2, title: 'Styling Text', type: 'learn', completed: false, locked: true, xpReward: 45 },
        { id: 'css-3', number: 3, title: 'Setting Size and Borders', type: 'learn', completed: false, locked: true, xpReward: 45 },
        { id: 'css-4', number: 4, title: 'CSS Basics 1', type: 'practice', completed: false, locked: true, xpReward: 75 },
        { id: 'css-5', number: 5, title: 'Building with the Box Model', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'css-6', number: 6, title: 'Adding Padding with One Line', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'css-7', number: 7, title: 'Styling Corners with One Line', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'css-8', number: 8, title: 'CSS Basics 2', type: 'practice', completed: false, locked: true, xpReward: 80 }
      ]
    }
  ],
  certificate: {
    progress: 0,
    total: 8,
    completedLessons: 0
  }
};

