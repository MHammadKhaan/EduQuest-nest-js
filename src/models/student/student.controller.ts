import { TransactionProvider } from './../../util/transaction.provider';
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
  ConflictException,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { User } from '../user/entities';
import { CreateStudentDto } from './dto';
import { CreateUserDto } from '../user/dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Student } from './entities';
import { EntityManager } from 'typeorm';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly UserService: UserService,
    private readonly transactionProvider: TransactionProvider
  ) { }

  @Post('')
  @ApiOperation({ summary: 'create student' })
  @ApiCreatedResponse({ description: 'student created successfully', type: CreateStudentDto })
  @ApiBadRequestResponse({ description: 'student not created' })
  async create(
    @Body() createUserDto: CreateUserDto,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    // const newUser = await this.UserService.create(createUserDto);
    // if (!newUser) throw new BadRequestException('unable to create the user');

    // return await this.studentService.create({
    //   ...createStudentDto,
    //   user: newUser as User,
    // });

    // return await this.studentService.create(createStudentDto, createUserDto)
    return this.transactionProvider.executeTransaction(async (manager: EntityManager) => {
      try {
        const user = await this.UserService.create(createUserDto, manager)
        createStudentDto.user = user as User
        const student = await this.studentService.create(createStudentDto, manager)

        return student
      } catch (error) {
        throw new ConflictException(`failed to create user and student ${error.message}`)
      }
    })


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
