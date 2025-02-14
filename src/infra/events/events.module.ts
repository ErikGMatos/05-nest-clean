import { OnAnswerCreated } from '@/domain/forum/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosenCreated } from '@/domain/forum/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosenCreated,
    SendNotificationUseCase,
  ],
})
export class EventModule {}
