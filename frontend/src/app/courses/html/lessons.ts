import type { LessonDefinition } from '../../lessonTypes';

export const htmlLessonContent: Record<string, LessonDefinition> = {
  'html-1': {
    id: 'html-1',
    title: 'Discovering HTML and Tags',
    xpReward: 40,
    content: [
      {
        type: 'intro',
        data: "Welcome! You're about to learn technologies like HTML, CSS, JavaScript, React, and everything else we'll need to build for the web.",
        secondaryText: "Before you realize it, we'll be creating real-life projects. Let's start with",
        accentText: 'HTML.'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'By adding the HTML code <button> Like </button>, you can create a button with the label "Like"',
        templateParts: ['', ''],
        blankAnswers: ['<button>Like</button>'],
        blankPlaceholders: ['Button code'],
        promptChips: ['<button>Like</button>'],
        expectedCode: ['<button>Like</button>'],
        helperText: 'Tap the code chip to fill the blank, or type the full code yourself.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'The HTML code to create a button uses an opening tag, <button>, and a closing tag, </button>, in this order.',
        templateParts: ['', 'Like', ''],
        blankAnswers: ['<button>', '</button>'],
        blankPlaceholders: ['Opening tag', 'Closing tag'],
        promptChips: ['</button>', '<button>'],
        expectedCode: ['<button>Like</button>'],
        helperText: 'Tap the tag chips to fill the blanks, or type the tags yourself.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: "The text between the opening and closing tags of a button becomes the button's label.",
        templateParts: ['<button>', '</button>'],
        blankAnswers: ['Like'],
        blankPlaceholders: ['Button label'],
        promptChips: ['Like'],
        expectedCode: ['<button>Like</button>'],
        helperText: 'You can type the label or press the suggestion chip.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: "Time to test what you've learned so far! What type of tag is this? </button>.",
        options: [
          'An opening tag',
          'A closing tag'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Which of these tags is spelled out incorrectly?',
        options: [
          '<button>',
          '<button\\>',
          '</button>'
        ],
        correctAnswer: 1
      },
      {
        type: 'browser-demo',
        data: "Remember the previous example? In the next steps, we'll create the buttons for Q, R, and D. We'll ignore the rest of the code for now.",
        browserTitle: 'Browser',
        maskedWord: '_ O G',
        revealWord: 'DOG',
        choices: ['Q', 'R', 'D'],
        correctChoice: 'D',
        imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
        imageAlt: 'Dog',
        successTitle: 'Correct!',
        previewHint: 'Scrollable'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Create a button with the label "Q".',
        templateParts: ['', '', ''],
        blankAnswers: ['<button>', 'Q', '</button>'],
        blankPlaceholders: ['Opening tag', 'Label', 'Closing tag'],
        promptChips: ['<button>', 'Q', '</button>'],
        expectedCode: ['<button>Q</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><head><style>body{margin:0;min-height:100vh;background:#a4afe6;font-family:Inter,system-ui,sans-serif;color:#24354a;display:flex;flex-direction:column;align-items:center;padding-top:28px}h1{margin:0 0 18px;font-size:24px;font-weight:800;color:#ffffff}div.word{margin:0 0 18px;font-size:28px;font-weight:800;letter-spacing:.18em;color:#263043}button{height:54px;min-width:54px;padding:0 16px;border:0;border-radius:8px;background:#31435c;color:#fff;font-size:20px;font-weight:700}</style></head><body><h1>Guess the letter</h1><div class=\"word\">_ O G</div><button>Q</button></body></html>',
        helperText: 'Use the three chips to build the button, or type them into the blanks.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Create a button with the label "R".',
        templateParts: ['<button>Q</button>\n', '', '', '', '', '', '', '', ''],
        blankAnswers: ['<', 'button', '>', 'R', '<', '/', 'button', '>'],
        blankPlaceholders: ['<', 'button', '>', 'R', '<', '/', 'button', '>'],
        promptChips: ['>', '/', '>', 'R', 'button', '<', 'button', '<'],
        expectedCode: ['<button>Q</button>', '<button>R</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><head><style>body{margin:0;min-height:100vh;background:#a4afe6;font-family:Inter,system-ui,sans-serif;color:#24354a;display:flex;flex-direction:column;align-items:center;padding-top:28px}h1{margin:0 0 18px;font-size:24px;font-weight:800;color:#ffffff}div.word{margin:0 0 18px;font-size:28px;font-weight:800;letter-spacing:.18em;color:#263043}.buttons{display:flex;gap:14px}button{height:54px;min-width:54px;padding:0 16px;border:0;border-radius:8px;background:#31435c;color:#fff;font-size:20px;font-weight:700}</style></head><body><h1>Guess the letter</h1><div class=\"word\">_ O G</div><div class=\"buttons\"><button>Q</button><button>R</button></div></body></html>',
        helperText: 'Use the symbol chips to build the button, or type each part into the blanks.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Finally, create a button with the label "D", making sure you use an opening and a closing tag.',
        templateParts: ['<button>Q</button>\n<button>R</button>\n', '', '', ''],
        blankAnswers: ['<button>', 'D', '</button>'],
        blankPlaceholders: ['Opening tag', 'Label', 'Closing tag'],
        promptChips: ['D', '<button>', '<button>', '</button>'],
        expectedCode: ['<button>Q</button>', '<button>R</button>', '<button>D</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><head><style>body{margin:0;min-height:100vh;background:#a4afe6;font-family:Inter,system-ui,sans-serif;color:#24354a;display:flex;flex-direction:column;align-items:center;padding-top:28px}h1{margin:0 0 18px;font-size:24px;font-weight:800;color:#ffffff}div.word{margin:0 0 18px;font-size:28px;font-weight:800;letter-spacing:.18em;color:#263043}.buttons{display:flex;gap:14px}button{height:54px;min-width:54px;padding:0 16px;border:0;border-radius:8px;background:#31435c;color:#fff;font-size:20px;font-weight:700}</style></head><body><h1>Guess the letter</h1><div class=\"word\">_ O G</div><div class=\"buttons\"><button>Q</button><button>R</button><button>D</button></div></body></html>',
        helperText: 'Use the chips to build the final button, or type them into the blanks.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'text',
        data: "Awesome! We've learned how to create the structure of a button.",
        secondaryText:
          'Before we add actions to them, move on to the next lesson to learn about an HTML element present on every web page out there.'
      }
    ]
  },
  'html-2': {
    id: 'html-2',
    title: 'Text nad Headings',
    xpReward: 45,
    content: [
      {
        type: 'quiz',
        data: 'In HTML, the keywords of some tags are obvious, but there are some tags that use a shortened form. For example, we use p for a paragraph.\n\nWhich one of these HTML tags creates a paragraph?',
        options: ['<p>', '<button>'],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: `Let's remember how to code a button. Code a button that has the text \`Post\`.`,
        templateParts: ['', '', ''],
        blankAnswers: ['<button>', 'Post', '</button>'],
        blankPlaceholders: ['Opening tag', 'Label', 'Closing tag'],
        promptChips: ['<button>', 'Post', '</button>'],
        expectedCode: ['<button>Post</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Inter,system-ui,sans-serif;background:#fff"><button>Post</button></body></html>',
        helperText: 'Tap the chips to build the button, or type them into the blanks.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Coding a paragraph is very similar to coding a button. You need an opening tag, followed by your text, and a closing tag.\n\nCode a paragraph that displays `Code Quest is Fun!`.',
        templateParts: ['', '', ''],
        blankAnswers: ['<p>', 'Code Quest is Fun!', '</p>'],
        blankPlaceholders: ['Opening tag', 'Paragraph text', 'Closing tag'],
        promptChips: ['<p>', 'Code Quest is Fun!', '</p>'],
        expectedCode: ['<p>Code Quest is Fun!</p>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Inter,system-ui,sans-serif;background:#fff"><p>Code Quest is Fun!</p></body></html>',
        helperText: 'Use the paragraph chips to build the text, or type them into the blanks.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code `hello` in between the opening and closing `p` tags.',
        templateParts: ['<p>', '</p>'],
        blankAnswers: ['hello'],
        blankPlaceholders: ['Paragraph text'],
        promptChips: [],
        expectedCode: ['<p>hello</p>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Inter,system-ui,sans-serif;background:#fff"><p>hello</p></body></html>',
        helperText: 'Type the paragraph content into the blank.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'We can create headings in HTML to emphasize certain texts. There are 6 sizes of heading in HTML, from h1 to h6.\n\nWhich one of these HTML tags creates a heading?',
        options: ['<video>', '<button>', '<h1>', '<p>'],
        correctAnswer: 2
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code a heading that displays `SnapCat`.',
        templateParts: ['', '', ''],
        blankAnswers: ['<h1>', 'SnapCat', '</h1>'],
        blankPlaceholders: ['Opening tag', 'Heading text', 'Closing tag'],
        promptChips: ['</button>', '<p>', '<h1>', '</h1>', 'SnapCat'],
        expectedCode: ['<h1>SnapCat</h1>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff"><h1>SnapCat</h1></body></html>',
        helperText: 'Choose the correct heading parts and ignore the wrong chips.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the closing tag.',
        templateParts: ['<button>Accept', ''],
        blankAnswers: ['</button>'],
        blankPlaceholders: ['Closing tag'],
        promptChips: ['</button>', '<button>', '</p>'],
        expectedCode: ['<button>Accept</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Inter,system-ui,sans-serif;background:#fff"><button>Accept</button></body></html>',
        helperText: 'Pick the correct closing tag or type it into the blank.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'The heading tag emphasizes texts by making them bigger and bolder. h1 is the biggest and boldest and h6 is the smallest and least bold.\n\nWhich one of these HTML tags creates a smaller heading than `<h1>`?',
        options: ['<video>', '<button>', '<h6>', '<p>'],
        correctAnswer: 2
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code a heading with opening and closing `h6` tags.',
        templateParts: ['', '', ''],
        blankAnswers: ['<h6>', 'Little Things', '</h6>'],
        blankPlaceholders: ['Opening tag', 'Heading text', 'Closing tag'],
        promptChips: ['</h6>', '<h6>', 'Little Things'],
        expectedCode: ['<h6>Little Things</h6>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff"><h6>Little Things</h6></body></html>',
        helperText: 'Use the chips to build the h6 heading, or type them into the blanks.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the opening tag for the biggest heading.',
        templateParts: ['', 'My Blog</h1>'],
        blankAnswers: ['<h1>'],
        blankPlaceholders: ['Opening tag'],
        promptChips: [],
        expectedCode: ['<h1>My Blog</h1>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff"><h1>My Blog</h1></body></html>',
        helperText: 'Type the opening tag into the blank.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the opening tag for the second biggest heading.',
        templateParts: ['', '', '', 'My Favorite Things</h2>'],
        blankAnswers: ['<', 'h2', '>'],
        blankPlaceholders: ['Symbol', 'Tag', 'Symbol'],
        promptChips: ['>', '/', 'h2', '<'],
        expectedCode: ['<h2>My Favorite Things</h2>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff"><h2>My Favorite Things</h2></body></html>',
        helperText: 'Use the correct chips to build the opening h2 tag.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'Which one of these HTML tags creates the smallest heading?',
        options: ['<h6>', '<h1>', '<h4>', '<h3>'],
        correctAnswer: 0
      }
      
    ]
  },
  'html-3': {
    id: 'html-3',
    title: 'Structuring Text with Tags',
    xpReward: 45,
    content: [
      {
        type: 'browser-preview',
        data: 'Sometimes we want to format paragraphs with line breaks.\n\nFor example, this song would look much better if `Raindrops on roses` appeared on one line, `Whiskers on kittens` on the next, and so on.',
        browserTitle: 'Browser',
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 24px;font-size:3rem;line-height:1.1">My favorite things</h1><p style="margin:0;font-size:1.05rem">Raindrops on roses Whiskers on kittens Bright copper kettles Warm woolen mittens</p></body></html>'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can separate lines with the help of the line break tag: `br`.',
        templateParts: [
          '<h1>My favorite things</h1>\n<p> Raindrops on roses ',
          '\nWhiskers on kittens<br>\nBright copper kettles ',
          '\nWarm woolen mittens\n</p>'
        ],
        blankAnswers: ['<br>', '<br>'],
        blankPlaceholders: ['Line break tag', 'Line break tag'],
        promptChips: ['<br>', '<br>'],
        expectedCode: ['Raindrops on roses <br>', 'Bright copper kettles <br>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 24px;font-size:3rem;line-height:1.1">My favorite things</h1><p style="margin:0;font-size:1.05rem">Raindrops on roses <br>Whiskers on kittens<br>Bright copper kettles <br>Warm woolen mittens</p></body></html>',
        helperText: 'Place the line break tags in the empty spots.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: '`<br>` is an empty tag. Empty tags have no closing tag and no content. They are also called self-closing tags.\n\nPut together the line break tag.',
        templateParts: [
          '<h1>My favorite things</h1>\n<p>\nRaindrops on roses<br>\nWhiskers on kittens<br>\nBright copper kettles ',
          '\nWarm woolen mittens\n</p>'
        ],
        blankAnswers: ['<br>'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['Bright copper kettles <br>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 24px;font-size:3rem;line-height:1.1">My favorite things</h1><p style="margin:0;font-size:1.05rem">Raindrops on roses<br>Whiskers on kittens<br>Bright copper kettles <br>Warm woolen mittens</p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'There\'s an element for giving emphasis to text, it makes it italic. It\'s called the `em` element. Add `<em>` and `</em>`.',
        templateParts: [
          '<h1>My favorite things</h1>\n<p>\nRaindrops on ',
          'roses',
          '<br>\nWhiskers on kittens<br>\nBright copper kettles<br>\nWarm woolen mittens\n</p>'
        ],
        blankAnswers: ['<em>', '</em>'],
        blankPlaceholders: ['', ''],
        promptChips: ['</em>', '<em>'],
        expectedCode: ['Raindrops on <em>roses</em><br>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 24px;font-size:3rem;line-height:1.1">My favorite things</h1><p style="margin:0;font-size:1.05rem">Raindrops on <em>roses</em><br>Whiskers on kittens<br>Bright copper kettles<br>Warm woolen mittens</p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To define texts as important, we use the `<strong>` and `</strong>` tags. It makes text bold.',
        templateParts: [
          '<h1>My favorite things</h1>\n<p>\nRaindrops on <em>roses</em><br>\nWhiskers on ',
          'kittens',
          '\n</p>'
        ],
        blankAnswers: ['<strong>', '</strong>'],
        blankPlaceholders: ['', ''],
        promptChips: ['<strong>', '</strong>'],
        expectedCode: ['Whiskers on <strong>kittens</strong>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 24px;font-size:3rem;line-height:1.1">My favorite things</h1><p style="margin:0;font-size:1.05rem">Raindrops on <em>roses</em><br>Whiskers on <strong>kittens</strong></p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What\'s the `<br>` tag for?',
        options: ['It adds a line break', 'It gives emphasis to text'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'Which of these tags is an empty or self-closing tag?',
        options: ['<p>', '<br>', '</em>', '</strong>'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Which of these tags give emphasis to text?',
        options: ['<p> and </p>', '<em> and </em>'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What are the `<strong>` and `</strong>` tags for?',
        options: ['They make the text unbreakable by line break', 'They define text as important'],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Give emphasis to the album title by adding the opening and closing emphasis tags.',
        templateParts: ['<p> I just listened to ', 'Abbey Road', ' for the first time.</p>'],
        blankAnswers: ['<em>', '</em>'],
        blankPlaceholders: ['', ''],
        promptChips: ['<em>', '</em>'],
        expectedCode: ['<p> I just listened to <em>Abbey Road</em> for the first time.</p>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><p>I just listened to <em>Abbey Road</em> for the first time.</p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add a line break to the address between Code quest and Vienna, Austria, such that Code quest appears on one line and Vienna, Austria appears below it.',
        templateParts: ['<p> Code quest ', ' Vienna, Austria </p>'],
        blankAnswers: ['<br>'],
        blankPlaceholders: [''],
        promptChips: ['</br>', '<br>'],
        expectedCode: ['<p> Code quest <br> Vienna, Austria </p>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><p>Code quest <br> Vienna, Austria</p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Give emphasis to the words in the second sentence.',
        templateParts: [
          '<p>My friends get annoyed when I post in italics.\n',
          'I guess it\'s a bit too right-leaning for them.',
          '</p>'
        ],
        blankAnswers: ['<em>', '</em>'],
        blankPlaceholders: ['', ''],
        promptChips: ['</em>', '<em>'],
        expectedCode: ['<p>My friends get annoyed when I post in italics. <em>I guess it\'s a bit too right-leaning for them.</em></p>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><p>My friends get annoyed when I post in italics. <em>I guess it\'s a bit too right-leaning for them.</em></p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Define `rock you` as important text by coding `</strong>`.',
        templateParts: ['<p> We will, we will<br><strong> rock you', '</p>'],
        blankAnswers: ['</strong>'],
        blankPlaceholders: [''],
        promptChips: ['</strong>'],
        expectedCode: ['<p> We will, we will<br><strong> rock you</strong></p>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px;font-family:Times New Roman,serif;background:#fff;color:#111"><p>We will, we will<br><strong>rock you</strong></p></body></html>',
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'html-4': {
    id: 'html-4',
    title: 'Building Buttons',
    xpReward: 75,
    content: [
      {
        type: 'text',
        data: 'This practice lesson reviews the basic tags you have learned so far: headings, paragraphs, and buttons.'
      },
      {
        type: 'quiz',
        data: 'Which tag is commonly used for the largest page heading?',
        options: ['<h1>', '<p>', '<button>', '<a>'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'Which tag should be used to create a button a user can click?',
        options: ['<img>', '<button>', '<span>', '<title>'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What does HTML mainly help you do?',
        options: [
          'Style a web page',
          'Structure a web page',
          'Deploy a web server',
          'Write database queries'
        ],
        correctAnswer: 1
      }
    ]
  },
  'html-5': {
    id: 'html-5',
    title: 'Creating Links',
    xpReward: 50,
    content: [
      {
        type: 'text',
        data: 'Links connect one page or resource to another. The anchor tag is used to create a link in HTML.'
      },
      {
        type: 'code',
        data: 'A basic link uses the href attribute to define the destination:',
        code: '<a href=\"https://example.com\">Visit Example</a>'
      },
      {
        type: 'quiz',
        data: 'Which attribute tells a link where it should navigate?',
        options: ['src', 'alt', 'href', 'class'],
        correctAnswer: 2
      }
    ]
  },
  'html-6': {
    id: 'html-6',
    title: 'Adding Images',
    xpReward: 50,
    content: [
      {
        type: 'text',
        data: 'Images are added with the img tag. It usually uses attributes like src for the file path and alt for a text description.'
      },
      {
        type: 'code',
        data: 'This is a basic image element:',
        code: '<img src=\"profile.jpg\" alt=\"Student profile photo\">'
      },
      {
        type: 'quiz',
        data: 'Which attribute describes an image for accessibility and fallback text?',
        options: ['href', 'title', 'alt', 'target'],
        correctAnswer: 2
      }
    ]
  },
  'html-7': {
    id: 'html-7',
    title: 'HTML Basics 2',
    xpReward: 75,
    content: [
      {
        type: 'text',
        data: 'This second practice lesson checks whether you understand links and images as core HTML building blocks.'
      },
      {
        type: 'quiz',
        data: 'Which tag creates a hyperlink in HTML?',
        options: ['<img>', '<a>', '<button>', '<p>'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Which attribute should an image use for a short description of its content?',
        options: ['href', 'alt', 'src', 'id'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Which element is correct for showing an image?',
        options: [
          '<image src=\"photo.jpg\">',
          '<img src=\"photo.jpg\" alt=\"Photo\">',
          '<picture href=\"photo.jpg\">',
          '<a src=\"photo.jpg\">'
        ],
        correctAnswer: 1
      }
    ]
  }
};
