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
        type: 'browser-preview',
        data: 'With buttons, programs change webpages based on user behavior.\nFor example, clicking `Next` can run code that cycles through characters.\n\nWe\'ll learn how to write that code later. For now, we\'ll focus on the `button` element.',
        browserTitle: 'Browser',
        previewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:16px 20px 20px;font-family:Times New Roman,serif;background:#fff;color:#111;text-align:center"><h1 style="margin:0 0 12px;font-size:1rem;font-weight:700">Choose Your Character</h1><div style="display:flex;justify-content:center;margin:0 0 10px"><svg width="132" height="132" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Character avatar"><circle cx="85" cy="85" r="54" fill="#d9e7fb"/><path d="M48 148c12-16 28-23 37-23s25 7 37 23" fill="#ffca2f"/><path d="M64 90c0-28 13-45 34-45 20 0 33 17 33 45 0 30-13 49-33 49-21 0-34-19-34-49Z" fill="#d57b3a"/><path d="M62 73c-8-5-12-13-12-24 0-13 7-22 20-26 2-13 12-21 27-21 12 0 20 5 25 14 11-2 23 6 25 21 12 4 19 13 19 24 0 10-4 18-13 23-2 12-11 20-23 20-7 0-11-2-16-6-8 3-15 4-20 4-17 0-29-13-32-29Z" fill="#31345e"/><circle cx="79" cy="81" r="4.2" fill="#31345e"/><circle cx="111" cy="81" r="4.2" fill="#31345e"/><path d="M88 91c4 4 10 4 14 0" stroke="#9d5423" stroke-width="3.2" stroke-linecap="round" fill="none"/><path d="M79 108c11 8 25 8 36 0" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="132" cy="93" r="6" fill="#ffca2f"/></svg></div><div style="display:flex;justify-content:center;gap:8px"><button style="font-size:0.95rem;padding:2px 10px">Previous</button><button style="font-size:0.95rem;padding:2px 10px">Next</button></div></body></html>'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To create a button users can click on, we need the opening `<button>` and closing `</button>` tags.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <p>Subscribe to our Newsletter</p>\n  ',
          'Subscribe',
          '\n</body>\n</html>'
        ],
        blankAnswers: ['<button>', '</button>'],
        blankPlaceholders: ['', ''],
        promptChips: ['</button>', '<button>', '<p>'],
        expectedCode: ['<button>Subscribe</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;background:#fff;color:#111"><p style="margin:0 0 14px">Subscribe to our Newsletter</p><button>Subscribe</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can make texts appear on a button by typing them between the tags. Try typing `Login` between the button tags.\n\nMake sure you use an uppercase `"L"`.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <h1>Facebook</h1>\n  <p>Log in to your account to get started</p>\n  <button>',
          '</button>\n</body>\n</html>'
        ],
        blankAnswers: ['Login'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['<button>Login</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;background:#fff;color:#111"><h1 style="margin:0 0 12px;font-size:2rem">Facebook</h1><p style="margin:0 0 14px">Log in to your account to get started</p><button>Login</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Previously, we learned how to emphasize or make text important.\nWe can also use these tags for the text inside a button.\n\nTry typing `<strong>continue anyway</strong>` between the button tags.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <h3>Warning</h3>\n  <p>This site contains humor that may cause uncontrollable laughter.\n  </p>\n  <button>',
          '</button>\n</body>\n</html>'
        ],
        blankAnswers: ['<strong>continue anyway</strong>'],
        blankPlaceholders: [''],
        promptChips: ['<strong>continue anyway</strong>', 'continue anyway'],
        expectedCode: ['<button><strong>continue anyway</strong></button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;background:#fff;color:#111"><h3 style="margin:0 0 10px">Warning</h3><p style="margin:0 0 14px">This site contains humor that may cause uncontrollable laughter.</p><button><strong>continue anyway</strong></button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Buttons display next to each other even if they\'re on separate lines of code. Place these buttons displaying `First`, `Second`, then `Third`.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <button>',
          '</button>\n  <button>',
          '</button>\n  <button>',
          '</button>\n</body>\n</html>'
        ],
        blankAnswers: ['First', 'Second', 'Third'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['First', 'Third', 'Second'],
        expectedCode: ['<button>First</button>', '<button>Second</button>', '<button>Third</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;background:#fff;color:#111"><button>First</button><button>Second</button><button>Third</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'If we want buttons to stack on top of each other, we can use the `<br>` tag to place each button on a new line.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <h3>Stack of Pancakes</h3>\n  <p>Log in or sign up to view the best photos of pancakes across the globe.</p>\n  <button>Login</button>\n  ',
          '',
          '',
          '\n  <button>Sign up</button>\n</body>\n</html>'
        ],
        blankAnswers: ['<', 'br', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['br', '<', '>'],
        expectedCode: ['<button>Login</button> <br> <button>Sign up</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Inter,system-ui,sans-serif;background:#fff;color:#111"><h3 style="margin:0 0 10px">Stack of Pancakes</h3><p style="margin:0 0 14px">Log in or sign up to view the best photos of pancakes across the globe.</p><button>Login</button><br><button>Sign up</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What\'s wrong with this code?',
        code: '<!doctype html>\n<html>\n<body>\n<button>Click Bait<button>\n</body>\n</html>',
        codeTitle: 'index.html',
        options: [
          'There\'s a tag missing inside the `button` element',
          'The button\'s closing tag is missing a `/`',
          'The text inside the `button` element has a space',
          'Nothing\'s wrong with the code'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What does this code display?',
        code: '<!doctype html>\n<html>\n<body>\n<h1>Kit Kat</h1>\n<button>Give me a break!</button>\n</body>\n</html>',
        codeTitle: 'index.html',
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 18px;font-size:2.1rem">Kit Kat</h1><button>Give me a break!</button></body></html>',
        options: [
          'A button displaying `Give me a break!`',
          'A button displaying `Kit Kat`'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What happens when we place `<em>Add to Cart</em>` in between opening and closing `button` tags?',
        options: [
          'A button displays on a new line',
          'A button with emphasized text displays on the webpage'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What does this code display?',
        code: '<!doctype html>\n<html>\n<body>\n<button>Sign up</button>\n<button>Login</button>\n</body>\n</html>',
        codeTitle: 'index.html',
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:14px;font-family:Inter,system-ui,sans-serif;background:#fff;color:#111"><button>Sign up</button><button style="margin-left:6px">Login</button></body></html>',
        options: [
          'One button next to another button',
          'One button underneath another'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'Which tag do we use to place one button underneath another?',
        options: ['<br>', '<strong></strong>'],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the opening `<button>` tag.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <h1>Follow us on Twitter</h1>\n  ',
          '',
          '',
          'Follow</button>\n</body>\n</html>'
        ],
        blankAnswers: ['<', 'button', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['>', 'button', '<'],
        expectedCode: ['<button>Follow</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 18px;font-size:2rem">Follow us on Twitter</h1><button>Follow</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Display `Sign up` on the button by coding between the opening and closing tags.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <h1>Snapchat</h1>\n  <p>Sign up for a new account!</p>\n  <button>',
          '</button>\n</body>\n</html>'
        ],
        blankAnswers: ['Sign up'],
        blankPlaceholders: [''],
        promptChips: ['Sign up'],
        expectedCode: ['<button>Sign up</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 10px;font-size:2rem">Snapchat</h1><p style="margin:0 0 16px">Sign up for a new account!</p><button>Sign up</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Insert text inside `strong` tags to display `Click Me!` on the button.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <h3>Watch Out</h3>\n  <p>Whatever you do, just don\'t click the button!</p>\n  <button>',
          '',
          '',
          '',
          '</button>\n</body>\n</html>'
        ],
        blankAnswers: ['<strong>', 'Click Me!', '</strong>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['</strong>', 'Click Me!', '<strong>', '</em>', '<em>'],
        expectedCode: ['<button><strong>Click Me!</strong></button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Times New Roman,serif;background:#fff;color:#111"><h3 style="margin:0 0 10px;font-size:1.6rem">Watch Out</h3><p style="margin:0 0 16px">Whatever you do, just don\'t click the button!</p><button><strong>Click Me!</strong></button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Place the last button below the others.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <p>Not the gumdrop buttons!</p>\n  <button>Gumdrop</button>\n  <br>\n  <button>Gumdrop</button>\n  ',
          '',
          '',
          '\n  <button>Gumdrop</button>\n</body>\n</html>'
        ],
        blankAnswers: ['<', 'br', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['>', '<html>', 'br', '<'],
        expectedCode: ['<button>Gumdrop</button> <br> <button>Gumdrop</button> <br> <button>Gumdrop</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Times New Roman,serif;background:#fff;color:#111"><p style="margin:0 0 12px">Not the gumdrop buttons!</p><button>Gumdrop</button><br><button style="margin-top:6px">Gumdrop</button><br><button style="margin-top:6px">Gumdrop</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Display the `Share` button next to the other button.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <p>What a great time to be alive!</p>\n  <button>Like</button>\n  ',
          '',
          '',
          '\n</body>\n</html>'
        ],
        blankAnswers: ['<button>', 'Share', '</button>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['<br>', '<button>', 'Share', '</button>'],
        expectedCode: ['<button>Like</button> <button>Share</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:18px;font-family:Times New Roman,serif;background:#fff;color:#111"><p style="margin:0 0 12px">What a great time to be alive!</p><button>Like</button><button style="margin-left:6px">Share</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'html-5': {
    id: 'html-5',
    title: 'HTML Basics 1',
    xpReward: 50,
    content: [
      {
        type: 'quiz',
        data: 'How many paragraphs will this webpage have?',
        code: '<h1>My favorite things</h1>\n<p>Raindrops on roses Whiskers on kittens</p>\n<p>Bright copper kettles Warm woolen mittens</p>',
        codeTitle: 'index.html',
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 18px;font-size:2.05rem">My favorite things</h1><p style="margin:0 0 18px;font-size:1rem">Raindrops on roses Whiskers on kittens</p><p style="margin:0;font-size:1rem">Bright copper kettles Warm woolen mittens</p></body></html>',
        options: ['1', '2', '4'],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the missing closing tag.',
        templateParts: ['<h1>Welcome', ''],
        blankAnswers: ['</h1>'],
        blankPlaceholders: [''],
        promptChips: ['</\\h1>', '</h1>'],
        expectedCode: ['<h1>Welcome</h1>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0;font-size:2.05rem">Welcome</h1></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the right snippets to make the headings.',
        templateParts: [
          '',
          'Video games</h1>\n',
          'Console games</h2>\n',
          'Mobile games</h2>'
        ],
        blankAnswers: ['<h1>', '<h2>', '<h2>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['<h4>', '<h2>', '<h1>', '<h2>', '<h3>'],
        expectedCode: ['<h1>Video games</h1>', '<h2>Console games</h2>', '<h2>Mobile games</h2>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 14px;font-size:2.05rem">Video games</h1><h2 style="margin:0 0 10px;font-size:1.5rem">Console games</h2><h2 style="margin:0;font-size:1.5rem">Mobile games</h2></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Give this webpage the biggest heading.',
        templateParts: ['', 'Hello, World!', ''],
        blankAnswers: ['<h1>', '</h1>'],
        blankPlaceholders: ['', ''],
        promptChips: ['<h1>', '<h2>', '</p>', '</h1>', '<p>', '</h2>'],
        expectedCode: ['<h1>Hello, World!</h1>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0;font-size:2.05rem">Hello, World!</h1></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: "What's wrong with this webpage?",
        code: '</h1>3D Printers</h1>\n<p>Easy to get started</p>\n<p>Fun to play with</p>\n<p>Unlimited creativity</p>',
        codeTitle: 'index.html',
        options: [
          'Some closing tags are missing',
          "The paragraph tags aren't assembled correctly",
          'There is no opening `h1` tag'
        ],
        correctAnswer: 2
      },
      {
        type: 'quiz',
        data: "What's wrong with these emphasis tags?",
        code: '</em>Purple Haze</em>',
        codeTitle: 'index.html',
        options: [
          "There's a `/` sign in the opening tag",
          "There's no content inside them",
          "There's no closing tag"
        ],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the opening tag that defines text as important.',
        templateParts: [
          "<h1>Dr. Amp's Gold Shovels</h1>\n<p> Order now - ",
          '',
          '',
          '',
          "only $29.99</strong></p>"
        ],
        blankAnswers: ['<', 'strong', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['/', '<', 'strong', '>'],
        expectedCode: ["<p> Order now - <strong>only $29.99</strong></p>"],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          "<!DOCTYPE html><html><body style=\"margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111\"><h1 style=\"margin:0 0 16px;font-size:2.05rem\">Dr. Amp's Gold Shovels</h1><p style=\"margin:0;font-size:1rem\">Order now - <strong>only $29.99</strong></p></body></html>",
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'Why is the line break tag an empty tag?',
        options: [
          'Because it has no closing tag',
          'Because it has no effect on the structure of a webpage',
          'Because it has no opening tag'
        ],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Display `Accept` on the button by coding between the opening and closing tags.',
        templateParts: [
          '<h4>Terms and Conditions</h4>\n<p>By clicking accept, you agree to helping a friend this weekend.</p>\n<button>',
          '</button>\n<button>No way!</button>'
        ],
        blankAnswers: ['Accept'],
        blankPlaceholders: [''],
        promptChips: ['Reject', 'Accept'],
        expectedCode: ['<button>Accept</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h4 style="margin:0 0 12px;font-size:1.35rem">Terms and Conditions</h4><p style="margin:0 0 14px;font-size:1rem">By clicking accept, you agree to helping a friend this weekend.</p><button>Accept</button><button style="margin-left:6px">No way!</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the closing tag of the button displaying `Book a Room`.',
        templateParts: [
          "<h1>Joe's Bed and Breakfast</h1>\n<p>There's nothing more relaxing than booking a room at Joe's BnB.</p>\n<button>Book a Room",
          '',
          '',
          ''
        ],
        blankAnswers: ['</', 'button', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['button', '</', '<', '>', '<br>'],
        expectedCode: ['<button>Book a Room</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          `<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h1 style="margin:0 0 14px;font-size:2.05rem">Joe's Bed and Breakfast</h1><p style="margin:0 0 14px;font-size:1rem">There's nothing more relaxing than booking a room at Joe's BnB.</p><button>Book a Room</button></body></html>`,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: "What's wrong with this code?",
        code: '<button>Add to Cart</button>',
        codeTitle: 'index.html',
        options: [
          'The text inside the `button` element has a space',
          "The button's closing tag is missing a `/`",
          "Nothing's wrong with the code"
        ],
        correctAnswer: 2
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Place the last button below the other by coding `<br>`.',
        templateParts: [
          '<h4>Welcome to Code Quest</h4>\n<button>Sign Up</button>\n',
          '',
          '',
          '',
          '\n<button>Login</button>'
        ],
        blankAnswers: ['<', 'br', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['<', 'br', '</', '/>', '>'],
        expectedCode: ['<br>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h4 style="margin:0 0 12px;font-size:1.35rem">Welcome to Code Quest</h4><button>Sign Up</button><br><button style="margin-top:6px">Login</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Place the button displaying `Copy to Clipboard` next to the other button on the webpage.',
        templateParts: [
          '<h4>Joke of the Month</h4>\n<p>I made a pencil with two erasers. It was pointless.</p>\n<button>Vote</button>\n',
          '',
          '',
          '',
          ''
        ],
        blankAnswers: ['<button>', 'Copy to Clipboard', '</button>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['<h1>', '</h1>', 'Copy to Clipboard', '</button>', '<button>', '<br>'],
        expectedCode: ['<button>Vote</button>', '<button>Copy to Clipboard</button>'],
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;font-family:Times New Roman,serif;background:#fff;color:#111"><h4 style="margin:0 0 12px;font-size:1.35rem">Joke of the Month</h4><p style="margin:0 0 14px;font-size:1rem">I made a pencil with two erasers. It was pointless.</p><button>Vote</button><button style="margin-left:6px">Copy to Clipboard</button></body></html>',
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'html-6': {
    id: 'html-6',
    title: 'Creating Links',
    xpReward: 50,
    content: [
      {
        type: 'browser-preview',
        data: "Let's take a look at how links work to combine webpages into websites. Click on Take a break! to use the link.",
        browserTitle: 'Browser',
        previewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                * { box-sizing: border-box; }
                body {
                  margin: 0;
                  min-height: 100vh;
                  display: flex;
                  align-items: flex-start;
                  justify-content: center;
                  font-family: Georgia, "Times New Roman", serif;
                  background:
                    linear-gradient(180deg, rgba(187, 214, 255, 0.95) 0%, rgba(170, 204, 247, 0.92) 40%, rgba(184, 222, 244, 0.95) 100%);
                  color: #0f172a;
                }
                .panel {
                  width: 100%;
                  min-height: 100vh;
                  padding: 38px 24px;
                  text-align: center;
                  background:
                    linear-gradient(180deg, rgba(130, 175, 244, 0.18) 0%, rgba(255, 255, 255, 0) 42%, rgba(103, 154, 236, 0.14) 100%);
                }
                h1 {
                  margin: 0 0 28px;
                  font-size: 2.15rem;
                  line-height: 1.15;
                  font-weight: 700;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #000;
                }
                a {
                  font-size: 1rem;
                  color: #6b21a8;
                }
              </style>
            </head>
            <body>
              <div class="panel">
                <h1>Need five?</h1>
                <a href="https://www.baidu.com/">Take a break!</a>
              </div>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: "To start creating a link, we add the text in between the <a> and </a> tags. This won't highlight the text yet.",
        secondaryText: '<a> stands for "Anchor" tag.',
        templateParts: ['', 'Learn to Code', ''],
        blankAnswers: ['<a>', '</a>'],
        blankPlaceholders: ['Opening tag', 'Closing tag'],
        promptChips: ['</a>', '<a>'],
        expectedCode: ['<a>Learn to Code</a>'],
        previewTitle: 'Browser',
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <style>
                body {
                  margin: 0;
                  padding: 24px;
                  font-family: Arial, Helvetica, sans-serif;
                  background: #ffffff;
                  color: #111827;
                }
                .plain-text {
                  font-size: 1rem;
                  color: #111827;
                }
              </style>
            </head>
            <body>
              <span class="plain-text">Learn to Code</span>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To link the text to a webpage, we add href="" along with a Uniform Resource Locator (URL). href is short for "hypertext reference".',
        templateParts: ['<a ', '', '', '', '>Learn to Code</a>'],
        blankAnswers: ['href', '=', '"https://CodeQuest.com"'],
        blankPlaceholders: ['Attribute', 'Equals sign', 'URL'],
        promptChips: ['href', '=', '"https://CodeQuest.com"'],
        expectedCode: ['<a href="https://CodeQuest.com">Learn to Code</a>'],
        previewTitle: 'Browser',
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <style>
                body {
                  margin: 0;
                  padding: 24px;
                  font-family: Arial, Helvetica, sans-serif;
                  background: #ffffff;
                  color: #111827;
                }
                a {
                  font-size: 1rem;
                  color: #2563eb;
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <a href="https://CodeQuest.com">Learn to Code</a>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'href is an attribute. All attributes have two things in common: they provide extra information and they go inside the opening tag.',
        secondaryText:
          'Attributes are added after the name of the tag, and before the > closing sign.',
        templateParts: ['<a ', '', '="https://CodeQuest.com">Learn to Code</a>'],
        blankAnswers: ['href'],
        blankPlaceholders: ['Attribute'],
        promptChips: ['href'],
        expectedCode: ['<a href="https://CodeQuest.com">Learn to Code</a>']
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We link to a webpage by adding = after the attribute and a URL as a value in between quotes.',
        templateParts: [
          '<!doctype html>\n<html>\n<body>\n  <a href',
          '',
          '',
          '',
          '',
          '>Learn to Code</a>\n</body>\n</html>'
        ],
        blankAnswers: ['=', '"', 'https://CodeQuest.com', '"'],
        blankPlaceholders: ['=', '"', 'URL', '"'],
        promptChips: ['"', 'https://CodeQuest.com', '"', '='],
        expectedCode: [
          '<!doctype html>\n<html>\n<body>\n  <a href="https://CodeQuest.com">Learn to Code</a>\n</body>\n</html>'
        ],
        previewTitle: 'Browser',
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <style>
                body {
                  margin: 0;
                  padding: 24px;
                  font-family: Arial, Helvetica, sans-serif;
                  background: #ffffff;
                  color: #111827;
                }
                a {
                  font-size: 1rem;
                  color: #2563eb;
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <a href="https://CodeQuest.com">Learn to Code</a>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Create an opening <a> tag with the href attribute set to "https://CodeQuest.com".',
        codeTitle: 'index.html',
        templateParts: ['', '', ' ', '', '', '', '', 'Learn to Code</a>'],
        blankAnswers: ['<', 'a', 'href', '=', '"https://CodeQuest.com"', '>'],
        blankPlaceholders: ['', '', '', '', '', ''],
        promptChips: ['<', '>', 'a', 'href', '"https://CodeQuest.com"', '='],
        expectedCode: ['<a href="https://CodeQuest.com">Learn to Code</a>'],
        previewTitle: 'Browser',
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <style>
                body {
                  margin: 0;
                  padding: 24px;
                  font-family: Arial, Helvetica, sans-serif;
                  background: #ffffff;
                  color: #111827;
                }
                a {
                  font-size: 1rem;
                  color: #2563eb;
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <a href="https://CodeQuest.com">Learn to Code</a>
            </body>
          </html>
        `
      },
      {
        type: 'quiz',
        data: 'What do links do?',
        options: [
          'Emphasize text',
          'Link webpages to other webpages and websites'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Why is the link not working?',
        code: '<a>Learn to Code</a>',
        codeTitle: 'index.html',
        options: [
          'Because it has no `href` attribute',
          'Because it has no text between `<a>` and `</a>`'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What happens when a visitor clicks the link on this webpage?',
        code: '<a href="https://CodeQuest.com">Where Developers Learn, Share,\n  & Build Careers</a>',
        codeTitle: 'index.html',
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:14px;background:#fff;color:#111;font-family:Times New Roman,serif"><a href="https://CodeQuest.com">Where Developers Learn, Share, &amp; Build Careers</a></body></html>',
        options: [
          'The link directs the user to another website',
          'Nothing, because the `href` attribute is missing'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What are `attributes` for?',
        options: [
          'To turn all tags into links',
          'To provide additional information about tags'
        ],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Pick the opening tag that makes the link clickable.',
        templateParts: ['', 'Buy a car</a>'],
        blankAnswers: ['<a href="https://cars.com">'],
        blankPlaceholders: [''],
        promptChips: ['<a href="https://cars.com">', '<a>'],
        expectedCode: ['<a href="https://cars.com">Buy a car</a>'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the attribute and its value so that clicking the link directs users to the Facebook website.',
        codeTitle: 'index.html',
        templateParts: ['<a ', '', '', '', '>Like us on Facebook</a>'],
        blankAnswers: ['href', '=', '"https://facebook.com"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['"https://facebook.com"', 'href', '='],
        expectedCode: ['<a href="https://facebook.com">Like us on Facebook</a>'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Put together the tag to direct users to the Snapchat website.',
        codeTitle: 'index.html',
        templateParts: ['<a href="https://www.snap.com/">Open Snapchat', '', '', ''],
        blankAnswers: ['</', 'a', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['>', '</', 'a'],
        expectedCode: ['<a href="https://www.snap.com/">Open Snapchat</a>'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Type the `href` attribute.',
        codeTitle: 'index.html',
        templateParts: ['<a ', '="https://abc.com">Watch some news</a>'],
        blankAnswers: ['href'],
        blankPlaceholders: [''],
        expectedCode: ['<a href="https://abc.com">Watch some news</a>'],
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'html-7': {
    id: 'html-7',
    title: 'Adding Images',
    xpReward: 75,
    content: [
      {
        type: 'browser-preview',
        data: 'HTML also allows us to add images to a webpage.',
        browserTitle: 'Browser',
        previewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 10px 0 0;
                  background: #e7e7e7;
                  color: #111;
                  font-family: "Times New Roman", Times, serif;
                  text-align: center;
                }
                h1 {
                  margin: 0 0 18px;
                  font-size: 3rem;
                  line-height: 1.03;
                  font-weight: 700;
                }
                .frame {
                  display: inline-block;
                  border: 12px solid #8f8f8f;
                  padding: 8px;
                  background: #f5f5f5;
                }
                img {
                  width: 240px;
                  height: 150px;
                  object-fit: cover;
                  display: block;
                  border: 2px solid #b5b5b5;
                }
              </style>
            </head>
            <body>
              <h1>Photography<br />competition winner</h1>
              <div class="frame">
                <img src="https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=80" alt="Fox in snow" />
              </div>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To add `images` to a webpage, we start with the `<img>` tag.',
        codeTitle: 'index.html',
        templateParts: ['<h3>Drawing of <em>Earthrise</em> </h3>\n', ''],
        blankAnswers: ['<img>'],
        blankPlaceholders: [''],
        promptChips: ['<img>', '<a>'],
        expectedCode: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img>'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Just like `<br>`, `<img>` is an empty tag. That means it has no closing tag.',
        codeTitle: 'index.html',
        templateParts: ['<h3>Drawing of <em>Earthrise</em> </h3>\n', '', '', ''],
        blankAnswers: ['<', 'img', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['>', '<', 'img', '<img></img>'],
        expectedCode: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img>'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To display an image, an image tag needs the `src` attribute. `src` stands for source.',
        codeTitle: 'index.html',
        templateParts: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img ', '', '="https://picsum.photos/id/1039/400/300">'],
        blankAnswers: ['src'],
        blankPlaceholders: [''],
        promptChips: ['src', 'source'],
        expectedCode: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img src="https://picsum.photos/id/1039/400/300">'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We set the image we want to display with an `=` sign and the image\'s address between double quotes.',
        codeTitle: 'index.html',
        templateParts: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img ', '', '', '', '>'],
        blankAnswers: ['src', '=', '"https://picsum.photos/id/1039/400/300"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['"https://picsum.photos/id/1039/400/300"', 'source', '=', 'src'],
        expectedCode: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img src="https://picsum.photos/id/1039/400/300">'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can use attributes to change the size of images. The `width` and `height` attributes use pixels as the default unit of measurement.\n\nFor example, to set the width of this image as 100px, code `width = "100"`.',
        codeTitle: 'index.html',
        templateParts: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img src="https://picsum.photos/id/1039/400/300" ', '', '', '', ' height="200">'],
        blankAnswers: ['width', '=', '"100"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['<100>', 'width', '=', '"100"'],
        expectedCode: ['<h3>Drawing of <em>Earthrise</em> </h3>\n<img src="https://picsum.photos/id/1039/400/300" width="100" height="200">'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'And the `height` attribute adjusts the height of an image.',
        codeTitle: 'index.html',
        templateParts: ['<img src="https://picsum.photos/id/1039/400/300" width="200" ', '', '="300" >'],
        blankAnswers: ['height'],
        blankPlaceholders: [''],
        expectedCode: ['<img src="https://picsum.photos/id/1039/400/300" width="200" height="300" >'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What makes `<img>` an empty tag?',
        options: [
          'It has no closing tag',
          'It has no attributes',
          "There's no `/` in its opening tag"
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'How many images will appear on this webpage?',
        code: '<img src="https://picsum.photos/id/237/300/180">\n<img src="https://picsum.photos/id/1025/300/180">',
        codeTitle: 'index.html',
        previewTitle: 'Browser',
        solvedPreviewHtml:
          '<!DOCTYPE html><html><body style="margin:0;padding:12px;background:#fff;color:#111;font-family:Arial,sans-serif"><img src="https://picsum.photos/id/237/300/180" alt="Dog" style="display:block;margin-bottom:10px"><img src="https://picsum.photos/id/1025/300/180" alt="Another dog" style="display:block"></body></html>',
        options: ['1', '2'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'How can we adjust the height of an image?',
        options: [
          'With the `<height>` tag',
          'With the `height` attribute'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Which attribute do we need to set for the `img` tag?',
        options: [
          'The `href` attribute',
          'The `src` attribute'
        ],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the `width` attribute of the image to `"200"`.',
        codeTitle: 'index.html',
        templateParts: ['<img src="https://picsum.photos/id/1025/300/180" ', '', '', '', ' height="200">'],
        blankAnswers: ['width', '=', '"200"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['<width>', '"200"', 'width', '='],
        expectedCode: ['<img src="https://picsum.photos/id/1025/300/180" width="200" height="200">'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Pick the correct tag for an image.',
        codeTitle: 'index.html',
        templateParts: ['', '', ' ', '', '', '', '', ''],
        blankAnswers: ['<', 'img', 'src', '=', '"https://picsum.photos/id/1060/300/180"', '>'],
        blankPlaceholders: ['', '', '', '', '', ''],
        promptChips: ['img', '>', '"https://picsum.photos/id/1060/300/180"', '<', '=', '</img>', 'src'],
        expectedCode: ['<img src="https://picsum.photos/id/1060/300/180">'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Use the correct attribute to set the source of the image.',
        codeTitle: 'index.html',
        templateParts: ['<img ', '', '="https://picsum.photos/id/1073/300/180">'],
        blankAnswers: ['src'],
        blankPlaceholders: [''],
        expectedCode: ['<img src="https://picsum.photos/id/1073/300/180">'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the height of the image with `height="100"`.',
        codeTitle: 'index.html',
        templateParts: ['<img src="https://picsum.photos/id/237/300/180" width="100" ', '', '>'],
        blankAnswers: ['height="100"'],
        blankPlaceholders: [''],
        expectedCode: ['<img src="https://picsum.photos/id/237/300/180" width="100" height="100">'],
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'html-8': {
    id: 'html-8',
    title: 'HTML Basics 2',
    xpReward: 80,
    content: [
      {
        type: 'text',
        data: 'Welcome to HTML Basics 2. This section is ready for your next set of lessons.'
      }
    ]
  },
  'html-9': {
    id: 'html-9',
    title: 'Gathering Input',
    xpReward: 60,
    content: [
      {
        type: 'text',
        data: 'Gathering Input starts here. We will learn how forms collect user data.'
      }
    ]
  },
  'html-10': {
    id: 'html-10',
    title: 'Grouping Elements',
    xpReward: 60,
    content: [
      {
        type: 'text',
        data: 'Grouping Elements starts here. We will learn how to group related content in HTML.'
      }
    ]
  },
  'html-11': {
    id: 'html-11',
    title: 'Building Lists',
    xpReward: 60,
    content: [
      {
        type: 'text',
        data: 'Building Lists starts here. We will learn ordered and unordered lists.'
      }
    ]
  },
  'html-12': {
    id: 'html-12',
    title: 'Linking Webpages',
    xpReward: 60,
    content: [
      {
        type: 'text',
        data: 'Linking Webpages starts here. We will connect pages with links.'
      }
    ]
  },
  'html-13': {
    id: 'html-13',
    title: 'HTML Intermediate',
    xpReward: 85,
    content: [
      {
        type: 'text',
        data: 'HTML Intermediate practice starts here.'
      }
    ]
  }
};
