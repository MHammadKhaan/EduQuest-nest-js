import { BaseEntity } from 'src/database';
import { ExamAttempt } from 'src/models/exam-attempts/entities';
import { Question } from 'src/models/questions/entities';
import { Teacher } from 'src/models/teacher/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
} from 'typeorm';

@Entity({ name: 'exams' })
export class Exam extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: false })
  durationMinutes: number;

  //   @Column({ nullable: false, type: 'timestamp' })
  //   scheduleDateTime: Timestamp;

  @ManyToOne(() => Teacher, (teacher) => teacher.exam, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'teacher' })
  teacher: Teacher;

  @OneToMany(() => Question, (question) => question.exam)
  questions: Question[];

  @OneToMany(() => ExamAttempt, (examAttempts) => examAttempts.exam)
  examAttempts: ExamAttempt[];
}
