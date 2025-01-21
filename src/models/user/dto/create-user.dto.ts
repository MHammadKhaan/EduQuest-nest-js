import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { userRole } from '../enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'name of the user',
    example: 'suhaib'
  })
  @IsNotEmpty({ message: 'Enter your name, should not be empty' })
  name: string;
  @ApiProperty({
    description: 'email of the user',
    example: 'example@gmail.com'
  })
  @IsNotEmpty({ message: 'Enter Email, should not be empty' })
  @IsEmail({}, { message: 'Enter valid email' })
  email: string;


  @ApiProperty({
    description: 'password with minimum length 4',
    example: '1234'
  })
  @IsNotEmpty({ message: 'Enter Password, should not be empty' })
  @MinLength(4, {
    message: 'Password should contain a minimum of 4 characters',
  })
  password?: string;

  @ApiProperty({
    description: 'role of user',
    example: 'student / teacher',
    enum: userRole
  })

  @IsOptional()
  @IsEnum(userRole, {
    message: `Role must be one of the following:${Object.values(userRole).join(', ')}`,
  })
  role?: userRole;
}
