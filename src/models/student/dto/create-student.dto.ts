import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Enter your roll number, should not be empty' })
  roll_number: string;

  @IsOptional()
  user?: User;
}
