import { BaseEntity } from 'src/database';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'questions_options' })
export class QuestionOptions extends BaseEntity {
  @Column({ nullable: false })
  questionOptions: string;

  @Column({ default: false })
  correctOption: boolean;

  @ManyToOne(() => Question, (question) => question.questionOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'questions' })
  questions: Question;
}
