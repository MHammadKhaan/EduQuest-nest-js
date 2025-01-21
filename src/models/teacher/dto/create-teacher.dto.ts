import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/models/user/entities';

export class CreateTeacherDto {
  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  qualification: string;

  // @IsNotEmpty()
  @IsOptional()
  user?: User;

  
}
