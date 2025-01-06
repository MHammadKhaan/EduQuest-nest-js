import { Question } from 'src/models/questions/entities';
import { ExamAttempt } from '../entities';
import { IsNotEmpty } from 'class-validator';

export class answerDto {
  @IsNotEmpty()
  question: Question;

  @IsNotEmpty()
  selectOptionId: number;

  @IsNotEmpty()
  examAttempts: ExamAttempt;
}
