import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract findById: (id: string) => Promise<Question | null>
  abstract findBySlug: (slug: string) => Promise<Question | null>
  abstract create: (answer: Question) => Promise<void>
  abstract delete: (answer: Question) => Promise<void>
  abstract save: (answer: Question) => Promise<void>
  abstract findManyRecent: (params: PaginationParams) => Promise<Question[]>
}
