import { MailService } from './../mail/mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly mailService: MailService,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentRepository.save(createStudentDto);
    // await this.mailService.sendMail({ user: student.user });
    console.log(student);
    
    return student;
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
