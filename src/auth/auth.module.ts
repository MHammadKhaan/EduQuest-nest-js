import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/models/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { localStrategy } from './strategies/local-strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './strategies/jwt-strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, localStrategy, jwtStrategy],
})
export class AuthModule {}
