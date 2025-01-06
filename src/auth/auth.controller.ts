import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto';
import { localAuthGuard } from './guard';
import { jwtAuthGuard } from './guard/jwt-auth-guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(localAuthGuard)
  @Post('/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }
  @UseGuards(jwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    return req.user; // Return the profile of the logged-in user
  }
}
