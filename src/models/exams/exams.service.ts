import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam) private readonly examRepository: Repository<Exam>,
  ) {}
  async create(createExamDto: CreateExamDto) {
    return await this.examRepository.save(createExamDto);
  }

  findAll() {
    return `This action returns all exams`;
  }

  async findOne(id: number) {
    const exam = await this.examRepository.findOne({ where: { id } });
    if (!exam) throw new NotFoundException(`exam not found with id:${id}`);

    return exam;
  }
  async findExamQuestions(id: number) {
    const exam = await this.examRepository
      .createQueryBuilder('exam')
      .leftJoin('exam.questions', 'questions')
      .addSelect([
        'exam.id',
        'exam.title',
        'questions.id',
        'questions.questionText',
      ])
      .where('exam.id=:id', { id })
      .getOne();

    return exam;
  }
  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
