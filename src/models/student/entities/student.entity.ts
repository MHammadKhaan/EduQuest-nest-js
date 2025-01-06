import { BaseEntity } from 'src/database';
import { ExamAttempt } from 'src/models/exam-attempts/entities';
import { User } from 'src/models/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'student' })
export class Student extends BaseEntity {
  @Column({ nullable: false })
  roll_number: string;

  @OneToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'user' })
  user: User;

  @OneToMany(() => ExamAttempt, (examAttempt) => examAttempt.student)
  examAttempts: ExamAttempt[];
}
