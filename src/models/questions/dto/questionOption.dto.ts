import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateQuestionOptionDto {
  @IsArray()
  @IsNotEmpty()
  questionOptions: string[];

  @IsNotEmpty()
  correctOption: boolean;
}
