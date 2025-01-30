import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities';
import { UserModule } from '../user/user.module';
import { TransactionProvider } from 'src/util';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), UserModule],
  controllers: [StudentController],
  providers: [StudentService, TransactionProvider],
})
export class StudentModule {}
