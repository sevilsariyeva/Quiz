"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizDetailResponseDto = exports.QuizListResponseDto = exports.QuestionResponseDto = void 0;
class QuestionResponseDto {
    id;
    type;
    text;
    options;
    correctAnswer;
    correctAnswers;
    createdAt;
    updatedAt;
}
exports.QuestionResponseDto = QuestionResponseDto;
class QuizListResponseDto {
    id;
    title;
    questionCount;
    createdAt;
    updatedAt;
}
exports.QuizListResponseDto = QuizListResponseDto;
class QuizDetailResponseDto {
    id;
    title;
    questions;
    createdAt;
    updatedAt;
}
exports.QuizDetailResponseDto = QuizDetailResponseDto;
//# sourceMappingURL=quiz-response.dto.js.map