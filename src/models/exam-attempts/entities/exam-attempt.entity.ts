import { BaseEntity } from 'src/database';
import { Exam } from 'src/models/exams/entities';
import { Student } from 'src/models/student/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { sessionQuestion } from './session-question.entity';

@Entity({ name: 'exam_attempts' })
export class ExamAttempt extends BaseEntity {
  @Column({ nullable: false, type: 'timestamp' })
  startTime: Timestamp;
  @Column({ nullable: false, type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'decimal', default: 0 })
  score: number;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @ManyToOne(() => Student, (student) => student.examAttempts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'students' })
  student: Student;

  @ManyToOne(() => Exam, (exam) => exam.examAttempts)
  @JoinColumn({ referencedColumnName: 'id', name: 'exam' })
  exam: Exam;

  @OneToMany(
    () => sessionQuestion,
    (sessionQuestion) => sessionQuestion.examAttempts,
  )
  sessionQuestion: sessionQuestion[];
}
