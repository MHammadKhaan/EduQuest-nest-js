import { Module } from '@nestjs/common';
import { ExamAttemptsService } from './exam-attempts.service';
import { ExamAttemptsController } from './exam-attempts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamAttempt, sessionQuestion } from './entities';
import { ExamsModule } from '../exams/exams.module';
import { UserModule } from '../user/user.module';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamAttempt, sessionQuestion]),
    ExamsModule,
    UserModule,
    QuestionsModule,
  ],
  controllers: [ExamAttemptsController],
  providers: [ExamAttemptsService],
})
export class ExamAttemptsModule {}
