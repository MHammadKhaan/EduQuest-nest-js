import { UserService } from './../user/user.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import * as path from 'path';
import { User } from '../user/entities';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService, 
    private readonly userService:UserService  ) {}

  @Post()
  async sendMail(@Body('to') to:string){
    // const {password,...user}=await this.userService.findByEmail(createMailDto.to)
     const {password,...user}=await this.userService.findByEmail(to)
     
    //used self-invoke method 
    return await this.mailService.sendMail({...CreateMailDto,user}) 
  }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
