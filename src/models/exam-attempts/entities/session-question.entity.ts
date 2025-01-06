import { BaseEntity } from 'src/database';
import { Question } from 'src/models/questions/entities';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Repository,
} from 'typeorm';
import { ExamAttempt } from './exam-attempt.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Entity({ name: 'session_question' })
export class sessionQuestion extends BaseEntity {
  @Column({ nullable: true })
  selectOptionId: number;

  @Column({ type: 'boolean', default: false })
  isCorrected: boolean;

  @Column({ type: 'boolean', default: false })
  isAttempted: boolean;

  @ManyToOne(() => Question, (question) => question.sessionQuestion, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'questions' })
  question: Question;

  @ManyToOne(() => ExamAttempt, (examAttempt) => examAttempt.sessionQuestion)
  @JoinColumn({ referencedColumnName: 'id', name: 'exam_attempts' })
  examAttempts: ExamAttempt;

  //hook for score update
  // @BeforeInsert()
  // async updateScore(@InjectRepository(ExamAttempt) examAttemptRepo: Repository<ExamAttempt>) {
  //     const correctAnswer = this.getCorrectAnswer(this.question.id);
  //     if (this.selectOptionId === correctAnswer) {
  //         const examAttempt = await examAttemptRepo.findOne({ where: { id: this.examAttempts.id }, relations: ['answers'] });
  //         if (examAttempt) {
  //             const correctAnswersCount = examAttempt.answers.filter(answer => this.getCorrectAnswer(answer.question.id) === answer.selectOptionId).length;
  //             const totalQuestions = examAttempt.answers.length;
  //             examAttempt.score = (correctAnswersCount / totalQuestions) * 100;
  //             await examAttemptRepo.save(examAttempt);
  //         }
  //     }
  // }

  // private getCorrectAnswer(questionId: number): number {
  //     // Your logic to retrieve the correct answer option
  //     return 1;  // Example: Replace with actual logic
  // }
}
