import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  Min,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Teacher } from 'src/models/teacher/entities';
import { Timestamp } from 'typeorm';

export class CreateExamDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @IsOptional()
  teacher: Teacher;

  // @IsDateString()
  // scheduleDateTime:string;
}
