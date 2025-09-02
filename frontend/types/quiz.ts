export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id?: number;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string | boolean;
  correctAnswers?: string[];
}

export interface Quiz {
  id?: number;
  title: string;
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}

export interface QuizListItem {
  id: number;
  title: string;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateQuizPayload {
  title: string;
  questions: {
    type: QuestionType;
    text: string;
    options?: string[];
    correctAnswer?: string;
    correctAnswers?: string[];
  }[];
}