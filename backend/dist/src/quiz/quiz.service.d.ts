import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizListResponseDto, QuizDetailResponseDto } from './dto/quiz-response.dto';
export declare class QuizService {
    private prisma;
    constructor(prisma: PrismaService);
    createQuiz(createQuizDto: CreateQuizDto): Promise<QuizDetailResponseDto>;
    findAllQuizzes(): Promise<QuizListResponseDto[]>;
    findQuizById(id: number): Promise<QuizDetailResponseDto>;
    deleteQuiz(id: number): Promise<void>;
    private mapToQuizDetailResponse;
}
