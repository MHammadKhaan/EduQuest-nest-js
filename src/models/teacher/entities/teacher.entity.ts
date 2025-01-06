import { BaseEntity } from 'src/database';
import { Exam } from 'src/models/exams/entities';
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

@Entity({ name: 'teachers' })
export class Teacher extends BaseEntity {
  @Column()
  department: string;

  @Column()
  qualification: string;

  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'user' })
  user: User;

  @OneToMany(() => Exam, (exam) => exam.teacher)
  exam: Exam;
}
