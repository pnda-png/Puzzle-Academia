import { QuestionType, Level, Scorer } from './types';

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "The First Step",
    description: "Learn the basics of logic and pattern recognition.",
    difficulty: 'Easy',
    requiredStars: 0,
    xpValue: 100,
    questions: [
      {
        id: '1-1',
        type: QuestionType.MULTIPLE_CHOICE,
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
        explanation: "Mars appears red because of iron oxide (rust) on its surface."
      },
      {
        id: '1-2',
        type: QuestionType.MULTIPLE_CHOICE,
        text: "What is 15 + 27?",
        options: ["32", "42", "52", "45"],
        correctAnswer: "42",
        explanation: "15 + 27 = 42. Adding the tens (10+20=30) and units (5+7=12) gives 42."
      },
      {
        id: '1-3',
        type: QuestionType.TRUE_FALSE,
        text: "Plants need sunlight to perform photosynthesis.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Photosynthesis is the process plants use to convert light energy into chemical energy."
      }
    ]
  },
  {
    id: 2,
    title: "Logic Bridge",
    description: "Connect concepts and solve simple multi-step puzzles.",
    difficulty: 'Easy',
    requiredStars: 2,
    xpValue: 200,
    questions: [
      {
        id: '2-1',
        type: QuestionType.MULTIPLE_CHOICE,
        text: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "This is a transitive relation in logic: A=B, B=C implies A=C."
      },
      {
        id: '2-2',
        type: QuestionType.MULTIPLE_CHOICE,
        text: "Which gas do humans breathe out most?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide",
        explanation: "Humans inhale oxygen and exhale carbon dioxide as a waste product of metabolism."
      }
    ]
  },
  {
    id: 3,
    title: "Color Flow",
    description: "Deep dive into scientific classifications and math.",
    difficulty: 'Medium',
    requiredStars: 4,
    xpValue: 450,
    questions: [
      {
        id: '3-1',
        type: QuestionType.MULTIPLE_CHOICE,
        text: "What is the square root of 144?",
        options: ["10", "11", "12", "14"],
        correctAnswer: "12",
        explanation: "12 multiplied by 12 equals 144."
      }
    ]
  }
];

export const LEADERBOARD_DATA: Scorer[] = [
  {
    id: '1',
    name: "Elena Rodriguez",
    level: 12,
    title: "Quantum Logic",
    points: 12450,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: '2',
    name: "Marcus Chen",
    level: 10,
    title: "Spatial Master",
    points: 11920,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: '3',
    name: "Sarah Jenkins",
    level: 9,
    title: "Pattern Expert",
    points: 10840,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  }
];
