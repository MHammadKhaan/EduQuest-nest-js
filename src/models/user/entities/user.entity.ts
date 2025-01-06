import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { hash } from 'bcrypt';
import { userRole } from '../enum';
import { BaseEntity } from 'src/database';
import { Student } from 'src/models/student/entities';
import { Teacher } from 'src/models/teacher/entities';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ enum: userRole, default: userRole.Student })
  role: userRole;

  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher: Teacher;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
