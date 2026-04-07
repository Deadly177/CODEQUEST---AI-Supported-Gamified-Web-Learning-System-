export const htmlCourseDetail = {
  course: {
    id: 'html',
    title: 'HTML',
    description: 'Learn the building blocks of web pages. Master HTML tags, structure, and semantic elements.',
    totalLessons: 20
  },
  sections: [
    {
      id: 'html-foundations',
      number: 1,
      title: 'HTML Foundations',
      progress: '0/7',
      icon: '🧱',
      lessons: [
        { id: 'html-1', number: 1, title: 'Discovering HTML and Tags', type: 'learn', completed: false, locked: false, xpReward: 40 },
        { id: 'html-2', number: 2, title: 'Text nad Headings', type: 'learn', completed: false, locked: true, xpReward: 45 },
        { id: 'html-3', number: 3, title: 'Structuring Text with Tags', type: 'learn', completed: false, locked: true, xpReward: 45 },
        { id: 'html-4', number: 4, title: 'Building Buttons', type: 'practice', completed: false, locked: true, xpReward: 75 },
        { id: 'html-5', number: 5, title: 'Creating Links', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'html-6', number: 6, title: 'Adding Images', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'html-7', number: 7, title: 'HTML Basics 2', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    }
  ],
  certificate: {
    progress: 0,
    total: 20,
    completedLessons: 0
  }
};
