import { IsNotEmpty, IsOptional } from "class-validator";
import { User } from "src/models/user/entities";

export class CreateMailDto {
    @IsNotEmpty()
    user: Omit<User, 'password' | 'hashPassword'>
    // @IsNotEmpty()
    // to: string
    // @IsNotEmpty()
    // subject: string
    // @IsNotEmpty()
    // context: string


}
