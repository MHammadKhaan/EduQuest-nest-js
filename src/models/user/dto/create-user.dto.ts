import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { userRole } from '../enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Enter your name, should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Enter Email, should not be empty' })
  @IsEmail({}, { message: 'Enter valid email' })
  email: string;

  // @IsNotEmpty({ message: 'Enter Password, should not be empty' })
  @MinLength(4, {
    message: 'Password should contain a minimum of 4 characters',
  })
  password?: string;

  @IsEnum(userRole, {
    message: `Role must be one of the following:${Object.values(userRole).join(', ')}`,
  })
  role: userRole;
}
