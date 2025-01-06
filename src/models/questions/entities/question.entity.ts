import { BaseEntity } from 'src/database';
import { Exam } from 'src/models/exams/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionOptions } from './questionOptions.entity';
import { sessionQuestion } from 'src/models/exam-attempts/entities';

@Entity({ name: 'questions' })
export class Question extends BaseEntity {
  @Column({ nullable: false })
  questionText: string;

  @ManyToOne(() => Exam, (exam) => exam.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'exams' })
  exam: Exam;

  @OneToMany(
    () => QuestionOptions,
    (questionOption) => questionOption.questions,
  )
  questionOptions: QuestionOptions[];

  @OneToMany(
    () => sessionQuestion,
    (sessionQuestion) => sessionQuestion.question,
  )
  sessionQuestion: sessionQuestion[];
}
