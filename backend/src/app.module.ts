import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [QuizModule],
  providers: [PrismaService],
})
export class AppModule {}