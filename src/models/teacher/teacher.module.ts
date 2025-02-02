import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities';
import { UserModule } from '../user/user.module';
import { TransactionProvider } from 'src/util';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), UserModule],
  controllers: [TeacherController],
  providers: [TeacherService, TransactionProvider],
})
export class TeacherModule {}
