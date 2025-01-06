import { IsNotEmpty } from 'class-validator';

export class loginDto {
  @IsNotEmpty({ message: 'email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'password should not be empty' })
  password: string;
}
