import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizListResponseDto, QuizDetailResponseDto } from './dto/quiz-response.dto';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuiz(@Body() createQuizDto: CreateQuizDto): Promise<QuizDetailResponseDto> {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  async findAllQuizzes(): Promise<QuizListResponseDto[]> {
    return this.quizService.findAllQuizzes();
  }

  @Get(':id')
  async findQuizById(@Param('id', ParseIntPipe) id: number): Promise<QuizDetailResponseDto> {
    return this.quizService.findQuizById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteQuiz(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.quizService.deleteQuiz(id);
  }
}