export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correctIndex: 2,
    explanation: "Jupiter is the largest planet, with a mass more than twice that of all other planets combined.",
  },
  {
    id: 2,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Osmium", "Oxygen", "Oganesson"],
    correctIndex: 2,
    explanation: "Oxygen has the chemical symbol 'O' and is essential for life on Earth.",
  },
  {
    id: 3,
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1898"],
    correctIndex: 1,
    explanation: "The RMS Titanic sank on April 15, 1912 after hitting an iceberg during her maiden voyage.",
  },
  {
    id: 4,
    question: "What is the speed of light in vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
    correctIndex: 0,
    explanation: "Light travels at approximately 300,000 km/s (299,792,458 m/s) in a vacuum.",
  },
  {
    id: 5,
    question: "Which artist painted the Mona Lisa?",
    options: ["Michelangelo", "Raphael", "Leonardo da Vinci", "Donatello"],
    correctIndex: 2,
    explanation: "Leonardo da Vinci painted the Mona Lisa between 1503 and 1519.",
  },
  {
    id: 6,
    question: "What is the smallest bone in the human body?",
    options: ["Femur", "Stapes", "Phalanx", "Patella"],
    correctIndex: 1,
    explanation: "The stapes (stirrup bone) in the middle ear is the smallest bone, measuring about 3mm.",
  },
  {
    id: 7,
    question: "Which country has the most natural lakes?",
    options: ["USA", "Russia", "Finland", "Canada"],
    correctIndex: 3,
    explanation: "Canada has over 879,800 lakes, more than all other countries combined.",
  },
  {
    id: 8,
    question: "What programming language was created by Brendan Eich in 1995?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctIndex: 2,
    explanation: "Brendan Eich created JavaScript in just 10 days in May 1995 while at Netscape.",
  },
  {
    id: 9,
    question: "What is the hardest natural substance on Earth?",
    options: ["Titanium", "Diamond", "Quartz", "Tungsten"],
    correctIndex: 1,
    explanation: "Diamond rates 10 on the Mohs hardness scale, making it the hardest natural substance.",
  },
  {
    id: 10,
    question: "Which ocean is the deepest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctIndex: 3,
    explanation: "The Pacific Ocean is the deepest, with the Mariana Trench reaching about 11,034 meters.",
  },
];
