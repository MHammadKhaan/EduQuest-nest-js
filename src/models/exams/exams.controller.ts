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
  UseGuards,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { jwtAuthGuard, RolesGuard } from 'src/auth/guard';
import { currentUser, Roles } from 'src/decorator';
import { userRole } from '../user/enum';
import { User } from '../user/entities';
import { Teacher } from '../teacher/entities';

@Controller('exams')
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly userService: UserService,
  ) {}

  @Roles(userRole.Teacher)
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Post()
  async create(
    @Body() createExamDto: CreateExamDto,
    @currentUser() user: User,
  ) {
    const { teacher } = await this.userService.findOne(user.id);

    return await this.examsService.create({ ...createExamDto, teacher });
  }

  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.examsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
  //   return this.examsService.update(+id, updateExamDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examsService.remove(+id);
  }

  @Get('/examQuestions/:id')
  async findExamQuestions(@Param('id', ParseIntPipe) id: number) {
    return await this.examsService.findExamQuestions(id);
  }
}
