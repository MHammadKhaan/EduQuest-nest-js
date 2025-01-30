import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Teacher } from 'src/models/teacher/entities';

export class CreateExamDto {
  @ApiProperty({
    description: 'title of the exam',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'duration time of the exam',
  })
  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @IsOptional()
  teacher: Teacher;

  // @IsDateString()
  // scheduleDateTime:string;
}
