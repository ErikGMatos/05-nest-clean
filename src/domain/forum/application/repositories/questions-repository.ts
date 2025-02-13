import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'

export abstract class QuestionsRepository {
  abstract findById: (id: string) => Promise<Question | null>
  abstract findBySlug: (slug: string) => Promise<Question | null>
  abstract findDetailsBySlug: (slug: string) => Promise<QuestionDetails | null>
  abstract create: (answer: Question) => Promise<void>
  abstract delete: (answer: Question) => Promise<void>
  abstract save: (answer: Question) => Promise<void>
  abstract findManyRecent: (params: PaginationParams) => Promise<Question[]>
}
