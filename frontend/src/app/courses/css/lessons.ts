import type { LessonDefinition } from '../../lessonTypes';

export const cssLessonContent: Record<string, LessonDefinition> = {
  'css-track-1': {
    id: 'css-track-1',
    title: 'Stylesheet Setup',
    xpReward: 45,
    content: [
      {
        type: 'browser-preview',
        data: 'CSS lives in a separate stylesheet file so we can keep our webpage structure and styling organized.',
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
                  padding: 24px 16px;
                  background: #f5f5f5;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #1f2937;
                }
                h1 {
                  margin: 0 0 16px;
                  font-size: 2.4rem;
                  color: #4338ca;
                }
                p {
                  margin: 0;
                  font-size: 1.1rem;
                  line-height: 1.5;
                }
              </style>
            </head>
            <body>
              <h1>Stylesheet setup</h1>
              <p>Linking a CSS file lets us style the whole page from one place.</p>
            </body>
          </html>
        `
      }
    ]
  },
  'css-track-2': {
    id: 'css-track-2',
    title: 'Basic CSS Rules',
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
        promptChips: ['body'],
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
        promptChips: ['background-color: blue;'],
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
        promptChips: ['color: white;'],
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
        blankPlaceholders: [''],
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
        promptChips: ['background-color: black;'],
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
  'css-track-3': {
    id: 'css-track-3',
    title: 'Class Selectors',
    xpReward: 45,
    content: [
      {
        type: 'browser-preview',
        data: 'Class selectors let us style groups of matching elements with the same class name.',
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
                  padding: 24px 16px;
                  background: #ffffff;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #0f172a;
                }
                .highlight {
                  color: #dc2626;
                  font-weight: 700;
                }
                p {
                  margin: 0 0 12px;
                  font-size: 1.2rem;
                }
              </style>
            </head>
            <body>
              <p class="highlight">Class selectors</p>
              <p>Use a dot before the class name in CSS.</p>
            </body>
          </html>
        `
      }
    ]
  },
  'css-track-4': {
    id: 'css-track-4',
    title: 'Selector Practice',
    xpReward: 75,
    content: [
      {
        type: 'browser-preview',
        data: 'Practice combines selectors and declarations so you can style the right elements with confidence.',
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
                  padding: 24px 16px;
                  background: #f8fafc;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #0f172a;
                }
                h1 {
                  margin: 0 0 14px;
                  font-size: 2.2rem;
                }
                .done {
                  color: #16a34a;
                  text-decoration: line-through;
                }
                p {
                  margin: 0 0 10px;
                  font-size: 1.1rem;
                }
              </style>
            </head>
            <body>
              <h1>Selector practice</h1>
              <p class="done">Pick the correct selector</p>
              <p>Then apply the rule.</p>
            </body>
          </html>
        `
      }
    ]
  },
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
        type: 'browser-preview',
        data: 'One of the most important parts of a website is the text. We can modify text in a lot of ways, from the size to the style or thickness.',
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
                  padding: 20px 12px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                .mono {
                  margin: 0 0 18px;
                  font-family: "Courier New", Courier, monospace;
                  font-size: 1.1rem;
                }
                .italic {
                  margin: 0 0 18px;
                  font-style: italic;
                  font-size: 1.1rem;
                }
                .bold {
                  margin: 0 0 18px;
                  font-weight: 700;
                  font-size: 1.1rem;
                }
                .bold-italic {
                  margin: 0 0 24px;
                  font-style: italic;
                  font-weight: 700;
                  font-size: 1.1rem;
                }
                .big {
                  margin: 0 0 20px;
                  font-size: 2rem;
                }
                .small {
                  margin: 0;
                  font-size: 0.75rem;
                }
              </style>
            </head>
            <body>
              <p class="mono">Courier New font</p>
              <p class="italic">Italic Text</p>
              <p class="bold">Bold text</p>
              <p class="bold-italic">Bold and italic text</p>
              <p class="big">Bigger text</p>
              <p class="small">Small text</p>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: "Let's start by creating a rule to change the appearance of our paragraphs.",
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['', ' ', '\n', ''],
        blankAnswers: ['p', '{', '}'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['p', '{', '}'],
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
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change how big text is, we use the `font-size` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  ', '', '', '\n}'],
        blankAnswers: ['font', '-', 'size'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['-', 'size', 'font'],
        expectedCode: ['p {\n  font-size\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 16px;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We measure elements on a webpage with "pixels". To specify a size, we add a number. Set the `font-size` of the `p` element to `60` pixels.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  font-size: ', ' px;\n}'],
        blankAnswers: ['60'],
        blankPlaceholders: [''],
        promptChips: ['60'],
        expectedCode: ['p {\n  font-size: 60 px;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 60px;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'After the number, we follow with the shorthand for pixels, `px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  font-size: 60 ', ';\n}'],
        blankAnswers: ['px'],
        blankPlaceholders: [''],
        promptChips: ['px'],
        expectedCode: ['p {\n  font-size: 60 px;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 60px;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To set the type of font for an element, start by adding the `font-family` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  font-size: 60px;\n  ', '', '', '\n}'],
        blankAnswers: ['font', '-', 'family'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['-', 'family', 'font'],
        expectedCode: ['p {\n  font-size: 60px;\n  font-family\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 60px;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'There are all kinds of possible values for `font-family`, from `Times New Roman` to `Helvetica`. Here, let\'s use `Courier New`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  font-size: 60px;\n  font-family: ', ';\n}'],
        blankAnswers: ['Courier New'],
        blankPlaceholders: [''],
        promptChips: ['Courier New', 'Arial'],
        expectedCode: ['p {\n  font-size: 60px;\n  font-family: Courier New;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 60px;
                  font-family: "Courier New", Courier, monospace;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To italicize the text of an element, we use the `font-style` property and set the value to `italic`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  font-size: 60px;\n  font-family: Courier New;\n  ',
          '',
          ' ',
          '',
          '\n}'
        ],
        blankAnswers: ['font-style', ':', 'italic', ';'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: [':', 'font-style', ';', 'italic'],
        expectedCode: ['p {\n  font-size: 60px;\n  font-family: Courier New;\n  font-style: italic;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 60px;
                  font-family: "Courier New", Courier, monospace;
                  font-style: italic;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To bold the text of an element, we use the `font-weight` property and set the value to `bold`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>Avatar</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  font-size: 60px;\n  font-family: Courier New;\n  font-style: italic;\n  ',
          '',
          ' ',
          '',
          '\n}'
        ],
        blankAnswers: ['font-weight', ':', 'bold', ';'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['bold', ':', 'font-weight', ';'],
        expectedCode: ['p {\n  font-size: 60px;\n  font-family: Courier New;\n  font-style: italic;\n  font-weight: bold;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 8px;
                  background: #ffffff;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  font-size: 60px;
                  font-family: "Courier New", Courier, monospace;
                  font-style: italic;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <p>Avatar</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How do we change the size of text on a webpage?',
        options: [
          'With the `font-size` property',
          'With the `font-family` property'
        ],
        correctAnswer: 0,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What is the shorthand for pixels?',
        options: [
          'pixels',
          'px'
        ],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the `font-weight` property of the `h1` element to `bold`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Cool Things To Own Survey</h1>\n  <p>A time machine</p>\n  <p>A hydraulic press</p>\n  <p>Doctor House\'s cane</p>\n  <br>\n  <p>Disclaimer: Disqualified items are shown in bold.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h1 {\n  ',
          ': ',
          ';\n}'
        ],
        blankAnswers: ['font-weight', 'bold'],
        blankPlaceholders: ['', ''],
        promptChips: ['font-style', 'font-weight', 'bold'],
        expectedCode: ['h1 {\n  font-weight: bold;\n}'],
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
                  background: white;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 24px;
                  font-weight: bold;
                  font-size: 3rem;
                  line-height: 1.05;
                }
                p {
                  margin: 0 0 24px;
                  font-size: 1.15rem;
                }
                p:last-of-type {
                  margin-top: 56px;
                  margin-bottom: 0;
                }
              </style>
            </head>
            <body>
              <h1>Cool Things To Own Survey</h1>
              <p>A time machine</p>
              <p>A hydraulic press</p>
              <p>Doctor House's cane</p>
              <p>Disclaimer: Disqualified items are shown in bold.</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the font size of the `p` element.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>News</h3>\n  <p>We are not alone!</p>\n  <p>- <em>Mexico</em></p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  ',
          '',
          '',
          ': ',
          ';\n}'
        ],
        blankAnswers: ['font', '-', 'size', '12px'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['12px', 'weight', 'size', '-', 'font'],
        expectedCode: ['p {\n  font-size: 12px;\n}'],
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
                  background: white;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                h3 {
                  margin: 0 0 24px;
                  font-size: 2rem;
                  font-weight: 700;
                }
                p {
                  margin: 0 0 18px;
                  font-size: 12px;
                }
                p:last-of-type {
                  font-style: italic;
                  margin-bottom: 0;
                }
              </style>
            </head>
            <body>
              <h3>News</h3>
              <p>We are not alone!</p>
              <p>- <em>Mexico</em></p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Complete the code to set the `font-family` property of the `p` element.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Blade Runner</h1>\n  <p>A film by Ridley Scott</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  ',
          ': ',
          ';\n}'
        ],
        blankAnswers: ['font-family', 'Helvetica'],
        blankPlaceholders: ['', ''],
        promptChips: ['font-family', 'font-style', 'Helvetica'],
        expectedCode: ['p {\n  font-family: Helvetica;\n}'],
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
                  background: white;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 24px;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-family: Helvetica, Arial, sans-serif;
                  font-size: 1.15rem;
                }
              </style>
            </head>
            <body>
              <h1>Blade Runner</h1>
              <p>A film by Ridley Scott</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the `font-style` property of the `p` element to `italic`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>More Short Stories</h1>\n  <p>Fontaine\'s new son</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  ',
          '\n}'
        ],
        blankAnswers: ['font-style: italic;'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['p {\n  font-style: italic;\n}'],
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
                  background: white;
                  color: #111111;
                  font-family: "Times New Roman", Times, serif;
                }
                h1 {
                  margin: 0 0 28px;
                  font-size: 3rem;
                  font-weight: 700;
                }
                p {
                  margin: 0;
                  font-size: 1.15rem;
                  font-style: italic;
                }
              </style>
            </head>
            <body>
              <h1>More Short Stories</h1>
              <p>Fontaine's new son</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-3': {
    id: 'css-3',
    title: 'Height and Width',
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
      {
        type: 'intro',
        illustration: 'padding-box-model',
        data: 'Elements on a webpage are rectangular boxes with four layers: content, padding, border, and margin.',
        secondaryText: 'In this lesson, you will learn how spacing and borders shape every element you build.',
        accentText: 'The Box Model.'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change the paddings on all four sides of an element, we use the `padding` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>How about you get more breathing room with Summerset apartments?</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['p {\n  ', ': 50px;\n  border: 1px solid black;\n  background-color: lavender;\n}'],
        blankAnswers: ['padding'],
        blankPlaceholders: [''],
        promptChips: ['padding', 'height'],
        expectedCode: ['p {\n  padding: 50px;\n  border: 1px solid black;\n  background-color: lavender;\n}'],
        solvedPreviewHtml: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <style>
                body {
                  margin: 0;
                  padding: 14px 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                }
                p {
                  margin: 0;
                  padding: 50px;
                  border: 1px solid black;
                  background-color: lavender;
                  color: #111111;
                  font-size: 1rem;
                  line-height: 1.3;
                }
              </style>
            </head>
            <body>
              <p>How about you get more breathing room with Summerset apartments?</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change the padding on the left side of an element, we use the `padding-left` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>The terms "left-wing" and "right-wing" were coined during the French Revolution of 1789. When drafting a new constitution:</p>\n  <p class="leftWing">People who were more conservative assembled on the right side of the assembly hall, leading to the term "right-wing".</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: ['.leftWing {\n  ', ': 200px;\n  background-color: crimson;\n}'],
        blankAnswers: ['padding-left'],
        blankPlaceholders: [''],
        promptChips: ['padding-left', 'padding'],
        expectedCode: ['.leftWing {\n  padding-left: 200px;\n  background-color: crimson;\n}'],
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
                  padding: 12px;
                  background: white;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                p {
                  margin: 0 0 10px;
                  font-size: 1rem;
                  line-height: 1.2;
                }
                .leftWing {
                  margin-bottom: 0;
                  padding-left: 200px;
                  background-color: crimson;
                  color: black;
                }
              </style>
            </head>
            <body>
              <p>The terms "left-wing" and "right-wing" were coined during the French Revolution of 1789. When drafting a new constitution:</p>
              <p class="leftWing">People who were more conservative assembled on the right side of the assembly hall, leading to the term "right-wing".</p>
            </body>
          </html>
        `,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change the padding on the right side of an element, we use the `padding-right` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>The terms "left-wing" and "right-wing" were coined during the French Revolution of 1789. When drafting a new constitution:</p>\n  <p class="leftWing">People who were more liberal assembled on the left side of the assembly hall, leading to the term "left-wing".</p>\n  <p class="rightWing">People who were more conservative assembled on the right side of the assembly hall, leading to the term "right-wing".</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          '.leftWing {\n  ',
          ': 200px;\n  background-color: crimson;\n}\n\n.rightWing {\n  padding-left: 200px;\n  background-color: lightBlue;\n}'
        ],
        blankAnswers: ['padding-right'],
        blankPlaceholders: [''],
        promptChips: ['padding-right', 'padding-left'],
        expectedCode: ['.leftWing {\n  padding-right: 200px;\n  background-color: crimson;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change the padding at the top of an element, we use the `padding-top` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Online Physics 101</h3>\n  <p class="lightObjects">Objects lighter than water float to the top</p>\n  <p class="heavyObjects">Objects heavier than water sink to the bottom</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          '.lightObjects {\n  ',
          '',
          '',
          ': 20px;\n}\n\n.heavyObjects {\n  padding-top: 60px;\n  padding-bottom: 20px;\n}\n\np {\n  background-color: lightBlue;\n}'
        ],
        blankAnswers: ['padding', '-', 'top'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['padding', 'top', '-'],
        expectedCode: ['.lightObjects {\n  padding-top: 20px;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change the padding at the bottom of an element, we use the `padding-bottom` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Online Physics 101</h3>\n  <p class="lightObjects">Objects lighter than water float to the top</p>\n  <p class="heavyObjects">Objects heavier than water sink to the bottom</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          '.lightObjects {\n  padding-top: 20px;\n  ',
          ': 60px;\n}\n\n.heavyObjects {\n  padding-top: 60px;\n  padding-bottom: 20px;\n}\n\np {\n  background-color: lightBlue;\n}'
        ],
        blankAnswers: ['padding-bottom'],
        blankPlaceholders: [''],
        promptChips: ['padding-top', 'padding-bottom'],
        expectedCode: ['.lightObjects {\n  padding-top: 20px;\n  padding-bottom: 60px;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To change the alignment of the content, we use the `text-align` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1 class="center">Welcome!</h1>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          '.center {\n  ',
          ': center;\n  border-radius: 100px;\n  background-color: lightBlue;\n}'
        ],
        blankAnswers: ['text-align'],
        blankPlaceholders: [''],
        promptChips: ['padding', 'text-align'],
        expectedCode: ['.center {\n  text-align: center;\n  border-radius: 100px;\n  background-color: lightBlue;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To center-align content, we set the `text-align` property to `center`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1 class="center">Welcome!</h1>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          '.center {\n  text-align: ',
          ';\n  border-radius: 100px;\n  background-color: lightBlue;\n}'
        ],
        blankAnswers: ['center'],
        blankPlaceholders: [''],
        promptChips: ['left', 'center'],
        expectedCode: ['.center {\n  text-align: center;\n  border-radius: 100px;\n  background-color: lightBlue;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What are paddings?',
        options: [
          'The space between the content and the border of an element',
          'The border of an element'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: "What's the `padding-left` property for?",
        options: [
          'It adds space on the left side of an element',
          'It adds space at the top of an element'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'Which of these changes the padding at the top of an element?',
        options: [
          'padding-top',
          'padding-bottom'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: "What's the `text-align` property for?",
        options: [
          'It changes the alignment of the content of an element',
          'It changes the padding at the top and bottom of an element'
        ],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the `padding` property to `30px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h2>Kluane National Park, Canada</h2>\n  <img src="https://mimo.app/r/kluane.png">\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  ',
          '',
          ' ',
          ';\n  border: solid;\n}'
        ],
        blankAnswers: ['padding', ':', '30px'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['border', '30px', 'padding', ':'],
        expectedCode: ['img {\n  padding: 30px;\n  border: solid;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Change the padding on the left side of all `h1` elements.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Snapcat</h1>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h1 {\n  ',
          '',
          ' ',
          ';\n}'
        ],
        blankAnswers: ['padding-left', ':', '50px'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['50px', 'padding-left', 'padding-right', ':'],
        expectedCode: ['h1 {\n  padding-left: 50px;\n}'],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Change the padding at the top of all `h1` elements by typing `padding-top`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The New Coder Journal</h1>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h1 {\n  ',
          ': 20px;\n  padding-left: 10px;\n  border: solid;\n  text-align: center;\n}'
        ],
        blankAnswers: ['padding-top'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: [
          'h1 {\n  padding-top: 20px;\n  padding-left: 10px;\n  border: solid;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Align the content of elements of class `center` by typing `text-align: center;`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1 class="center">Journey to the Center of the Earth</h1>\n  <p class="center">Looking back to all that has occurred to me since that eventful day, I am scarcely able to believe in the reality of my adventures. They were truly so wonderful that even now I am bewildered when I think of them.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          '.center {\n  ',
          '\n}'
        ],
        blankAnswers: ['text-align: center;'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: [
          '.center {\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-6': {
    id: 'css-6',
    title: 'Adding Padding with One Line',
    xpReward: 50,
    content: [
      {
        type: 'intro',
        illustration: 'padding-clockwise',
        data: 'Any element has four paddings counted clockwise from top to right, to bottom, to left.',
        secondaryText: 'In this lesson, you will learn how one padding value can affect all four sides at once.',
        accentText: 'Clockwise Padding.'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: "So far we've learned to set the padding for each side of an element one at a time.",
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mike\'s balloons</h1>\n  <img src="https://mimo.app/i/balloons.png">\n  <br>\n  <button>Buy normal balloon</button>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  padding-top: ',
          ';\n  padding-right: ',
          ';\n  padding-bottom: ',
          ';\n  padding-left: ',
          ';\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        blankAnswers: ['20px', '20px', '20px', '20px'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['20px', '20px', '20px', '20px'],
        expectedCode: [
          'img {\n  padding-top: 20px;\n  padding-right: 20px;\n  padding-bottom: 20px;\n  padding-left: 20px;\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can set each padding value in one line using the `padding` property and a pixel value for each side.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mike\'s balloons</h1>\n  <img src="https://mimo.app/i/balloons.png">\n  <br>\n  <button>Buy normal balloon</button>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  ',
          ': ',
          ' ',
          ' ',
          ' ',
          ';\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        blankAnswers: ['padding', '20px', '20px', '20px', '20px'],
        blankPlaceholders: ['', '', '', '', ''],
        promptChips: ['margin', '20px', '20', '20px', 'padding', '20px', '10', '20px'],
        expectedCode: [
          'img {\n  padding: 20px 20px 20px 20px;\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To position the content lower inside an element, add a top padding by setting the first value to `100px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mike\'s balloons</h1>\n  <img src="https://getmimo.com/r/balloons.png">\n  <br>\n  <button>Buy Sulfur Hexafluoride Balloons</button>\n  <p>Heavier than air and great for making your voice deeper. You\'ll always find them close to the ground!</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  padding: ',
          ' 0px 0px 0px;\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        blankAnswers: ['100px'],
        blankPlaceholders: [''],
        promptChips: ['padding-top', '100', '100px'],
        expectedCode: [
          'img {\n  padding: 100px 0px 0px 0px;\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To set the right padding to something like `40px`, we change the second value. To set the left padding to `100px`, we change the fourth value.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mike\'s balloons</h1>\n  <img src="https://getmimo.com/r/balloons.png">\n  <br>\n  <button>Buy Perfectly Balanced Helium Balloons</button>\n  <p>They don\'t float away and can only go sideways!</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  padding: 0px ',
          ' 0px ',
          ';\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        blankAnswers: ['40px', '100px'],
        blankPlaceholders: ['', ''],
        promptChips: ['100', '100px', '30', '40px'],
        expectedCode: [
          'img {\n  padding: 0px 40px 0px 100px;\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: "When we don't want to add padding to one side, we can add `0` and leave out `px` since it's optional.",
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Mike\'s balloons</h1>\n  <img src="https://getmimo.com/r/balloons.png">\n  <br>\n  <button>Buy Helium Balloons</button>\n  <p>The classic balloon for any party!</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  padding: ',
          ' ',
          ' 100px ',
          ';\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        blankAnswers: ['0', '0', '0'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['0', '0', '0'],
        expectedCode: [
          'img {\n  padding: 0 0 100px 0;\n  border: solid 2px gray;\n  width: 100px;\n  height: 100px;\n  background-color: white;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How do we set values for the `padding` shorthand?',
        options: [
          'Clockwise, from top, to right, to bottom, to left',
          'Counterclockwise, from top, to left, to bottom, to right'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'Which value sets the top padding in this code?',
        codeTitle: 'style.css',
        code: 'p {\n  padding: 20px 15px 40px 15px;\n}',
        options: [
          'The third value, `40px`',
          'The first value, `20px`'
        ],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Which paddings are greater than `0`?',
        codeTitle: 'style.css',
        code: 'button {\n  padding: 0 20px 0 15px;\n}',
        options: [
          'The right and left paddings',
          'The left and bottom paddings'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What does the third value of `padding` do?',
        codeTitle: 'style.css',
        code: 'button {\n  padding: 10px 20px 40px 15px;\n}',
        options: [
          'It sets the bottom padding',
          'It sets the right padding'
        ],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What happens when we set a padding to `0` with the shorthand and leave out `px`?',
        options: [
          "It's OK, `px` is optional when the value is `0`",
          "The code doesn't work"
        ],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the property used to set the padding for the `h3` element.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Slackline Tips <br>________________</h3>\n  <p>Tip 1: keep your arms level with your head.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h3 {\n  ',
          ': 0 0 0 0;\n  background-color: deepSkyBlue;\n}\n\nbody {\n  text-align: center;\n}'
        ],
        blankAnswers: ['padding'],
        blankPlaceholders: [''],
        promptChips: ['padding'],
        expectedCode: [
          'h3 {\n  padding: 0 0 0 0;\n  background-color: deepSkyBlue;\n}\n\nbody {\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the first value to set the top padding to `50px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Slackline Tips <br>________________</h3>\n  <p>Tip 1: keep your arms level with your head.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h3 {\n  padding: ',
          ' 0 0 0;\n  background-color: deepSkyBlue;\n}\n\nbody {\n  text-align: center;\n}'
        ],
        blankAnswers: ['50px'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: [
          'h3 {\n  padding: 50px 0 0 0;\n  background-color: deepSkyBlue;\n}\n\nbody {\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the right and left padding to `75px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Clothes Size Guide</h1>\n  <h2>Waist Sizes</h2>\n  <h3>XXL 38"</h3>\n  <h4>L 34"</h4>\n  <h5>S 30.75"</h5>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h3 {\n  padding: ',
          ' ',
          ' ',
          ' ',
          ';\n  background-color: SkyBlue;\n  width: 100px;\n}\n\nh4 {\n  padding: 0 50px 0 50px;\n  background-color: lightSkyBlue;\n  width: 100px;\n}\n\nh5 {\n  padding: 0 25px 0 25px;\n  background-color: lightBlue;\n  width: 100px;\n}\n\nbody {\n  text-align: center;\n}'
        ],
        blankAnswers: ['0', '75px', '0', '75px'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: [],
        expectedCode: [
          'h3 {\n  padding: 0 75px 0 75px;\n  background-color: SkyBlue;\n  width: 100px;\n}\n\nh4 {\n  padding: 0 50px 0 50px;\n  background-color: lightSkyBlue;\n  width: 100px;\n}\n\nh5 {\n  padding: 0 25px 0 25px;\n  background-color: lightBlue;\n  width: 100px;\n}\n\nbody {\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the top padding to `25px`, the right padding to `50px`, the bottom padding to `25px`, and the left padding to `0`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Theather Ticket: <br>Validate on the right side </h3>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'h3 {\n  padding: ',
          ' ',
          ' ',
          ' ',
          ';\n  font-style: italic;\n  background-color: lightGray;\n  width: 300px;\n}'
        ],
        blankAnswers: ['25px', '50px', '25px', '0'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['25px', '0', '50px', '25px'],
        expectedCode: [
          'h3 {\n  padding: 25px 50px 25px 0;\n  font-style: italic;\n  background-color: lightGray;\n  width: 300px;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-7': {
    id: 'css-7',
    title: 'Styling Corners with One Line',
    xpReward: 50,
    content: [
      {
        type: 'browser-preview',
        data: 'Shorthands work with the `margin` and `border-radius` properties, making it possible to create interesting styles with fewer lines of code.',
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
                  min-height: 100vh;
                  padding: 28px 18px;
                  background: #e8f4f6;
                  font-family: "Times New Roman", Times, serif;
                  color: #111111;
                }
                .frame {
                  max-width: 620px;
                  margin: 0 auto;
                }
                h1 {
                  margin: 0 0 28px;
                  text-align: center;
                  font-size: 3rem;
                  line-height: 1.1;
                  font-weight: 700;
                }
                .gallery {
                  display: flex;
                  justify-content: center;
                  gap: 18px;
                }
                .gallery img {
                  width: 110px;
                  height: 110px;
                  object-fit: cover;
                  background: white;
                }
                .round-left {
                  border-radius: 30px 0 30px 30px;
                }
                .diamond {
                  border-radius: 40px 40px 0 40px;
                }
                .round-right {
                  border-radius: 0 30px 30px 30px;
                }
              </style>
            </head>
            <body>
              <div class="frame">
                <h1>Holiday Options</h1>
                <div class="gallery">
                  <img
                    class="round-left"
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=220&q=80"
                    alt="Coastline"
                  />
                  <img
                    class="diamond"
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=220&q=80"
                    alt="Forest"
                  />
                  <img
                    class="round-right"
                    src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=220&q=80"
                    alt="Beach"
                  />
                </div>
              </div>
            </body>
          </html>
        `
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To set the right and left margins to `15px` in one line, we can use the `margin` shorthand.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Command center</h3>\n  <button>Launch all missiles</button>\n  <button>Latte macchiato</button>\n  <p>TotallyNotABadDesign Incorporated</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  ',
          ': 0 ',
          ' 0 ',
          ';\n  width: 100px;\n  height: 100px;\n  border-radius: 15px;\n  background-color: red;\n  border: solid 5px dimGray;\n}\n\nbody {\n  text-align: center;\n}\n\np {\n  margin: 30px 0 0 0;\n  font-size: 8px;\n}'
        ],
        blankAnswers: ['margin', '15px', '15px'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['15', 'margin', '15px', '15px', '15'],
        expectedCode: [
          'button {\n  margin: 0 15px 0 15px;\n  width: 100px;\n  height: 100px;\n  border-radius: 15px;\n  background-color: red;\n  border: solid 5px dimGray;\n}\n\nbody {\n  text-align: center;\n}\n\np {\n  margin: 30px 0 0 0;\n  font-size: 8px;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To add top and bottom margins, we set the first and third value to `40px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Command center</h3>\n  <button>Launch all missiles</button>\n  <button>Latte macchiato</button>\n  <p>TotallyNotABadDesign Incorporated</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  margin: ',
          ' 15px ',
          ' 15px;\n  width: 100px;\n  height: 100px;\n  border-radius: 15px;\n  background-color: red;\n  border: solid 5px dimGray;\n}\n\nbody {\n  text-align: center;\n}\n\np {\n  margin: 30px 0 0 0;\n  font-size: 8px;\n}'
        ],
        blankAnswers: ['40px', '40px'],
        blankPlaceholders: ['', ''],
        promptChips: ['40px', '40px'],
        expectedCode: [
          'button {\n  margin: 40px 15px 40px 15px;\n  width: 100px;\n  height: 100px;\n  border-radius: 15px;\n  background-color: red;\n  border: solid 5px dimGray;\n}\n\nbody {\n  text-align: center;\n}\n\np {\n  margin: 30px 0 0 0;\n  font-size: 8px;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'The `border-radius` property with four values rounds the corners in a clockwise direction starting from the top-left.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>The future of paper - An internet rant</h3>\n  <p>Why does paper in Sci-Fi shows never have any corners?</p>\n  <img src="https://mimo.app/r/paper.png">\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  ',
          ': ',
          ' ',
          ' ',
          ' ',
          ';\n  width: 250px;\n  height: 300px;\n}'
        ],
        blankAnswers: ['border-radius', '30px', '30px', '30px', '30px'],
        blankPlaceholders: ['', '', '', '', ''],
        promptChips: ['30px', '30px', '30px', '30px', 'border-radius'],
        expectedCode: [
          'img {\n  border-radius: 30px 30px 30px 30px;\n  width: 250px;\n  height: 300px;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can round just the top-left corner by changing the first value to `50px` and leaving the rest as `0`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>The future of paper - An internet rant in 2030</h3>\n  <p>How come so many low budget Sci-Fi TV shows have pieces of paper with only one corner rounded off?</p>\n  <img src="https://mimo.app/r/paper.png">\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  border-radius: ',
          ' ',
          ' ',
          ' ',
          ';\n  width: 250px;\n}'
        ],
        blankAnswers: ['50px', '0', '0', '0'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['50px', '0', '0', '0'],
        expectedCode: [
          'img {\n  border-radius: 50px 0 0 0;\n  width: 250px;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To take `border-radius` to the extreme, we can set a corner to the same value as the height or width, like `100px` in this case.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Geometry Visual Aids</h3>\n  <p>Quarter of a circle</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  border-radius: 0 0 0 ',
          ';\n  width: 100px;\n  height: 100px;\n  background-color: lightBlue;\n  text-align: center;\n}\n\nbody {\n  background-color: azure;\n}'
        ],
        blankAnswers: ['100px'],
        blankPlaceholders: [''],
        promptChips: ['100', '100px', '50px'],
        expectedCode: [
          'p {\n  border-radius: 0 0 0 100px;\n  width: 100px;\n  height: 100px;\n  background-color: lightBlue;\n  text-align: center;\n}\n\nbody {\n  background-color: azure;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can use `border-radius` to give images a unique touch by doing things like rounding the top-right and bottom-left corners to `20px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Holiday Options</h3>\n  <img src="https://mimo.app/r/lighthouse.png">\n  <img src="https://mimo.app/r/trees.png">\n  <img src="https://mimo.app/r/beach.png">\n</body>\n<p>Try one of our holiday options, from romantic Spanish seaside villages, to weekend camping trips.</p>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  border-radius: 0 ',
          ' 0 ',
          ';\n  width: 75px;\n  height: 75px;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        blankAnswers: ['20px', '20px'],
        blankPlaceholders: ['', ''],
        promptChips: ['20px', '20px'],
        expectedCode: [
          'img {\n  border-radius: 0 20px 0 20px;\n  width: 75px;\n  height: 75px;\n}\n\nbody {\n  background-color: azure;\n  text-align: center;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What is the order of values for the `margin` shorthand?',
        options: [
          'Top, right, left, bottom',
          'Top, right, bottom, left'
        ],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: "What's wrong with this code?",
        codeTitle: 'style.css',
        code: 'button {\n  margin: 40px 25px 40px 25px 10px;\n}',
        options: [
          '`px` doesn\'t need to be added',
          'It has five values instead of four'
        ],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What is the order of values for the `border-radius` property?',
        options: [
          'Bottom-right, bottom-left, top-left, top-right',
          'Top-left, top-right, bottom-right, bottom-left'
        ],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What happens when we set `border-radius` to these values?',
        codeTitle: 'style.css',
        code: 'img {\n  border-radius: 0 20px 0 0;\n}',
        options: [
          'Images have a rounded top-right corner',
          'Buttons have a rounded top-right corner'
        ],
        correctAnswer: 0,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What happens when we set `border-radius` to these values?',
        codeTitle: 'style.css',
        code: 'p {\n  border-radius: 0 0 100px 0;\n  width: 100px;\n  height: 100px;\n}',
        options: [
          'Image elements have rounded corners',
          'Paragraph elements have a rounded bottom-right corner'
        ],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: "What's wrong with this code?",
        codeTitle: 'style.css',
        code: 'img {\n  border-radius: 50px; 0; 50px; 0;\n  width: 100px;\n  height: 100px;\n}',
        options: [
          '`0` doesn\'t have `px` after it',
          "There's a semicolon after each value"
        ],
        correctAnswer: 1,
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the top margin to `20px`, the right margin to `20px`, and the rest to `0`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Calculator</h1>\n  <button>7</button>\n  <button>8</button>\n  <button>9</button>\n  <br>\n  <button>4</button>\n  <button>5</button>\n  <button>6</button>\n  <br>\n  <button>1</button>\n  <button>2</button>\n  <button>3</button>\n  <br>\n  <button>0</button>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  margin: ',
          ';\n  border-radius: 20px;\n  height: 60px;\n  width: 60px;\n  font-size: 18px;\n  background-color: aliceblue;\n}\n\nbody {\n  background-color: skyblue;\n}'
        ],
        blankAnswers: ['20px 20px 0 0'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: [
          'button {\n  margin: 20px 20px 0 0;\n  border-radius: 20px;\n  height: 60px;\n  width: 60px;\n  font-size: 18px;\n  background-color: aliceblue;\n}\n\nbody {\n  background-color: skyblue;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the top margin to `20px` and the left margin to `20px`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p>FREE Delivery by Tomorrow</p>\n  <button>Buy Now</button>\n  <br>\n  <button>Add to Basket</button>\n  <p>Dispatched from and sold by Zbay.</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'button {\n  margin: ',
          ' 0 0 ',
          ';\n  padding: 20px;\n  width: 200px;\n  font-weight: bold;\n  background-color: gold;\n}'
        ],
        blankAnswers: ['20px', '20px'],
        blankPlaceholders: ['', ''],
        promptChips: ['20px', '20px'],
        expectedCode: [
          'button {\n  margin: 20px 0 0 20px;\n  padding: 20px;\n  width: 200px;\n  font-weight: bold;\n  background-color: gold;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set `border-radius` for the top-right and bottom-right corners to the same value as the `height` property.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Bullet Train</h1>\n  <img src="https://mimo.app/i/bullettrain.png">\n  <p>Top Speed: 200 mph</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'img {\n  border-radius: 0 ',
          ' ',
          ' 0;\n  width: 250px;\n  height: 150px;\n}\n\nbody {\n  background-color: skyBlue;\n}'
        ],
        blankAnswers: ['150px', '150px'],
        blankPlaceholders: ['', ''],
        promptChips: ['150px', '250px', '150px', '250px'],
        expectedCode: [
          'img {\n  border-radius: 0 150px 150px 0;\n  width: 250px;\n  height: 150px;\n}\n\nbody {\n  background-color: skyBlue;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Set the top-right corner and the bottom-left corner to `100px`, and the other corners to `0`.',
        codeTitle: 'index.html',
        secondaryCodeTitle: 'style.css',
        activeCodeTab: 'secondary',
        previewTitle: 'Browser',
        primaryTemplateParts: [
          '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Bojack Horseman Quotes</h3>\n  <p>"Nobody ever wants honeydew, but it\'s always there!"</p>\n</body>\n</html>'
        ],
        secondaryTemplateParts: [
          'p {\n  border-radius: ',
          ' ',
          ' ',
          ' ',
          ';\n  padding: 40px;\n  width: 150px;\n  background-color: honeyDew;\n  text-align: center;\n}\n\nbody {\n  background-color: lightblue;\n}'
        ],
        blankAnswers: ['0', '100px', '0', '100px'],
        blankPlaceholders: ['', '', '', ''],
        promptChips: ['100px', '0', '0', '100px'],
        expectedCode: [
          'p {\n  border-radius: 0 100px 0 100px;\n  padding: 40px;\n  width: 150px;\n  background-color: honeyDew;\n  text-align: center;\n}\n\nbody {\n  background-color: lightblue;\n}'
        ],
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'css-8': {
    id: 'css-8',
    title: 'CSS Basics 2',
    xpReward: 80,
    content: [
      { type: 'text', data: 'Practice lesson: CSS Basics 2.' }
    ]
  },
  'css-9': {
    id: 'css-9',
    title: 'Styling Groups of Elements',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Styling Groups of Elements.' }
    ]
  },
  'css-10': {
    id: 'css-10',
    title: 'Discovering Child Elements',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Discovering Child Elements.' }
    ]
  },
  'css-11': {
    id: 'css-11',
    title: 'Using Classes for Layouts',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Using Classes for Layouts.' }
    ]
  },
  'css-12': {
    id: 'css-12',
    title: 'CSS Intermediate 1',
    xpReward: 85,
    content: [
      { type: 'text', data: 'Practice lesson: CSS Intermediate 1.' }
    ]
  },
  'css-13': {
    id: 'css-13',
    title: 'Adding Color with Hex Values',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Adding Color with Hex Values.' }
    ]
  },
  'css-14': {
    id: 'css-14',
    title: 'Setting Size with Percentages',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Setting Size with Percentages.' }
    ]
  },
  'css-15': {
    id: 'css-15',
    title: 'Combining Multiple Classes',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Combining Multiple Classes.' }
    ]
  },
  'css-16': {
    id: 'css-16',
    title: 'Grouping Selectors',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Grouping Selectors.' }
    ]
  },
  'css-17': {
    id: 'css-17',
    title: 'CSS Intermediate 2',
    xpReward: 85,
    content: [
      { type: 'text', data: 'Practice lesson: CSS Intermediate 2.' }
    ]
  },
  'css-18': {
    id: 'css-18',
    title: 'Displaying Elements',
    xpReward: 60,
    content: [
      { type: 'text', data: 'Lesson placeholder: Displaying Elements.' }
    ]
  }
};

cssLessonContent['css-track-1'].content = cssLessonContent['css-1'].content;
cssLessonContent['css-track-3'].content = cssLessonContent['css-3'].content;
cssLessonContent['css-track-4'].content = cssLessonContent['css-4'].content;
cssLessonContent['css-track-5'] = {
  ...cssLessonContent['css-3'],
  id: 'css-track-5',
  title: 'Height and Width',
  content: [
    {
      type: 'browser-preview',
      data: 'Class selectors help you target only the elements you choose, so repeated items can share one style.',
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
                min-height: 100vh;
                padding: 28px 18px;
                background:
                  radial-gradient(circle at top left, #ffe39a 0, rgba(255, 227, 154, 0.55) 16%, transparent 36%),
                  radial-gradient(circle at bottom right, #9fd5ff 0, rgba(159, 213, 255, 0.5) 18%, transparent 34%),
                  linear-gradient(180deg, #f5f0ff 0%, #eef4ff 100%);
                font-family: Arial, Helvetica, sans-serif;
                color: #1f2a4d;
              }
              .frame {
                max-width: 520px;
                margin: 0 auto;
                padding: 26px 24px 28px;
                border-radius: 28px;
                background: rgba(255, 255, 255, 0.82);
                box-shadow: 0 20px 50px rgba(69, 76, 139, 0.18);
                backdrop-filter: blur(8px);
              }
              .eyebrow {
                display: inline-block;
                margin: 0 0 14px;
                padding: 8px 14px;
                border-radius: 999px;
                background: #e9e7ff;
                color: #5c4fc4;
                font-size: 0.76rem;
                font-weight: 800;
                letter-spacing: 0.08em;
                text-transform: uppercase;
              }
              h1 {
                margin: 0;
                font-size: 2.45rem;
                line-height: 1;
                color: #454c8b;
              }
              .lead {
                margin: 14px 0 22px;
                font-size: 1.02rem;
                line-height: 1.5;
                color: #334155;
              }
              .cards {
                display: grid;
                gap: 14px;
              }
              .card {
                padding: 16px 18px;
                border-radius: 20px;
                color: white;
                box-shadow: 0 14px 30px rgba(69, 76, 139, 0.16);
              }
              .card-title {
                margin: 0 0 6px;
                font-size: 0.82rem;
                font-weight: 800;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                opacity: 0.92;
              }
              .card-text {
                margin: 0;
                font-size: 1.1rem;
                font-weight: 700;
                line-height: 1.35;
              }
              .highlight {
                display: inline-block;
                margin-top: 18px;
                padding: 10px 14px;
                border-radius: 16px;
                background: #fff7d6;
                color: #a16207;
                font-weight: 800;
              }
              .pink {
                background: linear-gradient(135deg, #ff7eb6, #ff5f6d);
              }
              .blue {
                background: linear-gradient(135deg, #4f8cff, #6d5efc);
              }
              .mint {
                background: linear-gradient(135deg, #20c997, #12b886);
              }
              .footer {
                margin: 18px 0 0;
                font-size: 0.98rem;
                color: #475569;
              }
            </style>
          </head>
          <body>
            <div class="frame">
              <p class="eyebrow">CSS Track 5</p>
              <h1>Class Selectors</h1>
              <p class="lead">Use one shared class name to style matching pieces across the page without changing every element one by one.</p>

              <div class="cards">
                <div class="card pink">
                  <p class="card-title">HTML</p>
                  <p class="card-text">Add <code>class="featured"</code> to the items you want to group.</p>
                </div>

                <div class="card blue">
                  <p class="card-title">CSS</p>
                  <p class="card-text">Start the selector with a dot, like <code>.featured</code>.</p>
                </div>

                <div class="card mint">
                  <p class="card-title">Result</p>
                  <p class="card-text">Every matching element gets the same style instantly.</p>
                </div>
              </div>

              <p class="highlight">One class. Many elements. Consistent style.</p>
              <p class="footer">Class selectors are perfect for badges, cards, buttons, and repeated highlights.</p>
            </div>
          </body>
        </html>
      `
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'To change the height of an element, we use the `height` property.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>One theory of the Earth</h3>\n  <img src="https://mimo.app/r/earth.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['img {\n  ', ': 100px;\n}'],
      blankAnswers: ['height'],
      blankPlaceholders: [''],
      promptChips: ['width', 'height'],
      expectedCode: ['img {\n  height: 100px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h3 {
                margin: 8px 0 18px;
                font-size: 1.1rem;
                font-weight: 700;
              }
              img {
                height: 100px;
              }
            </style>
          </head>
          <body>
            <h3>One theory of the Earth</h3>
            <img src="https://mimo.app/r/earth.png" alt="Earth illustration" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'To change the width of an element, we use the `width` property.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>One theory of the Earth</h3>\n  <img src="https://mimo.app/r/earth.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['img {\n  ', ': 150px;\n}'],
      blankAnswers: ['width'],
      blankPlaceholders: [''],
      promptChips: ['width', 'height'],
      expectedCode: ['img {\n  width: 150px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h3 {
                margin: 8px 0 18px;
                font-size: 1.1rem;
                font-weight: 700;
              }
              img {
                width: 150px;
              }
            </style>
          </head>
          <body>
            <h3>One theory of the Earth</h3>
            <img src="https://mimo.app/r/earth.png" alt="Earth illustration" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We measure the height and width of an element in pixels, like `50px`. Pixels are tiny points that make up what you see on a screen.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Two different theories</h3>\n  <img class="round" src="https://mimo.app/r/earth.png">\n  <img class="flat" src="https://mimo.app/r/earth.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.flat {\n  height: ', ';\n  width: 100px;\n}\n\n.round {\n  height: 100px;\n  width: 100px;\n}'],
      blankAnswers: ['50px'],
      blankPlaceholders: [''],
      promptChips: ['50', '50px'],
      expectedCode: ['.flat {\n  height: 50px;\n  width: 100px;\n}\n\n.round {\n  height: 100px;\n  width: 100px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h3 {
                margin: 8px 0 18px;
                font-size: 1.1rem;
                font-weight: 700;
              }
              .flat {
                height: 50px;
                width: 100px;
              }
              .round {
                height: 100px;
                width: 100px;
              }
              img {
                margin-right: 8px;
                vertical-align: top;
              }
            </style>
          </head>
          <body>
            <h3>Two different theories</h3>
            <img class="round" src="https://mimo.app/r/earth.png" alt="Round earth" />
            <img class="flat" src="https://mimo.app/r/earth.png" alt="Flat earth" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can change the height and width of any element on a webpage.\n\nSet the width of the second paragraph to `150px`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>City Population Comparison</h1>\n  <h3>The following are approximate values</h3>\n  <p class="medium">Pittsburgh: 300,000</p>\n  <p class="small">Hollywood: 150,000</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.medium {\n  width: 300px;\n  background-color: red;\n}\n\n.small {\n  width: ', ';\n  background-color: pink;\n}'],
      blankAnswers: ['150px'],
      blankPlaceholders: [''],
      promptChips: ['300px', '150', '150px'],
      expectedCode: ['.medium {\n  width: 300px;\n  background-color: red;\n}\n\n.small {\n  width: 150px;\n  background-color: pink;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h1 {
                margin: 0 0 18px;
                font-size: 2.1rem;
                line-height: 1.1;
              }
              h3 {
                margin: 0 0 16px;
                font-size: 1.05rem;
                font-weight: 700;
              }
              p {
                margin: 0 0 10px;
                font-size: 1rem;
              }
              .medium {
                width: 300px;
                background-color: red;
              }
              .small {
                width: 150px;
                background-color: pink;
              }
            </style>
          </head>
          <body>
            <h1>City Population Comparison</h1>
            <h3>The following are approximate values</h3>
            <p class="medium">Pittsburgh: 300,000</p>
            <p class="small">Hollywood: 150,000</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: "What's the unit of measurement for the size of elements?",
      options: ['Height', 'Pixels'],
      correctAnswer: 1,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What stands for 50 pixels?!',
      options: ['50%', '50px'],
      correctAnswer: 1,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'Which property changes the height of an element?',
      options: ['height', 'width'],
      correctAnswer: 0,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What happens when we set `height` to `100px` in this rule?',
      codeTitle: 'style.css',
      secondaryCodeTitle: 'index.html',
      code: 'h1 {\n  height: 100px;\n  background-color: teal;\n}',
      secondaryCode: '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>New Yorker</h1>\n</body>\n</html>',
      previewTitle: 'Browser',
      options: ['All `h1` elements have their `height` property set to `100px`', 'The `font-size` property is set to `100px`'],
      correctAnswer: 0,
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 12px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h1 {
                margin: 0;
                height: 100px;
                background-color: teal;
                font-size: 2.2rem;
                line-height: 1.1;
              }
            </style>
          </head>
          <body>
            <h1>New Yorker</h1>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Make this rule double the width of the other by typing `width`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Easy Coffee Guide</h1>\n  <p class="single">7g for a single shot</p>\n  <p class="double">14g for a double shot</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.double {\n  ', ': 250px;\n  background-color: brown;\n}\n\n.single {\n  width: 125px;\n  background-color: rosyBrown;\n}'],
      blankAnswers: ['width'],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['.double {\n  width: 250px;\n  background-color: brown;\n}\n\n.single {\n  width: 125px;\n  background-color: rosyBrown;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h1 {
                margin: 0 0 18px;
                font-size: 2rem;
                line-height: 1.1;
              }
              p {
                margin: 0 0 12px;
                font-size: 1rem;
              }
              .double {
                width: 250px;
                background-color: brown;
              }
              .single {
                width: 125px;
                background-color: rosyBrown;
              }
            </style>
          </head>
          <body>
            <h1>Easy Coffee Guide</h1>
            <p class="single">7g for a single shot</p>
            <p class="double">14g for a double shot</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Set the `height` property for elements of the `mainPhoto` class to `200px`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Top Destination</h1>\n  <img class="mainPhoto" src="https://mimo.app/r/beach.png">\n  <h2>Other Destinations</h2>\n  <img src="https://mimo.app/r/market.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.mainPhoto {\n  ', '', ' ', '', ' ', '\n  width: 200px;\n}\n\nimg {\n  height: 100px;\n  width: 100px;\n}'],
      blankAnswers: ['height', ':', '200px', ';'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: [':', ';', 'height', '200px'],
      expectedCode: ['.mainPhoto {\n  height: 200px;\n  width: 200px;\n}\n\nimg {\n  height: 100px;\n  width: 100px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h1 {
                margin: 0 0 18px;
                font-size: 2rem;
                line-height: 1.1;
              }
              h2 {
                margin: 18px 0 14px;
                font-size: 1.6rem;
                line-height: 1.1;
              }
              .mainPhoto {
                height: 200px;
                width: 200px;
              }
              img {
                height: 100px;
                width: 100px;
              }
            </style>
          </head>
          <body>
            <h1>Top Destination</h1>
            <img class="mainPhoto" src="https://mimo.app/r/beach.png" alt="Beach destination" />
            <h2>Other Destinations</h2>
            <img src="https://mimo.app/r/market.png" alt="Market destination" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Set the `height` property for elements of the `square` class to `100px`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <p class="square">A square has four equal straight sides and four right angles.</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.square {\n  height: ', ';\n  width: 100px;\n  background-color: pink;\n}'],
      blankAnswers: ['100px'],
      blankPlaceholders: [''],
      promptChips: ['100px', '50px'],
      expectedCode: ['.square {\n  height: 100px;\n  width: 100px;\n  background-color: pink;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              .square {
                height: 100px;
                width: 100px;
                background-color: pink;
                overflow: hidden;
              }
              p {
                margin: 0;
                font-size: 1rem;
                line-height: 1.15;
              }
            </style>
          </head>
          <body>
            <p class="square">A square has four equal straight sides and four right angles.</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Set the `width` property for all `p` elements to `250px` by typing `width: 250px;`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Instapic</h3>\n  <p> Welcome to Instapic, where you can share all of your photos in an instant</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['p {\n  height: 50px;\n  ', '\n  background-color: bisque;\n}'],
      blankAnswers: ['width: 250px;'],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['p {\n  height: 50px;\n  width: 250px;\n  background-color: bisque;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h3 {
                margin: 0 0 14px;
                font-size: 1.5rem;
              }
              p {
                margin: 0;
                height: 50px;
                width: 250px;
                background-color: bisque;
                line-height: 1.2;
              }
            </style>
          </head>
          <body>
            <h3>Instapic</h3>
            <p>Welcome to Instapic, where you can share all of your photos in an instant</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};
cssLessonContent['css-track-6'] = {
  ...cssLessonContent['css-4'],
  id: 'css-track-6',
  title: 'Borders',
  content: [
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Elements on a webpage can have `borders` around them.\n\nTo see how it looks, add the `border` property.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h2>Rainforest Online Shop</h2>\n  <p class="coupon">50% Discount Code: LST3815162342*</p>\n  <p>*This offer is subject to change without any prior notice.</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.coupon {\n  ', ': solid;\n}'],
      blankAnswers: ['border'],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['.coupon {\n  border: solid;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h2 {
                margin: 0 0 20px;
                font-size: 2rem;
                line-height: 1.1;
              }
              p {
                margin: 0 0 14px;
                font-size: 1rem;
              }
              .coupon {
                border: solid;
              }
            </style>
          </head>
          <body>
            <h2>Rainforest Online Shop</h2>
            <p class="coupon">50% Discount Code: LST3815162342*</p>
            <p>*This offer is subject to change without any prior notice.</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'To make the border appear, we set the value to `solid`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h2>Rainforest Online Shop</h2>\n  <p class="coupon">25% Discount Code: LST38151*</p>\n  <p>*This offer is subject to change without any prior notice.</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.coupon {\n  border: ', ';\n}'],
      blankAnswers: ['solid'],
      blankPlaceholders: [''],
      promptChips: ['solid'],
      expectedCode: ['.coupon {\n  border: solid;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h2 {
                margin: 0 0 20px;
                font-size: 2rem;
                line-height: 1.1;
              }
              p {
                margin: 0 0 14px;
                font-size: 1rem;
              }
              .coupon {
                border: solid;
              }
            </style>
          </head>
          <body>
            <h2>Rainforest Online Shop</h2>
            <p class="coupon">25% Discount Code: LST38151*</p>
            <p>*This offer is subject to change without any prior notice.</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can set the width of a border by adding a number in pixels right after `solid`.\n\nHere, we can create a wider border by setting its width to `10px`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1 class="title">👥👥 The Outliers 👥👥</h1>\n  <h2>A journal about out of the ordinary people 🧑‍💼</h2>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.title {\n  ', '', ' ', '', ' ', '\n}'],
      blankAnswers: ['border', ':', 'solid 10px', ';'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: [':', ';', 'solid 10px', 'border'],
      expectedCode: ['.title {\n  border: solid 10px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              .title {
                margin: 0 0 18px;
                border: solid 10px;
                font-size: 2.05rem;
                line-height: 1.1;
              }
              h2 {
                margin: 0;
                font-size: 1.15rem;
                line-height: 1.25;
              }
            </style>
          </head>
          <body>
            <h1 class="title">👥👥 The Outliers 👥👥</h1>
            <h2>A journal about out of the ordinary people 🧑‍💼</h2>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: "To set the color, let's add `red` at the end of the value of border.\n\nWe can make this border red by setting the color value to `red`.",
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1 class="caution">BREAKING NEWS!!!</h1>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['.caution {\n  border: solid 10px ', ';\n}'],
      blankAnswers: ['red'],
      blankPlaceholders: [''],
      promptChips: ['red', '100px'],
      expectedCode: ['.caution {\n  border: solid 10px red;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              .caution {
                margin: 0;
                border: solid 10px red;
                font-size: 2.2rem;
                line-height: 1.1;
              }
            </style>
          </head>
          <body>
            <h1 class="caution">BREAKING NEWS!!!</h1>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: '`border-radius` is a property that rounds the corners of an element. If we set the radius to `10px`, the border curves `10px` before the corner.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h3>Movie Depository</h3>\n  <p>Curb Your Enthusiasm is an award winning show created by Larry David, the cocreator of the hit show Seinfeld</p>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['p {\n  ', '', '', ': ', ';\n  background-color: lightBlue;\n  border: solid;\n}'],
      blankAnswers: ['border', '-', 'radius', '10px'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['-', '10px', 'border', 'radius'],
      expectedCode: ['p {\n  border-radius: 10px;\n  background-color: lightBlue;\n  border: solid;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h3 {
                margin: 0 0 18px;
                font-size: 2rem;
                line-height: 1.1;
              }
              p {
                margin: 0;
                border-radius: 10px;
                background-color: lightBlue;
                border: solid;
                font-size: 1rem;
                line-height: 1.3;
                padding: 2px 6px;
              }
            </style>
          </head>
          <body>
            <h3>Movie Depository</h3>
            <p>Curb Your Enthusiasm is an award winning show created by Larry David, the cocreator of the hit show Seinfeld</p>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: '`border-radius` works on all elements, even images. It\'s an easy way to make images look great on a webpage.\n\nTo round the corners of all images using `border-radius`, type `100px;`.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Window Seat Digest</h1>\n  <h3>A collection of views from airplanes</h3>\n  <img src="https://mimo.app/i/wing1.png">\n  <img src="https://mimo.app/i/wing2.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['img {\n  border-radius: ', '\n  border: solid 5px black;\n}'],
      blankAnswers: ['100px;'],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['img {\n  border-radius: 100px;\n  border: solid 5px black;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h1 {
                margin: 0 0 10px;
                font-size: 2rem;
                line-height: 1.1;
              }
              h3 {
                margin: 0 0 16px;
                font-size: 1.25rem;
                line-height: 1.2;
                font-weight: 700;
              }
              img {
                width: 120px;
                height: 120px;
                object-fit: cover;
                border-radius: 100px;
                border: solid 5px black;
                margin-right: 14px;
              }
            </style>
          </head>
          <body>
            <h1>Window Seat Digest</h1>
            <h3>A collection of views from airplanes</h3>
            <img src="https://mimo.app/i/wing1.png" alt="Airplane wing view one" />
            <img src="https://mimo.app/i/wing2.png" alt="Airplane wing view two" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'To make an image a circle, we set `border-radius` to half the width of an image. It only works if the image is a square though!',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <img src="https://mimo.app/r/lighthouse.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['img {\n  height: 100px;\n  width: 100px;\n  border-radius: ', ';\n}'],
      blankAnswers: ['50px'],
      blankPlaceholders: [''],
      promptChips: ['100', '200', '50px'],
      expectedCode: ['img {\n  height: 100px;\n  width: 100px;\n  border-radius: 50px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
              }
              img {
                height: 100px;
                width: 100px;
                border-radius: 50px;
                object-fit: cover;
              }
            </style>
          </head>
          <body>
            <img src="https://mimo.app/r/lighthouse.png" alt="Lighthouse" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: "What's a border in CSS?",
      options: [
        'The element\'s background',
        'A line of a certain thickness and color around an element'
      ],
      correctAnswer: 1,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'To make the border appear, which value is necessary?',
      options: [
        'The value `solid` is necessary',
        'The value `10px red` is necessary'
      ],
      correctAnswer: 0,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'How do we round the corners of an element?',
      options: [
        'With the `text-align` property',
        'With the `border-radius` property'
      ],
      correctAnswer: 1,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'How do we set the color of a border?',
      options: [
        'By adding a color value to the `border` property',
        'By adding a color value to the `border-radius` property'
      ],
      correctAnswer: 0,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Add a border to the `h3` rule.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h2>Rainforest Online Shop</h2>\n  <h3>Item out of stock until December!</h3>\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['h3 {\n  ', ': solid 10px red;\n}'],
      blankAnswers: ['border'],
      blankPlaceholders: [''],
      promptChips: ['border', 'border-radius'],
      expectedCode: ['h3 {\n  border: solid 10px red;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h2 {
                margin: 0 0 20px;
                font-size: 2rem;
                line-height: 1.1;
              }
              h3 {
                margin: 0;
                border: solid 10px red;
                font-size: 1.7rem;
                line-height: 1.2;
                font-weight: 700;
                padding: 2px 6px;
              }
            </style>
          </head>
          <body>
            <h2>Rainforest Online Shop</h2>
            <h3>Item out of stock until December!</h3>
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Make a visible border around all `img` elements.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>The Frame Shop</h1>\n  <h3>Minimalist frames around your photos</h3>\n  <img src="https://mimo.app/r/plant.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['img {\n  border: ', ';\n}'],
      blankAnswers: ['solid'],
      blankPlaceholders: [''],
      promptChips: ['orange', 'solid'],
      expectedCode: ['img {\n  border: solid;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h1 {
                margin: 0 0 12px;
                font-size: 2rem;
                line-height: 1.1;
              }
              h3 {
                margin: 0 0 16px;
                font-size: 1.3rem;
                line-height: 1.2;
              }
              img {
                border: solid;
                width: 180px;
                height: auto;
                display: block;
              }
            </style>
          </head>
          <body>
            <h1>The Frame Shop</h1>
            <h3>Minimalist frames around your photos</h3>
            <img src="https://mimo.app/r/plant.png" alt="Plant in frame" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Round the edges of all `img` elements.',
      codeTitle: 'index.html',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      editorStyle: 'monaco-like',
      showExpectedCode: false,
      previewTitle: 'Browser',
      primaryTemplateParts: [
        '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <img src="https://mimo.app/r/lori.png">\n</body>\n</html>'
      ],
      secondaryTemplateParts: ['img {\n  ', '', '', ': ', ';\n}'],
      blankAnswers: ['border', '-', 'radius', '100px'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['radius', 'border', 'height', '-', '100px'],
      expectedCode: ['img {\n  border-radius: 100px;\n}'],
      solvedPreviewHtml: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
              }
              img {
                border-radius: 100px;
                width: 180px;
                height: 180px;
                object-fit: cover;
                display: block;
              }
            </style>
          </head>
          <body>
            <img src="https://mimo.app/r/lori.png" alt="Photographer portrait" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      data: 'Using the `img` selector, set the height and width to `100px`. Then, set a visible `2px` thick border around them.',
      codeTitle: 'index.html',
      code: '<!doctype html>\n<html>\n<head>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h2>My Favorite Things</h2>\n  <img src="https://mimo.app/i/cat.png">\n  <img src="https://mimo.app/i/coffee.png">\n</body>\n</html>',
      secondaryCodeTitle: 'style.css',
      activeCodeTab: 'secondary',
      initialCode: '',
      placeholder: 'img {\n  width: 100px;\n  height: 100px;\n  border: solid 2px;\n}',
      showExpectedCode: false,
      expectedCode: ['img {\n  width: 100px;\n  height: 100px;\n  border: solid 2px;\n}'],
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
                padding: 16px 14px;
                background: white;
                font-family: "Times New Roman", Times, serif;
                color: #111111;
              }
              h2 {
                margin: 0 0 18px;
                font-size: 2rem;
                line-height: 1.1;
              }
              img {
                width: 100px;
                height: 100px;
                border: solid 2px;
                object-fit: cover;
                margin-right: 8px;
              }
            </style>
          </head>
          <body>
            <h2>My Favorite Things</h2>
            <img src="https://mimo.app/i/cat.png" alt="Cat" />
            <img src="https://mimo.app/i/coffee.png" alt="Coffee" />
          </body>
        </html>
      `,
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};
