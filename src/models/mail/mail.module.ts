import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { from } from 'form-data';
import { join } from 'path';
import { UserModule } from '../user/user.module';
import * as path from 'path'
@Module({
  imports: [MailerModule.forRoot({
    transport: {
      host: 'in-v3.mailjet.com',
      port: 588,
      auth: {
        user: process.env.MAIL_JET_USER,
        pass: process.env.MAIL_JET_PASS
      }
      ,
    },
    defaults: {
      from: 'hammadkhanmailbox@gmail.com'
    },
    template: {
      dir: path.join(__dirname, '../../template'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true
      }
    }
  }), UserModule],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
