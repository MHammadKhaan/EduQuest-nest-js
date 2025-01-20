import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { jwtAuthGuard } from 'src/auth/guard/jwt-auth-guard/jwt.guard';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EntityManager } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // return await this.userService.create(createUserDto,);
  }

  @UseGuards(jwtAuthGuard)
  @Get()
  @ApiOperation({ summary: "find user by email" })
  @ApiOkResponse({ description: 'user fetched with provided email' })
  @ApiNotFoundResponse({ description: "user not found" })
  async findByEmail(@Body('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
