export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  MATCHING = 'MATCHING',
  DRAG_DROP = 'DRAG_DROP'
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer: any; // string for MC, string[] for matching indexes, etc.
  explanation: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
  requiredStars: number;
  xpValue: number;
}

export interface UserProgress {
  unlockedLevels: number[];
  completedLevels: number[];
  scores: Record<number, number>; // levelId -> high score
  totalXp: number;
  stars: number;
  username?: string;
  avatarUrl?: string;
}

export interface Scorer {
  id: string;
  name: string;
  level: number;
  title: string;
  points: number;
  avatar: string;
}
