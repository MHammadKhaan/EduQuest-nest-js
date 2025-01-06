import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateQuestionOptionDto } from './dto';
import { Exam } from '../exams/entities';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('examId/:id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() createQuestionDto: CreateQuestionDto,
    @Body('correctOption') correctOption: string,
    @Body() createQuestionOptionDto: CreateQuestionOptionDto,
  ) {
    if (!id) throw new NotFoundException('exam not found');
    return await this.questionsService.create(
      { ...createQuestionDto, exam: { id } as Exam },
      createQuestionOptionDto,
      correctOption,
    );
  }

  @Get('/getAll')
  async findAll() {
    return await this.questionsService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   return await this.questionsService.findOne(id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
