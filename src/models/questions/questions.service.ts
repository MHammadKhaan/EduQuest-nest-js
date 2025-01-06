import { CreateQuestionOptionDto } from './dto/questionOption.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, QuestionOptions } from './entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(QuestionOptions)
    private readonly questionOptionsRepo: Repository<QuestionOptions>,
    private readonly dataSource: DataSource,
  ) {}
  async create(
    createQuestionDto: CreateQuestionDto,
    createQuestionOptionDto: CreateQuestionOptionDto,
    correctOption: string,
  ) {
    return await this.dataSource.manager.transaction(
      async (transactionEntityManager) => {
        try {
          const question = await transactionEntityManager.save(
            Question,
            createQuestionDto,
          );

          const questionOptions = createQuestionOptionDto.questionOptions.map(
            (option) => {
              createQuestionOptionDto.correctOption =
                correctOption === option ? true : false;
              return transactionEntityManager.create(QuestionOptions, {
                ...createQuestionOptionDto,
                questions: question,
                questionOptions: option,
              });
            },
          );
          await transactionEntityManager.save(QuestionOptions, questionOptions);

          return question;
        } catch (error) {
          throw new NotFoundException(
            'Error creating question or options: ' + error.message,
          );
        }
      },
    );
  }

  async findAll() {
    return await this.questionRepo
      .createQueryBuilder('question')
      .select(['question.id', 'question.questionText'])
      .leftJoin('question.questionOptions', 'questionOption')
      .addSelect(['questionOption.id', 'questionOption.questionOptions'])
      .getMany();
  }
  async findByExamId(id: number) {}
  async findExamQuestion(id: number, examId: number) {
    const question = await this.questionRepo
      .createQueryBuilder('question')
      .select(['question.id', 'question.questionText'])
      .leftJoin('question.questionOptions', 'questionOptions')
      .addSelect([
        'questionOptions.id',
        'questionOptions.questionOptions',
        'questionOptions.correctOption',
      ])
      .leftJoin('question.exam', 'exam')
      .addSelect(['exam.id', 'exam.title'])
      .where('question.id=:id AND exam.id=:examId ', { id, examId })
      .getOne();
    if (!question)
      throw new NotFoundException(`question not found with the given id:${id}`);

    return question;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  async checkAlreadyAttempted(id: number) {
    const question = await this.questionRepo
      .createQueryBuilder('question')
      .leftJoin('question.sessionQuestion', 'sessionQuestion')
      .where('sessionQuestion.isAttempted=:attempted', { attempted: true })
      .addSelect([
        'question.id',
        'question.questionText',
        'sessionQuestion.isAttempted',
      ])
      .getOne();

    return question;
  }
}
