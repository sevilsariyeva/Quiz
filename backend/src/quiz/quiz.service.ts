import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizListResponseDto, QuizDetailResponseDto } from './dto/quiz-response.dto';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async createQuiz(createQuizDto: CreateQuizDto): Promise<QuizDetailResponseDto> {
    const { title, questions } = createQuizDto;

    const quiz = await this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map(question => ({
            type: question.type,
            text: question.text,
            options: question.options || [],
            correctAnswer: question.correctAnswer,
            correctAnswers: question.correctAnswers || [],
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    return this.mapToQuizDetailResponse(quiz);
  }

 async findAllQuizzes(): Promise<QuizListResponseDto[]> {
  const quizzes = await this.prisma.quiz.findMany({
    include: {
      questions: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return quizzes.map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    questionCount: quiz.questions.length, 
    createdAt: quiz.createdAt,
    updatedAt: quiz.updatedAt,
  }));
}


async findQuizById(id: number): Promise<QuizDetailResponseDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return this.mapToQuizDetailResponse(quiz);
  }

  async deleteQuiz(id: number): Promise<void> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    await this.prisma.quiz.delete({
      where: { id },
    });
  }

private mapToQuizDetailResponse(quiz: any): QuizDetailResponseDto {
    return {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.questions.map(q => ({
        id: q.id,
        type: q.type,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        correctAnswers: q.correctAnswers,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt,
      })),
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
    };
  }
}