import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private AuthService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.AuthService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
