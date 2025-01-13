import { sessionQuestion } from 'src/models/exam-attempts/entities';
import { answerDto } from './dto/answer.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamAttemptDto } from './dto/create-exam-attempt.dto';
import { UpdateExamAttemptDto } from './dto/update-exam-attempt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamAttempt } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExamAttemptsService {
  constructor(
    @InjectRepository(ExamAttempt)
    private readonly examAttemptRepo: Repository<ExamAttempt>,
    @InjectRepository(sessionQuestion)
    private readonly sessionQuestionRepository: Repository<sessionQuestion>,
  ) {}
  async create(createExamAttemptDto: CreateExamAttemptDto) {
    const isAlreadyAttempted = await this.examAttemptRepo
      .createQueryBuilder('examAttempt')
      .leftJoin('examAttempt.student', 'student')
      .leftJoin('examAttempt.exam', 'exam')
      .addSelect(['student.id', 'student.roll_number', 'exam.id', 'exam.title'])
      .where(
        'student.id=:studentId AND examAttempt.isCompleted=:checked AND exam.id=:examId',
        {
          studentId: createExamAttemptDto.student.id,
          checked: true,
          examId: createExamAttemptDto.exam.id,
        },
      )
      .getOne();
    if (isAlreadyAttempted) {
      throw new BadRequestException({
        message: 'quiz already attempted',
        data: {
          score: isAlreadyAttempted.score,
          student: isAlreadyAttempted.student.roll_number,
        },
      });
    }

    const startTime = new Date();
    const endTime = new Date(
      startTime.getTime() + createExamAttemptDto.exam.durationMinutes * 60000,
    );

    return await this.examAttemptRepo.save({
      ...createExamAttemptDto,
      startTime,
      endTime,
    });
  }

  async submitAnswer(answerDto: answerDto) {
    const currentTime = new Date();
    const { endTime } = answerDto.examAttempts;
    if (endTime < currentTime) {
      answerDto.examAttempts.isCompleted = true;

      return {
        message: 'quiz time up',
        data: await this.examAttemptRepo.save(answerDto.examAttempts),
      };
    }

    const isAttempted = await this.sessionQuestionRepository
      .createQueryBuilder('sessionQ')
      .leftJoin('sessionQ.examAttempts', 'examAttempts')
      .leftJoin('sessionQ.question', 'question')
      .addSelect(['examAttempts.id', 'question.id', 'question.questionText'])
      .where(
        'examAttempts.id=:attemptId AND sessionQ.isAttempted=:attempted AND question.id=:questionId ',
        {
          attemptId: answerDto.examAttempts.id,
          attempted: true,
          questionId: answerDto.question.id,
        },
      )
      .getOne();

    if (isAttempted)
      throw new BadRequestException(
        `${answerDto.question.questionText} is  already attempted`,
      );

    const answer = this.sessionQuestionRepository.create(answerDto);
    answer.isAttempted = true;
    answerDto.question.questionOptions.map((option) => {
      if (
        option.id === answerDto.selectOptionId &&
        option.correctOption === true
      )
        answer.isCorrected = true;
    });
    const { question, examAttempts, ...rest } =
      await this.sessionQuestionRepository.save(answer);

    const isQuizCompleted = await this.examAttemptRepo.findOne({
      where: { id: answerDto.examAttempts.id, isCompleted: true },
    });

    if (isQuizCompleted) {
      return {
        message: `quiz completed with score :${isQuizCompleted.score}`,
        ...rest,
      };
    }
    return rest;
  }

  findAll() {
    return `This action returns all examAttempts`;
  }

  async findOne(id: number) {
    const examAttempt = await this.examAttemptRepo
      .createQueryBuilder('examAttempt')
      .leftJoin('examAttempt.exam', 'exam')
      .addSelect(['exam.id', 'exam.title'])
      .where('examAttempt.id=:id', { id })
      .getOne();

    if (!examAttempt)
      throw new NotFoundException(`exam attempt not found id:${id}`);

    return examAttempt;
  }

  update(id: number, updateExamAttemptDto: UpdateExamAttemptDto) {
    return `This action updates a #${id} examAttempt`;
  }

  remove(id: number) {
    return `This action removes a #${id} examAttempt`;
  }
}
