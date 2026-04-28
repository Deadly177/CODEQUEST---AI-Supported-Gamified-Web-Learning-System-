import type { LessonDefinition } from '../../lessonTypes';

export const javascriptLessonContent: Record<string, LessonDefinition> = {
  'js-track-1': {
    id: 'js-track-1',
    title: 'What Variables Do',
    xpReward: 50,
    content: [
      {
        type: 'intro',
        data: 'Welcome to variables. Variables store information under a name so your JavaScript can reuse that value later.',
        secondaryText: 'In this track, you will start by creating variables for text, numbers, and true-or-false values.',
        accentText: 'What Variables Do.'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We use `let` and `const` to create variables. Complete the missing line in `script.js` with `const`.',
        codeTitle: 'script.js',
        templateParts: ['let\n', ''],
        blankAnswers: ['const'],
        blankPlaceholders: [''],
        promptChips: ['const'],
        expectedCode: ['let\nconst'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let\nconst',
        helperText: 'Tap the chip or type the missing keyword.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Every variable needs a `name`. Variable names need to be single words, so they cannot contain spaces. Complete the variable name in `script.js`.',
        codeTitle: 'script.js',
        templateParts: ['let ', ''],
        blankAnswers: ['city'],
        blankPlaceholders: [''],
        promptChips: ['home city', 'city'],
        expectedCode: ['let city'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let city',
        helperText: 'Choose the variable name without spaces.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To create variable names with multiple words, we use `camelCase`. Start with a lowercase word and capitalize the next word.',
        codeTitle: 'script.js',
        templateParts: ['let ', ''],
        blankAnswers: ['homeCity'],
        blankPlaceholders: [''],
        promptChips: ['home city', 'homeCity'],
        expectedCode: ['let homeCity'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let homeCity',
        helperText: 'Pick the camelCase version with no spaces.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To help us understand what is inside a variable, we choose descriptive names. Complete the variable name in `script.js`.',
        codeTitle: 'script.js',
        templateParts: ['const ', ''],
        blankAnswers: ['windyCity'],
        blankPlaceholders: [''],
        promptChips: ['windyCity', 'wC'],
        expectedCode: ['const windyCity'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const windyCity',
        helperText: 'Choose the clearer descriptive variable name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What is wrong with this variable name?',
        codeTitle: 'script.js',
        code: 'let high Score',
        options: ['It contains a capital letter', 'It contains a space'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'Why do we give variables descriptive names like `city` or `country` instead of `x` or `y`?',
        options: ['To help us understand what\'s inside them', 'To make them faster to type'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What words can we use to declare variables?',
        options: ['`let` and `variable`', '`let` and `const`'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What do we use camel case for?',
        options: ['To create variable names with spaces', 'To create variable names with multiple words'],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Pick the most descriptive variable name in `script.js`.',
        codeTitle: 'script.js',
        templateParts: ['const ', ''],
        blankAnswers: ['highScore'],
        blankPlaceholders: [''],
        promptChips: ['highScore', 'hs'],
        expectedCode: ['const highScore'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const highScore',
        helperText: 'Choose the more descriptive name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Spell out the word for one of the ways we use to create a variable.',
        codeTitle: 'script.js',
        templateParts: ['', '', '', ''],
        blankAnswers: ['l', 'e', 't'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['l', 'e', 't'],
        expectedCode: ['let'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let',
        helperText: 'Place the letters in order to spell the keyword.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Put the snippets in the right order to create a variable name.',
        codeTitle: 'script.js',
        templateParts: ['', ' ', ''],
        blankAnswers: ['let', 'highScore'],
        blankPlaceholders: ['', ''],
        promptChips: ['highScore', 'let'],
        expectedCode: ['let highScore'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let highScore',
        helperText: 'Place the keyword before the variable name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'editor',
        data: 'Finish up creating this variable by coding `let`.',
        codeTitle: 'script.js',
        initialCode: ' person',
        expectedCode: ['let person'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let person',
        placeholder: 'Type your JavaScript here',
        showExpectedCode: false,
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'js-track-2': {
    id: 'js-track-2',
    title: 'Creating String Variables',
    xpReward: 50,
    content: [
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Variable names can contain numbers, too. Adding numbers is useful with multiple similar variables. Let\'s create the variable `car1` here.',
        codeTitle: 'script.js',
        templateParts: ['const ', ''],
        blankAnswers: ['car1'],
        blankPlaceholders: [''],
        promptChips: ['car1', '1 car'],
        expectedCode: ['const car1'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const car1',
        helperText: 'Choose the valid variable name with the number at the end.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'After creating and naming a variable, we use the `=` sign to store a value inside it. Complete the statement in `script.js`.',
        codeTitle: 'script.js',
        templateParts: ['const city ', ' ', ''],
        blankAnswers: ['=', '"Chicago"'],
        blankPlaceholders: ['', ''],
        promptChips: ['"Chicago"', '='],
        expectedCode: ['const city = "Chicago"'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const city = "Chicago"',
        helperText: 'Place the equals sign before the value.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To finish creating a variable, we put a semicolon, `;`, at the end of the line.',
        codeTitle: 'script.js',
        templateParts: ['const city = "Chicago"', ''],
        blankAnswers: [';'],
        blankPlaceholders: [''],
        promptChips: [';', '.'],
        expectedCode: ['const city = "Chicago";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const city = "Chicago";',
        helperText: 'Choose the correct symbol for the end of the statement.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'The values we\'ve been storing like `"Chicago"` are strings. Strings are words in double quotes.',
        codeTitle: 'script.js',
        templateParts: ['', 'Chicago', '', ''],
        blankAnswers: ['"', '"'],
        blankPlaceholders: ['', ''],
        promptChips: ["'", "'", '"', '"'],
        expectedCode: ['"Chicago"'],
        previewTitle: 'Console output',
        solvedConsoleOutput: '"Chicago"',
        helperText: 'Use double quotes on both sides of the string.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Strings can contain all sorts of letters and symbols, including spaces. For example, `"Winter is coming."`',
        codeTitle: 'script.js',
        templateParts: ['', '', '', ''],
        blankAnswers: ['"', 'Winter is coming.', '"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['"', 'Winter is coming.', '"'],
        expectedCode: ['"Winter is coming."'],
        previewTitle: 'Console output',
        solvedConsoleOutput: '"Winter is coming."',
        helperText: 'Place the string text between the double quotes.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What\'s the value of this variable?',
        codeTitle: 'script.js',
        code: 'let name = "Karin";',
        options: ['"Karin"', 'name'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What\'s the name of this variable?',
        codeTitle: 'script.js',
        code: 'let hobby = "Tree shaping";',
        options: ['hobby', '"Tree shaping"'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'How do we know a value is a string?',
        options: ['It\'s a word between double quotes', 'It contains an `=` sign'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What\'s happening in this code?',
        codeTitle: 'script.js',
        code: 'const browser = "Chrome";',
        options: ['The variable `"Chrome"` stores the value `browser`', 'The variable `browser` stores the value `"Chrome"`'],
        correctAnswer: 1
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Create a `job` variable and give it the value `"Plumber"`.',
        codeTitle: 'script.js',
        templateParts: ['let name = "Mario";\n', ' ', ' ', ';'],
        blankAnswers: ['let job', '=', '"Plumber"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ['=', 'let job', '"Plumber"'],
        expectedCode: ['let name = "Mario";\nlet job = "Plumber";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let name = "Mario";\nlet job = "Plumber";',
        helperText: 'Place the variable declaration, equals sign, and string value in order.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Give the `island` variable a string value.',
        codeTitle: 'script.js',
        templateParts: ['const island = ', '', '', ';'],
        blankAnswers: ['"', 'Malta', '"'],
        blankPlaceholders: ['', '', ''],
        promptChips: ["'", 'Malta', '"', "'", '"'],
        expectedCode: ['const island = "Malta";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const island = "Malta";',
        helperText: 'Place the string text between the double quotes.',
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'js-track-3': {
    id: 'js-track-3',
    title: 'Creating Number Variables',
    xpReward: 50,
    content: [
      {
        type: 'intro',
        data: 'We already know we can declare variables with `let` and `const`.',
        secondaryText: 'Let\'s find out the difference between them!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We use `const` to declare variables whose values are not supposed to change. `const` is short for "constant".',
        codeTitle: 'script.js',
        templateParts: ['', ' ', ' = "Oslo";'],
        blankAnswers: ['const', 'norwayCapital'],
        blankPlaceholders: ['', ''],
        promptChips: ['const', 'norwayCapital'],
        expectedCode: ['const norwayCapital = "Oslo";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const norwayCapital = "Oslo";',
        helperText: 'Use const first, then the variable name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'code',
        data: 'If we try to update a value stored in a `const` variable. We will get an error.',
        codeTitle: 'script.js',
        code: 'const age = 90;\nage = 91;',
        previewTitle: 'Console output',
        solvedConsoleOutput: 'TypeError: Assignment to constant variable.',
        actionLabel: 'Run'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'However, we can update `let` variables with the assign `=` operator.',
        codeTitle: 'script.js',
        templateParts: ['', ' age = 90;\nage = 91;'],
        blankAnswers: ['let'],
        blankPlaceholders: [''],
        promptChips: ['const', 'let'],
        expectedCode: ['let age = 90;\nage = 91;'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let age = 90;\nage = 91;',
        helperText: 'Choose the keyword that allows the value to be updated.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'To make it obvious that a variable is of type `const` and shouldn\'t change, we can optionally name it with uppercase letters.\n\nCreate an uppercase `birthday` constant.',
        codeTitle: 'script.js',
        templateParts: ['const ', ' = "25/02/1882";'],
        blankAnswers: ['BIRTHDAY'],
        blankPlaceholders: [''],
        promptChips: ['birthDay', 'birthday', 'BIRTHDAY'],
        expectedCode: ['const BIRTHDAY = "25/02/1882";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const BIRTHDAY = "25/02/1882";',
        helperText: 'Choose the uppercase variable name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We cannot use `camelCase` if we use this uppercase standard, so we use an uppercase `snake_case` to name variables with more than one word.\n\nCreate an uppercase "speed of light" const using `snake_case`.',
        codeTitle: 'script.js',
        templateParts: ['const ', ' = "3*10⁸ m/s";'],
        blankAnswers: ['SPEED_OF_LIGHT'],
        blankPlaceholders: [''],
        promptChips: ['SPEED_OF_LIGHT', 'speedOfLight', 'speed_of_light'],
        expectedCode: ['const SPEED_OF_LIGHT = "3*10⁸ m/s";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const SPEED_OF_LIGHT = "3*10⁸ m/s";',
        helperText: 'Choose the uppercase snake_case variable name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Both `let` and `const` are useful variables and we could use them interchangeably. However, we should try to use `const` as default.',
        codeTitle: 'script.js',
        templateParts: ['', ' MIDDLE_NAME = "Francesca";'],
        blankAnswers: ['const'],
        blankPlaceholders: [''],
        promptChips: ['let', 'const'],
        expectedCode: ['const MIDDLE_NAME = "Francesca";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const MIDDLE_NAME = "Francesca";',
        helperText: 'Choose the default keyword for values that do not change.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'What does `const` stand for?',
        options: ['constant', 'continuous'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'We can assign a new value to a `let` variable.',
        options: ['true', 'false'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What\'s the optional standard to make sure constants don\'t change their values?',
        options: ['lowercase snake case', 'uppercase'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What should we use as a default?',
        options: ['`const`', '`let`'],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Declare the variable correctly.',
        codeTitle: 'script.js',
        templateParts: ['', ' favoriteSong = "What\'s love got to do with it?";\nfavoriteSong = "What\'s love got to do with it? - 2015 Remastered";'],
        blankAnswers: ['let'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['let favoriteSong = "What\'s love got to do with it?";\nfavoriteSong = "What\'s love got to do with it? - 2015 Remastered";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'let favoriteSong = "What\'s love got to do with it?";\nfavoriteSong = "What\'s love got to do with it? - 2015 Remastered";',
        helperText: 'Use the keyword that allows reassignment.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Use the uppercase `snake_case` standard to declare this `const` variable.',
        codeTitle: 'script.js',
        templateParts: ['const ', ' = "Nile";'],
        blankAnswers: ['LONGEST_RIVER'],
        blankPlaceholders: [''],
        promptChips: ['LONGESTRIVER', 'LONGEST_RIVER', 'longest_RIVER'],
        expectedCode: ['const LONGEST_RIVER = "Nile";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const LONGEST_RIVER = "Nile";',
        helperText: 'Choose the uppercase snake_case variable name.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Use the default variable to declare the game name.',
        codeTitle: 'script.js',
        templateParts: ['', ' GAME_NAME = "Dixit";'],
        blankAnswers: ['const'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['const GAME_NAME = "Dixit";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const GAME_NAME = "Dixit";',
        helperText: 'Use the default keyword for values that do not change.',
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  },
  'js-track-4': {
    id: 'js-track-4',
    title: 'Boolean Variables Practice',
    xpReward: 50,
    content: [
      {
        type: 'intro',
        data: 'Lines of code are instructions for the computer to follow.',
        secondaryText: 'When we run code, we tell the computer to follow the instructions we put together.'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'The order of the instructions matters because the computer follows the instructions line by line.\n\nCreate `step1` first, `step2` second, and `step3` third.',
        codeTitle: 'script.js',
        templateParts: ['', '\n', '\n', ''],
        blankAnswers: [
          'const step1 = "Collect pants";',
          'const step2 = "?";',
          'const step3 = "Profit";'
        ],
        blankPlaceholders: ['', '', ''],
        promptChips: [
          'const step3 = "Profit";',
          'const step2 = "?";',
          'const step1 = "Collect pants";'
        ],
        expectedCode: ['const step1 = "Collect pants";\nconst step2 = "?";\nconst step3 = "Profit";'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'const step1 = "Collect pants";\nconst step2 = "?";\nconst step3 = "Profit";',
        helperText: 'Place the instructions in step order.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'With the special instruction `console.log()`, we tell the computer to display a value in an area called the console.',
        codeTitle: 'script.js',
        templateParts: ['console.log(', ');'],
        blankAnswers: ['"Hello, World!"'],
        blankPlaceholders: [''],
        promptChips: ['"Hello, World!"'],
        expectedCode: ['console.log("Hello, World!");'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'Hello, World!',
        helperText: 'Place the string inside the parentheses.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can use the `console.log()` instruction as often as we want.\nThe computer displays every value on a line in the console.',
        codeTitle: 'script.js',
        templateParts: ['console.log("3, 2, 1");\nconsole.log', '"GO!"', ';'],
        blankAnswers: ['(', ')'],
        blankPlaceholders: ['', ''],
        promptChips: ['(', ')'],
        expectedCode: ['console.log("3, 2, 1");\nconsole.log("GO!");'],
        previewTitle: 'Console output',
        solvedConsoleOutput: '3, 2, 1\nGO!',
        helperText: 'Wrap the value with parentheses.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'We can use `console.log()` to display variables like `greeting`, too.',
        codeTitle: 'script.js',
        templateParts: ['const greeting = "Hello, World!";\nconsole.log(', ');'],
        blankAnswers: ['greeting'],
        blankPlaceholders: [''],
        promptChips: [')', 'greeting', '(', 'console.log'],
        expectedCode: ['const greeting = "Hello, World!";\nconsole.log(greeting);'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'Hello, World!',
        helperText: 'Put the variable name inside the parentheses.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'When we display variables in the console, their values appear instead of their names. If we log `name` here, it\'ll show its value.',
        codeTitle: 'script.js',
        templateParts: ['const name = "Daenerys";\nconsole.log(', ');'],
        blankAnswers: ['name'],
        blankPlaceholders: [''],
        promptChips: ['"Daenerys"', 'name'],
        expectedCode: ['const name = "Daenerys";\nconsole.log(name);'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'Daenerys',
        helperText: 'Use the variable name, not the string value.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'quiz',
        data: 'How do we know `"Hello, World!"` is a string?',
        options: ['It contains letters and symbols', 'It starts and ends with double quotes'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What\'s the console?',
        options: ['The area where we write the code', 'An area that displays output'],
        correctAnswer: 1
      },
      {
        type: 'quiz',
        data: 'What does the special instruction `console.log()` do?',
        options: ['It displays a value in the console', 'It creates a variable'],
        correctAnswer: 0
      },
      {
        type: 'quiz',
        data: 'What does this code display in the console?',
        codeTitle: 'script.js',
        code: 'const sport = "B-ball";\nconsole.log(sport);',
        options: ['`B-ball`', '`sport`'],
        correctAnswer: 0
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Put the code in order to display the value `daily` in the console.',
        codeTitle: 'script.js',
        templateParts: ['', '\n', ''],
        blankAnswers: ['const frequency = "daily";', 'console.log(frequency);'],
        blankPlaceholders: ['', ''],
        promptChips: ['const frequency = "daily";', 'console.log(frequency);'],
        expectedCode: ['const frequency = "daily";\nconsole.log(frequency);'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'daily',
        helperText: 'Create the variable before logging it.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Add the instruction to display this string value in the console.',
        codeTitle: 'script.js',
        templateParts: ['', '', '', '', '"Buzz"', '', ';'],
        blankAnswers: ['console', '.', 'log', '(', ')'],
        blankPlaceholders: ['', '', '', '', ''],
        promptChips: [')', '(', 'log', 'console', '.'],
        expectedCode: ['console.log("Buzz");'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'Buzz',
        helperText: 'Build console.log around the string value.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Display the value of `lastName`.',
        codeTitle: 'script.js',
        templateParts: ['const lastName = "Lightyear";\nconsole.log(', ');'],
        blankAnswers: ['lastName'],
        blankPlaceholders: [''],
        promptChips: ['"Lightyear"', 'lastName'],
        expectedCode: ['const lastName = "Lightyear";\nconsole.log(lastName);'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'Lightyear',
        helperText: 'Use the variable name, not the string value.',
        successMessage: 'Lesson solved. Good job!'
      },
      {
        type: 'interactive',
        mode: 'fill-blanks',
        data: 'Display the value of the `job` variable.',
        codeTitle: 'script.js',
        templateParts: ['const job = "Sheriff";\nconsole.log(', ');'],
        blankAnswers: ['job'],
        blankPlaceholders: [''],
        promptChips: [],
        expectedCode: ['const job = "Sheriff";\nconsole.log(job);'],
        previewTitle: 'Console output',
        solvedConsoleOutput: 'Sheriff',
        helperText: 'Type the variable name inside the parentheses.',
        successMessage: 'Lesson solved. Good job!'
      }
    ]
  }
};

javascriptLessonContent['js-1'] = {
  id: 'js-1',
  title: 'Creating Variables',
  xpReward: 50,
  content: javascriptLessonContent['js-track-1'].content
};

javascriptLessonContent['js-2'] = {
  id: 'js-2',
  title: 'Using Variables',
  xpReward: 50,
  content: [
    {
      type: 'text',
      data: 'After creating a variable, use its name to read the stored value again.'
    },
    {
      type: 'code',
      data: 'This code stores a hobby, then uses the variable name to print it.',
      codeTitle: 'script.js',
      code: 'let hobby = "Tree shaping";\nconsole.log(hobby);'
    },
    {
      type: 'quiz',
      data: 'Which part is the variable name?',
      codeTitle: 'script.js',
      code: 'let hobby = "Tree shaping";',
      options: ['hobby', '"Tree shaping"'],
      correctAnswer: 0
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Use the variable name to print the stored city.',
      codeTitle: 'script.js',
      templateParts: ['const city = "Chicago";\nconsole.log(', ');'],
      blankAnswers: ['city'],
      blankPlaceholders: [''],
      promptChips: ['city', '"Chicago"'],
      expectedCode: ['const city = "Chicago";\nconsole.log(city);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Chicago',
      helperText: 'Use the variable name, not the string value.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};

javascriptLessonContent['js-2-track-1'] = {
  id: 'js-2-track-1',
  title: 'Reading Variables',
  xpReward: 50,
  content: [
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We already saw that `let` variables, as opposed to `const`, can change and update the values they store.\n\nUse the `=` sign to change the value in `status` from `"Watching Netflix"` to `"Relaxing at the beach"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let currentStatus = "Watching Netflix";\ncurrentStatus ',
        ' "Relaxing at the beach";\nconsole.log(currentStatus);'
      ],
      blankAnswers: ['='],
      blankPlaceholders: [''],
      promptChips: ['=', ':'],
      expectedCode: [
        'let currentStatus = "Watching Netflix";\ncurrentStatus = "Relaxing at the beach";\nconsole.log(currentStatus);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Relaxing at the beach',
      helperText: 'Use the assignment operator to update the value.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can update `let` variables as often as we want.\n\nTry it yourself: change the value of `currentStatus` to `"Reading"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let currentStatus = "Watching Netflix";\ncurrentStatus = "Relaxing at the Beach";\nconsole.log(currentStatus);\n\n',
        ' ',
        ' ',
        ';\nconsole.log(currentStatus);'
      ],
      blankAnswers: ['currentStatus', '=', '"Reading"'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['=', 'currentStatus', '"Reading"'],
      expectedCode: [
        'let currentStatus = "Watching Netflix";\ncurrentStatus = "Relaxing at the Beach";\nconsole.log(currentStatus);\n\ncurrentStatus = "Reading";\nconsole.log(currentStatus);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Relaxing at the Beach\nReading',
      helperText: 'Use the variable name, equals sign, and new string value.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can also give variables the values of other variables by setting one variable to the other.\n\nGive the `currentStatus` variable the value of `defaultStatus`.',
      codeTitle: 'script.js',
      templateParts: [
        'let defaultStatus = "Hi there!";\nlet currentStatus = "Playing football";\n\ncurrentStatus = ',
        ';\nconsole.log(currentStatus);'
      ],
      blankAnswers: ['defaultStatus'],
      blankPlaceholders: [''],
      promptChips: ['defaultStatus', '"Playing football"'],
      expectedCode: [
        'let defaultStatus = "Hi there!";\nlet currentStatus = "Playing football";\n\ncurrentStatus = defaultStatus;\nconsole.log(currentStatus);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Hi there!',
      helperText: 'Use the other variable name to copy its value.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'When we update a variable, it forgets its previous value.\n\nDisplay the `currentStatus` variable when it\'s set to `"Playing football"` and when it\'s set to `"Walking the dog"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let currentStatus = "Playing football";\nconsole.log(',
        ');\n\ncurrentStatus = "Walking the dog";\nconsole.log(',
        ');'
      ],
      blankAnswers: ['currentStatus', 'currentStatus'],
      blankPlaceholders: ['', ''],
      promptChips: ['currentStatus', 'let currentStatus', 'currentStatus'],
      expectedCode: [
        'let currentStatus = "Playing football";\nconsole.log(currentStatus);\n\ncurrentStatus = "Walking the dog";\nconsole.log(currentStatus);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Playing football\nWalking the dog',
      helperText: 'Use the variable name in both console.log calls.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'Which of these lines of code updates the `currentStatus` variable?',
      options: ['`currentStatus = "Working out";`', '`let currentStatus = "Working out";`'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'const currentStatus = "Watching Netflix";\nconsole.log(currentStatus);',
      options: ['`Watching Netflix`', '`currentStatus`'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'What\'s wrong with this code?',
      codeTitle: 'script.js',
      code: 'firstName = "Lori";\nfirstName = "Joe";',
      options: ['Nothing', 'It misses the `let` keyword in the first line'],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'let firstName = "Lori";\nfirstName = "Joe";\nconsole.log(firstName);',
      options: ['`Joe`', '`Lori`'],
      correctAnswer: 0
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Change the value in the `temperature` variable to `"100 degrees"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let temperature = "0 degrees";\n',
        ' = "100 degrees";\nconsole.log(temperature);'
      ],
      blankAnswers: ['temperature'],
      blankPlaceholders: [''],
      promptChips: ['temperature', 'let temperature'],
      expectedCode: [
        'let temperature = "0 degrees";\ntemperature = "100 degrees";\nconsole.log(temperature);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: '100 degrees',
      helperText: 'Use the existing variable name without let.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Update the `currentStatus` variable to `"Writing code"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let currentStatus = "Dancing";\n',
        ' ',
        ' ',
        ';\nconsole.log(currentStatus);'
      ],
      blankAnswers: ['currentStatus', '=', '"Writing code"'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['"Writing code"', 'let currentStatus', ';', '=', 'currentStatus'],
      expectedCode: [
        'let currentStatus = "Dancing";\ncurrentStatus = "Writing code";\nconsole.log(currentStatus);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Writing code',
      helperText: 'Update the existing variable without declaring it again.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Update the `buttonText` variable to `"Log in"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let buttonText = "Sign up";\n',
        ' ',
        ' ',
        ';\nconsole.log(buttonText);'
      ],
      blankAnswers: ['buttonText', '=', '"Log in"'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['=', ';', 'Log in', 'let buttonText', 'buttonText', '"Log in"'],
      expectedCode: [
        'let buttonText = "Sign up";\nbuttonText = "Log in";\nconsole.log(buttonText);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Log in',
      helperText: 'Update the existing variable with the quoted string.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Change the value of the `currentStatus` variable to `"Done"`.',
      codeTitle: 'script.js',
      templateParts: [
        'let currentStatus = "Working hard";\ncurrentStatus = ',
        ';\nconsole.log(currentStatus);'
      ],
      blankAnswers: ['"Done"'],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: [
        'let currentStatus = "Working hard";\ncurrentStatus = "Done";\nconsole.log(currentStatus);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Done',
      helperText: 'Type the new string value.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};

javascriptLessonContent['js-2-track-2'] = {
  id: 'js-2-track-2',
  title: 'Console Output',
  xpReward: 50,
  content: [
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can add string values together with a `+` sign.\n\nAdd the values `"Followers:"` and `"55"` together.',
      codeTitle: 'script.js',
      templateParts: ['"Followers:" ', ' "55";'],
      blankAnswers: ['+'],
      blankPlaceholders: [''],
      promptChips: ['+', '-'],
      expectedCode: ['"Followers:" + "55";'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Followers:55',
      helperText: 'Use the plus sign to add the two strings together.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We call adding together string values an **expression** because it creates a single string value.\n\nAdd the expression between the parentheses of `console.log()`.',
      codeTitle: 'script.js',
      templateParts: ['console.log(', ' ', ' ', ');'],
      blankAnswers: ['"Followers:"', '+', '"55"'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['+', '"55"', '"Followers:"'],
      expectedCode: ['console.log("Followers:" + "55");'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Followers:55',
      helperText: 'Place the two strings around the plus sign.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'When expressions contain variables, they use the values in the variables.\n\nCreate an expression that adds the value `"Followers:"` and the variable `followers` together.',
      codeTitle: 'script.js',
      templateParts: ['const followers = "55";\n', ' ', ' ', ';'],
      blankAnswers: ['"Followers:"', '+', 'followers'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['followers', '+', '"Followers:"'],
      expectedCode: ['const followers = "55";\n"Followers:" + followers;'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Followers:55',
      helperText: 'Use the variable name without quotes.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can use `console.log()` to see the results of expressions.\n\nAdd a `console.log()` instruction around the expression.',
      codeTitle: 'script.js',
      templateParts: [
        'const numberOfFollowers = "55";\n',
        '',
        '"Followers: " + numberOfFollowers',
        ';'
      ],
      blankAnswers: ['console.log', '(', ')'],
      blankPlaceholders: ['', '', ''],
      promptChips: [')', 'console.log', '('],
      expectedCode: [
        'const numberOfFollowers = "55";\nconsole.log("Followers: " + numberOfFollowers);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Followers: 55',
      helperText: 'Put the expression inside the parentheses.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Since expressions become values, we can give them to variables just like values.\n\nStore the expression `"Posts:" + "13"` in the variable `label` and display it in the console.',
      codeTitle: 'script.js',
      templateParts: ['const label = ', ' ', ' ', ';\nconsole.log(', ');'],
      blankAnswers: ['"Posts:"', '+', '"13"', 'label'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['+', '"Posts:"', 'label', '"13"'],
      expectedCode: ['const label = "Posts:" + "13";\nconsole.log(label);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Posts:13',
      helperText: 'Store the expression first, then log the variable name.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What\'s the value of `label`?',
      codeTitle: 'script.js',
      code: 'const label = "Name:" + "Joe";',
      options: ['"Joe"', '"Name:Joe"'],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: '"Jon" + "athan";',
      options: ['Nothing, because there\'s no `console.log()` instruction', 'Jonathan'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'const username = "snoopdogg";\nconsole.log("Username:" + username);',
      options: ['snoopdogg', 'Username:snoopdogg'],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: 'Why does this code display `SteveJobs` without a space in the console?',
      codeTitle: 'script.js',
      code: 'console.log("Steve" + "Jobs");',
      options: [
        'Because `console.log()` never displays spaces',
        'Because `"Steve" + "Jobs"` adds the values together without a space'
      ],
      correctAnswer: 1,
      previewTitle: 'Console output',
      solvedConsoleOutput: 'SteveJobs'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Add the `temperature` variable to the expression.',
      codeTitle: 'script.js',
      templateParts: ['const temperature = "14";\nconsole.log(', ' + " degrees");'],
      blankAnswers: ['temperature'],
      blankPlaceholders: [''],
      promptChips: ['"temperature"', 'temperature'],
      expectedCode: ['const temperature = "14";\nconsole.log(temperature + " degrees");'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '14 degrees',
      helperText: 'Use the variable name without quotes.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Display `Posts:55` in the console.',
      codeTitle: 'script.js',
      templateParts: ['', '', '', '', '', ''],
      blankAnswers: ['console.log', '(', '"Posts:" + "55"', ')', ';'],
      blankPlaceholders: ['', '', '', '', ''],
      promptChips: ['"Posts:" + "55"', 'console.log', '(', ';', ')'],
      expectedCode: ['console.log("Posts:" + "55");'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Posts:55',
      helperText: 'Put the expression inside `console.log()`.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};

javascriptLessonContent['js-2-track-3'] = {
  id: 'js-2-track-3',
  title: 'Numbers',
  xpReward: 50,
  content: [
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'There are other kinds of values, too. Like numbers, which have no double quotes around them.',
      codeTitle: 'script.js',
      templateParts: ['const numberOfLikes = ', ';'],
      blankAnswers: ['5'],
      blankPlaceholders: [''],
      promptChips: ['"5"', '5'],
      expectedCode: ['const numberOfLikes = 5;'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'const numberOfLikes = 5;',
      helperText: 'Choose the number value without double quotes.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Numbers make it easier to keep track of **numeric values**. For example, the number of likes on a Facebook post.\n\nCreate a `numberOfLikes` variable and set it to `5`.',
      codeTitle: 'script.js',
      templateParts: ['', ' ', ' ', ' ', ';\nconsole.log(numberOfLikes);'],
      blankAnswers: ['const', 'numberOfLikes', '=', '5'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['const', 'numberOfLikes', '5', '='],
      expectedCode: ['const numberOfLikes = 5;\nconsole.log(numberOfLikes);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '5',
      helperText: 'Place the keyword, variable name, equals sign, and number in order.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can create expressions with numbers, too. We add numbers together with the `+` sign and subtract them from each other with the `-` sign.\n\nDisplay `6` in the console by setting `numberOfLikes` to `5 + 1`.',
      codeTitle: 'script.js',
      templateParts: [
        'const numberOfLikes = 5 ',
        ' ',
        ';\nconsole.log(numberOfLikes);'
      ],
      blankAnswers: ['+', '1'],
      blankPlaceholders: ['', ''],
      promptChips: ['-', '+', '1'],
      expectedCode: ['const numberOfLikes = 5 + 1;\nconsole.log(numberOfLikes);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '6',
      helperText: 'Use the plus sign and add 1.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We use the `*` sign to multiply numbers and the `/` sign to divide numbers.\n\nTurn `0.5` into its percent value by multiplying it by `100`.',
      codeTitle: 'script.js',
      templateParts: ['const percent = 0.5 ', ' 100;\nconsole.log(percent);'],
      blankAnswers: ['*'],
      blankPlaceholders: [''],
      promptChips: ['x', '*'],
      expectedCode: ['const percent = 0.5 * 100;\nconsole.log(percent);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '50',
      helperText: 'Use the JavaScript multiplication operator.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'When we store numbers in variables, we can use the variables for calculations, too.\n\nAdd `1` to the `numberOfSteps` variable before displaying it in the console.',
      codeTitle: 'script.js',
      templateParts: [
        'const numberOfSteps = 70;\nconsole.log("You\'re on step:");\nconsole.log(numberOfSteps ',
        ' ',
        ');'
      ],
      blankAnswers: ['+', '1'],
      blankPlaceholders: ['', ''],
      promptChips: ['+', '1', '-'],
      expectedCode: [
        'const numberOfSteps = 70;\nconsole.log("You\'re on step:");\nconsole.log(numberOfSteps + 1);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'You\'re on step:\n71',
      helperText: 'Add 1 with the plus sign.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Since expressions become values, we can store calculation results in variables.\n\nStore the calculation result in the `total` variable.',
      codeTitle: 'script.js',
      templateParts: [
        'const private = 3;\nconst public = 10;\nconst ',
        ' ',
        ' ',
        ';\nconsole.log("Total posts: " + total);'
      ],
      blankAnswers: ['total', '=', 'private + public'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['private + public', '=', 'total'],
      expectedCode: [
        'const private = 3;\nconst public = 10;\nconst total = private + public;\nconsole.log("Total posts: " + total);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Total posts: 13',
      helperText: 'Assign the calculation result to `total`.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What\'s the value of the `speed` variable?',
      codeTitle: 'script.js',
      code: 'const speed = 300 + 5;',
      options: ['300', '305'],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: 'Why does this code display `31` instead of `4` in the console?',
      codeTitle: 'script.js',
      code: 'const temperature = "3" + "1";\nconsole.log(temperature);',
      options: ['Because `"3"` and `"1"` are string values', 'Because the expression subtracts the numbers'],
      correctAnswer: 0,
      previewTitle: 'Console output',
      solvedConsoleOutput: '31'
    },
    {
      type: 'quiz',
      data: 'How do we know that the `score` variable stores a number?',
      codeTitle: 'script.js',
      code: 'const score = 40 + 4;',
      options: [
        'Because there are no double quotes around `40` and `4`',
        'Because `score` sounds like it stores a number'
      ],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'const area = "3 * 5";\nconsole.log(area);',
      options: ['3 * 5', '15'],
      correctAnswer: 0,
      previewTitle: 'Console output',
      solvedConsoleOutput: '3 * 5'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Multiply the `savings` variable by the `interest` variable.',
      codeTitle: 'script.js',
      templateParts: [
        'const savings = 100;\nconst interest = 0.04;\nconsole.log(savings ',
        ' ',
        ');'
      ],
      blankAnswers: ['*', 'interest'],
      blankPlaceholders: ['', ''],
      promptChips: ['/', '*', 'interest'],
      expectedCode: [
        'const savings = 100;\nconst interest = 0.04;\nconsole.log(savings * interest);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: '4',
      helperText: 'Use `*` to multiply by the variable.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Divide `sumOfGrades` by `numberOfStudents` to get the average grade of a class.',
      codeTitle: 'script.js',
      templateParts: [
        'const sumOfGrades = 460;\nconst numberOfStudents = 5;\nconsole.log(sumOfGrades ',
        ' numberOfStudents);'
      ],
      blankAnswers: ['/'],
      blankPlaceholders: [''],
      promptChips: ['÷', '/'],
      expectedCode: [
        'const sumOfGrades = 460;\nconst numberOfStudents = 5;\nconsole.log(sumOfGrades / numberOfStudents);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: '92',
      helperText: 'Use the JavaScript division operator.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Subtract `discount` from `total` and display the calculation result in the console.',
      codeTitle: 'script.js',
      templateParts: [
        'const total = 100;\nconst discount = 20;\nconsole.log("Discounted price:")\nconsole.log(',
        ' ',
        ' ',
        ');'
      ],
      blankAnswers: ['total', '-', 'discount'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['discount', 'total', '-'],
      expectedCode: [
        'const total = 100;\nconst discount = 20;\nconsole.log("Discounted price:")\nconsole.log(total - discount);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Discounted price:\n80',
      helperText: 'Subtract the discount from the total.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Set `monthsPerYear` to `12`.',
      codeTitle: 'script.js',
      templateParts: ['const monthsPerYear = ', ';\nconsole.log(monthsPerYear);'],
      blankAnswers: ['12'],
      blankPlaceholders: [''],
      promptChips: ['12'],
      expectedCode: ['const monthsPerYear = 12;\nconsole.log(monthsPerYear);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '12',
      helperText: 'Use the number value.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};

javascriptLessonContent['js-3'] = {
  id: 'js-3',
  title: 'Using True and False',
  xpReward: 50,
  content: [
    {
      type: 'intro',
      data: "There's a special value that's neither a string nor a number: `true`.",
      secondaryText: "There are no quotes around it, and it's not a numeric value.",
      illustration: 'boolean-true'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: '`true` is great for situations like checking if a switch is on or if a feature is enabled.\n\nDisplay `true` in the console.',
      codeTitle: 'script.js',
      templateParts: ['console.log("Allow updates");\nconsole.log(', ');'],
      blankAnswers: ['true'],
      blankPlaceholders: [''],
      promptChips: ['true'],
      expectedCode: ['console.log("Allow updates");\nconsole.log(true);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Allow updates\ntrue',
      helperText: 'Place the boolean value inside console.log.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'We can store `true` in a variable just like a string or a number.\n\nStore `true` in a variable and display it in the console.',
      codeTitle: 'script.js',
      templateParts: ['const correct = ', ';\nconsole.log(', ');'],
      blankAnswers: ['true', 'correct'],
      blankPlaceholders: ['', ''],
      promptChips: ['true', 'correct'],
      expectedCode: ['const correct = true;\nconsole.log(correct);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'true',
      helperText: 'Store the boolean first, then log the variable name.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Save the value `false` in the variable `status` and display `status` in the console.',
      codeTitle: 'script.js',
      templateParts: ['console.log("Device charged");\nconst status = ', ';\nconsole.log(', ');'],
      blankAnswers: ['false', 'status'],
      blankPlaceholders: ['', ''],
      promptChips: ['var', 'false', 'status'],
      expectedCode: ['console.log("Device charged");\nconst status = false;\nconsole.log(status);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Device charged\nfalse',
      helperText: 'Use the boolean value first, then the variable name.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: "What's a good use for the values `true` and `false`?",
      options: ['Showing if a feature is switched on or off', 'Storing values from one to five'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'Why is `false` not a string?',
      codeTitle: 'script.js',
      code: 'const autoPlay = false;',
      options: ['There are no quotes around it', "It's stored inside a variable"],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: "Pick the one that's best for showing that a user unsubscribed from a service.",
      options: ['`const subscribed = false;`', '`const subscribed = true;`'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'Why is `"false"` not the same as `false`?',
      options: ['There are quotes around it, so `"false"` is a string', '`"false"` and `false` are the same'],
      correctAnswer: 0
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Show the status of the auto-update setting by displaying `false` in the console.',
      codeTitle: 'script.js',
      templateParts: ['console.log("Auto update");\n', '', '', '', '', '', '', ';'],
      blankAnswers: ['console', '.', 'log', '(', 'false', ')'],
      blankPlaceholders: ['', '', '', '', '', ''],
      promptChips: [')', 'false', 'console', 'log', '(', '.'],
      expectedCode: ['console.log("Auto update");\nconsole.log(false);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Auto update\nfalse',
      helperText: 'Build console.log(false) in order.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Create the variable `autoSaveImage` and store `true` inside it.',
      codeTitle: 'script.js',
      templateParts: ['', ' ', ' = ', ';'],
      blankAnswers: ['const', 'autoSaveImage', 'true'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['true', 'autoSaveImage', 'const'],
      expectedCode: ['const autoSaveImage = true;'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'const autoSaveImage = true;',
      helperText: 'Place the keyword, variable name, and boolean value.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Prevent cookies by creating the variable and storing `false` in it.',
      codeTitle: 'script.js',
      templateParts: ['const ', ' = ', ';'],
      blankAnswers: ['allowCookies', 'false'],
      blankPlaceholders: ['', ''],
      promptChips: ['"false"', 'allowCookies', 'false'],
      expectedCode: ['const allowCookies = false;'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'const allowCookies = false;',
      helperText: 'Use the variable name and the boolean without quotes.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};

javascriptLessonContent['js-4'] = {
  id: 'js-4',
  title: 'Checking Number Equality',
  xpReward: 50,
  content: [
    {
      type: 'code',
      data: "We learned how to create and store values, but how do we compare them?\n\nWe need to compare numbers in situations like checking a user's entered PIN matches their saved PIN.",
      codeTitle: 'script.js',
      code: 'const enteredPin = 5448;\nconst expectedPin = 5440;',
      actionLabel: 'Run'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'To compare if two numbers are the same, we use the equality operator, `===`.',
      codeTitle: 'script.js',
      templateParts: ['5 ', '', '', '', ' 5'],
      blankAnswers: ['=', '=', '='],
      blankPlaceholders: ['', '', ''],
      promptChips: ['=', '=', '='],
      expectedCode: ['5 === 5'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'true',
      helperText: 'Place all three equals signs together.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'When we compare the same numbers with the equality operator, the result is `true`.',
      codeTitle: 'script.js',
      templateParts: ['console.log(', ' ', ' ', ');'],
      blankAnswers: ['10', '===', '10'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['10', '===', '10'],
      expectedCode: ['console.log(10 === 10);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'true',
      helperText: 'Compare the two matching numbers inside console.log.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'When we compare two different numbers with the equality operator, the result is `false`.\n\nPick the option that compares `9` to `10`.',
      codeTitle: 'script.js',
      templateParts: ['console.log(', ');'],
      blankAnswers: ['9 === 10'],
      blankPlaceholders: [''],
      promptChips: ['9 === 10', '9 = 10'],
      expectedCode: ['console.log(9 === 10);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'false',
      helperText: 'Use the equality operator with three equals signs.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What do we use to check if two numbers are equal?',
      options: ['`===`', '`=`'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'console.log(10 === 11);',
      options: ['false', 'true'],
      correctAnswer: 0
    },
    {
      type: 'quiz',
      data: 'In which of these situations would we need to check if two numbers are equal?',
      options: [
        "When checking if a player's number of lives remaining is less than or equal to 3",
        "When checking if a player's number of lives remaining is exactly 5"
      ],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'console.log(5 + 13);\nconsole.log(5 === 13);',
      options: ['`18` and then `513`', '`18` and then `false`'],
      correctAnswer: 1
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Check if the value of `votes` is equal to `11`.',
      codeTitle: 'script.js',
      templateParts: ['const votes = 10;\nconsole.log(votes ', '', '', ' ', ');'],
      blankAnswers: ['=', '=', '=', '11'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['=', '=', '11', '='],
      expectedCode: ['const votes = 10;\nconsole.log(votes === 11);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'false',
      helperText: 'Use the equality operator, then the number to compare.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Add the equality comparison operator.',
      codeTitle: 'script.js',
      templateParts: ['console.log(99 ', ' 100)'],
      blankAnswers: ['==='],
      blankPlaceholders: [''],
      promptChips: ['=', '==='],
      expectedCode: ['console.log(99 === 100)'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'false',
      helperText: 'Choose the operator with three equals signs.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Display `false` in the console.',
      codeTitle: 'script.js',
      templateParts: ['console.log(10 === ', ')'],
      blankAnswers: ['13'],
      blankPlaceholders: [''],
      promptChips: ['10', '13'],
      expectedCode: ['console.log(10 === 13)'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'false',
      helperText: 'Choose the number that is different from 10.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Check if these numbers are the same by typing `===`.',
      codeTitle: 'script.js',
      templateParts: ['console.log(100 ', ' 100);'],
      blankAnswers: ['==='],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['console.log(100 === 100);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'true',
      helperText: 'Type the equality operator with three equals signs.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};

javascriptLessonContent['js-5'] = {
  id: 'js-5',
  title: 'JavaScript Basics',
  xpReward: 75,
  content: [
    {
      type: 'quiz',
      data: 'When can we use `console.log()` to display the value of a variable?',
      options: ['Before we create the variable', 'After we create the variable', 'Before or after we create the variable'],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: 'Why is this not a string value?',
      codeTitle: 'script.js',
      code: 'New York',
      options: [
        'Because the words are capitalized',
        "Because there's a space between the words",
        'Because there are no double quotes around it'
      ],
      correctAnswer: 2
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Code the `=` sign to give the `spaceship` variable the string value `"Enterprise"`.',
      codeTitle: 'script.js',
      templateParts: ['const spaceship ', ' "Enterprise";'],
      blankAnswers: ['='],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['const spaceship = "Enterprise";'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'const spaceship = "Enterprise";',
      helperText: 'Type the assignment operator.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Display `Atlanta` in the console.',
      codeTitle: 'script.js',
      templateParts: ['', '', '', '', ';'],
      blankAnswers: ['console.log', '(', '"Atlanta"', ')'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['"Atlanta"', 'console.log', '(', 'Atlanta', ')'],
      expectedCode: ['console.log("Atlanta");'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Atlanta',
      helperText: 'Use the string value with quotes inside console.log.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Display the string value in the console.',
      codeTitle: 'script.js',
      templateParts: ['const ingredients = "Sugar, spice, and everything nice";\n', '', '', '', '', ';'],
      blankAnswers: ['console.log', '(', 'ingredients', ')'],
      blankPlaceholders: ['', '', '', ''],
      promptChips: ['ingredients', '(', 'console.log', 'display', ')'],
      expectedCode: ['const ingredients = "Sugar, spice, and everything nice";\nconsole.log(ingredients);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Sugar, spice, and everything nice',
      helperText: 'Log the variable name after it has been created.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What does this code display in the console?',
      codeTitle: 'script.js',
      code: 'let income = 1400;\nlet savings = 900;\nsavings = 1000;\nincome = 1500;\n\nconsole.log(savings);',
      options: ['1500', '900', '1000'],
      correctAnswer: 2
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Display `goal` minus `milesRan` in the console.',
      codeTitle: 'script.js',
      templateParts: [
        'const goal = 5;\nconst milesRan = 3;\n\nconsole.log("Miles left: ");\nconsole.log(',
        ' ',
        ' ',
        ');'
      ],
      blankAnswers: ['goal', '-', 'milesRan'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['goal', '/', '-', 'milesRan'],
      expectedCode: ['const goal = 5;\nconst milesRan = 3;\n\nconsole.log("Miles left: ");\nconsole.log(goal - milesRan);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Miles left: \n2',
      helperText: 'Subtract milesRan from goal.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Display the value of `total` in the console.',
      codeTitle: 'script.js',
      templateParts: [
        'const score = 1084;\nconst bonus = 500;\n\nconst total = score + bonus;\nconsole.log(',
        ');'
      ],
      blankAnswers: ['total'],
      blankPlaceholders: [''],
      promptChips: [],
      expectedCode: ['const score = 1084;\nconst bonus = 500;\n\nconst total = score + bonus;\nconsole.log(total);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '1584',
      helperText: 'Type the variable name inside console.log.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Set `total` to the result of `score` minus `penalty`.',
      codeTitle: 'script.js',
      templateParts: [
        'const score = 1084;\nconst penalty = 500;\n\nconst total = ',
        ' ',
        ' ',
        ';\nconsole.log(total);'
      ],
      blankAnswers: ['score', '-', 'penalty'],
      blankPlaceholders: ['', '', ''],
      promptChips: ['score', '-', 'penalty', '+'],
      expectedCode: ['const score = 1084;\nconst penalty = 500;\n\nconst total = score - penalty;\nconsole.log(total);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '584',
      helperText: 'Subtract penalty from score.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: "What's the value of `number3`?",
      codeTitle: 'script.js',
      code: 'const number1 = 3;\nconst number2 = 4;\nlet number3 = 10;\nnumber3 = number1 + number2;',
      options: ['4', '10', '7'],
      correctAnswer: 2
    },
    {
      type: 'quiz',
      data: 'Which sign turns `true` into `false`?',
      options: ['`?`', '`!`', '`-`'],
      correctAnswer: 1
    },
    {
      type: 'quiz',
      data: "Which value isn't a string?",
      options: ['`"wrong"`', '`"true"`', '`true`'],
      correctAnswer: 2
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Can you make sure that `true` appears in the console?',
      codeTitle: 'script.js',
      templateParts: [
        'let loggedIn = false;\n\nconsole.log("Logged in:");\nconsole.log(loggedIn);\n\nloggedIn = !false;\n\nconsole.log("Logged in:");\nconsole.log(',
        ');'
      ],
      blankAnswers: ['loggedIn'],
      blankPlaceholders: [''],
      promptChips: ['false', '!true', 'loggedIn'],
      expectedCode: [
        'let loggedIn = false;\n\nconsole.log("Logged in:");\nconsole.log(loggedIn);\n\nloggedIn = !false;\n\nconsole.log("Logged in:");\nconsole.log(loggedIn);'
      ],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'Logged in:\nfalse\nLogged in:\ntrue',
      helperText: 'Log the updated variable value.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Use the special sign to negate the value.',
      codeTitle: 'script.js',
      templateParts: ['const isConnected = ', 'true;'],
      blankAnswers: ['!'],
      blankPlaceholders: [''],
      promptChips: ['!', ';', '"'],
      expectedCode: ['const isConnected = !true;'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'const isConnected = !true;',
      helperText: 'Choose the negation sign.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Can you pick the snippet that displays `true` in the console?',
      codeTitle: 'script.js',
      templateParts: [
        'const split = 15 / 5;\nconsole.log(split);\n\nconsole.log("Even split:");\nconsole.log(',
        ');'
      ],
      blankAnswers: ['true'],
      blankPlaceholders: [''],
      promptChips: ['false', 'true'],
      expectedCode: ['const split = 15 / 5;\nconsole.log(split);\n\nconsole.log("Even split:");\nconsole.log(true);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: '3\nEven split:\ntrue',
      helperText: 'Choose the boolean value that should appear.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: "What's the result of using the `===` operator?",
      options: [
        'A numerical value',
        'A value of either `"true"` or `"false"`',
        'A value of either `true` or `false`'
      ],
      correctAnswer: 2
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Check if `uploaded` equals the value `100`.',
      codeTitle: 'script.js',
      templateParts: ['const uploaded = 15;\nconsole.log(uploaded ', ' ', ');'],
      blankAnswers: ['===', '100'],
      blankPlaceholders: ['', ''],
      promptChips: ['===', '100', 'var'],
      expectedCode: ['const uploaded = 15;\nconsole.log(uploaded === 100);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'false',
      helperText: 'Use the equality operator, then the value to compare.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'quiz',
      data: 'What will this code display in the console?',
      codeTitle: 'script.js',
      code: 'console.log(906 === 9006);',
      options: ['9069006', 'true', 'false'],
      correctAnswer: 2
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: 'Make the comparison result `true`.',
      codeTitle: 'script.js',
      templateParts: ['const newMessages = 3;\nconsole.log(newMessages ', ' 0);'],
      blankAnswers: ['!=='],
      blankPlaceholders: [''],
      promptChips: ['<', '!=='],
      expectedCode: ['const newMessages = 3;\nconsole.log(newMessages !== 0);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'true',
      helperText: 'Choose the operator that makes 3 compared to 0 return true.',
      successMessage: 'Lesson solved. Good job!'
    },
    {
      type: 'interactive',
      mode: 'fill-blanks',
      data: "Check if the chosen number isn't equal to `0`.",
      codeTitle: 'script.js',
      templateParts: ['const chosenNumber = 3;\nconst notZero = chosenNumber ', ' 0;\nconsole.log(notZero);'],
      blankAnswers: ['!=='],
      blankPlaceholders: [''],
      promptChips: ['==', '!=='],
      expectedCode: ['const chosenNumber = 3;\nconst notZero = chosenNumber !== 0;\nconsole.log(notZero);'],
      previewTitle: 'Console output',
      solvedConsoleOutput: 'true',
      helperText: 'Use assignment first, then the not-equal comparison.',
      successMessage: 'Lesson solved. Good job!'
    }
  ]
};
