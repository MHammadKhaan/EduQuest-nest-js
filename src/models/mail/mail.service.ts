import { Injectable } from '@nestjs/common';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entities';
import { CreateMailDto } from './dto/create-mail.dto';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail({ user }: CreateMailDto) {
    return await this.mailerService.sendMail({
      to: user.email,
      subject: 'welcome to our app !!',
      template: 'confirmation',
      context: {
        name: user.name,
      },
    });
  }
  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
