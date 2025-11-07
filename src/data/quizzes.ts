export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
}

export interface Quiz {
  topicId: string;
  questions: Question[];
}

export const quizzes: Quiz[] = [
  {
    topicId: "excel-basic-formulas",
    questions: [
      {
        id: "q1",
        text: "Which symbol must all Excel formulas start with?",
        options: ["$", "#", "=", "@"],
        correctAnswer: 2,
      },
      {
        id: "q2",
        text: "Which function would you use to add up a range of cells?",
        options: ["ADD", "SUM", "TOTAL", "COUNT"],
        correctAnswer: 1,
      },
      {
        id: "q3",
        text: "What is the result of =5*3?",
        options: ["8", "15", "53", "2"],
        correctAnswer: 1,
      }
    ]
  },
  {
      topicId: "excel-cell-referencing",
      questions: [
          {
              id: "q1",
              text: "Which of the following is an absolute cell reference?",
              options: ["A1", "$A1", "A$1", "$A$1"],
              correctAnswer: 3
          },
          {
              id: "q2",
              text: "What happens to a relative reference when you copy it to another cell?",
              options: ["It stays the same", "It changes based on the new position", "It becomes an absolute reference", "It returns an error"],
              correctAnswer: 1
          }
      ]
  }
  // Add more quizzes for other topics as needed
];