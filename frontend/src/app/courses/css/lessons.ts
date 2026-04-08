import type { LessonDefinition } from '../../lessonTypes';

export const cssLessonContent: Record<string, LessonDefinition> = {
  'css-1': {
    id: 'css-1',
    title: 'Stylesheet and Basic Selectors',
    xpReward: 45,
    content: [
      {
        type: 'browser-preview',
        data: "We'll now move on to making great-looking websites with the help of a styling language called CSS, short for Cascading Style Sheets.",
        browserTitle: 'Browser',
        previewHint: 'Scrollable',
        previewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  background: #efefef;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #1f2a4d;
                  text-align: center;
                }
                .wrap {
                  padding: 34px 18px 30px;
                }
                .brand {
                  font-size: 2rem;
                  font-weight: 800;
                  letter-spacing: 0.02em;
                  color: #454c8b;
                  margin: 0 0 20px;
                }
                .avatar {
                  width: 86px;
                  height: 86px;
                  border-radius: 999px;
                  object-fit: cover;
                  display: block;
                  margin: 0 auto 18px;
                }
                .name {
                  margin: 0;
                  font-size: 2.1rem;
                  font-weight: 800;
                  color: #1d2b92;
                }
                .meta {
                  margin: 10px 0 16px;
                  font-size: 1rem;
                  color: #2c2f47;
                }
                a {
                  color: #2563eb;
                  font-size: 0.95rem;
                  text-decoration: underline;
                }
              </style>
            </head>
            <body>
              <div class="wrap">
                <p class="brand">INSTAPOLAROID</p>
                <img class="avatar" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" alt="Profile photo" />
                <p class="name">hotrod-helen</p>
                <p class="meta">verified account</p>
                <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">https://www.example.com</a>
              </div>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To make larger webpages more manageable, we can move our CSS to a style sheet, or a special file just for styling the webpage.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  ',
          '\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>Why does water never laugh at jokes? It\'s not a fan of dry humor.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['h1 {\n  color: #ff2d17;\n}\n\np {\n  color: #0f32ff;\n}'],
        blankAnswers: ['<link rel="stylesheet" href="style.css">'],
        blankPlaceholders: [''],
        promptChips: ['<link rel="stylesheet" href="style.css">'],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>Why does water never laugh at jokes? It\'s not a fan of dry humor.</p>\n</body>\n</html>'
        ],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 12px;
                  color: #ff2d17;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: #0f32ff;
                  font-size: 2.2rem;
                  line-height: 1.1;
                }
              </style>
            </head>
            <body>
              <h1>Water Puns</h1>
              <p>Why does water never laugh at jokes? It's not a fan of dry humor.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To include a style sheet in an HTML file, we use the `link` element.\n`<link>` is a self-closing empty element and it goes inside the `head` element.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  ',
          '\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>Why does water never laugh at jokes? It\'s not a fan of dry humor.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [''],
        blankAnswers: ['<link>'],
        blankPlaceholders: [''],
        promptChips: ['<link></link>', '<link>'],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link>\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>Why does water never laugh at jokes? It\'s not a fan of dry humor.</p>\n</body>\n</html>'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To know what kind of file to include, the opening `link` tag needs the `rel` attribute set using `rel="stylesheet"`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link ',
          '',
          '',
          '',
          '>\n</head>\n<body>\n  <h1>Water puns</h1>\n  <p>Why are rivers amazing roommates? They go with the flow.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [''],
        blankAnswers: ['rel', '=', '"stylesheet"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['"stylesheet"', 'rel', '='],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet">\n</head>\n<body>\n  <h1>Water puns</h1>\n  <p>Why are rivers amazing roommates? They go with the flow.</p>\n</body>\n</html>'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To specify the style sheet\'s location, set the `href` attribute to `"style.css"`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" ',
          '',
          '',
          '',
          '>\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>Why are oceans so meticulous?<br> They like to be pacific. </p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [''],
        blankAnswers: ['href', '=', '"style.css"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['"style.css"', 'href', '='],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>Why are oceans so meticulous?<br> They like to be pacific. </p>\n</body>\n</html>'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Inside the CSS file, we specify which element to style with a tag selector. Select the `p` tag.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>When does it start to rain money? When there\'s change in the weather.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ''],
        blankAnswers: ['p'],
        blankPlaceholders: [''],
        promptChips: ['p'],
        expectedCode: ['p'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: #111;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: #111;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Water Puns</h1>
              <p>When does it start to rain money? When there's change in the weather.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We then add an opening brace, `{`, followed by a closing brace, `}`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>When does it start to rain money? When there\'s change in the weather. </p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p ', '\n', ''],
        blankAnswers: ['{', '}'],
        blankPlaceholders: ['', ''],
        promptChips: ['{', '}'],
        expectedCode: ['p {\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: #111;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: #111;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Water Puns</h1>
              <p>When does it start to rain money? When there's change in the weather.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Now, any declaration we add will apply to all `p` elements on the webpage. Add the `color: blue;` declaration.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>When does it start to rain money? When there\'s change in the weather. </p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  ', '', ' ', '', ' ', '', '\n}'],
        blankAnswers: ['color', ':', 'blue', ';'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: [':', ';', 'blue', 'color'],
        expectedCode: ['p {\n  color: blue;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: #111;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: blue;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Water Puns</h1>
              <p>When does it start to rain money? When there's change in the weather.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'When we add `p {` followed by `color: blue;`, and then `}`, we create a CSS rule.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>When does it start to rain money? When there\'s change in the weather. </p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' ', '\n  ', '\n', ''],
        blankAnswers: ['p', '{', 'color: blue;', '}'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['}', '{', 'p', 'color: blue;'],
        expectedCode: ['p {\n  color: blue;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: #111;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: blue;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Water Puns</h1>
              <p>When does it start to rain money? When there's change in the weather.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can add other declarations like `background-color: pink` as long as they\'re on another line.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Water Puns</h1>\n  <p>When does it start to rain money? When there\'s change in the weather. </p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  color: blue;\n  background-color: pink;\n}'],
        blankAnswers: [],
        blankPlaceholders: [],
        promptChips: [],
        expectedCode: ['p {\n  color: blue;\n  background-color: pink;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: #111;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: blue;
                  background-color: pink;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Water Puns</h1>
              <p>When does it start to rain money? When there's change in the weather.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How can we style a website?',
        options: ['By adding JavaScript in a script', 'By adding CSS in a style sheet'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What happens when we style elements on a webpage in an included style sheet?',
        options: ['Any changes to the style sheet become visible on the webpage', 'The elements become interactive'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'How can we apply a style to an element?',
        options: ['By using `document.getElementById()` in a style sheet', 'By adding its name, braces, and the style changes in a style sheet'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What does the `href` attribute do in this piece of code?',
        codeTitle: 'index.html',
        code: '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n</body>\n</html>',
        options: ['It tells the `link` element what kind of file to include', 'It allows the `link` element to find the style sheet'],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Assemble the element we use to include a style sheet.',
        codeTitle: 'index.html',
        templateParts: [
          '<!doctype html>\n<html>\n<head>\n  ',
          '',
          '',
          '\n</head>\n<body>\n  <h1>Selected Equipment</h1>\n  <p>Water slides</p>\n</body>\n</html>'
        ],
        blankAnswers: ['<', 'link', '>'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['link', '<', '>'],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link>\n</head>\n<body>\n  <h1>Selected Equipment</h1>\n  <p>Water slides</p>\n</body>\n</html>'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Select the `h1` element in the style sheet.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link href="style.css" rel="stylesheet">\n</head>\n<body>\n  <h1>Supported Equipment</h1>\n  <p>Water cannons</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' {\n  color: blue;\n}'],
        blankAnswers: ['h1'],
        blankPlaceholders: [''],
        promptChips: ['<h1>', 'h1'],
        expectedCode: ['h1 {\n  color: blue;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: blue;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: #111;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Supported Equipment</h1>
              <p>Water cannons</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the attribute that helps the `link` element find the style sheet.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" ',
          '="style.css">\n</head>\n<body>\n  <h1>Unsupported Equipment</h1>\n  <p>Water slides</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h1 {\n  color: blue;\n}'
        ],
        blankAnswers: ['href'],
        blankPlaceholders: [''],
        promptChips: ['href', 'src'],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Unsupported Equipment</h1>\n  <p>Water slides</p>\n</body>\n</html>'
        ],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: blue;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: #111;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>Unsupported Equipment</h1>
              <p>Water slides</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code `"stylesheet"` to let the `link` element know what kind of file to include.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="',
          '" href="style.css">\n</head>\n<body>\n  <h1>New Equipment</h1>\n  <p>Wave pools</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h1 {\n  color: blue;\n}'
        ],
        blankAnswers: ['stylesheet'],
        blankPlaceholders: [''],
        promptChips: ['stylesheet'],
        expectedCode: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>New Equipment</h1>\n  <p>Wave pools</p>\n</body>\n</html>'
        ],
        previewTitle: 'Browser',
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: #f1f1f1;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 14px;
                  color: blue;
                  font-size: 3rem;
                }
                p {
                  margin: 0;
                  color: #111;
                  font-size: 2rem;
                  line-height: 1.2;
                }
              </style>
            </head>
            <body>
              <h1>New Equipment</h1>
              <p>Wave pools</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-2': {
    id: 'css-2',
    title: 'Styling Text',
    xpReward: 45,
    content: [
      { type: 'text', data: 'In this lesson, we style text with color, size, and weight.' }
    ]
  },
  'css-3': {
    id: 'css-3',
    title: 'Setting Size and Borders',
    xpReward: 45,
    content: [
      { type: 'text', data: 'In this lesson, we set width/height and add borders.' }
    ]
  },
  'css-4': {
    id: 'css-4',
    title: 'CSS Basics 1',
    xpReward: 75,
    content: [
      { type: 'text', data: 'Practice lesson: CSS Basics 1.' }
    ]
  },
  'css-5': {
    id: 'css-5',
    title: 'Building with the Box Model',
    xpReward: 50,
    content: [
      { type: 'text', data: 'In this lesson, we use margin, border, padding, and content sizing.' }
    ]
  },
  'css-6': {
    id: 'css-6',
    title: 'Adding Padding with One Line',
    xpReward: 50,
    content: [
      { type: 'text', data: 'In this lesson, we use shorthand padding values.' }
    ]
  },
  'css-7': {
    id: 'css-7',
    title: 'Styling Corners with One Line',
    xpReward: 50,
    content: [
      { type: 'text', data: 'In this lesson, we style corners using border-radius.' }
    ]
  },
  'css-8': {
    id: 'css-8',
    title: 'CSS Basics 2',
    xpReward: 80,
    content: [
      { type: 'text', data: 'Practice lesson: CSS Basics 2.' }
    ]
  }
};
