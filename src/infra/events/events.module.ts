import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { OnQuestionBestAnswerChosenCreated } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosenCreated,
    SendNotificationUseCase,
  ],
})
export class EventModule {}
