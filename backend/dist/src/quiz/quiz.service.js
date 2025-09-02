"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let QuizService = class QuizService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuiz(createQuizDto) {
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
    async findAllQuizzes() {
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
    async findQuizById(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    orderBy: { id: 'asc' },
                },
            },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        return this.mapToQuizDetailResponse(quiz);
    }
    async deleteQuiz(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
        });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${id} not found`);
        }
        await this.prisma.quiz.delete({
            where: { id },
        });
    }
    mapToQuizDetailResponse(quiz) {
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
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map