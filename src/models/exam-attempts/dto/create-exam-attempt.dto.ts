import { IsNotEmpty } from 'class-validator';
import { Exam } from 'src/models/exams/entities';
import { Student } from 'src/models/student/entities';

export class CreateExamAttemptDto {
  @IsNotEmpty()
  student: Student;

  @IsNotEmpty()
  exam: Exam;
}
