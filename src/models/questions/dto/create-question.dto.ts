import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionOptionDto } from './questionOption.dto';
import { Exam } from 'src/models/exams/entities';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsOptional()
  exam: Exam;
}
