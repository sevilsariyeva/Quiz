import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizListResponseDto, QuizDetailResponseDto } from './dto/quiz-response.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    createQuiz(createQuizDto: CreateQuizDto): Promise<QuizDetailResponseDto>;
    findAllQuizzes(): Promise<QuizListResponseDto[]>;
    findQuizById(id: number): Promise<QuizDetailResponseDto>;
    deleteQuiz(id: number): Promise<void>;
}
