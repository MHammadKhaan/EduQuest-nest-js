import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { StudentModule } from './models/student/student.module';
import { TeacherModule } from './models/teacher/teacher.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ExamsModule } from './models/exams/exams.module';
import { QuestionsModule } from './models/questions/questions.module';
import { ExamAttemptsModule } from './models/exam-attempts/exam-attempts.module';
import { examAttempt } from './database/subscriber/examAttepmt.subscriber';
import { MailModule } from './models/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_Name,
        subscribers: [examAttempt],
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    UserModule,
    StudentModule,
    TeacherModule,
    AuthModule,
    ExamsModule,
    QuestionsModule,
    ExamAttemptsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
