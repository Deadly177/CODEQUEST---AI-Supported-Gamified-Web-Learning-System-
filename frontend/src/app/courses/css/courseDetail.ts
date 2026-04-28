export const cssCourseDetail = {
  course: {
    id: 'css',
    title: 'CSS',
    description: 'Style your websites beautifully. Learn selectors, text styling, sizing, and core layout basics.',
    totalLessons: 18
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
        { id: 'css-3', number: 3, title: 'Height and Width', type: 'learn', completed: false, locked: true, xpReward: 45 },
        { id: 'css-4', number: 4, title: 'CSS Basics 1', type: 'practice', completed: false, locked: true, xpReward: 75 },
        { id: 'css-5', number: 5, title: 'Building with the Box Model', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'css-6', number: 6, title: 'Adding Padding with One Line', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'css-7', number: 7, title: 'Styling Corners with One Line', type: 'learn', completed: false, locked: true, xpReward: 50 },
        { id: 'css-8', number: 8, title: 'CSS Basics 2', type: 'practice', completed: false, locked: true, xpReward: 80 }
      ]
    },
    {
      id: 'css-intermediate',
      number: 2,
      title: 'Intermediate CSS',
      description: 'Dive deeper into CSS to create stunning layouts',
      progress: '0/10',
      icon: '🚀',
      lessons: [
        { id: 'css-9', number: 1, title: 'Styling Groups of Elements', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-10', number: 2, title: 'Discovering Child Elements', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-11', number: 3, title: 'Using Classes for Layouts', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-12', number: 4, title: 'CSS Intermediate 1', type: 'practice', completed: false, locked: true, xpReward: 85 },
        { id: 'css-13', number: 5, title: 'Adding Color with Hex Values', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-14', number: 6, title: 'Setting Size with Percentages', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-15', number: 7, title: 'Combining Multiple Classes', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-16', number: 8, title: 'Grouping Selectors', type: 'learn', completed: false, locked: true, xpReward: 60 },
        { id: 'css-17', number: 9, title: 'CSS Intermediate 2', type: 'practice', completed: false, locked: true, xpReward: 85 },
        { id: 'css-18', number: 10, title: 'Displaying Elements', type: 'learn', completed: false, locked: true, xpReward: 60 }
      ]
    }
  ],
  certificate: {
    progress: 0,
    total: 18,
    completedLessons: 0
  }
};
