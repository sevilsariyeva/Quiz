import axios from 'axios';
import { Quiz, QuizListItem, CreateQuizPayload } from '../types/quiz';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizApi = {
  createQuiz: async (payload: CreateQuizPayload): Promise<Quiz> => {
    const response = await api.post('/quizzes', payload);
    return response.data;
  },

  getQuizzes: async (): Promise<QuizListItem[]> => {
    const response = await api.get('/quizzes');
    return response.data;
  },

  getQuizById: async (id: number): Promise<Quiz> => {
    const response = await api.get(`/quizzes/${id}`);
    return response.data;
  },

  deleteQuiz: async (id: number): Promise<void> => {
    await api.delete(`/quizzes/${id}`);
  },
};

export default api;