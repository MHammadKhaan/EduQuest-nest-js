import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../user/entities';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/models/user/dto';

export class CreateStudentDto {
  @ApiProperty({
    description: 'registration number or roll number',
    example: 'fa20-bse-031',
  })
  @IsNotEmpty({ message: 'Enter your roll number, should not be empty' })
  roll_number: string;

  @ApiProperty({
    description: 'user properties',
    example: {
      name: 'suhaib',
      email: 'example@gmail.com',
      password: '1234',
      role: 'student/teacher',
    },
    type: () => User,
  })
  @IsOptional()
  user?: User;
}
