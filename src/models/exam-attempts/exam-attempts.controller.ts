import { UserService } from './../user/user.service';
import { ExamsService } from './../exams/exams.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ExamAttemptsService } from './exam-attempts.service';
import { CreateExamAttemptDto } from './dto/create-exam-attempt.dto';
import { UpdateExamAttemptDto } from './dto/update-exam-attempt.dto';
import { Student } from '../student/entities';
import { Question } from '../questions/entities';
import { ExamAttempt } from './entities';
import { currentUser } from 'src/decorator';
import { User } from '../user/entities';
import { jwtAuthGuard } from 'src/auth/guard';
import { QuestionsService } from '../questions/questions.service';

@Controller('exam-attempts')
export class ExamAttemptsController {
  constructor(
    private readonly examAttemptsService: ExamAttemptsService,
    private readonly examsService: ExamsService,
    private readonly userService: UserService,
    private readonly questionService: QuestionsService,
  ) {}

  @UseGuards(jwtAuthGuard)
  @Post()
  async startExam(
    @Body('examId', ParseIntPipe) examId: number,
    @currentUser() user: User,
  ) {
    const { student } = await this.userService.findOne(user.id);

    const exam = await this.examsService.findOne(examId);

    return await this.examAttemptsService.create({ exam, student });
  }
  @UseGuards(jwtAuthGuard)
  @Post('/submitAnswer')
  async submitAnswers(
    @Body('questionId', ParseIntPipe) questionId: number,
    @Body('selectOptionId', ParseIntPipe) selectOptionId: number,
    @Body('examAttemptId', ParseIntPipe) examAttemptId: number,
  ) {
    const examAttempts = await this.examAttemptsService.findOne(examAttemptId);
    const question = await this.questionService.findExamQuestion(
      questionId,
      examAttempts.exam.id,
    );
    return await this.examAttemptsService.submitAnswer({
      question,
      examAttempts,
      selectOptionId,
    });
  }

  @Get()
  findAll() {
    return this.examAttemptsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.examAttemptsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExamAttemptDto: UpdateExamAttemptDto,
  ) {
    return this.examAttemptsService.update(+id, updateExamAttemptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examAttemptsService.remove(+id);
  }
}
