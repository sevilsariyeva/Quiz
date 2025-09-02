export declare class CreateQuestionDto {
    type: 'boolean' | 'input' | 'checkbox';
    text: string;
    options?: string[];
    correctAnswer?: string;
    correctAnswers?: string[];
}
export declare class CreateQuizDto {
    title: string;
    questions: CreateQuestionDto[];
}
