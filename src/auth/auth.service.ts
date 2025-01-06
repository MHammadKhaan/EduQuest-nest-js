import { loginDto } from './dto/login.dto';
import { UserService } from './../models/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';

import { compare } from 'bcrypt';
import { User } from 'src/models/user/entities';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: loginDto) {
    const userExist = await this.UserService.findByEmail(loginDto.email);
    const { password, createdAt, updatedAt, ...user } = userExist;
    const validatePass = await compare(loginDto.password, password);
    if (!validatePass) throw new BadRequestException('password is incorrect');

    return user;
  }
  async login(user: User) {
    const payload = {
      ...user,
      sub: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { ...user, accessToken };
  }
}
