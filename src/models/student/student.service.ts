import { UserService } from './../user/user.service';
import { TransactionProvider } from './../../util/transaction.provider';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { MailService } from './../mail/mail.service';
import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities';
import { EntityManager, Repository } from 'typeorm';
import { CreateStudentDto } from './dto';
import { User } from '../user/entities';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    // private readonly studentRepository: Repository<Student>,
    private readonly mailService: MailService,
  ) { }
  async create(createStudentDto: CreateStudentDto, manager: EntityManager) {
    // const student = await this.studentRepository.save(createStudentDto);
    // await this.mailService.sendMail({ user: student.user });
    // console.log(student);

    // return student;

    const student = manager.create(Student, createStudentDto)
    return await manager.save(Student, student)
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
