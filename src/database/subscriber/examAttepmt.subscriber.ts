import {
  ExamAttempt,
  sessionQuestion,
} from 'src/models/exam-attempts/entities';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class examAttempt implements EntitySubscriberInterface<sessionQuestion> {
  listenTo() {
    return sessionQuestion;
  }

  async afterInsert(event: InsertEvent<sessionQuestion>) {
    const examAttemptRepo = event.manager.getRepository(ExamAttempt);
    const sessionQuestionRepo = event.manager.getRepository(sessionQuestion);
    const examAttemptId = event.entity.examAttempts?.id;
    const sessionQuestionEntity = event.entity;

    const examAttempt = await examAttemptRepo.findOne({
      where: { id: examAttemptId },
      relations: ['exam', 'exam.questions'],
    });
    const totalQuestions = examAttempt.exam.questions.length;
    const attemptedQuestionsCount = await sessionQuestionRepo.count({
      where: { examAttempts: { id: examAttemptId }, isAttempted: true },
    });

    examAttempt.score = sessionQuestionEntity.isCorrected
      ? Number(examAttempt.score) + 1
      : examAttempt.score;
    if (totalQuestions === attemptedQuestionsCount) {
      examAttempt.isCompleted = true;
    }
    await examAttemptRepo.save(examAttempt);
  }
}
