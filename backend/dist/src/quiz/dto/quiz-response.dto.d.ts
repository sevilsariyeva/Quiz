export declare class QuestionResponseDto {
    id: number;
    type: string;
    text: string;
    options?: string[];
    correctAnswer?: string;
    correctAnswers?: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class QuizListResponseDto {
    id: number;
    title: string;
    questionCount: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class QuizDetailResponseDto {
    id: number;
    title: string;
    questions: QuestionResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
