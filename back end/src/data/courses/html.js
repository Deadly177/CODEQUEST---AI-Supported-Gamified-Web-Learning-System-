export const htmlCourse = {
  id: 'html',
  title: 'HTML',
  description: 'Learn the building blocks of web pages. Master HTML tags, structure, and semantic elements.',
  totalLessons: 20,
  icon: 'html',
  color: 'bg-gradient-to-br from-orange-500 to-red-600'
};

export const htmlSections = [
  {
    id: 'html-foundations',
    number: 1,
    title: 'HTML Foundations',
    icon: '🧱',
    lessons: [
      { id: 'html-1', number: 1, title: 'Discovering HTML and Tags', type: 'learn', xpReward: 40 },
      { id: 'html-2', number: 2, title: 'Text nad Headings', type: 'learn', xpReward: 45 },
      { id: 'html-3', number: 3, title: 'Structuring Text with Tags', type: 'learn', xpReward: 45 },
      { id: 'html-4', number: 4, title: 'Building Buttons', type: 'practice', xpReward: 75 },
      { id: 'html-5', number: 5, title: 'Creating Links', type: 'learn', xpReward: 50 },
      { id: 'html-6', number: 6, title: 'Adding Images', type: 'learn', xpReward: 50 },
      { id: 'html-7', number: 7, title: 'HTML Basics 2', type: 'practice', xpReward: 75 }
    ]
  }
];
