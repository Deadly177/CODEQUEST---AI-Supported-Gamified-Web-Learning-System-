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
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'If we want a style to apply to the entire page, we can use the `body` selector.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The Social Book</h1>\n  <p>Sign up with us</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' {\n}'],
        blankAnswers: ['body'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['body {\n}'],
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
                  background: #ffffff;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 0 0 18px;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>The Social Book</h1>
              <p>Sign up with us</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Setting the background color to `blue;` inside the `body` rule sets the background for the entire body.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The Social Book</h1>\n  <p>Sign up with us</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['body {\n  ', '\n}'],
        blankAnswers: ['background-color: blue;'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['body {\n  background-color: blue;\n}'],
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
                  background: blue;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 0 0 18px;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>The Social Book</h1>
              <p>Sign up with us</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Styles like `color: white;`, when set inside the `body` rule will apply to all elements inside the `body` tag.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The Social Book</h1>\n  <p>Sign up with us</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['body {\n  background-color: blue;\n  ', '\n}'],
        blankAnswers: ['color: white;'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['body {\n  background-color: blue;\n  color: white;\n}'],
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
                  background: blue;
                  color: white;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 18px;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>The Social Book</h1>
              <p>Sign up with us</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can style as many elements as we want as long as we add a space between different rules.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The Social Book</h1>\n  <p>Sign up with us</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['body {\n  background-color: blue;\n  color: white;\n}\n\n', ' ', '\n  ', '\n', ''],
        blankAnswers: ['h1', '{', 'font-family: Helvetica;', '}'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['{', 'font-family: Helvetica;', '}', 'h1'],
        expectedCode: ['body {\n  background-color: blue;\n  color: white;\n}\n\nh1 {\n  font-family: Helvetica;\n}'],
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
                  background: blue;
                  color: white;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 18px;
                  font-size: 3rem;
                  font-family: Helvetica, Arial, sans-serif;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>The Social Book</h1>
              <p>Sign up with us</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'code',
        data: 'Using the `body` tag is one of the easiest ways to add overlapping rules on elements. We\'ll learn about the other ways soon.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        code: '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Venn Diagram Generator</h1>\n  <p>Learn how to create your own personal Venn Diagrams</p>\n  <img width="250" src="https://mimo.app/r/venn.png">\n</body>\n</html>',
        secondaryCode: 'body {\n  background-color: cornsilk;\n}\n\nh1 {\n  font-family: Helvetica;\n  color: darkGray;\n}\n\np {\n  color: gray;\n  font-weight: bold;\n  font-family: cursive;\n}',
        previewTitle: 'Browser',
        previewHtml: `
          <!doctype html>
          <html>
            <head>
              <style>
                body {
                  margin: 0;
                  padding: 24px;
                  background-color: cornsilk;
                }
                h1 {
                  margin: 0 0 12px;
                  font-family: Helvetica, Arial, sans-serif;
                  color: darkGray;
                }
                p {
                  margin: 0 0 18px;
                  color: gray;
                  font-weight: bold;
                  font-family: cursive;
                }
                img {
                  width: 250px;
                  display: block;
                }
              </style>
            </head>
            <body>
              <h1>Venn Diagram Generator</h1>
              <p>Learn how to create your own personal Venn Diagrams</p>
              <img src="https://mimo.app/r/venn.png" alt="Venn Diagram" />
            </body>
          </html>
        `
      },
      {
        type: 'quiz',
        data: 'Why do we want to style the `body` element?',
        options: [
          'To apply style to all elements inside the `body` element',
          'To make the webpage interactive'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What\'s wrong with this code?',
        codeTitle: 'style.css',
        code: 'body {\n  background-color: blue;\n  color: white;\n}\n\nh1\n  font-family: Helvetica;\n}',
        options: [
          'The `h1` selector has a wrong CSS property inside',
          'The `h1` selector is missing an opening curly brace'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What happens when we change the `background-color` of the `h1` element?',
        codeTitle: 'style.css',
        code: 'body {\n  color: gray;\n}\n\nh1 {\n  background-color: blue;\n}',
        options: [
          'The background changes for all elements on the webpage',
          'The background changes only for the `h1` elements'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'How many rules can we add to our CSS file?',
        options: [
          'Only one',
          'As many as we want'
        ],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the background color of all elements on this webpage to the value `azure` and the color of the heading to `gray`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Diana\'s Webstore</h1>\n  <p>Welcome to the best online shop for Instapolaroid cameras!</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['body {\n  ', '\n}\n\nh1 {\n  ', '\n}\n\np {\n  color: red;\n}'],
        blankAnswers: ['background-color: azure;', 'color: gray;'],
        blankPlaceholders: ['', ''],
        promptChips: ['background-color: azure;', 'color: azure;', 'color: gray;'],
        expectedCode: ['body {\n  background-color: azure;\n}\n\nh1 {\n  color: gray;\n}\n\np {\n  color: red;\n}'],
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
                  background: azure;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 18px;
                  color: gray;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  color: red;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>Diana's Webstore</h1>
              <p>Welcome to the best online shop for Instapolaroid cameras!</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the `h1` selector.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The new Yphone</h1>\n  <p>Now with zero cameras. Why? Nobody knows.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['body {\n  background-color: lightBlue;\n  color: white;\n}\n\n', ' {\n  font-family: Helvetica;\n}'],
        blankAnswers: ['h1'],
        blankPlaceholders: [''],
        promptChips: ['h1'],
        expectedCode: ['body {\n  background-color: lightBlue;\n  color: white;\n}\n\nh1 {\n  font-family: Helvetica;\n}'],
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
                  background: lightBlue;
                  color: white;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 18px;
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>The new Yphone</h1>
              <p>Now with zero cameras. Why? Nobody knows.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the declaration `font-style: italic;` to both the rule for `h3` and the rule for `p` tags.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Great places in Italy</h3>\n  <p>Bari</p>\n  <p>Rome</p>\n  <p>Venice</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['h3 {\n  ', '\n}\n\np {\n  ', '\n}'],
        blankAnswers: ['font-style: italic;', 'font-style: italic;'],
        blankPlaceholders: ['', ''],
        promptChips: ['font-style: italic;', 'font-style: italic;', 'font-weight: bold;'],
        expectedCode: ['h3 {\n  font-style: italic;\n}\n\np {\n  font-style: italic;\n}'],
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
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h3 {
                  margin: 0 0 18px;
                  font-style: italic;
                  font-size: 2rem;
                  font-weight: 700;
                }
                p {
                  margin: 0 0 16px;
                  font-style: italic;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h3>Great places in Italy</h3>
              <p>Bari</p>
              <p>Rome</p>
              <p>Venice</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set `background-color` to the value `black`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>THE ZONE</h1>\n  <p>Watch sports, anywhere.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['body {\n  ', '\n}\n\nh1 {\n  font-family: Helvetica;\n  color: white;\n}\n\np {\n  color: white;\n}'],
        blankAnswers: ['background-color: black;'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['body {\n  background-color: black;\n}\n\nh1 {\n  font-family: Helvetica;\n  color: white;\n}\n\np {\n  color: white;\n}'],
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
                  background: black;
                  color: white;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 18px;
                  font-family: Helvetica, Arial, sans-serif;
                  color: white;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  color: white;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <h1>THE ZONE</h1>
              <p>Watch sports, anywhere.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-3': {
    id: 'css-3',
    title: 'Setting Size and Borders',
    xpReward: 45,
    content: [
      {
        type: 'code',
        data: 'If there are multiple elements of the same kind on a webpage, selectors like `h1`, `h2`, or `p` change all of these elements.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        previewTitle: 'Browser',
        code: '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Not On Time Magazine</h1>\n  <p> Always first with the last </p>\n  <h2>Car Trends</h2>\n  <p> Coal powered cars. The future? </p>\n  <h2>Fashion Latest</h2>\n  <p> Flared jeans </p>\n</body>\n</html>',
        secondaryCode: 'h1 {\n  font: "Arial";\n  color: green;\n}\n\nh2 {\n  font: "Arial";\n  color: blue;\n}\n\np {\n  font: "Arial";\n  font-weight: normal;\n}',
        previewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 16px 12px;
                  background: white;
                  font-family: Arial, Helvetica, sans-serif;
                }
                h1 {
                  margin: 0 0 18px;
                  color: green;
                  font-size: 3rem;
                  font-weight: 700;
                }
                h2 {
                  margin: 18px 0 12px;
                  color: blue;
                  font-size: 2.3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  color: #111111;
                  font-size: 1.2rem;
                  font-weight: 400;
                  line-height: 1.4;
                }
              </style>
            </head>
            <body>
              <h1>Not On Time Magazine</h1>
              <p>Always first with the last</p>
              <h2>Car Trends</h2>
              <p>Coal powered cars. The future?</p>
              <h2>Fashion Latest</h2>
              <p>Flared jeans</p>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'If we want to select one or more elements, we can set a `class` attribute for the exact elements we want to change.\n\nIn the stylesheet, we can set a new class rule with a `.` followed by the name of the class. Like here with `.gray-element`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <ol> TO DO: <li class="gray-element">Floss</li>\n    <li>Feed Cat</li>\n    <li class="gray-element">Nap</li>\n    <li>Plan holiday</li>\n    <li class="gray-element">Order tea</li>\n  </ol>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' {\n  background-color: lightgrey;\n}'],
        blankAnswers: ['.gray-element'],
        blankPlaceholders: [''],
        promptChips: ['.gray-element', 'li'],
        expectedCode: ['.gray-element {\n  background-color: lightgrey;\n}'],
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
                  padding: 22px 30px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                ol {
                  margin: 0;
                  padding-left: 34px;
                  font-size: 1.15rem;
                }
                .todo-label {
                  display: block;
                  margin: 0 0 6px -4px;
                  font-size: 1.12rem;
                  font-weight: 700;
                }
                li {
                  margin: 0 0 8px;
                  padding: 0;
                  font-size: 0.95rem;
                  line-height: 1.2;
                }
                .gray-element {
                  background-color: lightgrey;
                }
              </style>
            </head>
            <body>
              <ol>
                <span class="todo-label">TO DO:</span>
                <li class="gray-element">Floss</li>
                <li>Feed Cat</li>
                <li class="gray-element">Nap</li>
                <li>Plan holiday</li>
                <li class="gray-element">Order tea</li>
              </ol>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'The rules for the class will apply to all elements that have that class attribute in the `html` file.\n\nClasses aren\'t unique, so we can set the same class for multiple elements. Like here for example, with `class = "gray-element"`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <ol> TO DO: <li class="gray-element">Floss</li>\n    <li>Feed Cat</li>\n    <li class="gray-element">Nap</li>\n    <li>Plan holiday</li>\n    <li ',
          '',
          '',
          '',
          '>Order tea</li>\n  </ol>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['.gray-element {\n  background-color: lightGray;\n}'],
        blankAnswers: ['class', '=', '"gray-element"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['=', 'li', '"gray-element"', 'class'],
        expectedCode: ['<li class="gray-element">Order tea</li>'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 20px 22px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                ol {
                  margin: 0;
                  padding-left: 34px;
                  font-size: 1.15rem;
                }
                .todo-label {
                  display: block;
                  margin: 0 0 6px -4px;
                  font-size: 1.12rem;
                  font-weight: 700;
                }
                li {
                  margin: 0 0 8px;
                  padding: 0;
                  font-size: 0.95rem;
                  line-height: 1.2;
                }
                .gray-element {
                  background-color: lightgrey;
                }
              </style>
            </head>
            <body>
              <ol>
                <span class="todo-label">TO DO:</span>
                <li class="gray-element">Floss</li>
                <li>Feed Cat</li>
                <li class="gray-element">Nap</li>
                <li>Plan holiday</li>
                <li class="gray-element">Order tea</li>
              </ol>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To set a class as a selector in CSS, add a period followed by the class name. In this case, it\'s `.gray-element`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <ol>TO DO:\n    <li class="gray-element">Floss</li>\n    <li>Feed Cat</li>\n    <li class="gray-element">Nap</li>\n    <li>Plan holiday</li>\n    <li class="gray-element">Order tea</li>\n  </ol>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', '', ' {\n  background-color: lightGray;\n}'],
        blankAnswers: ['.', 'gray-element'],
        blankPlaceholders: ['', ''],
        promptChips: ['gray-element', '.'],
        expectedCode: ['.gray-element {\n  background-color: lightGray;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 20px 22px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                ol {
                  margin: 0;
                  padding-left: 34px;
                  font-size: 1.15rem;
                }
                .todo-label {
                  display: block;
                  margin: 0 0 6px -4px;
                  font-size: 1.12rem;
                  font-weight: 700;
                }
                li {
                  margin: 0 0 8px;
                  padding: 0;
                  font-size: 0.95rem;
                  line-height: 1.2;
                }
                .gray-element {
                  background-color: lightgrey;
                }
              </style>
            </head>
            <body>
              <ol>
                <span class="todo-label">TO DO:</span>
                <li class="gray-element">Floss</li>
                <li>Feed Cat</li>
                <li class="gray-element">Nap</li>
                <li>Plan holiday</li>
                <li class="gray-element">Order tea</li>
              </ol>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How do we apply a style to one or more, but not all elements on a webpage?',
        options: ['With the class selector', 'With the tag selector'],
        correctAnswer: 0,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What forms a rule?',
        options: ['Only properties and values form a CSS rule', 'A selector and its properties form a CSS rule'],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What\'s wrong with this rule?',
        codeTitle: 'style.css',
        code: '.name {\n  color;\n}',
        options: ['The selector starts with a `.`', 'The `color` property doesn\'t have a value'],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Finish assembling this class selector.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <ul>\n    <li class="completed">Read chapter 1</li>\n    <li>Practice selectors</li>\n    <li class="completed">Submit homework</li>\n  </ul>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', '', ' ', '\n  text-decoration: line-through;\n', ''],
        blankAnswers: ['.', 'completed', '{', '}'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['}', '.', 'completed', '{'],
        expectedCode: ['.completed {\n  text-decoration: line-through;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 24px 28px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                ul {
                  margin: 0;
                  padding-left: 28px;
                  font-size: 1.05rem;
                  line-height: 1.8;
                }
                .completed {
                  text-decoration: line-through;
                }
              </style>
            </head>
            <body>
              <ul>
                <li class="completed">Read chapter 1</li>
                <li>Practice selectors</li>
                <li class="completed">Submit homework</li>
              </ul>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add a `class` attribute to the `li` element.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <ol>TO DO: <li ',
          '',
          '',
          '',
          '>Exercise</li>\n    <li>Groom dog</li>\n    <li class="redElement">Stretch</li>\n    <li>Tidy apartment</li>\n    <li class="redElement">Laundry</li>\n  </ol>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['.redElement {\n  background-color: red;\n}'],
        blankAnswers: ['class', '=', '"redElement"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['"redElement"', 'doctype', 'class', '='],
        expectedCode: ['<li class="redElement">Exercise</li>'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 24px 28px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                ol {
                  margin: 0;
                  padding-left: 30px;
                  font-size: 1.05rem;
                  line-height: 1.8;
                }
                .redElement {
                  background-color: red;
                }
              </style>
            </head>
            <body>
              <ol>
                <li class="redElement">Exercise</li>
                <li>Groom dog</li>
                <li class="redElement">Stretch</li>
                <li>Tidy apartment</li>
                <li class="redElement">Laundry</li>
              </ol>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Pick the class selector to apply the rule to all elements with their `class` attribute set to `"tealElement"`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h2 class="tealElement">Fine Italian Suits</h2>\n  <h2 class="tealElement">Artsy French Berets</h2>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' {\n  background-color: teal;\n}'],
        blankAnswers: ['.tealElement'],
        blankPlaceholders: [''],
        promptChips: ['tealElement', '.tealElement'],
        expectedCode: ['.tealElement {\n  background-color: teal;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h2 {
                  margin: 8px 0 28px;
                  font-size: 1.65rem;
                  font-weight: 700;
                  line-height: 1.2;
                }
                .tealElement {
                  background-color: teal;
                }
              </style>
            </head>
            <body>
              <h2 class="tealElement">Fine Italian Suits</h2>
              <h2 class="tealElement">Artsy French Berets</h2>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code `.name` to select the element with the class `"name"`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Welcome to my site</h1>\n  <p class="name">My name is Jimmy</p>\n  <p class="hobby">I love playing water polo</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' {\n  background-color: green;\n}'],
        blankAnswers: ['.name'],
        blankPlaceholders: [''],
        expectedCode: ['.name {\n  background-color: green;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 24px;
                  font-size: 1.65rem;
                  font-weight: 700;
                  line-height: 1.2;
                }
                p {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  line-height: 1.25;
                }
                .name {
                  background-color: green;
                }
              </style>
            </head>
            <body>
              <h1>Welcome to my site</h1>
              <p class="name">My name is Jimmy</p>
              <p class="hobby">I love playing water polo</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Code the selector to select the `h1` element using its class name.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1 class="title">Ed\'s Rubber Ducks</h1>\n  <h2>Best ducks around</h2>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' {\n  background-color: gold;\n}'],
        blankAnswers: ['.title'],
        blankPlaceholders: [''],
        expectedCode: ['.title {\n  background-color: gold;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 24px;
                  font-size: 1.65rem;
                  font-weight: 700;
                  line-height: 1.2;
                }
                h2 {
                  margin: 0;
                  font-size: 1.35rem;
                  font-weight: 700;
                  line-height: 1.2;
                }
                .title {
                  background-color: gold;
                }
              </style>
            </head>
            <body>
              <h1 class="title">Ed's Rubber Ducks</h1>
              <h2>Best ducks around</h2>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-4': {
    id: 'css-4',
    title: 'CSS Basics 1',
    xpReward: 75,
    content: [
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We\'ve seen how we can use HTML `tags` and CSS classes to change the styles of groups of elements.\n\nInclude the `button` tag selector to make all buttons `lightblue` and the `text` class selector to make the texts italic.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <head>\n  <link rel="stylesheet" href="style.css">\n </head>\n <body>\n  <h1>Find the Capital Letter</h1>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button>X</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <p class="text">Click on the correct button!</p>\n  <p class="text">Game on!</p>\n </body>\n</html>'
        ],
        secondaryTemplateParts: [
          '',
          ' {\n  background-color: lightblue;\n}\n\n',
          '',
          ' {\n  font-style: italic;\n}\n'
        ],
        blankAnswers: ['button', '.text'],
        blankPlaceholders: ['', ''],
        promptChips: ['.text', 'button'],
        expectedCode: ['button {\n  background-color: lightblue;\n}\n\n.text {\n  font-style: italic;\n}\n'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 26px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                button {
                  margin: 0 6px 18px 0;
                  border: 2px solid #444444;
                  background-color: lightblue;
                  padding: 2px 8px;
                  font-size: 1rem;
                  cursor: pointer;
                }
                .text {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  font-style: italic;
                  line-height: 1.25;
                }
              </style>
            </head>
            <body>
              <h1>Find the Capital Letter</h1>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button>X</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <p class="text">Click on the correct button!</p>
              <p class="text">Game on!</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'If we want to style a specific element, we can include an `id` selector. Here, we only want to select the button with the capital letter.\n\nFirst, we need to identify the element in the html. To set an ID attribute, type `id=""`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <head>\n  <link rel="stylesheet" href="style.css">\n </head>\n <body>\n  <h1>Find the Capital Letter</h1>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button ',
          '',
          '',
          '',
          '>X</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <p class="text">Click on the correct button!</p>\n  <p class="text">Game on!</p>\n </body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  background-color: lightblue;\n  font-weight: bold;\n}\n\n.text {\n  font-style: italic;\n}\n'
        ],
        blankAnswers: ['id', '=', '""'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['""', '=', 'id'],
        expectedCode: ['<button id="">X</button>'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 26px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                button {
                  margin: 0 6px 18px 0;
                  border: 2px solid #444444;
                  background-color: lightblue;
                  padding: 2px 8px;
                  font-size: 1rem;
                  font-weight: 700;
                }
                .text {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  font-style: italic;
                  line-height: 1.25;
                }
              </style>
            </head>
            <body>
              <h1>Find the Capital Letter</h1>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button id="">X</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <p class="text">Click on the correct button!</p>
              <p class="text">Game on!</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'After the `=` sign, set the value of the id, `"capital-letter"` in this case.\n\nID values should be `unique` within the HTML document. So, we must not include a second `id` attribute with the same value.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <head>\n  <link rel="stylesheet" href="style.css">\n </head>\n <body>\n  <h1>Find the Capital Letter</h1>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button id=',
          '',
          '>X</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <p class="text">Click on the correct button!</p>\n  <p class="text">Game on!</p>\n </body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  background-color: lightblue;\n  font-weight: bold;\n}\n\n.text {\n  font-style: italic;\n}\n'
        ],
        blankAnswers: ['"capital-letter"'],
        blankPlaceholders: [''],
        promptChips: ['"capital-letter"', 'id', '='],
        expectedCode: ['<button id="capital-letter">X</button>'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 26px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                button {
                  margin: 0 6px 18px 0;
                  border: 2px solid #444444;
                  background-color: lightblue;
                  padding: 2px 8px;
                  font-size: 1rem;
                  font-weight: 700;
                }
                .text {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  font-style: italic;
                  line-height: 1.25;
                }
              </style>
            </head>
            <body>
              <h1>Find the Capital Letter</h1>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button id="capital-letter">X</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <p class="text">Click on the correct button!</p>
              <p class="text">Game on!</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Now that we have included the `id` in the HTML element, we are ready to use the id selector for our styles.\n\nTo select the element by its id, we type `#` followed by the name of the id, like `capital-letter` here.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <head>\n  <link rel="stylesheet" href="style.css">\n </head>\n <body>\n  <h1>Find the Capital Letter</h1>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button id="capital-letter">X</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <p class="text">Click on the correct button!</p>\n  <p class="text">Game on!</p>\n </body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  background-color: lightblue;\n  font-weight: bold;\n}\n\n.text {\n  font-style: italic;\n}\n\n',
          '',
          '',
          ' {\n\n}\n'
        ],
        blankAnswers: ['#', 'capital-letter'],
        blankPlaceholders: ['', ''],
        promptChips: ['capital-letter', '#'],
        expectedCode: ['button {\n  background-color: lightblue;\n  font-weight: bold;\n}\n\n.text {\n  font-style: italic;\n}\n\n#capital-letter {\n\n}\n'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 26px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                button {
                  margin: 0 6px 18px 0;
                  border: 2px solid #444444;
                  background-color: lightblue;
                  padding: 2px 8px;
                  font-size: 1rem;
                  font-weight: 700;
                }
                .text {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  font-style: italic;
                  line-height: 1.25;
                }
                #capital-letter {
                }
              </style>
            </head>
            <body>
              <h1>Find the Capital Letter</h1>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button id="capital-letter">X</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <p class="text">Click on the correct button!</p>
              <p class="text">Game on!</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'IDs will help us with JavaScript and we shouldn\'t overuse them for styling. However, we can apply styles as usual with the `id` selector.\n\nInclude the full rule for the `#capital-letter` id.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <head>\n  <link rel="stylesheet" href="style.css">\n </head>\n <body>\n  <h1>Find the Capital Letter</h1>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button id="capital-letter">X</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <button>x</button>\n  <p class="text">Click on the correct button!</p>\n  <p class="text">Game on!</p>\n </body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  background-color: lightblue;\n  font-weight: bold;\n}\n\n.text {\n  font-style: italic;\n}\n\n',
          '\n',
          '\n',
          ''
        ],
        blankAnswers: ['#capital-letter {', 'color: blue;', '}'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['#capital-letter {', 'color: blue;', '}'],
        expectedCode: ['button {\n  background-color: lightblue;\n  font-weight: bold;\n}\n\n.text {\n  font-style: italic;\n}\n\n#capital-letter {\ncolor: blue;\n}\n'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 26px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                button {
                  margin: 0 6px 18px 0;
                  border: 2px solid #444444;
                  background-color: lightblue;
                  padding: 2px 8px;
                  font-size: 1rem;
                  font-weight: 700;
                }
                .text {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  font-style: italic;
                  line-height: 1.25;
                }
                #capital-letter {
                  color: blue;
                }
              </style>
            </head>
            <body>
              <h1>Find the Capital Letter</h1>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button id="capital-letter">X</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <button>x</button>
              <p class="text">Click on the correct button!</p>
              <p class="text">Game on!</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What are IDs for?',
        options: ['IDs style groups of elements', 'IDs identify HTML unique elements'],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How do we set an ID attribute in the html file?',
        options: ['By typing `id` between the opening and closing tags', 'By typing `id` in the opening tag'],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How do we use an ID selector in a stylesheet?',
        options: ['#id-name', '.id-name'],
        correctAnswer: 0,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'Why do we say IDs are unique?',
        options: ['Because two elements must not have the same ID', 'Because they group elements'],
        correctAnswer: 0,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the `id` for the heading element to `"title"`.',
        codeTitle: 'index.html',
        activeCodeTab: 'primary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <body>\n  <h1>Spring is coming!</h1>\n  <h2 ',
          '',
          '',
          '',
          '>Flowers</h2>\n  <p>Now is that time of the year when flowers blossom. Let\'s get all we need to have a beautiful garden ready.</p>\n </body>\n</html>'
        ],
        blankAnswers: ['id', '=', '"title"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['=', '"title"', 'id'],
        expectedCode: ['<h2 id="title">Flowers</h2>'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 18px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                h2 {
                  margin: 0 0 20px;
                  font-size: 1.35rem;
                  font-weight: 700;
                  line-height: 1.15;
                }
                p {
                  margin: 0;
                  font-size: 1rem;
                  line-height: 1.3;
                }
              </style>
            </head>
            <body>
              <h1>Spring is coming!</h1>
              <h2 id="title">Flowers</h2>
              <p>Now is that time of the year when flowers blossom. Let's get all we need to have a beautiful garden ready.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Style the element with ID `basketball` using an ID selector in the style sheet.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n <head>\n  <link rel="stylesheet" href="style.css">\n </head>\n <body>\n  <h1>My favorite sports</h1>\n  <p>Ice Hockey</p>\n  <p id="basketball">Basketball</p>\n  <p>Tennis</p>\n </body>\n</html>'
        ],
        secondaryTemplateParts: [
          '',
          ' {\n  font-weight: bold;\n  color: red;\n}\n'
        ],
        blankAnswers: ['#basketball'],
        blankPlaceholders: [''],
        promptChips: ['#basketball', '.basketball'],
        expectedCode: ['#basketball {\n  font-weight: bold;\n  color: red;\n}\n'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 18px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 24px;
                  font-size: 1.7rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                p {
                  margin: 0 0 14px;
                  font-size: 1rem;
                  line-height: 1.25;
                }
                #basketball {
                  margin: 0;
                  font-size: 1rem;
                  font-weight: 700;
                  color: red;
                  line-height: 1.25;
                }
              </style>
            </head>
            <body>
              <h1>My favorite sports</h1>
              <p>Ice Hockey</p>
              <p id="basketball">Basketball</p>
              <p>Tennis</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: "What's wrong with this code?",
        codeTitle: 'index.html',
        code: `<!doctype html>
<html>
<body>
  <h1>Party Time</h1>
  <h2 id="title">Guest List</h2>
  <p id="best-friend">George</p>
  <p id="best-friend">Ada</p>
  <p id="best-friend">Karim</p>
</body>
</html>`,
        previewTitle: 'Browser',
        options: ['`best-friend` should be in capital letters', 'Several elements have the same `id`'],
        correctAnswer: 1,
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 20px 14px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                h1 {
                  margin: 8px 0 20px;
                  font-size: 1.75rem;
                  font-weight: 700;
                  line-height: 1.1;
                }
                h2 {
                  margin: 0 0 22px;
                  font-size: 1.35rem;
                  font-weight: 700;
                  line-height: 1.15;
                }
                p {
                  margin: 0 0 18px;
                  font-size: 1rem;
                  line-height: 1.25;
                }
              </style>
            </head>
            <body>
              <h1>Party Time</h1>
              <h2 id="title">Guest List</h2>
              <p id="best-friend">George</p>
              <p id="best-friend">Ada</p>
              <p id="best-friend">Karim</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      }
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
