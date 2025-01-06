import { jwtAuthGuard } from './../../auth/guard/jwt-auth-guard/jwt.guard';
import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { User } from '../user/entities';
import { CreateTeacherDto } from './dto';
import { CreateUserDto } from '../user/dto';
import { Teacher } from './entities';
import { RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/decorator';
import { userRole } from '../user/enum';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly UserService: UserService,
  ) {}

  @Post('')
  async create(
    @Body() createTeacherDto: CreateTeacherDto,
    @Body() CreateUserDto: CreateUserDto,
  ) {
    const newUser = await this.UserService.create(CreateUserDto);
    if (!newUser) throw new BadRequestException('unable to create user');

    return await this.teacherService.create({
      ...createTeacherDto,
      user: newUser as User,
    });
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
