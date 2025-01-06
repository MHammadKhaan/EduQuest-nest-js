import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { User } from '../user/entities';
import { CreateStudentDto } from './dto';
import { CreateUserDto } from '../user/dto';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly UserService: UserService,
  ) {}

  @Post('')
  async create(
    @Body() CreateUserDto: CreateUserDto,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    const newUser = await this.UserService.create(CreateUserDto);
    if (!newUser) throw new BadRequestException('unable to create the user');

    return await this.studentService.create({
      ...createStudentDto,
      user: newUser as User,
    });
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
