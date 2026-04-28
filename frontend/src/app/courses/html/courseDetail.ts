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
        { id: 'html-5', number: 5, title: 'HTML Basics 1', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'html-6', number: 6, title: 'Creating Links', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'html-7', number: 7, title: 'Adding Images', type: 'practice', completed: false, locked: true, xpReward: 75 }
      ]
    },
    {
      id: 'html-intermediate',
      number: 2,
      title: 'HTML Intermediate',
      description: 'Link multiple HTML files to create a website',
      progress: '0/6',
      icon: '🚀',
      lessons: [
        { id: 'html-8', number: 1, title: 'HTML Basics 2', type: 'practice', completed: false, locked: true, xpReward: 80 },
        { id: 'html-9', number: 2, title: 'Gathering Input', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'html-10', number: 3, title: 'Grouping Elements', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'html-11', number: 4, title: 'Building Lists', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'html-12', number: 5, title: 'Linking Webpages', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'html-13', number: 6, title: 'HTML Intermediate', type: 'practice', completed: false, locked: true, xpReward: 85 }
      ]
    }
  ],
  certificate: {
    progress: 0,
    total: 20,
    completedLessons: 0
  }
};
